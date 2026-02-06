'use client'

import { GaugeBarometer } from './gauge-barometer'
import { formatEuro, formatEuroShort } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/use-animated-number'
import type { SvsResult } from '@/lib/svs-calculator'
import { Zap, AlertTriangle, Wallet, CircleDollarSign } from 'lucide-react'

interface DashboardCardsProps {
  result: SvsResult
  vorschreibung: number
}

export function DashboardCards({ result, vorschreibung }: DashboardCardsProps) {
  const animatedNachzahlung = useAnimatedNumber(Math.abs(result.nachzahlung))
  const animatedSpar = useAnimatedNumber(result.sparEmpfehlung)
  const animatedSteuer = useAnimatedNumber(result.steuerErsparnis)
  const animatedEffektiv = useAnimatedNumber(result.effektiveSVS)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Gefahren-Barometer */}
      <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10">
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Gefahren-Barometer
          </span>
        </div>
        <GaugeBarometer riskPercent={result.riskPercent} />
        <p className="text-xs text-muted-foreground text-center mt-2">
          Nachzahlungsrisiko basierend auf vorläufiger vs. endgültiger Vorschreibung
        </p>
      </div>

      {/* Nachzahlungs-Alarm */}
      <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              result.nachzahlung > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'
            }`}
          >
            <AlertTriangle
              className={`h-4 w-4 ${
                result.nachzahlung > 0 ? 'text-red-500' : 'text-emerald-500'
              }`}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Nachzahlungs-Alarm
          </span>
        </div>
        <div className="text-center py-2">
          {result.nachzahlung > 0 ? (
            <>
              <p className="text-3xl sm:text-4xl font-bold text-red-500 num-transition font-mono">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                geschätzte Nachzahlung
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-red-500/10">
                <p className="text-xs text-red-600">
                  Deine Vorschreibung ({formatEuro(vorschreibung)}) ist{' '}
                  <span className="font-bold">
                    {formatEuro(result.endgueltigeMonatlich - vorschreibung)}
                  </span>{' '}
                  zu niedrig.
                </p>
              </div>
            </>
          ) : result.nachzahlung < 0 ? (
            <>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-500 num-transition font-mono">
                {formatEuroShort(Math.round(animatedNachzahlung))}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                voraussichtliche Gutschrift
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10">
                <p className="text-xs text-emerald-600">
                  Du zahlst aktuell mehr als nötig. Die SVS wird dir die
                  Differenz gutschreiben.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl sm:text-4xl font-bold text-muted-foreground num-transition font-mono">
                &euro; 0
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Keine Nachzahlung erwartet
              </p>
            </>
          )}
        </div>
      </div>

      {/* Spar-Empfehlung */}
      <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10">
            <Wallet className="h-4 w-4 text-blue-500" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Spar-Empfehlung
          </span>
        </div>
        <div className="text-center py-2">
          <p className="text-3xl sm:text-4xl font-bold text-blue-600 num-transition font-mono">
            {formatEuroShort(Math.round(animatedSpar))}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            pro Monat auf ein Unterkonto legen
          </p>
          {result.sparEmpfehlung > 0 && (
            <div className="mt-3 p-2.5 rounded-xl bg-blue-500/10">
              <p className="text-xs text-blue-600">
                Lege jeden Monat diesen Betrag zur Seite, um die Nachzahlung
                stressfrei zu stemmen.
              </p>
            </div>
          )}
          {result.sparEmpfehlung === 0 && result.nachzahlung < 0 && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10">
              <p className="text-xs text-emerald-600">
                Keine Rücklage nötig – du bist aktuell gut aufgestellt!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Steuer-Hebel */}
      <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
            <CircleDollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Steuer-Hebel
          </span>
        </div>
        <div className="text-center py-2">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-500 num-transition font-mono">
            - {formatEuroShort(Math.round(animatedSteuer))}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            geschätzte Steuerersparnis
          </p>
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10">
            <p className="text-xs text-emerald-600">
              SVS-Beiträge sind{' '}
              <span className="font-semibold">Betriebsausgaben</span> und senken
              deine Einkommensteuer. Effektive Belastung:{' '}
              <span className="font-bold font-mono">
                {formatEuro(Math.round(animatedEffektiv))}
              </span>
              /Jahr
            </p>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">
              Annahme: ~27,5% Grenzsteuersatz
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
