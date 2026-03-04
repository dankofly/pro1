'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatEuro } from '@/lib/format'
import { calculateSachbezug, type DienstwagenInput, type BenefitsInput } from '@/lib/sachbezug'
import { AppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Car, Gift, Calculator, TrendingUp, Banknote, Users,
  CheckCircle2, Leaf, Minus, Plus,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'

// ── Helpers ──

function EuroInput({
  id, value, onChange, max = 200000, label, suffix,
}: {
  id: string; value: number; onChange: (v: number) => void
  max?: number; label: string; suffix?: string
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, max))
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">EUR</span>
          <Input
            id={id}
            value={value.toLocaleString('de-AT')}
            onChange={handleInput}
            className="pl-12 text-right font-mono text-base font-medium"
          />
        </div>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  )
}

function CO2Input({
  value, onChange,
}: {
  value: number; onChange: (v: number) => void
}) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    onChange(Math.min(Number(raw) || 0, 400))
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor="co2" className="text-sm font-medium">CO2-Ausstoß (WLTP)</Label>
      <div className="flex items-center gap-2">
        <Input
          id="co2"
          value={value}
          onChange={handleInput}
          className="max-w-[120px] text-right font-mono text-base font-medium"
        />
        <span className="text-sm text-muted-foreground">g/km</span>
      </div>
    </div>
  )
}

function KinderCounter({ value, onChange }: {
  value: number; onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <Button
        variant="outline"
        size="icon"
        className="h-11 w-11 cursor-pointer"
        disabled={value <= 0}
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-6 text-center font-mono font-medium text-sm">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-11 w-11 cursor-pointer"
        onClick={() => onChange(Math.min(10, value + 1))}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}

function CO2Badge({ co2 }: { co2: number }) {
  if (co2 === 0) {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
        <Leaf className="h-3 w-3 mr-1" />
        0% -- E-Auto steuerfrei
      </Badge>
    )
  }
  if (co2 <= 141) {
    return (
      <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30">
        1,5% -- max. EUR 720/Monat
      </Badge>
    )
  }
  return (
    <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30">
      2% -- max. EUR 960/Monat
    </Badge>
  )
}

// ── Benefit definitions ──

interface BenefitDef {
  key: keyof Omit<BenefitsInput, 'kinderAnzahl'>
  label: string
  info: string
  hasKinder?: boolean
}

const BENEFIT_DEFS: BenefitDef[] = [
  {
    key: 'essensgutscheine',
    label: 'Essensgutscheine',
    info: 'EUR 8/Arbeitstag (ca. EUR 1.760/Jahr) -- steuerfrei',
  },
  {
    key: 'zukunftssicherung',
    label: 'Zukunftssicherung (bAV)',
    info: 'EUR 300/Jahr -- steuerfrei',
  },
  {
    key: 'mitarbeiterrabatt',
    label: 'Mitarbeiterrabatt',
    info: 'EUR 1.000 Freibetrag/Jahr -- steuerfrei',
  },
  {
    key: 'oeffiTicket',
    label: 'Öffi-Ticket / Klimaticket',
    info: 'Steuerfrei -- ca. EUR 1.095/Jahr',
  },
  {
    key: 'dienstEBike',
    label: 'Dienst-E-Bike',
    info: 'Steuerfrei -- ca. EUR 1.200/Jahr',
  },
  {
    key: 'startupPraemie',
    label: 'Mitarbeiterprämie',
    info: 'EUR 4.500 -- steuerfrei',
  },
  {
    key: 'homeoffice',
    label: 'Homeoffice-Pauschale',
    info: 'EUR 3/Tag, max. 100 Tage = EUR 300/Jahr -- steuerfrei',
  },
  {
    key: 'kinderbetreuung',
    label: 'Kinderbetreuungszuschuss',
    info: 'EUR 2.000/Kind/Jahr -- steuerfrei',
    hasKinder: true,
  },
]

// ── Chart component ──

function ComparisonChart({ benefitsWert, aequivalentBrutto }: {
  benefitsWert: number; aequivalentBrutto: number
}) {
  const data = [
    { name: 'Benefits-Paket', wert: benefitsWert, fill: 'hsl(var(--chart-1))' },
    { name: 'Äquivalent Brutto', wert: aequivalentBrutto, fill: 'hsl(var(--muted-foreground))' },
  ]

  if (benefitsWert === 0 && aequivalentBrutto === 0) return null

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          Benefits vs. Bruttogehaltserhöhung
        </CardTitle>
        <CardDescription>
          Steuerfreie Benefits im Vergleich zur nötigen Bruttogehaltserhöhung
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={130}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                formatter={(value) => formatEuro(Number(value))}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="wert" radius={[0, 6, 6, 0]} barSize={36}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="wert"
                  position="right"
                  formatter={(v) => formatEuro(Number(v))}
                  style={{ fill: 'hsl(var(--foreground))', fontSize: '13px', fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Steuerfreie Benefits ersetzen eine ca. 2x so hohe Bruttogehaltserhöhung
          (Faktor je nach Grenzsteuersatz und SV-Satz)
        </p>
      </CardContent>
    </Card>
  )
}

// ── Main Content ──

function SachbezugContent() {
  // ── Dienstwagen state ──
  const [hasFirmenwagen, setHasFirmenwagen] = useState(false)
  const [co2, setCo2] = useState(0)
  const [listenpreis, setListenpreis] = useState(40000)
  const [privatnutzung, setPrivatnutzung] = useState(true)

  // ── Benefits state ──
  const [benefits, setBenefits] = useState<BenefitsInput>({
    essensgutscheine: true,
    zukunftssicherung: false,
    mitarbeiterrabatt: false,
    oeffiTicket: false,
    dienstEBike: false,
    startupPraemie: false,
    homeoffice: false,
    kinderbetreuung: false,
    kinderAnzahl: 1,
  })

  const toggleBenefit = (key: keyof Omit<BenefitsInput, 'kinderAnzahl'>) => {
    setBenefits(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const dienstwagenInput: DienstwagenInput | null = hasFirmenwagen
    ? { co2, listenpreis, privatnutzung }
    : null

  const result = useMemo(
    () => calculateSachbezug(dienstwagenInput, benefits),
    [hasFirmenwagen, co2, listenpreis, privatnutzung, benefits]
  )

  const activeBenefitsCount = BENEFIT_DEFS.filter(b => benefits[b.key]).length

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Sachbezug-Rechner</h1>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-xs">
            Kostenlos
          </Badge>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Sachbezug-Rechner 2026
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Mitarbeiter-Benefits optimal gestalten: Firmenwagen, Essensgutscheine,
            Öffi-Ticket und mehr. Berechne den Sachbezugswert und die Lohnnebenkosten-Ersparnis.
          </p>
        </div>

        {/* ── Firmenwagen Section ── */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Car className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                Firmenwagen
              </CardTitle>
              <Switch
                id="firmenwagen"
                checked={hasFirmenwagen}
                onCheckedChange={setHasFirmenwagen}
              />
            </div>
            <CardDescription>
              PKW-Sachbezug nach WLTP CO2-Wert (Verordnung 2026)
            </CardDescription>
          </CardHeader>

          {hasFirmenwagen && (
            <CardContent className="space-y-5">
              {/* CO2 */}
              <div className="space-y-3">
                <CO2Input value={co2} onChange={setCo2} />
                <CO2Badge co2={co2} />
              </div>

              {/* Listenpreis */}
              <EuroInput
                id="listenpreis"
                value={listenpreis}
                onChange={setListenpreis}
                max={300000}
                label="Listenpreis inkl. USt (Neupreis)"
                suffix="inkl. USt"
              />

              {/* Privatnutzung */}
              <div className="flex items-center justify-between">
                <Label htmlFor="privatnutzung" className="text-sm font-medium">
                  Privatnutzung erlaubt
                </Label>
                <Switch
                  id="privatnutzung"
                  checked={privatnutzung}
                  onCheckedChange={setPrivatnutzung}
                />
              </div>

              {!privatnutzung && (
                <div className="flex gap-3 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/30 border-l-[3px] border-l-blue-500 rounded-lg p-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  <p className="text-sm text-foreground">
                    Ohne Privatnutzung entfällt der Sachbezug. Es muss ein Fahrtenbuch geführt werden.
                  </p>
                </div>
              )}

              {/* Firmenwagen Result Summary */}
              {result.dienstwagen && result.dienstwagen.sachbezugMonat > 0 && (
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sachbezug/Monat</span>
                    <span className="font-mono font-medium">{formatEuro(result.dienstwagen.sachbezugMonat)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sachbezug/Jahr</span>
                    <span className="font-mono font-medium">{formatEuro(result.dienstwagen.sachbezugJahr)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Deckelung</span>
                    <span>{formatEuro(result.dienstwagen.deckelung)}/Monat</span>
                  </div>
                </div>
              )}

              {result.dienstwagen && co2 === 0 && privatnutzung && (
                <div className="flex gap-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 border-l-[3px] border-l-emerald-500 rounded-lg p-3">
                  <Leaf className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    <span className="font-medium">E-Auto:</span>{' '}
                    Kein Sachbezug -- die Privatnutzung ist komplett steuerfrei!
                  </p>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* ── Benefits Checklist ── */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                <Gift className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              Steuerfreie Benefits
              {activeBenefitsCount > 0 && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {activeBenefitsCount} aktiv
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Wähle die Benefits, die du deinen Mitarbeitern anbieten möchtest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {BENEFIT_DEFS.map((def) => (
                <div key={def.key}>
                  <label
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      id={def.key}
                      checked={benefits[def.key] as boolean}
                      onCheckedChange={() => toggleBenefit(def.key)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">{def.label}</span>
                        <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                          steuerfrei
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{def.info}</p>
                    </div>

                    {/* Kinder counter for Kinderbetreuung */}
                    {def.hasKinder && benefits.kinderbetreuung && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <KinderCounter
                          value={benefits.kinderAnzahl}
                          onChange={(v) => setBenefits(prev => ({ ...prev, kinderAnzahl: v }))}
                        />
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Results KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Gesamt-Sachbezugswert */}
          <Card className="glass">
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">Sachbezugswert</p>
              <p className="text-xl sm:text-2xl font-bold font-mono">
                {formatEuro(result.gesamtSachbezug)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                auf der Lohnabrechnung/Jahr
              </p>
            </CardContent>
          </Card>

          {/* Nettovorteil Arbeitnehmer */}
          <Card className="glass border-emerald-500/30">
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">Nettovorteil AN</p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-500">
                {formatEuro(result.gesamtWertArbeitnehmer)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                steuerfreier Wert/Jahr
              </p>
            </CardContent>
          </Card>

          {/* Lohnnebenkosten-Ersparnis */}
          <Card className="glass">
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">LNK-Ersparnis AG</p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-blue-500">
                {formatEuro(result.lohnnebenkostenErsparnis)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                ca. 30,28% Lohnnebenkosten
              </p>
            </CardContent>
          </Card>

          {/* Äquivalente Bruttogehaltserhöhung */}
          <Card className="glass">
            <CardContent className="p-4 sm:p-5">
              <p className="text-xs text-muted-foreground mb-1">Äquivalent Brutto</p>
              <p className="text-xl sm:text-2xl font-bold font-mono">
                {formatEuro(result.aequivalentBrutto)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                nötige Gehaltserhöhung
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── Explanation banner ── */}
        {result.gesamtWertArbeitnehmer > 0 && (
          <div className="flex gap-3 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 border-l-[3px] border-l-emerald-500 rounded-lg p-4 shadow-sm">
            <Banknote className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {formatEuro(result.gesamtWertArbeitnehmer)} steuerfreier Vorteil
                statt {formatEuro(result.aequivalentBrutto)} Bruttogehalt
              </p>
              <p className="text-xs text-muted-foreground">
                Der Arbeitgeber spart dabei ca. {formatEuro(result.lohnnebenkostenErsparnis)} an Lohnnebenkosten.
                Benefits sind eine Win-Win-Lösung für beide Seiten.
              </p>
            </div>
          </div>
        )}

        {/* ── Comparison Bar Chart ── */}
        <ComparisonChart
          benefitsWert={result.gesamtWertArbeitnehmer}
          aequivalentBrutto={result.aequivalentBrutto}
        />

        {/* ── Detail Table ── */}
        {(result.benefits.length > 0 || (result.dienstwagen && result.dienstwagen.sachbezugJahr > 0)) && (
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-slate-500" />
                Detailübersicht aller Benefits
              </CardTitle>
              <CardDescription>
                Wert, Kosten und Sachbezugswert pro Benefit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6">
                <div className="min-w-[580px] px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Benefit</TableHead>
                        <TableHead className="text-right">Wert AN/Jahr</TableHead>
                        <TableHead className="text-right">Kosten AG/Jahr</TableHead>
                        <TableHead className="text-right">Sachbezugswert</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Dienstwagen row */}
                      {result.dienstwagen && hasFirmenwagen && (
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-blue-500" />
                              Firmenwagen ({result.dienstwagen.sachbezugProzent}%)
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatEuro(result.dienstwagen.sachbezugJahr)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-muted-foreground">
                            --
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatEuro(result.dienstwagen.sachbezugJahr)}
                          </TableCell>
                          <TableCell className="text-center">
                            {result.dienstwagen.sachbezugJahr === 0 ? (
                              <Badge className="bg-emerald-500/15 text-emerald-500 border-emerald-500/30 text-[10px]">
                                <CheckCircle2 className="h-3 w-3 mr-0.5" />
                                steuerfrei
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px]">
                                steuerpflichtig
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )}

                      {/* Benefits rows */}
                      {result.benefits.map((b) => (
                        <TableRow key={b.name}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-emerald-500" />
                              {b.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatEuro(b.wertArbeitnehmer)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatEuro(b.kostenArbeitgeber)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatEuro(b.sachbezugswert)}
                          </TableCell>
                          <TableCell className="text-center">
                            {b.steuerfrei ? (
                              <Badge className="bg-emerald-500/15 text-emerald-500 border-emerald-500/30 text-[10px]">
                                <CheckCircle2 className="h-3 w-3 mr-0.5" />
                                steuerfrei
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px]">
                                steuerpflichtig
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* Totals row */}
                      <TableRow className="font-bold border-t-2">
                        <TableCell>Gesamt</TableCell>
                        <TableCell className="text-right font-mono text-emerald-600 dark:text-emerald-400">
                          {formatEuro(
                            result.gesamtWertArbeitnehmer
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatEuro(
                            result.benefits.reduce((s, b) => s + b.kostenArbeitgeber, 0)
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatEuro(result.gesamtSachbezug)}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── CTA for employers ── */}
        <Card className="glass-dark border-0 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="relative p-6 sm:p-8">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
              <Calculator className="h-3 w-3 mr-1" /> Für Arbeitgeber
            </Badge>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Benefits-Paket optimieren?
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-lg">
              Mit SteuerBoard Pro berechnest du die gesamte Abgabenlast deiner
              Mitarbeiter -- inklusive SVS, Einkommensteuer und Optimierungspotenzial.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                <Link href="/rechner">
                  <Calculator className="h-4 w-4" />
                  Zum SVS-Rechner
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                <Link href="/pricing">
                  Alle Pro-Vorteile ansehen
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground/70">
            SteuerBoard.pro -- Sachbezug-Rechner für Österreich 2026
          </p>
          <p>
            Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung.
            Sachbezugswerte nach Sachbezugswerteverordnung 2026.
          </p>
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

export default function SachbezugRechnerPage() {
  return (
    <AppShell>
      <SachbezugContent />
    </AppShell>
  )
}
