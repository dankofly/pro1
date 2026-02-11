// ============================================================
// AfA-Rechner (Absetzung für Abnutzung)
// Linear und degressiv nach österreichischem Steuerrecht
// ============================================================

import type { AfaMethode, InvestitionenInput, AfaResult } from './rechner-types'

// Nutzungsdauern in Jahren
const NUTZUNGSDAUER = {
  einrichtung: 8,
  edv: 4,
  maschinen: 8,
} as const

// Degressive AfA: max 30% (§ 7 Abs 1a EStG, seit 2020)
const DEGRESSIVE_RATE = 0.30

/** Lineare AfA: Betrag / Nutzungsdauer */
export function calcLinearAfA(betrag: number, nutzungsdauer: number): number {
  if (betrag <= 0 || nutzungsdauer <= 0) return 0
  return betrag / nutzungsdauer
}

/** Degressive AfA: Betrag × 30% (erstes Jahr), begrenzt durch linearen Vergleich */
export function calcDegressivAfA(betrag: number, nutzungsdauer: number): number {
  if (betrag <= 0) return 0
  const degressiv = betrag * DEGRESSIVE_RATE
  const linear = calcLinearAfA(betrag, nutzungsdauer)
  // Im ersten Jahr ist degressiv typisch höher, aber nie weniger als linear
  return Math.max(degressiv, linear)
}

/** AfA für eine einzelne Kategorie */
function calcKategorieAfA(betrag: number, methode: AfaMethode, nutzungsdauer: number): number {
  if (betrag <= 0) return 0
  return methode === 'degressiv'
    ? calcDegressivAfA(betrag, nutzungsdauer)
    : calcLinearAfA(betrag, nutzungsdauer)
}

/** Gesamt-AfA aller Investitionen berechnen */
export function calculateAfA(input: InvestitionenInput): AfaResult {
  const einrichtungJahr = calcKategorieAfA(input.einrichtung, input.einrichtungMethode, NUTZUNGSDAUER.einrichtung)
  const edvJahr = calcKategorieAfA(input.edv, input.edvMethode, NUTZUNGSDAUER.edv)
  const maschinenJahr = calcKategorieAfA(input.maschinen, input.maschinenMethode, NUTZUNGSDAUER.maschinen)

  return {
    einrichtungJahr,
    edvJahr,
    maschinenJahr,
    gesamt: einrichtungJahr + edvJahr + maschinenJahr,
  }
}

/** Gesamt-Investitionssumme (für IFB-Berechnung) */
export function getTotalInvestments(input: InvestitionenInput): number {
  return input.einrichtung + input.edv + input.maschinen
}
