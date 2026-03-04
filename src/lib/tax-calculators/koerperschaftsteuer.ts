/**
 * Austrian Corporate Tax Calculator 2026
 * KoeSt + KESt on distributions, legal form comparison.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

const KOEST_RATE = 0.23
const KEST_RATE = 0.275
const MINDEST_KOEST_GMBH = 500
const MINDEST_KOEST_AG = 3_500
const VERLUST_VORTRAGS_GRENZE = 0.75

const EST_BRACKETS: [number, number, number][] = [
  [0, 13_539, 0],
  [13_539.01, 21_992, 0.20],
  [21_992.01, 36_458, 0.30],
  [36_458.01, 70_365, 0.40],
  [70_365.01, 104_859, 0.48],
  [104_859.01, 1_000_000, 0.50],
  [1_000_000.01, Infinity, 0.55],
]

const EST_BASE_TAX = [0, 0, 1_690.60, 5_830.40, 19_393.20, 35_950.32, 483_520.82]

export interface KoerperschaftsteuerInput {
  gewinn: number
  stammkapital?: number
  ausschuettung_prozent?: number
  rechtsform?: 'gmbh' | 'flexco' | 'einzelunternehmen' | 'ag'
  verlustvortraege?: number
}

interface CorporateCalc {
  rechtsform: string
  gewinn: number
  verlustvortraege_genutzt: number
  steuerpflichtiger_gewinn: number
  koerperschaftsteuer: number
  mindestkoest: number
  mindestkoest_angewendet: boolean
  gewinn_nach_koest: number
  ausschuettung: number
  ausschuettung_prozent: number
  kest_auf_ausschuettung: number
  netto_gesellschafter: number
  thesaurierung: number
  gesamtsteuerbelastung: number
  effektive_steuerquote: string
}

interface EUCalc {
  rechtsform: string
  gewinn: number
  gewinnfreibetrag: number
  zu_versteuerndes_einkommen: number
  einkommensteuer: number
  netto: number
  gesamtsteuerbelastung: number
  effektive_steuerquote: string
}

export interface KoerperschaftsteuerResult {
  berechnung: CorporateCalc | EUCalc
  rechtsformvergleich: Array<{
    rechtsform: string
    steuerbelastung: number
    netto: number
    effektive_quote: string
  }>
  empfehlung: string
  thesaurierung_vs_ausschuettung: {
    vollthesaurierung: { steuerbelastung: number; effektive_quote: string }
    vollausschuettung: { steuerbelastung: number; effektive_quote: string }
  }
}

function calculateESt(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0
  for (let i = 0; i < EST_BRACKETS.length; i++) {
    const [lower, upper, rate] = EST_BRACKETS[i]
    if (taxableIncome <= upper) {
      return r2(EST_BASE_TAX[i] + (taxableIncome - (i > 0 ? lower - 0.01 : 0)) * rate)
    }
  }
  return 0
}

function calculateGFB(profit: number): number {
  if (profit <= 0) return 0
  if (profit <= 33_000) return r2(profit * 0.15)
  if (profit >= 583_000) return 46_400
  const base = 33_000 * 0.15
  const remaining = Math.min(profit, 583_000) - 33_000
  const maxRemaining = 583_000 - 33_000
  return r2(base + (46_400 - base) * (remaining / maxRemaining))
}

function calcCorporate(profit: number, legalForm: string, distPct: number, lossCarryforward: number): CorporateCalc {
  const usableLoss = Math.min(lossCarryforward, profit * VERLUST_VORTRAGS_GRENZE)
  const taxableProfit = Math.max(profit - usableLoss, 0)

  const koest = r2(taxableProfit * KOEST_RATE)
  const mindest = legalForm === 'ag' ? MINDEST_KOEST_AG : MINDEST_KOEST_GMBH
  const koestFinal = profit > 0 ? Math.max(koest, mindest) : mindest

  const profitAfterKoest = Math.max(profit - koestFinal, 0)
  const distribution = r2(profitAfterKoest * distPct / 100)
  const kest = r2(distribution * KEST_RATE)
  const netShareholder = r2(distribution - kest)
  const retained = r2(profitAfterKoest - distribution)
  const totalTax = r2(koestFinal + kest)
  const effectiveRate = profit > 0 ? r2((totalTax / profit) * 100) : 0

  return {
    rechtsform: legalForm.toUpperCase(),
    gewinn: profit,
    verlustvortraege_genutzt: r2(usableLoss),
    steuerpflichtiger_gewinn: r2(taxableProfit),
    koerperschaftsteuer: koestFinal,
    mindestkoest: mindest,
    mindestkoest_angewendet: koestFinal === mindest && koest < mindest,
    gewinn_nach_koest: r2(profitAfterKoest),
    ausschuettung: distribution,
    ausschuettung_prozent: distPct,
    kest_auf_ausschuettung: kest,
    netto_gesellschafter: netShareholder,
    thesaurierung: retained,
    gesamtsteuerbelastung: totalTax,
    effektive_steuerquote: `${effectiveRate} %`,
  }
}

function calcEU(profit: number): EUCalc {
  const gfb = calculateGFB(profit)
  const taxable = Math.max(profit - gfb, 0)
  const est = calculateESt(taxable)
  const net = r2(profit - est)
  const effectiveRate = profit > 0 ? r2((est / profit) * 100) : 0

  return {
    rechtsform: 'Einzelunternehmen',
    gewinn: profit,
    gewinnfreibetrag: gfb,
    zu_versteuerndes_einkommen: r2(taxable),
    einkommensteuer: est,
    netto: net,
    gesamtsteuerbelastung: est,
    effektive_steuerquote: `${effectiveRate} %`,
  }
}

export function calculateKoerperschaftsteuer(input: KoerperschaftsteuerInput): KoerperschaftsteuerResult {
  const profit = input.gewinn
  const distPct = input.ausschuettung_prozent ?? 100
  const legalForm = input.rechtsform ?? 'gmbh'
  const lossCarryforward = input.verlustvortraege ?? 0

  const mainResult = legalForm === 'einzelunternehmen'
    ? calcEU(profit)
    : calcCorporate(profit, legalForm, distPct, lossCarryforward)

  const gmbh = calcCorporate(profit, 'gmbh', distPct, lossCarryforward)
  const flexco = calcCorporate(profit, 'flexco', distPct, lossCarryforward)
  const eu = calcEU(profit)

  const comparison = [
    { rechtsform: 'GmbH', steuerbelastung: gmbh.gesamtsteuerbelastung, netto: gmbh.netto_gesellschafter, effektive_quote: gmbh.effektive_steuerquote },
    { rechtsform: 'FlexCo', steuerbelastung: flexco.gesamtsteuerbelastung, netto: flexco.netto_gesellschafter, effektive_quote: flexco.effektive_steuerquote },
    { rechtsform: 'Einzelunternehmen', steuerbelastung: eu.gesamtsteuerbelastung, netto: eu.netto, effektive_quote: eu.effektive_steuerquote },
  ]

  const best = comparison.reduce((a, b) => a.steuerbelastung <= b.steuerbelastung ? a : b)

  const thesaurierung = calcCorporate(profit, legalForm === 'einzelunternehmen' ? 'gmbh' : legalForm, 0, lossCarryforward)
  const vollausschuettung = calcCorporate(profit, legalForm === 'einzelunternehmen' ? 'gmbh' : legalForm, 100, lossCarryforward)

  return {
    berechnung: mainResult,
    rechtsformvergleich: comparison,
    empfehlung: `${best.rechtsform} ist bei diesem Gewinn steuerlich am guenstigsten (${best.effektive_quote}).`,
    thesaurierung_vs_ausschuettung: {
      vollthesaurierung: { steuerbelastung: thesaurierung.gesamtsteuerbelastung, effektive_quote: thesaurierung.effektive_steuerquote },
      vollausschuettung: { steuerbelastung: vollausschuettung.gesamtsteuerbelastung, effektive_quote: vollausschuettung.effektive_steuerquote },
    },
  }
}
