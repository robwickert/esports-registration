'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

type Entry = {
  id: string
  position: number
  full_name: string
  country: string
  car: string
  time_display: string
}

type Props = {
  championshipId: string
  categories: string[]
}

export default function LeaderboardsClient({ championshipId, categories }: Props) {
  const [category, setCategory] = useState(categories[0] ?? '')
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    let query = supabase
      .from('leaderboard_entries')
      .select('id, position, full_name, country, car, time_display')
      .eq('championship_id', championshipId)
      .eq('category', category)
      .order('position', { ascending: true })

    if (countryFilter) {
      query = query.eq('country', countryFilter)
    }

    const { data } = await query
    setEntries(data ?? [])
    setLoading(false)
  }, [championshipId, category, countryFilter])

  useEffect(() => {
    if (category) fetchEntries()
  }, [fetchEntries, category])

  const filtered = search
    ? entries.filter((e) =>
        e.full_name.toLowerCase().includes(search.toLowerCase())
      )
    : entries

  // Unique countries from loaded entries for the filter dropdown
  const countries = [...new Set(entries.map((e) => e.country))].sort()

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Category selector */}
        <div className="flex-1">
          <label className="block text-xs font-medium tracking-widest text-[var(--muted)] uppercase mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setCountryFilter('')
              setSearch('')
            }}
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Country filter */}
        <div className="flex-1">
          <label className="block text-xs font-medium tracking-widest text-[var(--muted)] uppercase mb-2">
            Country
          </label>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white focus:border-[var(--accent)] focus:outline-none transition-colors"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Name search */}
        <div className="flex-1">
          <label className="block text-xs font-medium tracking-widest text-[var(--muted)] uppercase mb-2">
            Search Driver
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-[var(--muted)] uppercase w-16">
                  Pos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                  Driver
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                  Country
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                  Car
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
                  Best Lap
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-[var(--muted)]">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                      Loading leaderboard...
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-[var(--muted)]">
                    No results found.
                  </td>
                </tr>
              ) : (
                filtered.map((entry, idx) => {
                  const isTop3 = entry.position <= 3
                  return (
                    <tr
                      key={entry.id}
                      className={[
                        'border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--surface-2)]',
                        idx % 2 === 0 ? 'bg-[var(--background)]' : 'bg-[var(--surface)]/50',
                      ].join(' ')}
                    >
                      <td className="px-6 py-4">
                        <span
                          className={[
                            'inline-flex h-7 w-7 items-center justify-center rounded text-xs font-black',
                            entry.position === 1
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : entry.position === 2
                              ? 'bg-slate-400/20 text-slate-300'
                              : entry.position === 3
                              ? 'bg-orange-700/20 text-orange-400'
                              : 'text-[var(--muted)]',
                          ].join(' ')}
                        >
                          {entry.position}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={isTop3 ? 'font-semibold text-white' : 'text-white'}>
                          {entry.full_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--muted)]">{entry.country}</td>
                      <td className="px-6 py-4 text-[var(--muted)]">{entry.car}</td>
                      <td className="px-6 py-4 text-right font-mono font-medium text-[var(--accent)]">
                        {entry.time_display}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && filtered.length > 0 && (
        <p className="mt-4 text-xs text-[var(--muted)] text-right">
          Showing {filtered.length} driver{filtered.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
