import Papa from 'papaparse'

export interface ParsedCsvResult {
  headers: string[]
  rows: string[][]
  rowCount: number
}

export interface DetectedColumn {
  index: number
  header: string
  sampleValues: string[]
  summe: number
  count: number
}

export function parseCsvFile(file: File): Promise<ParsedCsvResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as string[][]
        if (data.length < 2) {
          reject(new Error('CSV enthaelt zu wenig Zeilen'))
          return
        }
        resolve({
          headers: data[0],
          rows: data.slice(1),
          rowCount: data.length - 1,
        })
      },
      error: (err: Error) => reject(err),
    })
  })
}

function parseAustrianNumber(raw: string): number {
  // Handle Austrian number format: 1.234,56 or 1234,56
  const cleaned = raw.replace(/[€\s]/g, '').replace(/\./g, '').replace(',', '.')
  return parseFloat(cleaned)
}

export function detectIncomeColumns(parsed: ParsedCsvResult): DetectedColumn[] {
  return parsed.headers
    .map((header, index) => {
      const values = parsed.rows.map(row => row[index]).filter(Boolean)
      const numericValues = values
        .map(parseAustrianNumber)
        .filter(n => !isNaN(n))

      const positiveValues = numericValues.filter(n => n > 0)
      const summe = positiveValues.reduce((a, b) => a + b, 0)

      return {
        index,
        header,
        sampleValues: values.slice(0, 3),
        summe,
        count: positiveValues.length,
      }
    })
    .filter(col => col.summe > 0 && col.count >= 2)
    .sort((a, b) => b.summe - a.summe)
}

export function sumColumn(parsed: ParsedCsvResult, columnIndex: number, onlyPositive: boolean = true): number {
  return parsed.rows.reduce((sum, row) => {
    const raw = row[columnIndex]
    if (!raw) return sum
    const val = parseAustrianNumber(raw)
    if (isNaN(val)) return sum
    if (onlyPositive && val <= 0) return sum
    return sum + val
  }, 0)
}
