// SVS UI-Konstanten + Re-Exports aus tax-constants.ts
import { YEAR_CONFIGS } from './tax-constants'

export { YEAR_CONFIGS, TAX_YEARS, type TaxYear } from './tax-constants'

export const SLIDER_MAX = 150000
export const SLIDER_STEP = 500

// Legacy-Alias: Standardjahr 2025
const cfg = YEAR_CONFIGS['2025'].svs
export const SVS = {
  PV_RATE: cfg.pvRate,
  KV_RATE: cfg.kvRate,
  MV_RATE: cfg.mvRate,
  UV_MONTHLY: cfg.uvMonthly,
  GESAMT_RATE: cfg.gesamtRate,
  GERINGFUEGIGKEIT: cfg.geringfuegigkeit,
  HOECHSTBEITRAG: cfg.hoechstbeitrag,
  STEUER_ERSPARNIS_RATE: 0.275,
} as const
