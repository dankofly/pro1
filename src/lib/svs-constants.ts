// SVS Beitragssätze - Österreich 2024/25
export const SVS = {
  PV_RATE: 0.185,          // Pensionsversicherung 18,5%
  KV_RATE: 0.068,          // Krankenversicherung 6,8%
  MV_RATE: 0.0153,         // Selbständigenvorsorge 1,53%
  UV_MONTHLY: 11.35,       // Unfallversicherung fix pro Monat
  GESAMT_RATE: 0.2683,     // PV + KV + MV = 26,83%
  GERINGFUEGIGKEIT: 6221.28,   // Geringfügigkeitsgrenze / Jahr
  HOECHSTBEITRAG: 84840,       // Höchstbeitragsgrundlage / Jahr
  STEUER_ERSPARNIS_RATE: 0.275, // Durchschnittliche Steuerersparnis 27,5%
} as const

export const SLIDER_MAX = 150000
export const SLIDER_STEP = 500
