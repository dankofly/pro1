'use client'

import { formatEuro } from '@/lib/format'
import type { SvsResult } from '@/lib/svs-calculator'
import { Info } from 'lucide-react'

interface GewinnfreibetragInfoProps {
  result: SvsResult
}

export function GewinnfreibetragInfo({ result }: GewinnfreibetragInfoProps) {
  if (result.grundfreibetrag <= 0 && result.gewinnfreibetragInvestition <= 0) return null

  return (
    <div className="glass rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Info className="h-4 w-4 text-blue-500" />
        Gewinnfreibetrag
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        {result.grundfreibetrag > 0 && (
          <p>
            Grundfreibetrag (15%): <span className="font-mono font-medium text-foreground">{formatEuro(result.grundfreibetrag)}</span>
          </p>
        )}
        {result.gewinnfreibetragInvestition > 0 && (
          <p>
            Investitionsbedingter Freibetrag: <span className="font-mono font-medium text-foreground">{formatEuro(result.gewinnfreibetragInvestition)}</span>
          </p>
        )}
        <p className="text-xs pt-1">
          Der Gewinnfreibetrag reduziert das steuerpflichtige Einkommen und damit die Einkommensteuer.
          {result.gewinnfreibetragInvestition > 0
            ? ' Der IFB erfordert begünstigte Investitionen (Wertpapiere oder Anlagegüter).'
            : ''
          }
        </p>
      </div>
    </div>
  )
}
