import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from './AdminTable'

export const dynamic = 'force-dynamic'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ nationality?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Verify admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  // Get championship
  const slug = process.env.NEXT_PUBLIC_CHAMPIONSHIP_SLUG ?? 'fia-motorsport-games-2026'
  const { data: championship } = await supabase
    .from('championships')
    .select('id, name, year')
    .eq('slug', slug)
    .single()

  if (!championship) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-[var(--muted)]">Championship not found.</p>
      </div>
    )
  }

  const { nationality: nationalityFilter } = await searchParams

  let query = supabase
    .from('registrations')
    .select('*')
    .eq('championship_id', championship.id)
    .order('created_at', { ascending: false })

  if (nationalityFilter) {
    query = query.eq('nationality', nationalityFilter)
  }

  const { data: registrations } = await query

  // Available nationalities for filter
  const { data: allNationalities } = await supabase
    .from('registrations')
    .select('nationality')
    .eq('championship_id', championship.id)

  const nationalities = [...new Set((allNationalities ?? []).map((r) => r.nationality))].sort()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-2">
            Admin Panel
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)]">All Registrations</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {championship.year} {championship.name}
          </p>
        </div>
        <a
          href="/registrations"
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
        >
          ← Back
        </a>
      </div>

      <AdminTable
        registrations={registrations ?? []}
        nationalities={nationalities}
        currentNationality={nationalityFilter ?? ''}
        championshipId={championship.id}
      />
    </div>
  )
}
