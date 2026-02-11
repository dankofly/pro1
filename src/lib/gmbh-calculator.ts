// ============================================================
// GmbH / FlexKapG Vergleichsrechner
// Berechnet die Gesamtbelastung bei GmbH-Struktur
// ============================================================

import type { TaxYear } from './tax-constants'
import { YEAR_CONFIGS, calcProgressiveTax } from './tax-constants'
import type { GmbhResult } from './rechner-types'

// KöSt und KapESt Sätze (konstant über alle Jahre)
const KOEST_RATE = 0.23  // 23% seit 2024
const KAPEST_RATE = 0.275 // 27,5%

// ASVG DN-SV Satz für GF-Gehalt
const GF_SV_RATE = 0.1812

interface GmbhCalcInput {
  gewinn: number               // EPU-Gewinn (= Umsatz - Aufwände)
  gfGehaltMonatlich: number    // GF-Gehalt brutto/Monat
  year: TaxYear
  epuNetto: number             // EPU echtes Netto (zum Vergleich)
}

export function calculateGmbh(input: GmbhCalcInput): GmbhResult {
  const { gewinn, gfGehaltMonatlich, year, epuNetto } = input
  const cfg = YEAR_CONFIGS[year]

  // GF-Gehalt: 14 Gehälter (inkl. 13./14.)
  const gfGehaltBrutto = gfGehaltMonatlich * 14

  // GF Sozialversicherung (ASVG DN-Anteil)
  const svBasis = Math.min(gfGehaltBrutto, cfg.svHoechstbeitragsgrundlageAngestellt)
  const gfSv = svBasis * GF_SV_RATE

  // GF Lohnsteuer (vereinfacht: Brutto - SV - Werbungskostenpauschale → progressiv)
  const gfSteuerpflichtig = Math.max(0, gfGehaltBrutto - gfSv - cfg.werbungskostenpauschale)
  const gfLohnsteuer = calcProgressiveTax(gfSteuerpflichtig, year)

  // GF Netto
  const gfNetto = gfGehaltBrutto - gfSv - gfLohnsteuer

  // GmbH-Gewinn: Unternehmensgewinn minus GF-Gehalt als Betriebsausgabe
  // GF-Gehalt (inkl. AG-Anteil) ist Betriebsausgabe der GmbH
  // Vereinfacht: AG-SV ≈ 21% des GF-Brutto
  const agSvRate = 0.2112 // AG-Anteil ASVG
  const agSv = Math.min(gfGehaltBrutto, cfg.svHoechstbeitragsgrundlageAngestellt) * agSvRate
  const personalAufwand = gfGehaltBrutto + agSv

  const gewinnVorKoest = Math.max(0, gewinn - personalAufwand)

  // KöSt (23% seit 2024)
  const koest = gewinnVorKoest * KOEST_RATE
  const gewinnNachKoest = gewinnVorKoest - koest

  // Ausschüttung (gesamter Gewinn nach KöSt)
  const ausschuettung = gewinnNachKoest

  // KapESt auf Ausschüttung (27,5%)
  const kapest = ausschuettung * KAPEST_RATE

  // Gesamt-Netto: GF-Netto + Ausschüttung nach KapESt
  const gesamtNetto = gfNetto + ausschuettung - kapest

  const differenzZuEpu = gesamtNetto - epuNetto

  return {
    gewinnVorKoest,
    koest,
    gewinnNachKoest,
    gfGehaltBrutto,
    gfSv,
    gfLohnsteuer,
    gfNetto,
    ausschuettung,
    kapest,
    gesamtNetto,
    differenzZuEpu,
    vorteilhaft: differenzZuEpu > 0,
  }
}
