// ============================================================
// Misch-Einkommen Rechner – Oesterreich 2024 / 2025 / 2026
// Anstellung + Nebengewerbe kombiniert
//
// Jahresabhaengige Absetzbetraege (Inflationsanpassung).
// Für neues Jahr: YEAR_CONFIGS ergänzen.
// ============================================================

// ── Jahresauswahl ────────────────────────────────────────────

export type TaxYear = '2024' | '2025' | '2026'

export const TAX_YEARS: { value: TaxYear; label: string }[] = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026 (Prognose)' },
]

// ── Jahresabhaengige Absetzbetraege ─────────────────────────

export interface AbsetzbetraegeConfig {
  familienbonusUnder18: number
  familienbonusOver18: number
  avab1Kind: number
  avab2Kinder: number
  avab3Kinder: number
  avabJeWeiteres: number
  verkehrsabsetzbetrag: number
  kindermehrbetrag: number
}

export const YEAR_CONFIGS: Record<TaxYear, AbsetzbetraegeConfig> = {
  '2024': {
    familienbonusUnder18: 2000,
    familienbonusOver18: 700,
    avab1Kind: 520,
    avab2Kinder: 704,
    avab3Kinder: 936,
    avabJeWeiteres: 232,
    verkehrsabsetzbetrag: 463,
    kindermehrbetrag: 700,
  },
  '2025': {
    familienbonusUnder18: 2000,
    familienbonusOver18: 700,
    avab1Kind: 572,
    avab2Kinder: 750,
    avab3Kinder: 989,
    avabJeWeiteres: 239,
    verkehrsabsetzbetrag: 463,
    kindermehrbetrag: 700,
  },
  '2026': {
    familienbonusUnder18: 2100,
    familienbonusOver18: 735,
    avab1Kind: 594,
    avab2Kinder: 780,
    avab3Kinder: 1027,
    avabJeWeiteres: 260,
    verkehrsabsetzbetrag: 481,
    kindermehrbetrag: 727,
  },
}

// ── Gemeinsame Konstanten (jahruebergreifend) ───────────────

export const CONFIG = {
  // ── Anstellung (DN-Anteil) ──────────────────────────────
  // KV 3,87% + PV 10,25% + AV 3% + AK 0,5% + WF 0,5%
  employeeSvRate: 0.1812,
  werbungskostenpauschale: 132,
  svHoechstbeitragsgrundlage: 72720, // Jahres-HBGL

  // ── Selbstaendigkeit (SVS / GSVG) ──────────────────────
  svsPvRate: 0.185,
  svsKvRate: 0.068,
  svsMvRate: 0.0153,
  svsUvMonthly: 11.35,
  svsMinBeitragsgrundlage: 6453.36,
  svsMaxBeitragsgrundlage: 85260,

  // ── Gewinnfreibetrag (§ 10 EStG) ───────────────────────
  grundfreibetragRate: 0.15,
  grundfreibetragMaxGewinn: 33000,

  // ── Einkommensteuer-Tarif ──────────────────────────────
  taxBrackets: [
    { from: 0,       to: 12816,   rate: 0    },
    { from: 12816,   to: 20818,   rate: 0.20 },
    { from: 20818,   to: 34513,   rate: 0.30 },
    { from: 34513,   to: 66612,   rate: 0.40 },
    { from: 66612,   to: 99266,   rate: 0.48 },
    { from: 99266,   to: 1000000, rate: 0.50 },
    { from: 1000000, to: Infinity, rate: 0.55 },
  ],

  // ── Versicherungsgrenze Nebengewerbe ───────────────────
  versicherungsgrenze: 6010.92,
} as const

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
  const yc = YEAR_CONFIGS[input.year]
  const verkehrsabsetzbetrag = input.bruttoGehalt > 0 ? yc.verkehrsabsetzbetrag : 0
  const familienbonus =
    input.kinderUnter18 * yc.familienbonusUnder18 +
    input.kinderUeber18 * yc.familienbonusOver18

  let alleinverdiener = 0
  if (input.alleinverdiener) {
    const kinder = input.kinderUnter18 + input.kinderUeber18
    if (kinder <= 1) {
      alleinverdiener = yc.avab1Kind
    } else if (kinder === 2) {
      alleinverdiener = yc.avab2Kinder
    } else if (kinder === 3) {
      alleinverdiener = yc.avab3Kinder
    } else {
      alleinverdiener = yc.avab3Kinder + (kinder - 3) * yc.avabJeWeiteres
    }
  }

  return {
    verkehrsabsetzbetrag, familienbonus, alleinverdiener,
    kindermehrbetrag: 0, // wird in calcSteuer berechnet
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
  const yc = YEAR_CONFIGS[year]
  const steuerBrutto = calcProgressiveTax(steuerpflichtig)

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
    const maxKMB = yc.kindermehrbetrag * kinderCount
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
    grenzsteuersatz: grenzsteuersatz(steuerpflichtig),
    durchschnittssteuersatz: steuerpflichtig > 0 ? steuerNetto / steuerpflichtig : 0,
  }
}

// ── Hauptberechnung ────────────────────────────────────────

export function calculateMischEinkommen(input: MischInput): MischResult {
  const anstellung = calcAnstellung(input.bruttoGehalt)
  const gewerbe = calcGewerbe(input.jahresgewinn)
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
  } else if (steuerGesamt.steuerNetto < 0) {
    laufend -= steuerGesamt.steuerNetto // negative Steuer = Gutschrift addieren
    wasserfall.push({ label: 'Steuergutschrift (KMB)', betrag: -steuerGesamt.steuerNetto, laufend, typ: 'start' })
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
    wasserfall, vergleich, year: input.year,
  }
}
