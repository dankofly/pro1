'use client'

import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { STRIPE_PLANS, getStripePromise } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check, Crown, Calculator, Zap, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'

const FREE_FEATURES = [
  'SVS-Beitragsrechner',
  'Wahrheits-Tabelle',
]

const BASIC_FEATURES = [
  'Alles aus Free',
  'Einkommensteuer-Prognose',
  'Berechnungen speichern',
  'Dashboard mit Verlauf',
  'Einfacher Export',
]

const PRO_FEATURES = [
  'Alles aus Sicherheits-Plan',
  'Misch-Einkommen Rechner',
  'Familienbonus & Absetzbeträge',
  'Wasserfall-Analyse',
  'PDF-Export für Steuerberater',
  'Smart Alerts & Push',
  'Prioritäts-Support',
]

const stripePromise = getStripePromise()

function CheckoutReturn() {
  const [status, setStatus] = useState<'loading' | 'complete' | 'error'>('loading')
  const { subscription } = useAppShell()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) {
      setStatus('error')
      return
    }

    fetch(`/api/stripe/session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status === 'complete' ? 'complete' : 'error')
        if (data.status === 'complete') subscription.refresh()
      })
      .catch(() => setStatus('error'))
  }, [subscription])

  if (status === 'loading') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 text-white animate-spin mx-auto" />
          <p className="text-white text-lg">Zahlung wird verarbeitet\u2026</p>
        </div>
      </div>
    )
  }

  if (status === 'complete') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/10 border-white/20 text-white">
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">Zahlung erfolgreich!</CardTitle>
            <CardDescription className="text-blue-200">
              Dein Abo ist jetzt aktiv. Alle Premium-Features sind freigeschaltet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link href="/rechner" className="w-full">
              <Button className="w-full">Zum Rechner</Button>
            </Link>
            <Link href="/dashboard" className="w-full">
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                Zum Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/10 border-white/20 text-white">
        <CardHeader className="text-center space-y-3">
          <CardTitle>Fehler bei der Zahlung</CardTitle>
          <CardDescription className="text-blue-200">
            Die Zahlung konnte nicht verarbeitet werden. Bitte versuche es erneut.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => { window.history.replaceState({}, '', '/pricing'); window.location.reload() }}>
            Zurück zur Preisübersicht
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function PricingContent() {
  const { user, subscription } = useAppShell()
  const [yearly, setYearly] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  // Check for return from checkout
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const sessionId = params?.get('session_id')

  if (sessionId) {
    return <CheckoutReturn />
  }

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      window.location.href = '/auth/register?redirect=/pricing'
      return
    }

    setCheckoutLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await res.json()
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setCheckoutLoading(false)
    }
  }

  const fetchClientSecret = useCallback(() => {
    return Promise.resolve(clientSecret!)
  }, [clientSecret])

  const basicPlan = yearly ? STRIPE_PLANS.basic_yearly : STRIPE_PLANS.basic_monthly
  const proPlan = yearly ? STRIPE_PLANS.pro_yearly : STRIPE_PLANS.pro_monthly

  // Show Embedded Checkout
  if (clientSecret) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-6"
            onClick={() => setClientSecret(null)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Preisübersicht
          </Button>
          <div className="bg-white rounded-2xl overflow-hidden">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="flex justify-center mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Calculator className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Wähle deinen Plan</h1>
        <p className="text-blue-200 text-lg max-w-md mx-auto">
          Starte kostenlos, upgrade jederzeit.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <Label htmlFor="billing" className="text-blue-200 text-sm">Monatlich</Label>
          <Switch id="billing" checked={yearly} onCheckedChange={setYearly} />
          <Label htmlFor="billing" className="text-blue-200 text-sm">Jährlich</Label>
          {yearly && (
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
              Spare 2 Monate!
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Free */}
          <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
            <CardHeader>
              <CardDescription className="text-blue-200">Für den schnellen Check</CardDescription>
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">0 EUR</span>
                <span className="text-blue-200 text-sm ml-1">/ für immer</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-blue-100">{f}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {subscription.isFree ? (
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                  Aktueller Plan
                </Button>
              ) : (
                <Link href="/rechner" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Zum Rechner
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>

          {/* Basic */}
          <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
            <CardHeader>
              <CardDescription className="text-blue-200">Für Einsteiger</CardDescription>
              <CardTitle className="text-2xl">Sicherheits-Plan</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">{basicPlan.priceDisplay} EUR</span>
                <span className="text-blue-200 text-sm ml-1">/ {yearly ? 'Jahr' : 'Monat'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {BASIC_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-blue-100">{f}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {subscription.isBasic && !subscription.isPro ? (
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                  Aktueller Plan
                </Button>
              ) : subscription.isPro ? (
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                  Inkludiert
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleCheckout(basicPlan.priceId)}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Jetzt starten
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Pro - Highlighted */}
          <Card className="bg-white/10 border-amber-400/30 text-white backdrop-blur-sm ring-2 ring-amber-400/30 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                <Zap className="h-3 w-3 mr-1" />
                Beliebtester Plan
              </Badge>
            </div>
            <CardHeader className="pt-8">
              <CardDescription className="text-amber-200">Für Profis</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Crown className="h-5 w-5 text-amber-400" />
                SVS Checker Pro
              </CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">{proPlan.priceDisplay} EUR</span>
                <span className="text-blue-200 text-sm ml-1">/ {yearly ? 'Jahr' : 'Monat'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {PRO_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-blue-100">{f}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {subscription.isPro ? (
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                  Aktueller Plan
                </Button>
              ) : (
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => handleCheckout(proPlan.priceId)}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  <Crown className="h-4 w-4 mr-1" />
                  Jetzt upgraden
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-xs mt-12 space-y-2">
          <p className="text-blue-200/50">
            Alle Preise inkl. USt. Monatlich kündbar. Sichere Zahlung via Stripe.
          </p>
          <div className="flex items-center justify-center gap-3 text-blue-200/40">
            <Link href="/impressum" className="hover:text-blue-200 transition-colors">Impressum</Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-blue-200 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <AppShell>
      <PricingContent />
    </AppShell>
  )
}
