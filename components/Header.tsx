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
    <header className="sticky top-0 z-50 bg-[#003063] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/esports-logo-blue-on-white.png"
            alt="FIA Esports Global Rally Tour"
            className="h-12 w-auto"
          />
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
                  'px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-colors',
                  isActive
                    ? 'text-white bg-white/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10',
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
            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/registrations"
            className="px-4 py-2 text-sm font-medium text-[#003063] bg-white hover:bg-white/90 rounded-lg transition-colors"
          >
            My Registration
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
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
        <div className="md:hidden border-t border-white/20 bg-[#002050] px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-white/20 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/registrations"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-white hover:text-white/80 transition-colors"
            >
              My Registration
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
