/**
 * Austrian VAT Calculator 2026
 * USt liability, Kleinunternehmerregelung (EUR 55,000), recommendations.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

const KLEINUNTERNEHMER_GRENZE = 55_000
const KLEINUNTERNEHMER_TOLERANZ = 60_500

const UST_RATES: Record<number, string> = {
  20: 'Normalsteuersatz',
  13: 'Ermaessigt (Beherbergung, Kultur, Tiere)',
  10: 'Ermaessigt (Lebensmittel, Buecher, Medikamente, Wohnraumvermietung)',
  0: 'Steuerbefreit (Export, ig Lieferung)',
}

export interface UmsatzsteuerInput {
  umsaetze: Array<{
    bezeichnung?: string
    netto: number
    steuersatz: number
  }>
  vorsteuer?: number
  ist_kleinunternehmer?: boolean | null
}

export interface UmsatzsteuerResult {
  umsaetze_detail: Array<{
    bezeichnung: string
    netto: number
    steuersatz: number
    steuersatz_bezeichnung: string
    ust_betrag: number
    brutto: number
  }>
  gesamt_netto: number
  gesamt_ust: number
  gesamt_brutto: number
  aufschluesselung_nach_steuersatz: Array<{
    steuersatz: number
    bezeichnung: string
    ust_betrag: number
  }>
  vorsteuer: number
  vorsteuer_abzug: number
  zahllast: number
  kleinunternehmer_status: {
    ist_kleinunternehmer: boolean
    umsatz_brutto: number
    grenze: number
    toleranz_grenze: number
    ueberschreitung: number
    innerhalb_toleranz: boolean
  }
  uva_zeitraum: string
  empfehlung: string
}

export function calculateUmsatzsteuer(input: UmsatzsteuerInput): UmsatzsteuerResult {
  const inputVat = input.vorsteuer ?? 0
  const vatByRate: Record<number, number> = {}

  let totalNet = 0
  let totalVat = 0
  let totalGross = 0

  const details = input.umsaetze.map((item) => {
    const net = item.netto
    const rate = item.steuersatz
    const vatAmount = r2(net * rate / 100)
    const gross = r2(net + vatAmount)

    totalNet += net
    totalVat += vatAmount
    totalGross += gross
    vatByRate[rate] = (vatByRate[rate] ?? 0) + vatAmount

    return {
      bezeichnung: item.bezeichnung ?? 'Unbekannt',
      netto: net,
      steuersatz: rate,
      steuersatz_bezeichnung: UST_RATES[rate] ?? `${rate} %`,
      ust_betrag: vatAmount,
      brutto: gross,
    }
  })

  totalNet = r2(totalNet)
  totalVat = r2(totalVat)
  totalGross = r2(totalGross)

  const isKU = input.ist_kleinunternehmer != null
    ? input.ist_kleinunternehmer
    : totalGross < KLEINUNTERNEHMER_GRENZE

  const kuStatus = {
    ist_kleinunternehmer: isKU,
    umsatz_brutto: totalGross,
    grenze: KLEINUNTERNEHMER_GRENZE,
    toleranz_grenze: KLEINUNTERNEHMER_TOLERANZ,
    ueberschreitung: Math.max(totalGross - KLEINUNTERNEHMER_GRENZE, 0),
    innerhalb_toleranz: totalGross <= KLEINUNTERNEHMER_TOLERANZ,
  }

  let zahllast: number
  let vorsteuerAbzug: number

  if (isKU) {
    zahllast = 0
    vorsteuerAbzug = 0
  } else {
    zahllast = r2(totalVat - inputVat)
    vorsteuerAbzug = inputVat
  }

  const aufschluesselung = Object.entries(vatByRate)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([rate, amount]) => ({
      steuersatz: Number(rate),
      bezeichnung: UST_RATES[Number(rate)] ?? '',
      ust_betrag: r2(amount),
    }))

  let uvaZeitraum: string
  if (totalNet > 100_000) {
    uvaZeitraum = 'Monatlich'
  } else if (totalNet > 35_000) {
    uvaZeitraum = 'Vierteljaehrlich'
  } else {
    uvaZeitraum = 'Keine UVA-Pflicht (nur Jahreserklaerung)'
  }

  let empfehlung: string
  if (isKU) {
    if (inputVat > totalVat * 0.5) {
      empfehlung = `Option zur Regelbesteuerung pruefen: Ihre Vorsteuern (EUR ${inputVat.toLocaleString('de-AT', { minimumFractionDigits: 2 })}) sind hoch im Verhaeltnis zur USt. Ein Verzicht auf die Kleinunternehmerbefreiung koennte vorteilhaft sein (Bindungsfrist: 5 Jahre).`
    } else if (totalGross > KLEINUNTERNEHMER_GRENZE * 0.9) {
      empfehlung = `Achtung: Ihr Umsatz (EUR ${totalGross.toLocaleString('de-AT', { minimumFractionDigits: 2 })}) naehert sich der Kleinunternehmergrenze (EUR ${KLEINUNTERNEHMER_GRENZE.toLocaleString('de-AT', { minimumFractionDigits: 2 })}). Planen Sie Ihre Umsaetze sorgfaeltig.`
    } else {
      empfehlung = 'Kleinunternehmerregelung ist anwendbar. Keine USt-Abfuehrung erforderlich, aber auch kein Vorsteuerabzug moeglich.'
    }
  } else {
    empfehlung = `USt-Zahllast: EUR ${r2(totalVat - inputVat).toLocaleString('de-AT', { minimumFractionDigits: 2 })}. Achten Sie auf fristgerechte UVA-Abgabe und Zahlung.`
  }

  return {
    umsaetze_detail: details,
    gesamt_netto: totalNet,
    gesamt_ust: totalVat,
    gesamt_brutto: totalGross,
    aufschluesselung_nach_steuersatz: aufschluesselung,
    vorsteuer: inputVat,
    vorsteuer_abzug: vorsteuerAbzug,
    zahllast,
    kleinunternehmer_status: kuStatus,
    uva_zeitraum: uvaZeitraum,
    empfehlung,
  }
}
