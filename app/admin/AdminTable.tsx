'use client'

import { useRouter } from 'next/navigation'

type Registration = {
  id: string
  email: string
  first_name: string
  last_name: string
  country: string
  phone: string
  steam_id: string
  consent_profiling: boolean
  consent_marketing: boolean
  accepted_regulation: boolean
  created_at: string
}

type Props = {
  registrations: Registration[]
  countries: string[]
  currentCountry: string
  championshipId: string
}

export default function AdminTable({ registrations, countries, currentCountry }: Props) {
  const router = useRouter()

  function handleCountryChange(country: string) {
    const params = new URLSearchParams()
    if (country) params.set('country', country)
    router.push(`/admin?${params.toString()}`)
  }

  function exportCsv() {
    const headers = [
      'First Name',
      'Last Name',
      'Email',
      'Country',
      'Phone',
      'Steam ID',
      'Consent Profiling',
      'Consent Marketing',
      'Accepted Regulation',
      'Registered At',
    ]

    const rows = registrations.map((r) => [
      r.first_name,
      r.last_name,
      r.email,
      r.country,
      r.phone,
      r.steam_id,
      r.consent_profiling ? 'Yes' : 'No',
      r.consent_marketing ? 'Yes' : 'No',
      r.accepted_regulation ? 'Yes' : 'No',
      new Date(r.created_at).toISOString(),
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

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
            Filter by Country
          </label>
          <select
            value={currentCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
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
                  'Country',
                  'Phone',
                  'Steam ID',
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
                  <td colSpan={9} className="px-4 py-12 text-center text-[var(--muted)]">
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
                    <td className="px-4 py-3 text-[var(--muted)]">{r.country}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{r.phone}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">{r.steam_id}</td>
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
