'use client'

import { formatEuro } from '@/lib/format'
import { useAnimatedNumber } from '@/hooks/use-animated-number'
import type { SvsResult } from '@/lib/svs-calculator'

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
        <div className="flex-1 h-8 bg-slate-100 rounded-md overflow-hidden">
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
    <div className="glass rounded-xl p-4 sm:p-5 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Abzugs-Wasserfall
      </p>
      <WaterfallBar
        label="Brutto-Gewinn"
        amount={gewinn}
        total={gewinn}
        color="bg-slate-600"
      />
      <WaterfallBar
        label="− SVS Beiträge"
        amount={-result.endgueltigeSVS}
        total={gewinn}
        color="bg-red-400"
      />
      <WaterfallBar
        label="− Einkommensteuer"
        amount={-result.einkommensteuer}
        total={gewinn}
        color="bg-orange-400"
      />
      <div className="border-t border-dashed border-slate-200 pt-3">
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
