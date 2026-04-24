import { getChampionship } from '@/lib/championship'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function RegulationsPage() {
  const championship = await getChampionship()
  const name = championship?.name ?? 'FIA Esports Global Rally Tour'
  const year = championship?.year ?? 2026

  return (
    <div className="relative min-h-screen">
      {/* Background image — right 60% */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-[70%]">
          <Image
            src="/fia-acr-rally-car-image-06.jpg"
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

    <div className="relative mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          Official Documents
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4">
          Competition Regulations
        </h1>
        <p className="text-[var(--muted)]">
          {year} {name}
        </p>
      </div>

      <div className="space-y-4">
        {/* Sporting Regulations */}
        <a
          href="/fia-esports-global-rally-tour-sporting-regulations.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10">
              <svg className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                Sporting Regulations
              </p>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                {year} {name} — Official Sporting Regulations
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PDF
          </div>
        </a>

        {/* Appendix E */}
        <a
          href="/fia-esports-appendix-e-international-sporting-code.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10">
              <svg className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                Appendix E — FIA International Sporting Code
              </p>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                FIA International Sporting Code — Appendix E
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PDF
          </div>
        </a>
      </div>

      {/* Accept CTA */}
      <div className="mt-12 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-8 text-center" style={{ backgroundColor: '#f4f6f9' }}>
        <p className="text-[var(--foreground)] font-medium mb-2">Ready to compete?</p>
        <p className="text-[var(--muted)] text-sm mb-6">
          By registering you confirm you have read and accept the Sporting Regulations.
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
        >
          Register Now
        </a>
      </div>
    </div>
    </div>
  )
}
