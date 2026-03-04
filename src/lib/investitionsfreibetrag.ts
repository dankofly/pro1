// ── Investitionsfreibetrag (IFB) Rechner 2026 ──────────────────────────
// Grundlage: § 11 EStG (IFB), § 10 EStG (GFB), § 108c EStG (Forschungsprämie)

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

// ── GFB-Stufen 2026 ───────────────────────────────────────────────
// Grundfreibetrag: 15 % bis EUR 33.000 (automatisch, ohne Investitionsnachweis)
// Investitionsbedingter GFB: gestaffelt darüber
const GFB_STUFEN: { von: number; bis: number; rate: number; label: string }[] = [
  { von: 0, bis: 33_000, rate: 0.15, label: 'Grundfreibetrag (15 %)' },
  { von: 33_000, bis: 220_000, rate: 0.13, label: '€ 33.001 – € 220.000 (13 %)' },
  { von: 220_000, bis: 580_000, rate: 0.07, label: '€ 220.001 – € 580.000 (7 %)' },
  { von: 580_000, bis: Infinity, rate: 0.045, label: 'Ab € 580.001 (4,5 %)' },
]

// ── Vereinfachte ESt-Berechnung (AT 2026 Tarif) ────────────────────
const TAX_BRACKETS: { von: number; bis: number; rate: number }[] = [
  { von: 0, bis: 12_816, rate: 0.00 },
  { von: 12_816, bis: 20_818, rate: 0.20 },
  { von: 20_818, bis: 34_513, rate: 0.30 },
  { von: 34_513, bis: 66_612, rate: 0.40 },
  { von: 66_612, bis: 99_266, rate: 0.48 },
  { von: 99_266, bis: 1_000_000, rate: 0.50 },
  { von: 1_000_000, bis: Infinity, rate: 0.55 },
]

function calculateESt(einkommen: number): number {
  if (einkommen <= 0) return 0
  let steuer = 0
  for (const bracket of TAX_BRACKETS) {
    if (einkommen <= bracket.von) break
    const taxableInBracket = Math.min(einkommen, bracket.bis) - bracket.von
    steuer += taxableInBracket * bracket.rate
  }
  return steuer
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
  }
}
