'use client'

import { formatEuroShort } from '@/lib/format'
import type { RuecklagenResult } from '@/lib/rechner-types'
import { Landmark, Lightbulb } from 'lucide-react'

interface RuecklagenSectionProps {
  ruecklagen: RuecklagenResult
}

function QuoteBadge({ quote }: { quote: number }) {
  const pct = Math.round(quote * 100)
  const color =
    pct < 35
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
      : pct < 50
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
        : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
      {pct}% vom Umsatz
    </span>
  )
}

export function RuecklagenSection({ ruecklagen }: RuecklagenSectionProps) {
  const { svsMonatlich, estMonatlich, ustMonatlich, gesamtMonatlich, ruecklagenQuote, freiesNettoMonatlich } = ruecklagen

  return (
    <div className="rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 bg-gradient-to-br from-emerald-50/60 to-white dark:from-emerald-950/20 dark:to-[hsl(var(--surface))] p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15">
            <Landmark className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-sm font-semibold text-foreground">Rücklagen-Planer</span>
        </div>
        <QuoteBadge quote={ruecklagenQuote} />
      </div>

      <p className="text-xs text-muted-foreground -mt-2">
        So viel solltest du monatlich zurücklegen
      </p>

      {/* Breakdown */}
      <div className="rounded-lg border border-border/50 dark:border-border/30 overflow-hidden">
        <div className="divide-y divide-border/40 dark:divide-border/20">
          <Row label="SVS" value={svsMonatlich} />
          <Row label="Einkommensteuer" value={estMonatlich} />
          {ustMonatlich > 0 && <Row label="Umsatzsteuer" value={ustMonatlich} />}
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 dark:bg-emerald-500/5 border-t border-border/40 dark:border-border/20">
          <span className="text-xs font-bold text-foreground">Gesamt</span>
          <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">
            {formatEuroShort(gesamtMonatlich)} <span className="text-[10px] font-normal text-muted-foreground">/ Monat</span>
          </span>
        </div>
      </div>

      {/* Freies Netto */}
      <div className="rounded-lg bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-200/40 dark:border-emerald-800/20 p-3 text-center">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
          Freies Netto nach Rücklagen
        </p>
        <p className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">
          {formatEuroShort(freiesNettoMonatlich)}
          <span className="text-xs font-normal text-muted-foreground ml-1">/ Monat</span>
        </p>
      </div>

      {/* Dauerauftrag-Tipp */}
      {gesamtMonatlich > 0 && (
        <div className="flex gap-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-800/20 p-2.5">
          <Lightbulb className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-[11px] text-amber-800 dark:text-amber-300">
            <span className="font-semibold">Tipp:</span> Richte einen Dauerauftrag über{' '}
            <span className="font-mono font-semibold">{formatEuroShort(gesamtMonatlich)}</span>/Monat
            auf ein separates Steuerkonto ein.
          </p>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono font-medium text-foreground">
        {formatEuroShort(value)} <span className="text-[10px] text-muted-foreground">/ Monat</span>
      </span>
    </div>
  )
}
