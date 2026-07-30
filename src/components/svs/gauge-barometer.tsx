'use client'

interface GaugeBarometerProps {
  riskPercent: number
}

function getColor(pct: number) {
  if (pct <= 25) return { stroke: '#22c55e', text: 'Niedrig', label: 'text-sb-green', bg: 'bg-sb-green-soft' }
  if (pct <= 50) return { stroke: '#f59e0b', text: 'Mittel', label: 'text-sb-accent', bg: 'bg-sb-accent-soft' }
  if (pct <= 75) return { stroke: '#f97316', text: 'Hoch', label: 'text-sb-accent', bg: 'bg-sb-accent-soft' }
  return { stroke: '#ef4444', text: 'Kritisch', label: 'text-sb-red', bg: 'bg-sb-red/10' }
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
          className="stroke-slate-200 dark:stroke-slate-700"
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
          style={{ fontSize: '18px', fill: color.stroke, fontFamily: 'ui-monospace, monospace', fontWeight: 700 }}
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
