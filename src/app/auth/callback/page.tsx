'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { safeRedirect } from '@/lib/safe-redirect'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const redirectTo = safeRedirect(params.get('redirect'))

      // Handle hash fragment tokens (implicit flow: #access_token=...)
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        // Supabase JS client auto-detects hash tokens on initialization,
        // but we need to explicitly trigger session detection
        const { error } = await supabase.auth.getSession()
        if (error) {
          setStatus('error')
          return
        }
        setStatus('success')
        setTimeout(() => router.push(redirectTo), 1500)
        return
      }

      // Handle PKCE flow (query param: ?code=...)
      const code = params.get('code')
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          setStatus('error')
          return
        }
        setStatus('success')
        setTimeout(() => router.push(redirectTo), 1500)
        return
      }

      // No token or code found
      setStatus('error')
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          {status === 'loading' && (
            <>
              <div className="flex justify-center">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
              </div>
              <CardTitle>E-Mail wird bestätigt...</CardTitle>
              <CardDescription>Bitte warte einen Moment.</CardDescription>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle>E-Mail bestätigt!</CardTitle>
              <CardDescription>Du wirst gleich weitergeleitet...</CardDescription>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle>Fehler bei der Bestätigung</CardTitle>
              <CardDescription>
                Der Link ist abgelaufen oder ungueltig. Bitte registriere dich erneut.
              </CardDescription>
            </>
          )}
        </CardHeader>
      </Card>
    </div>
  )
}
