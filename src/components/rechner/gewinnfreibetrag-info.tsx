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
    <div className="rounded-xl border border-sky-200/50 dark:border-sky-800/30 bg-gradient-to-br from-sky-50/50 to-white dark:from-sky-950/20 dark:to-[hsl(var(--surface))] p-4 shadow-sm space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/15">
          <Info className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
        </div>
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
