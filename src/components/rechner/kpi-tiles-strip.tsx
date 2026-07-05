'use client'

import { useAnimatedNumber } from '@/hooks/use-animated-number'
import { formatEuroShort } from '@/lib/format'

/* ------------------------------------------------------------------ */
/*  Health status helper                                               */
/* ------------------------------------------------------------------ */

type HealthStatus = 'great' | 'okay' | 'poor'

function getHealthStatus(nettoPct: number): HealthStatus {
  if (nettoPct >= 70) return 'great'
  if (nettoPct >= 50) return 'okay'
  return 'poor'
}

const healthConfig = {
  great: {
    gradient: 'from-emerald-600 via-emerald-500 to-teal-500',
    glowColor: 'shadow-emerald-500/30',
    ringStroke: '#34d399',        // emerald-400
    ringTrack: 'rgba(52,211,153,0.15)',
    statusText: 'Optimale Steuerquote',
    dotClass: 'bg-emerald-400',
    orbColors: ['bg-teal-400/10', 'bg-emerald-300/10', 'bg-green-400/8'],
  },
  okay: {
    gradient: 'from-blue-600 via-blue-500 to-indigo-500',
    glowColor: 'shadow-blue-500/30',
    ringStroke: '#60a5fa',        // blue-400
    ringTrack: 'rgba(96,165,250,0.15)',
    statusText: 'Optimierungspotenzial vorhanden',
    dotClass: 'bg-amber-400',
    orbColors: ['bg-blue-400/10', 'bg-indigo-300/10', 'bg-sky-400/8'],
  },
  poor: {
    gradient: 'from-red-600 via-orange-500 to-amber-500',
    glowColor: 'shadow-red-500/30',
    ringStroke: '#f87171',        // red-400
    ringTrack: 'rgba(248,113,113,0.15)',
    statusText: 'Dringend optimieren!',
    dotClass: 'bg-red-500 animate-pulse',
    orbColors: ['bg-red-400/10', 'bg-orange-300/10', 'bg-amber-400/8'],
  },
} as const

/* ------------------------------------------------------------------ */
/*  Gauge ring (SVG)                                                   */
/* ------------------------------------------------------------------ */

const RING_RADIUS = 54
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS // ~339.292

interface GaugeRingProps {
  percentage: number
  strokeColor: string
  trackColor: string
}

function GaugeRing({ percentage, strokeColor, trackColor }: GaugeRingProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100)
  const offset = RING_CIRCUMFERENCE - (clamped / 100) * RING_CIRCUMFERENCE

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0" aria-hidden="true">
      {/* Glow behind the ring */}
      <div
        className="absolute inset-2 rounded-full blur-md opacity-40"
        style={{ backgroundColor: strokeColor }}
      />
      {/* Dark backdrop circle */}
      <div className="absolute inset-1 rounded-full bg-black/25 backdrop-blur-sm" />
      <svg
        viewBox="0 0 120 120"
        className="relative w-full h-full -rotate-90 motion-safe:animate-ring-fill"
        style={{ '--ring-target': `${offset}` } as React.CSSProperties}
      >
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke={trackColor}
          strokeWidth="10"
        />
        {/* Glow layer */}
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
          opacity="0.3"
          filter="url(#ringGlow)"
        />
        {/* Progress */}
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
        <defs>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white drop-shadow-lg">
          {clamped.toFixed(0)}
        </span>
        <span className="text-[11px] font-medium text-white/70 uppercase tracking-wider -mt-0.5">
          Prozent
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  KPI Tile (secondary)                                               */
/* ------------------------------------------------------------------ */

interface KpiTileProps {
  label: string
  value: number
  accentColor: string
  pctOfUmsatz?: number
  maxPct: number
  className?: string
}

function KpiTile({ label, value, accentColor, pctOfUmsatz, maxPct, className = '' }: KpiTileProps) {
  const animated = useAnimatedNumber(value)
  const formatted = formatEuroShort(Math.round(animated))
  const barWidth = maxPct > 0 && pctOfUmsatz !== undefined
    ? Math.min((pctOfUmsatz / maxPct) * 100, 100)
    : 0

  return (
    <div className={`card-surface p-4 sm:p-5 min-w-0 hover:shadow-elevation-3 transition-shadow duration-200 ${className}`}>
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-3">
        {label}
      </p>
      <p className="text-lg sm:text-xl lg:text-2xl font-semibold font-mono tabular-nums text-foreground whitespace-nowrap" style={{ letterSpacing: '-0.03em' }}>
        {formatted}
      </p>

      {/* Proportion bar */}
      <div className="mt-3 h-1 w-full rounded-full bg-muted/30 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none ${accentColor}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

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
  const nettoFormatted = formatEuroShort(Math.round(animatedNetto))
  const nettoMonatlich = formatEuroShort(Math.round(animatedNetto / 12))
  const nettoPct = umsatz > 0 ? (netto / umsatz * 100) : 0

  const pct = (v: number) => umsatz > 0 ? (v / umsatz * 100) : 0

  const health = getHealthStatus(nettoPct)
  const cfg = healthConfig[health]

  // For proportion bars: find the max percentage among secondary KPIs
  const maxPct = Math.max(pct(umsatz), pct(aufwaende), pct(gewinn), pct(svs), pct(est), 1)

  // Screenreader bekommt den finalen Wert, nicht die animierten Zwischenwerte
  const nettoFinalFormatted = formatEuroShort(Math.round(netto))

  return (
    <div className="space-y-4">
      {/* Hero card */}
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${cfg.gradient} text-white p-5 sm:p-6 overflow-hidden shadow-lg ${cfg.glowColor} animate-fade-up`}
        role="status"
        aria-label={`Echtes Netto: ${nettoFinalFormatted}, ${nettoPct.toFixed(1)} Prozent vom Umsatz. ${cfg.statusText}`}
      >
        {/* Floating background orbs */}
        <div className={`absolute -top-16 -left-16 w-48 h-48 rounded-full ${cfg.orbColors[0]} blur-2xl pointer-events-none`} />
        <div
          className={`absolute -bottom-12 -right-12 w-56 h-56 rounded-full ${cfg.orbColors[1]} blur-3xl pointer-events-none`}
        />
        <div
          className={`absolute top-1/2 left-1/3 w-32 h-32 rounded-full ${cfg.orbColors[2]} blur-2xl pointer-events-none`}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between gap-4">
          {/* Left: numbers */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[11px] font-medium text-white/75 uppercase tracking-[0.1em]">
                Dein echtes Netto
              </p>
            </div>

            <p
              className={`font-semibold font-mono tabular-nums tracking-tight whitespace-nowrap ${nettoFormatted.length > 9 ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-5xl sm:text-6xl lg:text-7xl'}`}
              style={{ letterSpacing: '-0.04em' }}
            >
              {nettoFormatted}
            </p>

            <p className="text-sm font-mono text-white/80 mt-1.5">
              {nettoMonatlich} / Monat
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-3">
              <span className={`inline-block w-2 h-2 rounded-full ${cfg.dotClass}`} />
              <span className="text-xs font-medium text-white/85">
                {cfg.statusText}
              </span>
            </div>
          </div>

          {/* Right: gauge ring */}
          <GaugeRing
            percentage={nettoPct}
            strokeColor={cfg.ringStroke}
            trackColor={cfg.ringTrack}
          />
        </div>
      </div>

      {/* Secondary KPI tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        <KpiTile
          label="Umsatz"
          value={umsatz}
          accentColor="bg-primary/70"
          pctOfUmsatz={pct(umsatz)}
          maxPct={maxPct}
        />
        <KpiTile
          label="Aufwände"
          value={aufwaende}
          accentColor="bg-muted-foreground/40"
          pctOfUmsatz={pct(aufwaende)}
          maxPct={maxPct}
        />
        <KpiTile
          label="Gewinn"
          value={gewinn}
          accentColor="bg-emerald-500/70"
          pctOfUmsatz={pct(gewinn)}
          maxPct={maxPct}
        />
        <KpiTile
          label="SVS"
          value={svs}
          accentColor="bg-amber-500/50"
          pctOfUmsatz={pct(svs)}
          maxPct={maxPct}
        />
        <KpiTile
          label="ESt"
          value={est}
          accentColor="bg-amber-500/50"
          pctOfUmsatz={pct(est)}
          maxPct={maxPct}
          className="col-span-2 sm:col-span-1"
        />
      </div>
    </div>
  )
}
