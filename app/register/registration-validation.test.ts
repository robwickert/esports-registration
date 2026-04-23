import { describe, it, expect } from 'vitest'

// Validation helpers extracted for unit testing

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password: string): boolean {
  return password.length >= 8
}

function validateSteamId(steamId: string): boolean {
  // Steam IDs are 17-digit numbers (SteamID64 format)
  return /^\d{17}$/.test(steamId)
}

function validatePhone(phone: string): boolean {
  // Allow digits, spaces, dashes, parentheses, and leading +
  return /^\+?[\d\s\-().]{7,20}$/.test(phone.trim())
}

function buildRegistrationPayload(form: {
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  phone: string
  steamId: string
  consentProfiling: boolean
  consentMarketing: boolean
  acceptedRegulation: boolean
}) {
  return {
    email: form.email.trim().toLowerCase(),
    first_name: form.firstName.trim(),
    last_name: form.lastName.trim(),
    date_of_birth: form.dateOfBirth,
    nationality: form.nationality,
    phone: form.phone.trim(),
    steam_id: form.steamId.trim(),
    consent_profiling: form.consentProfiling,
    consent_marketing: form.consentMarketing,
    accepted_regulation: form.acceptedRegulation,
  }
}

// ─── Email validation ──────────────────────────────────────────────────────────

describe('validateEmail', () => {
  it('accepts valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('driver.name+tag@racing.org')).toBe(true)
    expect(validateEmail('a@b.co')).toBe(true)
  })

  it('rejects invalid emails', () => {
    expect(validateEmail('')).toBe(false)
    expect(validateEmail('notanemail')).toBe(false)
    expect(validateEmail('@nodomain.com')).toBe(false)
    expect(validateEmail('user@')).toBe(false)
    expect(validateEmail('user @example.com')).toBe(false)
  })
})

// ─── Password validation ───────────────────────────────────────────────────────

describe('validatePassword', () => {
  it('accepts passwords of 8+ characters', () => {
    expect(validatePassword('password')).toBe(true)
    expect(validatePassword('supersecret123!')).toBe(true)
  })

  it('rejects short passwords', () => {
    expect(validatePassword('')).toBe(false)
    expect(validatePassword('abc')).toBe(false)
    expect(validatePassword('1234567')).toBe(false)
  })
})

// ─── Steam ID validation ───────────────────────────────────────────────────────

describe('validateSteamId', () => {
  it('accepts valid 17-digit Steam IDs', () => {
    expect(validateSteamId('76561198012345678')).toBe(true)
    expect(validateSteamId('76561197960287930')).toBe(true)
  })

  it('rejects non-numeric or wrong-length IDs', () => {
    expect(validateSteamId('')).toBe(false)
    expect(validateSteamId('STEAM_0:1:123456')).toBe(false)
    expect(validateSteamId('7656119801234567')).toBe(false)   // 16 digits
    expect(validateSteamId('765611980123456789')).toBe(false) // 18 digits
    expect(validateSteamId('7656119801234567x')).toBe(false)  // non-numeric
  })
})

// ─── Phone validation ─────────────────────────────────────────────────────────

describe('validatePhone', () => {
  it('accepts common phone formats', () => {
    expect(validatePhone('+44 7700 900000')).toBe(true)
    expect(validatePhone('+1-555-000-0000')).toBe(true)
    expect(validatePhone('0039 06 1234567')).toBe(true)
    expect(validatePhone('(555) 867-5309')).toBe(true)
  })

  it('rejects too-short or clearly invalid numbers', () => {
    expect(validatePhone('')).toBe(false)
    expect(validatePhone('123')).toBe(false)
    expect(validatePhone('not-a-phone-number-at-all!!')).toBe(false)
  })
})

// ─── Payload builder ──────────────────────────────────────────────────────────

describe('buildRegistrationPayload', () => {
  const base = {
    email: '  User@Example.COM  ',
    firstName: '  Marco  ',
    lastName: '  Rossi  ',
    dateOfBirth: '1995-06-15',
    nationality: 'ITA',
    phone: '+39 02 1234567',
    steamId: '  76561198012345678  ',
    consentProfiling: true,
    consentMarketing: false,
    acceptedRegulation: true,
  }

  it('normalises email to lowercase trimmed', () => {
    const payload = buildRegistrationPayload(base)
    expect(payload.email).toBe('user@example.com')
  })

  it('trims first and last name', () => {
    const payload = buildRegistrationPayload(base)
    expect(payload.first_name).toBe('Marco')
    expect(payload.last_name).toBe('Rossi')
  })

  it('preserves date of birth as-is', () => {
    const payload = buildRegistrationPayload(base)
    expect(payload.date_of_birth).toBe('1995-06-15')
  })

  it('trims steam ID', () => {
    const payload = buildRegistrationPayload(base)
    expect(payload.steam_id).toBe('76561198012345678')
  })

  it('preserves boolean consent values', () => {
    const payload = buildRegistrationPayload(base)
    expect(payload.consent_profiling).toBe(true)
    expect(payload.consent_marketing).toBe(false)
    expect(payload.accepted_regulation).toBe(true)
  })
})
