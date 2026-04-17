import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import EditRegistrationForm from './EditRegistrationForm'
import { getChampionship } from '@/lib/championship'

export const dynamic = 'force-dynamic'

export default async function EditRegistrationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const championship = await getChampionship()
  if (!championship) redirect('/registrations')

  const { data: registration } = await supabase
    .from('registrations')
    .select('*')
    .eq('championship_id', championship.id)
    .eq('user_id', user.id)
    .single()

  if (!registration) redirect('/registrations')

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          {championship.year} {championship.name}
        </p>
        <h1 className="text-3xl font-black text-[var(--foreground)]">Edit Registration</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Update your registration details below.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <EditRegistrationForm registration={registration} />
      </div>
    </div>
  )
}
