'use client'

import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'

interface MonthlyOverviewProps {
  result: SvsResult
  vorschreibung: number
}

export function MonthlyOverview({ result, vorschreibung }: MonthlyOverviewProps) {
  const differenz = result.endgueltigeMonatlich - vorschreibung

  return (
    <div className="card-surface p-5 sm:p-6">
      <h3 className="section-header mb-4">
        Monatliche Übersicht
      </h3>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="text-[11px] text-muted-foreground mb-0.5">Vorläufig (aktuell)</p>
          <p className="text-base font-bold font-mono text-foreground">
            {formatEuro(vorschreibung)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground mb-0.5">Endgültig (Soll)</p>
          <p className="text-base font-bold font-mono text-foreground">
            {formatEuro(result.endgueltigeMonatlich)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground mb-0.5">Differenz</p>
          <p className={`text-base font-bold font-mono ${
            differenz > 0 ? 'text-red-500' : differenz < 0 ? 'text-emerald-500' : 'text-muted-foreground'
          }`}>
            {differenz > 0 ? '+' : ''}{formatEuro(differenz)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground mb-0.5">Nach Steuer-Effekt</p>
          <p className="text-base font-bold font-mono text-emerald-600">
            {formatEuro(result.effektiveSVS / 12)}
          </p>
        </div>
      </div>
    </div>
  )
}
