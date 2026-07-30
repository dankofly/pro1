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
        {vorschreibung > 0 ? (
          <GaugeBarometer riskPercent={result.riskPercent} />
        ) : (
          <div className="py-3 text-center">
            <p className="text-sm text-muted-foreground">
              Noch keine SVS-Vorschreibung hinterlegt.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1.5">
              Trag deine monatliche Vorschreibung unter &bdquo;Vorauszahlungen&ldquo; ein,
              dann bewerten wir dein Nachzahlungsrisiko.
            </p>
          </div>
        )}
      </div>

      {/* Nachzahlungs-Alarm */}
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sb-accent-soft0/15">
            <AlertTriangle className="h-3.5 w-3.5 text-sb-accent" />
          </div>
          <span className="section-header">
            Nachzahlungs-Alarm
          </span>
        </div>
        <div className="py-1">
          {vorschreibung <= 0 ? (
            <>
              <p className="text-2xl font-bold text-muted-foreground num-transition font-mono">
                &euro; -
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Trag deine monatliche Vorschreibung ein, dann schätzen wir deine Nachzahlung.
              </p>
            </>
          ) : result.nachzahlung > 0 ? (
            <>
              <p className="text-2xl font-bold text-sb-red num-transition font-mono">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                geschätzte Nachzahlung
              </p>
              <div className="mt-2 p-2 rounded-lg bg-sb-red/10/50 border border-sb-red/30/40">
                <p className="text-xs text-sb-red">
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
              <p className="text-2xl font-bold text-sb-green num-transition font-mono">
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
