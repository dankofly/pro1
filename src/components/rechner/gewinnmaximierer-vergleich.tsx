'use client'

import { formatEuro } from '@/lib/format'
import type { GewinnmaximiererResult } from '@/lib/rechner-types'
import { Badge } from '@/components/ui/badge'
import { Zap } from 'lucide-react'

interface GewinnmaximiererVergleichProps {
  result: GewinnmaximiererResult
  basisGewinn: number
  basisNetto: number
}

export function GewinnmaximiererVergleich({
  result, basisGewinn, basisNetto,
}: GewinnmaximiererVergleichProps) {
  const abgabenquotePct = (result.abgabenquoteZusatz * 100).toFixed(1)

  return (
    <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <h3 className="text-base font-semibold">Gewinnmaximierer</h3>
        </div>
        <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40 font-mono">
          {abgabenquotePct}% Abgaben
        </Badge>
      </div>

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full text-sm min-w-[460px]">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="text-left py-2 font-medium text-muted-foreground">Posten</th>
              <th scope="col" className="text-right py-2 font-medium text-muted-foreground">Ohne Zusatz</th>
              <th scope="col" className="text-right py-2 font-medium text-muted-foreground">Mit Zusatz</th>
              <th scope="col" className="text-right py-2 font-medium text-muted-foreground">Differenz</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2.5">Gewinn</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(basisGewinn)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(result.gewinnMit)}</td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">
                +{formatEuro(result.gewinnMit - basisGewinn)}
              </td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600 dark:text-red-400">SVS</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-red-600 dark:text-red-400">
                {formatEuro(result.svsResult.endgueltigeSVS)}
              </td>
              <td className="py-2.5 text-right font-mono text-muted-foreground">–</td>
            </tr>
            <tr className="font-bold border-t-2 border-border">
              <td className="py-2.5">Echtes Netto</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(basisNetto)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(result.nettoMit)}</td>
              <td className={`py-2.5 text-right font-mono ${
                result.nettoDifferenz > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {result.nettoDifferenz > 0 ? '+' : ''}{formatEuro(result.nettoDifferenz)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Von jedem zusätzlichen Euro Gewinn bleiben dir {((1 - result.abgabenquoteZusatz) * 100).toFixed(0)} Cent netto.
      </p>
    </div>
  )
}
