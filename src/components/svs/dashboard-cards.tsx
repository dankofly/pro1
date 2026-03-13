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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Gefahren-Barometer */}
      <div className="visual-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Gefahren-Barometer
          </span>
        </div>
        <GaugeBarometer riskPercent={result.riskPercent} />
      </div>

      {/* Nachzahlungs-Alarm */}
      <div className="visual-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Nachzahlungs-Alarm
          </span>
        </div>
        <div className="text-center py-1">
          {result.nachzahlung > 0 ? (
            <>
              <p className="text-2xl font-light text-red-400 num-transition font-mono tracking-tight">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                geschätzte Nachzahlung
              </p>
              <div className="mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-[11px] text-red-400">
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
              <p className="text-2xl font-light text-emerald-400 num-transition font-mono tracking-tight">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                voraussichtliche Gutschrift
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-light text-slate-500 num-transition font-mono tracking-tight">
                &euro; 0
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Keine Nachzahlung erwartet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
