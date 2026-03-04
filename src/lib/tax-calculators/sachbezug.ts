/**
 * Austrian Fringe Benefits Calculator 2026
 * Sachbezugswerte for company cars (CO2-based), tax-free employee benefits.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

const CO2_GRENZWERT_2026 = 129
const SACHBEZUG_STANDARD_PCT = 0.02
const SACHBEZUG_NIEDRIG_PCT = 0.015
const SACHBEZUG_STANDARD_CAP = 960
const SACHBEZUG_NIEDRIG_CAP = 720
const ESTIMATED_MARGINAL_RATE = 0.40

const BENEFIT_LIMITS: Record<string, { limit?: number; per_day?: number; period: string; label: string }> = {
  zukunftssicherung: { limit: 300, period: 'Jahr', label: 'Zukunftssicherung (Paragraph 3 Abs. 1 Z 15a)' },
  mitarbeiterrabatt: { limit: 1_000, period: 'Jahr', label: 'Mitarbeiterrabatt' },
  essensgutscheine_gaststaette: { per_day: 8, period: 'Tag', label: 'Essensgutscheine (Gaststaette)' },
  essensgutscheine_lebensmittel: { per_day: 2, period: 'Tag', label: 'Essensgutscheine (Lebensmittel)' },
  oeffi_ticket: { limit: Infinity, period: 'Jahr', label: 'Oeffi-Ticket / Klimaticket' },
  kinderbetreuung: { limit: 2_000, period: 'Jahr', label: 'Kinderbetreuungszuschuss (pro Kind)' },
  gewinnbeteiligung: { limit: 3_000, period: 'Jahr', label: 'Mitarbeitergewinnbeteiligung' },
  startup_beteiligung: { limit: 4_500, period: 'Jahr', label: 'Startup-Mitarbeiterbeteiligung' },
  betriebsveranstaltung: { limit: 365, period: 'Jahr', label: 'Betriebsveranstaltungen' },
  weihnachtsgeschenk: { limit: 186, period: 'Jahr', label: 'Weihnachtsgeschenk' },
  e_bike: { limit: Infinity, period: 'Jahr', label: 'Dienst-E-Bike / E-Scooter' },
  carsharing: { limit: 200, period: 'Jahr', label: 'Carsharing-Zuschuss (CO2-frei)' },
  wallbox: { limit: 2_000, period: 'einmalig', label: 'Wallbox-Zuschuss' },
  laden_arbeitgeber: { limit: Infinity, period: 'Jahr', label: 'E-Auto Laden beim AG' },
  laden_zuhause: { limit: 360, period: 'Jahr', label: 'E-Auto Laden zu Hause (EUR 30/Monat)' },
}

export interface SachbezugInput {
  dienstwagen?: {
    listenpreis: number
    co2_emission: number
    ist_elektro?: boolean
    privat_km_monat?: number
  }
  benefits?: Array<{
    typ: string
    betrag?: number
    tage?: number
    kinder?: number
  }>
}

export interface SachbezugResult {
  dienstwagen_sachbezug: {
    listenpreis: number
    co2_emission: number
    ist_elektro: boolean
    kategorie: string
    sachbezug_prozent: number
    sachbezug_monatlich_berechnet: number
    deckelung_monatlich: number
    deckelung_angewendet: boolean
    halber_sachbezug: boolean
    sachbezug_monatlich: number
    sachbezug_jaehrlich: number
  } | null
  benefits_detail: Array<{
    typ: string
    label: string
    betrag_gesamt: number
    steuerfrei: number
    steuerpflichtig: number
    hinweis?: string
  }>
  gesamt_steuerfrei: number
  gesamt_steuerpflichtig: number
  geschaetzte_steuerbelastung_dn: number
  geschaetzte_sv_ersparnis_ag: number
  hinweis: string
}

export function calculateSachbezug(input: SachbezugInput): SachbezugResult {
  // Car benefit
  let carResult: SachbezugResult['dienstwagen_sachbezug'] = null

  if (input.dienstwagen) {
    const car = input.dienstwagen
    const listPrice = car.listenpreis
    const co2 = car.co2_emission
    const isElectric = car.ist_elektro ?? false
    const privateKm = car.privat_km_monat ?? 501
    const halfBenefit = privateKm <= 500

    let pct: number, cap: number, category: string

    if (isElectric || co2 === 0) {
      pct = 0; cap = 0; category = 'Emissionsfrei (E-Auto)'
    } else if (co2 <= CO2_GRENZWERT_2026) {
      pct = SACHBEZUG_NIEDRIG_PCT; cap = SACHBEZUG_NIEDRIG_CAP; category = `Niedrig (bis ${CO2_GRENZWERT_2026} g/km)`
    } else {
      pct = SACHBEZUG_STANDARD_PCT; cap = SACHBEZUG_STANDARD_CAP; category = `Standard (ueber ${CO2_GRENZWERT_2026} g/km)`
    }

    const monthlyRaw = r2(listPrice * pct)
    const capped = cap > 0 && monthlyRaw > cap
    let monthly = cap > 0 ? Math.min(monthlyRaw, cap) : monthlyRaw

    if (halfBenefit && monthly > 0) {
      monthly = r2(monthly / 2)
      cap = r2(cap / 2)
    }

    carResult = {
      listenpreis: listPrice,
      co2_emission: co2,
      ist_elektro: isElectric,
      kategorie: category,
      sachbezug_prozent: pct * 100,
      sachbezug_monatlich_berechnet: monthlyRaw,
      deckelung_monatlich: cap,
      deckelung_angewendet: capped,
      halber_sachbezug: halfBenefit,
      sachbezug_monatlich: monthly,
      sachbezug_jaehrlich: r2(monthly * 12),
    }
  }

  // Benefits
  const benefitDetails: SachbezugResult['benefits_detail'] = []

  for (const b of (input.benefits ?? [])) {
    const typ = b.typ
    const amount = b.betrag ?? 0
    const days = b.tage ?? 0
    const children = b.kinder ?? 1

    const config = BENEFIT_LIMITS[typ]
    if (!config) {
      benefitDetails.push({
        typ,
        label: typ,
        betrag_gesamt: amount,
        steuerfrei: 0,
        steuerpflichtig: amount,
        hinweis: 'Unbekannter Benefit-Typ',
      })
      continue
    }

    let total: number
    let taxFree: number

    if (config.per_day != null) {
      if (amount > 0) {
        total = amount
        taxFree = days > 0 ? r2(Math.min(amount, days * config.per_day)) : 0
      } else {
        total = r2(days * config.per_day)
        taxFree = total
      }
    } else {
      total = amount
      let limit = config.limit ?? Infinity
      if (typ === 'kinderbetreuung') limit *= children
      taxFree = r2(Math.min(total, limit))
    }

    benefitDetails.push({
      typ,
      label: config.label,
      betrag_gesamt: total,
      steuerfrei: taxFree,
      steuerpflichtig: r2(Math.max(total - taxFree, 0)),
    })
  }

  let totalTaxFree = 0
  let totalTaxable = 0
  for (const b of benefitDetails) {
    totalTaxFree += b.steuerfrei
    totalTaxable += b.steuerpflichtig
  }

  const carTaxable = carResult?.sachbezug_jaehrlich ?? 0
  totalTaxable += carTaxable

  return {
    dienstwagen_sachbezug: carResult,
    benefits_detail: benefitDetails,
    gesamt_steuerfrei: r2(totalTaxFree),
    gesamt_steuerpflichtig: r2(totalTaxable),
    geschaetzte_steuerbelastung_dn: r2(totalTaxable * ESTIMATED_MARGINAL_RATE),
    geschaetzte_sv_ersparnis_ag: r2(totalTaxFree * 0.2198),
    hinweis: `Geschaetzte Werte basieren auf einem angenommenen Grenzsteuersatz von ${ESTIMATED_MARGINAL_RATE * 100} %. Tatsaechliche Belastung haengt vom individuellen Einkommen ab.`,
  }
}
