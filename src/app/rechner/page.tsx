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
import { Info, Save, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { useSmartAlerts } from '@/hooks/use-smart-alerts'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'

function HomeContent() {
  const { user, subscription, handleLogout: _handleLogout } = useAppShell()
  const [gewinn, setGewinn] = useState(40000)
  const [vorschreibung, setVorschreibung] = useState(450)
  const [saving, setSaving] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')
  const [upgradeRequiredPlan, setUpgradeRequiredPlan] = useState<'basic' | 'pro'>('basic')

  const result = useMemo(() => calculateSvs(gewinn, vorschreibung), [gewinn, vorschreibung])
  const steuerTipps = useMemo(() => calculateSteuerTipps(gewinn, result.endgueltigeSVS), [gewinn, result.endgueltigeSVS])
  const { prefs: alertPrefs, isExceeded: alertActive, updatePrefs: updateAlertPrefs, requestNotificationPermission } = useSmartAlerts(result.nachzahlung)

  const handleImportGewinn = useCallback((value: number) => {
    setGewinn(Math.round(value))
    toast.success(`Gewinn von ${formatEuro(value)} uebernommen.`)
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
            <span className="md:hidden font-bold text-sm">SVS Checker</span>
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
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="h-8">Anmelden</Button>
              </Link>
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
                  <span className="font-medium">Unter der Geringfuegigkeitsgrenze:</span>{' '}
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

            <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground/70">SVS Checker - Beitragsrechner fuer Selbstaendige in Oesterreich</p>
              <p>Alle Angaben ohne Gewaehr. Kein Ersatz fuer professionelle Steuerberatung. Werte 2024/25.</p>
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
