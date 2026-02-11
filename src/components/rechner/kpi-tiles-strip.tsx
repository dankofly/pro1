'use client'

import { useAnimatedNumber } from '@/hooks/use-animated-number'
import { TrendingUp } from 'lucide-react'

interface KpiTileProps {
  label: string
  value: number
  color: string
  barColor: string
  pctOfUmsatz?: number
}

function KpiTile({ label, value, color, barColor, pctOfUmsatz }: KpiTileProps) {
  const animated = useAnimatedNumber(value)
  const formatted = Math.round(animated).toLocaleString('de-AT')

  return (
    <div className="glass rounded-xl p-3 min-w-[100px] relative overflow-hidden transition-shadow duration-200 hover:shadow-md snap-start">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${barColor}`} />
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
        {label}
      </p>
      <p className={`text-base sm:text-lg font-bold font-mono tabular-nums mt-0.5 ${color}`}>
        &euro; {formatted}
      </p>
      {pctOfUmsatz !== undefined && pctOfUmsatz > 0 && (
        <p className="text-[10px] font-mono text-muted-foreground/70 mt-0.5">
          {pctOfUmsatz.toFixed(1)}%
        </p>
      )}
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
  const animatedNetto = useAnimatedNumber(netto)
  const nettoFormatted = Math.round(animatedNetto).toLocaleString('de-AT')
  const nettoMonatlich = Math.round(animatedNetto / 12).toLocaleString('de-AT')
  const nettoPct = umsatz > 0 ? (netto / umsatz * 100) : 0

  const pct = (v: number) => umsatz > 0 ? (v / umsatz * 100) : 0

  return (
    <div className="space-y-3">
      {/* Hero: Netto */}
      <div className="rounded-2xl bg-primary text-primary-foreground p-4 sm:p-5 relative overflow-hidden" role="status" aria-label={`Echtes Netto: ${nettoFormatted} Euro`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider">
              Dein echtes Netto
            </p>
            <span className="flex items-center gap-1 text-xs font-mono bg-white/10 rounded-full px-2 py-0.5">
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
              {nettoPct.toFixed(1)}%
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-bold font-mono tabular-nums tracking-tight">
            &euro; {nettoFormatted}
          </p>
          <p className="text-sm font-mono text-primary-foreground/60 mt-1">
            &euro; {nettoMonatlich} / Monat
          </p>
        </div>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        <KpiTile label="Umsatz" value={umsatz} color="text-foreground" barColor="bg-primary" />
        <KpiTile label="Aufwände" value={aufwaende} color="text-destructive" barColor="bg-destructive" pctOfUmsatz={pct(aufwaende)} />
        <KpiTile label="Gewinn" value={gewinn} color="text-emerald-600" barColor="bg-emerald-500" pctOfUmsatz={pct(gewinn)} />
        <KpiTile label="SVS" value={svs} color="text-orange-600" barColor="bg-orange-500" pctOfUmsatz={pct(svs)} />
        <KpiTile label="ESt" value={est} color="text-amber-600" barColor="bg-amber-500" pctOfUmsatz={pct(est)} />
      </div>
    </div>
  )
}
