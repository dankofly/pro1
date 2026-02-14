'use client'

import { formatEuro } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/use-animated-number'
import type { SvsResult } from '@/lib/svs-calculator'
import { BarChart2 } from 'lucide-react'

interface WaterfallChartProps {
  gewinn: number
  result: SvsResult
}

function WaterfallBar({ label, amount, total, color, isResult }: {
  label: string
  amount: number
  total: number
  color: string
  isResult?: boolean
}) {
  const widthPercent = total > 0 ? Math.abs(amount) / total * 100 : 0
  const animated = useAnimatedNumber(widthPercent)

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 sm:w-40 text-right">
        <span className={`text-xs font-medium ${isResult ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
          {label}
        </span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-6 bg-muted/40 rounded-md overflow-hidden">
          <div
            className={`h-full ${color} rounded-md transition-all duration-500 ease-out`}
            style={{ width: `${animated}%` }}
          />
        </div>
        <span className={`text-xs font-mono font-medium w-24 text-right ${isResult ? 'text-emerald-600 font-bold' : 'text-muted-foreground'}`}>
          {amount < 0 ? '−' : ''}{formatEuro(Math.abs(amount))}
        </span>
      </div>
    </div>
  )
}

export function WaterfallChart({ gewinn, result }: WaterfallChartProps) {
  return (
    <div className="card-surface p-4 sm:p-5 space-y-3" role="img" aria-label="Abzugs-Wasserfall: Vom Brutto-Gewinn zum Netto">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/60">
          <BarChart2 className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">Abzugs-Wasserfall</span>
      </div>
      <WaterfallBar
        label="Brutto-Gewinn"
        amount={gewinn}
        total={gewinn}
        color="bg-primary"
      />
      <WaterfallBar
        label="− SVS Beiträge"
        amount={-result.endgueltigeSVS}
        total={gewinn}
        color="bg-red-400"
      />
      {result.hasProOptions && (result.steuerBrutto - result.einkommensteuer) > 0 ? (
        <>
          <WaterfallBar
            label="− ESt (Tarif)"
            amount={-result.steuerBrutto}
            total={gewinn}
            color="bg-orange-400"
          />
          <WaterfallBar
            label="+ Absetzbeträge"
            amount={result.steuerBrutto - result.einkommensteuer}
            total={gewinn}
            color="bg-emerald-400"
          />
        </>
      ) : (
        <WaterfallBar
          label="− Einkommensteuer"
          amount={-result.einkommensteuer}
          total={gewinn}
          color="bg-orange-400"
        />
      )}
      <div className="border-t border-dashed border-border pt-3">
        <WaterfallBar
          label="Echtes Netto"
          amount={result.echtesNetto}
          total={gewinn}
          color="bg-emerald-500"
          isResult
        />
      </div>
    </div>
  )
}
