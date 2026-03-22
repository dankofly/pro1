'use client'

import { useState, useMemo, useCallback } from 'react'
import { PageFooter } from '@/components/svs/page-footer'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link'
import { formatEuro } from '@/lib/format'
import {
  calculateIFB,
  type Investition,
  type IFBInput,
  type IFBResult,
} from '@/lib/investitionsfreibetrag'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter,
} from '@/components/ui/table'

import {
  Calculator, Plus, Trash2, TrendingDown, Leaf, Factory,
  PiggyBank, FlaskConical, BarChart3, Info,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

// ── Helpers ─────────────────────────────────────────────────────────

function pct(val: number) {
  return `${(val * 100).toFixed(1)} %`
}

function makeId() {
  return crypto.randomUUID()
}

function emptyInvestition(): Investition {
  return { id: makeId(), bezeichnung: '', betrag: 0, kategorie: 'normal' }
}

function parseEuro(raw: string): number {
  return Math.max(0, Number(raw.replace(/[^0-9]/g, '')) || 0)
}

// ── EuroInput with Slider ───────────────────────────────────────────

function EuroSliderInput({
  id, value, onChange, max, label, step = 1000,
}: {
  id: string; value: number; onChange: (v: number) => void
  max: number; label: string; step?: number
}) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="relative max-w-[220px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">EUR</span>
        <Input
          id={id}
          value={value.toLocaleString('de-AT')}
          onChange={(e) => onChange(Math.min(parseEuro(e.target.value), max))}
          className="pl-12 text-right font-mono text-lg font-medium"
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        max={max}
        step={step}
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

// ── KPI Card ────────────────────────────────────────────────────────

function KpiCard({
  label, value, sub, icon, accent,
}: {
  label: string; value: string; sub?: string
  icon: React.ReactNode; accent: string
}) {
  return (
    <Card className="glass">
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className={`text-2xl font-bold font-mono ${accent}`}>{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ── Comparison Bar Chart ────────────────────────────────────────────

function ComparisonChart({ result }: { result: IFBResult }) {
  const data = [
    {
      name: 'Einkommensteuer',
      'Ohne Freibeträge': Math.round(result.steuerOhne),
      'Mit IFB + GFB': Math.round(result.steuerMit),
    },
  ]

  if (result.steuerOhne <= 0) return null

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-emerald-400" />
          Steuervergleich: Vorher vs. Nachher
        </CardTitle>
        <CardDescription>
          Einkommensteuer ohne und mit Investitionsfreibetrag + Gewinnfreibetrag
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => formatEuro(Number(value ?? 0))}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              />
              <Legend />
              <Bar
                dataKey="Ohne Freibeträge"
                fill="hsl(var(--chart-2))"
                radius={[6, 6, 0, 0]}
                maxBarSize={100}
              />
              <Bar
                dataKey="Mit IFB + GFB"
                fill="hsl(var(--chart-1))"
                radius={[6, 6, 0, 0]}
                maxBarSize={100}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {result.gesamteSteuerersparnis > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 font-semibold">
            <TrendingDown className="h-4 w-4" />
            <span>Ersparnis: {formatEuro(result.gesamteSteuerersparnis)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── GFB Detail Table ────────────────────────────────────────────────

function GFBDetailTable({ result }: { result: IFBResult }) {
  const activeDetails = result.gewinnfreibetragDetails.filter(
    (d) => d.betrag > 0
  )

  if (activeDetails.length === 0) return null

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PiggyBank className="h-5 w-5 text-blue-600" />
          Gewinnfreibetrag - Stufenberechnung
        </CardTitle>
        <CardDescription>
          Automatischer Grundfreibetrag (15 %) + investitionsabhängige Staffelung
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stufe</TableHead>
              <TableHead className="text-right">Gewinn in Stufe</TableHead>
              <TableHead className="text-right">Satz</TableHead>
              <TableHead className="text-right">Freibetrag</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.gewinnfreibetragDetails.map((stufe, i) => {
              const isActive = stufe.betrag > 0
              return (
                <TableRow
                  key={i}
                  className={isActive ? '' : 'text-muted-foreground/50'}
                >
                  <TableCell>
                    <span className="font-medium">{stufe.stufe}</span>
                    {i === 0 && (
                      <Badge variant="outline" className="ml-2 text-xs text-emerald-400 border-emerald-500/30">
                        automatisch
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {isActive ? formatEuro(stufe.betrag) : '–'}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {(stufe.rate * 100).toFixed(0)} %
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {isActive ? formatEuro(stufe.freibetrag) : '–'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-semibold">
                Gewinnfreibetrag gesamt
              </TableCell>
              <TableCell className="text-right font-mono font-bold text-emerald-400">
                {formatEuro(result.gewinnfreibetrag)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}

// ── Investition Table ───────────────────────────────────────────────

function InvestitionTable({
  investitionen,
  onUpdate,
  onRemove,
  onAdd,
}: {
  investitionen: Investition[]
  onUpdate: (id: string, field: keyof Investition, value: string | number) => void
  onRemove: (id: string) => void
  onAdd: () => void
}) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Factory className="h-5 w-5 text-slate-600" />
          Investitionen
        </CardTitle>
        <CardDescription>
          Abnutzbares Anlagevermögen (keine Gebäude, PKW mit Verbrennungsmotor, gebrauchte WG, Finanzanlagen)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Desktop Table */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Bezeichnung</TableHead>
                <TableHead className="text-right w-[25%]">Betrag (EUR)</TableHead>
                <TableHead className="w-[25%]">Kategorie</TableHead>
                <TableHead className="w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investitionen.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Input
                      placeholder="z. B. MacBook, Maschine, E-Auto..."
                      value={inv.bezeichnung}
                      onChange={(e) =>
                        onUpdate(inv.id, 'bezeichnung', e.target.value)
                      }
                      className="h-9"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="0"
                      value={inv.betrag > 0 ? inv.betrag.toLocaleString('de-AT') : ''}
                      onChange={(e) =>
                        onUpdate(inv.id, 'betrag', parseEuro(e.target.value))
                      }
                      className="h-9 text-right font-mono"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={inv.kategorie}
                      onValueChange={(v) =>
                        onUpdate(inv.id, 'kategorie', v)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (20 %)</SelectItem>
                        <SelectItem value="oekologisch">Ökologisch (22 %)</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 cursor-pointer text-muted-foreground hover:text-red-400"
                      onClick={() => onRemove(inv.id)}
                      disabled={investitionen.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {investitionen.map((inv, idx) => (
            <div
              key={inv.id}
              className="rounded-lg border border-border/50 p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  Investition {idx + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 cursor-pointer text-muted-foreground hover:text-red-400"
                  onClick={() => onRemove(inv.id)}
                  disabled={investitionen.length <= 1}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Input
                placeholder="Bezeichnung"
                value={inv.bezeichnung}
                onChange={(e) =>
                  onUpdate(inv.id, 'bezeichnung', e.target.value)
                }
                className="h-9"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Betrag EUR"
                  value={inv.betrag > 0 ? inv.betrag.toLocaleString('de-AT') : ''}
                  onChange={(e) =>
                    onUpdate(inv.id, 'betrag', parseEuro(e.target.value))
                  }
                  className="h-9 text-right font-mono"
                />
                <Select
                  value={inv.kategorie}
                  onValueChange={(v) =>
                    onUpdate(inv.id, 'kategorie', v)
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (20 %)</SelectItem>
                    <SelectItem value="oekologisch">Öko (22 %)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={onAdd} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Investition hinzufügen
        </Button>
      </CardContent>
    </Card>
  )
}

// ── IFB Content ─────────────────────────────────────────────────────

function IFBContent() {
  useAppShell()

  const [investitionen, setInvestitionen] = useState<Investition[]>([
    emptyInvestition(),
  ])
  const [jahresgewinn, setJahresgewinn] = useState(80_000)
  const [forschungsausgaben, setForschungsausgaben] = useState(0)

  const handleUpdateInvestition = useCallback(
    (id: string, field: keyof Investition, value: string | number) => {
      setInvestitionen((prev) =>
        prev.map((inv) =>
          inv.id === id ? { ...inv, [field]: value } : inv
        )
      )
    },
    []
  )

  const handleRemoveInvestition = useCallback((id: string) => {
    setInvestitionen((prev) => prev.filter((inv) => inv.id !== id))
  }, [])

  const handleAddInvestition = useCallback(() => {
    setInvestitionen((prev) => [...prev, emptyInvestition()])
  }, [])

  const input: IFBInput = useMemo(
    () => ({
      investitionen,
      jahresgewinn,
      forschungsausgaben,
    }),
    [investitionen, jahresgewinn, forschungsausgaben]
  )

  const result = useMemo(() => calculateIFB(input), [input])

  const investSumme = investitionen.reduce((s, i) => s + i.betrag, 0)

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Investitionsfreibetrag-Rechner</h1>
            </div>
          </div>
          <Badge variant="outline" className="text-xs text-muted-foreground border-border/50">
            2026
          </Badge>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── Page Header ────────────────────────────── */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Investitionsfreibetrag-Rechner 2026
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
            Berechne deinen IFB (20 %/22 %), Gewinnfreibetrag und die
            Forschungsprämie auf einen Blick. Alle Werte basieren auf den
            Richtsätzen für 2026.
          </p>
        </div>

        {/* ── Investitionen Tabelle ──────────────────── */}
        <InvestitionTable
          investitionen={investitionen}
          onUpdate={handleUpdateInvestition}
          onRemove={handleRemoveInvestition}
          onAdd={handleAddInvestition}
        />

        {/* Investitions-Zusammenfassung */}
        {investSumme > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {result.investitionenNormal > 0 && (
              <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Factory className="h-3 w-3" />
                  Normal
                </div>
                <p className="font-mono font-semibold text-sm">
                  {formatEuro(result.investitionenNormal)}
                </p>
                <p className="text-xs text-muted-foreground">IFB 20 %: {formatEuro(result.ifbNormal)}</p>
              </div>
            )}
            {result.investitionenOeko > 0 && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-1">
                  <Leaf className="h-3 w-3" />
                  Ökologisch
                </div>
                <p className="font-mono font-semibold text-sm text-emerald-400">
                  {formatEuro(result.investitionenOeko)}
                </p>
                <p className="text-xs text-emerald-400">IFB 22 %: {formatEuro(result.ifbOeko)}</p>
              </div>
            )}
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-1">IFB-Basis (max. 1 Mio.)</p>
              <p className="font-mono font-semibold text-sm">
                {formatEuro(result.investitionsBasis)}
              </p>
              {investSumme > 1_000_000 && (
                <p className="text-xs text-amber-600 mt-0.5">Gedeckelt</p>
              )}
            </div>
          </div>
        )}

        {/* ── Weitere Eingaben ───────────────────────── */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Gewinn & Forschungsausgaben</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <EuroSliderInput
              id="jahresgewinn"
              value={jahresgewinn}
              onChange={setJahresgewinn}
              max={1_000_000}
              step={1_000}
              label="Jahresgewinn (Einkünfte aus Gewerbebetrieb/selbständiger Arbeit)"
            />
            <EuroSliderInput
              id="forschung"
              value={forschungsausgaben}
              onChange={setForschungsausgaben}
              max={500_000}
              step={500}
              label="Forschungsausgaben (§ 108c EStG, optional)"
            />
          </CardContent>
        </Card>

        {/* ── KPI Karten ─────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard
            label="Investitionsfreibetrag"
            value={formatEuro(result.ifbGesamt)}
            sub={investSumme > 0 ? `${result.investitionenOeko > 0 ? '20 %/22 %' : '20 %'} von ${formatEuro(result.investitionsBasis)}` : 'Noch keine Investitionen'}
            icon={<Factory className="h-4 w-4 text-blue-600" />}
            accent="text-blue-600"
          />
          <KpiCard
            label="Gewinnfreibetrag"
            value={formatEuro(result.gewinnfreibetrag)}
            sub={jahresgewinn > 0 ? `bei ${formatEuro(jahresgewinn)} Gewinn` : ''}
            icon={<PiggyBank className="h-4 w-4 text-violet-600" />}
            accent="text-violet-600"
          />
          <KpiCard
            label="Forschungsprämie"
            value={formatEuro(result.forschungspraemie)}
            sub={forschungsausgaben > 0 ? `14 % von ${formatEuro(forschungsausgaben)}` : 'Keine Ausgaben eingetragen'}
            icon={<FlaskConical className="h-4 w-4 text-amber-600" />}
            accent="text-amber-600"
          />
          <KpiCard
            label="Gesamte Steuerersparnis"
            value={formatEuro(result.gesamteSteuerersparnis)}
            sub={
              result.effektiverSteuersatzOhne > 0
                ? `Steuersatz: ${pct(result.effektiverSteuersatzOhne)} → ${pct(result.effektiverSteuersatzMit)}`
                : ''
            }
            icon={<TrendingDown className="h-4 w-4 text-emerald-400" />}
            accent="text-emerald-400"
          />
        </div>

        {/* ── Comparison Chart ───────────────────────── */}
        <ComparisonChart result={result} />

        {/* ── GFB Detail Table ───────────────────────── */}
        <GFBDetailTable result={result} />

        {/* ── IFB Zusammenfassung ────────────────────── */}
        {(result.ifbGesamt > 0 || result.gewinnfreibetrag > 0) && (
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Berechnungsdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Jahresgewinn</span>
                  <span className="font-mono font-medium">{formatEuro(jahresgewinn)}</span>
                </div>
                {result.ifbGesamt > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      − Investitionsfreibetrag ({result.investitionenOeko > 0 ? '20 %/22 %' : '20 %'})
                    </span>
                    <span className="font-mono text-emerald-400">−{formatEuro(result.ifbGesamt)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">− Gewinnfreibetrag (gestaffelt)</span>
                  <span className="font-mono text-emerald-400">−{formatEuro(result.gewinnfreibetrag)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Steuerpflichtiger Gewinn</span>
                  <span className="font-mono">
                    {formatEuro(Math.max(0, jahresgewinn - result.ifbGesamt - result.gewinnfreibetrag))}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-muted-foreground">ESt ohne Freibeträge</span>
                  <span className="font-mono text-red-600">{formatEuro(result.steuerOhne)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ESt mit Freibeträgen</span>
                  <span className="font-mono text-emerald-400">{formatEuro(result.steuerMit)}</span>
                </div>
                {result.forschungspraemie > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">+ Forschungsprämie (14 % Gutschrift)</span>
                    <span className="font-mono text-emerald-400">{formatEuro(result.forschungspraemie)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2 text-emerald-400">
                  <span>Gesamte Steuerersparnis</span>
                  <span className="font-mono">{formatEuro(result.gesamteSteuerersparnis)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Info Box ───────────────────────────────── */}
        <div className="flex gap-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/30 border-l-[3px] border-l-blue-500 rounded-lg p-4 shadow-sm">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm text-foreground space-y-1">
            <p className="font-medium">Hinweise zum Investitionsfreibetrag</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
              <li>IFB nur für abnutzbares Anlagevermögen (Nutzungsdauer mind. 4 Jahre)</li>
              <li>Nicht begünstigt: Gebäude, PKW (außer 0-Emission), gebrauchte Wirtschaftsgüter, Finanzanlagen</li>
              <li>Ökologischer IFB (22 %): Klimaschutz, Energieeffizienz, erneuerbare Energien</li>
              <li>Maximale Bemessungsgrundlage: EUR 1.000.000 pro Wirtschaftsjahr</li>
              <li>Der Grundfreibetrag (GFB bis EUR 33.000) steht automatisch zu, ohne Investitionsnachweis</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <PageFooter extra="Kein Ersatz für professionelle Steuerberatung. Werte 2026." />
        <SiteFooter />
      </div>
    </>
  )
}

// ── Page Export ──────────────────────────────────────────────────────

export default function InvestitionsfreibetragPage() {
  return (
    <AppShell>
      <IFBContent />
    </AppShell>
  )
}
