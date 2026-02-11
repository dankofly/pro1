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

// ── Interfaces ───────────────────────────────────────────────

export interface ProOptions {
  kinderUnter18: number
  kinderUeber18: number
  alleinverdiener: boolean
  pendlerKm: number
  pendlerOeffentlich: boolean
  investitionen: number
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

  // 3. Steuerpflichtiges Einkommen
  const steuerpflichtig = Math.max(0, steuerGewinn - grundfreibetrag - ifb)

  // 5. Tarifsteuer (progressiv)
  const steuerBrutto = calcProgressiveTax(steuerpflichtig, year)

  // 6. Absetzbeträge (nur bei Pro)
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

// ── Haupt-SVS-Berechnung ─────────────────────────────────────

export function calculateSvs(
  gewinn: number,
  monatlicheVorschreibung: number,
  year: TaxYear = '2025',
  proOptions?: ProOptions,
): SvsResult {
  const cfg = YEAR_CONFIGS[year]
  const svs = cfg.svs

  // SVS-Beiträge
  const belowMinimum = gewinn < svs.geringfuegigkeit
  const cappedAtMax = gewinn > svs.hoechstbeitrag
  const beitragsgrundlage = belowMinimum ? 0 : Math.min(gewinn, svs.hoechstbeitrag)

  const pvBeitrag = beitragsgrundlage * svs.pvRate
  const kvBeitrag = beitragsgrundlage * svs.kvRate
  const mvBeitrag = beitragsgrundlage * svs.mvRate
  const uvBeitrag = belowMinimum ? 0 : svs.uvMonthly * 12

  const endgueltigeSVS = pvBeitrag + kvBeitrag + mvBeitrag + uvBeitrag
  const vorlaeufigeSVS = monatlicheVorschreibung * 12
  const nachzahlung = endgueltigeSVS - vorlaeufigeSVS
  const sparEmpfehlung = nachzahlung > 0 ? nachzahlung / 12 : 0

  // Einkommensteuer
  const est = calculateEinkommensteuer(gewinn, endgueltigeSVS, year, proOptions)
  const einkommensteuer = est.steuerNetto

  // Netto
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
