import { createClient } from '@/lib/supabase/server'
import { getChampionship } from '@/lib/championship'
import { buildCsv } from '../csv-export'
import { countryName } from '@/lib/countries'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
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
  if (!championship) return new Response('Championship not found', { status: 404 })

  const { searchParams } = new URL(request.url)
  const nationality = searchParams.get('nationality') ?? ''
  const search = searchParams.get('search') ?? ''

  let query = supabase
    .from('registrations')
    .select('*')
    .eq('championship_id', championship.id)
    .order('created_at', { ascending: false })

  if (nationality) query = query.eq('nationality', nationality)
  if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`)

  const { data: registrations } = await query

  const headers = [
    'First Name',
    'Last Name',
    'Email',
    'Nationality',
    'Phone',
    'Steam ID',
    'Legal Age',
    'Named Competitor First Name',
    'Named Competitor Last Name',
    'Named Competitor Nationality',
    'Named Competitor Email',
    'Named Competitor Phone',
    'Consent Profiling',
    'Consent Marketing',
    'Accepted Regulation',
    'Registered At',
  ]

  const rows = (registrations ?? []).map((r) => [
    r.first_name,
    r.last_name,
    r.email,
    countryName(r.nationality),
    r.phone,
    r.steam_id,
    r.is_of_legal_age ? 'Yes' : 'No',
    r.named_competitor_first_name ?? '',
    r.named_competitor_last_name ?? '',
    countryName(r.named_competitor_nationality ?? ''),
    r.named_competitor_email ?? '',
    r.named_competitor_phone ?? '',
    r.consent_profiling ? 'Yes' : 'No',
    r.consent_marketing ? 'Yes' : 'No',
    r.accepted_regulation ? 'Yes' : 'No',
    new Date(r.created_at).toISOString(),
  ])

  const csv = buildCsv(headers, rows.map((row) => row.map(String)))
  const filename = `registrations-${new Date().toISOString().split('T')[0]}.csv`

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv;charset=utf-8;',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
