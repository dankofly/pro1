import { formatEuro } from './format'
import type { SvsResult } from './svs-calculator'

interface CsvExportParams {
  gewinn: number
  umsatz: number
  aufwaende: number
  vorschreibung: number
  result: SvsResult
}

export function generateCsvExport({ gewinn, umsatz, aufwaende, vorschreibung, result }: CsvExportParams): void {
  const nettoQuote = gewinn > 0 ? ((result.echtesNetto / gewinn) * 100).toFixed(1) : '0'
  const m = (v: number) => formatEuro(v / 12)

  const rows: string[][] = [
    ['Kategorie', 'Posten', 'Jährlich', 'Monatlich'],
    ['Übersicht', 'Umsatz', formatEuro(umsatz), m(umsatz)],
    ['Übersicht', 'Aufwände', formatEuro(aufwaende), m(aufwaende)],
    ['Übersicht', 'Gewinn', formatEuro(gewinn), m(gewinn)],
    [],
    ['SVS', 'Pensionsversicherung (PV)', formatEuro(result.pvBeitrag), m(result.pvBeitrag)],
    ['SVS', 'Krankenversicherung (KV)', formatEuro(result.kvBeitrag), m(result.kvBeitrag)],
    ['SVS', 'Selbständigenvorsorge (MV)', formatEuro(result.mvBeitrag), m(result.mvBeitrag)],
    ['SVS', 'Unfallversicherung (UV)', formatEuro(result.uvBeitrag), m(result.uvBeitrag)],
    ['SVS', 'Gesamt SVS', formatEuro(result.endgueltigeSVS), m(result.endgueltigeSVS)],
    [],
    ['Steuer', 'Beitragsgrundlage', formatEuro(result.beitragsgrundlage), ''],
    ['Steuer', 'Steuerpflichtiges Einkommen', formatEuro(result.steuerpflichtig), ''],
    ['Steuer', 'Einkommensteuer', formatEuro(result.einkommensteuer), m(result.einkommensteuer)],
    ['Steuer', 'Grenzsteuersatz', `${(result.grenzsteuersatz * 100).toFixed(0)}%`, ''],
    ['Steuer', 'Durchschnittssteuersatz', `${(result.durchschnittssteuersatz * 100).toFixed(1)}%`, ''],
    [],
    ['Ergebnis', 'Echtes Netto', formatEuro(result.echtesNetto), m(result.echtesNetto)],
    ['Ergebnis', 'Netto-Quote', `${nettoQuote}%`, ''],
    [],
    ['Nachzahlung', 'Vorläufige SVS (Vorschreibung)', formatEuro(vorschreibung * 12), formatEuro(vorschreibung)],
    ['Nachzahlung', 'Endgültige SVS', formatEuro(result.endgueltigeSVS), formatEuro(result.endgueltigeMonatlich)],
    ['Nachzahlung', 'Differenz (Nachzahlung)', formatEuro(result.nachzahlung), ''],
    ['Nachzahlung', 'Spar-Empfehlung pro Monat', '', formatEuro(result.sparEmpfehlung)],
    [],
    ['Steuerersparnis', 'Ersparnis durch SVS-Abzug', formatEuro(result.steuerErsparnis), ''],
    ['Steuerersparnis', 'Effektive SVS-Belastung', formatEuro(result.effektiveSVS), ''],
  ]

  // Semikolon-separated, UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF'
  const csv = BOM + rows.map(row => row.join(';')).join('\r\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const dateStr = new Date().toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-')

  const a = document.createElement('a')
  a.href = url
  a.download = `SteuerBoard-Export-${dateStr}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
