'use client'

import { useAnimatedNumber } from '@/hooks/use-animated-number'

interface KpiTileProps {
  label: string
  value: number
  color: string
  prefix?: string
  highlight?: boolean
}

function KpiTile({ label, value, color, prefix = '€', highlight }: KpiTileProps) {
  const animated = useAnimatedNumber(value)
  const formatted = Math.round(animated).toLocaleString('de-AT')

  return (
    <div className={`rounded-xl p-3 sm:p-4 min-w-[130px] flex-1 ${
      highlight ? 'bg-emerald-50 border border-emerald-200 ring-1 ring-emerald-100' : 'glass'
    }`}>
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider truncate">
        {label}
      </p>
      <p className={`text-lg sm:text-xl font-bold font-mono tabular-nums mt-1 ${color}`}>
        {prefix} {formatted}
      </p>
    </div>
  )
}

interface KpiTilesStripProps {
  umsatz: number
  aufwaende: number
  gewinn: number
  svs: number
  est: number
  netto: number
}

export function KpiTilesStrip({ umsatz, aufwaende, gewinn, svs, est, netto }: KpiTilesStripProps) {
  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scroll-smooth">
        <KpiTile label="Netto" value={netto} color="text-emerald-600" highlight />
        <KpiTile label="Gewinn" value={gewinn} color="text-blue-600" />
        <KpiTile label="Umsatz" value={umsatz} color="text-foreground" />
        <KpiTile label="Aufwände" value={aufwaende} color="text-red-500" />
        <KpiTile label="SVS" value={svs} color="text-red-500" />
        <KpiTile label="ESt" value={est} color="text-orange-500" />
      </div>
      {/* Scroll affordance gradient on the right */}
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
    </div>
  )
}
