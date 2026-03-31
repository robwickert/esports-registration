'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/regulations', label: 'Regulations' },
  { href: '/leaderboards', label: 'Leaderboards' },
  { href: '/register', label: 'Register' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--accent)]">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
              Esports
            </span>
            <span className="text-sm font-bold tracking-wider text-white uppercase">
              FIA Motorsport Games
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'px-4 py-2 text-sm font-medium tracking-wide rounded transition-colors',
                  isActive
                    ? 'text-white bg-[var(--surface-2)]'
                    : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface-2)]',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/registrations"
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded transition-colors"
          >
            My Registration
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[var(--muted)] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-[var(--muted)] hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-[var(--border)] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-[var(--muted)] hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/registrations"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              My Registration
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
