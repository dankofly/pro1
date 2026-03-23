'use client'

import { formatEuro } from '@/lib/format'
import type { GmbhResult } from '@/lib/rechner-types'
import { Badge } from '@/components/ui/badge'
import { Building, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react'

interface GmbhVergleichTabelleProps {
  gmbh: GmbhResult
  epuNetto: number
  epuSvs: number
  epuEst: number
  gewinn: number
}

export function GmbhVergleichTabelle({
  gmbh, epuNetto, epuSvs, epuEst, gewinn,
}: GmbhVergleichTabelleProps) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-rose-600" />
          <h3 className="text-base font-semibold">EPU vs. GmbH</h3>
        </div>
        <Badge
          variant="outline"
          className={gmbh.vorteilhaft
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-red-50 text-red-700 border-red-200'
          }
        >
          {gmbh.vorteilhaft ? (
            <><ThumbsUp className="h-3 w-3 mr-1" /> GmbH vorteilhaft</>
          ) : (
            <><ThumbsDown className="h-3 w-3 mr-1" /> EPU vorteilhaft</>
          )}
        </Badge>
      </div>

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full text-sm min-w-[380px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium text-muted-foreground">Posten</th>
              <th className="text-right py-2 font-medium text-muted-foreground">EPU</th>
              <th className="text-right py-2 font-medium text-muted-foreground">GmbH</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2.5">Gewinn</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(gewinn)}</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(gewinn)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">GF-Gehalt (brutto)</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono">{formatEuro(gmbh.gfGehaltBrutto)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">SVS / SV</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(epuSvs)}</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(gmbh.gfSv)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">ESt / LSt</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(epuEst)}</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(gmbh.gfLohnsteuer)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">Lohnnebenkosten (DB/DZ/KommSt)</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(gmbh.lohnnebenkosten)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">KöSt (23%){gmbh.koest <= gmbh.minKoest ? ' *' : ''}</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(gmbh.koest)}</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-red-600">KapESt (27,5%)</td>
              <td className="py-2.5 text-right font-mono">–</td>
              <td className="py-2.5 text-right font-mono text-red-600">{formatEuro(gmbh.kapest)}</td>
            </tr>
            <tr className="font-bold border-t-2 border-border">
              <td className="py-2.5">Gesamt-Netto</td>
              <td className="py-2.5 text-right font-mono text-emerald-600">{formatEuro(epuNetto)}</td>
              <td className="py-2.5 text-right font-mono text-emerald-600">{formatEuro(gmbh.gesamtNetto)}</td>
            </tr>
            <tr>
              <td className="py-2.5 font-medium">Differenz</td>
              <td className="py-2.5 text-right font-mono" colSpan={2}>
                <span className={gmbh.differenzZuEpu > 0 ? 'text-emerald-600' : 'text-red-600'}>
                  {gmbh.differenzZuEpu > 0 ? '+' : ''}{formatEuro(gmbh.differenzZuEpu)}
                </span>
                <span className="text-muted-foreground ml-1">
                  {gmbh.vorteilhaft ? 'für GmbH' : 'für EPU'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {gmbh.warnungen.map((w, i) => (
        <div key={i} className="flex gap-2 text-xs text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{w.text}</span>
        </div>
      ))}

      <p className="text-xs text-muted-foreground">
        GGF &gt;25%: GSVG (keine AG-SV), GF-Bezug 14×, DB/DZ/KommSt ~7%.
        {gmbh.koest <= gmbh.minKoest && ' * Mindest-KöSt €500/Jahr greift.'}
      </p>
    </div>
  )
}
