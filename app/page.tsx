import Link from 'next/link'
import { getChampionship } from '@/lib/championship'
import GmtClock from '@/components/GmtClock'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const championship = await getChampionship()
  const name = championship?.name ?? 'FIA Esports Global Rally Tour'
  const year = championship?.year ?? 2026

  return (
    <div>
      {/* Hero — unified light background */}
      <section className="relative overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent" />
        {/* Decorative right panel */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-[var(--accent)]/5 [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)] hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-4 py-1.5 text-xs font-medium tracking-widest text-[var(--accent)] uppercase">
                <span className="h-1.5 w-1.5 rounded-lg bg-[var(--accent)] animate-pulse" />
                Registration Open — {year} Edition
              </div>
              <GmtClock />
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
              <span className="text-[var(--foreground)]">FIA Esports</span>
              <br />
              <span className="text-[var(--accent)]">Global Rally Tour</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mb-10">
              Compete in the official {year} {name} from
              <br />
              <span className="text-[var(--accent)] font-semibold">May 12, 2026 at 00:00 GMT</span>{' '}
              to{' '}
              <span className="text-[var(--accent)] font-semibold">May 25, 2026 at 23:59 GMT</span>.
              <br />
              Set the best time possible in this challenge to qualify for your
              respective onsite Regional Shootout.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
              >
                Register Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/leaderboards"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-sm font-bold text-[var(--foreground)] tracking-wide uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                View Leaderboards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-3 gap-8">
          {[
            { value: String(year), label: 'Season', href: undefined },
            { value: 'Global', label: 'Competition', href: undefined },
            { value: 'Assetto Corsa Rally', label: 'Platform', href: 'https://store.steampowered.com/app/3917090/Assetto_Corsa_Rally/' },
          ].map(({ value, label, href }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-[var(--accent)]">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">{value}</a>
                ) : value}
              </div>
              <div className="mt-1 text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 text-center">
            <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
              How to Compete
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)]">
              Three Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register',
                desc: 'Create your account and complete the official registration form with your details.',
              },
              {
                step: '02',
                title: 'Qualify',
                desc: <>Set your best lap times in the qualifying sessions using <a href="https://store.steampowered.com/app/3917090/Assetto_Corsa_Rally/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Assetto Corsa Rally</a>.</>,
              },
              {
                step: '03',
                title: 'Compete',
                desc: 'Be one of the fastest eight* in your Region to be invited to your respective onsite Regional Shootout.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="shrink-0 text-4xl font-black text-[var(--accent)]/25">
                  {step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-[var(--muted)]">* fastest sixteen for Europe</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-6">
          Ready to Race?
        </h2>
        <p className="text-[var(--muted)] mb-10 max-w-xl mx-auto">
          Register now to secure your place in the {year} {name}.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-10 py-4 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
        >
          Register Now
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </section>
    </div>
  )
}
