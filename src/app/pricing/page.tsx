'use client'

import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { LS_PLANS, buildCheckoutUrl } from '@/lib/lemonsqueezy'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check, Crown, Calculator, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

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
  'E-Mail Erinnerungen',
]

const PRO_FEATURES = [
  'Alles aus Sicherheits-Plan',
  'Misch-Einkommen Rechner (Anstellung + Gewerbe)',
  'Bank-Anbindung (CSV-Import)',
  'PDF-Export fuer Steuerberater',
  'Smart Alerts & Push',
  'Absetzbetraege & Familienbonus',
  'Steuer-Optimierung Tipps',
  'Vergleichs-Modus & Wasserfall-Analyse',
  'Prioritaets-Support',
]

function PricingContent() {
  const { user, subscription } = useAppShell()
  const [yearly, setYearly] = useState(false)

  const handleCheckout = (variantId: string) => {
    if (!user) {
      window.location.href = '/auth/register?redirect=/pricing'
      return
    }
    const url = buildCheckoutUrl(variantId, user.id, user.email ?? '')
    window.location.href = url
  }

  const basicPlan = yearly ? LS_PLANS.basic_yearly : LS_PLANS.basic_monthly
  const proPlan = yearly ? LS_PLANS.pro_yearly : LS_PLANS.pro_monthly

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="flex justify-center mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Calculator className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Waehle deinen Plan</h1>
        <p className="text-blue-200 text-lg max-w-md mx-auto">
          Starte kostenlos, upgrade jederzeit.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <Label htmlFor="billing" className="text-blue-200 text-sm">Monatlich</Label>
          <Switch id="billing" checked={yearly} onCheckedChange={setYearly} />
          <Label htmlFor="billing" className="text-blue-200 text-sm">Jaehrlich</Label>
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
              <CardDescription className="text-blue-200">Fuer den Einstieg</CardDescription>
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">0 EUR</span>
                <span className="text-blue-200 text-sm ml-1">/ fuer immer</span>
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
              <CardDescription className="text-blue-200">Fuer Einsteiger</CardDescription>
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
                  onClick={() => handleCheckout(basicPlan.variantId)}
                >
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
              <CardDescription className="text-amber-200">Fuer Profis</CardDescription>
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
                  onClick={() => handleCheckout(proPlan.variantId)}
                >
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
            Alle Preise inkl. USt. Monatlich kuendbar. Sichere Zahlung via Lemon Squeezy.
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
