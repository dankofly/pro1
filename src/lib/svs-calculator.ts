import {
  YEAR_CONFIGS,
  calcProgressiveTax,
  getGrenzsteuersatz,
  calcGrundfreibetrag,
  calcActualIFB,
  calcMaxIFB,
  calcPendlerpauschale,
  calcAvab,
  type TaxYear,
} from './tax-constants'
import type { Versicherungsart, WeitereEinkuenfteInput } from './rechner-types'

// ── Interfaces ───────────────────────────────────────────────

export interface ProOptions {
  kinderUnter18: number
  kinderUeber18: number
  alleinverdiener: boolean
  pendlerKm: number
  pendlerOeffentlich: boolean
  investitionen: number
}

/** Stammdaten-Kontext für SVS-Berechnung */
export interface StammdatenContext {
  versicherungsart: Versicherungsart
  jungunternehmer: boolean
  gruendungsJahr: number
}

export interface SvsResult {
  // SVS-Beiträge
  beitragsgrundlage: number
  pvBeitrag: number
  kvBeitrag: number
  mvBeitrag: number
  uvBeitrag: number
  endgueltigeSVS: number
  endgueltigeMonatlich: number
  vorlaeufigeSVS: number
  nachzahlung: number
  sparEmpfehlung: number
  steuerErsparnis: number
  effektiveSVS: number
  riskPercent: number
  belowMinimum: boolean
  cappedAtMax: boolean
  usesMinBeitragsgrundlage: boolean
  isJungunternehmer: boolean

  // Gewinnfreibetrag
  grundfreibetrag: number
  gewinnfreibetragInvestition: number

  // Einkommensteuer
  steuerpflichtig: number
  steuerBrutto: number
  einkommensteuer: number
  echtesNetto: number

  // Absetzbeträge (Pro)
  familienbonusAbzug: number
  avabAbzug: number
  pendlerpauschale: number
  kindermehrbetrag: number
  absetzbetraegeGesamt: number

  // Meta
  year: TaxYear
  grenzsteuersatz: number
  durchschnittssteuersatz: number
  hasProOptions: boolean
}

export interface SteuerTipp {
  ifbInvestition: number
  ifbErsparnis: number
  svsVorauszahlung: number
  svsVorauszahlungErsparnis: number
  grenzsteuersatz: number
}

// ── Einkommensteuer-Berechnung ───────────────────────────────

interface EinkommensteuerDetail {
  steuerpflichtig: number
  grundfreibetrag: number
  ifb: number
  pendler: number
  steuerBrutto: number
  familienbonusAbzug: number
  avabAbzug: number
  kindermehrbetrag: number
  absetzbetraegeGesamt: number
  steuerNetto: number
  grenzsteuersatz: number
  durchschnittssteuersatz: number
}

export function calculateEinkommensteuer(
  gewinn: number,
  svsSumme: number,
  year: TaxYear = '2025',
  proOptions?: ProOptions,
  weitereEinkuenfte?: WeitereEinkuenfteInput,
): EinkommensteuerDetail {
  const cfg = YEAR_CONFIGS[year]

  // Pendlerpauschale (Betriebsausgabe für Selbständige → mindert Bemessungsgrundlage)
  const pendler = proOptions ? calcPendlerpauschale(proOptions.pendlerKm, proOptions.pendlerOeffentlich, year) : 0

  // Steuerlicher Gewinn = Brutto-Gewinn minus Betriebsausgaben (SVS + Pendler)
  // Per §10 EStG: GFB/IFB beziehen sich auf den steuerlichen Gewinn (nach Betriebsausgaben)
  const steuerGewinn = Math.max(0, gewinn - svsSumme - pendler)

  // 1. Grundfreibetrag (15% bis €33.000 — Basis: steuerlicher Gewinn)
  const grundfreibetrag = calcGrundfreibetrag(steuerGewinn, year)

  // 2. IFB (nur bei Pro + Investitionen — Basis: steuerlicher Gewinn)
  const ifb = proOptions ? calcActualIFB(steuerGewinn, proOptions.investitionen, year) : 0

  // 3. Selbständiges steuerpflichtiges Einkommen
  const selfEmploymentTaxable = Math.max(0, steuerGewinn - grundfreibetrag - ifb)

  // 4. Weitere Einkünfte (Anstellung, Vermietung)
  let weitereEinkuenfteTaxable = 0
  if (weitereEinkuenfte) {
    // Brutto-Entgelt (14 Gehälter) minus DN-SV minus Werbungskostenpauschale
    if (weitereEinkuenfte.bruttoEntgeltMonatlich > 0) {
      const brutto14 = weitereEinkuenfte.bruttoEntgeltMonatlich * 14
      const svBasis = Math.min(brutto14, cfg.svHoechstbeitragsgrundlageAngestellt)
      const sv = svBasis * cfg.employeeSvRate
      weitereEinkuenfteTaxable += Math.max(0, brutto14 - sv - cfg.werbungskostenpauschale)
    }
    // Vermietungseinkünfte (netto)
    if (weitereEinkuenfte.vermietungsEinkuenfte > 0) {
      weitereEinkuenfteTaxable += weitereEinkuenfte.vermietungsEinkuenfte
    }
  }

  // 5. Gesamt steuerpflichtiges Einkommen
  const steuerpflichtig = selfEmploymentTaxable + weitereEinkuenfteTaxable

  // 6. Tarifsteuer (progressiv)
  const steuerBrutto = calcProgressiveTax(steuerpflichtig, year)

  // 7. Absetzbeträge (nur bei Pro)
  let familienbonusAbzug = 0
  let avabAbzug = 0
  let kindermehrbetrag = 0

  if (proOptions) {
    const kinderCount = proOptions.kinderUnter18 + proOptions.kinderUeber18

    // AVAB/AEAB (mindert Steuer auf min 0)
    if (proOptions.alleinverdiener && kinderCount > 0) {
      avabAbzug = calcAvab(kinderCount, year)
    }

    // Familienbonus Plus (mindert Steuer auf min 0)
    familienbonusAbzug =
      proOptions.kinderUnter18 * cfg.absetzbetraege.familienbonusUnder18 +
      proOptions.kinderUeber18 * cfg.absetzbetraege.familienbonusOver18

    // Reihenfolge: Steuer → minus AVAB → minus FBP → Kindermehrbetrag
    let remaining = Math.max(0, steuerBrutto - avabAbzug)
    const steuerVorFBP = remaining
    remaining = Math.max(0, remaining - familienbonusAbzug)

    // Kindermehrbetrag: Wenn FBP nicht voll genutzt
    if (kinderCount > 0 && familienbonusAbzug > steuerVorFBP) {
      const maxKMB = cfg.absetzbetraege.kindermehrbetrag * kinderCount
      const unusedFBP = familienbonusAbzug - steuerVorFBP
      kindermehrbetrag = Math.min(unusedFBP, maxKMB)
    }
  }

  const absetzbetraegeGesamt = avabAbzug + familienbonusAbzug + kindermehrbetrag
  const steuerNetto = proOptions
    ? Math.max(0, steuerBrutto - avabAbzug - familienbonusAbzug) - kindermehrbetrag
    : steuerBrutto

  const grenzsteuersatz = getGrenzsteuersatz(steuerpflichtig, year)
  const durchschnittssteuersatz = steuerpflichtig > 0 ? steuerNetto / steuerpflichtig : 0

  return {
    steuerpflichtig,
    grundfreibetrag,
    ifb,
    pendler,
    steuerBrutto,
    familienbonusAbzug,
    avabAbzug,
    kindermehrbetrag,
    absetzbetraegeGesamt,
    steuerNetto,
    grenzsteuersatz,
    durchschnittssteuersatz,
  }
}

// ── Steuer-Tipps ─────────────────────────────────────────────

export function calculateSteuerTipps(
  gewinn: number,
  svsSumme: number,
  year: TaxYear = '2025',
): SteuerTipp {
  const cfg = YEAR_CONFIGS[year]
  // Steuerlicher Gewinn (nach Betriebsausgabe SVS) als Basis für GFB/IFB
  const steuerGewinn = Math.max(0, gewinn - svsSumme)
  const grundfreibetrag = calcGrundfreibetrag(steuerGewinn, year)
  const basis = Math.max(steuerGewinn - grundfreibetrag, 0)
  const grenzsteuersatz = getGrenzsteuersatz(basis, year)

  // Max. möglicher IFB (Basis: steuerlicher Gewinn)
  const ifbInvestition = calcMaxIFB(steuerGewinn, year)
  const ifbErsparnis = ifbInvestition * grenzsteuersatz

  // SVS-Vorauszahlung: Wie viel kann man noch einzahlen?
  const maxSvs = cfg.svs.hoechstbeitrag * cfg.svs.gesamtRate + cfg.svs.uvMonthly * 12
  const svsVorauszahlung = Math.max(maxSvs - svsSumme, 0)
  const svsVorauszahlungErsparnis = svsVorauszahlung * grenzsteuersatz

  return { ifbInvestition, ifbErsparnis, svsVorauszahlung, svsVorauszahlungErsparnis, grenzsteuersatz }
}

// ── SVS-Beiträge auf eine Beitragsgrundlage berechnen (pure Funktion) ──

interface SvsBeitraegeResult {
  beitragsgrundlage: number
  pvBeitrag: number
  kvBeitrag: number
  mvBeitrag: number
  uvBeitrag: number
  endgueltigeSVS: number
  belowMinimum: boolean
  cappedAtMax: boolean
  usesMinBeitragsgrundlage: boolean
}

function calculateSvsBeitraege(
  einkuenfte: number,
  pvRate: number,
  kvRate: number,
  mvRate: number,
  uvMonthly: number,
  hoechstbeitrag: number,
  minBeitragsgrundlage: number,
  isNeueSelbstaendige: boolean,
  versicherungsgrenze: number,
): SvsBeitraegeResult {
  let beitragsgrundlage: number
  let belowMinimum: boolean
  let usesMinBeitragsgrundlage = false

  if (isNeueSelbstaendige) {
    belowMinimum = einkuenfte < versicherungsgrenze
    beitragsgrundlage = belowMinimum ? 0 : Math.min(einkuenfte, hoechstbeitrag)
  } else {
    belowMinimum = false
    const clampedEinkuenfte = Math.max(0, einkuenfte)
    if (clampedEinkuenfte < minBeitragsgrundlage) {
      beitragsgrundlage = minBeitragsgrundlage
      usesMinBeitragsgrundlage = true
    } else {
      beitragsgrundlage = Math.min(clampedEinkuenfte, hoechstbeitrag)
    }
  }

  const cappedAtMax = einkuenfte > hoechstbeitrag
  const pvBeitrag = beitragsgrundlage * pvRate
  const kvBeitrag = beitragsgrundlage * kvRate
  const mvBeitrag = beitragsgrundlage * mvRate
  const uvBeitrag = belowMinimum ? 0 : uvMonthly * 12

  return {
    beitragsgrundlage,
    pvBeitrag,
    kvBeitrag,
    mvBeitrag,
    uvBeitrag,
    endgueltigeSVS: pvBeitrag + kvBeitrag + mvBeitrag + uvBeitrag,
    belowMinimum,
    cappedAtMax,
    usesMinBeitragsgrundlage,
  }
}

// ── Haupt-SVS-Berechnung ─────────────────────────────────────
// Iterative Berechnung: SVS ist Betriebsausgabe und mindert die eigene
// Beitragsgrundlage (§ 25 GSVG — Einkünfte lt. Einkommensteuerbescheid).
// GFB (§ 10 EStG) wirkt nur auf ESt, NICHT auf SVS-Beitragsgrundlage
// (GFB wird auf Einkommensebene abgezogen, nicht auf Einkünfteebene).

export function calculateSvs(
  gewinn: number,
  monatlicheVorschreibung: number,
  year: TaxYear = '2025',
  proOptions?: ProOptions,
  stammdaten?: StammdatenContext,
  weitereEinkuenfte?: WeitereEinkuenfteInput,
): SvsResult {
  const cfg = YEAR_CONFIGS[year]
  const svs = cfg.svs
  const selectedYear = Number(year)

  // ── Jungunternehmer-Status prüfen ──
  const isJungunternehmer = !!(
    stammdaten?.jungunternehmer &&
    selectedYear <= stammdaten.gruendungsJahr + 1
  )

  // ── BSVG (Land- & Forstwirtschaft) hat eigene PV-Rate ──
  const isBsvg = stammdaten?.versicherungsart === 'bsvg'

  // ── KV-Rate (reduziert für Jungunternehmer: 3,84% statt 6,80%, nicht bei BSVG) ──
  const kvRate = (isJungunternehmer && !isBsvg) ? svs.kvRateJungunternehmer : svs.kvRate

  // ── PV-Rate (BSVG: 17,0% statt 18,5%) ──
  const pvRate = isBsvg ? svs.bsvgPvRate : svs.pvRate

  const isNeueSelbstaendige = stammdaten?.versicherungsart === 'gsvg_neu'

  // ── Iterative SVS-Berechnung ──
  // SVS ist Betriebsausgabe → mindert Einkünfte → mindert SVS-Basis
  // Konvergiert typisch in 3–5 Iterationen (Δ < 0,01 €)
  let svsResult = calculateSvsBeitraege(
    gewinn, pvRate, kvRate, svs.mvRate, svs.uvMonthly,
    svs.hoechstbeitrag, svs.minBeitragsgrundlage,
    isNeueSelbstaendige, cfg.versicherungsgrenze,
  )

  for (let i = 0; i < 10; i++) {
    const einkuenfte = Math.max(0, gewinn - svsResult.endgueltigeSVS)
    const nextResult = calculateSvsBeitraege(
      einkuenfte, pvRate, kvRate, svs.mvRate, svs.uvMonthly,
      svs.hoechstbeitrag, svs.minBeitragsgrundlage,
      isNeueSelbstaendige, cfg.versicherungsgrenze,
    )
    if (Math.abs(nextResult.endgueltigeSVS - svsResult.endgueltigeSVS) < 0.01) {
      svsResult = nextResult
      break
    }
    svsResult = nextResult
  }

  const {
    beitragsgrundlage, pvBeitrag, kvBeitrag, mvBeitrag, uvBeitrag,
    endgueltigeSVS, belowMinimum, cappedAtMax, usesMinBeitragsgrundlage,
  } = svsResult

  const vorlaeufigeSVS = monatlicheVorschreibung * 12
  const nachzahlung = endgueltigeSVS - vorlaeufigeSVS
  const sparEmpfehlung = nachzahlung > 0 ? nachzahlung / 12 : 0

  // ── Einkommensteuer (mit finaler SVS als Betriebsausgabe) ──
  const est = calculateEinkommensteuer(gewinn, endgueltigeSVS, year, proOptions, weitereEinkuenfte)
  const einkommensteuer = est.steuerNetto

  // Netto (nur selbständiger Gewinn minus SVS und ESt)
  const echtesNetto = gewinn - endgueltigeSVS - einkommensteuer

  // Steuerersparnis durch SVS (mit echtem Grenzsteuersatz)
  const steuerErsparnis = endgueltigeSVS * est.grenzsteuersatz
  const effektiveSVS = endgueltigeSVS - steuerErsparnis

  // Risiko
  let riskPercent = 0
  if (nachzahlung > 0 && endgueltigeSVS > 0) {
    riskPercent = Math.min((nachzahlung / endgueltigeSVS) * 100, 100)
  }

  return {
    beitragsgrundlage,
    pvBeitrag,
    kvBeitrag,
    mvBeitrag,
    uvBeitrag,
    endgueltigeSVS,
    endgueltigeMonatlich: endgueltigeSVS / 12,
    vorlaeufigeSVS,
    nachzahlung,
    sparEmpfehlung,
    steuerErsparnis,
    effektiveSVS,
    riskPercent,
    belowMinimum,
    cappedAtMax,
    usesMinBeitragsgrundlage,
    isJungunternehmer,

    grundfreibetrag: est.grundfreibetrag,
    gewinnfreibetragInvestition: est.ifb,

    steuerpflichtig: est.steuerpflichtig,
    steuerBrutto: est.steuerBrutto,
    einkommensteuer,
    echtesNetto,

    familienbonusAbzug: est.familienbonusAbzug,
    avabAbzug: est.avabAbzug,
    pendlerpauschale: est.pendler,
    kindermehrbetrag: est.kindermehrbetrag,
    absetzbetraegeGesamt: est.absetzbetraegeGesamt,

    year,
    grenzsteuersatz: est.grenzsteuersatz,
    durchschnittssteuersatz: est.durchschnittssteuersatz,
    hasProOptions: !!proOptions,
  }
}
