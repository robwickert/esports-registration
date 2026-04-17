export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              src="/esports-logo-white-on-blue.png"
              alt="FIA Esports Global Rally Tour"
              className="h-12 w-auto"
            />
            <p className="text-xs text-[var(--muted)]">
              A part of the official FIA Esports program
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[var(--muted)]">
            <a href="/about" className="hover:text-[var(--foreground)] transition-colors">
              About
            </a>
            <a href="/regulations" className="hover:text-[var(--foreground)] transition-colors">
              Regulations
            </a>
            <a href="/leaderboards" className="hover:text-[var(--foreground)] transition-colors">
              Leaderboards
            </a>
            <a href="/register" className="hover:text-[var(--foreground)] transition-colors">
              Register
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--muted)]">
          © {year} FIA Esports. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
