'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatEuro } from '@/lib/format'

const BRACKETS = [
  { from: 0, to: 12816, rate: 0, label: '0%', color: 'bg-emerald-400' },
  { from: 12816, to: 20818, rate: 20, label: '20%', color: 'bg-emerald-500' },
  { from: 20818, to: 34513, rate: 30, label: '30%', color: 'bg-amber-400' },
  { from: 34513, to: 66612, rate: 40, label: '40%', color: 'bg-amber-500' },
  { from: 66612, to: 99266, rate: 48, label: '48%', color: 'bg-orange-500' },
  { from: 99266, to: 150000, rate: 50, label: '50%', color: 'bg-red-500' },
]

const MAX = 150000

interface TaxBracketBarProps {
  steuerpflichtig: number
}

export function TaxBracketBar({ steuerpflichtig }: TaxBracketBarProps) {
  const positionPercent = Math.min((steuerpflichtig / MAX) * 100, 100)
  const [openBracket, setOpenBracket] = useState<number | null>(null)

  // Find current bracket
  const currentBracket = BRACKETS.findLast((b) => steuerpflichtig > b.from)
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
          {BRACKETS.map((b) => {
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
          {BRACKETS.map((b) => (
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
