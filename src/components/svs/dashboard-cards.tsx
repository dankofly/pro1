'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SvsTooltip } from './svs-tooltip'
import { GaugeBarometer } from './gauge-barometer'
import { formatEuro, formatEuroShort } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { Zap, AlertTriangle, Wallet, CircleDollarSign } from 'lucide-react'

interface DashboardCardsProps {
  result: SvsResult
  vorschreibung: number
}

export function DashboardCards({ result, vorschreibung }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Gefahren-Barometer */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
              <Zap className="h-4 w-4 text-orange-500" />
            </div>
            Gefahren-Barometer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GaugeBarometer riskPercent={result.riskPercent} />
          <p className="text-xs text-muted-foreground text-center mt-2">
            Nachzahlungsrisiko basierend auf vorläufiger vs. endgültiger Vorschreibung
          </p>
        </CardContent>
      </Card>

      {/* Nachzahlungs-Alarm */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${result.nachzahlung > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
              <AlertTriangle className={`h-4 w-4 ${result.nachzahlung > 0 ? 'text-red-500' : 'text-green-500'}`} />
            </div>
            Nachzahlungs-Alarm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-2">
            {result.nachzahlung > 0 ? (
              <>
                <p className="text-3xl sm:text-4xl font-bold text-red-600">
                  {formatEuroShort(result.nachzahlung)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">geschätzte Nachzahlung</p>
                <div className="mt-3 p-2.5 bg-red-50 rounded-lg">
                  <p className="text-xs text-red-700">
                    Deine Vorschreibung ({formatEuro(vorschreibung)}) ist{' '}
                    <span className="font-bold">{formatEuro(result.endgueltigeMonatlich - vorschreibung)}</span> zu niedrig.
                  </p>
                </div>
              </>
            ) : result.nachzahlung < 0 ? (
              <>
                <p className="text-3xl sm:text-4xl font-bold text-green-600">
                  {formatEuroShort(Math.abs(result.nachzahlung))}
                </p>
                <p className="text-sm text-muted-foreground mt-1">voraussichtliche Gutschrift</p>
                <div className="mt-3 p-2.5 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700">
                    Du zahlst aktuell mehr als nötig. Die SVS wird dir die Differenz gutschreiben.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-4xl font-bold text-muted-foreground">€ 0</p>
                <p className="text-sm text-muted-foreground mt-1">Keine Nachzahlung erwartet</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Spar-Empfehlung */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Wallet className="h-4 w-4 text-blue-600" />
            </div>
            Spar-Empfehlung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-2">
            <p className="text-3xl sm:text-4xl font-bold text-blue-700">
              {formatEuroShort(result.sparEmpfehlung)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">pro Monat auf ein Unterkonto legen</p>
            {result.sparEmpfehlung > 0 && (
              <div className="mt-3 p-2.5 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  Lege jeden Monat diesen Betrag zur Seite, um die Nachzahlung stressfrei zu stemmen.
                </p>
              </div>
            )}
            {result.sparEmpfehlung === 0 && result.nachzahlung < 0 && (
              <div className="mt-3 p-2.5 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  Keine Rücklage nötig – du bist aktuell gut aufgestellt!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Steuer-Hebel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <CircleDollarSign className="h-4 w-4 text-emerald-600" />
            </div>
            Steuer-Hebel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-2">
            <p className="text-3xl sm:text-4xl font-bold text-emerald-600">
              - {formatEuroShort(result.steuerErsparnis)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">geschätzte Steuerersparnis</p>
            <div className="mt-3 p-2.5 bg-emerald-50 rounded-lg">
              <p className="text-xs text-emerald-700">
                SVS-Beiträge sind <span className="font-semibold">Betriebsausgaben</span> und senken deine Einkommensteuer.
                Effektive Belastung: <span className="font-bold font-mono">{formatEuro(result.effektiveSVS)}</span>/Jahr
              </p>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Annahme: ~27,5% Grenzsteuersatz</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
