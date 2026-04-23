import LeaderboardsClient from './LeaderboardsClient'
import { createClient } from '@/lib/supabase/server'
import { getChampionship } from '@/lib/championship'

export const dynamic = 'force-dynamic'

export default async function LeaderboardsPage() {
  const championship = await getChampionship()

  if (!championship) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-[var(--muted)]">Championship not found.</p>
      </div>
    )
  }

  const supabase = await createClient()

  const [entriesResult, countriesResult] = await Promise.all([
    supabase
      .from('leaderboard_entries')
      .select('id, position, full_name, country, time_display')
      .eq('championship_id', championship.id)
      .order('position', { ascending: true })
      .limit(10),
    supabase
      .from('leaderboard_entries')
      .select('country')
      .eq('championship_id', championship.id),
  ])

  const initialEntries = entriesResult.data ?? []
  const allCountries = [...new Set((countriesResult.data ?? []).map((e) => e.country))].sort()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          {championship.year} Edition
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)]">
          Leaderboards
        </h1>
        <p className="mt-3 text-[var(--muted)]">{championship.name}</p>
      </div>

      <LeaderboardsClient
        championshipId={championship.id}
        initialEntries={initialEntries}
        allCountries={allCountries}
      />
    </div>
  )
}
