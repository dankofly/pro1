// ── Investitionsfreibetrag (IFB) Rechner 2026 ──────────────────────────
// Grundlage: § 11 EStG (IFB), § 10 EStG (GFB), § 108c EStG (Forschungsprämie)

import { YEAR_CONFIGS, calcProgressiveTax } from './tax-constants'

export interface Investition {
  id: string
  bezeichnung: string
  betrag: number
  kategorie: 'normal' | 'oekologisch'
}

export interface IFBInput {
  investitionen: Investition[]
  jahresgewinn: number
  forschungsausgaben: number
}

export interface IFBWarnung {
  typ: 'behaltefrist' | 'info'
  text: string
}

export interface IFBResult {
  /** 20 % der normalen Investitionen */
  ifbNormal: number
  /** 22 % der ökologischen Investitionen */
  ifbOeko: number
  /** ifbNormal + ifbOeko */
  ifbGesamt: number
  /** Gewinnfreibetrag nach § 10 EStG */
  gewinnfreibetrag: number
  /** Stufenweise Berechnung des GFB */
  gewinnfreibetragDetails: GFBStufe[]
  /** 14 % der Forschungsausgaben */
  forschungspraemie: number
  /** Geschätzte Steuerersparnis (IFB + GFB als Gewinnminderung × Steuersatz) */
  gesamteSteuerersparnis: number
  /** Effektiver Steuersatz ohne IFB/GFB */
  effektiverSteuersatzOhne: number
  /** Effektiver Steuersatz mit IFB/GFB */
  effektiverSteuersatzMit: number
  /** Summe der normalen Investitionen */
  investitionenNormal: number
  /** Summe der ökologischen Investitionen */
  investitionenOeko: number
  /** Gesamte Investitionsbasis (gedeckelt auf 1 Mio.) */
  investitionsBasis: number
  /** Steuer ohne Freibeträge */
  steuerOhne: number
  /** Steuer mit Freibeträgen */
  steuerMit: number
  /** Warnungen (z.B. Behaltefrist) */
  warnungen: IFBWarnung[]
}

export interface GFBStufe {
  stufe: string
  von: number
  bis: number
  rate: number
  betrag: number
  freibetrag: number
}

// ── Maximale IFB-Investitionsbasis pro Jahr ─────────────────────────
const MAX_IFB_BASIS = 1_000_000

// ── IFB-Sätze ──────────────────────────────────────────────────────
const IFB_RATE_NORMAL = 0.20
const IFB_RATE_OEKO = 0.22

// ── Forschungsprämie ───────────────────────────────────────────────
const FORSCHUNGSPRAEMIE_RATE = 0.14

// ── GFB-Stufen (§ 10 EStG, aus tax-constants.ts abgeleitet) ────────
// Grundfreibetrag: 15 % bis EUR 33.000 (automatisch, ohne Investitionsnachweis)
// Investitionsbedingter GFB: 13 % bis 178.000, 7 % bis 353.000, 4,5 % bis 583.000
// Über EUR 583.000 Bemessungsgrundlage steht kein GFB mehr zu (max. EUR 46.400).
const GFB_CFG = YEAR_CONFIGS['2026'].gewinnfreibetrag

const GFB_STUFEN: { von: number; bis: number; rate: number; label: string }[] = [
  {
    von: 0,
    bis: GFB_CFG.grundfreibetragMaxGewinn,
    rate: GFB_CFG.grundfreibetragRate,
    label: 'Grundfreibetrag (15 %)',
  },
  {
    von: GFB_CFG.grundfreibetragMaxGewinn,
    bis: GFB_CFG.ifbTier1Max,
    rate: GFB_CFG.ifbTier1Rate,
    label: '€ 33.001 – € 178.000 (13 %)',
  },
  {
    von: GFB_CFG.ifbTier1Max,
    bis: GFB_CFG.ifbTier2Max,
    rate: GFB_CFG.ifbTier2Rate,
    label: '€ 178.001 – € 353.000 (7 %)',
  },
  {
    von: GFB_CFG.ifbTier2Max,
    bis: GFB_CFG.ifbTier3Max,
    rate: GFB_CFG.ifbTier3Rate,
    label: '€ 353.001 – € 583.000 (4,5 %)',
  },
]

// ESt nach dem echten 2026er-Tarif (Single Source of Truth: tax-constants.ts)
function calculateESt(einkommen: number): number {
  if (einkommen <= 0) return 0
  return calcProgressiveTax(einkommen, '2026')
}

// ── Gewinnfreibetrag berechnen ──────────────────────────────────────
function calculateGFB(gewinn: number): { total: number; details: GFBStufe[] } {
  const details: GFBStufe[] = []
  let total = 0

  for (const stufe of GFB_STUFEN) {
    if (gewinn <= stufe.von) {
      details.push({
        stufe: stufe.label,
        von: stufe.von,
        bis: stufe.bis === Infinity ? stufe.von : stufe.bis,
        rate: stufe.rate,
        betrag: 0,
        freibetrag: 0,
      })
      continue
    }

    const bisEffektiv = stufe.bis === Infinity ? gewinn : stufe.bis
    const betragInStufe = Math.min(gewinn, bisEffektiv) - stufe.von
    const freibetrag = betragInStufe * stufe.rate

    details.push({
      stufe: stufe.label,
      von: stufe.von,
      bis: bisEffektiv,
      rate: stufe.rate,
      betrag: betragInStufe,
      freibetrag,
    })

    total += freibetrag
  }

  return { total, details }
}

// ── Hauptfunktion ──────────────────────────────────────────────────
export function calculateIFB(input: IFBInput): IFBResult {
  const { investitionen, jahresgewinn, forschungsausgaben } = input

  // Investitionen nach Kategorie summieren
  const investitionenNormal = investitionen
    .filter((i) => i.kategorie === 'normal')
    .reduce((sum, i) => sum + i.betrag, 0)

  const investitionenOeko = investitionen
    .filter((i) => i.kategorie === 'oekologisch')
    .reduce((sum, i) => sum + i.betrag, 0)

  const investitionenGesamt = investitionenNormal + investitionenOeko

  // IFB-Basis: gedeckelt auf 1 Mio. EUR
  const investitionsBasis = Math.min(investitionenGesamt, MAX_IFB_BASIS)

  // Anteilsmäßig deckeln wenn Summe > 1 Mio.
  const deckungsFaktor =
    investitionenGesamt > MAX_IFB_BASIS
      ? MAX_IFB_BASIS / investitionenGesamt
      : 1

  const gedeckeltNormal = investitionenNormal * deckungsFaktor
  const gedeckeltOeko = investitionenOeko * deckungsFaktor

  // IFB berechnen
  const ifbNormal = gedeckeltNormal * IFB_RATE_NORMAL
  const ifbOeko = gedeckeltOeko * IFB_RATE_OEKO
  const ifbGesamt = ifbNormal + ifbOeko

  // Gewinnfreibetrag
  const gfb = calculateGFB(jahresgewinn)

  // Forschungsprämie (direkte Gutschrift, keine Gewinnminderung)
  const forschungspraemie = forschungsausgaben * FORSCHUNGSPRAEMIE_RATE

  // Steuer OHNE Freibeträge
  const steuerOhne = calculateESt(jahresgewinn)

  // Steuer MIT IFB + GFB (beide mindern den steuerpflichtigen Gewinn)
  const gewinnNachAbzug = Math.max(0, jahresgewinn - ifbGesamt - gfb.total)
  const steuerMit = calculateESt(gewinnNachAbzug)

  // Gesamte Steuerersparnis: Differenz + Forschungsprämie (direkte Gutschrift)
  const gesamteSteuerersparnis = steuerOhne - steuerMit + forschungspraemie

  // Effektive Steuersätze
  const effektiverSteuersatzOhne =
    jahresgewinn > 0 ? steuerOhne / jahresgewinn : 0
  const effektiverSteuersatzMit =
    jahresgewinn > 0 ? Math.max(0, steuerMit - forschungspraemie) / jahresgewinn : 0

  // ── Warnungen ──
  const warnungen: IFBWarnung[] = []

  if (ifbGesamt > 0) {
    warnungen.push({
      typ: 'behaltefrist',
      text: `Behaltefrist beachten: Wirtschaftsgüter, für die ein IFB geltend gemacht wird, müssen mindestens 4 Jahre im Betriebsvermögen verbleiben (§ 11 Abs 3 EStG). Bei vorzeitigem Ausscheiden wird der IFB (${Math.round(ifbGesamt).toLocaleString('de-AT')} €) gewinnerhöhend nachversteuert.`,
    })
  }

  if (ifbGesamt > 0 && jahresgewinn > GFB_CFG.grundfreibetragMaxGewinn) {
    warnungen.push({
      typ: 'info',
      text: 'Doppelförderungsverbot: Für dasselbe Wirtschaftsgut können IFB (§ 11 EStG) und investitionsbedingter Gewinnfreibetrag (§ 10 EStG) nicht gleichzeitig geltend gemacht werden. Der hier ausgewiesene GFB über dem Grundfreibetrag setzt zusätzliche begünstigte Investitionen oder Wertpapiere voraus.',
    })
  }

  return {
    ifbNormal,
    ifbOeko,
    ifbGesamt,
    gewinnfreibetrag: gfb.total,
    gewinnfreibetragDetails: gfb.details,
    forschungspraemie,
    gesamteSteuerersparnis,
    effektiverSteuersatzOhne,
    effektiverSteuersatzMit,
    investitionenNormal,
    investitionenOeko,
    investitionsBasis,
    steuerOhne,
    steuerMit,
    warnungen,
  }
}
