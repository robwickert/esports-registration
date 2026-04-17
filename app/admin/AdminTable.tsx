'use client'

import { useRouter } from 'next/navigation'
import { buildCsv } from './csv-export'

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
}

export default function AdminTable({ registrations, nationalities, currentNationality }: Props) {
  const router = useRouter()

  function handleNationalityChange(nationality: string) {
    const params = new URLSearchParams()
    if (nationality) params.set('nationality', nationality)
    router.push(`/admin?${params.toString()}`)
  }

  function exportCsv() {
    const headers = [
      'First Name',
      'Last Name',
      'Email',
      'Nationality',
      'Phone',
      'Steam ID',
      'Legal Age',
      'Named Competitor First Name',
      'Named Competitor Last Name',
      'Named Competitor Nationality',
      'Named Competitor Email',
      'Named Competitor Phone',
      'Consent Profiling',
      'Consent Marketing',
      'Accepted Regulation',
      'Registered At',
    ]

    const rows = registrations.map((r) => [
      r.first_name,
      r.last_name,
      r.email,
      r.nationality,
      r.phone,
      r.steam_id,
      r.is_of_legal_age ? 'Yes' : 'No',
      r.named_competitor_first_name ?? '',
      r.named_competitor_last_name ?? '',
      r.named_competitor_nationality ?? '',
      r.named_competitor_email ?? '',
      r.named_competitor_phone ?? '',
      r.consent_profiling ? 'Yes' : 'No',
      r.consent_marketing ? 'Yes' : 'No',
      r.accepted_regulation ? 'Yes' : 'No',
      new Date(r.created_at).toISOString(),
    ])

    const csv = buildCsv(headers, rows.map((row) => row.map(String)))

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex-1 min-w-48">
          <label className="block text-xs font-medium tracking-widest text-[var(--muted)] uppercase mb-2">
            Filter by Nationality
          </label>
          <select
            value={currentNationality}
            onChange={(e) => handleNationalityChange(e.target.value)}
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          >
            <option value="">All Nationalities</option>
            {nationalities.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-[var(--muted)]">
            <span className="font-bold text-[var(--foreground)]">{registrations.length}</span> registrations
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
                    <td className="px-4 py-3 text-[var(--muted)]">{r.nationality}</td>
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
