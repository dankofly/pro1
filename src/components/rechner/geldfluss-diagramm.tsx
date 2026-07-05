'use client'

import { formatEuro } from '@/lib/format'
import { ArrowRightLeft } from 'lucide-react'

interface GeldflussDiagrammProps {
  umsatz: number
  aufwaende: number
  gewinn: number
  svs: number
  est: number
  netto: number
}

export function GeldflussDiagramm({ umsatz, aufwaende, gewinn, svs, est, netto }: GeldflussDiagrammProps) {
  if (umsatz <= 0) return null

  const svgWidth = 600
  const svgHeight = 180
  const padTop = 20
  const padBottom = 35
  const padX = 12
  const usableH = svgHeight - padTop - padBottom
  const usableW = svgWidth - padX * 2

  const maxFlow = umsatz
  const scaleH = (v: number) => Math.max((Math.abs(v) / maxFlow) * usableH, 4)

  // Flow stages: what remains at each point
  const afterAufwaende = Math.max(gewinn, 0)
  const afterSvs = Math.max(afterAufwaende - svs, 0)
  const afterEst = Math.max(netto, 0)

  // Column x-positions (5 points)
  const colCount = 4
  const colSpacing = usableW / colCount
  const colX = (i: number) => padX + i * colSpacing

  // Abzugs-Farben: Mitteltoene, die auf hellem und dunklem Hintergrund lesbar bleiben.
  // Nur fuer Hairlines und Punkte (mit Opacity), keine Flaechen. Bei Token-Umbau: hsl(var(--destructive)) etc.
  const DEDUCTION_RED = '#e05858'    // Aufwaende
  const DEDUCTION_ORANGE = '#e68f3c' // SVS
  const DEDUCTION_GOLD = '#d4a72c'   // ESt

  // Deductions branching out
  const deductions = [
    { value: aufwaende, idx: 1, color: DEDUCTION_RED, label: 'Aufw.' },
    { value: svs, idx: 2, color: DEDUCTION_ORANGE, label: 'SVS' },
    { value: est, idx: 3, color: DEDUCTION_GOLD, label: 'ESt' },
  ]

  const flowVals = [umsatz, afterAufwaende, afterSvs, afterEst]

  return (
    <div className="card-surface p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/15">
          <ArrowRightLeft className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
        </div>
        <span className="section-header">Geldfluss-Diagramm</span>
      </div>

      {/* Top labels */}
      <div className="flex justify-between items-end mb-1 px-1 gap-2">
        <div className="min-w-0">
          <p className="section-header">Umsatz</p>
          <p className="text-lg font-bold font-mono tabular-nums text-primary truncate">{formatEuro(umsatz)}</p>
        </div>
        <div className="text-right min-w-0">
          <p className="section-header">Netto</p>
          <p className="text-lg font-bold font-mono tabular-nums text-emerald-600 truncate">{formatEuro(netto)}</p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Geldfluss: ${formatEuro(umsatz)} Umsatz minus ${formatEuro(aufwaende)} Aufwände, ${formatEuro(svs)} SVS, ${formatEuro(est)} ESt ergibt ${formatEuro(netto)} Netto`}
      >
        {/* Main flow bars */}
        {flowVals.map((_, i) => {
          if (i >= flowVals.length - 1) return null
          const x1 = colX(i)
          const x2 = colX(i + 1)
          const h1 = scaleH(flowVals[i])
          const h2 = scaleH(flowVals[i + 1])
          const y1Top = padTop + (usableH - h1) / 2
          const y2Top = padTop + (usableH - h2) / 2
          const midX = (x1 + x2) / 2
          const isLast = i === flowVals.length - 2

          return (
            <path
              key={`flow-${i}`}
              d={`
                M${x1},${y1Top}
                C${midX},${y1Top} ${midX},${y2Top} ${x2},${y2Top}
                L${x2},${y2Top + h2}
                C${midX},${y2Top + h2} ${midX},${y1Top + h1} ${x1},${y1Top + h1}
                Z
              `}
              className={`transition-opacity duration-500 ${isLast ? 'fill-emerald-500 dark:fill-emerald-400' : 'fill-blue-600 dark:fill-blue-400'}`}
              opacity={isLast ? 0.85 : 0.8 + i * 0.05}
            />
          )
        })}

        {/* Deduction hairlines + labels */}
        {deductions.map((ded) => {
          const x = colX(ded.idx)
          const flowH = scaleH(flowVals[ded.idx - 1])
          const yCenter = padTop + usableH / 2
          const yFlowBottom = yCenter + flowH / 2
          const labelY = svgHeight - 6

          return (
            <g key={`ded-${ded.idx}`}>
              {/* Vertical hairline */}
              <line
                x1={x} y1={yFlowBottom + 1}
                x2={x} y2={labelY - 14}
                stroke={ded.color}
                strokeWidth={0.75}
                opacity={0.35}
                className="transition-all duration-500"
              />
              {/* Small dot at beam junction */}
              <circle
                cx={x} cy={yFlowBottom + 1}
                r={2.5}
                fill={ded.color}
                opacity={0.7}
                className="transition-all duration-500"
              />
              {/* Label + amount on one line (auf Mobile ausgeblendet, dort HTML-Legende unter dem Diagramm) */}
              <text
                x={x}
                y={labelY}
                textAnchor="middle"
                fill="currentColor"
                className="hidden sm:inline"
              >
                <tspan
                  style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.02em' }}
                  opacity={0.5}
                >
                  {ded.label}
                </tspan>
                <tspan
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {' '}{formatEuro(ded.value)}
                </tspan>
              </text>
            </g>
          )
        })}
      </svg>

      {/* Mobile-Legende: SVG-Innenlabels sind auf kleinen Screens zu klein */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:hidden">
        {deductions.map((ded) => (
          <div key={ded.label} className="flex items-center gap-1.5 text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: ded.color }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{ded.label}</span>
            <span className="font-mono font-semibold tabular-nums">{formatEuro(ded.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
