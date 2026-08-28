'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Route rendering error', error.digest || 'unidentified')
  }, [error])

  return (
    <main className="route-state" role="alert">
      <div className="route-state-mark" aria-hidden="true">!</div>
      <h1>Something went wrong</h1>
      <p>We could not load this workspace.</p>
      <button className="btn btn-gold" onClick={() => reset()}>Try again</button>
    </main>
  )
}
