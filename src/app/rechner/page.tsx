'use client'

import { useState, useMemo, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { calculateSvs, calculateSteuerTipps } from '@/lib/svs-calculator'
import { SVS } from '@/lib/svs-constants'
import { formatEuro } from '@/lib/format'
import Link from 'next/link'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { InputSection } from '@/components/svs/input-section'
import { HeroNumber } from '@/components/svs/hero-number'
import { StatusBadge } from '@/components/svs/status-badge'
import { TaxBracketBar } from '@/components/svs/tax-bracket-bar'
import { WaterfallChart } from '@/components/svs/waterfall-chart'
import { DashboardCards } from '@/components/svs/dashboard-cards'
import { BeitragsDetails } from '@/components/svs/beitrags-details'
import { MonthlyOverview } from '@/components/svs/monthly-overview'
import { WahrheitsTabelle } from '@/components/svs/wahrheits-tabelle'
import { SteuerTipps } from '@/components/svs/steuer-tipps'
import { PremiumCTA } from '@/components/svs/premium-cta'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Info, Save, Lock, Check, Crown, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useSmartAlerts } from '@/hooks/use-smart-alerts'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'
import { STRIPE_PLANS } from '@/lib/stripe'

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

function HomeContent() {
  const { user, subscription, handleLogout: _handleLogout } = useAppShell()
  const [gewinn, setGewinn] = useState(40000)
  const [vorschreibung, setVorschreibung] = useState(450)
  const [saving, setSaving] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')
  const [upgradeRequiredPlan, setUpgradeRequiredPlan] = useState<'basic' | 'pro'>('basic')
  const [yearly, setYearly] = useState(false)

  const result = useMemo(() => calculateSvs(gewinn, vorschreibung), [gewinn, vorschreibung])
  const steuerTipps = useMemo(() => calculateSteuerTipps(gewinn, result.endgueltigeSVS), [gewinn, result.endgueltigeSVS])
  const { prefs: alertPrefs, isExceeded: alertActive, updatePrefs: updateAlertPrefs, requestNotificationPermission } = useSmartAlerts(result.nachzahlung)

  const handleImportGewinn = useCallback((value: number) => {
    setGewinn(Math.round(value))
    toast.success(`Gewinn von ${formatEuro(value)} übernommen.`)
  }, [])

  const handleUpgradeRequired = useCallback((feature: string, plan: 'basic' | 'pro') => {
    setUpgradeFeature(feature)
    setUpgradeRequiredPlan(plan)
    setUpgradeOpen(true)
  }, [])

  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error('Bitte melde dich an, um Berechnungen zu speichern.')
      return
    }
    if (subscription.isFree) {
      handleUpgradeRequired('Berechnungen speichern', 'basic')
      return
    }
    setSaving(true)
    try {
      const { error } = await supabase.from('calculations').insert({
        user_id: user.id,
        label: `Berechnung ${new Date().toLocaleDateString('de-AT')}`,
        jahresgewinn: gewinn,
        monatliche_vorschreibung: vorschreibung,
        beitragsgrundlage: result.beitragsgrundlage,
        endgueltige_svs: result.endgueltigeSVS,
        vorlaeufige_svs: result.vorlaeufigeSVS,
        nachzahlung: result.nachzahlung,
        spar_empfehlung: result.sparEmpfehlung,
        steuer_ersparnis: result.steuerErsparnis,
      })
      if (error) throw error
      toast.success('Berechnung gespeichert!')
    } catch {
      toast.error('Fehler beim Speichern. Bitte versuche es erneut.')
    } finally {
      setSaving(false)
    }
  }, [user, subscription.isFree, handleUpgradeRequired, gewinn, vorschreibung, result])

  const steuerpflichtig = Math.max(0, gewinn - result.endgueltigeSVS - Math.min(gewinn, 33000) * 0.15)

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden font-bold text-sm hover:opacity-80 transition-opacity">SVS Checker</Link>
            <StatusBadge riskPercent={result.riskPercent} />
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="h-8"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {saving ? 'Speichert...' : 'Speichern'}
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="h-8">
                <Link href="/auth/login">Anmelden</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Split Screen */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

          {/* Left - Inputs (sticky on desktop) */}
          <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
            <InputSection
              gewinn={gewinn}
              setGewinn={setGewinn}
              vorschreibung={vorschreibung}
              setVorschreibung={setVorschreibung}
            />
          </div>

          {/* Right - Results */}
          <div className="space-y-5">
            {result.belowMinimum && (
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-800">
                  <span className="font-medium">Unter der Geringfügigkeitsgrenze:</span>{' '}
                  Bei einem Jahresgewinn unter {formatEuro(SVS.GERINGFUEGIGKEIT)} besteht keine Pflichtversicherung bei der SVS.
                </AlertDescription>
              </Alert>
            )}

            {!result.belowMinimum && (
              <>
                <HeroNumber echtesNetto={result.echtesNetto} gewinn={gewinn} />
                {subscription.isBasic ? (
                  <>
                    <TaxBracketBar steuerpflichtig={steuerpflichtig} />
                    <WaterfallChart gewinn={gewinn} result={result} />
                    <WahrheitsTabelle gewinn={gewinn} result={result} />
                    <SteuerTipps tipps={steuerTipps} gewinn={gewinn} />
                  </>
                ) : (
                  <>
                    <WahrheitsTabelle gewinn={gewinn} result={result} />
                    <div className="glass rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
                        <Lock className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground text-center px-4">Einkommensteuer-Prognose ab Sicherheits-Plan</p>
                        <Button size="sm" onClick={() => handleUpgradeRequired('Einkommensteuer-Prognose', 'basic')}>
                          Jetzt freischalten
                        </Button>
                      </div>
                      <div className="opacity-30 pointer-events-none" aria-hidden="true">
                        <TaxBracketBar steuerpflichtig={steuerpflichtig} />
                      </div>
                    </div>
                  </>
                )}
                <DashboardCards result={result} vorschreibung={vorschreibung} />
                <BeitragsDetails result={result} />
                <MonthlyOverview result={result} vorschreibung={vorschreibung} />
              </>
            )}

            <PremiumCTA
              gewinn={gewinn}
              vorschreibung={vorschreibung}
              result={result}
              steuerTipps={steuerTipps}
              onImportGewinn={handleImportGewinn}
              alertPrefs={alertPrefs}
              alertActive={alertActive}
              updateAlertPrefs={updateAlertPrefs}
              requestNotificationPermission={requestNotificationPermission}
              subscription={subscription}
              onUpgradeRequired={handleUpgradeRequired}
            />

            <UpgradeDialog
              open={upgradeOpen}
              onOpenChange={setUpgradeOpen}
              feature={upgradeFeature}
              requiredPlan={upgradeRequiredPlan}
            />

            {/* Pricing Cards */}
            {!subscription.isPro && (
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Wähle deinen Plan</h2>
                  <p className="text-blue-200 text-sm">
                    Starte kostenlos, upgrade jederzeit.
                  </p>

                  {/* Toggle */}
                  <div className="flex items-center justify-center gap-3 mt-5">
                    <Label htmlFor="billing-rechner" className="text-blue-200 text-sm">Monatlich</Label>
                    <Switch id="billing-rechner" checked={yearly} onCheckedChange={setYearly} />
                    <Label htmlFor="billing-rechner" className="text-blue-200 text-sm">Jährlich</Label>
                    {yearly && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                        Spare 2 Monate!
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white" disabled>
                          Inkludiert
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  {/* Basic */}
                  <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
                    <CardHeader>
                      <CardDescription className="text-blue-200">Für Einsteiger</CardDescription>
                      <CardTitle className="text-2xl">Sicherheits-Plan</CardTitle>
                      <div className="pt-2">
                        <span className="text-4xl font-bold">{(yearly ? STRIPE_PLANS.basic_yearly : STRIPE_PLANS.basic_monthly).priceDisplay} EUR</span>
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
                      ) : (
                        <Button asChild className="w-full">
                          <Link href="/pricing">Jetzt starten</Link>
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
                        <span className="text-4xl font-bold">{(yearly ? STRIPE_PLANS.pro_yearly : STRIPE_PLANS.pro_monthly).priceDisplay} EUR</span>
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
                      <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                        <Link href="/pricing">
                          <Crown className="h-4 w-4 mr-1" />
                          Jetzt upgraden
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <p className="text-center text-xs mt-6 text-blue-200/50">
                  Alle Preise inkl. USt. Monatlich kündbar. Sichere Zahlung via Stripe.
                </p>
              </div>
            )}

            <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground/70">SVS Checker - Beitragsrechner für Selbständige in Österreich</p>
              <p>Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung. Werte 2024/25.</p>
              <div className="flex items-center justify-center gap-3 pt-1">
                <Link href="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
                <span>·</span>
                <Link href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <AppShell>
      <HomeContent />
    </AppShell>
  )
}
