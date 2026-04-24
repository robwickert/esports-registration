import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from './AdminTable'
import { getChampionship } from '@/lib/championship'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 50

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ nationality?: string; search?: string; page?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  const championship = await getChampionship()

  if (!championship) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-[var(--muted)]">Championship not found.</p>
      </div>
    )
  }

  const { nationality: nationalityFilter, search: searchFilter, page: pageParam } = await searchParams
  const currentPage = Math.max(1, Number(pageParam ?? 1))
  const offset = (currentPage - 1) * PAGE_SIZE

  let query = supabase
    .from('registrations')
    .select('*', { count: 'exact' })
    .eq('championship_id', championship.id)
    .order('created_at', { ascending: false })

  if (nationalityFilter) query = query.eq('nationality', nationalityFilter)
  if (searchFilter) query = query.or(`first_name.ilike.%${searchFilter}%,last_name.ilike.%${searchFilter}%`)

  const { data: registrations, count } = await query.range(offset, offset + PAGE_SIZE - 1)

  // Available nationalities for filter (always unfiltered)
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
        currentSearch={searchFilter ?? ''}
        total={count ?? 0}
        page={currentPage}
        pageSize={PAGE_SIZE}
      />
    </div>
  )
}
