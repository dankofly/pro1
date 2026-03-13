'use client'

import { useState, useMemo, useCallback, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatEuro } from '@/lib/format'
import { type TaxYear, YEAR_CONFIGS } from '@/lib/tax-constants'
import { calculateSteuerTipps } from '@/lib/svs-calculator'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { useRechnerState } from '@/hooks/use-rechner-state'

// Existing SVS result components
import { YearSelector } from '@/components/svs/year-selector'
// HeroNumber removed — redundant with KPI hero card
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
// VorauszahlungenSection integrated into UmsatzAufwaendeSection
import { WeitereEinkuenfteSection } from '@/components/rechner/weitere-einkuenfte-section'
import { GmbhVergleichSection } from '@/components/rechner/gmbh-vergleich-section'
import { GewinnmaximiererSection } from '@/components/rechner/gewinnmaximierer-section'
import { ProOptionsSection } from '@/components/rechner/pro-options-section'
import { PauschalierungVergleich } from '@/components/rechner/pauschalierung-vergleich'
import { GmbhVergleichTabelle } from '@/components/rechner/gmbh-vergleich-tabelle'
import { GewinnmaximiererVergleich } from '@/components/rechner/gewinnmaximierer-vergleich'
import { GewinnfreibetragInfo } from '@/components/rechner/gewinnfreibetrag-info'
import { AiTaxAdvisor } from '@/components/rechner/ai-tax-advisor'
import { GeldflussDiagramm } from '@/components/rechner/geldfluss-diagramm'
import { RuecklagenSection } from '@/components/rechner/ruecklagen-section'
import { UstSection } from '@/components/rechner/ust-section'
import { UstVergleichTabelle } from '@/components/rechner/ust-vergleich-tabelle'
import { SectionDivider } from '@/components/rechner/section-divider'
import { PageFooter } from '@/components/svs/page-footer'

import { Button } from '@/components/ui/button'
// Alert replaced with custom left-border accent divs
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Save, Lock, ChevronDown, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

import type { Stammdaten } from '@/lib/rechner-types'
import { useUserPreferences, BRANCHEN } from '@/lib/user-preferences'
import { getDefaultRechnerForBranche } from '@/lib/rechner-registry'
import type { Branche } from '@/lib/user-preferences'

function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal(0.08)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function RechnerSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-10 lg:gap-14">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-36 w-full rounded-2xl" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function RechnerContent() {
  const { user, subscription, preferences } = useAppShell()
  const rechner = useRechnerState()
  const { input, result, dispatch, isOnboarded, completeOnboarding, setField } = rechner
  const { setPrefs } = useUserPreferences()
  const brancheInfo = BRANCHEN.find((b) => b.value === preferences.branche)

  const [saving, setSaving] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')
  const [upgradeRequiredPlan, setUpgradeRequiredPlan] = useState<'basic' | 'pro'>('basic')
  const [mounted, setMounted] = useState(false)
  const [showBeitragsDetails, setShowBeitragsDetails] = useState(false)
  const [showMonthlyOverview, setShowMonthlyOverview] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const mainContentRef = useRef<HTMLDivElement>(null)

  // Avoid hydration mismatch (localStorage read)
  useEffect(() => setMounted(true), [])

  // Scroll progress for the sticky header bar
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

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

  const handleOnboardingComplete = useCallback((stammdaten: Stammdaten, branche: Branche) => {
    completeOnboarding(stammdaten)
    // Save branche + default rechner visibility to user preferences
    setPrefs({
      branche,
      visibleRechner: getDefaultRechnerForBranche(branche),
      onboardingCompleted: true,
    })
    // Focus the main content area after onboarding completes
    requestAnimationFrame(() => {
      mainContentRef.current?.focus()
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [completeOnboarding, setPrefs])

  // Show loading state during hydration
  if (!mounted) {
    return <RechnerSkeleton />
  }

  // Show onboarding wizard if not yet completed
  if (!isOnboarded) {
    return (
      <div className="flex flex-col items-center">
        <OnboardingWizard onComplete={handleOnboardingComplete} />
        <button
          type="button"
          onClick={() => completeOnboarding(input.stammdaten)}
          className="mt-4 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Direkt zum Rechner
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-[hsl(var(--surface))]/80 backdrop-blur-lg border-b border-border/40">
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-primary/40 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNav />
            <h1 className="section-header hidden sm:inline">
              Steuerboard Berechnung für {brancheInfo ? brancheInfo.label : 'Sonstiges'} {input.year}
            </h1>
            <span className="text-border/60 mx-1 hidden sm:inline">/</span>
            <StatusBadge riskPercent={svs.riskPercent} />
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Button
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
      <div ref={mainContentRef} id="main-content" tabIndex={-1} className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 focus:outline-none focus-visible:outline-none overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-10 lg:gap-14">

          {/* Left - Inputs */}
          <div className="space-y-3.5 lg:pr-6 lg:border-r lg:border-border/30">
            <YearSelector
              year={input.year}
              onYearChange={(y: TaxYear) => setField('year', y)}
            />



            <UmsatzAufwaendeSection
              jahresumsatz={input.jahresumsatz}
              aufwaende={input.aufwaende}
              aufwaendeGesamt={input.aufwaendeGesamt}
              aufwaendeDetailed={input.aufwaendeDetailed}
              gewinn={result.gewinn}
              vorauszahlungen={input.vorauszahlungen}
              vorauszahlungenResult={result.vorauszahlungen}
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

            <UstSection
              ust={input.ust}
              jahresumsatz={input.jahresumsatz}
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
          <div className="space-y-7 min-w-0 overflow-hidden">
            {svs.belowMinimum && (
              <div className="flex gap-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/30 border-l-[3px] border-l-blue-500 rounded-lg p-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                <p className="text-sm text-foreground">
                  <span className="font-medium">Unter der Versicherungsgrenze:</span>{' '}
                  Bei einem Jahresgewinn unter {formatEuro(versicherungsgrenze)} besteht als Neuer Selbständiger keine Pflichtversicherung bei der SVS.
                </p>
              </div>
            )}

            {svs.usesMinBeitragsgrundlage && (
              <div className="flex gap-3 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30 border-l-[3px] border-l-amber-500 rounded-lg p-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <p className="text-sm text-foreground">
                  <span className="font-medium">Mindestbeitragsgrundlage:</span>{' '}
                  SVS wird auf der Mindestbeitragsgrundlage von {formatEuro(minBeitragsgrundlage)} berechnet, da dein Gewinn darunter liegt.
                </p>
              </div>
            )}

            {svs.isJungunternehmer && (
              <div className="flex gap-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 border-l-[3px] border-l-emerald-500 rounded-lg p-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <p className="text-sm text-foreground">
                  <span className="font-medium">Jungunternehmer-Bonus:</span>{' '}
                  Reduzierter KV-Beitragssatz (3,84% statt 6,80%) im {Number(input.year) - input.stammdaten.gruendungsJahr + 1}. Kalenderjahr.
                </p>
              </div>
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

            {/* Actionable Insights — direkt nach KPIs (5-Sekunden-Regel) */}
            {!svs.belowMinimum && (
              <DashboardCards result={svs} vorschreibung={vorschreibung} />
            )}

            <ScrollReveal>
              <RuecklagenSection
                ruecklagen={result.ruecklagen}
              />
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <UstVergleichTabelle ustResult={result.ustResult} />
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <GeldflussDiagramm
                umsatz={result.umsatz}
                aufwaende={result.aufwaendeEffektiv}
                gewinn={result.gewinn}
                svs={svs.endgueltigeSVS}
                est={svs.einkommensteuer}
                netto={svs.echtesNetto}
              />
            </ScrollReveal>

            {!svs.belowMinimum && (
              <>
                <ScrollReveal>
                  <WahrheitsTabelle gewinn={result.gewinn} result={svs} year={input.year} />
                </ScrollReveal>

                {/* ── Detailanalyse ── */}
                <ScrollReveal>
                  <SectionDivider title="Detailanalyse" />
                </ScrollReveal>

                {subscription.isBasic ? (
                  <>
                    <TaxBracketBar steuerpflichtig={svs.steuerpflichtig} year={input.year} />
                    <WaterfallChart gewinn={result.gewinn} result={svs} />
                    <SteuerTipps tipps={steuerTipps} gewinn={result.gewinn} year={input.year} />
                  </>
                ) : (
                  <div className="card-surface p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-background/70 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-3">
                      <Lock className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
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

                {/* ── Pro-Vergleiche ── */}
                {subscription.isPro && (result.pauschalierung || result.gmbh || result.gewinnmaximierer) && (
                  <SectionDivider title="Pro-Vergleiche" />
                )}

                {result.pauschalierung && subscription.isPro && (
                  <PauschalierungVergleich
                    pauschalierung={result.pauschalierung}
                    standardNetto={svs.echtesNetto}
                    standardAufwaende={result.aufwaendeEffektiv}
                    standardGewinn={result.gewinn}
                  />
                )}

                {result.gmbh && subscription.isPro && (
                  <GmbhVergleichTabelle
                    gmbh={result.gmbh}
                    epuNetto={svs.echtesNetto}
                    epuSvs={svs.endgueltigeSVS}
                    epuEst={svs.einkommensteuer}
                    gewinn={result.gewinn}
                  />
                )}

                {result.gewinnmaximierer && subscription.isPro && (
                  <GewinnmaximiererVergleich
                    result={result.gewinnmaximierer}
                    basisGewinn={result.gewinn}
                    basisNetto={svs.echtesNetto}
                  />
                )}

                {/* KI-Steuerberater */}
                <AiTaxAdvisor
                  input={input}
                  result={result}
                  isPro={subscription.isPro}
                  onUpgradeRequired={handleUpgradeRequired}
                />

                {/* Gewinnfreibetrag Info */}
                <GewinnfreibetragInfo result={svs} />

                {/* ── Weitere Details (collapsible) ── */}
                <SectionDivider title="Weitere Details" />

                <button
                  onClick={() => setShowBeitragsDetails(!showBeitragsDetails)}
                  aria-expanded={showBeitragsDetails}
                  className="card-surface w-full flex items-center justify-between px-4 py-4 sm:py-3.5 min-h-[48px] text-sm font-semibold text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Beitragsdetails
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showBeitragsDetails ? 'rotate-180' : ''}`} />
                </button>
                {showBeitragsDetails && <BeitragsDetails result={svs} />}

                <button
                  onClick={() => setShowMonthlyOverview(!showMonthlyOverview)}
                  aria-expanded={showMonthlyOverview}
                  className="card-surface w-full flex items-center justify-between px-4 py-4 sm:py-3.5 min-h-[48px] text-sm font-semibold text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Monatsübersicht
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showMonthlyOverview ? 'rotate-180' : ''}`} />
                </button>
                {showMonthlyOverview && <MonthlyOverview result={svs} vorschreibung={vorschreibung} />}
              </>
            )}

            <PremiumCTA
              gewinn={result.gewinn}
              umsatz={result.umsatz}
              aufwaende={result.aufwaendeEffektiv}
              vorschreibung={vorschreibung}
              result={svs}
              steuerTipps={steuerTipps}
              input={input}
              rechnerResult={result}
              subscription={subscription}
              onUpgradeRequired={handleUpgradeRequired}
            />

            <UpgradeDialog
              open={upgradeOpen}
              onOpenChange={setUpgradeOpen}
              feature={upgradeFeature}
              requiredPlan={upgradeRequiredPlan}
            />

            {/* ─── FAQ ─── */}
            <section className="mt-12 card-surface p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-[11px] font-semibold uppercase text-muted-foreground tracking-[0.08em]">
                  Häufig gestellte Fragen zum SVS-Rechner
                </h2>
              </div>
              <Accordion type="single" collapsible className="space-y-1">
                <AccordionItem value="r-0" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Was berechnet der SVS-Beitragsrechner von SteuerBoard.pro?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Der Rechner ermittelt auf Basis deines Jahresgewinns (Umsatz minus Betriebsausgaben) deine SVS-Beiträge aufgeschlüsselt nach Pensionsversicherung (18,50 %), Krankenversicherung (6,80 %), Selbständigenvorsorge (1,53 %) und Unfallversicherung (pauschal 11,35 EUR/Monat). Zusätzlich berechnet er die Einkommensteuer nach dem progressiven Tarif (§ 33 EStG), die voraussichtliche SVS-Nachzahlung und dein echtes Netto — also was nach Abzug aller Abgaben tatsächlich auf deinem Konto bleibt.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-1" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Worin unterscheidet sich dieser Rechner vom WKO SVS-Rechner?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Der WKO SVS-Beitragsrechner liefert nur die SVS-Beiträge auf Basis einer Beitragsgrundlage — ohne Einkommensteuer, ohne Nachzahlung und ohne echtes Netto. SteuerBoard.pro berechnet alles in einem Schritt: SVS-Beiträge, Einkommensteuer-Prognose nach Tarifstufen, die voraussichtliche Nachzahlung (Differenz vorläufige vs. endgültige Beiträge), das Geldfluss-Diagramm (wer bekommt wie viel), die Wahrheits-Tabelle mit allen Positionen im Detail und monatliche Rücklagen-Empfehlungen. Außerdem bietet SteuerBoard einen KI-Steuerberater, GmbH-Vergleich, Pauschalierungs-Check und 7 weitere Steuerrechner.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-2" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Was ist die Beitragsgrundlage und wie wird sie ermittelt?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Die Beitragsgrundlage ist der Betrag, auf den deine SVS-Beiträge berechnet werden. Sie ergibt sich aus deinem Gewinn laut Einkommensteuerbescheid (§ 25 GSVG). Es gibt eine Mindestbeitragsgrundlage (ca. 500 EUR/Monat) und eine Höchstbeitragsgrundlage (ca. 7.070 EUR/Monat in 2025). Liegt dein Gewinn darunter, zahlst du die Mindestbeiträge; liegt er darüber, werden die Beiträge gedeckelt. Der Rechner zeigt dir genau, wo du innerhalb dieser Grenzen liegst.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-3" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Warum stimmen meine vorläufigen SVS-Beiträge nicht mit den endgültigen überein?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Die SVS berechnet deine Beiträge zunächst vorläufig auf Basis deines Gewinns von vor 3 Jahren (§ 25a GSVG). Sobald dein aktueller Steuerbescheid vorliegt, wird die endgültige Beitragsgrundlage festgestellt. Ist dein aktueller Gewinn höher als vor 3 Jahren, entsteht eine Nachzahlung — die sogenannte „Nachzahlungsfalle". Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann diese über 5.000 EUR betragen. Die Wahrheits-Tabelle in SteuerBoard zeigt dir Quartal für Quartal die Differenz zwischen vorläufig und endgültig.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-4" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Was zeigt die Wahrheits-Tabelle?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Die Wahrheits-Tabelle schlüsselt alle SVS-Positionen im Detail auf: vorläufige Beiträge (basierend auf dem Gewinn von vor 3 Jahren), endgültige Beiträge (basierend auf dem aktuellen Gewinn), die Differenz pro Quartal und die Gesamtnachzahlung bzw. Rückerstattung. So siehst du auf einen Blick, warum dein SVS-Bescheid höher oder niedriger ausfällt als erwartet.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-5" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Wie funktioniert das Geldfluss-Diagramm?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Das Geldfluss-Diagramm visualisiert, wie sich dein Jahresgewinn aufteilt: Was geht an die SVS (Sozialversicherung), was geht ans Finanzamt (Einkommensteuer) und was bleibt als echtes Netto bei dir. So siehst du die tatsächliche Abgabenbelastung in Prozent deines Gewinns — oft deutlich höher als der reine Einkommensteuersatz vermuten lässt.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-6" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Für welche Steuerjahre funktioniert der Rechner?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Der Rechner unterstützt die Steuerjahre 2024, 2025 und 2026 mit den jeweils gültigen Werten: SVS-Beitragssätze, Mindest- und Höchstbeitragsgrundlagen, Einkommensteuertarif, Gewinnfreibetrag, Familienbonus Plus (2.100 EUR ab 2026), AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR), Kindermehrbetrag (727 EUR) und Kleinunternehmergrenze (55.000 EUR). Du kannst per Klick zwischen den Jahren wechseln und die Auswirkung auf deine Abgaben vergleichen.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="r-7" className="border-b-0">
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    Sind die Berechnungen verbindlich?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Nein. Alle Berechnungen sind Richtwerte auf Basis der aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG) und erfolgen ohne Gewähr. Die endgültigen Bescheide der SVS und des Finanzamts können aufgrund individueller Sachverhalte abweichen. SteuerBoard.pro ersetzt keine professionelle Steuerberatung, hilft dir aber, deine Steuersituation besser einzuschätzen und vorbereitet ins Gespräch mit deinem Steuerberater zu gehen.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <PageFooter extra={`Kein Ersatz für professionelle Steuerberatung. Werte ${input.year}.`} />
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
