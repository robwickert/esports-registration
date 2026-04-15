'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { COUNTRIES } from '@/lib/countries'

type FormData = {
  email: string
  password: string
  firstName: string
  lastName: string
  country: string
  phone: string
  steamId: string
  consentProfiling: boolean
  consentMarketing: boolean
  acceptedRegulation: boolean
}

const INITIAL: FormData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  country: '',
  phone: '',
  steamId: '',
  consentProfiling: false,
  consentMarketing: false,
  acceptedRegulation: false,
}

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(INITIAL)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.acceptedRegulation) {
      setError('You must accept the competition regulations to register.')
      return
    }

    setLoading(true)

    const supabase = createClient()

    // 1. Create auth account
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError('Account creation failed. Please try again.')
      setLoading(false)
      return
    }

    // 2. Sign in immediately so the session is established for RLS
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (signInError) {
      setError('Account created but could not sign in automatically. Please log in manually.')
      setLoading(false)
      return
    }

    // 3. Get active championship
    const slug =
      process.env.NEXT_PUBLIC_CHAMPIONSHIP_SLUG ?? 'fia-motorsport-games-2026'
    const { data: championship } = await supabase
      .from('championships')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!championship) {
      setError('Championship not found. Please contact support.')
      setLoading(false)
      return
    }

    // 4. Create registration
    const { error: regError } = await supabase.from('registrations').insert({
      championship_id: championship.id,
      user_id: authData.user.id,
      email: form.email,
      first_name: form.firstName,
      last_name: form.lastName,
      country: form.country,
      phone: form.phone,
      steam_id: form.steamId,
      consent_profiling: form.consentProfiling,
      consent_marketing: form.consentMarketing,
      accepted_regulation: form.acceptedRegulation,
    })

    if (regError) {
      setError(regError.message)
      setLoading(false)
      return
    }

    router.push('/registrations?registered=1')
    router.refresh()
  }

  const inputClass =
    'w-full rounded border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors'
  const labelClass =
    'block text-xs font-medium tracking-wide text-[var(--muted)] uppercase mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account section */}
      <div>
        <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border)]">
          Account
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
              autoComplete="email"
              className={inputClass}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className={labelClass}>Password *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
              className={inputClass}
              placeholder="Minimum 8 characters"
            />
          </div>
        </div>
      </div>

      {/* Personal info section */}
      <div>
        <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border)]">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                required
                autoComplete="given-name"
                className={inputClass}
                placeholder="First name"
              />
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                required
                autoComplete="family-name"
                className={inputClass}
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Country *</label>
            <select
              value={form.country}
              onChange={(e) => update('country', e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select your country</option>
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
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              required
              autoComplete="tel"
              className={inputClass}
              placeholder="+1 555 000 0000"
            />
          </div>

          <div>
            <label className={labelClass}>Steam ID *</label>
            <input
              type="text"
              value={form.steamId}
              onChange={(e) => update('steamId', e.target.value)}
              required
              className={inputClass}
              placeholder="76561198XXXXXXXXX"
            />
            <p className="mt-1.5 text-xs text-[var(--muted)]">
              Find your Steam ID at{' '}
              <span className="text-[var(--foreground)] font-mono">steamcommunity.com/profiles/&lt;ID&gt;</span>
            </p>
          </div>
        </div>
      </div>

      {/* Consents section */}
      <div>
        <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest mb-4 pb-2 border-b border-[var(--border)]">
          Consents &amp; Declarations
        </h2>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.consentProfiling}
              onChange={(e) => update('consentProfiling', e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] bg-[var(--background)] accent-[var(--accent)]"
            />
            <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
              I consent to the processing of my personal data for{' '}
              <strong className="text-[var(--foreground)]">profiling purposes</strong>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.consentMarketing}
              onChange={(e) => update('consentMarketing', e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] bg-[var(--background)] accent-[var(--accent)]"
            />
            <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
              I consent to the processing of my personal data for{' '}
              <strong className="text-[var(--foreground)]">marketing purposes</strong>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.acceptedRegulation}
              onChange={(e) => update('acceptedRegulation', e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] bg-[var(--background)] accent-[var(--accent)]"
            />
            <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors leading-relaxed">
              <strong className="text-[var(--foreground)]">Accept Regulations *</strong> — I
              declare that I have read and accepted the{' '}
              <a
                href="/regulations"
                target="_blank"
                className="text-[var(--accent)] hover:underline"
              >
                Rules for participation
              </a>{' '}
              in the Competition.
            </span>
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting…' : 'Submit Registration'}
      </button>

      <p className="text-xs text-[var(--muted)] text-center">
        * Required fields
      </p>
    </form>
  )
}
