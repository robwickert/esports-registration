import LoginForm from './LoginForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/registrations')
  }

  const { redirectTo } = await searchParams

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          Account Access
        </p>
        <h1 className="text-3xl font-black text-[var(--foreground)]">Sign In</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-[var(--accent)] hover:underline">
            Register here
          </a>
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
