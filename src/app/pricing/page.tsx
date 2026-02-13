'use client'

import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { STRIPE_PLANS, getStripePromise } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, Crown, Zap, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'

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
            <Button asChild className="w-full">
              <Link href="/rechner">Zum Rechner</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/dashboard">Zum Dashboard</Link>
            </Button>
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

  const fetchClientSecret = useCallback(() => {
    return Promise.resolve(clientSecret!)
  }, [clientSecret])

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
      if (!res.ok) {
        toast.error(data.error || 'Checkout konnte nicht gestartet werden.')
        return
      }
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
      } else {
        toast.error('Keine Antwort vom Zahlungsanbieter. Bitte versuche es erneut.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      toast.error('Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  // Check for return from checkout
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const sessionId = params?.get('session_id')

  if (sessionId) {
    return <CheckoutReturn />
  }

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

  const tiers = [
    {
      name: 'Free',
      monthlyPrice: '0',
      yearlyPrice: '0',
      unit: 'für immer',
      desc: 'Für den schnellen Check',
      isFree: true,
      features: [
        { text: 'SVS-Beitragsrechner', included: true },
        { text: 'Wahrheits-Tabelle', included: true },
        { text: 'Geldfluss-Diagramm', included: true },
        { text: 'Einkommensteuer-Prognose', included: false },
        { text: 'KI-Steuerberater', included: false },
        { text: 'GmbH-Vergleich', included: false },
        { text: 'PDF-Export', included: false },
      ],
      highlight: false,
      isCurrentPlan: subscription.isFree,
      isIncluded: false,
      cta: 'Jetzt gratis starten',
      onAction: null as (() => void) | null,
      href: '/rechner',
    },
    {
      name: 'Sicherheits-Plan',
      monthlyPrice: '9,90',
      yearlyPrice: '8,25',
      yearlyTotal: '99',
      unit: 'pro Monat',
      desc: 'Für Einsteiger',
      isFree: false,
      features: [
        { text: 'Alles aus Free', included: true },
        { text: 'Einkommensteuer-Prognose', included: true },
        { text: 'Berechnungen speichern', included: true },
        { text: 'Dashboard mit Verlauf', included: true },
        { text: 'Einfacher Export', included: true },
        { text: 'Misch-Einkommen Rechner', included: false },
        { text: 'Familienbonus & Absetzbeträge', included: false },
      ],
      highlight: false,
      isCurrentPlan: subscription.isBasic && !subscription.isPro,
      isIncluded: subscription.isPro,
      cta: 'Jetzt starten',
      onAction: () => handleCheckout(basicPlan.priceId),
      href: null as string | null,
    },
    {
      name: 'SVS Checker Pro',
      monthlyPrice: '19,90',
      yearlyPrice: '16,58',
      yearlyTotal: '199',
      unit: 'pro Monat',
      desc: 'Für Profis',
      isFree: false,
      features: [
        { text: 'Alles aus Sicherheits-Plan', included: true },
        { text: 'KI-Steuerberater', included: true },
        { text: 'Misch-Einkommen Rechner', included: true },
        { text: 'GmbH-Vergleich', included: true },
        { text: 'Pauschalierung Vergleich', included: true },
        { text: 'Gewinnmaximierer', included: true },
        { text: 'Investitionen & AfA', included: true },
        { text: 'Familienbonus & Absetzbeträge', included: true },
        { text: 'PDF-Export für Steuerberater', included: true },
        { text: 'Smart Alerts & Push', included: true },
      ],
      highlight: true,
      isCurrentPlan: subscription.isPro,
      isIncluded: false,
      cta: 'Jetzt upgraden',
      onAction: () => handleCheckout(proPlan.priceId),
      href: null as string | null,
    },
  ]

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
            Preise
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Starte kostenlos, upgrade wenn du bereit bist
          </h1>
          <p className="mt-4 text-blue-200/60 max-w-2xl mx-auto text-lg">
            Keine versteckten Kosten. Monatlich kündbar. Sichere Zahlung via Stripe.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium transition-colors ${!yearly ? 'text-white' : 'text-blue-200/40'}`}>
            Monatlich
          </span>
          <button
            role="switch"
            aria-checked={yearly}
            aria-label="Jährliche Abrechnung"
            onClick={() => setYearly(!yearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              yearly ? 'bg-emerald-500' : 'bg-white/20'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                yearly ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${yearly ? 'text-white' : 'text-blue-200/40'}`}>
            Jährlich
          </span>
          {yearly && (
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-xs">
              Spare 20%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => {
            const price = yearly ? tier.yearlyPrice : tier.monthlyPrice
            return (
              <Card
                key={tier.name}
                className={`relative h-full ${
                  tier.highlight
                    ? 'bg-white/10 border-amber-400/30 ring-2 ring-amber-400/20'
                    : 'bg-white/[0.03] border-white/10'
                } backdrop-blur-sm`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                      <Zap className="h-3 w-3 mr-1" />
                      Beliebtester Plan
                    </Badge>
                  </div>
                )}
                <CardContent className={`p-6 sm:p-8 ${tier.highlight ? 'pt-10' : ''}`}>
                  <p className="text-blue-200/60 text-sm">{tier.desc}</p>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    {tier.highlight && <Crown className="h-5 w-5 text-amber-400" />}
                    {tier.name}
                  </h3>
                  <div className="mt-4 mb-1">
                    <span className="text-4xl font-extrabold text-white font-mono">{price} EUR</span>
                    <span className="text-blue-200/50 text-sm ml-2">/ {tier.unit}</span>
                  </div>
                  <div className="mb-6 h-5">
                    {yearly && !tier.isFree && 'yearlyTotal' in tier && (
                      <div className="flex items-center gap-2">
                        <span className="text-blue-200/30 text-xs line-through">{tier.monthlyPrice} EUR/Monat</span>
                        <span className="text-emerald-400 text-xs font-medium">{tier.yearlyTotal} EUR/Jahr</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-2.5 text-sm">
                        {f.included ? (
                          <Check className={`h-4 w-4 shrink-0 ${tier.highlight ? 'text-amber-400' : 'text-emerald-400'}`} />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-white/20" />
                        )}
                        <span className={f.included ? 'text-blue-100' : 'text-white/30'}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {tier.isCurrentPlan ? (
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                      Aktueller Plan
                    </Button>
                  ) : tier.isIncluded ? (
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                      Inkludiert
                    </Button>
                  ) : tier.href ? (
                    <Button
                      asChild
                      className={`w-full ${
                        tier.highlight
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      <Link href={tier.href}>
                        {tier.highlight && <Crown className="h-4 w-4 mr-1.5" />}
                        {tier.cta}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${
                        tier.highlight
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                      onClick={tier.onAction ?? undefined}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {tier.highlight && <Crown className="h-4 w-4 mr-1.5" />}
                      {tier.cta}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-xs mt-12 space-y-2">
          <p className="text-blue-200/30">
            Alle Preise inkl. USt. {yearly ? 'Jährlich im Voraus. ' : 'Monatlich kündbar. '}Sichere Zahlung via Stripe.
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
