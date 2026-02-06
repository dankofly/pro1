// ============================================================
// Misch-Einkommen Rechner – Österreich 2024/25
// Anstellung + Nebengewerbe kombiniert
//
// Für Updates auf 2026: nur das CONFIG-Objekt anpassen.
// ============================================================

export const CONFIG = {
  year: '2024/25',

  // ── Anstellung (DN-Anteil) ────────────────────────────────
  // KV 3,87% + PV 10,25% + AV 3% + AK 0,5% + WF 0,5%
  employeeSvRate: 0.1812,
  werbungskostenpauschale: 132,
  verkehrsabsetzbetrag: 463,
  svHoechstbeitragsgrundlage: 72720, // Jahres-HBGL 2024

  // ── Selbständigkeit (SVS / GSVG) ─────────────────────────
  svsPvRate: 0.185,    // Pensionsversicherung
  svsKvRate: 0.068,    // Krankenversicherung
  svsMvRate: 0.0153,   // Selbständigenvorsorge
  svsUvMonthly: 11.35, // Unfallversicherung fix/Monat
  svsMinBeitragsgrundlage: 6453.36,  // Mindest-BGL/Jahr (537.78 × 12)
  svsMaxBeitragsgrundlage: 85260,    // Höchst-BGL/Jahr

  // ── Gewinnfreibetrag (§ 10 EStG) ─────────────────────────
  grundfreibetragRate: 0.15,
  grundfreibetragMaxGewinn: 33000,   // 15% auf max 33.000 → max 4.950

  // ── Einkommensteuer-Tarif 2024/25 ────────────────────────
  taxBrackets: [
    { from: 0,       to: 12816,   rate: 0    },
    { from: 12816,   to: 20818,   rate: 0.20 },
    { from: 20818,   to: 34513,   rate: 0.30 },
    { from: 34513,   to: 66612,   rate: 0.40 },
    { from: 66612,   to: 99266,   rate: 0.48 },
    { from: 99266,   to: 1000000, rate: 0.50 },
    { from: 1000000, to: Infinity, rate: 0.55 },
  ],

  // ── Absetzbeträge ────────────────────────────────────────
  familienbonusUnder18: 2000,  // pro Kind/Jahr
  familienbonusOver18: 700,    // pro Kind/Jahr
  alleinverdienerBase: 520,    // AVAB Basis
  alleinverdiener2Kinder: 704, // AVAB mit 2+ Kindern
  alleinverdienerJeWeiteres: 232,

  // ── Versicherungsgrenze Nebengewerbe ─────────────────────
  versicherungsgrenze: 6010.92, // Unter dieser Grenze: nur UV, keine PV/KV
} as const

// ── Types ──────────────────────────────────────────────────

export interface MischInput {
  bruttoGehalt: number
  jahresgewinn: number
  kinderUnter18: number
  kinderUeber18: number
  alleinverdiener: boolean
}

export interface AnstellungDetail {
  brutto: number
  sv: number
  werbungskosten: number
  steuerpflichtig: number
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
  svsMehrkosten: number // SVS-Kosten die über der Grenze entstehen
}

export interface AbsetzbetraegeDetail {
  verkehrsabsetzbetrag: number
  familienbonus: number
  alleinverdiener: number
  gesamt: number
}

export interface SteuerDetail {
  steuerBrutto: number
  absetzbetraege: number
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
  nebengewerbeAbgabenquote: number   // (SVS + Zusatzsteuer) / Gewinn
  nebengewerbeNettoCent: number      // Was von 1 EUR Gewinn bleibt
  nettoNurGehalt: number
  nettoMitGewerbe: number
  nettoGewerbeAnteil: number         // Netto-Zuwachs durch Gewerbe
  wasserfall: WasserfallStep[]
  vergleich: VergleichRow[]
}

// ── Berechnungen ───────────────────────────────────────────

export function calcAnstellung(brutto: number): AnstellungDetail {
  const svBasis = Math.min(brutto, CONFIG.svHoechstbeitragsgrundlage)
  const sv = svBasis * CONFIG.employeeSvRate
  const steuerpflichtig = Math.max(0, brutto - sv - CONFIG.werbungskostenpauschale)
  return { brutto, sv, werbungskosten: CONFIG.werbungskostenpauschale, steuerpflichtig }
}

export function calcGewerbe(gewinn: number): GewerbeDetail {
  const ueberVersicherungsgrenze = gewinn > CONFIG.versicherungsgrenze
  const differenzZurGrenze = gewinn - CONFIG.versicherungsgrenze
  const svsUv = CONFIG.svsUvMonthly * 12

  let svsPv = 0, svsKv = 0, svsMv = 0
  if (ueberVersicherungsgrenze) {
    const basis = Math.min(
      Math.max(gewinn, CONFIG.svsMinBeitragsgrundlage),
      CONFIG.svsMaxBeitragsgrundlage
    )
    svsPv = basis * CONFIG.svsPvRate
    svsKv = basis * CONFIG.svsKvRate
    svsMv = basis * CONFIG.svsMvRate
  }

  const svsGesamt = svsPv + svsKv + svsMv + svsUv
  const svsMehrkosten = ueberVersicherungsgrenze ? svsPv + svsKv + svsMv : 0

  const grundfreibetragBasis = Math.min(gewinn, CONFIG.grundfreibetragMaxGewinn)
  const grundfreibetrag = grundfreibetragBasis * CONFIG.grundfreibetragRate

  const steuerpflichtig = Math.max(0, gewinn - svsGesamt - grundfreibetrag)

  return {
    gewinn, svsPv, svsKv, svsMv, svsUv, svsGesamt,
    grundfreibetrag, steuerpflichtig,
    ueberVersicherungsgrenze, differenzZurGrenze, svsMehrkosten,
  }
}

export function calcAbsetzbetraege(input: MischInput): AbsetzbetraegeDetail {
  const verkehrsabsetzbetrag = input.bruttoGehalt > 0 ? CONFIG.verkehrsabsetzbetrag : 0
  const familienbonus =
    input.kinderUnter18 * CONFIG.familienbonusUnder18 +
    input.kinderUeber18 * CONFIG.familienbonusOver18

  let alleinverdiener = 0
  if (input.alleinverdiener) {
    const kinder = input.kinderUnter18 + input.kinderUeber18
    if (kinder <= 1) {
      alleinverdiener = CONFIG.alleinverdienerBase
    } else if (kinder === 2) {
      alleinverdiener = CONFIG.alleinverdiener2Kinder
    } else {
      alleinverdiener = CONFIG.alleinverdiener2Kinder + (kinder - 2) * CONFIG.alleinverdienerJeWeiteres
    }
  }

  return {
    verkehrsabsetzbetrag, familienbonus, alleinverdiener,
    gesamt: verkehrsabsetzbetrag + familienbonus + alleinverdiener,
  }
}

export function calcProgressiveTax(taxableIncome: number): number {
  let tax = 0
  for (const b of CONFIG.taxBrackets) {
    if (taxableIncome <= b.from) break
    tax += (Math.min(taxableIncome, b.to) - b.from) * b.rate
  }
  return tax
}

function grenzsteuersatz(taxableIncome: number): number {
  for (let i = CONFIG.taxBrackets.length - 1; i >= 0; i--) {
    if (taxableIncome > CONFIG.taxBrackets[i].from) return CONFIG.taxBrackets[i].rate
  }
  return 0
}

function calcSteuer(steuerpflichtig: number, absetzbetrag: number): SteuerDetail {
  const steuerBrutto = calcProgressiveTax(steuerpflichtig)
  const steuerNetto = Math.max(0, steuerBrutto - absetzbetrag)
  return {
    steuerBrutto,
    absetzbetraege: absetzbetrag,
    steuerNetto,
    grenzsteuersatz: grenzsteuersatz(steuerpflichtig),
    durchschnittssteuersatz: steuerpflichtig > 0 ? steuerNetto / steuerpflichtig : 0,
  }
}

// ── Hauptberechnung ────────────────────────────────────────

export function calculateMischEinkommen(input: MischInput): MischResult {
  const anstellung = calcAnstellung(input.bruttoGehalt)
  const gewerbe = calcGewerbe(input.jahresgewinn)
  const absetzbetraege = calcAbsetzbetraege(input)

  const gesamtSteuerpflichtig = anstellung.steuerpflichtig + gewerbe.steuerpflichtig

  const steuerGesamt = calcSteuer(gesamtSteuerpflichtig, absetzbetraege.gesamt)
  const steuerNurGehalt = calcSteuer(anstellung.steuerpflichtig, absetzbetraege.gesamt)

  const steuerDifferenz = steuerGesamt.steuerNetto - steuerNurGehalt.steuerNetto

  // Effektive Abgabenquote auf das Nebengewerbe
  const totalAbgabenGewerbe = gewerbe.svsGesamt + steuerDifferenz
  const nebengewerbeAbgabenquote = input.jahresgewinn > 0
    ? totalAbgabenGewerbe / input.jahresgewinn
    : 0
  const nebengewerbeNettoCent = 1 - nebengewerbeAbgabenquote

  // Netto-Vergleich
  const nettoNurGehalt = input.bruttoGehalt - anstellung.sv - steuerNurGehalt.steuerNetto
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
    wasserfall.push({ label: 'Einkommensteuer', betrag: -steuerGesamt.steuerNetto, laufend, typ: 'abzug' })
  }
  wasserfall.push({ label: 'Echtes Netto', betrag: laufend, laufend, typ: 'ergebnis' })

  // Vergleich
  const steuerNurGehaltAmount = steuerNurGehalt.steuerNetto
  const vergleich: VergleichRow[] = [
    { label: 'Brutto', nurGehalt: input.bruttoGehalt, mitGewerbe: bruttoGesamt, differenz: input.jahresgewinn },
    { label: 'Sozialversicherung', nurGehalt: -anstellung.sv, mitGewerbe: -(anstellung.sv + gewerbe.svsGesamt), differenz: -gewerbe.svsGesamt },
    { label: 'Einkommensteuer', nurGehalt: -steuerNurGehaltAmount, mitGewerbe: -steuerGesamt.steuerNetto, differenz: -steuerDifferenz },
    { label: 'Netto', nurGehalt: nettoNurGehalt, mitGewerbe: nettoMitGewerbe, differenz: nettoGewerbeAnteil },
  ]

  return {
    anstellung, gewerbe, absetzbetraege,
    gesamtSteuerpflichtig, steuerGesamt, steuerNurGehalt,
    steuerDifferenz, nebengewerbeAbgabenquote, nebengewerbeNettoCent,
    nettoNurGehalt, nettoMitGewerbe, nettoGewerbeAnteil,
    wasserfall, vergleich,
  }
}
