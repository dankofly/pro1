import type { RechnerInput } from './rechner-types'

export interface RechnerPreset {
  id: string
  label: string
  description: string
  emoji: string
  input: Partial<RechnerInput>
}

export const RECHNER_PRESETS: RechnerPreset[] = [
  {
    id: 'freelancer_it',
    label: 'IT-Freelancer',
    description: '80k Umsatz, 15k Aufwände',
    emoji: '\u{1F4BB}',
    input: {
      jahresumsatz: 80000,
      aufwaendeGesamt: 15000,
      aufwaendeDetailed: false,
    },
  },
  {
    id: 'berater',
    label: 'Unternehmensberater',
    description: '120k Umsatz, 25k Aufwände',
    emoji: '\u{1F4CA}',
    input: {
      jahresumsatz: 120000,
      aufwaendeGesamt: 25000,
      aufwaendeDetailed: false,
    },
  },
  {
    id: 'handwerker',
    label: 'Handwerker',
    description: '60k Umsatz, 30k Aufwände',
    emoji: '\u{1F527}',
    input: {
      jahresumsatz: 60000,
      aufwaendeGesamt: 30000,
      aufwaendeDetailed: false,
    },
  },
  {
    id: 'kreativ',
    label: 'Kreativberuf',
    description: '40k Umsatz, 10k Aufwände',
    emoji: '\u{1F3A8}',
    input: {
      jahresumsatz: 40000,
      aufwaendeGesamt: 10000,
      aufwaendeDetailed: false,
    },
  },
  {
    id: 'startup',
    label: 'Startup',
    description: '200k Umsatz, 100k Aufwände',
    emoji: '\u{1F680}',
    input: {
      jahresumsatz: 200000,
      aufwaendeGesamt: 100000,
      aufwaendeDetailed: false,
    },
  },
]
