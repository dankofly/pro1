'use client'

import { formatEuro } from '@/lib/format'
import type { PauschalierungResult } from '@/lib/rechner-types'
import { getBasispauschalierungLabel } from '@/lib/rechner-engine'
import { Badge } from '@/components/ui/badge'
import { Calculator, ThumbsUp, ThumbsDown } from 'lucide-react'

interface PauschalierungVergleichProps {
  pauschalierung: PauschalierungResult
  year: string
  standardNetto: number
  standardAufwaende: number
  standardGewinn: number
}

function getArtLabels(year: string): Record<string, string> {
  return {
    basis_12: getBasispauschalierungLabel(year),
    basis_6: 'Basispauschalierung 6%',
    ku_produzent: 'KU-Pauschalierung 45%',
    ku_dienstleister: 'KU-Pauschalierung 20%',
  }
}

export function PauschalierungVergleich({
  pauschalierung, year, standardNetto, standardAufwaende, standardGewinn,
}: PauschalierungVergleichProps) {
  const ART_LABELS = getArtLabels(year)
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h3 className="text-base font-semibold">Pauschalierung vs. Standard</h3>
        </div>
        <Badge
          variant="outline"
          className={pauschalierung.vorteilhaft
            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
            : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/40'
          }
        >
          {pauschalierung.vorteilhaft ? (
            <><ThumbsUp className="h-3 w-3 mr-1" aria-hidden="true" /> Vorteilhaft</>
          ) : (
            <><ThumbsDown className="h-3 w-3 mr-1" aria-hidden="true" /> Nachteilig</>
          )}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        {ART_LABELS[pauschalierung.art] || pauschalierung.art}
      </p>

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full text-sm min-w-[460px]">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="text-left py-2 font-medium text-muted-foreground">Posten</th>
              <th scope="col" className="text-right py-2 font-medium text-muted-foreground">Standard</th>
              <th scope="col" className="text-right py-2 font-medium text-muted-foreground">Pauschaliert</th>
              <th scope="col" className="text-right py-2 font-medium text-muted-foreground">Differenz</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2.5">Aufwände</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(standardAufwaende)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(pauschalierung.pauschalAufwaende)}</td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">
                {formatEuro(pauschalierung.pauschalAufwaende - standardAufwaende)}
              </td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5">Gewinn</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(standardGewinn)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(pauschalierung.gewinnPauschal)}</td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">
                {formatEuro(pauschalierung.gewinnPauschal - standardGewinn)}
              </td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5">Abgaben gesamt (SVS + ESt)</td>
              <td className="py-2.5 text-right font-mono text-red-600 dark:text-red-400">
                {/* SVS allein ist aus den Props nicht ableitbar (ESt fehlt): Netto = Gewinn - SVS - ESt */}
                {formatEuro(standardNetto > 0 ? standardGewinn - standardNetto : 0)}
              </td>
              <td className="py-2.5 text-right font-mono text-red-600 dark:text-red-400">
                {formatEuro(pauschalierung.gewinnPauschal - pauschalierung.echtesNettoPauschal)}
              </td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">–</td>
            </tr>
            <tr className="font-bold border-t-2 border-border">
              <td className="py-2.5">Echtes Netto</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(standardNetto)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(pauschalierung.echtesNettoPauschal)}</td>
              <td className={`py-2.5 text-right font-mono ${
                pauschalierung.differenzZuStandard > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {pauschalierung.differenzZuStandard > 0 ? '+' : ''}{formatEuro(pauschalierung.differenzZuStandard)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
