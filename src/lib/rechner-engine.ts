// ============================================================
// Rechner Engine – Zentraler Orchestrator
// Nimmt RechnerInput → berechnet alles → gibt RechnerResult zurück
// ============================================================

import type {
  RechnerInput,
  RechnerResult,
  PauschalierungResult,
  GewinnmaximiererResult,
  VorauszahlungenResult,
  ArbeitsplatzpauschaleType,
  PauschalierungArt,
} from './rechner-types'
import type { TaxYear } from './tax-constants'
import type { ProOptions } from './svs-calculator'
import { calculateSvs, calculateSteuerTipps } from './svs-calculator'
import { calculateAfA, getTotalInvestments } from './afa-calculator'
import { calculateGmbh } from './gmbh-calculator'

// ── Arbeitsplatzpauschale Werte ─────────────────────────────

const ARBEITSPLATZPAUSCHALE: Record<ArbeitsplatzpauschaleType, number> = {
  keine: 0,
  klein: 300,
  gross: 1200,
}

// ── Pauschalierung Sätze ────────────────────────────────────

const PAUSCHALIERUNG_RATES: Record<Exclude<PauschalierungArt, 'keine'>, number> = {
  basis_12: 0.12,
  basis_6: 0.06,
  ku_produzent: 0.45,
  ku_dienstleister: 0.20,
}

const PAUSCHALIERUNG_UMSATZGRENZE: Record<Exclude<PauschalierungArt, 'keine'>, number> = {
  basis_12: 220000,
  basis_6: 220000,
  ku_produzent: 35000,
  ku_dienstleister: 35000,
}

// ── Hilfsfunktionen ─────────────────────────────────────────

/** Aufwände aus Breakdown berechnen */
function calcAufwaendeFromBreakdown(input: RechnerInput): number {
  const a = input.aufwaende
  return (
    a.personalkosten +
    a.wareneinkauf +
    a.reisekosten +
    ARBEITSPLATZPAUSCHALE[a.arbeitsplatzpauschale] +
    a.oepnvPauschale * 0.5 +  // ÖPNV: 50% absetzbar
    a.sonstigeAufwaende
  )
}

/** Effektive Aufwände berechnen (Breakdown oder Gesamt) */
function calcEffektiveAufwaende(input: RechnerInput): number {
  const basisAufwaende = input.aufwaendeDetailed
    ? calcAufwaendeFromBreakdown(input)
    : input.aufwaendeGesamt

  // AfA dazurechnen (ist auch Betriebsausgabe)
  const afa = calculateAfA(input.investitionen)

  return basisAufwaende + afa.gesamt
}

/** ProOptions für SVS-Calculator konvertieren */
function toSvsProOptions(input: RechnerInput): ProOptions {
  const totalInvest = getTotalInvestments(input.investitionen)
  return {
    kinderUnter18: input.proOptions.kinderUnter18,
    kinderUeber18: input.proOptions.kinderUeber18,
    alleinverdiener: input.proOptions.alleinverdiener,
    pendlerKm: input.proOptions.pendlerKm,
    pendlerOeffentlich: input.proOptions.pendlerOeffentlich,
    investitionen: totalInvest,
  }
}

/** Prüft ob Pauschalierung verfügbar ist */
export function isPauschalierungVerfuegbar(art: PauschalierungArt, umsatz: number): boolean {
  if (art === 'keine') return true
  return umsatz <= PAUSCHALIERUNG_UMSATZGRENZE[art]
}

/** Pauschalierung berechnen */
function calcPauschalierung(
  input: RechnerInput,
  standardNetto: number,
  proOptions: ProOptions,
): PauschalierungResult | null {
  const art = input.pauschalierungArt
  if (art === 'keine') return null
  if (!isPauschalierungVerfuegbar(art, input.jahresumsatz)) return null

  const rate = PAUSCHALIERUNG_RATES[art]
  const pauschalAufwaende = input.jahresumsatz * rate
  const gewinnPauschal = Math.max(0, input.jahresumsatz - pauschalAufwaende)

  // SVS+ESt auf pauschalierten Gewinn berechnen
  const svsResult = calculateSvs(gewinnPauschal, 0, input.year, proOptions)
  const echtesNettoPauschal = svsResult.echtesNetto

  return {
    art,
    pauschalAufwaende,
    gewinnPauschal,
    svsResult,
    echtesNettoPauschal,
    differenzZuStandard: echtesNettoPauschal - standardNetto,
    vorteilhaft: echtesNettoPauschal > standardNetto,
  }
}

/** Gewinnmaximierer berechnen */
function calcGewinnmaximierer(
  input: RechnerInput,
  basisGewinn: number,
  basisNetto: number,
  proOptions: ProOptions,
): GewinnmaximiererResult | null {
  const { zusatzEinnahmen, zusatzAufwaende } = input.gewinnmaximierer
  if (zusatzEinnahmen <= 0 && zusatzAufwaende <= 0) return null

  const umsatzMit = input.jahresumsatz + zusatzEinnahmen
  const aufwaendeMit = calcEffektiveAufwaende(input) + zusatzAufwaende
  const gewinnMit = Math.max(0, umsatzMit - aufwaendeMit)

  const svsResult = calculateSvs(gewinnMit, 0, input.year, proOptions)
  const nettoMit = svsResult.echtesNetto
  const nettoDifferenz = nettoMit - basisNetto

  // Abgabenquote auf den Zusatzgewinn
  const zusatzGewinn = gewinnMit - basisGewinn
  const zusatzAbgaben = zusatzGewinn - nettoDifferenz
  const abgabenquoteZusatz = zusatzGewinn > 0 ? zusatzAbgaben / zusatzGewinn : 0

  return {
    umsatzMit,
    aufwaendeMit,
    gewinnMit,
    svsResult,
    nettoMit,
    nettoDifferenz,
    abgabenquoteZusatz,
  }
}

/** Vorauszahlungen berechnen */
function calcVorauszahlungen(
  input: RechnerInput,
  endgueltigeSVS: number,
  einkommensteuer: number,
): VorauszahlungenResult {
  const svJaehrlich = input.vorauszahlungen.svVorauszahlung
  const svMonatlich = svJaehrlich / 12
  const svDifferenz = endgueltigeSVS - svJaehrlich

  const estJaehrlich = input.vorauszahlungen.estVorauszahlung
  const estQuartal = estJaehrlich / 4
  const estDifferenz = einkommensteuer - estJaehrlich

  return {
    svMonatlich,
    svJaehrlich,
    svDifferenz,
    estQuartal,
    estJaehrlich,
    estDifferenz,
  }
}

// ── Hauptberechnung ─────────────────────────────────────────

export function calculateAll(input: RechnerInput): RechnerResult {
  const year: TaxYear = input.year

  // 1. Aufwände und Gewinn
  const aufwaendeEffektiv = calcEffektiveAufwaende(input)
  const gewinn = Math.max(0, input.jahresumsatz - aufwaendeEffektiv)

  // 2. AfA
  const afa = calculateAfA(input.investitionen)

  // 3. ProOptions konvertieren
  const proOptions = toSvsProOptions(input)

  // 4. Haupt-SVS+ESt Berechnung
  // Vorschreibung = 0, da wir die Vorauszahlungen separat tracken
  const svs = calculateSvs(gewinn, 0, year, proOptions)

  // 5. Pauschalierung (wenn aktiv)
  const pauschalierung = calcPauschalierung(input, svs.echtesNetto, proOptions)

  // 6. GmbH Vergleich (wenn aktiv)
  const gmbh = input.gmbh.aktiv
    ? calculateGmbh({
        gewinn,
        gfGehaltMonatlich: input.gmbh.gfGehaltMonatlich,
        year,
        epuNetto: svs.echtesNetto,
      })
    : null

  // 7. Gewinnmaximierer
  const gewinnmaximierer = calcGewinnmaximierer(
    input, gewinn, svs.echtesNetto, proOptions,
  )

  // 8. Vorauszahlungen
  const vorauszahlungen = calcVorauszahlungen(
    input, svs.endgueltigeSVS, svs.einkommensteuer,
  )

  // 9. Steuer-Tipps
  const steuerTipps = calculateSteuerTipps(gewinn, svs.endgueltigeSVS, year)

  return {
    umsatz: input.jahresumsatz,
    aufwaendeEffektiv,
    gewinn,
    svs,
    afa,
    pauschalierung,
    gmbh,
    gewinnmaximierer,
    vorauszahlungen,
    steuerTipps,
    year,
  }
}
