import { describe, it, expect } from 'vitest'

type Entry = {
  id: string
  position: number
  full_name: string
  country: string
  car: string
  time_display: string
  time_ms: number
}

// Client-side filter function (mirrors LeaderboardsClient search logic)
function filterByName(entries: Entry[], search: string): Entry[] {
  if (!search) return entries
  const q = search.toLowerCase()
  return entries.filter((e) => e.full_name.toLowerCase().includes(q))
}

// Sort by position ascending (what the DB returns, but tested here)
function sortByPosition(entries: Entry[]): Entry[] {
  return [...entries].sort((a, b) => a.position - b.position)
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const millis = ms % 1000
  return `${minutes}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

const SAMPLE_ENTRIES: Entry[] = [
  { id: '1', position: 1, full_name: 'Marco Rossi',    country: 'ITA', car: 'Tatuus F4', time_display: '1:23.456', time_ms: 83456 },
  { id: '2', position: 2, full_name: 'Lucas Weber',    country: 'DEU', car: 'Tatuus F4', time_display: '1:23.789', time_ms: 83789 },
  { id: '3', position: 3, full_name: 'Sophie Laurent', country: 'FRA', car: 'Tatuus F4', time_display: '1:24.012', time_ms: 84012 },
  { id: '4', position: 4, full_name: 'Carlos Mendez',  country: 'ESP', car: 'Tatuus F4', time_display: '1:24.301', time_ms: 84301 },
]

describe('filterByName', () => {
  it('returns all entries when search is empty', () => {
    expect(filterByName(SAMPLE_ENTRIES, '')).toHaveLength(4)
  })

  it('filters case-insensitively', () => {
    expect(filterByName(SAMPLE_ENTRIES, 'ROSSI')).toHaveLength(1)
    expect(filterByName(SAMPLE_ENTRIES, 'rossi')).toHaveLength(1)
    expect(filterByName(SAMPLE_ENTRIES, 'Rossi')).toHaveLength(1)
  })

  it('matches partial names', () => {
    expect(filterByName(SAMPLE_ENTRIES, 'mar')).toHaveLength(1)
    expect(filterByName(SAMPLE_ENTRIES, 'l')).toHaveLength(3) // Lucas, Sophie Laurent, Carlos
  })

  it('returns empty array when no match', () => {
    expect(filterByName(SAMPLE_ENTRIES, 'zzznomatch')).toHaveLength(0)
  })
})

describe('sortByPosition', () => {
  it('sorts ascending by position', () => {
    const shuffled = [SAMPLE_ENTRIES[2], SAMPLE_ENTRIES[0], SAMPLE_ENTRIES[3], SAMPLE_ENTRIES[1]]
    const sorted = sortByPosition(shuffled)
    expect(sorted.map((e) => e.position)).toEqual([1, 2, 3, 4])
  })

  it('does not mutate the original array', () => {
    const input = [SAMPLE_ENTRIES[1], SAMPLE_ENTRIES[0]]
    sortByPosition(input)
    expect(input[0].position).toBe(2) // unchanged
  })
})

describe('formatTime', () => {
  it('formats milliseconds into m:ss.mmm', () => {
    expect(formatTime(83456)).toBe('1:23.456')
    expect(formatTime(60000)).toBe('1:00.000')
    expect(formatTime(65010)).toBe('1:05.010')
    expect(formatTime(105123)).toBe('1:45.123')
  })

  it('pads seconds and millis with leading zeros', () => {
    expect(formatTime(60001)).toBe('1:00.001')
    expect(formatTime(61001)).toBe('1:01.001')
  })
})
