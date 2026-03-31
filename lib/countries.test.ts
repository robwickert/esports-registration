import { describe, it, expect } from 'vitest'
import { COUNTRIES } from '../lib/countries'

describe('COUNTRIES list', () => {
  it('is non-empty', () => {
    expect(COUNTRIES.length).toBeGreaterThan(0)
  })

  it('every entry has a code and name', () => {
    for (const c of COUNTRIES) {
      expect(c.code).toBeTruthy()
      expect(c.name).toBeTruthy()
    }
  })

  it('all codes are exactly 3 uppercase letters', () => {
    for (const c of COUNTRIES) {
      expect(c.code).toMatch(/^[A-Z]{3}$/)
    }
  })

  it('has no duplicate codes', () => {
    const codes = COUNTRIES.map((c) => c.code)
    const unique = new Set(codes)
    expect(unique.size).toBe(codes.length)
  })

  it('has no duplicate names', () => {
    const names = COUNTRIES.map((c) => c.name)
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })
})
