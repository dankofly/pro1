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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {/* Gefahren-Barometer */}
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
            <Zap className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="section-header">
            Gefahren-Barometer
          </span>
        </div>
        <GaugeBarometer riskPercent={result.riskPercent} />
      </div>

      {/* Nachzahlungs-Alarm */}
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="section-header">
            Nachzahlungs-Alarm
          </span>
        </div>
        <div className="py-1">
          {result.nachzahlung > 0 ? (
            <>
              <p className="text-2xl font-bold text-red-500 num-transition font-mono">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                geschätzte Nachzahlung
              </p>
              <div className="mt-2 p-2 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-200/40 dark:border-red-800/20">
                <p className="text-xs text-red-600 dark:text-red-400">
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
