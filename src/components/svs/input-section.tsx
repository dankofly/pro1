'use client'

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
    <div className="glass rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900">
          <Pencil className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 font-heading">
          Deine Angaben
        </h2>
      </div>

      <div className="space-y-8">
        {/* Jahresgewinn */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Label htmlFor="gewinn" className="text-sm font-medium text-slate-700">
              Voraussichtlicher Jahresgewinn
            </Label>
            <SvsTooltip term="Beitragsgrundlage" />
          </div>

          <div className="flex items-baseline gap-3">
            <div className="relative max-w-[220px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                EUR
              </span>
              <Input
                id="gewinn"
                value={gewinn.toLocaleString('de-AT')}
                onChange={handleGewinnInput}
                className="pl-14 text-right font-mono text-xl font-semibold tracking-tight h-12 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
            </div>
            <span className="text-sm font-medium text-slate-400">/ Jahr</span>
          </div>

          <div className="pt-1">
            <input
              type="range"
              min="0"
              max={SLIDER_MAX}
              step={SLIDER_STEP}
              value={gewinn}
              onChange={(e) => setGewinn(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-1.5">
              <span>0</span>
              <span>50k</span>
              <span>100k</span>
              <span>150k</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200/60" />

        {/* Monatliche Vorschreibung */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Label htmlFor="vorschreibung" className="text-sm font-medium text-slate-700">
              Aktuelle monatliche SVS-Vorschreibung
            </Label>
            <SvsTooltip term="Vorläufige Beitragsgrundlage" />
          </div>

          <div className="flex items-baseline gap-3">
            <div className="relative max-w-[220px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                EUR
              </span>
              <Input
                id="vorschreibung"
                value={vorschreibung > 0 ? vorschreibung.toLocaleString('de-AT') : ''}
                onChange={handleVorschreibungInput}
                placeholder="0"
                className="pl-14 text-right font-mono text-xl font-semibold tracking-tight h-12 rounded-xl border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
            </div>
            <span className="text-sm font-medium text-slate-400">/ Monat</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Den Betrag findest du auf deiner SVS-Vorschreibung (Quartalsabrechnung / 3).
          </p>
        </div>
      </div>
    </div>
  )
}
