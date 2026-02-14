'use client'

import { useAnimatedNumber } from '@/hooks/use-animated-number'
import { TrendingUp } from 'lucide-react'

interface KpiTileProps {
  label: string
  value: number
  color: string
  dotColor: string
  pctOfUmsatz?: number
  pctColor?: string
}

function KpiTile({ label, value, color, dotColor, pctOfUmsatz, pctColor }: KpiTileProps) {
  const animated = useAnimatedNumber(value)
  const formatted = Math.round(animated).toLocaleString('de-AT')

  return (
    <div className="card-surface p-3 min-w-0 transition-colors duration-200 hover:border-[hsl(var(--border-subtle))]">
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />
        <p className="text-[11px] font-medium text-muted-foreground truncate">
          {label}
        </p>
      </div>
      <p className={`text-base font-bold font-mono tabular-nums ${color}`} style={{ letterSpacing: '-0.01em' }}>
        &euro; {formatted}
        {pctOfUmsatz !== undefined && pctOfUmsatz > 0 && (
          <span className={`text-[10px] font-normal ml-1 ${pctColor || 'text-muted-foreground/60'}`}>
            ({pctOfUmsatz.toFixed(0)}%)
          </span>
        )}
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
  const animatedNetto = useAnimatedNumber(netto)
  const nettoFormatted = Math.round(animatedNetto).toLocaleString('de-AT')
  const nettoMonatlich = Math.round(animatedNetto / 12).toLocaleString('de-AT')
  const nettoPct = umsatz > 0 ? (netto / umsatz * 100) : 0

  const pct = (v: number) => umsatz > 0 ? (v / umsatz * 100) : 0

  // Netto-Quote Farbcodierung
  const nettoBadgeBg = nettoPct >= 70
    ? 'bg-emerald-500/20 border-emerald-400/30'
    : nettoPct >= 50
      ? 'bg-amber-500/20 border-amber-400/30'
      : 'bg-red-500/20 border-red-400/30'

  return (
    <div className="space-y-3">
      {/* Hero: Netto */}
      <div className="rounded-2xl bg-gradient-to-br from-[hsl(207,100%,40%)] to-[hsl(210,100%,30%)] text-primary-foreground p-5 sm:p-6 relative animate-fade-up" role="status" aria-label={`Echtes Netto: ${nettoFormatted} Euro`}>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full -mr-12 -mb-12 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[11px] font-medium text-primary-foreground/70 uppercase tracking-wider whitespace-nowrap">
              Dein echtes Netto
            </p>
            <span className={`flex items-center gap-1 text-xs font-mono ${nettoBadgeBg} border rounded-full px-2 py-0.5 shrink-0`}>
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
              {nettoPct.toFixed(1)}%
            </span>
          </div>
          <p className="text-4xl sm:text-5xl font-bold font-mono tabular-nums" style={{ letterSpacing: '-0.02em' }}>
            &euro; {nettoFormatted}
          </p>
          <p className="text-sm font-mono text-primary-foreground/60 mt-1">
            &euro; {nettoMonatlich} / Monat
          </p>
        </div>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <KpiTile label="Umsatz" value={umsatz} color="text-foreground" dotColor="bg-primary" />
        <KpiTile label="Aufwände" value={aufwaende} color="text-destructive" dotColor="bg-destructive" pctOfUmsatz={pct(aufwaende)} pctColor={pct(aufwaende) > 40 ? 'text-red-500/70' : undefined} />
        <KpiTile label="Gewinn" value={gewinn} color="text-emerald-600" dotColor="bg-emerald-500" pctOfUmsatz={pct(gewinn)} pctColor="text-emerald-500/70" />
        <KpiTile label="SVS" value={svs} color="text-orange-600" dotColor="bg-orange-500" pctOfUmsatz={pct(svs)} pctColor="text-orange-500/70" />
        <KpiTile label="ESt" value={est} color="text-amber-600" dotColor="bg-amber-500" pctOfUmsatz={pct(est)} pctColor={pct(est) > 30 ? 'text-amber-600/70' : undefined} />
      </div>
    </div>
  )
}
