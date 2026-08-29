'use client'

import { useSearchParams } from 'next/navigation'
import { AuthPage } from '../../components/public/AuthPage'

export default function Auth() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  
  return <AuthPage initialMode={mode === 'reset_password' ? 'reset_password' : undefined} />
}