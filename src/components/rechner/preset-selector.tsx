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
    <div className="flex flex-wrap gap-2" role="group" aria-label="Schnellstart-Szenarien">
      {RECHNER_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => dispatch({ type: 'LOAD_PRESET', preset: preset.input })}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            ${isActive(preset)
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground'
            }`}
          title={preset.description}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
