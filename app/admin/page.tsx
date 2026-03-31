import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from './AdminTable'

export const dynamic = 'force-dynamic'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>
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

  const { country: countryFilter } = await searchParams

  let query = supabase
    .from('registrations')
    .select('*')
    .eq('championship_id', championship.id)
    .order('created_at', { ascending: false })

  if (countryFilter) {
    query = query.eq('country', countryFilter)
  }

  const { data: registrations } = await query

  // Available countries for filter
  const { data: allCountries } = await supabase
    .from('registrations')
    .select('country')
    .eq('championship_id', championship.id)

  const countries = [...new Set((allCountries ?? []).map((r) => r.country))].sort()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-2">
            Admin Panel
          </p>
          <h1 className="text-3xl font-black text-white">All Registrations</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {championship.year} {championship.name}
          </p>
        </div>
        <a
          href="/registrations"
          className="rounded border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-white hover:border-white transition-colors"
        >
          ← Back
        </a>
      </div>

      <AdminTable
        registrations={registrations ?? []}
        countries={countries}
        currentCountry={countryFilter ?? ''}
        championshipId={championship.id}
      />
    </div>
  )
}
