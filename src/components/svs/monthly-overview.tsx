'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'

interface MonthlyOverviewProps {
  result: SvsResult
  vorschreibung: number
}

export function MonthlyOverview({ result, vorschreibung }: MonthlyOverviewProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
          Monatliche Übersicht
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-blue-500 mb-0.5">Vorläufig (aktuell)</p>
            <p className="text-lg font-bold font-mono text-blue-800">
              {formatEuro(vorschreibung)}
            </p>
          </div>
          <div>
            <p className="text-xs text-blue-500 mb-0.5">Endgültig (Soll)</p>
            <p className="text-lg font-bold font-mono text-blue-800">
              {formatEuro(result.endgueltigeMonatlich)}
            </p>
          </div>
          <div>
            <p className="text-xs text-blue-500 mb-0.5">Differenz</p>
            <p className={`text-lg font-bold font-mono ${
              result.nachzahlung > 0 ? 'text-red-600' : result.nachzahlung < 0 ? 'text-green-600' : 'text-muted-foreground'
            }`}>
              {result.nachzahlung > 0 ? '+' : ''}{formatEuro(result.endgueltigeMonatlich - vorschreibung)}
            </p>
          </div>
          <div>
            <p className="text-xs text-blue-500 mb-0.5">Nach Steuer-Effekt</p>
            <p className="text-lg font-bold font-mono text-emerald-700">
              {formatEuro(result.effektiveSVS / 12)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
