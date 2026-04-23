'use client'

import { useState, useEffect } from 'react'

export default function GmtClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      const now = new Date()
      const date = now.toLocaleDateString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      const clock = now.toLocaleTimeString('en-GB', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTime(`${date} · ${clock} GMT`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-mono text-[var(--muted)]">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
      {time}
    </div>
  )
}
