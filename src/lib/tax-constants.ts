// ============================================================
// Zentrale Steuer- & SV-Konstanten – Österreich 2024 / 2025 / 2026
// Single Source of Truth für SVS-Rechner UND Misch-Einkommen-Rechner
//
// Quellen:
//   - WKO: wko.at/steuern/einkommen-koerperschaftsteuer-2026
//   - WKO: wko.at/steuern/werte-einkommen-koerperschaftsteuer-ab-2025
//   - WKO: wko.at/steuern/aktuelle-werte-einkommen-koerperschaftsteuer-ab-2024
//   - SVS:  svs.at (Beitragstabellen)
//   - WKO:  wko.at/sozialversicherung/gewerbliche-sozialversicherungsbeitraege-ausmass
// ============================================================

// ── Typen ────────────────────────────────────────────────────

export type TaxYear = '2024' | '2025' | '2026'

export const TAX_YEARS: { value: TaxYear; label: string }[] = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
]

export interface TaxBracket {
  from: number
  to: number
  rate: number
}

export interface SvsRatesConfig {
  pvRate: number              // Pensionsversicherung (GSVG)
  kvRate: number              // Krankenversicherung (GSVG)
  mvRate: number              // Selbständigenvorsorge (1,53% der KV-BGL)
  uvMonthly: number           // Unfallversicherung fix/Monat
  gesamtRate: number          // PV + KV + MV
  geringfuegigkeit: number    // Geringfügigkeitsgrenze/Jahr (Gewerbetreibende)
  hoechstbeitrag: number      // Höchstbeitragsgrundlage/Jahr (GSVG)
  minBeitragsgrundlage: number // Mindestbeitragsgrundlage/Jahr (GSVG)
}

export interface AbsetzbetraegeConfig {
  familienbonusUnder18: number   // Familienbonus Plus pro Kind < 18
  familienbonusOver18: number    // Familienbonus Plus pro Kind ≥ 18
  avab1Kind: number              // Alleinverdiener-/Alleinerzieherabsetzbetrag: 1 Kind
  avab2Kinder: number            // AVAB: 2 Kinder
  avabJeWeiteres: number         // AVAB: je weiteres Kind ab dem 3.
  verkehrsabsetzbetrag: number   // Verkehrsabsetzbetrag (Basis)
  kindermehrbetrag: number       // Kindermehrbetrag (max pro Kind)
}

export interface GewinnfreibetragConfig {
  grundfreibetragRate: number       // 15%
  grundfreibetragMaxGewinn: number  // €33.000
  ifbTier1Rate: number              // 13% (€33k–€175k)
  ifbTier1Max: number               // €175.000
  ifbTier2Rate: number              // 7% (€175k–€350k)
  ifbTier2Max: number               // €350.000
  ifbTier3Rate: number              // 4,5% (€350k–€580k)
  ifbTier3Max: number               // €580.000
}

export interface PendlerpauschaleConfig {
  // Kleines Pendlerpauschale (Öffentliche zumutbar)
  kleinFrom20km: number    // 20–39 km
  kleinFrom40km: number    // 40–59 km
  kleinFrom60km: number    // 60+ km
  // Großes Pendlerpauschale (Öffentliche NICHT zumutbar)
  grossFrom2km: number     // 2–19 km
  grossFrom20km: number    // 20–39 km
  grossFrom40km: number    // 40–59 km
  grossFrom60km: number    // 60+ km
}

export interface YearConfig {
  svs: SvsRatesConfig
  taxBrackets: TaxBracket[]
  absetzbetraege: AbsetzbetraegeConfig
  gewinnfreibetrag: GewinnfreibetragConfig
  pendlerpauschale: PendlerpauschaleConfig
  // Angestellten-spezifische Werte (für Misch-Einkommen-Rechner)
  employeeSvRate: number                     // DN-SV-Anteil (KV+PV+AV+AK+WF)
  werbungskostenpauschale: number            // Werbungskostenpauschale
  svHoechstbeitragsgrundlageAngestellt: number  // ASVG HBGL/Jahr
  versicherungsgrenze: number                // Versicherungsgrenze Neue Selbständige/Jahr
}

// ── Konstante Werte (alle Jahre gleich) ───────────────────────

const GEWINNFREIBETRAG: GewinnfreibetragConfig = {
  grundfreibetragRate: 0.15,
  grundfreibetragMaxGewinn: 33000,
  ifbTier1Rate: 0.13,
  ifbTier1Max: 175000,
  ifbTier2Rate: 0.07,
  ifbTier2Max: 350000,
  ifbTier3Rate: 0.045,
  ifbTier3Max: 580000,
}

const PENDLERPAUSCHALE: PendlerpauschaleConfig = {
  kleinFrom20km: 696,
  kleinFrom40km: 1356,
  kleinFrom60km: 2016,
  grossFrom2km: 372,
  grossFrom20km: 1476,
  grossFrom40km: 2568,
  grossFrom60km: 3672,
}

// ── 2024 ──────────────────────────────────────────────────────

const CONFIG_2024: YearConfig = {
  svs: {
    pvRate: 0.185,
    kvRate: 0.068,
    mvRate: 0.0153,
    uvMonthly: 11.35,
    gesamtRate: 0.185 + 0.068 + 0.0153, // 0.2683
    geringfuegigkeit: 6221.28,
    hoechstbeitrag: 84840,
    minBeitragsgrundlage: 6221.28,
  },
  taxBrackets: [
    { from: 0,       to: 12816,   rate: 0    },
    { from: 12816,   to: 20818,   rate: 0.20 },
    { from: 20818,   to: 34513,   rate: 0.30 },
    { from: 34513,   to: 66612,   rate: 0.40 },
    { from: 66612,   to: 99266,   rate: 0.48 },
    { from: 99266,   to: 1000000, rate: 0.50 },
    { from: 1000000, to: Infinity, rate: 0.55 },
  ],
  absetzbetraege: {
    familienbonusUnder18: 2000,
    familienbonusOver18: 700,
    avab1Kind: 572,
    avab2Kinder: 774,
    avabJeWeiteres: 255,
    verkehrsabsetzbetrag: 463,
    kindermehrbetrag: 700,
  },
  gewinnfreibetrag: GEWINNFREIBETRAG,
  pendlerpauschale: PENDLERPAUSCHALE,
  employeeSvRate: 0.1812,
  werbungskostenpauschale: 132,
  svHoechstbeitragsgrundlageAngestellt: 72720,
  versicherungsgrenze: 6010.92,
}

// ── 2025 ──────────────────────────────────────────────────────

const CONFIG_2025: YearConfig = {
  svs: {
    pvRate: 0.185,
    kvRate: 0.068,
    mvRate: 0.0153,
    uvMonthly: 12.07,
    gesamtRate: 0.185 + 0.068 + 0.0153,
    geringfuegigkeit: 6613.20,
    hoechstbeitrag: 90300,
    minBeitragsgrundlage: 6613.20,
  },
  taxBrackets: [
    { from: 0,       to: 13308,   rate: 0    },
    { from: 13308,   to: 21617,   rate: 0.20 },
    { from: 21617,   to: 35836,   rate: 0.30 },
    { from: 35836,   to: 69166,   rate: 0.40 },
    { from: 69166,   to: 103072,  rate: 0.48 },
    { from: 103072,  to: 1000000, rate: 0.50 },
    { from: 1000000, to: Infinity, rate: 0.55 },
  ],
  absetzbetraege: {
    familienbonusUnder18: 2000,
    familienbonusOver18: 700,
    avab1Kind: 601,
    avab2Kinder: 813,
    avabJeWeiteres: 268,
    verkehrsabsetzbetrag: 487,
    kindermehrbetrag: 700,
  },
  gewinnfreibetrag: GEWINNFREIBETRAG,
  pendlerpauschale: PENDLERPAUSCHALE,
  employeeSvRate: 0.1812,
  werbungskostenpauschale: 132,
  svHoechstbeitragsgrundlageAngestellt: 77400,
  versicherungsgrenze: 6613.20,
}

// ── 2026 ──────────────────────────────────────────────────────

const CONFIG_2026: YearConfig = {
  svs: {
    pvRate: 0.185,
    kvRate: 0.068,
    mvRate: 0.0153,
    uvMonthly: 12.95,
    gesamtRate: 0.185 + 0.068 + 0.0153,
    geringfuegigkeit: 6613.20, // Eingefroren auf 2025-Niveau
    hoechstbeitrag: 97020,
    minBeitragsgrundlage: 6613.20,
  },
  taxBrackets: [
    { from: 0,       to: 13539,   rate: 0    },
    { from: 13539,   to: 21992,   rate: 0.20 },
    { from: 21992,   to: 36458,   rate: 0.30 },
    { from: 36458,   to: 70365,   rate: 0.40 },
    { from: 70365,   to: 104859,  rate: 0.48 },
    { from: 104859,  to: 1000000, rate: 0.50 },
    { from: 1000000, to: Infinity, rate: 0.55 },
  ],
  absetzbetraege: {
    familienbonusUnder18: 2000,   // Nicht valorisiert 2026
    familienbonusOver18: 700,     // Nicht valorisiert 2026
    avab1Kind: 612,
    avab2Kinder: 828,
    avabJeWeiteres: 273,
    verkehrsabsetzbetrag: 496,
    kindermehrbetrag: 700,        // Nicht valorisiert 2026
  },
  gewinnfreibetrag: GEWINNFREIBETRAG,
  pendlerpauschale: PENDLERPAUSCHALE,
  employeeSvRate: 0.1812,
  werbungskostenpauschale: 132,
  svHoechstbeitragsgrundlageAngestellt: 83340,
  versicherungsgrenze: 6613.20,
}

// ── Export ────────────────────────────────────────────────────

export const YEAR_CONFIGS: Record<TaxYear, YearConfig> = {
  '2024': CONFIG_2024,
  '2025': CONFIG_2025,
  '2026': CONFIG_2026,
}

// ── Hilfsfunktionen ──────────────────────────────────────────

/** Progressive Einkommensteuer berechnen (Tarif) */
export function calcProgressiveTax(taxableIncome: number, year: TaxYear): number {
  const brackets = YEAR_CONFIGS[year].taxBrackets
  let tax = 0
  for (const b of brackets) {
    if (taxableIncome <= b.from) break
    tax += (Math.min(taxableIncome, b.to) - b.from) * b.rate
  }
  return tax
}

/** Grenzsteuersatz ermitteln */
export function getGrenzsteuersatz(taxableIncome: number, year: TaxYear): number {
  const brackets = YEAR_CONFIGS[year].taxBrackets
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].from) return brackets[i].rate
  }
  return 0
}

/** Pendlerpauschale berechnen */
export function calcPendlerpauschale(km: number, oeffentlich: boolean, year: TaxYear): number {
  const pp = YEAR_CONFIGS[year].pendlerpauschale
  if (km < 2) return 0

  if (oeffentlich) {
    if (km >= 60) return pp.kleinFrom60km
    if (km >= 40) return pp.kleinFrom40km
    if (km >= 20) return pp.kleinFrom20km
    return 0
  } else {
    if (km >= 60) return pp.grossFrom60km
    if (km >= 40) return pp.grossFrom40km
    if (km >= 20) return pp.grossFrom20km
    if (km >= 2) return pp.grossFrom2km
    return 0
  }
}

/** AVAB/AEAB berechnen */
export function calcAvab(kinderCount: number, year: TaxYear): number {
  if (kinderCount <= 0) return 0
  const cfg = YEAR_CONFIGS[year].absetzbetraege
  if (kinderCount === 1) return cfg.avab1Kind
  if (kinderCount === 2) return cfg.avab2Kinder
  return cfg.avab2Kinder + (kinderCount - 2) * cfg.avabJeWeiteres
}

/** Investitionsbedingter Gewinnfreibetrag (IFB) — max. möglicher Betrag */
export function calcMaxIFB(gewinn: number, year: TaxYear): number {
  const gfb = YEAR_CONFIGS[year].gewinnfreibetrag
  if (gewinn <= gfb.grundfreibetragMaxGewinn) return 0

  const tier1Basis = Math.max(0, Math.min(gewinn, gfb.ifbTier1Max) - gfb.grundfreibetragMaxGewinn)
  const tier2Basis = gewinn > gfb.ifbTier1Max ? Math.max(0, Math.min(gewinn, gfb.ifbTier2Max) - gfb.ifbTier1Max) : 0
  const tier3Basis = gewinn > gfb.ifbTier2Max ? Math.max(0, Math.min(gewinn, gfb.ifbTier3Max) - gfb.ifbTier2Max) : 0

  return tier1Basis * gfb.ifbTier1Rate
    + tier2Basis * gfb.ifbTier2Rate
    + tier3Basis * gfb.ifbTier3Rate
}

/** Tatsächlicher IFB (begrenzt durch Investitionen und max. IFB) */
export function calcActualIFB(gewinn: number, investitionen: number, year: TaxYear): number {
  if (investitionen <= 0) return 0
  const maxIFB = calcMaxIFB(gewinn, year)
  return Math.min(investitionen, maxIFB)
}

/** Grundfreibetrag (15% bis €33.000) */
export function calcGrundfreibetrag(gewinn: number, year: TaxYear): number {
  const gfb = YEAR_CONFIGS[year].gewinnfreibetrag
  return Math.min(gewinn, gfb.grundfreibetragMaxGewinn) * gfb.grundfreibetragRate
}
