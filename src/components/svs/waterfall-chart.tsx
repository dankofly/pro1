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
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className={`text-xs font-medium ${isResult ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
          {label}
        </span>
        <span className={`text-xs font-mono font-medium ${isResult ? 'text-sb-green font-bold' : 'text-muted-foreground'}`}>
          {amount < 0 ? '−' : ''}{formatEuro(Math.abs(amount))}
        </span>
      </div>
      <div className="h-6 bg-muted/40 rounded-md overflow-hidden">
        <div
          className={`h-full ${color} rounded-md`}
          style={{ width: `${animated}%` }}
        />
      </div>
    </div>
  )
}

export function WaterfallChart({ gewinn, result }: WaterfallChartProps) {
  return (
    <section className="card-surface p-5 sm:p-6 space-y-3">
      <h3 className="sr-only">Abzugs-Wasserfall: Vom Brutto-Gewinn zum Netto</h3>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sb-accent-soft0/15">
          <BarChart2 className="h-3.5 w-3.5 text-sb-accent" aria-hidden="true" />
        </div>
        <span className="section-header">Abzugs-Wasserfall</span>
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
        color="bg-sb-red/80"
      />
      {result.hasProOptions && (result.steuerBrutto - result.einkommensteuer) > 0 ? (
        <>
          <WaterfallBar
            label="− ESt (Tarif)"
            amount={-result.steuerBrutto}
            total={gewinn}
            color="bg-sb-accent"
          />
          <WaterfallBar
            label="+ Absetzbeträge"
            amount={result.steuerBrutto - result.einkommensteuer}
            total={gewinn}
            color="bg-sb-green"
          />
        </>
      ) : (
        <WaterfallBar
          label="− Einkommensteuer"
          amount={-result.einkommensteuer}
          total={gewinn}
          color="bg-sb-accent"
        />
      )}
      <div className="border-t border-dashed border-border pt-3">
        <WaterfallBar
          label="Echtes Netto"
          amount={result.echtesNetto}
          total={gewinn}
          color="bg-sb-green-soft0"
          isResult
        />
      </div>
    </section>
  )
}
