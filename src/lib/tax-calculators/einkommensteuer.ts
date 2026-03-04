/**
 * Austrian Income Tax Calculator 2026
 * Calculates ESt based on 7-bracket tariff, tax credits, Familienbonus Plus, GFB.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

// ESt tariff brackets 2026 (lower, upper, rate)
const TAX_BRACKETS: [number, number, number][] = [
  [0, 13_539, 0],
  [13_539.01, 21_992, 0.20],
  [21_992.01, 36_458, 0.30],
  [36_458.01, 70_365, 0.40],
  [70_365.01, 104_859, 0.48],
  [104_859.01, 1_000_000, 0.50],
  [1_000_000.01, Infinity, 0.55],
]

const BRACKET_BASE_TAX = [0, 0, 1_690.60, 5_830.40, 19_393.20, 35_950.32, 483_520.82]

export interface EinkommensteuerInput {
  bruttoeinkommen?: number
  abzuege?: number
  kinder?: number
  kinder_ueber_18?: number
  alleinverdiener?: boolean
  alleinerzieher?: boolean
  pendlerpauschale?: number
  sonderausgaben?: number
  kirchenbeitrag?: number
  selbstaendig?: boolean
  gewinn?: number
}

export interface EinkommensteuerResult {
  bruttoeinkommen: number
  abzuege: {
    werbungskosten_betriebsausgaben: number
    pendlerpauschale: number
    sonderausgaben: number
    kirchenbeitrag: number
    gewinnfreibetrag: number
    gesamt: number
  }
  zu_versteuerndes_einkommen: number
  einkommensteuer_brutto: number
  absetzbetraege: Array<{ name: string; betrag: number }>
  absetzbetraege_gesamt: number
  familienbonus_plus: {
    gesamt: number
    details: Array<{ kind: number; alter: string; bonus: number }>
  }
  kindermehrbetrag: number
  einkommensteuer_netto: number
  grenzsteuersatz: string
  effektivsteuersatz: string
}

function calculateTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0
  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const [lower, upper, rate] = TAX_BRACKETS[i]
    if (taxableIncome <= upper) {
      return r2(BRACKET_BASE_TAX[i] + (taxableIncome - (i > 0 ? lower - 0.01 : 0)) * rate)
    }
  }
  return 0
}

function getMarginalRate(taxableIncome: number): number {
  for (const [, upper, rate] of TAX_BRACKETS) {
    if (taxableIncome <= upper) return rate
  }
  return 0.55
}

function calculateGewinnfreibetrag(profit: number): number {
  if (profit <= 0) return 0
  if (profit <= 33_000) return r2(profit * 0.15)
  if (profit >= 583_000) return 46_400
  const base = 33_000 * 0.15
  const remaining = Math.min(profit, 583_000) - 33_000
  const maxRemaining = 583_000 - 33_000
  return r2(base + (46_400 - base) * (remaining / maxRemaining))
}

function calculateVerkehrsabsetzbetrag(income: number): number {
  if (income <= 16_832) return 798
  if (income <= 28_967) {
    const reduction = ((income - 16_832) / (28_967 - 16_832)) * (798 - 463)
    return r2(798 - reduction)
  }
  return 463
}

function calculateAvabAeab(soleEarner: boolean, singleParent: boolean, totalChildren: number): number {
  if (!soleEarner && !singleParent) return 0
  if (totalChildren === 0) return 0
  if (totalChildren === 1) return 572
  if (totalChildren === 2) return 774
  return 774 + (totalChildren - 2) * 255
}

export function calculateEinkommensteuer(input: EinkommensteuerInput): EinkommensteuerResult {
  const grossIncome = input.bruttoeinkommen ?? 0
  const deductions = input.abzuege ?? 0
  const children = input.kinder ?? 0
  const childrenOver18 = input.kinder_ueber_18 ?? 0
  const soleEarner = input.alleinverdiener ?? false
  const singleParent = input.alleinerzieher ?? false
  const commuterAllowance = input.pendlerpauschale ?? 0
  const specialExpenses = input.sonderausgaben ?? 0
  const churchTax = input.kirchenbeitrag ?? 0
  const isSelfEmployed = input.selbstaendig ?? false
  const profit = input.gewinn ?? 0

  const baseIncome = isSelfEmployed && profit > 0 ? profit : grossIncome
  const gfb = isSelfEmployed && profit > 0 ? calculateGewinnfreibetrag(profit) : 0

  const churchDeduction = Math.min(churchTax, 600)
  const totalDeductions = deductions + commuterAllowance + specialExpenses + churchDeduction + gfb
  const taxableIncome = Math.max(baseIncome - totalDeductions, 0)

  const grossTax = calculateTax(taxableIncome)
  const marginalRate = getMarginalRate(taxableIncome)

  const credits: Array<{ name: string; betrag: number }> = []

  if (!isSelfEmployed) {
    const vab = calculateVerkehrsabsetzbetrag(taxableIncome)
    credits.push({ name: 'Verkehrsabsetzbetrag', betrag: vab })
  }

  const totalChildren = children + childrenOver18
  const avab = calculateAvabAeab(soleEarner, singleParent, totalChildren)
  if (avab > 0) {
    const label = singleParent ? 'Alleinerzieherabsetzbetrag' : 'Alleinverdienerabsetzbetrag'
    credits.push({ name: label, betrag: avab })
  }

  const famDetails: Array<{ kind: number; alter: string; bonus: number }> = []
  let famTotal = 0
  for (let i = 0; i < children; i++) {
    famDetails.push({ kind: i + 1, alter: 'unter 18', bonus: 2_000 })
    famTotal += 2_000
  }
  for (let i = 0; i < childrenOver18; i++) {
    famDetails.push({ kind: children + i + 1, alter: 'ueber 18', bonus: 700 })
    famTotal += 700
  }
  if (famTotal > 0) {
    credits.push({ name: 'Familienbonus Plus', betrag: famTotal })
  }

  const totalCredits = credits.reduce((sum, c) => sum + c.betrag, 0)
  const netTax = Math.max(grossTax - totalCredits, 0)

  let kindermehrbetrag = 0
  if ((soleEarner || singleParent) && grossTax < totalCredits) {
    kindermehrbetrag = Math.min(700, totalCredits - grossTax)
  }

  const effectiveRate = baseIncome > 0 ? r2((netTax / baseIncome) * 100) : 0

  return {
    bruttoeinkommen: baseIncome,
    abzuege: {
      werbungskosten_betriebsausgaben: deductions,
      pendlerpauschale: commuterAllowance,
      sonderausgaben: specialExpenses,
      kirchenbeitrag: churchDeduction,
      gewinnfreibetrag: gfb,
      gesamt: r2(totalDeductions),
    },
    zu_versteuerndes_einkommen: r2(taxableIncome),
    einkommensteuer_brutto: grossTax,
    absetzbetraege: credits,
    absetzbetraege_gesamt: r2(totalCredits),
    familienbonus_plus: { gesamt: famTotal, details: famDetails },
    kindermehrbetrag,
    einkommensteuer_netto: r2(netTax),
    grenzsteuersatz: `${marginalRate * 100} %`,
    effektivsteuersatz: `${effectiveRate} %`,
  }
}
