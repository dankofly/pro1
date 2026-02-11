'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatEuro } from '@/lib/format'
import { type TaxYear, YEAR_CONFIGS } from '@/lib/tax-constants'
import { calculateSteuerTipps } from '@/lib/svs-calculator'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { useRechnerState } from '@/hooks/use-rechner-state'

// Existing SVS result components
import { YearSelector } from '@/components/svs/year-selector'
import { HeroNumber } from '@/components/svs/hero-number'
import { StatusBadge } from '@/components/svs/status-badge'
import { TaxBracketBar } from '@/components/svs/tax-bracket-bar'
import { WaterfallChart } from '@/components/svs/waterfall-chart'
import { WahrheitsTabelle } from '@/components/svs/wahrheits-tabelle'
import { DashboardCards } from '@/components/svs/dashboard-cards'
import { BeitragsDetails } from '@/components/svs/beitrags-details'
import { MonthlyOverview } from '@/components/svs/monthly-overview'
import { SteuerTipps } from '@/components/svs/steuer-tipps'
import { PremiumCTA } from '@/components/svs/premium-cta'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'

// New Rechner components
import { OnboardingWizard } from '@/components/rechner/onboarding-wizard'
import { UmsatzAufwaendeSection } from '@/components/rechner/umsatz-aufwaende-section'
import { KpiTilesStrip } from '@/components/rechner/kpi-tiles-strip'
import { InvestitionenSection } from '@/components/rechner/investitionen-section'
import { PauschalierungSection } from '@/components/rechner/pauschalierung-section'
import { VorauszahlungenSection } from '@/components/rechner/vorauszahlungen-section'
import { WeitereEinkuenfteSection } from '@/components/rechner/weitere-einkuenfte-section'
import { GmbhVergleichSection } from '@/components/rechner/gmbh-vergleich-section'
import { GewinnmaximiererSection } from '@/components/rechner/gewinnmaximierer-section'
import { ProOptionsSection } from '@/components/rechner/pro-options-section'
import { PauschalierungVergleich } from '@/components/rechner/pauschalierung-vergleich'
import { GmbhVergleichTabelle } from '@/components/rechner/gmbh-vergleich-tabelle'
import { GewinnmaximiererVergleich } from '@/components/rechner/gewinnmaximierer-vergleich'
import { GewinnfreibetragInfo } from '@/components/rechner/gewinnfreibetrag-info'
import { PresetSelector } from '@/components/rechner/preset-selector'
import { GeldflussDiagramm } from '@/components/rechner/geldfluss-diagramm'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Info, Save, Lock, Settings2 } from 'lucide-react'
import { toast } from 'sonner'

import type { Stammdaten } from '@/lib/rechner-types'

function RechnerContent() {
  const { user, subscription } = useAppShell()
  const rechner = useRechnerState()
  const { input, result, dispatch, isOnboarded, completeOnboarding, resetOnboarding, setField } = rechner

  const [saving, setSaving] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')
  const [upgradeRequiredPlan, setUpgradeRequiredPlan] = useState<'basic' | 'pro'>('basic')
  const [mounted, setMounted] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)

  // Avoid hydration mismatch (localStorage read)
  useEffect(() => setMounted(true), [])

  const svs = result.svs
  const vorschreibung = input.vorauszahlungen.svVorauszahlung / 12

  const steuerTipps = useMemo(
    () => calculateSteuerTipps(result.gewinn, svs.endgueltigeSVS, input.year),
    [result.gewinn, svs.endgueltigeSVS, input.year]
  )

  const yearConfig = YEAR_CONFIGS[input.year]
  const versicherungsgrenze = yearConfig.versicherungsgrenze
  const minBeitragsgrundlage = yearConfig.svs.minBeitragsgrundlage

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
        label: `Berechnung ${new Intl.DateTimeFormat('de-AT').format(new Date())}`,
        jahresgewinn: result.gewinn,
        monatliche_vorschreibung: vorschreibung,
        beitragsgrundlage: svs.beitragsgrundlage,
        endgueltige_svs: svs.endgueltigeSVS,
        vorlaeufige_svs: svs.vorlaeufigeSVS,
        nachzahlung: svs.nachzahlung,
        spar_empfehlung: svs.sparEmpfehlung,
        steuer_ersparnis: svs.steuerErsparnis,
      })
      if (error) throw error
      toast.success('Berechnung gespeichert!')
    } catch {
      toast.error('Fehler beim Speichern. Bitte versuche es erneut.')
    } finally {
      setSaving(false)
    }
  }, [user, subscription.isFree, handleUpgradeRequired, result.gewinn, vorschreibung, svs])

  const handleOnboardingComplete = useCallback((stammdaten: Stammdaten) => {
    completeOnboarding(stammdaten)
    // Focus the main content area after onboarding completes
    requestAnimationFrame(() => {
      mainContentRef.current?.focus()
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [completeOnboarding])

  const handleImportGewinn = useCallback((value: number) => {
    setField('jahresumsatz', Math.round(value))
    toast.success(`Umsatz von ${formatEuro(value)} übernommen.`)
  }, [setField])

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Laden…</p>
      </div>
    )
  }

  // Show onboarding wizard if not yet completed
  if (!isOnboarded) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />
  }

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden font-bold text-sm hover:opacity-80 transition-opacity">SVS Checker</Link>
            <StatusBadge riskPercent={svs.riskPercent} />
            <Badge variant="outline" className="text-xs text-muted-foreground border-border/50 hidden sm:inline-flex">
              {input.year}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetOnboarding}
              className="h-8 text-xs text-muted-foreground"
            >
              <Settings2 className="h-3.5 w-3.5 mr-1" />
              Stammdaten
            </Button>
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="h-8"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {saving ? 'Speichert…' : 'Speichern'}
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
      <div ref={mainContentRef} id="main-content" tabIndex={-1} className="max-w-7xl mx-auto px-4 sm:px-6 py-6 focus:outline-none focus-visible:outline-none overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-8">

          {/* Left - Inputs (sticky on desktop, scrollable) */}
          <div className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide space-y-4 lg:pr-3 lg:pl-1 lg:pb-4">
            <YearSelector
              year={input.year}
              onYearChange={(y: TaxYear) => setField('year', y)}
            />

            <PresetSelector currentInput={input} dispatch={dispatch} />

            <UmsatzAufwaendeSection
              jahresumsatz={input.jahresumsatz}
              aufwaende={input.aufwaende}
              aufwaendeGesamt={input.aufwaendeGesamt}
              aufwaendeDetailed={input.aufwaendeDetailed}
              gewinn={result.gewinn}
              dispatch={dispatch}
            />

            {/* Mobile: Show KPI tiles right after primary input for immediate feedback */}
            <div className="lg:hidden">
              <KpiTilesStrip
                umsatz={result.umsatz}
                aufwaende={result.aufwaendeEffektiv}
                gewinn={result.gewinn}
                svs={svs.endgueltigeSVS}
                est={svs.einkommensteuer}
                netto={svs.echtesNetto}
              />
            </div>

            <InvestitionenSection
              investitionen={input.investitionen}
              afa={result.afa}
              isPro={subscription.isPro}
              dispatch={dispatch}
            />

            <PauschalierungSection
              pauschalierungArt={input.pauschalierungArt}
              jahresumsatz={input.jahresumsatz}
              isPro={subscription.isPro}
              dispatch={dispatch}
            />

            <VorauszahlungenSection
              vorauszahlungen={input.vorauszahlungen}
              result={result.vorauszahlungen}
              dispatch={dispatch}
            />

            <WeitereEinkuenfteSection
              weitereEinkuenfte={input.weitereEinkuenfte}
              isPro={subscription.isPro}
              dispatch={dispatch}
            />

            <GmbhVergleichSection
              gmbh={input.gmbh}
              isPro={subscription.isPro}
              dispatch={dispatch}
            />

            <GewinnmaximiererSection
              gewinnmaximierer={input.gewinnmaximierer}
              isPro={subscription.isPro}
              dispatch={dispatch}
            />

            <ProOptionsSection
              proOptions={input.proOptions}
              year={input.year}
              isPro={subscription.isPro}
              dispatch={dispatch}
            />
          </div>

          {/* Right - Results */}
          <div className="space-y-5 min-w-0 overflow-hidden">
            {svs.belowMinimum && (
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" aria-hidden="true" />
                <AlertDescription className="text-blue-800">
                  <span className="font-medium">Unter der Versicherungsgrenze:</span>{' '}
                  Bei einem Jahresgewinn unter {formatEuro(versicherungsgrenze)} besteht als Neuer Selbständiger keine Pflichtversicherung bei der SVS.
                </AlertDescription>
              </Alert>
            )}

            {svs.usesMinBeitragsgrundlage && (
              <Alert className="bg-amber-50 border-amber-200">
                <Info className="h-4 w-4 text-amber-500" aria-hidden="true" />
                <AlertDescription className="text-amber-800">
                  <span className="font-medium">Mindestbeitragsgrundlage:</span>{' '}
                  SVS wird auf der Mindestbeitragsgrundlage von {formatEuro(minBeitragsgrundlage)} berechnet, da dein Gewinn darunter liegt.
                </AlertDescription>
              </Alert>
            )}

            {svs.isJungunternehmer && (
              <Alert className="bg-green-50 border-green-200">
                <Info className="h-4 w-4 text-green-500" aria-hidden="true" />
                <AlertDescription className="text-green-800">
                  <span className="font-medium">Jungunternehmer-Bonus:</span>{' '}
                  Reduzierter KV-Beitragssatz (3,84% statt 6,80%) im {Number(input.year) - input.stammdaten.gruendungsJahr + 1}. Kalenderjahr.
                </AlertDescription>
              </Alert>
            )}

            {/* KPI Tiles - Desktop only (mobile version is in sidebar above) */}
            <div className="hidden lg:block">
              <KpiTilesStrip
                umsatz={result.umsatz}
                aufwaende={result.aufwaendeEffektiv}
                gewinn={result.gewinn}
                svs={svs.endgueltigeSVS}
                est={svs.einkommensteuer}
                netto={svs.echtesNetto}
              />
            </div>

            <GeldflussDiagramm
              umsatz={result.umsatz}
              aufwaende={result.aufwaendeEffektiv}
              gewinn={result.gewinn}
              svs={svs.endgueltigeSVS}
              est={svs.einkommensteuer}
              netto={svs.echtesNetto}
            />

            {!svs.belowMinimum && (
              <>
                <HeroNumber echtesNetto={svs.echtesNetto} gewinn={result.gewinn} />

                <WahrheitsTabelle gewinn={result.gewinn} result={svs} year={input.year} />

                {subscription.isBasic ? (
                  <>
                    <TaxBracketBar steuerpflichtig={svs.steuerpflichtig} year={input.year} />
                    <WaterfallChart gewinn={result.gewinn} result={svs} />
                    <SteuerTipps tipps={steuerTipps} gewinn={result.gewinn} year={input.year} />
                  </>
                ) : (
                  <div className="glass rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
                      <Lock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium text-muted-foreground text-center px-4">Detailanalyse ab Sicherheits-Plan</p>
                      <Button size="sm" onClick={() => handleUpgradeRequired('Detailanalyse', 'basic')}>
                        Jetzt freischalten
                      </Button>
                    </div>
                    <div className="opacity-20 pointer-events-none select-none" aria-hidden="true">
                      <TaxBracketBar steuerpflichtig={svs.steuerpflichtig} year={input.year} />
                    </div>
                  </div>
                )}

                {/* Pauschalierung Vergleich (Pro) */}
                {result.pauschalierung && subscription.isPro && (
                  <PauschalierungVergleich
                    pauschalierung={result.pauschalierung}
                    standardNetto={svs.echtesNetto}
                    standardAufwaende={result.aufwaendeEffektiv}
                    standardGewinn={result.gewinn}
                  />
                )}

                {/* GmbH Vergleich (Pro) */}
                {result.gmbh && subscription.isPro && (
                  <GmbhVergleichTabelle
                    gmbh={result.gmbh}
                    epuNetto={svs.echtesNetto}
                    epuSvs={svs.endgueltigeSVS}
                    epuEst={svs.einkommensteuer}
                    gewinn={result.gewinn}
                  />
                )}

                {/* Gewinnmaximierer Vergleich (Pro) */}
                {result.gewinnmaximierer && subscription.isPro && (
                  <GewinnmaximiererVergleich
                    result={result.gewinnmaximierer}
                    basisGewinn={result.gewinn}
                    basisNetto={svs.echtesNetto}
                  />
                )}

                {/* Gewinnfreibetrag Info */}
                <GewinnfreibetragInfo result={svs} />

                <DashboardCards result={svs} vorschreibung={vorschreibung} />
                <BeitragsDetails result={svs} />
                <MonthlyOverview result={svs} vorschreibung={vorschreibung} />
              </>
            )}

            <PremiumCTA
              gewinn={result.gewinn}
              vorschreibung={vorschreibung}
              result={svs}
              steuerTipps={steuerTipps}
              onImportGewinn={handleImportGewinn}
              alertPrefs={{ enabled: false, threshold: 0, notificationsEnabled: false }}
              alertActive={false}
              updateAlertPrefs={() => {}}
              requestNotificationPermission={async () => false}
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
              <p className="font-medium text-foreground/70">SVS Checker - Beitragsrechner für Selbständige in Österreich</p>
              <p>Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung. Werte {input.year}.</p>
              <div className="flex items-center justify-center gap-3 pt-1">
                <Link href="/impressum" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Impressum</Link>
                <span>·</span>
                <Link href="/datenschutz" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">Datenschutz</Link>
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
      <RechnerContent />
    </AppShell>
  )
}
