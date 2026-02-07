'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatEuro } from '@/lib/format'
import {
  calculateMischEinkommen, CONFIG, YEAR_CONFIGS, TAX_YEARS,
  type MischResult, type TaxYear,
} from '@/lib/misch-einkommen'
import { AppShell, useAppShell } from '@/components/svs/app-shell'

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
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Calculator, Briefcase, Store, Crown, AlertTriangle,
  TrendingDown, ArrowRight, Users, Minus, Plus, Lock, ShieldCheck,
  CalendarDays, Sparkles,
} from 'lucide-react'

// ── Helper ─────────────────────────────────────────────────

function pct(val: number) { return `${(val * 100).toFixed(1)}%` }

function EuroInput({
  id, value, onChange, max = 200000, label, suffix,
}: {
  id: string; value: number; onChange: (v: number) => void
  max?: number; label: string; suffix: string
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
        <span className="text-sm text-muted-foreground">{suffix}</span>
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

function KinderInput({ value, onChange, label }: {
  value: number; onChange: (v: number) => void; label: string
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" disabled={value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}>
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center font-mono font-medium">{value}</span>
        <Button variant="outline" size="icon" className="h-8 w-8"
          onClick={() => onChange(Math.min(10, value + 1))}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

// ── Waterfall ──────────────────────────────────────────────

function WasserfallChart({ result }: { result: MischResult }) {
  const maxVal = result.wasserfall[0]?.laufend || 1
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingDown className="h-5 w-5 text-blue-600" />
          Wasserfall: Vom Brutto zum Netto
        </CardTitle>
        <CardDescription>Schritt für Schritt Abzüge auf einen Blick</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {result.wasserfall.map((step, i) => {
          const barWidth = Math.max(2, Math.abs(step.laufend / maxVal) * 100)
          const isLast = step.typ === 'ergebnis'
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-44 sm:w-52 text-sm shrink-0">
                <span className={isLast ? 'font-bold' : 'text-muted-foreground'}>{step.label}</span>
              </div>
              <div className="flex-1 relative h-7">
                <div
                  className={`h-full rounded-md transition-all ${
                    isLast ? 'bg-emerald-500' : step.typ === 'abzug' ? 'bg-red-400/70' : 'bg-blue-500'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className={`w-28 text-right font-mono text-sm shrink-0 ${
                isLast ? 'font-bold text-emerald-600' : step.betrag < 0 ? 'text-red-600' : ''
              }`}>
                {formatEuro(step.typ === 'ergebnis' ? step.laufend : step.betrag)}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// ── Vergleich ──────────────────────────────────────────────

function VergleichTable({ result }: { result: MischResult }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowRight className="h-5 w-5 text-blue-600" />
          Vergleichs-Modus
        </CardTitle>
        <CardDescription>Nur Anstellung vs. Anstellung + Nebengewerbe</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="text-right">Nur Gehalt</TableHead>
              <TableHead className="text-right">+ Nebengewerbe</TableHead>
              <TableHead className="text-right">Differenz</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.vergleich.map((row) => (
              <TableRow key={row.label} className={row.label === 'Netto' ? 'font-bold border-t-2' : ''}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell className="text-right font-mono">{formatEuro(row.nurGehalt)}</TableCell>
                <TableCell className="text-right font-mono">{formatEuro(row.mitGewerbe)}</TableCell>
                <TableCell className={`text-right font-mono ${
                  row.differenz > 0 ? 'text-emerald-600' : row.differenz < 0 ? 'text-red-600' : ''
                }`}>
                  {row.differenz > 0 ? '+' : ''}{formatEuro(row.differenz)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// ── Upgrade Prompt ─────────────────────────────────────────

function ProGate() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16 px-4">
      <div className="flex justify-center mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 border border-amber-200">
          <Lock className="h-8 w-8 text-amber-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-3">SVS Checker Pro Feature</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Der Misch-Einkommen Rechner ist Teil von SVS Checker Pro.
        Berechne Anstellung + Nebengewerbe kombiniert mit allen Absetzbeträgen.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/pricing">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-2">
            <Crown className="h-4 w-4" /> Jetzt upgraden
          </Button>
        </Link>
        <Link href="/rechner">
          <Button variant="outline" className="gap-2">
            Kostenloser Rechner
          </Button>
        </Link>
      </div>
    </div>
  )
}

// ── Dynamische Steuerersparnis-Anzeige ─────────────────────

function SavingsSummary({ result }: { result: MischResult }) {
  const kinderCount = result.absetzbetraege.familienbonus > 0 || result.absetzbetraege.kindermehrbetrag > 0
  const hasAbsetzbeträge = result.absetzbetraege.gesamt > 0 || result.absetzbetraege.kindermehrbetrag > 0

  if (!hasAbsetzbeträge) return null

  // Berechne wie viel die Absetzbeträge tatsaechlich an Steuer sparen
  const steuerOhneAbsetzbeträge = result.steuerGesamt.steuerBrutto
  const steuerMitAbsetzbeträge = result.steuerGesamt.steuerNetto
  const tatsächlicheErsparnis = steuerOhneAbsetzbeträge - steuerMitAbsetzbeträge

  if (tatsächlicheErsparnis <= 0 && result.absetzbetraege.kindermehrbetrag <= 0) return null

  const yc = YEAR_CONFIGS[result.year]
  const yearLabel = result.year === '2026' ? '2026' : result.year

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-emerald-700">
        <Sparkles className="h-4 w-4" />
        <span className="font-semibold text-sm">Deine Steuerersparnis {yearLabel}</span>
      </div>

      {tatsächlicheErsparnis > 0 && (
        <p className="text-emerald-800 text-sm">
          Durch deine Absetzbeträge sparst du{' '}
          <strong>{formatEuro(tatsächlicheErsparnis)}</strong> an Steuern.
        </p>
      )}

      {kinderCount && result.absetzbetraege.familienbonus > 0 && (
        <p className="text-emerald-700 text-xs">
          Davon Familienbonus Plus: {formatEuro(result.absetzbetraege.familienbonus)}/Jahr
          (EUR {yc.familienbonusUnder18.toLocaleString('de-AT')}/Kind &lt;18J, EUR {yc.familienbonusOver18.toLocaleString('de-AT')}/Kind &gt;18J)
        </p>
      )}

      {result.absetzbetraege.kindermehrbetrag > 0 && (
        <p className="text-emerald-700 text-xs">
          Kindermehrbetrag (Gutschrift): {formatEuro(result.absetzbetraege.kindermehrbetrag)}
        </p>
      )}

      {result.absetzbetraege.alleinverdiener > 0 && (
        <p className="text-emerald-700 text-xs">
          Alleinverdiener-/Alleinerzieherabsetzbetrag: {formatEuro(result.absetzbetraege.alleinverdiener)}
        </p>
      )}
    </div>
  )
}

// ── Hauptseite ─────────────────────────────────────────────

function MischContent() {
  const { subscription } = useAppShell()
  const [bruttoGehalt, setBruttoGehalt] = useState(35000)
  const [jahresgewinn, setJahresgewinn] = useState(15000)
  const [kinderUnter18, setKinderUnter18] = useState(0)
  const [kinderUeber18, setKinderUeber18] = useState(0)
  const [alleinverdiener, setAlleinverdiener] = useState(false)
  const [year, setYear] = useState<TaxYear>('2025')

  const yc = YEAR_CONFIGS[year]

  const result = useMemo(() => calculateMischEinkommen({
    bruttoGehalt, jahresgewinn, kinderUnter18, kinderUeber18, alleinverdiener, year,
  }), [bruttoGehalt, jahresgewinn, kinderUnter18, kinderUeber18, alleinverdiener, year])

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden font-bold text-sm hover:opacity-80 transition-opacity">SVS Checker</Link>
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Misch-Einkommen Rechner</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-300/30 text-xs">
              <Crown className="h-3 w-3 mr-1" /> Pro
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Pro Gate */}
        {!subscription.isPro && !subscription.loading ? (
          <ProGate />
        ) : subscription.loading ? (
          <p className="text-center text-muted-foreground py-16">Laden...</p>
        ) : (
          <>
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
                    <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 text-xs">
                      Prognose – vorbehaltlich gesetzlicher Änderungen
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* ── Eingaben ────────────────────────────── */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Anstellung */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                    Einkünfte aus Anstellung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EuroInput
                    id="brutto"
                    value={bruttoGehalt}
                    onChange={setBruttoGehalt}
                    max={150000}
                    label="Jahres-Bruttogehalt (inkl. 13./14.)"
                    suffix="/ Jahr"
                  />
                  <div className="bg-blue-50 rounded-lg p-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SV-Beitrag ({pct(CONFIG.employeeSvRate)})</span>
                      <span className="font-mono text-red-600">-{formatEuro(result.anstellung.sv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Werbungskostenpauschale</span>
                      <span className="font-mono text-red-600">-{formatEuro(CONFIG.werbungskostenpauschale)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Steuerpflichtig</span>
                      <span className="font-mono">{formatEuro(result.anstellung.steuerpflichtig)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gewerbe */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                      <Store className="h-4 w-4 text-emerald-600" />
                    </div>
                    Einkünfte aus Gewerbe
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EuroInput
                    id="gewinn"
                    value={jahresgewinn}
                    onChange={setJahresgewinn}
                    max={200000}
                    label="Jahres-Gewinn (Einnahmen - Ausgaben)"
                    suffix="/ Jahr"
                  />
                  <div className="bg-emerald-50 rounded-lg p-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SVS PV ({pct(CONFIG.svsPvRate)})</span>
                      <span className="font-mono text-red-600">-{formatEuro(result.gewerbe.svsPv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SVS KV ({pct(CONFIG.svsKvRate)})</span>
                      <span className="font-mono text-red-600">-{formatEuro(result.gewerbe.svsKv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SVS MV ({pct(CONFIG.svsMvRate)})</span>
                      <span className="font-mono text-red-600">-{formatEuro(result.gewerbe.svsMv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SVS UV (fix)</span>
                      <span className="font-mono text-red-600">-{formatEuro(result.gewerbe.svsUv)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gewinnfreibetrag ({pct(CONFIG.grundfreibetragRate)})</span>
                      <span className="font-mono text-emerald-600">-{formatEuro(result.gewerbe.grundfreibetrag)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Steuerpflichtig</span>
                      <span className="font-mono">{formatEuro(result.gewerbe.steuerpflichtig)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Absetzbeträge ─────────────────────── */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                    <Users className="h-4 w-4 text-violet-600" />
                  </div>
                  Absetzbeträge {year}
                </CardTitle>
                <CardDescription>Reduzieren deine Steuerlast direkt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <KinderInput
                      value={kinderUnter18}
                      onChange={setKinderUnter18}
                      label={`Kinder unter 18 (FBP EUR ${yc.familienbonusUnder18.toLocaleString('de-AT')})`}
                    />
                    <KinderInput
                      value={kinderUeber18}
                      onChange={setKinderUeber18}
                      label={`Kinder über 18 (FBP EUR ${yc.familienbonusOver18.toLocaleString('de-AT')})`}
                    />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="avab" className="text-sm">Alleinverdiener/-erzieher</Label>
                      <Switch id="avab" checked={alleinverdiener} onCheckedChange={setAlleinverdiener} />
                    </div>
                  </div>
                  <div className="bg-violet-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verkehrsabsetzbetrag</span>
                      <span className="font-mono text-emerald-600">{formatEuro(result.absetzbetraege.verkehrsabsetzbetrag)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Familienbonus Plus</span>
                      <span className="font-mono text-emerald-600">{formatEuro(result.absetzbetraege.familienbonus)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alleinverdiener-AB</span>
                      <span className="font-mono text-emerald-600">{formatEuro(result.absetzbetraege.alleinverdiener)}</span>
                    </div>
                    {result.absetzbetraege.kindermehrbetrag > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kindermehrbetrag</span>
                        <span className="font-mono text-emerald-600">{formatEuro(result.absetzbetraege.kindermehrbetrag)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Gesamt Absetzbeträge</span>
                      <span className="font-mono text-emerald-600">
                        {formatEuro(result.absetzbetraege.gesamt + result.absetzbetraege.kindermehrbetrag)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dynamische Steuerersparnis */}
                <SavingsSummary result={result} />
              </CardContent>
            </Card>

            {/* ── Nebengewerbe Butler (Highlight) ───── */}
            <Card className="glass-dark border-0 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="relative p-6 sm:p-8">
                <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
                  <ShieldCheck className="h-3 w-3 mr-1" /> Nebengewerbe Butler
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold mb-6">
                  Deine Steuerlast auf das Nebengewerbe
                </h3>

                {jahresgewinn > 0 ? (
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <p className="text-slate-300 text-xs mb-1">Effektive Abgabenquote</p>
                      <p className="text-3xl font-bold">{pct(result.nebengewerbeAbgabenquote)}</p>
                      <p className="text-slate-400 text-xs mt-1">auf jeden Euro Gewinn</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <p className="text-slate-300 text-xs mb-1">Netto pro EUR 1 Gewinn</p>
                      <p className="text-3xl font-bold text-emerald-400">
                        {(result.nebengewerbeNettoCent * 100).toFixed(0)} Cent
                      </p>
                      <p className="text-slate-400 text-xs mt-1">bleiben übrig</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <p className="text-slate-300 text-xs mb-1">Grenzsteuersatz</p>
                      <p className="text-3xl font-bold text-amber-400">{pct(result.steuerGesamt.grenzsteuersatz)}</p>
                      <p className="text-slate-400 text-xs mt-1">nächste Tarifstufe</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400">Gib einen Gewinn aus Gewerbe ein, um die Analyse zu sehen.</p>
                )}

                {jahresgewinn > 0 && (
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 text-sm">
                      <span className="text-slate-400">Zusätzliche SVS:</span>
                      <span className="float-right font-mono text-red-300">-{formatEuro(result.gewerbe.svsGesamt)}</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-sm">
                      <span className="text-slate-400">Zusätzliche Steuer:</span>
                      <span className="float-right font-mono text-red-300">-{formatEuro(result.steuerDifferenz)}</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-sm">
                      <span className="text-slate-400">Gesamte Abgaben Nebengewerbe:</span>
                      <span className="float-right font-mono text-red-300">-{formatEuro(result.gewerbe.svsGesamt + result.steuerDifferenz)}</span>
                    </div>
                    <div className="bg-emerald-500/20 rounded-lg p-3 text-sm">
                      <span className="text-emerald-200">Netto-Zuwachs durch Gewerbe:</span>
                      <span className="float-right font-mono font-bold text-emerald-300">+{formatEuro(result.nettoGewerbeAnteil)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── FOMO: Versicherungsgrenze ─────────── */}
            {jahresgewinn > 0 && result.gewerbe.ueberVersicherungsgrenze && result.gewerbe.differenzZurGrenze < 3000 && (
              <Alert className="border-amber-300 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Achtung Versicherungsgrenze!</strong>{' '}
                  Dein Gewinn überschreitet die SVS-Versicherungsgrenze von {formatEuro(CONFIG.versicherungsgrenze)} um nur{' '}
                  <strong>{formatEuro(result.gewerbe.differenzZurGrenze)}</strong>.
                  Dadurch werden <strong>{formatEuro(result.gewerbe.svsMehrkosten)}</strong> an zusätzlichen SVS-Beiträgen (PV + KV + MV) fällig.
                  {result.gewerbe.differenzZurGrenze < result.gewerbe.svsMehrkosten && (
                    <> Überlege, ob du deinen Gewinn um {formatEuro(result.gewerbe.differenzZurGrenze)} reduzieren kannst, um {formatEuro(result.gewerbe.svsMehrkosten)} zu sparen.</>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {jahresgewinn > 0 && !result.gewerbe.ueberVersicherungsgrenze && jahresgewinn > 0 && (
              <Alert className="border-green-300 bg-green-50">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Unter der Versicherungsgrenze!</strong>{' '}
                  Dein Gewinn von {formatEuro(jahresgewinn)} liegt unter {formatEuro(CONFIG.versicherungsgrenze)}.
                  Du zahlst nur die Unfallversicherung ({formatEuro(result.gewerbe.svsUv)}/Jahr). PV und KV entfallen.
                </AlertDescription>
              </Alert>
            )}

            {/* ── Vergleichstabelle ─────────────────── */}
            <VergleichTable result={result} />

            {/* ── Wasserfall ────────────────────────── */}
            <WasserfallChart result={result} />

            {/* ── Steuer-Detail ─────────────────────── */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Steuer-Detail {year}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium mb-2">Einkommensteuer-Berechnung</h4>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Steuerpfl. Anstellung</span>
                      <span className="font-mono">{formatEuro(result.anstellung.steuerpflichtig)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Steuerpfl. Gewerbe</span>
                      <span className="font-mono">{formatEuro(result.gewerbe.steuerpflichtig)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Gesamt steuerpflichtig</span>
                      <span className="font-mono">{formatEuro(result.gesamtSteuerpflichtig)}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <h4 className="font-medium mb-2">Tarifstufen-Analyse</h4>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Steuer brutto (Tarif)</span>
                      <span className="font-mono text-red-600">{formatEuro(result.steuerGesamt.steuerBrutto)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Absetzbeträge</span>
                      <span className="font-mono text-emerald-600">-{formatEuro(result.steuerGesamt.absetzbetraege)}</span>
                    </div>
                    {result.steuerGesamt.kindermehrbetrag > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kindermehrbetrag</span>
                        <span className="font-mono text-emerald-600">-{formatEuro(result.steuerGesamt.kindermehrbetrag)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Steuer netto (effektiv)</span>
                      <span className={`font-mono ${result.steuerGesamt.steuerNetto < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {result.steuerGesamt.steuerNetto < 0 ? '-' : ''}{formatEuro(Math.abs(result.steuerGesamt.steuerNetto))}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Durchschn. Steuersatz</span>
                      <span className="font-mono">{pct(result.steuerGesamt.durchschnittssteuersatz)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Grenzsteuersatz</span>
                      <span className="font-mono">{pct(result.steuerGesamt.grenzsteuersatz)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Tarif-Tabelle ─────────────────────── */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Einkommensteuer-Tarif {year}</CardTitle>
                <CardDescription>Progressive Tarifstufen (nicht &quot;Steuerklassen&quot;)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tarifstufe</TableHead>
                      <TableHead className="text-right">Grenzsteuersatz</TableHead>
                      <TableHead className="text-right">Dein Anteil</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CONFIG.taxBrackets.filter(b => b.to !== Infinity || result.gesamtSteuerpflichtig > b.from).map((bracket, i) => {
                      const isActive = result.gesamtSteuerpflichtig > bracket.from
                      const inBracket = Math.max(0, Math.min(result.gesamtSteuerpflichtig, bracket.to) - bracket.from)
                      return (
                        <TableRow key={i} className={isActive ? '' : 'text-muted-foreground/50'}>
                          <TableCell>
                            {formatEuro(bracket.from)} – {bracket.to === Infinity ? '...' : formatEuro(bracket.to)}
                            {isActive && result.gesamtSteuerpflichtig <= bracket.to && (
                              <Badge variant="outline" className="ml-2 text-xs">Aktuell</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-mono">{pct(bracket.rate)}</TableCell>
                          <TableCell className="text-right font-mono">
                            {isActive ? formatEuro(inBracket * bracket.rate) : '–'}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground/70">SVS Checker – Misch-Einkommen Rechner für Österreich</p>
          <p>Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung. Werte {year}{year === '2026' ? ' (Prognose)' : ''}.</p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <Link href="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
          </div>
        </footer>
      </div>
    </>
  )
}

export default function MischEinkommenPage() {
  return (
    <AppShell>
      <MischContent />
    </AppShell>
  )
}
