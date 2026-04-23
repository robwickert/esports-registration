'use client'

import { useState } from 'react'
import { updateRegistration } from '@/app/actions/registration'
import CountrySelect from '@/components/CountrySelect'

type Registration = {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
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
}

export default function EditRegistrationForm({ registration }: { registration: Registration }) {
  const [firstName, setFirstName] = useState(registration.first_name)
  const [lastName, setLastName] = useState(registration.last_name)
  const [dateOfBirth, setDateOfBirth] = useState(registration.date_of_birth)
  const [nationality, setNationality] = useState(registration.nationality)
  const [phone, setPhone] = useState(registration.phone)
  const [steamId, setSteamId] = useState(registration.steam_id)
  const [isOfLegalAge, setIsOfLegalAge] = useState(registration.is_of_legal_age)
  const [namedCompetitorFirstName, setNamedCompetitorFirstName] = useState(registration.named_competitor_first_name ?? '')
  const [namedCompetitorLastName, setNamedCompetitorLastName] = useState(registration.named_competitor_last_name ?? '')
  const [namedCompetitorNationality, setNamedCompetitorNationality] = useState(registration.named_competitor_nationality ?? '')
  const [namedCompetitorEmail, setNamedCompetitorEmail] = useState(registration.named_competitor_email ?? '')
  const [namedCompetitorPhone, setNamedCompetitorPhone] = useState(registration.named_competitor_phone ?? '')
  const [consentProfiling, setConsentProfiling] = useState(registration.consent_profiling)
  const [consentMarketing, setConsentMarketing] = useState(registration.consent_marketing)
  const [acceptedRegulation, setAcceptedRegulation] = useState(registration.accepted_regulation)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await updateRegistration(registration.id, {
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      phone,
      steamId,
      isOfLegalAge,
      namedCompetitorFirstName,
      namedCompetitorLastName,
      namedCompetitorNationality,
      namedCompetitorEmail,
      namedCompetitorPhone,
      consentProfiling,
      consentMarketing,
      acceptedRegulation,
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors'
  const labelClass =
    'block text-xs font-medium tracking-wide text-[var(--muted)] uppercase mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Date of Birth *</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Nationality (according to passport) *</label>
        <CountrySelect
          value={nationality}
          onChange={setNationality}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Phone Number *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Steam ID *</label>
        <input
          type="text"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={isOfLegalAge}
          onChange={(e) => setIsOfLegalAge(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
          I am above the legal age in my country/territory
        </span>
      </label>

      {/* Named Competitor — always rendered, hidden via CSS */}
      <div className={isOfLegalAge ? 'hidden' : ''}>
        <h3 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-2 pb-2 border-b border-[var(--border)]">
          Named Competitor
        </h3>
        <p className="text-xs text-[var(--muted)] mb-4 leading-relaxed">
          In accordance with Art. 12.2.3. of the official sporting regulations, Esports Drivers who are not of the minimum legal age in their country/territory of nationality at the time of the Competition cannot be their own Competitor and must name another person of legal age holding a valid Competitor Licence to act as their Competitor.
        </p>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input
                type="text"
                value={namedCompetitorFirstName}
                onChange={(e) => setNamedCompetitorFirstName(e.target.value)}
                required={!isOfLegalAge}
                className={inputClass}
                placeholder="First name"
              />
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input
                type="text"
                value={namedCompetitorLastName}
                onChange={(e) => setNamedCompetitorLastName(e.target.value)}
                required={!isOfLegalAge}
                className={inputClass}
                placeholder="Last name"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Nationality (according to passport) *</label>
            <CountrySelect
              value={namedCompetitorNationality}
              onChange={setNamedCompetitorNationality}
              required={!isOfLegalAge}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              value={namedCompetitorEmail}
              onChange={(e) => setNamedCompetitorEmail(e.target.value)}
              required={!isOfLegalAge}
              className={inputClass}
              placeholder="competitor@email.com"
            />
          </div>
          <div>
            <label className={labelClass}>Phone Number *</label>
            <input
              type="tel"
              value={namedCompetitorPhone}
              onChange={(e) => setNamedCompetitorPhone(e.target.value)}
              required={!isOfLegalAge}
              className={inputClass}
              placeholder="+1 555 000 0000"
            />
          </div>
        </div>
      </div>

      {/* Consents */}
      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentProfiling}
            onChange={(e) => setConsentProfiling(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
            I consent to the processing of my personal data for{' '}
            <strong className="text-[var(--foreground)]">profiling purposes</strong>.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentMarketing}
            onChange={(e) => setConsentMarketing(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
            I consent to the processing of my personal data for{' '}
            <strong className="text-[var(--foreground)]">marketing purposes</strong>.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedRegulation}
            onChange={(e) => setAcceptedRegulation(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
            <strong className="text-[var(--foreground)]">Accept Regulations *</strong> — I declare that I have
            read and accepted the{' '}
            <a href="/regulations" target="_blank" className="text-[var(--accent)] hover:underline">
              Rules for participation
            </a>
            .
          </span>
        </label>
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <a
          href="/registrations"
          className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-bold text-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
