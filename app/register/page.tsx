import RegisterForm from './RegisterForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getChampionship } from '@/lib/championship'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Logged-in users go straight to their registration
  if (user) {
    redirect('/registrations')
  }

  const championship = await getChampionship()
  const year = championship?.year ?? 2026

  return (
    <div className="relative min-h-screen">
      {/* Background image — right 50% */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-[70%]">
          <Image
            src="/fia-acr-rally-car-image-02.jpg"
            alt=""
            fill
            className="object-cover object-left"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #f4f6f9 0%, rgba(244,246,249,0.7) 30%, rgba(244,246,249,0.2) 60%, rgba(244,246,249,0) 80%)',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-2xl px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
            {year} Season
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4">Register to Compete</h1>
          <p className="text-[var(--muted)]">
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
    </div>
  )
}
