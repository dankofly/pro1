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
  const svgHeight = 170
  const padTop = 16
  const padBottom = 30
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

  // Deductions branching out
  const deductions = [
    { value: aufwaende, idx: 1, color: '#f87171', label: 'Aufw.' },
    { value: svs, idx: 2, color: '#fb923c', label: 'SVS' },
    { value: est, idx: 3, color: '#fbbf24', label: 'ESt' },
  ]

  const flowVals = [umsatz, afterAufwaende, afterSvs, afterEst]

  return (
    <div className="visual-card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20">
          <ArrowRightLeft className="h-3.5 w-3.5 text-teal-400" />
        </div>
        <span className="text-sm font-semibold text-slate-100">Geldfluss-Diagramm</span>
      </div>

      {/* Top labels */}
      <div className="flex justify-between items-end mb-1 px-1 gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Umsatz</p>
          <p className="text-sm font-bold font-mono text-blue-400 truncate">{formatEuro(umsatz)}</p>
        </div>
        <div className="text-right min-w-0">
          <p className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Netto</p>
          <p className="text-sm font-bold font-mono text-emerald-400 truncate">{formatEuro(netto)}</p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Geldfluss: ${formatEuro(umsatz)} Umsatz minus ${formatEuro(aufwaende)} Aufwände, ${formatEuro(svs)} SVS, ${formatEuro(est)} ESt ergibt ${formatEuro(netto)} Netto`}
      >
        <defs>
          <linearGradient id="flowGradMain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="flowGradNetto" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="flowGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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
              fill={isLast ? 'url(#flowGradNetto)' : 'url(#flowGradMain)'}
              filter="url(#flowGlow)"
              className="transition-[d,opacity] duration-500"
              opacity={isLast ? 0.85 : 0.75 + i * 0.05}
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
              {/* Label + amount on one line */}
              <text
                x={x}
                y={labelY}
                textAnchor="middle"
                fill="currentColor"
              >
                <tspan
                  style={{ fontSize: '9.5px', fontWeight: 500, letterSpacing: '0.02em' }}
                  opacity={0.5}
                >
                  {ded.label}
                </tspan>
                <tspan
                  style={{ fontSize: '10.5px', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}
                >
                  {' '}{formatEuro(ded.value)}
                </tspan>
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
