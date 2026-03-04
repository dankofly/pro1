'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { formatEuro } from '@/lib/format'
import { supabase } from '@/lib/supabase'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts'
import type { PieLabelRenderProps } from 'recharts'

import {
  Upload, FileSpreadsheet, FileText, FileUp,
  BarChart3, TrendingUp, Calculator, Crown, Lock,
  Loader2, CheckCircle2, AlertTriangle, Sparkles,
  ArrowRight, MessageSquare, ChevronLeft, Info,
  Building2, Calendar, Scale, Landmark,
} from 'lucide-react'

// ── Types ───────────────────────────────────────────────────────

interface ParsedBilanz {
  sessionId: string
  parsed: {
    unternehmen: string
    geschaeftsjahr: string
    rechtsform: string
    bilanz: { aktiva: Record<string, number>; passiva: Record<string, number> }
    guv: {
      umsatzerloese: number
      materialaufwand: number
      personalaufwand: number
      abschreibungen: number
      sonstigerAufwand: number
      finanzergebnis: number
    }
  }
  confidence: number
}

interface Kennzahl {
  label: string
  wert: number
  einheit: string
  status: 'gut' | 'mittel' | 'kritisch'
}

interface BilanzAnalysis {
  kennzahlen: Kennzahl[]
  steuerAnalyse: {
    koest: number
    effektiverSatz: number
    gesamtAbgaben: number
  }
  optimierungen: { titel: string; beschreibung: string; ersparnisEur: number }[]
}

interface BilanzForecast {
  forecast: {
    konservativ: { umsatz: number; gewinn: number; steuer: number; cashflow: number }
    realistisch: { umsatz: number; gewinn: number; steuer: number; cashflow: number }
    optimistisch: { umsatz: number; gewinn: number; steuer: number; cashflow: number }
  }
  optimierungen: { titel: string; beschreibung: string; ersparnisEur: number; prioritaet: number }[]
  empfehlungen: string
}

// ── Helpers ──────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  gut: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  mittel: 'bg-amber-100 text-amber-700 border-amber-200',
  kritisch: 'bg-red-100 text-red-700 border-red-200',
}

const STATUS_LABELS: Record<string, string> = {
  gut: 'Gut',
  mittel: 'Mittel',
  kritisch: 'Kritisch',
}

const PIE_COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ef4444']
const BAR_COLORS = { konservativ: '#94a3b8', realistisch: '#10b981', optimistisch: '#3b82f6' }

const ACCEPTED_TYPES = [
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/pdf',
]
const ACCEPTED_EXTENSIONS = '.csv,.xlsx,.xls,.pdf'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

function formatPercent(val: number): string {
  return `${val.toFixed(1)} %`
}

function formatFactor(val: number): string {
  return `${val.toFixed(2)}x`
}

// ── Upload Zone ─────────────────────────────────────────────────

function UploadZone({
  onFileSelect,
  uploading,
  uploadProgress,
  file,
}: {
  onFileSelect: (f: File) => void
  uploading: boolean
  uploadProgress: number
  file: File | null
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) onFileSelect(droppedFile)
  }, [onFileSelect])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) onFileSelect(selected)
  }, [onFileSelect])

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
            <Upload className="h-4 w-4 text-emerald-600" />
          </div>
          Bilanz hochladen
        </CardTitle>
        <CardDescription>
          Lade deine Bilanz hoch, um eine detaillierte Analyse und Kennzahlenauswertung zu erhalten.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-xl border-2 border-dashed p-8 sm:p-12
            transition-all duration-200 text-center
            ${dragOver
              ? 'border-emerald-500 bg-emerald-50/50'
              : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50/50'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-200">
              <FileUp className="h-7 w-7 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Datei hierher ziehen oder{' '}
                <span className="text-emerald-600 underline underline-offset-2">durchsuchen</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                CSV, XLSX oder PDF — max. 10 MB
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span className="text-xs">.xlsx</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FileText className="h-3.5 w-3.5" />
                <span className="text-xs">.csv</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FileText className="h-3.5 w-3.5" />
                <span className="text-xs">.pdf</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Badge variant="outline" className="text-xs">UGB</Badge>
              <Badge variant="outline" className="text-xs">BMD</Badge>
              <Badge variant="outline" className="text-xs">RZL</Badge>
              <Badge variant="outline" className="text-xs">CSV</Badge>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Wird hochgeladen...
              </span>
              <span className="font-mono text-sm">{Math.round(uploadProgress)} %</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Selected file info */}
        {file && !uploading && (
          <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground flex items-start gap-1.5">
          <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          Deine Bilanzdaten werden nicht gespeichert und nur für die aktuelle Session verarbeitet.
        </p>
      </CardContent>
    </Card>
  )
}

// ── Parsing Preview ─────────────────────────────────────────────

function ParsingPreview({
  parsed,
  onAnalyze,
  analyzing,
}: {
  parsed: ParsedBilanz
  onAnalyze: () => void
  analyzing: boolean
}) {
  const { parsed: data, confidence } = parsed
  const bilanzsumme = Object.values(data.bilanz.aktiva).reduce((s, v) => s + v, 0)

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
          </div>
          Bilanz erkannt
        </CardTitle>
        <CardDescription>
          Erkennungssicherheit: {(confidence * 100).toFixed(0)} % — Bitte prüfe die erkannten Daten.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Unternehmen</p>
              <p className="text-sm font-medium">{data.unternehmen}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Geschäftsjahr</p>
              <p className="text-sm font-medium">{data.geschaeftsjahr}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Scale className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Rechtsform</p>
              <p className="text-sm font-medium">{data.rechtsform}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Landmark className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Bilanzsumme</p>
              <p className="text-sm font-medium">{formatEuro(bilanzsumme)}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium">GuV-Zusammenfassung</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Umsatzerlöse</span>
              <span className="font-mono">{formatEuro(data.guv.umsatzerloese)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Materialaufwand</span>
              <span className="font-mono text-red-600">-{formatEuro(data.guv.materialaufwand)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Personalaufwand</span>
              <span className="font-mono text-red-600">-{formatEuro(data.guv.personalaufwand)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Abschreibungen</span>
              <span className="font-mono text-red-600">-{formatEuro(data.guv.abschreibungen)}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onAnalyze}
          disabled={analyzing}
          className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyse läuft...
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4" />
              Analyse starten
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// ── Kennzahlen Cards ────────────────────────────────────────────

function KennzahlenGrid({ kennzahlen }: { kennzahlen: Kennzahl[] }) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
            <BarChart3 className="h-4 w-4 text-violet-600" />
          </div>
          Kennzahlen
        </CardTitle>
        <CardDescription>
          Die wichtigsten Bilanz-Kennzahlen auf einen Blick
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kennzahlen.map((kz) => {
            const displayValue = kz.einheit === '%'
              ? formatPercent(kz.wert)
              : kz.einheit === 'x'
                ? formatFactor(kz.wert)
                : formatEuro(kz.wert)

            return (
              <div
                key={kz.label}
                className="rounded-xl border p-4 space-y-2 bg-white"
              >
                <p className="text-xs text-muted-foreground font-medium">{kz.label}</p>
                <p className="text-2xl font-bold font-mono tabular-nums">{displayValue}</p>
                <Badge className={`text-xs ${STATUS_COLORS[kz.status]}`}>
                  {STATUS_LABELS[kz.status]}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Steuer-Analyse ──────────────────────────────────────────────

function SteuerAnalyse({
  analysis,
}: {
  analysis: BilanzAnalysis
}) {
  const { steuerAnalyse, optimierungen } = analysis

  // Build pie data from steuer breakdown
  // We estimate typical Austrian corporate tax breakdown
  const gesamtAbgaben = steuerAnalyse.gesamtAbgaben
  const koestAnteil = steuerAnalyse.koest
  const restAbgaben = gesamtAbgaben - koestAnteil
  const pieData = [
    { name: 'KöSt', value: koestAnteil },
    { name: 'KESt', value: Math.round(restAbgaben * 0.3) },
    { name: 'SV', value: Math.round(restAbgaben * 0.45) },
    { name: 'LNK', value: Math.round(restAbgaben * 0.25) },
  ].filter((d) => d.value > 0)

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
            <Calculator className="h-4 w-4 text-amber-600" />
          </div>
          Steuer-Analyse
        </CardTitle>
        <CardDescription>
          Steuerliche Auswertung deiner Bilanz nach österreichischem Recht
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Row */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-slate-50 p-4 border">
            <p className="text-xs text-muted-foreground">KöSt-Betrag</p>
            <p className="text-xl font-bold font-mono">{formatEuro(steuerAnalyse.koest)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 border">
            <p className="text-xs text-muted-foreground">Effektiver Steuersatz</p>
            <p className="text-xl font-bold font-mono">{formatPercent(steuerAnalyse.effektiverSatz)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 border">
            <p className="text-xs text-muted-foreground">Gesamtabgaben</p>
            <p className="text-xl font-bold font-mono">{formatEuro(steuerAnalyse.gesamtAbgaben)}</p>
          </div>
        </div>

        {/* Pie Chart */}
        {pieData.length > 0 && (
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={(props: PieLabelRenderProps) => `${props.name} ${((props.percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatEuro(Number(value))}
                  contentStyle={{
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.875rem',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Optimization Suggestions */}
        {optimierungen.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Optimierungsvorschläge
              </p>
              {optimierungen.map((opt, i) => (
                <div key={i} className="rounded-lg border p-3 space-y-1 bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{opt.titel}</p>
                    {opt.ersparnisEur > 0 && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shrink-0 text-xs">
                        bis zu {formatEuro(opt.ersparnisEur)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{opt.beschreibung}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ── Forecast Section ────────────────────────────────────────────

function ForecastSection({
  forecast,
  forecasting,
  onForecast,
  isPro,
  onUpgradeRequired,
}: {
  forecast: BilanzForecast | null
  forecasting: boolean
  onForecast: () => void
  isPro: boolean
  onUpgradeRequired: () => void
}) {
  if (!isPro) {
    return (
      <Card className="glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-slate-900/10 backdrop-blur-[1px]" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
            AI Forecast
            <Badge className="bg-amber-500/10 text-amber-600 border-amber-300/30 text-xs">
              <Crown className="h-3 w-3 mr-1" /> Pro
            </Badge>
          </CardTitle>
          <CardDescription>
            Erhalte KI-gestützte Prognosen für Umsatz, Gewinn und Steuerlast
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 border border-amber-200">
                <Lock className="h-7 w-7 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              Der AI Forecast analysiert deine Bilanzdaten und erstellt drei Szenarien
              (konservativ, realistisch, optimistisch) mit konkreten Handlungsempfehlungen.
            </p>
            <Button
              onClick={onUpgradeRequired}
              className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Crown className="h-4 w-4" />
              Auf Pro upgraden
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          AI Forecast
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
            Pro
          </Badge>
        </CardTitle>
        <CardDescription>
          KI-gestützte Prognosen basierend auf deiner Bilanzanalyse
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!forecast && (
          <div className="text-center py-6">
            <Button
              onClick={onForecast}
              disabled={forecasting}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {forecasting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Forecast wird erstellt...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Forecast erstellen
                </>
              )}
            </Button>
            {forecasting && (
              <p className="text-xs text-muted-foreground mt-3">
                Die KI analysiert deine Bilanzdaten und erstellt drei Szenarien...
              </p>
            )}
          </div>
        )}

        {forecast && (
          <>
            {/* Bar Chart */}
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Umsatz',
                      Konservativ: forecast.forecast.konservativ.umsatz,
                      Realistisch: forecast.forecast.realistisch.umsatz,
                      Optimistisch: forecast.forecast.optimistisch.umsatz,
                    },
                    {
                      name: 'Gewinn',
                      Konservativ: forecast.forecast.konservativ.gewinn,
                      Realistisch: forecast.forecast.realistisch.gewinn,
                      Optimistisch: forecast.forecast.optimistisch.gewinn,
                    },
                    {
                      name: 'Steuer',
                      Konservativ: forecast.forecast.konservativ.steuer,
                      Realistisch: forecast.forecast.realistisch.steuer,
                      Optimistisch: forecast.forecast.optimistisch.steuer,
                    },
                    {
                      name: 'Cashflow',
                      Konservativ: forecast.forecast.konservativ.cashflow,
                      Realistisch: forecast.forecast.realistisch.cashflow,
                      Optimistisch: forecast.forecast.optimistisch.cashflow,
                    },
                  ]}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => {
                      if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
                      if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}k`
                      return String(v)
                    }}
                  />
                  <Tooltip
                    formatter={(value) => formatEuro(Number(value))}
                    contentStyle={{
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.875rem',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Konservativ" fill={BAR_COLORS.konservativ} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Realistisch" fill={BAR_COLORS.realistisch} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Optimistisch" fill={BAR_COLORS.optimistisch} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Recommendations */}
            {forecast.optimierungen.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  Top-Empfehlungen
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {forecast.optimierungen
                    .sort((a, b) => a.prioritaet - b.prioritaet)
                    .slice(0, 4)
                    .map((opt, i) => (
                      <div key={i} className="rounded-xl border p-4 space-y-1 bg-white">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs shrink-0">
                            #{opt.prioritaet}
                          </Badge>
                          <p className="text-sm font-medium">{opt.titel}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{opt.beschreibung}</p>
                        {opt.ersparnisEur > 0 && (
                          <p className="text-xs font-medium text-emerald-600">
                            Ersparnis: {formatEuro(opt.ersparnisEur)}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Summary Text */}
            {forecast.empfehlungen && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-2">Zusammenfassung</p>
                <p className="text-sm text-blue-700 whitespace-pre-line">{forecast.empfehlungen}</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ── Main Content ────────────────────────────────────────────────

function BilanzContent() {
  const { subscription } = useAppShell()

  // Upgrade dialog
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')
  const [upgradePlan, setUpgradePlan] = useState<'basic' | 'pro'>('basic')

  // Core state
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parsed, setParsed] = useState<ParsedBilanz | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<BilanzAnalysis | null>(null)
  const [forecasting, setForecasting] = useState(false)
  const [forecast, setForecast] = useState<BilanzForecast | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpgradeRequired = useCallback((feature: string, plan: 'basic' | 'pro' = 'basic') => {
    setUpgradeFeature(feature)
    setUpgradePlan(plan)
    setUpgradeOpen(true)
  }, [])

  // ── Upload ────────────────────────────────────────────
  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setError(null)

    // Validate file type
    if (!ACCEPTED_TYPES.includes(selectedFile.type) && !selectedFile.name.match(/\.(csv|xlsx|xls|pdf)$/i)) {
      setError('Ungültiges Dateiformat. Bitte lade eine CSV, XLSX oder PDF-Datei hoch.')
      return
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('Die Datei ist zu groß. Maximale Dateigröße: 10 MB.')
      return
    }

    setFile(selectedFile)

    // Free users: show upgrade dialog after selecting file
    if (subscription.isFree) {
      handleUpgradeRequired('Bilanz-Analyse', 'basic')
      return
    }

    // Upload
    setUploading(true)
    setUploadProgress(0)
    setParsed(null)
    setAnalysis(null)
    setForecast(null)

    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 300)

      const formData = new FormData()
      formData.append('file', selectedFile)

      const res = await fetch('/api/bilanz/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      clearInterval(progressInterval)

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Upload fehlgeschlagen (${res.status})`)
      }

      const data: ParsedBilanz = await res.json()
      setUploadProgress(100)
      setParsed(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen. Bitte versuche es erneut.')
    } finally {
      setUploading(false)
    }
  }, [subscription.isFree, handleUpgradeRequired])

  // ── Analyze ───────────────────────────────────────────
  const handleAnalyze = useCallback(async () => {
    if (!parsed) return
    setAnalyzing(true)
    setError(null)

    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token

      const res = await fetch('/api/bilanz/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId: parsed.sessionId }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Analyse fehlgeschlagen (${res.status})`)
      }

      const data: BilanzAnalysis = await res.json()
      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analyse fehlgeschlagen. Bitte versuche es erneut.')
    } finally {
      setAnalyzing(false)
    }
  }, [parsed])

  // ── Forecast ──────────────────────────────────────────
  const handleForecast = useCallback(async () => {
    if (!parsed) return
    setForecasting(true)
    setError(null)

    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token

      const res = await fetch('/api/bilanz/forecast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId: parsed.sessionId }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Forecast fehlgeschlagen (${res.status})`)
      }

      const data: BilanzForecast = await res.json()
      setForecast(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Forecast fehlgeschlagen. Bitte versuche es erneut.')
    } finally {
      setForecasting(false)
    }
  }, [parsed])

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              <h1 className="text-sm font-semibold">Bilanz-Analyse</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              AT 2026
            </Badge>
            {subscription.isPro && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                Pro
              </Badge>
            )}
            {subscription.isBasic && !subscription.isPro && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                Basic
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Bilanz-Analyse &amp; Forecast
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
            Lade deine Bilanz hoch und erhalte eine detaillierte Kennzahlenanalyse,
            Steuerauswertung und KI-gestützte Prognosen — alles nach österreichischem Recht (UGB).
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Upload Zone */}
        <UploadZone
          onFileSelect={handleFileSelect}
          uploading={uploading}
          uploadProgress={uploadProgress}
          file={file}
        />

        {/* Parsing Preview */}
        {parsed && !analysis && (
          <ParsingPreview
            parsed={parsed}
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
          />
        )}

        {/* Kennzahlen (Basic + Pro) */}
        {analysis && (
          <KennzahlenGrid kennzahlen={analysis.kennzahlen} />
        )}

        {/* Steuer-Analyse (Basic + Pro) */}
        {analysis && (
          <SteuerAnalyse analysis={analysis} />
        )}

        {/* AI Forecast (Pro only) */}
        {analysis && (
          <ForecastSection
            forecast={forecast}
            forecasting={forecasting}
            onForecast={handleForecast}
            isPro={subscription.isPro}
            onUpgradeRequired={() => handleUpgradeRequired('AI Forecast', 'pro')}
          />
        )}

        {/* Action Buttons */}
        {analysis && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="gap-2 flex-1 bg-emerald-600 hover:bg-emerald-700">
              <Link href="/steuerberater?context=bilanz">
                <MessageSquare className="h-4 w-4" />
                Im Chat besprechen
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 flex-1">
              <Link href="/rechner">
                <ChevronLeft className="h-4 w-4" />
                Zurück zum Rechner
              </Link>
            </Button>
          </div>
        )}

        {/* Upgrade Dialog */}
        <UpgradeDialog
          open={upgradeOpen}
          onOpenChange={setUpgradeOpen}
          feature={upgradeFeature}
          requiredPlan={upgradePlan}
        />

        {/* Footer */}
        <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground/70">
            SteuerBoard.pro — Bilanz-Analyse für Österreich
          </p>
          <p>
            Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung.
            Basierend auf UGB und österreichischem Steuerrecht, Werte 2026.
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

// ── Page Export ──────────────────────────────────────────────────

export default function BilanzPage() {
  return (
    <AppShell>
      <BilanzContent />
    </AppShell>
  )
}
