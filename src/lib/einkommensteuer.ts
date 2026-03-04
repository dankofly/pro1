// ============================================================
// Einkommensteuer-Rechner – Oesterreich 2024 / 2025 / 2026
//
// Standalone ESt-Berechnung fuer unselbstaendige UND
// selbstaendige Einkuenfte mit Absetzbetraegen.
//
// Nutzt die zentrale tax-constants.ts als Single Source of Truth
// fuer Tarifstufen, Absetzbetraege und Pendlerpauschale.
// ============================================================

import {
  type TaxYear,
  TAX_YEARS,
  YEAR_CONFIGS,
  type TaxBracket,
  calcProgressiveTax,
  getGrenzsteuersatz,
  calcAvab,
  calcPendlerpauschale,
} from './tax-constants'

// Re-export for page consumers
export { type TaxYear, TAX_YEARS, YEAR_CONFIGS, type TaxBracket }

// ── Types ──────────────────────────────────────────────────

export type PendlerType = 'keine' | 'klein' | 'gross'

export interface EStInput {
  bruttoeinkommen: number
  kinder: number
  kinderUeber18: number
  alleinverdiener: boolean
  alleinerzieher: boolean
  werbungskosten: number
  pendlerpauschale: PendlerType
  pendlerKm: number
  isSelbstaendig: boolean
  year: TaxYear
}

export interface AbsetzbetragDetail {
  name: string
  betrag: number
}

export interface StufeDetail {
  stufe: string
  von: number
  bis: number
  rate: number
  betrag: number
  steuer: number
}

export interface EStResult {
  // Kernwerte
  bruttoeinkommen: number
  werbungskosten: number
  pendlerpauschale: number
  steuerbaresEinkommen: number
  steuerBrutto: number
  absetzbetraegeGesamt: number
  steuer: number
  grenzsteuersatz: number
  effektivsteuersatz: number
  netto: number

  // Details
  absetzbetraege: AbsetzbetragDetail[]
  stufenDetails: StufeDetail[]

  // Wasserfall-Schritte (Brutto -> Netto)
  wasserfall: WasserfallStep[]
}

export interface WasserfallStep {
  label: string
  betrag: number
  laufend: number
  typ: 'start' | 'abzug' | 'bonus' | 'ergebnis'
}

// ── Berechnung ──────────────────────────────────────────────

export function calculateEinkommensteuer(input: EStInput): EStResult {
  const yc = YEAR_CONFIGS[input.year]
  const brackets = yc.taxBrackets
  const absetzCfg = yc.absetzbetraege

  // 1. Werbungskosten: Eingabe oder Pauschale (hoeherer Betrag)
  const werbungskostenpauschale = yc.werbungskostenpauschale
  const werbungskosten = Math.max(input.werbungskosten, werbungskostenpauschale)

  // 2. Pendlerpauschale berechnen
  let pendlerBetrag = 0
  if (input.pendlerpauschale !== 'keine' && input.pendlerKm >= 2) {
    const oeffentlich = input.pendlerpauschale === 'klein'
    pendlerBetrag = calcPendlerpauschale(input.pendlerKm, oeffentlich, input.year)
  }

  // 3. Steuerbares Einkommen
  const steuerbaresEinkommen = Math.max(
    0,
    input.bruttoeinkommen - werbungskosten - pendlerBetrag
  )

  // 4. Steuer brutto (progressiver Tarif)
  const steuerBrutto = calcProgressiveTax(steuerbaresEinkommen, input.year)

  // 5. Grenzsteuersatz
  const grenzsteuersatz = getGrenzsteuersatz(steuerbaresEinkommen, input.year)

  // 6. Stufendetails berechnen
  const stufenDetails: StufeDetail[] = brackets
    .filter(b => b.to !== Infinity || steuerbaresEinkommen > b.from)
    .map(b => {
      const betragInStufe = Math.max(0, Math.min(steuerbaresEinkommen, b.to) - b.from)
      return {
        stufe: `${b.from.toLocaleString('de-AT')} – ${b.to === Infinity ? '...' : b.to.toLocaleString('de-AT')}`,
        von: b.from,
        bis: b.to,
        rate: b.rate,
        betrag: betragInStufe,
        steuer: betragInStufe * b.rate,
      }
    })

  // 7. Absetzbetraege sammeln
  const absetzbetraege: AbsetzbetragDetail[] = []

  // Verkehrsabsetzbetrag (nur fuer Unselbstaendige)
  if (!input.isSelbstaendig) {
    absetzbetraege.push({
      name: 'Verkehrsabsetzbetrag',
      betrag: absetzCfg.verkehrsabsetzbetrag,
    })
  }

  // Familienbonus Plus
  const familienbonusU18 = input.kinder * absetzCfg.familienbonusUnder18
  const familienbonusUe18 = input.kinderUeber18 * absetzCfg.familienbonusOver18
  const familienbonusGesamt = familienbonusU18 + familienbonusUe18

  if (familienbonusU18 > 0) {
    absetzbetraege.push({
      name: `Familienbonus Plus (${input.kinder}x Kind <18)`,
      betrag: familienbonusU18,
    })
  }
  if (familienbonusUe18 > 0) {
    absetzbetraege.push({
      name: `Familienbonus Plus (${input.kinderUeber18}x Kind 18+)`,
      betrag: familienbonusUe18,
    })
  }

  // Alleinverdiener- oder Alleinerzieherabsetzbetrag
  const gesamtKinder = input.kinder + input.kinderUeber18
  if (input.alleinverdiener && gesamtKinder > 0) {
    const avab = calcAvab(gesamtKinder, input.year)
    absetzbetraege.push({
      name: 'Alleinverdienerabsetzbetrag',
      betrag: avab,
    })
  } else if (input.alleinerzieher && gesamtKinder > 0) {
    const aeab = calcAvab(gesamtKinder, input.year)
    absetzbetraege.push({
      name: 'Alleinerzieherabsetzbetrag',
      betrag: aeab,
    })
  }

  // 8. Absetzbetraege summieren und anwenden
  const absetzbetraegeGesamt = absetzbetraege.reduce((sum, a) => sum + a.betrag, 0)

  // Absetzbetraege reduzieren die Steuer (nicht unter 0, es sei denn Kindermehrbetrag)
  let steuerNachAbsetz = steuerBrutto - absetzbetraegeGesamt

  // Kindermehrbetrag: Wenn Steuer nach Familienbonus negativ wird,
  // wird der Familienbonus nicht voll genutzt. Dann gibt es den
  // Kindermehrbetrag als Negativsteuer (max EUR 700 pro Kind, nur fuer Kinder <18)
  let kindermehrbetrag = 0
  if (steuerNachAbsetz < 0 && input.kinder > 0) {
    // Berechne wie viel Familienbonus nicht aufgebraucht wurde
    const ungenutzterFBonus = Math.abs(steuerNachAbsetz)
    const maxKindermehrbetrag = input.kinder * absetzCfg.kindermehrbetrag
    kindermehrbetrag = Math.min(ungenutzterFBonus, maxKindermehrbetrag)
  }

  // Endgueltige Steuer: nicht unter Null, aber Kindermehrbetrag wird als
  // Negativsteuer/Gutschrift ausbezahlt
  const steuer = Math.max(0, steuerNachAbsetz)
  const nettoSteuerBelastung = steuer - kindermehrbetrag

  if (kindermehrbetrag > 0) {
    absetzbetraege.push({
      name: 'Kindermehrbetrag (Gutschrift)',
      betrag: kindermehrbetrag,
    })
  }

  // 9. Netto
  const netto = input.bruttoeinkommen - nettoSteuerBelastung

  // 10. Effektivsteuersatz
  const effektivsteuersatz = input.bruttoeinkommen > 0
    ? nettoSteuerBelastung / input.bruttoeinkommen
    : 0

  // 11. Wasserfall
  const wasserfall: WasserfallStep[] = []
  let laufend = input.bruttoeinkommen

  wasserfall.push({
    label: 'Bruttoeinkommen',
    betrag: input.bruttoeinkommen,
    laufend,
    typ: 'start',
  })

  if (werbungskosten > 0) {
    laufend -= werbungskosten
    wasserfall.push({
      label: 'Werbungskosten',
      betrag: -werbungskosten,
      laufend,
      typ: 'abzug',
    })
  }

  if (pendlerBetrag > 0) {
    laufend -= pendlerBetrag
    wasserfall.push({
      label: 'Pendlerpauschale',
      betrag: -pendlerBetrag,
      laufend,
      typ: 'abzug',
    })
  }

  wasserfall.push({
    label: 'Steuerbares Einkommen',
    betrag: 0,
    laufend: steuerbaresEinkommen,
    typ: 'start',
  })

  if (steuerBrutto > 0) {
    laufend = steuerbaresEinkommen - steuerBrutto
    wasserfall.push({
      label: 'Einkommensteuer (Tarif)',
      betrag: -steuerBrutto,
      laufend,
      typ: 'abzug',
    })
  }

  if (absetzbetraegeGesamt > 0) {
    const tatsaechlicheAbsetzbetraege = Math.min(absetzbetraegeGesamt, steuerBrutto)
    laufend += tatsaechlicheAbsetzbetraege
    wasserfall.push({
      label: 'Absetzbetraege',
      betrag: tatsaechlicheAbsetzbetraege,
      laufend,
      typ: 'bonus',
    })
  }

  if (kindermehrbetrag > 0) {
    laufend += kindermehrbetrag
    wasserfall.push({
      label: 'Kindermehrbetrag',
      betrag: kindermehrbetrag,
      laufend,
      typ: 'bonus',
    })
  }

  wasserfall.push({
    label: 'Netto nach Steuer',
    betrag: 0,
    laufend: netto,
    typ: 'ergebnis',
  })

  return {
    bruttoeinkommen: input.bruttoeinkommen,
    werbungskosten,
    pendlerpauschale: pendlerBetrag,
    steuerbaresEinkommen,
    steuerBrutto,
    absetzbetraegeGesamt: absetzbetraegeGesamt + kindermehrbetrag,
    steuer: nettoSteuerBelastung,
    grenzsteuersatz,
    effektivsteuersatz,
    netto,
    absetzbetraege,
    stufenDetails,
    wasserfall,
  }
}
