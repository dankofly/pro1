'use client'

interface GaugeBarometerProps {
  riskPercent: number
}

function getColor(pct: number) {
  if (pct <= 25) return { stroke: '#34d399', text: 'Niedrig', label: 'text-emerald-400', bg: 'bg-emerald-500/15' }
  if (pct <= 50) return { stroke: '#fbbf24', text: 'Mittel', label: 'text-amber-400', bg: 'bg-amber-500/15' }
  if (pct <= 75) return { stroke: '#fb923c', text: 'Hoch', label: 'text-orange-400', bg: 'bg-orange-500/15' }
  return { stroke: '#f87171', text: 'Kritisch', label: 'text-red-400', bg: 'bg-red-500/15' }
}

export function GaugeBarometer({ riskPercent }: GaugeBarometerProps) {
  const circumference = Math.PI * 45 // Halbkreis
  const offset = circumference - (riskPercent / 100) * circumference
  const color = getColor(riskPercent)

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="110" viewBox="0 0 120 70">
        <path
          d="M 10 65 A 45 45 0 0 1 110 65"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 10 65 A 45 45 0 0 1 110 65"
          fill="none"
          stroke={color.stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.4s ease' }}
        />
        <text
          x="60"
          y="55"
          textAnchor="middle"
          style={{ fontSize: '18px', fill: color.stroke, fontFamily: 'ui-monospace, monospace', fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          {Math.round(riskPercent)}%
        </text>
      </svg>
      <div className={`inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full ${color.bg}`}>
        <span className={`text-sm font-semibold ${color.label}`}>
          Risiko: {color.text}
        </span>
      </div>
    </div>
  )
}
