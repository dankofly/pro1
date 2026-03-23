// ============================================================
// Misch-Einkommen Rechner – Oesterreich 2024 / 2025 / 2026
// Anstellung + Nebengewerbe kombiniert
//
// Importiert Steuer- und SV-Konstanten aus tax-constants.ts
// (Single Source of Truth).
// ============================================================

import {
  type TaxYear,
  TAX_YEARS,
  YEAR_CONFIGS,
  type AbsetzbetraegeConfig,
  calcProgressiveTax,
  getGrenzsteuersatz,
  calcAvab,
} from './tax-constants'

// Re-export for consumers that import from this module
export { type TaxYear, TAX_YEARS, YEAR_CONFIGS, type AbsetzbetraegeConfig }

// ── Types ──────────────────────────────────────────────────

export interface MischInput {
  bruttoGehalt: number
  jahresgewinn: number
  kinderUnter18: number
  kinderUeber18: number
  alleinverdiener: boolean
  year: TaxYear
}

export interface AnstellungDetail {
  brutto: number
  sv: number
  werbungskosten: number
  steuerpflichtig: number        // nur laufende Bezüge (12×), für progressive Steuer
  sonderzahlungBrutto: number    // 13./14. Gehalt (2× monatlich)
  sechstelSteuer: number         // 6% Pauschalsteuer auf Sonderzahlungen (§ 67 EStG)
}

export interface GewerbeDetail {
  gewinn: number
  svsPv: number
  svsKv: number
  svsMv: number
  svsUv: number
  svsGesamt: number
  grundfreibetrag: number
  steuerpflichtig: number
  ueberVersicherungsgrenze: boolean
  differenzZurGrenze: number
  svsMehrkosten: number
}

export interface AbsetzbetraegeDetail {
  verkehrsabsetzbetrag: number
  familienbonus: number
  alleinverdiener: number
  kindermehrbetrag: number
  gesamt: number
}

export interface SteuerDetail {
  steuerBrutto: number
  absetzbetraege: number
  kindermehrbetrag: number
  steuerNetto: number
  grenzsteuersatz: number
  durchschnittssteuersatz: number
}

export interface WasserfallStep {
  label: string
  betrag: number
  laufend: number
  typ: 'start' | 'abzug' | 'ergebnis'
}

export interface VergleichRow {
  label: string
  nurGehalt: number
  mitGewerbe: number
  differenz: number
}

export interface MischResult {
  anstellung: AnstellungDetail
  gewerbe: GewerbeDetail
  absetzbetraege: AbsetzbetraegeDetail
  gesamtSteuerpflichtig: number
  steuerGesamt: SteuerDetail
  steuerNurGehalt: SteuerDetail
  steuerDifferenz: number
  nebengewerbeAbgabenquote: number
  nebengewerbeNettoCent: number
  nettoNurGehalt: number
  nettoMitGewerbe: number
  nettoGewerbeAnteil: number
  wasserfall: WasserfallStep[]
  vergleich: VergleichRow[]
  year: TaxYear
}

// ── Berechnungen ───────────────────────────────────────────

export function calcAnstellung(brutto: number, year: TaxYear): AnstellungDetail {
  const cfg = YEAR_CONFIGS[year]
  const svBasis = Math.min(brutto, cfg.svHoechstbeitragsgrundlageAngestellt)
  const sv = svBasis * cfg.employeeSvRate

  // ── Sechstelregelung (§ 67 EStG) ──
  // Brutto = 14 Monatsbezüge. 12× laufend (progressiv), 2× Sonderzahlung (6% pauschal)
  const laufendBrutto = brutto * 12 / 14
  const sonderzahlungBrutto = brutto * 2 / 14
  const svLaufend = sv * 12 / 14
  const svSonder = sv * 2 / 14

  // Laufende Bezüge: progressiv besteuert (zusammen mit Gewerbe-Einkünften)
  const steuerpflichtig = Math.max(0, laufendBrutto - svLaufend - cfg.werbungskostenpauschale)

  // Sonderzahlungen: §620 Freibetrag, dann 6% pauschal
  const sonderNetto = Math.max(0, sonderzahlungBrutto - svSonder)
  const sechstelSteuer = Math.max(0, (sonderNetto - 620) * 0.06)

  return {
    brutto, sv, werbungskosten: cfg.werbungskostenpauschale,
    steuerpflichtig, sonderzahlungBrutto, sechstelSteuer,
  }
}

/**
 * @param asvgBeitragsgrundlage — ASVG-BGL aus Anstellung (für Differenzvorschreibung § 35a GSVG).
 *   Wenn gesetzt, wird die GSVG-BGL um den ASVG-Anteil reduziert, sodass die
 *   kombinierte BGL die Höchstbeitragsgrundlage nicht übersteigt.
 */
export function calcGewerbe(gewinn: number, year: TaxYear, asvgBeitragsgrundlage = 0): GewerbeDetail {
  const cfg = YEAR_CONFIGS[year]
  const ueberVersicherungsgrenze = gewinn > cfg.versicherungsgrenze
  const differenzZurGrenze = gewinn - cfg.versicherungsgrenze
  const svsUv = cfg.svs.uvMonthly * 12

  let svsPv = 0, svsKv = 0, svsMv = 0, svsGesamt = svsUv
  if (ueberVersicherungsgrenze) {
    // Differenzvorschreibung (§ 35a GSVG): ASVG-BGL + GSVG-BGL ≤ HBGL
    const maxGsvgBgl = Math.max(0, cfg.svs.hoechstbeitrag - asvgBeitragsgrundlage)

    // Iterative Berechnung: SVS ist Betriebsausgabe → mindert eigene BGL
    let bgl = Math.min(Math.max(gewinn, cfg.svs.minBeitragsgrundlage), maxGsvgBgl)
    let prevSvs = 0
    for (let i = 0; i < 10; i++) {
      const pv = bgl * cfg.svs.pvRate
      const kv = bgl * cfg.svs.kvRate
      const mv = bgl * cfg.svs.mvRate
      const total = pv + kv + mv + svsUv
      if (Math.abs(total - prevSvs) < 0.01) break
      prevSvs = total
      const einkuenfte = Math.max(0, gewinn - total)
      bgl = Math.min(Math.max(einkuenfte, cfg.svs.minBeitragsgrundlage), maxGsvgBgl)
    }
    svsPv = bgl * cfg.svs.pvRate
    svsKv = bgl * cfg.svs.kvRate
    svsMv = bgl * cfg.svs.mvRate
    svsGesamt = svsPv + svsKv + svsMv + svsUv
  }
  const svsMehrkosten = ueberVersicherungsgrenze ? svsGesamt - svsUv : 0

  // Steuerlicher Gewinn (nach SVS als Betriebsausgabe) als Basis für GFB (§10 EStG)
  const steuerGewinn = Math.max(0, gewinn - svsGesamt)
  const grundfreibetragBasis = Math.min(steuerGewinn, cfg.gewinnfreibetrag.grundfreibetragMaxGewinn)
  const grundfreibetrag = grundfreibetragBasis * cfg.gewinnfreibetrag.grundfreibetragRate

  const steuerpflichtig = Math.max(0, steuerGewinn - grundfreibetrag)

  return {
    gewinn, svsPv, svsKv, svsMv, svsUv, svsGesamt,
    grundfreibetrag, steuerpflichtig,
    ueberVersicherungsgrenze, differenzZurGrenze, svsMehrkosten,
  }
}

export function calcAbsetzbetraege(input: MischInput): AbsetzbetraegeDetail {
  const cfg = YEAR_CONFIGS[input.year].absetzbetraege
  const verkehrsabsetzbetrag = input.bruttoGehalt > 0 ? cfg.verkehrsabsetzbetrag : 0
  const familienbonus =
    input.kinderUnter18 * cfg.familienbonusUnder18 +
    input.kinderUeber18 * cfg.familienbonusOver18

  let alleinverdiener = 0
  if (input.alleinverdiener) {
    const kinder = input.kinderUnter18 + input.kinderUeber18
    alleinverdiener = calcAvab(kinder, input.year)
  }

  return {
    verkehrsabsetzbetrag, familienbonus, alleinverdiener,
    kindermehrbetrag: 0, // wird in calcSteuer berechnet
    gesamt: verkehrsabsetzbetrag + familienbonus + alleinverdiener,
  }
}

// Steuerberechnung mit korrekter Absetzbetrags-Reihenfolge:
// 1. Tarifsteuer berechnen
// 2. Verkehrsabsetzbetrag abziehen (min 0)
// 3. AVAB abziehen (kann unter gewissen Umstaenden negativ werden)
// 4. Familienbonus Plus abziehen (nach Tarif, min 0)
// 5. Kindermehrbetrag: Wenn FBP nicht voll genutzt, Gutschrift pro Kind
function calcSteuer(
  steuerpflichtig: number,
  absetz: AbsetzbetraegeDetail,
  year: TaxYear,
  kinderCount: number,
): SteuerDetail {
  const cfg = YEAR_CONFIGS[year].absetzbetraege
  const steuerBrutto = calcProgressiveTax(steuerpflichtig, year)

  // 1. Verkehrsabsetzbetrag (senkt Steuer auf min 0)
  let remaining = Math.max(0, steuerBrutto - absetz.verkehrsabsetzbetrag)

  // 2. AVAB (senkt Steuer auf min 0)
  remaining = Math.max(0, remaining - absetz.alleinverdiener)

  // 3. Familienbonus Plus (nach Tarifsteuer, senkt auf min 0)
  const steuerVorFBP = remaining
  remaining = Math.max(0, remaining - absetz.familienbonus)

  // 4. Kindermehrbetrag: Wenn FBP nicht voll genutzt werden konnte
  let kindermehrbetrag = 0
  if (kinderCount > 0 && absetz.familienbonus > steuerVorFBP) {
    const maxKMB = cfg.kindermehrbetrag * kinderCount
    const unusedFBP = absetz.familienbonus - steuerVorFBP
    kindermehrbetrag = Math.min(unusedFBP, maxKMB)
  }

  // Endgueltige Steuer (Kindermehrbetrag kann Gutschrift erzeugen)
  const steuerNetto = remaining - kindermehrbetrag

  return {
    steuerBrutto,
    absetzbetraege: absetz.gesamt,
    kindermehrbetrag,
    steuerNetto,
    grenzsteuersatz: getGrenzsteuersatz(steuerpflichtig, year),
    durchschnittssteuersatz: steuerpflichtig > 0 ? steuerNetto / steuerpflichtig : 0,
  }
}

// ── Hauptberechnung ────────────────────────────────────────

export function calculateMischEinkommen(input: MischInput): MischResult {
  const anstellung = calcAnstellung(input.bruttoGehalt, input.year)
  // Differenzvorschreibung: ASVG-BGL an calcGewerbe übergeben
  const asvgBgl = Math.min(input.bruttoGehalt, YEAR_CONFIGS[input.year].svHoechstbeitragsgrundlageAngestellt)
  const gewerbe = calcGewerbe(input.jahresgewinn, input.year, asvgBgl)
  const absetzbetraege = calcAbsetzbetraege(input)
  const kinderCount = input.kinderUnter18 + input.kinderUeber18

  const gesamtSteuerpflichtig = anstellung.steuerpflichtig + gewerbe.steuerpflichtig

  const steuerGesamt = calcSteuer(gesamtSteuerpflichtig, absetzbetraege, input.year, kinderCount)
  const steuerNurGehalt = calcSteuer(anstellung.steuerpflichtig, absetzbetraege, input.year, kinderCount)

  // Kindermehrbetrag in absetzbetraege zurueckschreiben fuer UI
  absetzbetraege.kindermehrbetrag = steuerGesamt.kindermehrbetrag

  const steuerDifferenz = steuerGesamt.steuerNetto - steuerNurGehalt.steuerNetto

  // Effektive Abgabenquote auf das Nebengewerbe
  const totalAbgabenGewerbe = gewerbe.svsGesamt + steuerDifferenz
  const nebengewerbeAbgabenquote = input.jahresgewinn > 0
    ? totalAbgabenGewerbe / input.jahresgewinn
    : 0
  const nebengewerbeNettoCent = 1 - nebengewerbeAbgabenquote

  // Netto-Vergleich (inkl. Sechstelsteuer auf Sonderzahlungen)
  const nettoNurGehalt = input.bruttoGehalt - anstellung.sv - steuerNurGehalt.steuerNetto - anstellung.sechstelSteuer
  const nettoMitGewerbe = nettoNurGehalt + input.jahresgewinn - gewerbe.svsGesamt - steuerDifferenz
  const nettoGewerbeAnteil = nettoMitGewerbe - nettoNurGehalt

  // Wasserfall
  const bruttoGesamt = input.bruttoGehalt + input.jahresgewinn
  let laufend = bruttoGesamt
  const wasserfall: WasserfallStep[] = [
    { label: 'Brutto-Einkommen gesamt', betrag: bruttoGesamt, laufend, typ: 'start' },
  ]
  if (anstellung.sv > 0) {
    laufend -= anstellung.sv
    wasserfall.push({ label: 'SV Anstellung (DN-Anteil)', betrag: -anstellung.sv, laufend, typ: 'abzug' })
  }
  if (gewerbe.svsGesamt > 0) {
    laufend -= gewerbe.svsGesamt
    wasserfall.push({ label: 'SVS Gewerbe', betrag: -gewerbe.svsGesamt, laufend, typ: 'abzug' })
  }
  if (steuerGesamt.steuerNetto > 0) {
    laufend -= steuerGesamt.steuerNetto
    wasserfall.push({ label: 'Einkommensteuer (laufend)', betrag: -steuerGesamt.steuerNetto, laufend, typ: 'abzug' })
  } else if (steuerGesamt.steuerNetto < 0) {
    laufend -= steuerGesamt.steuerNetto
    wasserfall.push({ label: 'Steuergutschrift (KMB)', betrag: -steuerGesamt.steuerNetto, laufend, typ: 'start' })
  }
  if (anstellung.sechstelSteuer > 0) {
    laufend -= anstellung.sechstelSteuer
    wasserfall.push({ label: 'Steuer 13./14. Gehalt (6%)', betrag: -anstellung.sechstelSteuer, laufend, typ: 'abzug' })
  }
  wasserfall.push({ label: 'Echtes Netto', betrag: laufend, laufend, typ: 'ergebnis' })

  // Vergleich
  // Steuer inkl. Sechstelsteuer für Vergleichstabelle
  const steuerNurGehaltTotal = steuerNurGehalt.steuerNetto + anstellung.sechstelSteuer
  const steuerGesamtTotal = steuerGesamt.steuerNetto + anstellung.sechstelSteuer
  const vergleich: VergleichRow[] = [
    { label: 'Brutto', nurGehalt: input.bruttoGehalt, mitGewerbe: bruttoGesamt, differenz: input.jahresgewinn },
    { label: 'Sozialversicherung', nurGehalt: -anstellung.sv, mitGewerbe: -(anstellung.sv + gewerbe.svsGesamt), differenz: -gewerbe.svsGesamt },
    { label: 'Einkommensteuer', nurGehalt: -steuerNurGehaltTotal, mitGewerbe: -steuerGesamtTotal, differenz: -steuerDifferenz },
    { label: 'Netto', nurGehalt: nettoNurGehalt, mitGewerbe: nettoMitGewerbe, differenz: nettoGewerbeAnteil },
  ]

  return {
    anstellung, gewerbe, absetzbetraege,
    gesamtSteuerpflichtig, steuerGesamt, steuerNurGehalt,
    steuerDifferenz, nebengewerbeAbgabenquote, nebengewerbeNettoCent,
    nettoNurGehalt, nettoMitGewerbe, nettoGewerbeAnteil,
    wasserfall, vergleich, year: input.year,
  }
}
