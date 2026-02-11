'use client'

import { useState, useMemo } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatEuro } from '@/lib/format'
import { type TaxYear, YEAR_CONFIGS } from '@/lib/tax-constants'

const COLORS = [
  'bg-emerald-400',
  'bg-emerald-500',
  'bg-amber-400',
  'bg-amber-500',
  'bg-orange-500',
  'bg-red-400',
  'bg-red-500',
]

const MAX = 150000

interface TaxBracketBarProps {
  steuerpflichtig: number
  year: TaxYear
}

export function TaxBracketBar({ steuerpflichtig, year }: TaxBracketBarProps) {
  const brackets = useMemo(() => {
    return YEAR_CONFIGS[year].taxBrackets
      .filter(b => b.from < MAX)
      .map((b, i) => ({
        from: b.from,
        to: Math.min(b.to, MAX),
        rate: Math.round(b.rate * 100),
        label: `${Math.round(b.rate * 100)}%`,
        color: COLORS[i] || COLORS[COLORS.length - 1],
      }))
  }, [year])
  const positionPercent = Math.min((steuerpflichtig / MAX) * 100, 100)
  const [openBracket, setOpenBracket] = useState<number | null>(null)

  // Find current bracket
  const currentBracket = brackets.findLast((b) => steuerpflichtig > b.from)
  const currentRate = currentBracket?.rate ?? 0

  return (
    <div className="glass rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Deine Steuerstufe
        </p>
        <span className="text-sm font-bold font-mono text-foreground">
          {currentRate}% Grenzsteuersatz
        </span>
      </div>

      <div className="relative">
        {/* Bar */}
        <div className="flex h-3 rounded-full overflow-hidden gap-px">
          {brackets.map((b) => {
            const width = ((b.to - b.from) / MAX) * 100
            return (
              <Popover key={b.rate} open={openBracket === b.rate} onOpenChange={(open) => setOpenBracket(open ? b.rate : null)}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`${b.color} ${steuerpflichtig < b.from ? 'opacity-25' : 'opacity-100'} transition-opacity duration-300 cursor-pointer hover:brightness-110 active:brightness-90 h-full`}
                    style={{ width: `${width}%` }}
                  />
                </PopoverTrigger>
                <PopoverContent side="top" align="center" className="text-xs px-3 py-2 w-auto">
                  <p className="font-bold">{b.label} Steuersatz</p>
                  <p className="text-muted-foreground">
                    {formatEuro(b.from)} – {formatEuro(b.to)}
                  </p>
                </PopoverContent>
              </Popover>
            )
          })}
        </div>

        {/* Position marker */}
        {steuerpflichtig > 0 && (
          <div
            className="absolute -top-1 transition-all duration-500 ease-out"
            style={{ left: `${positionPercent}%` }}
          >
            <div className="relative -translate-x-1/2">
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-foreground" />
            </div>
          </div>
        )}

        {/* Labels */}
        <div className="flex justify-between mt-2">
          {brackets.map((b) => (
            <span
              key={b.rate}
              className={`text-[10px] font-mono ${steuerpflichtig >= b.from ? 'text-foreground font-medium' : 'text-muted-foreground/50'} transition-colors`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
