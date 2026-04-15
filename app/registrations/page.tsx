import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/actions/auth'

export const dynamic = 'force-dynamic'

export default async function RegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string; updated?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Check if admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  // Get championship
  const slug = process.env.NEXT_PUBLIC_CHAMPIONSHIP_SLUG ?? 'fia-motorsport-games-2026'
  const { data: championship } = await supabase
    .from('championships')
    .select('id, name, year')
    .eq('slug', slug)
    .single()

  // Get registration
  let registration = null
  if (championship) {
    const { data } = await supabase
      .from('registrations')
      .select('*')
      .eq('championship_id', championship.id)
      .eq('user_id', user.id)
      .single()
    registration = data
  }

  const { registered, updated } = await searchParams

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-2">
            My Account
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)]">My Registration</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {profile?.is_admin && (
            <Link
              href="/admin"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              Admin Panel
            </Link>
          )}
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Success banners */}
      {registered && (
        <div className="mb-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-5 py-4 flex items-start gap-3">
          <svg className="h-5 w-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Registration confirmed</p>
            <p className="text-sm text-[var(--muted)] mt-0.5">Welcome to the 2026 FIA Motorsport Games Esports Championship. You&apos;re all set.</p>
          </div>
        </div>
      )}
      {updated && (
        <div className="mb-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-5 py-4 flex items-start gap-3">
          <svg className="h-5 w-5 shrink-0 text-[var(--accent)] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-[var(--foreground)]">Your registration has been updated.</p>
        </div>
      )}

      {/* Registration card */}
      {!registration ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <div className="text-4xl mb-4">🏁</div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No Registration Found</h2>
          <p className="text-[var(--muted)] mb-6 text-sm">
            You don&apos;t have a registration for the{' '}
            {championship ? `${championship.year} ${championship.name}` : 'current championship'} yet.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
          >
            Register Now
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
          {/* Card header */}
          <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[var(--foreground)]">{championship?.name}</h2>
              <p className="text-xs text-[var(--muted)] mt-0.5">Season {championship?.year}</p>
            </div>
            <Link
              href="/registrations/edit"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              Edit
            </Link>
          </div>

          {/* Fields */}
          <dl className="divide-y divide-[var(--border)]">
            {[
              { label: 'Full Name', value: `${registration.first_name} ${registration.last_name}` },
              { label: 'Email', value: registration.email },
              { label: 'Country', value: registration.country },
              { label: 'Phone', value: registration.phone },
              { label: 'Steam ID', value: registration.steam_id },
              {
                label: 'Consent — Profiling',
                value: registration.consent_profiling ? 'Yes' : 'No',
              },
              {
                label: 'Consent — Marketing',
                value: registration.consent_marketing ? 'Yes' : 'No',
              },
              {
                label: 'Regulations Accepted',
                value: registration.accepted_regulation ? 'Yes' : 'No',
              },
            ].map(({ label, value }) => (
              <div key={label} className="grid grid-cols-2 gap-4 px-8 py-4">
                <dt className="text-xs font-medium tracking-wide text-[var(--muted)] uppercase self-center">
                  {label}
                </dt>
                <dd className="text-sm text-[var(--foreground)]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-[var(--border)] px-8 py-4">
            <p className="text-xs text-[var(--muted)]">
              Registered:{' '}
              {new Date(registration.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
