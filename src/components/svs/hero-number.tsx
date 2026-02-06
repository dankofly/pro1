'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useAnimatedNumber } from '@/hooks/use-animated-number'
import { TrendingUp } from 'lucide-react'

interface HeroNumberProps {
  echtesNetto: number
  gewinn: number
}

export function HeroNumber({ echtesNetto, gewinn }: HeroNumberProps) {
  const [monthly, setMonthly] = useState(false)
  const displayValue = monthly ? echtesNetto / 12 : echtesNetto
  const animated = useAnimatedNumber(displayValue)
  const nettoPercent = gewinn > 0 ? (echtesNetto / gewinn) * 100 : 0

  const formatted = animated.toLocaleString('de-AT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return (
    <div className="text-center py-6 animate-fade-up">
      <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
        Das bleibt dir wirklich
      </p>
      <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald-500 num-transition tracking-tight">
        {formatted}
      </p>
      <div className="flex items-center justify-center gap-3 mt-4">
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-mono">
          <TrendingUp className="h-3 w-3 mr-1" />
          {nettoPercent.toFixed(1)}% Netto
        </Badge>
        <div className="flex items-center gap-2">
          <Label htmlFor="hero-toggle" className="text-xs text-muted-foreground cursor-pointer">
            Jährlich
          </Label>
          <Switch
            id="hero-toggle"
            checked={monthly}
            onCheckedChange={setMonthly}
            className="scale-75"
          />
          <Label htmlFor="hero-toggle" className="text-xs text-muted-foreground cursor-pointer">
            Monatlich
          </Label>
        </div>
      </div>
    </div>
  )
}
