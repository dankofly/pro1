// ── Sachbezug-Rechner 2026 — Dienstwagen & Mitarbeiter-Benefits ──

export interface DienstwagenInput {
  co2: number          // g/km (WLTP)
  listenpreis: number  // EUR inkl. USt
  privatnutzung: boolean
}

export interface BenefitsInput {
  essensgutscheine: boolean    // EUR 8/Arbeitstag (ca. 220 Tage)
  zukunftssicherung: boolean   // EUR 300/Jahr steuerfrei
  mitarbeiterrabatt: boolean   // EUR 1.000 Freibetrag/Jahr
  oeffiTicket: boolean         // steuerfrei (Jobticket)
  dienstEBike: boolean         // steuerfrei
  startupPraemie: boolean      // EUR 4.500 Mitarbeiterprämie
  homeoffice: boolean          // EUR 3/Tag, max 100 Tage = EUR 300
  kinderbetreuung: boolean     // EUR 2.000/Kind/Jahr steuerfrei
  kinderAnzahl: number
}

export interface SachbezugResult {
  dienstwagen: {
    sachbezugProzent: number   // 2, 1.5, or 0
    sachbezugMonat: number
    sachbezugJahr: number
    deckelung: number          // 960 or 720 or 0
  } | null
  benefits: {
    name: string
    wertArbeitnehmer: number   // annual value to employee
    kostenArbeitgeber: number  // annual cost to employer
    sachbezugswert: number     // what goes on payslip (0 if tax-free)
    steuerfrei: boolean
  }[]
  gesamtSachbezug: number
  gesamtWertArbeitnehmer: number
  lohnnebenkostenErsparnis: number
  aequivalentBrutto: number    // equivalent gross salary increase
}

// ── Constants ──

/** Approximate employer side-cost rate (DB + DZ + KommSt + BVK + SV-DG) */
const LOHNNEBENKOSTEN_RATE = 0.3028

/** Working days per year (standard) */
const ARBEITSTAGE = 220

// ── PKW Sachbezug ──

function calculateDienstwagen(input: DienstwagenInput): SachbezugResult['dienstwagen'] {
  // No private use => no Sachbezug
  if (!input.privatnutzung) {
    return {
      sachbezugProzent: 0,
      sachbezugMonat: 0,
      sachbezugJahr: 0,
      deckelung: 0,
    }
  }

  // E-Auto: CO2 = 0 => 0% Sachbezug (steuerfrei)
  if (input.co2 === 0) {
    return {
      sachbezugProzent: 0,
      sachbezugMonat: 0,
      sachbezugJahr: 0,
      deckelung: 0,
    }
  }

  // CO2 <= 141 g/km => 1.5%, max EUR 720/month
  if (input.co2 <= 141) {
    const raw = input.listenpreis * 0.015
    const monat = Math.min(raw, 720)
    return {
      sachbezugProzent: 1.5,
      sachbezugMonat: monat,
      sachbezugJahr: monat * 12,
      deckelung: 720,
    }
  }

  // CO2 > 141 g/km => 2%, max EUR 960/month
  const raw = input.listenpreis * 0.02
  const monat = Math.min(raw, 960)
  return {
    sachbezugProzent: 2,
    sachbezugMonat: monat,
    sachbezugJahr: monat * 12,
    deckelung: 960,
  }
}

// ── Benefits ──

function calculateBenefits(input: BenefitsInput): SachbezugResult['benefits'] {
  const benefits: SachbezugResult['benefits'] = []

  if (input.essensgutscheine) {
    const wert = 8 * ARBEITSTAGE // EUR 1.760
    benefits.push({
      name: 'Essensgutscheine',
      wertArbeitnehmer: wert,
      kostenArbeitgeber: wert,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.zukunftssicherung) {
    benefits.push({
      name: 'Zukunftssicherung (bAV)',
      wertArbeitnehmer: 300,
      kostenArbeitgeber: 300,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.mitarbeiterrabatt) {
    benefits.push({
      name: 'Mitarbeiterrabatt',
      wertArbeitnehmer: 1000,
      kostenArbeitgeber: 1000,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.oeffiTicket) {
    // Average annual ticket cost (Klimaticket ~ EUR 1.095)
    const wert = 1095
    benefits.push({
      name: 'Öffi-Ticket / Klimaticket',
      wertArbeitnehmer: wert,
      kostenArbeitgeber: wert,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.dienstEBike) {
    // Typical annual leasing cost for e-bike
    const wert = 1200
    benefits.push({
      name: 'Dienst-E-Bike',
      wertArbeitnehmer: wert,
      kostenArbeitgeber: wert,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.startupPraemie) {
    benefits.push({
      name: 'Mitarbeiterprämie',
      wertArbeitnehmer: 4500,
      kostenArbeitgeber: 4500,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.homeoffice) {
    // EUR 3/Tag, max 100 Tage = EUR 300
    const wert = 300
    benefits.push({
      name: 'Homeoffice-Pauschale',
      wertArbeitnehmer: wert,
      kostenArbeitgeber: wert,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  if (input.kinderbetreuung && input.kinderAnzahl > 0) {
    const wert = 2000 * input.kinderAnzahl
    benefits.push({
      name: `Kinderbetreuung (${input.kinderAnzahl} Kind${input.kinderAnzahl > 1 ? 'er' : ''})`,
      wertArbeitnehmer: wert,
      kostenArbeitgeber: wert,
      sachbezugswert: 0,
      steuerfrei: true,
    })
  }

  return benefits
}

// ── Main Calculation ──

export function calculateSachbezug(
  dienstwagen: DienstwagenInput | null,
  benefits: BenefitsInput
): SachbezugResult {
  const dienstwagenResult = dienstwagen ? calculateDienstwagen(dienstwagen) : null
  const benefitsList = calculateBenefits(benefits)

  // Total Sachbezug = what appears on the payslip (taxable)
  const dienstwagenSachbezug = dienstwagenResult?.sachbezugJahr ?? 0
  const benefitsSachbezug = benefitsList.reduce((sum, b) => sum + b.sachbezugswert, 0)
  const gesamtSachbezug = dienstwagenSachbezug + benefitsSachbezug

  // Total value to employee (all benefits including tax-free)
  const dienstwagenWert = dienstwagenResult
    ? (dienstwagen?.listenpreis ?? 0) > 0
      ? dienstwagenResult.sachbezugJahr > 0
        ? dienstwagenResult.sachbezugJahr // taxable car = value equals Sachbezug conceptually
        : (dienstwagen?.listenpreis ?? 0) * 0.015 * 12 // E-car: estimated value
      : 0
    : 0
  const benefitsWert = benefitsList.reduce((sum, b) => sum + b.wertArbeitnehmer, 0)
  const gesamtWertArbeitnehmer = benefitsWert + (dienstwagenResult ? dienstwagenWert : 0)

  // Employer saves Lohnnebenkosten on tax-free benefits vs. equivalent gross
  // Equivalent gross = how much gross salary would the employee need to get the same net?
  // Approximate: net benefit / (1 - marginal tax rate ~42% - SV ~18%) => factor ~2.5
  const BRUTTO_FAKTOR = 2.0 // conservative factor
  const steuerfreiBenefitsWert = benefitsList
    .filter(b => b.steuerfrei)
    .reduce((sum, b) => sum + b.wertArbeitnehmer, 0)
  const aequivalentBrutto = steuerfreiBenefitsWert * BRUTTO_FAKTOR
  const lohnnebenkostenErsparnis = aequivalentBrutto * LOHNNEBENKOSTEN_RATE

  return {
    dienstwagen: dienstwagenResult,
    benefits: benefitsList,
    gesamtSachbezug,
    gesamtWertArbeitnehmer,
    lohnnebenkostenErsparnis,
    aequivalentBrutto,
  }
}
