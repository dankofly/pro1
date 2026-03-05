'use client'

import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { STRIPE_PLANS, getStripePromise } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { motion } from 'motion/react'
import { Check, X, Crown, Star, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import Link from 'next/link'
import { useState, useCallback, useEffect, useRef } from 'react'
import { MobileNav } from '@/components/svs/mobile-nav'
import confetti from 'canvas-confetti'
import NumberFlow from '@number-flow/react'

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
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 text-white animate-spin mx-auto" />
          <p className="text-white text-lg">Zahlung wird verarbeitet\u2026</p>
        </div>
      </div>
    )
  }

  if (status === 'complete') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center px-4">
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
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center px-4">
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
  const [isMonthly, setIsMonthly] = useState(true)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const switchRef = useRef<HTMLButtonElement>(null)

  const fetchClientSecret = useCallback(() => {
    return Promise.resolve(clientSecret!)
  }, [clientSecret])

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ['#22c55e', '#10b981', '#f59e0b', '#3b82f6'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      })
    }
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

  const basicPlan = !isMonthly ? STRIPE_PLANS.basic_yearly : STRIPE_PLANS.basic_monthly
  const proPlan = !isMonthly ? STRIPE_PLANS.pro_yearly : STRIPE_PLANS.pro_monthly

  // Show Embedded Checkout
  if (clientSecret) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-900 to-slate-950">
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
            <EmbeddedCheckoutProvider stripe={getStripePromise()} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    )
  }

  // Order: Free (left) → SteuerBoard Pro (center) → Sicherheits-Plan (right)
  const tiers = [
    {
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
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
      name: 'SteuerBoard Pro',
      price: 19.9,
      yearlyPrice: 16.58,
      yearlyTotal: 199,
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
    {
      name: 'Sicherheits-Plan',
      price: 9.9,
      yearlyPrice: 8.25,
      yearlyTotal: 99,
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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Mobile header */}
      <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 md:hidden">
        <div className="px-4 h-14 flex items-center">
          <MobileNav />
          <span className="ml-2 text-sm font-semibold text-white">Preise</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Starte kostenlos, upgrade wenn du bereit bist
          </h1>
          <p className="text-blue-200/60 text-lg whitespace-pre-line max-w-2xl mx-auto">
            Keine versteckten Kosten. Monatlich kündbar.{'\n'}Sichere Zahlung via Stripe.
          </p>
        </div>

        {/* Billing Toggle with Confetti */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={cn('text-sm font-medium transition-colors', isMonthly ? 'text-white' : 'text-blue-200/40')}>
            Monatlich
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <Label>
              <Switch
                ref={switchRef as React.Ref<HTMLButtonElement>}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/20 border-0"
              />
            </Label>
          </label>
          <span className={cn('text-sm font-medium transition-colors', !isMonthly ? 'text-white' : 'text-blue-200/40')}>
            Jährlich
          </span>
          {!isMonthly && (
            <span className="ml-1 text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 rounded-full px-2.5 py-0.5">
              Spare 20%
            </span>
          )}
        </div>

        {/* Pricing Cards with Motion */}
        <h2 className="sr-only">Verfügbare Pläne</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {tiers.map((tier, index) => {
            const displayPrice = isMonthly ? tier.price : tier.yearlyPrice

            return (
              <motion.div
                key={tier.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={
                  isDesktop
                    ? {
                        y: tier.highlight ? -20 : 0,
                        opacity: 1,
                        x: index === 2 ? -30 : index === 0 ? 30 : 0,
                        scale: index === 0 || index === 2 ? 0.94 : 1.0,
                      }
                    : { y: 0, opacity: 1 }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 1.6,
                  type: 'spring',
                  stiffness: 100,
                  damping: 30,
                  delay: 0.4,
                  opacity: { duration: 0.5 },
                }}
                className={cn(
                  'rounded-2xl border p-6 sm:p-8 text-center relative backdrop-blur-sm',
                  tier.highlight
                    ? 'bg-white/10 border-amber-400/30 ring-2 ring-amber-400/20 z-10'
                    : 'bg-white/[0.03] border-white/10 z-0',
                  'flex flex-col',
                  !tier.highlight && 'mt-5 md:mt-0',
                  index === 0 && 'origin-right',
                  index === 2 && 'origin-left',
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-current mr-1" />
                      Beliebtester Plan
                    </span>
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <p className="text-blue-200/60 text-sm">{tier.desc}</p>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center justify-center gap-2">
                    {tier.highlight && <Crown className="h-5 w-5 text-amber-400" />}
                    {tier.name}
                  </h3>

                  <div className="mt-6 flex items-baseline justify-center gap-x-1">
                    <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                      <NumberFlow
                        value={displayPrice}
                        format={{
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: tier.isFree ? 0 : 2,
                          maximumFractionDigits: 2,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: 'ease-out',
                        }}
                        willChange
                        className="tabular-nums"
                      />
                    </span>
                  </div>

                  <p className="text-xs text-blue-200/40 mt-1">
                    {tier.isFree
                      ? 'für immer'
                      : isMonthly
                        ? 'pro Monat'
                        : `${tier.yearlyTotal} EUR/Jahr`}
                  </p>

                  <div className="space-y-3 mt-6 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-2.5 text-sm">
                        {f.included ? (
                          <Check className={cn('h-4 w-4 shrink-0', tier.highlight ? 'text-amber-400' : 'text-emerald-400')} />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-white/20" />
                        )}
                        <span className={cn('text-left', f.included ? 'text-blue-100' : 'text-white/30')}>
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {tier.isCurrentPlan ? (
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white cursor-default" disabled>
                      Aktueller Plan
                    </Button>
                  ) : tier.isIncluded ? (
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white cursor-default" disabled>
                      Inkludiert
                    </Button>
                  ) : tier.href ? (
                    <Button
                      asChild
                      className={cn(
                        'w-full gap-2 text-base font-semibold cursor-pointer',
                        'transform-gpu ring-offset-current transition-all duration-300 ease-out',
                        'hover:ring-2 hover:ring-offset-1',
                        tier.highlight
                          ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600 hover:ring-amber-400 shadow-lg shadow-amber-500/25'
                          : 'bg-white/10 text-white border-white/10 hover:bg-white/20 hover:ring-white/30',
                      )}
                    >
                      <Link href={tier.href}>
                        {tier.highlight && <Crown className="h-4 w-4 mr-1.5" />}
                        {tier.cta}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      className={cn(
                        'w-full gap-2 text-base font-semibold cursor-pointer',
                        'transform-gpu ring-offset-current transition-all duration-300 ease-out',
                        'hover:ring-2 hover:ring-offset-1',
                        tier.highlight
                          ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600 hover:ring-amber-400 shadow-lg shadow-amber-500/25'
                          : 'bg-white/10 text-white border-white/10 hover:bg-white/20 hover:ring-white/30',
                      )}
                      onClick={tier.onAction ?? undefined}
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {tier.highlight && <Crown className="h-4 w-4 mr-1.5" />}
                      {tier.cta}
                    </Button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200/30 text-xs mt-8">
          Alle Preise inkl. USt. {isMonthly ? 'Monatlich kündbar.' : 'Jährlich im Voraus.'} Sichere Zahlung via Stripe.
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-blue-200/20 mt-3">
          <Link href="/impressum" className="hover:text-blue-200/40 transition-colors">Impressum</Link>
          <span>·</span>
          <Link href="/datenschutz" className="hover:text-blue-200/40 transition-colors">Datenschutz</Link>
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
