'use client'

import { RECHNER_PRESETS, type RechnerPreset } from '@/lib/rechner-presets'
import type { RechnerAction, RechnerInput } from '@/lib/rechner-types'

interface PresetSelectorProps {
  currentInput: RechnerInput
  dispatch: React.Dispatch<RechnerAction>
}

export function PresetSelector({ currentInput, dispatch }: PresetSelectorProps) {
  const isActive = (preset: RechnerPreset) => {
    const p = preset.input
    return (
      p.jahresumsatz === currentInput.jahresumsatz &&
      p.aufwaendeGesamt === currentInput.aufwaendeGesamt
    )
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x" role="group" aria-label="Schnellstart-Szenarien">
      {RECHNER_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => dispatch({ type: 'LOAD_PRESET', preset: preset.input })}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 snap-start
            ${isActive(preset)
              ? 'border-primary bg-primary/5 text-primary shadow-sm'
              : 'border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground'
            }`}
          title={preset.description}
        >
          <span className="mr-1">{preset.emoji}</span>
          {preset.label}
        </button>
      ))}
    </div>
  )
}
