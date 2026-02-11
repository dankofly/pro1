'use client'

import { formatEuro } from '@/lib/format'

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
  const padTop = 28
  const padBottom = 40
  const padX = 12
  const usableH = svgHeight - padTop - padBottom
  const usableW = svgWidth - padX * 2

  const maxFlow = umsatz
  const scaleH = (v: number) => Math.max((Math.abs(v) / maxFlow) * usableH, 4)

  // Flow stages: what remains at each point
  const afterAufwaende = Math.max(gewinn, 0)
  const afterSvs = Math.max(afterAufwaende - svs, 0)
  const afterEst = Math.max(netto, 0)

  // 4 segments
  const segments = [
    { from: umsatz, to: afterAufwaende, label: '' },
    { from: afterAufwaende, to: afterSvs, label: '' },
    { from: afterSvs, to: afterEst, label: '' },
  ]

  // Column x-positions (5 points)
  const colCount = 4
  const colSpacing = usableW / colCount
  const colX = (i: number) => padX + i * colSpacing

  // Deductions branching out
  const deductions = [
    { value: aufwaende, idx: 1, color: '#ef4444', label: 'Aufw.' },
    { value: svs, idx: 2, color: '#f58220', label: 'SVS' },
    { value: est, idx: 3, color: '#eab308', label: 'ESt' },
  ]

  const flowVals = [umsatz, afterAufwaende, afterSvs, afterEst]

  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        Geldfluss-Diagramm
      </p>

      {/* Top labels */}
      <div className="flex justify-between items-end mb-1 px-1">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Umsatz</p>
          <p className="text-sm font-bold font-mono text-primary">{formatEuro(umsatz)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Netto</p>
          <p className="text-sm font-bold font-mono text-emerald-600">{formatEuro(netto)}</p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Geldfluss: ${formatEuro(umsatz)} Umsatz minus ${formatEuro(aufwaende)} Aufw\u00e4nde, ${formatEuro(svs)} SVS, ${formatEuro(est)} ESt ergibt ${formatEuro(netto)} Netto`}
      >
        {/* Main flow bars */}
        {flowVals.map((val, i) => {
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
              fill={isLast ? 'hsl(160, 84%, 39%)' : 'hsl(207, 100%, 38%)'}
              opacity={isLast ? 0.85 : 0.7 + i * 0.05}
              className="transition-all duration-500"
            />
          )
        })}

        {/* Deduction branches */}
        {deductions.map((ded) => {
          const x = colX(ded.idx)
          const flowH = scaleH(flowVals[ded.idx - 1])
          const yCenter = padTop + usableH / 2
          const yFlowBottom = yCenter + flowH / 2
          const dedH = Math.max(scaleH(ded.value) * 0.45, 8)

          return (
            <g key={`ded-${ded.idx}`}>
              <rect
                x={x - 16}
                y={yFlowBottom + 2}
                width={32}
                height={dedH}
                rx={4}
                fill={ded.color}
                opacity={0.65}
                className="transition-all duration-500"
              />
              <text
                x={x}
                y={yFlowBottom + dedH + 14}
                textAnchor="middle"
                fill="currentColor"
                className="text-muted-foreground"
                style={{ fontSize: '10px', fontWeight: 500 }}
              >
                {ded.label}
              </text>
              <text
                x={x}
                y={yFlowBottom + dedH + 26}
                textAnchor="middle"
                fill="currentColor"
                className="text-foreground"
                style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 600 }}
              >
                {formatEuro(ded.value)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
