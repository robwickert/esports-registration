import LeaderboardsClient from './LeaderboardsClient'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function LeaderboardsPage() {
  const supabase = await createClient()

  const slug = process.env.NEXT_PUBLIC_CHAMPIONSHIP_SLUG ?? 'fia-motorsport-games-2026'

  const { data: championship } = await supabase
    .from('championships')
    .select('id, name, year')
    .eq('slug', slug)
    .single()

  if (!championship) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-[var(--muted)]">Championship not found.</p>
      </div>
    )
  }

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

      <LeaderboardsClient championshipId={championship.id} />
    </div>
  )
}
