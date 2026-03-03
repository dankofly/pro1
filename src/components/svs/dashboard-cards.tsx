'use client'

import { GaugeBarometer } from './gauge-barometer'
import { formatEuro, formatEuroShort } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/use-animated-number'
import type { SvsResult } from '@/lib/svs-calculator'
import { Zap, AlertTriangle } from 'lucide-react'

interface DashboardCardsProps {
  result: SvsResult
  vorschreibung: number
}

export function DashboardCards({ result, vorschreibung }: DashboardCardsProps) {
  const animatedNachzahlung = useAnimatedNumber(Math.abs(result.nachzahlung))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Gefahren-Barometer */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Gefahren-Barometer
          </span>
        </div>
        <GaugeBarometer riskPercent={result.riskPercent} />
      </div>

      {/* Nachzahlungs-Alarm */}
      <div className="card-elevated p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10">
            <AlertTriangle className="h-3 w-3 text-amber-600" />
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Nachzahlungs-Alarm
          </span>
        </div>
        <div className="text-center py-1">
          {result.nachzahlung > 0 ? (
            <>
              <p className="text-2xl font-bold text-red-500 num-transition font-mono">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                geschätzte Nachzahlung
              </p>
              <div className="mt-2 p-2 rounded-lg bg-muted/40 border border-border/40">
                <p className="text-[11px] text-red-600">
                  Vorschreibung ({formatEuro(vorschreibung)}) ist{' '}
                  <span className="font-bold">
                    {formatEuro(result.endgueltigeMonatlich - vorschreibung)}
                  </span>{' '}
                  zu niedrig.
                </p>
              </div>
            </>
          ) : result.nachzahlung < 0 ? (
            <>
              <p className="text-2xl font-bold text-emerald-500 num-transition font-mono">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                voraussichtliche Gutschrift
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-muted-foreground num-transition font-mono">
                &euro; 0
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Keine Nachzahlung erwartet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
