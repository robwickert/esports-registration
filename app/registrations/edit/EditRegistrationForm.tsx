'use client'

import { useState } from 'react'
import { updateRegistration } from '@/app/actions/registration'
import { COUNTRIES } from '@/lib/countries'

type Registration = {
  id: string
  first_name: string
  last_name: string
  country: string
  phone: string
  steam_id: string
  consent_profiling: boolean
  consent_marketing: boolean
  accepted_regulation: boolean
}

export default function EditRegistrationForm({ registration }: { registration: Registration }) {
  const [firstName, setFirstName] = useState(registration.first_name)
  const [lastName, setLastName] = useState(registration.last_name)
  const [country, setCountry] = useState(registration.country)
  const [phone, setPhone] = useState(registration.phone)
  const [steamId, setSteamId] = useState(registration.steam_id)
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
      country,
      phone,
      steamId,
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
    'w-full rounded border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-white placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors'
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
        <label className={labelClass}>Country *</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className={inputClass}
        >
          <option value="">Select country</option>
          {COUNTRIES.map(({ code, name }) => (
            <option key={code} value={code}>
              {name} ({code})
            </option>
          ))}
        </select>
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

      {/* Consents */}
      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentProfiling}
            onChange={(e) => setConsentProfiling(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)] group-hover:text-white transition-colors leading-relaxed">
            I consent to the processing of my personal data for{' '}
            <strong className="text-white">profiling purposes</strong>.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentMarketing}
            onChange={(e) => setConsentMarketing(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--muted)] group-hover:text-white transition-colors leading-relaxed">
            I consent to the processing of my personal data for{' '}
            <strong className="text-white">marketing purposes</strong>.
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
          <span className="text-sm text-[var(--muted)] group-hover:text-white transition-colors leading-relaxed">
            <strong className="text-white">Accept Regulations *</strong> — I declare that I have
            read and accepted the{' '}
            <a href="/regulations" target="_blank" className="text-[var(--accent)] hover:underline">
              Rules for participation
            </a>
            .
          </span>
        </label>
      </div>

      {error && (
        <div className="rounded border border-red-800/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <a
          href="/registrations"
          className="flex-1 rounded border border-[var(--border)] px-6 py-3 text-sm font-bold text-center text-[var(--muted)] hover:text-white hover:border-white transition-colors"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
