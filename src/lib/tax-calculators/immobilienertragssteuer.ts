/**
 * Austrian Real Estate Capital Gains Tax Calculator 2026
 * ImmoESt (30%), Alt-/Neuvermoegen, exemptions.
 * Kein Inflationsabschlag: mit dem StRefG 2015/16 per 1.1.2016 abgeschafft.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

const IMMOEST_RATE = 0.30
const ALTVERM_PAUSCHAL_RATE = 0.042
const ALTVERM_UMWIDMUNG_RATE = 0.18
// Altvermoegen = am 31.3.2012 nicht mehr steuerverfangen. Bei der 10-jaehrigen
// Spekulationsfrist heisst das: Anschaffung vor dem 31.3.2002.
const STICHTAG_ALTVERMOEGEN = new Date('2002-03-31')

export interface ImmobilienertragssteuerInput {
  kaufdatum?: string
  kaufpreis: number
  verkaufsdatum?: string
  verkaufspreis: number
  ist_hauptwohnsitz?: boolean
  hauptwohnsitz_jahre?: number
  ist_selbst_hergestellt?: boolean
  herstellungskosten?: number
  instandsetzungskosten?: number
  nebenkosten_kauf?: number
  nebenkosten_verkauf?: number
  umwidmung_nach_1987?: boolean
  vermietet_letzte_10_jahre?: boolean
}

export interface ImmobilienertragssteuerResult {
  kaufdatum: string
  kaufpreis: number
  verkaufsdatum: string
  verkaufspreis: number
  vermoegensart: string
  haltedauer_jahre: number
  befreiung: {
    hauptwohnsitz_variante_1: boolean
    hauptwohnsitz_variante_2: boolean
    herstellerbefreiung: boolean
    ist_befreit: boolean
    grund: string
  }
  berechnung?: {
    anschaffungskosten_gesamt: number
    herstellungskosten?: number
    instandsetzungskosten?: number
    nebenkosten_kauf?: number
    nebenkosten_verkauf: number
    verauesserungsgewinn: number
  }
  alternativberechnung?: {
    pauschal_4_2_prozent: number
    pauschal_18_prozent: number | null
    gewinn_30_prozent: number
    verauesserungsgewinn: number
    guenstigste_variante: string
    guenstigster_betrag: number
  }
  steuerpflichtiger_gewinn?: number
  immoest: number
  effektiver_steuersatz: string
}

function parseDate(dateStr: string | undefined, fallback: string): Date {
  if (!dateStr) return new Date(fallback)
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? new Date(fallback) : d
}

export function calculateImmobilienertragssteuer(input: ImmobilienertragssteuerInput): ImmobilienertragssteuerResult {
  const purchaseDate = parseDate(input.kaufdatum, '2020-01-01')
  const saleDate = parseDate(input.verkaufsdatum, '2026-03-01')
  const purchasePrice = input.kaufpreis
  const salePrice = input.verkaufspreis
  const isPrimary = input.ist_hauptwohnsitz ?? false
  const residenceYears = input.hauptwohnsitz_jahre ?? 0
  const isSelfBuilt = input.ist_selbst_hergestellt ?? false
  const constructionCosts = input.herstellungskosten ?? 0
  const renovationCosts = input.instandsetzungskosten ?? 0
  const purchaseAncillary = input.nebenkosten_kauf ?? 0
  const saleAncillary = input.nebenkosten_verkauf ?? 0
  const rezoningAfter1987 = input.umwidmung_nach_1987 ?? false
  const wasRented = input.vermietet_letzte_10_jahre ?? false

  const assetType = purchaseDate <= STICHTAG_ALTVERMOEGEN ? 'Altvermoegen' : 'Neuvermoegen'
  const holdingYears = Math.floor((saleDate.getTime() - purchaseDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))

  // Check exemptions
  const exemptions = {
    hauptwohnsitz_variante_1: false,
    hauptwohnsitz_variante_2: false,
    herstellerbefreiung: false,
    ist_befreit: false,
    grund: '',
  }

  if (isPrimary && residenceYears >= 2) {
    const holdingApprox = (saleDate.getTime() - purchaseDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    if (residenceYears >= holdingApprox * 0.9) {
      exemptions.hauptwohnsitz_variante_1 = true
      exemptions.ist_befreit = true
      exemptions.grund = 'Hauptwohnsitzbefreiung (Variante 1): Durchgehend mindestens 2 Jahre seit Anschaffung als Hauptwohnsitz genutzt.'
    }
  }

  if (isPrimary && residenceYears >= 5) {
    exemptions.hauptwohnsitz_variante_2 = true
    exemptions.ist_befreit = true
    exemptions.grund = 'Hauptwohnsitzbefreiung (Variante 2): Mindestens 5 Jahre durchgehend als Hauptwohnsitz innerhalb der letzten 10 Jahre.'
  }

  if (isSelfBuilt && !wasRented) {
    exemptions.herstellerbefreiung = true
    exemptions.ist_befreit = true
    exemptions.grund = 'Herstellerbefreiung: Selbst hergestelltes Gebaeude, nicht zur Einkuenfteerzielung in den letzten 10 Jahren genutzt.'
  }

  const purchaseDateStr = purchaseDate.toISOString().split('T')[0]
  const saleDateStr = saleDate.toISOString().split('T')[0]

  if (exemptions.ist_befreit) {
    return {
      kaufdatum: purchaseDateStr,
      kaufpreis: purchasePrice,
      verkaufsdatum: saleDateStr,
      verkaufspreis: salePrice,
      vermoegensart: assetType,
      haltedauer_jahre: holdingYears,
      befreiung: exemptions,
      immoest: 0,
      effektiver_steuersatz: '0,00 %',
    }
  }

  const totalAcquisition = purchasePrice + constructionCosts + renovationCosts + purchaseAncillary
  const gain = Math.max(salePrice - totalAcquisition - saleAncillary, 0)

  if (assetType === 'Altvermoegen') {
    const pauschal42 = r2(salePrice * ALTVERM_PAUSCHAL_RATE)
    const pauschal18 = rezoningAfter1987 ? r2(salePrice * ALTVERM_UMWIDMUNG_RATE) : null
    const gewinn30 = r2(gain * IMMOEST_RATE)

    const options: [string, number][] = [['Pauschal 4,2 %', pauschal42]]
    if (pauschal18 !== null) options.push(['Pauschal 18 % (Umwidmung)', pauschal18])
    options.push(['30 % vom Gewinn', gewinn30])

    const cheapest = options.reduce((a, b) => a[1] <= b[1] ? a : b)
    const immoest = cheapest[1]
    const effectiveRate = salePrice > 0 ? r2((immoest / salePrice) * 100) : 0

    return {
      kaufdatum: purchaseDateStr,
      kaufpreis: purchasePrice,
      verkaufsdatum: saleDateStr,
      verkaufspreis: salePrice,
      vermoegensart: assetType,
      haltedauer_jahre: holdingYears,
      befreiung: exemptions,
      berechnung: {
        anschaffungskosten_gesamt: r2(totalAcquisition),
        nebenkosten_verkauf: saleAncillary,
        verauesserungsgewinn: r2(gain),
      },
      alternativberechnung: {
        pauschal_4_2_prozent: pauschal42,
        pauschal_18_prozent: pauschal18,
        gewinn_30_prozent: gewinn30,
        verauesserungsgewinn: r2(gain),
        guenstigste_variante: cheapest[0],
        guenstigster_betrag: cheapest[1],
      },
      immoest,
      effektiver_steuersatz: `${effectiveRate} %`,
    }
  }

  // Neuvermoegen: 30 % vom Veraeusserungsgewinn, ohne Inflationsabschlag
  const taxableGain = Math.max(r2(gain), 0)
  const immoest = r2(taxableGain * IMMOEST_RATE)
  const effectiveRate = salePrice > 0 ? r2((immoest / salePrice) * 100) : 0

  return {
    kaufdatum: purchaseDateStr,
    kaufpreis: purchasePrice,
    verkaufsdatum: saleDateStr,
    verkaufspreis: salePrice,
    vermoegensart: assetType,
    haltedauer_jahre: holdingYears,
    befreiung: exemptions,
    berechnung: {
      anschaffungskosten_gesamt: r2(totalAcquisition),
      herstellungskosten: constructionCosts,
      instandsetzungskosten: renovationCosts,
      nebenkosten_kauf: purchaseAncillary,
      nebenkosten_verkauf: saleAncillary,
      verauesserungsgewinn: r2(gain),
    },
    steuerpflichtiger_gewinn: taxableGain,
    immoest,
    effektiver_steuersatz: `${effectiveRate} %`,
  }
}
