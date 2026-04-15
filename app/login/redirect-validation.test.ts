import { describe, it, expect } from 'vitest'

// Mirrors the redirect destination logic in LoginForm.tsx
function resolveDestination(
  redirectTo: string | undefined,
  isAdmin: boolean,
): string {
  const defaultDestination = isAdmin ? '/admin' : '/registrations'
  if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
    return redirectTo
  }
  return defaultDestination
}

describe('resolveDestination', () => {
  describe('default routing', () => {
    it('sends regular users to /registrations', () => {
      expect(resolveDestination(undefined, false)).toBe('/registrations')
    })

    it('sends admin users to /admin', () => {
      expect(resolveDestination(undefined, true)).toBe('/admin')
    })
  })

  describe('safe internal redirectTo', () => {
    it('honours a valid relative path', () => {
      expect(resolveDestination('/registrations/edit', false)).toBe('/registrations/edit')
    })

    it('honours /admin as redirectTo for admin users', () => {
      expect(resolveDestination('/admin', true)).toBe('/admin')
    })

    it('honours a deeply nested path', () => {
      expect(resolveDestination('/some/internal/page', false)).toBe('/some/internal/page')
    })
  })

  describe('open redirect prevention', () => {
    it('ignores absolute http URLs', () => {
      expect(resolveDestination('http://evil.com', false)).toBe('/registrations')
      expect(resolveDestination('http://evil.com', true)).toBe('/admin')
    })

    it('ignores absolute https URLs', () => {
      expect(resolveDestination('https://evil.com/steal', false)).toBe('/registrations')
    })

    it('ignores protocol-relative URLs (//evil.com)', () => {
      expect(resolveDestination('//evil.com', false)).toBe('/registrations')
    })

    it('ignores javascript: URIs', () => {
      expect(resolveDestination('javascript:alert(1)', false)).toBe('/registrations')
    })

    it('ignores empty string', () => {
      expect(resolveDestination('', false)).toBe('/registrations')
    })
  })
})
