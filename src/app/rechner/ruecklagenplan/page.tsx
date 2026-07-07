'use client'

// Erfolgsseite des 49-€-Tripwires: verifiziert die Stripe-Session serverseitig,
// erzeugt das PDF clientseitig und führt danach zum nächsten Funnel-Schritt (Pro).
// Kein Account nötig: Besitz der Session-ID (aus Stripes Redirect) = Zugriff.

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileDown, Loader2, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { formatEuro } from '@/lib/format'
import type { RuecklagenplanPayload } from '@/lib/ruecklagenplan'

type PageState =
  | { status: 'loading' }
  | { status: 'paid'; payload: RuecklagenplanPayload; email: string | null }
  | { status: 'unpaid' }
  | { status: 'error'; message: string }

function RuecklagenplanInner() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [state, setState] = useState<PageState>({ status: 'loading' })
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setState({ status: 'error', message: 'Kein Kauf gefunden. Bitte nutze den Link aus deinem Kauf-Vorgang.' })
      return
    }
    let cancelled = false
    fetch(`/api/stripe/pdf-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async res => {
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        if (!res.ok) {
          setState({ status: 'error', message: data.error ?? 'Session konnte nicht geprüft werden.' })
        } else if (data.paid) {
          setState({ status: 'paid', payload: data.payload, email: data.email ?? null })
        } else {
          setState({ status: 'unpaid' })
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', message: 'Verbindungsfehler. Bitte lade die Seite neu.' })
      })
    return () => { cancelled = true }
  }, [sessionId])

  const handleDownload = useCallback(async () => {
    if (state.status !== 'paid') return
    setDownloading(true)
    try {
      const { generateRuecklagenplan } = await import('@/lib/pdf-export')
      generateRuecklagenplan(state.payload)
      toast.success('PDF wurde erstellt und heruntergeladen.')
    } catch {
      toast.error('PDF konnte nicht erstellt werden. Bitte versuche es erneut.')
    } finally {
      setDownloading(false)
    }
  }, [state])

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-xl space-y-6">
        {state.status === 'loading' && (
          <Card>
            <CardContent className="flex items-center gap-3 py-10 justify-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Kauf wird geprüft ...
            </CardContent>
          </Card>
        )}

        {state.status === 'paid' && (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">Zahlung erfolgreich</span>
                </div>
                <CardTitle className="text-2xl">Dein SVS-Rücklagenplan ist fertig</CardTitle>
                <CardDescription>
                  12-Monats-Plan für {formatEuro(state.payload.rg)}/Monat Rücklage
                  (SVS {formatEuro(state.payload.rs)} + Einkommensteuer {formatEuro(state.payload.re)}),
                  Steuerjahr {state.payload.y}.
                  {state.email ? ` Die Zahlungsbestätigung geht an ${state.email}.` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleDownload} disabled={downloading} size="lg" className="w-full gap-2">
                  {downloading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <FileDown className="h-4 w-4" aria-hidden="true" />}
                  {downloading ? 'Erstelle PDF ...' : 'PDF-Rücklagenplan herunterladen'}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Tipp: Speichere dir diese Seite als Lesezeichen. Solange du den Link hast,
                  kannst du das PDF jederzeit erneut herunterladen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200/60 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-emerald-950/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">Nächster Schritt</span>
                </div>
                <CardTitle className="text-lg">Zahlen ändern sich. Dein Plan sollte mitziehen.</CardTitle>
                <CardDescription>
                  SteuerBoard Pro speichert deine Berechnung, rechnet mit aktuellen Werten weiter
                  und meldet sich, wenn deine Rücklage nicht mehr passt. 239 € im Jahr,
                  als Betriebsausgabe in der Regel steuerlich absetzbar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="gap-1.5">
                  <Link href="/pricing">
                    SteuerBoard Pro ansehen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {state.status === 'unpaid' && (
          <Alert>
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              Die Zahlung ist noch nicht abgeschlossen. Falls du gerade bezahlt hast,
              lade die Seite in ein paar Sekunden neu.
            </AlertDescription>
          </Alert>
        )}

        {state.status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              {state.message}{' '}
              <Link href="/rechner" className="underline underline-offset-2">Zurück zum Rechner</Link>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default function RuecklagenplanPage() {
  return (
    <Suspense fallback={null}>
      <RuecklagenplanInner />
    </Suspense>
  )
}
