import { describe, it, expect } from 'vitest'

// Mirrors the safeCsvCell function in AdminTable.tsx
function safeCsvCell(value: string): string {
  const escaped = value.replace(/"/g, '""')
  return /^[=+\-@\t\r]/.test(value) ? `"'${escaped}"` : `"${escaped}"`
}

describe('safeCsvCell', () => {
  it('wraps normal values in double quotes', () => {
    expect(safeCsvCell('Marco Rossi')).toBe('"Marco Rossi"')
    expect(safeCsvCell('ITA')).toBe('"ITA"')
    expect(safeCsvCell('user@example.com')).toBe('"user@example.com"')
  })

  it('escapes internal double quotes', () => {
    expect(safeCsvCell('He said "hello"')).toBe('"He said ""hello"""')
  })

  it('prefixes = to prevent formula injection', () => {
    expect(safeCsvCell('=cmd|"/c calc"!A1')).toBe(`"'=cmd|""/c calc""!A1"`)
  })

  it('prefixes + to prevent formula injection', () => {
    expect(safeCsvCell('+1234')).toBe(`"'+1234"`)
  })

  it('prefixes - to prevent formula injection', () => {
    expect(safeCsvCell('-1234')).toBe(`"'-1234"`)
  })

  it('prefixes @ to prevent formula injection', () => {
    expect(safeCsvCell('@SUM(A1:A10)')).toBe(`"'@SUM(A1:A10)"`)
  })

  it('prefixes tab character to prevent injection', () => {
    expect(safeCsvCell('\tmalicious')).toBe(`"'\tmalicious"`)
  })

  it('prefixes carriage return to prevent injection', () => {
    expect(safeCsvCell('\rmalicious')).toBe(`"'\rmalicious"`)
  })

  it('does not prefix safe values that contain formula chars mid-string', () => {
    expect(safeCsvCell('name=value')).toBe('"name=value"')
    expect(safeCsvCell('price+tax')).toBe('"price+tax"')
  })

  it('handles empty string', () => {
    expect(safeCsvCell('')).toBe('""')
  })
})
