import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,57,70,0.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-medium tracking-widest text-[var(--accent)] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Registration Open — 2026 Season
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
              FIA Motorsport
              <br />
              <span className="text-[var(--accent)]">Games Esports</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mb-10">
              Compete in the official FIA Motorsport Games online championship.
              Race on Assetto Corsa Rally across multiple categories — from F4
              to GT — and prove your pace against the best sim racers in the
              world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
              >
                Register Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/leaderboards"
                className="inline-flex items-center gap-2 rounded border border-[var(--border)] px-8 py-3.5 text-sm font-bold text-white tracking-wide uppercase hover:border-white transition-colors"
              >
                View Leaderboards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '2', label: 'Race Categories' },
            { value: '2026', label: 'Season' },
            { value: 'Global', label: 'Competition' },
            { value: 'AC Rally', label: 'Platform' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="mt-1 text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
            Race Categories
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Choose Your Class
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              tag: 'Single Seater',
              name: 'Formula 4',
              abbr: 'F4',
              desc: 'The entry point into single-seater racing. Equal machinery, pure driver skill.',
              car: 'Tatuus F4-T421',
            },
            {
              tag: 'Sports Car',
              name: 'Gran Turismo',
              abbr: 'GT',
              desc: 'High-performance GT3-class machines. Tactical racing at its finest.',
              car: 'Multiple GT3 Manufacturers',
            },
          ].map(({ tag, name, abbr, desc, car }) => (
            <div
              key={abbr}
              className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--accent)]/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-6 text-8xl font-black text-[var(--border)] select-none group-hover:text-[var(--accent)]/10 transition-colors">
                {abbr}
              </div>
              <div className="relative">
                <span className="inline-block mb-3 text-xs font-medium tracking-widest text-[var(--accent)] uppercase">
                  {tag}
                </span>
                <h3 className="text-2xl font-black text-white mb-3">{name}</h3>
                <p className="text-[var(--muted)] leading-relaxed mb-4">{desc}</p>
                <p className="text-xs font-medium text-[var(--muted)]">
                  Vehicle: <span className="text-white">{car}</span>
                </p>
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
            <h2 className="text-3xl md:text-4xl font-black text-white">
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
                desc: 'Set your best lap times in the qualifying sessions using Assetto Corsa Rally.',
              },
              {
                step: '03',
                title: 'Compete',
                desc: 'Join the official race events and battle for the FIA Motorsport Games title.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div className="shrink-0 text-4xl font-black text-[var(--accent)]/30">
                  {step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
          Ready to Race?
        </h2>
        <p className="text-[var(--muted)] mb-10 max-w-xl mx-auto">
          Spots are limited. Register now to secure your place in the 2026 FIA
          Motorsport Games Esports championship.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded bg-[var(--accent)] px-10 py-4 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
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
