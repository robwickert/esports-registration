'use client'

import { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { countryName } from '@/lib/countries'

type Registration = {
  id: string
  email: string
  first_name: string
  last_name: string
  nationality: string
  phone: string
  steam_id: string
  is_of_legal_age: boolean
  named_competitor_first_name: string | null
  named_competitor_last_name: string | null
  named_competitor_nationality: string | null
  named_competitor_email: string | null
  named_competitor_phone: string | null
  consent_profiling: boolean
  consent_marketing: boolean
  accepted_regulation: boolean
  created_at: string
}

type Props = {
  registrations: Registration[]
  nationalities: string[]
  currentNationality: string
  currentSearch: string
  total: number
  page: number
  pageSize: number
}

export default function AdminTable({
  registrations,
  nationalities,
  currentNationality,
  currentSearch,
  total,
  page,
  pageSize,
}: Props) {
  const router = useRouter()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  function buildUrl(overrides: Record<string, string | number | undefined>) {
    const params = new URLSearchParams()
    const merged = {
      search: currentSearch,
      nationality: currentNationality,
      page: String(page),
      ...Object.fromEntries(
        Object.entries(overrides).map(([k, v]) => [k, v === undefined ? '' : String(v)])
      ),
    }
    if (merged.search) params.set('search', merged.search)
    if (merged.nationality) params.set('nationality', merged.nationality)
    if (merged.page && merged.page !== '1') params.set('page', merged.page)
    return `/admin?${params.toString()}`
  }

  const handleSearchChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        router.push(buildUrl({ search: value, page: 1 }))
      }, 350)
    },
    [currentNationality] // eslint-disable-line react-hooks/exhaustive-deps
  )

  function handleNationalityChange(nationality: string) {
    router.push(buildUrl({ nationality, page: 1 }))
  }

  function exportCsv() {
    const params = new URLSearchParams()
    if (currentSearch) params.set('search', currentSearch)
    if (currentNationality) params.set('nationality', currentNationality)
    window.location.href = `/admin/export?${params.toString()}`
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex-1 min-w-48">
          <label className="block text-xs font-medium tracking-widest text-[var(--muted)] uppercase mb-2">
            Search by Name
          </label>
          <input
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Filter by driver name…"
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors"
          />
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-xs font-medium tracking-widest text-[var(--muted)] uppercase mb-2">
            Filter by Nationality
          </label>
          <select
            value={currentNationality}
            onChange={(e) => handleNationalityChange(e.target.value)}
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15 transition-colors"
          >
            <option value="">All Nationalities</option>
            {nationalities.map((n) => (
              <option key={n} value={n}>
                {countryName(n)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-[var(--muted)] whitespace-nowrap">
            <span className="font-bold text-[var(--foreground)]">{total}</span> registrations
          </div>
          <button
            onClick={exportCsv}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors flex items-center gap-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                {[
                  'Name',
                  'Email',
                  'Nationality',
                  'Phone',
                  'Steam ID',
                  'Legal Age',
                  'Profiling',
                  'Marketing',
                  'Regulations',
                  'Registered',
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium tracking-widest text-[var(--muted)] uppercase whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-[var(--muted)]">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                registrations.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={[
                      'border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)] transition-colors',
                      idx % 2 === 0 ? 'bg-[var(--background)]' : 'bg-[var(--surface)]/40',
                    ].join(' ')}
                  >
                    <td className="px-4 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">
                      {r.first_name} {r.last_name}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">{r.email}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{countryName(r.nationality)}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{r.phone}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{r.steam_id}</td>
                    <td className="px-4 py-3">
                      <Badge value={r.is_of_legal_age} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={r.consent_profiling} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={r.consent_marketing} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={r.accepted_regulation} />
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)] whitespace-nowrap text-xs">
                      {new Date(r.created_at).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-[var(--muted)]">
            Showing {start}–{end} of {total}
          </p>
          <div className="flex items-center gap-2">
            <a
              href={page > 1 ? buildUrl({ page: page - 1 }) : undefined}
              aria-disabled={page <= 1}
              className={[
                'rounded border px-3 py-1.5 text-xs font-medium transition-colors',
                page <= 1
                  ? 'border-[var(--border)] text-[var(--muted)] opacity-40 pointer-events-none'
                  : 'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
              ].join(' ')}
            >
              ← Prev
            </a>
            <span className="text-[var(--muted)] px-2">
              Page {page} of {totalPages}
            </span>
            <a
              href={page < totalPages ? buildUrl({ page: page + 1 }) : undefined}
              aria-disabled={page >= totalPages}
              className={[
                'rounded border px-3 py-1.5 text-xs font-medium transition-colors',
                page >= totalPages
                  ? 'border-[var(--border)] text-[var(--muted)] opacity-40 pointer-events-none'
                  : 'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
              ].join(' ')}
            >
              Next →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function Badge({ value }: { value: boolean }) {
  return (
    <span
      className={[
        'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
        value
          ? 'bg-green-100 text-green-800'
          : 'bg-[var(--surface-2)] text-[var(--muted)]',
      ].join(' ')}
    >
      {value ? 'Yes' : 'No'}
    </span>
  )
}
