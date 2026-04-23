import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface AcrEntry {
  position: number
  raceEventConfigurationId: string | null
  trackRunId: number
  trackId: string
  countryID: string        // ⚠️ inconsistent: sometimes a numeric ID ("109"), sometimes a name ("Italy")
  playerProfileID: number
  playerDisplayName: string
  carID: string            // internal ID e.g. "HyundaiI20NRally2" — may want a display name lookup later
  carClassID: string
  weatherTimeSetupID: string
  differenceMS: number
  timeMS: number           // raw lap time in milliseconds (does not include penaltyTimeMS)
  penaltyTimeMS: number
  metadata: Record<string, unknown>
  sectors: string
}

interface AcrResponse {
  entries: AcrEntry[]
  fetchedFromCache: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const CHUNK_SIZE = 25

function extractEntries(response: AcrResponse): AcrEntry[] {
  return response.entries ?? []
}

/**
 * Formats milliseconds into m:ss.mmm display string.
 * e.g. 206940 → "3:26.940"
 */
function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const millis  = ms % 1000
  return `${minutes}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

function mapEntry(raw: AcrEntry, championshipId: string) {
  return {
    championship_id: championshipId,
    position:        raw.position,
    full_name:       raw.playerDisplayName,
    country:         raw.countryID,
    time_ms:         raw.timeMS,
    time_display:    formatTime(raw.timeMS),
    raw_json:        raw,
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
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const invokeSecret = Deno.env.get('INVOKE_SECRET')
  if (invokeSecret) {
    const provided = req.headers.get('x-invoke-secret')
    if (provided !== invokeSecret) {
      return json({ error: 'Unauthorized' }, 401)
    }
  }

  // ── Config ────────────────────────────────────────────────────────────────
  const baseUrl     = Deno.env.get('ACR_BASE_URL')
  const challengeId = Deno.env.get('ACR_CHALLENGE_ID') ?? 'fia_challenge'
  const platform    = Deno.env.get('ACR_PLATFORM')     ?? 'steam'
  const authToken   = Deno.env.get('ACR_AUTH_TOKEN')
  const champSlug   = Deno.env.get('CHAMPIONSHIP_SLUG') ?? 'fia-motorsport-games-2026'

  if (!baseUrl)    return json({ error: 'ACR_BASE_URL is not set' }, 500)
  if (!authToken)  return json({ error: 'ACR_AUTH_TOKEN is not set' }, 500)

  // ── Supabase client (service role bypasses RLS) ───────────────────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // ── Resolve championship ──────────────────────────────────────────────────
  const { data: championship, error: champError } = await supabase
    .from('championships')
    .select('id')
    .eq('slug', champSlug)
    .single()

  if (champError || !championship) {
    return json({ error: `Championship not found for slug: ${champSlug}` }, 404)
  }

  // ── Fetch from ACR API ────────────────────────────────────────────────────
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
