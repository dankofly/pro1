'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SvsTooltip } from './svs-tooltip'
import { SLIDER_MAX, SLIDER_STEP } from '@/lib/svs-constants'
import { Pencil } from 'lucide-react'

interface InputSectionProps {
  gewinn: number
  setGewinn: (v: number) => void
  vorschreibung: number
  setVorschreibung: (v: number) => void
}

export function InputSection({ gewinn, setGewinn, vorschreibung, setVorschreibung }: InputSectionProps) {
  const handleGewinnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    setGewinn(Math.min(Number(val) || 0, 200000))
  }

  const handleVorschreibungInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.')
    setVorschreibung(Math.min(Number(val) || 0, 5000))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <Pencil className="h-4 w-4 text-blue-600" />
          </div>
          Deine Angaben
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Jahresgewinn */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Label htmlFor="gewinn" className="text-sm font-medium">
              Voraussichtlicher Jahresgewinn
            </Label>
            <SvsTooltip term="Beitragsgrundlage" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative max-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
              <Input
                id="gewinn"
                value={gewinn.toLocaleString('de-AT')}
                onChange={handleGewinnInput}
                className="pl-8 text-right font-mono text-lg font-medium"
              />
            </div>
            <span className="text-sm text-muted-foreground">/ Jahr</span>
          </div>
          <input
            type="range"
            min="0"
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            value={gewinn}
            onChange={(e) => setGewinn(Number(e.target.value))}
            className="w-full h-2 rounded-full bg-blue-100 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€ 0</span>
            <span>€ 50.000</span>
            <span>€ 100.000</span>
            <span>€ 150.000</span>
          </div>
        </div>

        {/* Monatliche Vorschreibung */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Label htmlFor="vorschreibung" className="text-sm font-medium">
              Aktuelle monatliche SVS-Vorschreibung
            </Label>
            <SvsTooltip term="Vorläufige Beitragsgrundlage" />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative max-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
              <Input
                id="vorschreibung"
                value={vorschreibung > 0 ? vorschreibung.toLocaleString('de-AT') : ''}
                onChange={handleVorschreibungInput}
                placeholder="0"
                className="pl-8 text-right font-mono text-lg font-medium"
              />
            </div>
            <span className="text-sm text-muted-foreground">/ Monat</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Den Betrag findest du auf deiner SVS-Vorschreibung (Quartalsabrechnung ÷ 3).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
