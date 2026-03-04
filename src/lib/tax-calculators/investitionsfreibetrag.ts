/**
 * Austrian Investment Allowance Calculator 2026
 * IFB (20%/22% eco), Forschungspraemie (14%), Gewinnfreibetrag.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

const IFB_STANDARD_RATE = 0.20
const IFB_OEKO_RATE = 0.22
const IFB_MAX_COST_BASE = 1_000_000
const FORSCHUNGSPRAEMIE_RATE = 0.14
const GWG_GRENZE = 1_000

const EST_BRACKETS: [number, number, number][] = [
  [0, 13_539, 0],
  [13_539.01, 21_992, 0.20],
  [21_992.01, 36_458, 0.30],
  [36_458.01, 70_365, 0.40],
  [70_365.01, 104_859, 0.48],
  [104_859.01, 1_000_000, 0.50],
  [1_000_000.01, Infinity, 0.55],
]

const EXCLUDED_CATEGORIES: Record<string, string> = {
  grundstueck: 'Grundstuecke sind vom IFB ausgeschlossen',
  gebaeude: 'Gebaeude sind vom IFB ausgeschlossen',
  pkw_verbrenner: 'PKW mit Verbrennungsmotor sind vom IFB ausgeschlossen',
  gwg: 'Geringwertige Wirtschaftsgueter (bis EUR 1.000) sind ausgeschlossen',
  gebraucht: 'Gebrauchte Wirtschaftsgueter sind vom IFB ausgeschlossen',
  fossil: 'Anlagen mit fossilen Energietraegern sind ausgeschlossen',
}

export interface InvestitionsfreibetragInput {
  investitionen: Array<{
    bezeichnung?: string
    betrag: number
    kategorie: string
  }>
  gewinn?: number
  forschungsaufwendungen?: number
}

export interface InvestitionsfreibetragResult {
  investitionen_detail: Array<{
    bezeichnung: string
    betrag: number
    kategorie: string
    ifb_faehig: boolean
    ifb_satz: string
    ifb_betrag: number
    grund: string
  }>
  gesamt_investitionen: number
  ifb_faehige_investitionen: number
  ifb_betrag_gesamt: number
  ifb_betrag_ungedeckelt: number
  ifb_deckelung: {
    angewendet: boolean
    max_bemessungsgrundlage: number
  }
  steuerersparnis_geschaetzt: {
    betrag: number
    grenzsteuersatz: string
  }
  forschungspraemie: {
    aufwendungen: number
    praemie_14_prozent: number
    hinweis: string
  }
  gewinnfreibetrag: {
    gewinn: number
    grundfreibetrag: number
    investitionsbedingter_gfb: number
    gesamt_gfb: number
    hinweis?: string
  }
  hinweis_ifb_gfb: string
}

function getMarginalRate(income: number): number {
  for (const [, upper, rate] of EST_BRACKETS) {
    if (income <= upper) return rate
  }
  return 0.55
}

export function calculateInvestitionsfreibetrag(input: InvestitionsfreibetragInput): InvestitionsfreibetragResult {
  const profit = input.gewinn ?? 0
  const researchExpenses = input.forschungsaufwendungen ?? 0

  const details: InvestitionsfreibetragResult['investitionen_detail'] = []
  let totalInvestments = 0
  let eligibleInvestments = 0
  let totalIfbUncapped = 0

  for (const inv of input.investitionen) {
    const amount = inv.betrag
    const name = inv.bezeichnung ?? 'Unbekannt'
    const category = (inv.kategorie ?? 'standard').toLowerCase()

    let eligible = false
    let rate = 0
    let reason = ''

    if (EXCLUDED_CATEGORIES[category]) {
      reason = EXCLUDED_CATEGORIES[category]
    } else if (amount <= GWG_GRENZE && category !== 'oeko') {
      reason = `Betrag bis EUR ${GWG_GRENZE.toLocaleString('de-AT')} (GWG -- Sofortabschreibung)`
    } else if (category === 'oeko') {
      eligible = true
      rate = IFB_OEKO_RATE
      reason = 'Oekologische Investition (22 %)'
    } else {
      eligible = true
      rate = IFB_STANDARD_RATE
      reason = 'Standard-IFB (20 %)'
    }

    const ifbAmount = eligible ? r2(amount * rate) : 0

    details.push({
      bezeichnung: name,
      betrag: amount,
      kategorie: category,
      ifb_faehig: eligible,
      ifb_satz: eligible ? `${rate * 100} %` : '-',
      ifb_betrag: ifbAmount,
      grund: reason,
    })

    totalInvestments += amount
    if (eligible) {
      eligibleInvestments += amount
      totalIfbUncapped += ifbAmount
    }
  }

  // Apply 1M cap
  let totalIfb: number
  let capped = false
  if (eligibleInvestments > IFB_MAX_COST_BASE) {
    const capFactor = IFB_MAX_COST_BASE / eligibleInvestments
    totalIfb = r2(totalIfbUncapped * capFactor)
    capped = true
  } else {
    totalIfb = r2(totalIfbUncapped)
  }

  const marginalRate = profit > 0 ? getMarginalRate(profit) : 0.40
  const taxSaving = r2(totalIfb * marginalRate)

  // Forschungspraemie
  const researchPremium = researchExpenses > 0 ? r2(researchExpenses * FORSCHUNGSPRAEMIE_RATE) : 0

  // GFB
  let grundfreibetrag = 0
  let invGfb = 0
  let gesamtGfb = 0

  if (profit > 0) {
    const grundBasis = Math.min(profit, 33_000)
    grundfreibetrag = r2(grundBasis * 0.15)

    if (profit > 33_000) {
      if (profit >= 583_000) {
        gesamtGfb = 46_400
      } else {
        const remaining = profit - 33_000
        const maxRemaining = 583_000 - 33_000
        const additional = (46_400 - grundfreibetrag) * (remaining / maxRemaining)
        gesamtGfb = r2(grundfreibetrag + additional)
      }
      invGfb = r2(gesamtGfb - grundfreibetrag)
    } else {
      gesamtGfb = grundfreibetrag
    }
  }

  return {
    investitionen_detail: details,
    gesamt_investitionen: r2(totalInvestments),
    ifb_faehige_investitionen: r2(eligibleInvestments),
    ifb_betrag_gesamt: totalIfb,
    ifb_betrag_ungedeckelt: r2(totalIfbUncapped),
    ifb_deckelung: {
      angewendet: capped,
      max_bemessungsgrundlage: IFB_MAX_COST_BASE,
    },
    steuerersparnis_geschaetzt: {
      betrag: taxSaving,
      grenzsteuersatz: `${marginalRate * 100} %`,
    },
    forschungspraemie: {
      aufwendungen: researchExpenses,
      praemie_14_prozent: researchPremium,
      hinweis: 'Die Forschungspraemie ist steuerfrei und wird als Gutschrift erstattet.',
    },
    gewinnfreibetrag: {
      gewinn: profit,
      grundfreibetrag,
      investitionsbedingter_gfb: invGfb,
      gesamt_gfb: gesamtGfb,
      hinweis: 'Grundfreibetrag wird automatisch gewaehrt (keine Investition noetig).',
    },
    hinweis_ifb_gfb: 'IFB und GFB koennen nicht fuer dasselbe Wirtschaftsgut gleichzeitig geltend gemacht werden.',
  }
}
