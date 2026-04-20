import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO: Update this type once the actual API response shape is confirmed.
 * Field names below are placeholders based on typical leaderboard APIs.
 */
interface AcrEntry {
  position: number        // e.g. entry.rank or entry.position
  driverName: string      // e.g. entry.username or entry.fullName
  country: string         // e.g. entry.nationality or entry.country (ISO code)
  car: string             // e.g. entry.carName or entry.vehicle
  lapTimeMs: number       // e.g. entry.bestLapTime (milliseconds)
  lapTimeDisplay: string  // e.g. entry.formattedTime or entry.bestLap
  [key: string]: unknown  // allow extra fields to pass through to raw_json
}

/**
 * TODO: Update this to match the actual top-level response shape.
 * Common patterns:
 *   { data: AcrEntry[] }
 *   { leaderboard: AcrEntry[], totalCount: number }
 *   AcrEntry[]  (bare array)
 */
interface AcrResponse {
  data?: AcrEntry[]
  leaderboard?: AcrEntry[]
  results?: AcrEntry[]
  totalCount?: number
  total?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const CHUNK_SIZE = 25

/**
 * Extracts the entries array from the API response.
 * TODO: Update this once the actual response shape is known.
 */
function extractEntries(response: AcrResponse): AcrEntry[] {
  return response.data ?? response.leaderboard ?? response.results ?? []
}

/**
 * Maps a raw API entry to a leaderboard_entries DB row.
 * TODO: Update field names to match the actual API response once known.
 */
function mapEntry(raw: AcrEntry, championshipId: string) {
  return {
    championship_id: championshipId,
    position:     raw.position,
    full_name:    raw.driverName,
    country:      raw.country,
    car:          raw.car,
    time_display: raw.lapTimeDisplay,
    time_ms:      raw.lapTimeMs,
    raw_json:     raw,
  }
}

async function fetchAllEntries(
  baseUrl: string,
  challengeId: string,
  platform: string,
  authToken: string,
): Promise<AcrEntry[]> {
  const all: AcrEntry[] = []
  let offset = 0

  while (true) {
    const url =
      `${baseUrl}/api/v1/LeaderboardsForPartners/chunk` +
      `?offset=${offset}&count=${CHUNK_SIZE}` +
      `&challengeId=${encodeURIComponent(challengeId)}` +
      `&platform=${encodeURIComponent(platform)}`

    const res = await fetch(url, {
      headers: { Authorization: `Basic ${authToken}` },
    })

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${await res.text()}`)
    }

    const body = (await res.json()) as AcrResponse
    const chunk = extractEntries(body)

    if (chunk.length === 0) break
    all.push(...chunk)
    if (chunk.length < CHUNK_SIZE) break

    offset += CHUNK_SIZE
  }

  return all
}

// ─────────────────────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  // Optional invoke secret — set INVOKE_SECRET env var to lock down the endpoint
  const invokeSecret = Deno.env.get('INVOKE_SECRET')
  if (invokeSecret) {
    const provided = req.headers.get('x-invoke-secret')
    if (provided !== invokeSecret) {
      return json({ error: 'Unauthorized' }, 401)
    }
  }

  // ── Config ────────────────────────────────────────────────────────────────
  const baseUrl      = Deno.env.get('ACR_BASE_URL')
  const challengeId  = Deno.env.get('ACR_CHALLENGE_ID') ?? 'fia_challenge'
  const platform     = Deno.env.get('ACR_PLATFORM')     ?? 'steam'
  const authToken    = Deno.env.get('ACR_AUTH_TOKEN')    // base64 Basic auth token
  const champSlug    = Deno.env.get('CHAMPIONSHIP_SLUG') ?? 'fia-motorsport-games-2026'

  if (!baseUrl) return json({ error: 'ACR_BASE_URL is not set' }, 500)
  if (!authToken) return json({ error: 'ACR_AUTH_TOKEN is not set' }, 500)

  // ── Supabase client (service role bypasses RLS) ───────────────────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // ── Resolve championship ───────────────────────────────────────────────────
  const { data: championship, error: champError } = await supabase
    .from('championships')
    .select('id')
    .eq('slug', champSlug)
    .single()

  if (champError || !championship) {
    return json({ error: `Championship not found for slug: ${champSlug}` }, 404)
  }

  // ── Fetch from ACR API ─────────────────────────────────────────────────────
  let rawEntries: AcrEntry[]
  try {
    rawEntries = await fetchAllEntries(baseUrl, challengeId, platform, authToken)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return json({ error: `ACR API fetch failed: ${message}` }, 502)
  }

  console.log(`Fetched ${rawEntries.length} entries from ACR API`)

  // ── Clear existing entries ────────────────────────────────────────────────
  const { error: deleteError } = await supabase
    .from('leaderboard_entries')
    .delete()
    .eq('championship_id', championship.id)

  if (deleteError) {
    return json({ error: `Failed to clear entries: ${deleteError.message}` }, 500)
  }

  // ── Insert new entries ────────────────────────────────────────────────────
  if (rawEntries.length === 0) {
    return json({ success: true, inserted: 0, message: 'API returned no entries' })
  }

  const rows = rawEntries.map((entry) => mapEntry(entry, championship.id))

  const { error: insertError } = await supabase
    .from('leaderboard_entries')
    .insert(rows)

  if (insertError) {
    return json({ error: `Insert failed: ${insertError.message}` }, 500)
  }

  console.log(`Inserted ${rows.length} entries for championship ${champSlug}`)

  return json({ success: true, inserted: rows.length })
})

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
