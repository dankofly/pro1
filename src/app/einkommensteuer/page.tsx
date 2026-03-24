'use client'

import { useState, useMemo } from 'react'
import { RechnerDisclaimer } from '@/components/rechner/rechner-disclaimer'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link'
import { formatEuro } from '@/lib/format'
import {
  calculateEinkommensteuer,
  YEAR_CONFIGS, TAX_YEARS,
  type EStResult, type PendlerType, type TaxYear,
} from '@/lib/einkommensteuer'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'

import {
  Calculator, Crown, Lock, Minus, Plus,
  TrendingDown, Receipt, Users, CalendarDays,
  Sparkles, BarChart3,
} from 'lucide-react'

// ── Helpers ─────────────────────────────────────────────────

function pct(val: number) { return `${(val * 100).toFixed(1)}%` }

function EuroInput({
  id, value, onChange, max = 300000, label, suffix,
}: {
  id: string; value: number; onChange: (v: number) => void
  max?: number; label: string; suffix?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-3">
        <div className="relative max-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">EUR</span>
          <Input
            id={id}
            value={value.toLocaleString('de-AT')}
            onChange={handleInput}
            className="pl-12 text-right font-mono text-lg font-medium"
          />
        </div>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        max={max}
        step={500}
        className="py-1"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>EUR 0</span>
        <span>EUR {(max / 2).toLocaleString('de-AT')}</span>
        <span>EUR {max.toLocaleString('de-AT')}</span>
      </div>
    </div>
  )
}

function KinderInput({ value, onChange, label, max = 6 }: {
  value: number; onChange: (v: number) => void; label: string; max?: number
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-11 w-11 cursor-pointer" disabled={value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-mono font-medium">{value}</span>
        <Button variant="outline" size="icon" className="h-11 w-11 cursor-pointer" disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ── Wasserfall-Diagramm (Recharts) ──────────────────────────

const WATERFALL_COLORS: Record<string, string> = {
  start: '#3b82f6',   // blue-500
  abzug: '#ef4444',   // red-500
  bonus: '#10b981',   // emerald-500
  ergebnis: '#10b981', // emerald-500
}

interface WaterfallDatum {
  name: string
  value: number
  bottom: number
  fill: string
  typ: string
}

function buildWaterfallData(result: EStResult): WaterfallDatum[] {
  return result.wasserfall.map(step => {
    if (step.typ === 'start' || step.typ === 'ergebnis') {
      return {
        name: step.label,
        value: step.laufend,
        bottom: 0,
        fill: WATERFALL_COLORS[step.typ],
        typ: step.typ,
      }
    }
    // For abzug (negative) and bonus (positive) steps
    if (step.betrag < 0) {
      return {
        name: step.label,
        value: Math.abs(step.betrag),
        bottom: step.laufend,
        fill: WATERFALL_COLORS.abzug,
        typ: step.typ,
      }
    }
    return {
      name: step.label,
      value: step.betrag,
      bottom: step.laufend - step.betrag,
      fill: WATERFALL_COLORS.bonus,
      typ: step.typ,
    }
  })
}

function WasserfallChart({ result }: { result: EStResult }) {
  const data = useMemo(() => buildWaterfallData(result), [result])

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingDown className="h-5 w-5 text-blue-600" />
          Wasserfall: Vom Brutto zum Netto
        </CardTitle>
        <CardDescription>Schritt-für-Schritt Abzüge und Gutschriften</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Desktop: Recharts BarChart */}
        <div className="hidden sm:block">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                angle={-35}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                formatter={(value) => formatEuro(Number(value))}
                labelStyle={{ fontWeight: 600 }}
                contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
              />
              <ReferenceLine y={0} stroke="#94a3b8" />
              {/* Invisible bottom bar (stacks) */}
              <Bar dataKey="bottom" stackId="stack" fill="transparent" />
              {/* Visible value bar */}
              <Bar dataKey="value" stackId="stack" radius={[4, 4, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mobile: Simplified horizontal bars */}
        <div className="sm:hidden space-y-2">
          {result.wasserfall.map((step, i) => {
            const maxVal = result.wasserfall[0]?.laufend || 1
            const barWidth = Math.max(2, Math.abs(step.laufend / maxVal) * 100)
            const isLast = step.typ === 'ergebnis'
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 text-xs shrink-0">
                  <span className={isLast ? 'font-bold' : 'text-muted-foreground'}>{step.label}</span>
                </div>
                <div className="flex-1 relative h-6">
                  <div
                    className={`h-full rounded-md transition-all ${
                      isLast ? 'bg-emerald-500/100' : step.typ === 'abzug' ? 'bg-red-400/70' : step.typ === 'bonus' ? 'bg-emerald-400/70' : 'bg-blue-500/100'
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className={`w-24 text-right font-mono text-xs shrink-0 ${
                  isLast ? 'font-bold text-emerald-400' : step.betrag < 0 ? 'text-red-600' : step.typ === 'bonus' ? 'text-emerald-400' : ''
                }`}>
                  {formatEuro(step.typ === 'ergebnis' || step.typ === 'start' ? step.laufend : step.betrag)}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Tarifstufen-Visualisierung ──────────────────────────────

const BRACKET_COLORS = [
  'bg-emerald-500/100', 'bg-emerald-400', 'bg-yellow-400',
  'bg-orange-400', 'bg-orange-500', 'bg-red-400', 'bg-red-600',
]

function TarifstufenViz({ result, year }: { result: EStResult; year: TaxYear }) {
  const yc = YEAR_CONFIGS[year]
  const brackets = yc.taxBrackets
  // Find the highest bracket that applies
  const maxRelevant = Math.max(
    result.steuerbaresEinkommen,
    brackets.length > 1 ? brackets[1].from : 0
  )
  // Cap display at 120% of taxable income or at least the next bracket
  const displayMax = Math.max(
    maxRelevant * 1.2,
    result.steuerbaresEinkommen > 0
      ? brackets.find(b => b.from > result.steuerbaresEinkommen)?.from ?? maxRelevant * 1.2
      : brackets[2]?.from ?? 50000
  )

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-violet-600" />
          Tarifstufen-Visualisierung
        </CardTitle>
        <CardDescription>Dein Einkommen aufgeteilt nach Steuerstufen</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Stacked bar */}
        <div className="relative h-10 rounded-lg overflow-hidden flex">
          {brackets.map((b, i) => {
            if (result.steuerbaresEinkommen <= b.from) return null
            const inBracket = Math.min(result.steuerbaresEinkommen, b.to) - b.from
            const widthPct = (inBracket / displayMax) * 100
            if (widthPct < 0.5) return null
            return (
              <div
                key={i}
                className={`${BRACKET_COLORS[i]} h-full relative group transition-all`}
                style={{ width: `${widthPct}%` }}
                title={`${(b.rate * 100).toFixed(0)}%: ${formatEuro(inBracket)}`}
              >
                {widthPct > 8 && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                    {(b.rate * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            )
          })}
          {/* Remaining capacity (grey) */}
          {result.steuerbaresEinkommen < displayMax && (
            <div
              className="bg-muted h-full"
              style={{ width: `${((displayMax - result.steuerbaresEinkommen) / displayMax) * 100}%` }}
            />
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs">
          {brackets.map((b, i) => {
            const inBracket = Math.max(0, Math.min(result.steuerbaresEinkommen, b.to) - b.from)
            if (inBracket <= 0 && i > 0) return null
            return (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${BRACKET_COLORS[i]}`} />
                <span className="text-muted-foreground">
                  {(b.rate * 100).toFixed(0)}%
                  {inBracket > 0 && (
                    <span className="font-mono ml-1">({formatEuro(inBracket)})</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Ergebnis-Karten ─────────────────────────────────────────

function ResultCards({ result }: { result: EStResult }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass-dark border-0 text-white">
        <CardContent className="p-4 sm:p-5">
          <p className="text-slate-300 text-xs mb-1">Einkommensteuer</p>
          <p className="text-2xl sm:text-3xl font-bold">
            {formatEuro(Math.max(0, result.steuer))}
          </p>
          <p className="text-slate-400 text-xs mt-1">Steuerbelastung</p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardContent className="p-4 sm:p-5">
          <p className="text-muted-foreground text-xs mb-1">Grenzsteuersatz</p>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600">
            {pct(result.grenzsteuersatz)}
          </p>
          <p className="text-muted-foreground text-xs mt-1">nächster Euro</p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardContent className="p-4 sm:p-5">
          <p className="text-muted-foreground text-xs mb-1">Effektivsteuersatz</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {pct(Math.max(0, result.effektivsteuersatz))}
          </p>
          <p className="text-muted-foreground text-xs mt-1">durchschnittlich</p>
        </CardContent>
      </Card>

      <Card className="glass border-emerald-500/30 bg-emerald-500/100/10">
        <CardContent className="p-4 sm:p-5">
          <p className="text-emerald-400 text-xs mb-1">Netto nach Steuer</p>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
            {formatEuro(result.netto)}
          </p>
          <p className="text-emerald-400/60 text-xs mt-1">
            {formatEuro(result.netto / 12)}/Monat
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Steuerersparnis-Zusammenfassung ─────────────────────────

function SteuerersparnisHinweis({ result, year }: { result: EStResult; year: TaxYear }) {
  if (result.absetzbetraegeGesamt <= 0) return null

  const tatsaechlicheErsparnis = Math.min(result.absetzbetraegeGesamt, result.steuerBrutto)
  if (tatsaechlicheErsparnis <= 0) return null

  return (
    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-emerald-400">
        <Sparkles className="h-4 w-4" />
        <span className="font-semibold text-sm">Deine Steuerersparnis {year}</span>
      </div>
      <p className="text-emerald-400 text-sm">
        Durch deine Absetzbeträge sparst du{' '}
        <strong>{formatEuro(tatsaechlicheErsparnis)}</strong> an Steuern.
      </p>
      {result.absetzbetraege.map((ab, i) => (
        <p key={i} className="text-emerald-400 text-xs">
          {ab.name}: {formatEuro(ab.betrag)}
        </p>
      ))}
    </div>
  )
}

// ── Pro-Gate ────────────────────────────────────────────────

function ProFeatureOverlay({ children, label, isPro }: {
  children: React.ReactNode; label: string; isPro: boolean
}) {
  if (isPro) return <>{children}</>
  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Badge variant="outline" className="bg-background/90 text-amber-500 border-amber-500/30 gap-1 shadow-lg">
          <Lock className="h-3 w-3" /> {label} – Pro Feature
        </Badge>
      </div>
    </div>
  )
}

// ── Hauptinhalt ─────────────────────────────────────────────

function EinkommensteuerContent() {
  const { subscription } = useAppShell()
  const isPro = subscription.isPro

  // State
  const [bruttoeinkommen, setBruttoeinkommen] = useState(45000)
  const [kinder, setKinder] = useState(0)
  const [kinderUeber18, setKinderUeber18] = useState(0)
  const [alleinverdiener, setAlleinverdiener] = useState(false)
  const [alleinerzieher, setAlleinerzieher] = useState(false)
  const [werbungskosten, setWerbungskosten] = useState(0)
  const [pendlerpauschale, setPendlerpauschale] = useState<PendlerType>('keine')
  const [pendlerKm, setPendlerKm] = useState(20)
  const [isSelbstaendig, setIsSelbstaendig] = useState(false)
  const [year, setYear] = useState<TaxYear>('2026')
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  // Alleinverdiener und Alleinerzieher schliessen sich gegenseitig aus
  const handleAlleinverdiener = (checked: boolean) => {
    setAlleinverdiener(checked)
    if (checked) setAlleinerzieher(false)
  }
  const handleAlleinerzieher = (checked: boolean) => {
    setAlleinerzieher(checked)
    if (checked) setAlleinverdiener(false)
  }

  const yc = YEAR_CONFIGS[year]

  const result = useMemo(() => calculateEinkommensteuer({
    bruttoeinkommen,
    kinder,
    kinderUeber18,
    alleinverdiener,
    alleinerzieher,
    werbungskosten,
    pendlerpauschale: isPro ? pendlerpauschale : 'keine',
    pendlerKm: isPro ? pendlerKm : 0,
    isSelbstaendig,
    year,
  }), [
    bruttoeinkommen, kinder, kinderUeber18,
    alleinverdiener, alleinerzieher, werbungskosten,
    pendlerpauschale, pendlerKm, isSelbstaendig, year, isPro,
  ])

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Einkommensteuer-Rechner 2026</h1>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            <Receipt className="h-3 w-3 mr-1" /> ESt AT
          </Badge>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Jahresauswahl ─────────────────────────── */}
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Steuerjahr</Label>
              </div>
              <Select value={year} onValueChange={(v) => setYear(v as TaxYear)}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TAX_YEARS.map((y) => (
                    <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {year === '2026' && (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-500/10 text-xs">
                  Prognose – vorbehaltlich gesetzlicher Änderungen
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Eingaben ────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Einkommen */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                  <Receipt className="h-4 w-4 text-blue-600" />
                </div>
                Einkommen
              </CardTitle>
              <CardDescription>Jahresbruttogehalt oder Gewinn aus selbständiger Tätigkeit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <EuroInput
                id="brutto"
                value={bruttoeinkommen}
                onChange={setBruttoeinkommen}
                max={300000}
                label="Jahresbruttoeinkommen"
                suffix="/ Jahr"
              />
              <div className="flex items-center justify-between">
                <Label htmlFor="selbstaendig" className="text-sm">Selbständig (kein Verkehrsabsetzbetrag)</Label>
                <Switch id="selbstaendig" checked={isSelbstaendig} onCheckedChange={setIsSelbstaendig} />
              </div>
            </CardContent>
          </Card>

          {/* Absetzbeträge */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <Users className="h-4 w-4 text-violet-600" />
                </div>
                Absetzbeträge
              </CardTitle>
              <CardDescription>Kinder, Alleinverdiener, Werbungskosten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <KinderInput
                value={kinder}
                onChange={setKinder}
                label={`Kinder unter 18 (FBP EUR ${yc.absetzbetraege.familienbonusUnder18.toLocaleString('de-AT')})`}
                max={6}
              />
              <KinderInput
                value={kinderUeber18}
                onChange={setKinderUeber18}
                label={`Kinder über 18 (FBP EUR ${yc.absetzbetraege.familienbonusOver18.toLocaleString('de-AT')})`}
                max={4}
              />
              <div className="flex items-center justify-between">
                <Label htmlFor="avab" className="text-sm">Alleinverdiener</Label>
                <Switch id="avab" checked={alleinverdiener} onCheckedChange={handleAlleinverdiener} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="aeab" className="text-sm">Alleinerzieher</Label>
                <Switch id="aeab" checked={alleinerzieher} onCheckedChange={handleAlleinerzieher} />
              </div>
              <EuroInput
                id="werbungskosten"
                value={werbungskosten}
                onChange={setWerbungskosten}
                max={30000}
                label={`Werbungskosten (Pauschale: EUR ${yc.werbungskostenpauschale})`}
              />
            </CardContent>
          </Card>
        </div>

        {/* ── Pendlerpauschale (Pro) ────────────────── */}
        <ProFeatureOverlay label="Pendlerpauschale" isPro={isPro}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                  <Crown className="h-4 w-4 text-amber-600" />
                </div>
                Pendlerpauschale
                {!isPro && (
                  <Badge variant="outline" className="ml-2 bg-amber-500/100/10 text-amber-600 border-amber-300/30 text-xs">
                    <Crown className="h-3 w-3 mr-1" /> Pro
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label className="text-sm font-medium mb-2 block">Art</Label>
                  <Select
                    value={pendlerpauschale}
                    onValueChange={(v) => setPendlerpauschale(v as PendlerType)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keine">Keine Pendlerpauschale</SelectItem>
                      <SelectItem value="klein">Kleines PP (öff. Verkehr zumutbar)</SelectItem>
                      <SelectItem value="gross">Großes PP (öff. Verkehr nicht zumutbar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {pendlerpauschale !== 'keine' && (
                  <div className="flex-1">
                    <Label className="text-sm font-medium mb-2 block">
                      Entfernung: {pendlerKm} km
                    </Label>
                    <Slider
                      value={[pendlerKm]}
                      onValueChange={([v]) => setPendlerKm(v)}
                      min={2}
                      max={100}
                      step={1}
                      className="py-1"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>2 km</span>
                      <span>50 km</span>
                      <span>100 km</span>
                    </div>
                  </div>
                )}
              </div>
              {pendlerpauschale !== 'keine' && result.pendlerpauschale > 0 && (
                <div className="bg-amber-500/10 rounded-lg p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pendlerpauschale pro Jahr</span>
                    <span className="font-mono text-emerald-400">{formatEuro(result.pendlerpauschale)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </ProFeatureOverlay>

        {/* ── Ergebnis-Karten ─────────────────────── */}
        <ResultCards result={result} />

        {/* ── Steuerersparnis-Hinweis ─────────────── */}
        <SteuerersparnisHinweis result={result} year={year} />

        {/* ── Wasserfall (Pro) ────────────────────── */}
        <ProFeatureOverlay label="Wasserfall-Diagramm" isPro={isPro}>
          <WasserfallChart result={result} />
        </ProFeatureOverlay>

        {/* ── Tarifstufen-Visualisierung ──────────── */}
        <TarifstufenViz result={result} year={year} />

        {/* ── Detail-Accordion ────────────────────── */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Steuer-Detail {year}</CardTitle>
            <CardDescription>Alle 7 Tarifstufen und angewandte Absetzbeträge</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['stufen', 'absetzbetraege']}>
              {/* Tarifstufen */}
              <AccordionItem value="stufen">
                <AccordionTrigger className="text-sm font-medium">
                  Tarifstufen-Aufschlüsselung
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tarifstufe</TableHead>
                        <TableHead className="text-right">Grenzsteuersatz</TableHead>
                        <TableHead className="text-right">Betrag in Stufe</TableHead>
                        <TableHead className="text-right">Steuer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.stufenDetails.map((stufe, i) => {
                        const isActive = result.steuerbaresEinkommen > stufe.von
                        return (
                          <TableRow key={i} className={isActive ? '' : 'text-muted-foreground/50'}>
                            <TableCell className="text-sm">
                              {stufe.stufe}
                              {isActive && result.steuerbaresEinkommen <= stufe.bis && (
                                <Badge variant="outline" className="ml-2 text-xs">Aktuell</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-mono">{pct(stufe.rate)}</TableCell>
                            <TableCell className="text-right font-mono">
                              {isActive ? formatEuro(stufe.betrag) : '–'}
                            </TableCell>
                            <TableCell className="text-right font-mono">
                              {isActive ? formatEuro(stufe.steuer) : '–'}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                      {/* Summenzeile */}
                      <TableRow className="font-bold border-t-2">
                        <TableCell>Gesamt</TableCell>
                        <TableCell />
                        <TableCell className="text-right font-mono">{formatEuro(result.steuerbaresEinkommen)}</TableCell>
                        <TableCell className="text-right font-mono text-red-600">{formatEuro(result.steuerBrutto)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>

              {/* Absetzbeträge */}
              <AccordionItem value="absetzbetraege">
                <AccordionTrigger className="text-sm font-medium">
                  Absetzbeträge & Gutschriften
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {result.absetzbetraege.length > 0 ? (
                      result.absetzbetraege.map((ab, i) => (
                        <div key={i} className="flex justify-between text-sm py-1">
                          <span className="text-muted-foreground">{ab.name}</span>
                          <span className="font-mono text-emerald-400">{formatEuro(ab.betrag)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Keine Absetzbeträge anwendbar.</p>
                    )}
                    {result.absetzbetraege.length > 0 && (
                      <div className="flex justify-between text-sm py-1 border-t font-medium">
                        <span>Gesamt Absetzbeträge</span>
                        <span className="font-mono text-emerald-400">{formatEuro(result.absetzbetraegeGesamt)}</span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Zusammenfassung */}
              <AccordionItem value="zusammenfassung">
                <AccordionTrigger className="text-sm font-medium">
                  Zusammenfassung
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bruttoeinkommen</span>
                      <span className="font-mono">{formatEuro(result.bruttoeinkommen)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Werbungskosten</span>
                      <span className="font-mono text-red-600">-{formatEuro(result.werbungskosten)}</span>
                    </div>
                    {result.pendlerpauschale > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pendlerpauschale</span>
                        <span className="font-mono text-red-600">-{formatEuro(result.pendlerpauschale)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Steuerbares Einkommen</span>
                      <span className="font-mono">{formatEuro(result.steuerbaresEinkommen)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Steuer (Tarif)</span>
                      <span className="font-mono text-red-600">{formatEuro(result.steuerBrutto)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Absetzbeträge</span>
                      <span className="font-mono text-emerald-400">-{formatEuro(result.absetzbetraegeGesamt)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Steuer (effektiv)</span>
                      <span className={`font-mono ${result.steuer < 0 ? 'text-emerald-400' : 'text-red-600'}`}>
                        {formatEuro(Math.max(0, result.steuer))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durchschn. Steuersatz</span>
                      <span className="font-mono">{pct(Math.max(0, result.effektivsteuersatz))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grenzsteuersatz</span>
                      <span className="font-mono">{pct(result.grenzsteuersatz)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1 text-base">
                      <span className="text-emerald-400">Netto nach Steuer</span>
                      <span className="font-mono text-emerald-400">{formatEuro(result.netto)}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <RechnerDisclaimer vereinfachungen={[
          'Keine Sonderausgaben (Kirchenbeitrag, Spenden, bestimmte Versicherungen)',
          'Keine außergewöhnlichen Belastungen',
          'Kein Verlustausgleich oder Verlustvortrag aus Vorjahren',
          'Pendlerpauschale nur bei Aktivierung berücksichtigt',
        ]} />

        {/* Footer */}
        <SiteFooter />
      </div>

      <UpgradeDialog
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        feature="Erweiterte Einkommensteuer-Berechnung"
        requiredPlan="pro"
      />
    </>
  )
}

export default function EinkommensteuerPage() {
  return (
    <AppShell>
      <EinkommensteuerContent />
    </AppShell>
  )
}
