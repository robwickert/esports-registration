'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (redirectTo) {
      router.push(redirectTo)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      let destination = '/registrations'
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        if (profile?.is_admin) destination = '/admin'
      }
      router.push(destination)
    }
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-medium tracking-wide text-[var(--muted)] uppercase mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium tracking-wide text-[var(--muted)] uppercase mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}
