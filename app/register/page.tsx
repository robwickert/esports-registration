import RegisterForm from './RegisterForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Logged-in users go straight to their registration
  if (user) {
    redirect('/registrations')
  }

  const slug = process.env.NEXT_PUBLIC_CHAMPIONSHIP_SLUG ?? 'fia-motorsport-games-2026'
  const { data: championship } = await supabase
    .from('championships')
    .select('name, year')
    .eq('slug', slug)
    .single()

  const year = championship?.year ?? 2026

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          {year} Season
        </p>
        <h1 className="text-4xl font-black text-[var(--foreground)]">Register to Compete</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Already registered?{' '}
          <a href="/login" className="text-[var(--accent)] hover:underline">
            Sign in
          </a>
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <RegisterForm />
      </div>
    </div>
  )
}
