'use client'

import { formatEuro } from '@/lib/format'
import type { PauschalierungResult } from '@/lib/rechner-types'
import { Badge } from '@/components/ui/badge'
import { Calculator, ThumbsUp, ThumbsDown } from 'lucide-react'

interface PauschalierungVergleichProps {
  pauschalierung: PauschalierungResult
  standardNetto: number
  standardAufwaende: number
  standardGewinn: number
}

const ART_LABELS: Record<string, string> = {
  basis_12: 'Basispauschalierung 12%',
  basis_6: 'Basispauschalierung 6%',
  ku_produzent: 'KU-Pauschalierung 45%',
  ku_dienstleister: 'KU-Pauschalierung 20%',
}

export function PauschalierungVergleich({
  pauschalierung, standardNetto, standardAufwaende, standardGewinn,
}: PauschalierungVergleichProps) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          <h3 className="text-base font-semibold">Pauschalierung vs. Standard</h3>
        </div>
        <Badge
          variant="outline"
          className={pauschalierung.vorteilhaft
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-red-50 text-red-700 border-red-200'
          }
        >
          {pauschalierung.vorteilhaft ? (
            <><ThumbsUp className="h-3 w-3 mr-1" /> Vorteilhaft</>
          ) : (
            <><ThumbsDown className="h-3 w-3 mr-1" /> Nachteilig</>
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
              <th className="text-left py-2 font-medium text-muted-foreground">Posten</th>
              <th className="text-right py-2 font-medium text-muted-foreground">Standard</th>
              <th className="text-right py-2 font-medium text-muted-foreground">Pauschaliert</th>
              <th className="text-right py-2 font-medium text-muted-foreground">Differenz</th>
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
              <td className="py-2.5">SVS</td>
              <td className="py-2.5 text-right font-mono text-red-600">
                {formatEuro(standardNetto > 0 ? standardGewinn - standardNetto - (standardGewinn - standardAufwaende) + standardAufwaende : 0)}
              </td>
              <td className="py-2.5 text-right font-mono text-red-600">
                {formatEuro(pauschalierung.svsResult.endgueltigeSVS)}
              </td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">–</td>
            </tr>
            <tr className="font-bold border-t-2 border-border">
              <td className="py-2.5">Echtes Netto</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(standardNetto)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(pauschalierung.echtesNettoPauschal)}</td>
              <td className={`py-2.5 text-right font-mono ${
                pauschalierung.differenzZuStandard > 0 ? 'text-emerald-600' : 'text-red-600'
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
