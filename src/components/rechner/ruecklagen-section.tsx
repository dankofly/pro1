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
      ? 'bg-sb-green-soft text-sb-green'
      : pct < 50
        ? 'bg-sb-accent-soft text-sb-accent'
        : 'bg-sb-red/10 text-sb-red'

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
      {pct}% vom Umsatz
    </span>
  )
}

export function RuecklagenSection({ ruecklagen }: RuecklagenSectionProps) {
  const { svsMonatlich, estMonatlich, ustMonatlich, gesamtMonatlich, ruecklagenQuote, freiesNettoMonatlich } = ruecklagen

  return (
    <div className="rounded-xl border border-sb-green/30 bg-gradient-to-br from-sb-green/60 to-white(var(--surface))] p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sb-green-soft0/15">
            <Landmark className="h-3.5 w-3.5 text-sb-green" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Rücklagen-Planer</h3>
        </div>
        <QuoteBadge quote={ruecklagenQuote} />
      </div>

      <p className="text-xs text-muted-foreground -mt-2">
        So viel solltest du monatlich zurücklegen
      </p>

      {/* Breakdown */}
      <div className="rounded-lg border border-border/50 overflow-hidden">
        <div className="divide-y divide-border/40">
          <Row label="SVS" value={svsMonatlich} />
          <Row label="Einkommensteuer" value={estMonatlich} />
          {ustMonatlich > 0 && <Row label="Umsatzsteuer" value={ustMonatlich} />}
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 bg-sb-green-soft0/10 border-t border-border/40">
          <span className="text-xs font-bold text-foreground">Gesamt</span>
          <span className="text-sm font-bold font-mono text-sb-green">
            {formatEuroShort(gesamtMonatlich)} <span className="text-xs font-normal text-muted-foreground">/ Monat</span>
          </span>
        </div>
      </div>

      {/* Freies Netto */}
      <div className="rounded-lg bg-sb-green-soft0/10 border border-sb-green/30/40 p-3 text-center">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          Freies Netto nach Rücklagen
        </p>
        <p className="text-lg font-bold font-mono text-sb-green">
          {formatEuroShort(freiesNettoMonatlich)}
          <span className="text-xs font-normal text-muted-foreground ml-1">/ Monat</span>
        </p>
      </div>

      {/* Dauerauftrag-Tipp */}
      {gesamtMonatlich > 0 && (
        <div className="flex gap-2 rounded-lg bg-sb-accent-soft/60 border border-sb-accent/30/40 p-2.5">
          <Lightbulb className="h-3.5 w-3.5 text-sb-accent mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-[11px] text-sb-accent">
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
        {formatEuroShort(value)} <span className="text-xs text-muted-foreground">/ Monat</span>
      </span>
    </div>
  )
}
