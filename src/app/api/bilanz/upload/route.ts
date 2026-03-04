import { NextRequest } from 'next/server'
import Papa from 'papaparse'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// ── Types ────────────────────────────────────────────────────

interface BilanzAktiva {
  anlagevermoegen: number
  immaterielleVermoegen: number
  sachanlagen: number
  finanzanlagen: number
  umlaufvermoegen: number
  vorraete: number
  forderungen: number
  wertpapiere: number
  fluessigeMittel: number
  rechnungsabgrenzung: number
}

interface BilanzPassiva {
  eigenkapital: number
  stammkapital: number
  ruecklagen: number
  gewinnvortrag: number
  jahresueberschuss: number
  fremdkapital: number
  rueckstellungen: number
  langfristigeVerbindlichkeiten: number
  kurzfristigeVerbindlichkeiten: number
  rechnungsabgrenzung: number
}

interface GuV {
  umsatzerloese: number
  materialaufwand: number
  personalaufwand: number
  abschreibungen: number
  sonstigerAufwand: number
  finanzergebnis: number
}

interface ParsedBilanz {
  unternehmen: string
  geschaeftsjahr: string
  rechtsform: 'gmbh' | 'flexco' | 'einzelunternehmen'
  bilanz: {
    aktiva: BilanzAktiva
    passiva: BilanzPassiva
  }
  guv: GuV
}

// ── CSV Position Mapping ─────────────────────────────────────

const AKTIVA_MAP: Record<string, keyof BilanzAktiva> = {
  // Anlagevermögen
  'anlagevermögen': 'anlagevermoegen',
  'anlagevermoegen': 'anlagevermoegen',
  'anlagevermogen': 'anlagevermoegen',
  'immaterielle vermögensgegenstände': 'immaterielleVermoegen',
  'immaterielle vermoegensgegenstande': 'immaterielleVermoegen',
  'immaterielle vermögen': 'immaterielleVermoegen',
  'sachanlagen': 'sachanlagen',
  'grundstücke und gebäude': 'sachanlagen',
  'maschinen': 'sachanlagen',
  'finanzanlagen': 'finanzanlagen',
  'beteiligungen': 'finanzanlagen',
  // Umlaufvermögen
  'umlaufvermögen': 'umlaufvermoegen',
  'umlaufvermoegen': 'umlaufvermoegen',
  'umlaufvermogen': 'umlaufvermoegen',
  'vorräte': 'vorraete',
  'vorraete': 'vorraete',
  'vorrâte': 'vorraete',
  'warenbestand': 'vorraete',
  'forderungen': 'forderungen',
  'forderungen aus lieferungen und leistungen': 'forderungen',
  'forderungen aus l&l': 'forderungen',
  'wertpapiere': 'wertpapiere',
  'kassenbestand': 'fluessigeMittel',
  'bankguthaben': 'fluessigeMittel',
  'flüssige mittel': 'fluessigeMittel',
  'fluessige mittel': 'fluessigeMittel',
  'kasse': 'fluessigeMittel',
  'bank': 'fluessigeMittel',
  'rechnungsabgrenzungsposten aktiv': 'rechnungsabgrenzung',
  'aktive rechnungsabgrenzung': 'rechnungsabgrenzung',
  'ara': 'rechnungsabgrenzung',
}

const PASSIVA_MAP: Record<string, keyof BilanzPassiva> = {
  'eigenkapital': 'eigenkapital',
  'stammkapital': 'stammkapital',
  'grundkapital': 'stammkapital',
  'gezeichnetes kapital': 'stammkapital',
  'rücklagen': 'ruecklagen',
  'ruecklagen': 'ruecklagen',
  'kapitalrücklagen': 'ruecklagen',
  'gewinnrücklagen': 'ruecklagen',
  'gewinnvortrag': 'gewinnvortrag',
  'verlustvortrag': 'gewinnvortrag',
  'bilanzgewinn': 'gewinnvortrag',
  'jahresüberschuss': 'jahresueberschuss',
  'jahresueberschuss': 'jahresueberschuss',
  'jahresfehlbetrag': 'jahresueberschuss',
  'fremdkapital': 'fremdkapital',
  'rückstellungen': 'rueckstellungen',
  'rueckstellungen': 'rueckstellungen',
  'pensionsrückstellungen': 'rueckstellungen',
  'steuerrückstellungen': 'rueckstellungen',
  'langfristige verbindlichkeiten': 'langfristigeVerbindlichkeiten',
  'bankverbindlichkeiten': 'langfristigeVerbindlichkeiten',
  'darlehen': 'langfristigeVerbindlichkeiten',
  'kurzfristige verbindlichkeiten': 'kurzfristigeVerbindlichkeiten',
  'verbindlichkeiten aus lieferungen und leistungen': 'kurzfristigeVerbindlichkeiten',
  'verbindlichkeiten aus l&l': 'kurzfristigeVerbindlichkeiten',
  'sonstige verbindlichkeiten': 'kurzfristigeVerbindlichkeiten',
  'rechnungsabgrenzungsposten passiv': 'rechnungsabgrenzung',
  'passive rechnungsabgrenzung': 'rechnungsabgrenzung',
  'pra': 'rechnungsabgrenzung',
}

const GUV_MAP: Record<string, keyof GuV> = {
  'umsatzerlöse': 'umsatzerloese',
  'umsatzerloese': 'umsatzerloese',
  'umsatzerlöse netto': 'umsatzerloese',
  'erlöse': 'umsatzerloese',
  'erloese': 'umsatzerloese',
  'materialaufwand': 'materialaufwand',
  'materialkosten': 'materialaufwand',
  'wareneinsatz': 'materialaufwand',
  'personalaufwand': 'personalaufwand',
  'personalkosten': 'personalaufwand',
  'löhne und gehälter': 'personalaufwand',
  'abschreibungen': 'abschreibungen',
  'afa': 'abschreibungen',
  'sonstiger aufwand': 'sonstigerAufwand',
  'sonstige betriebliche aufwendungen': 'sonstigerAufwand',
  'sonstiger betrieblicher aufwand': 'sonstigerAufwand',
  'finanzergebnis': 'finanzergebnis',
  'zinsergebnis': 'finanzergebnis',
  'zinsen und ähnliche erträge': 'finanzergebnis',
  'zinserträge': 'finanzergebnis',
}

// ── CSV Parsing ──────────────────────────────────────────────

function parseCSV(csvText: string): ParsedBilanz {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    transformHeader: (h: string) => h.trim().toLowerCase(),
  })

  const aktiva: BilanzAktiva = {
    anlagevermoegen: 0,
    immaterielleVermoegen: 0,
    sachanlagen: 0,
    finanzanlagen: 0,
    umlaufvermoegen: 0,
    vorraete: 0,
    forderungen: 0,
    wertpapiere: 0,
    fluessigeMittel: 0,
    rechnungsabgrenzung: 0,
  }

  const passiva: BilanzPassiva = {
    eigenkapital: 0,
    stammkapital: 0,
    ruecklagen: 0,
    gewinnvortrag: 0,
    jahresueberschuss: 0,
    fremdkapital: 0,
    rueckstellungen: 0,
    langfristigeVerbindlichkeiten: 0,
    kurzfristigeVerbindlichkeiten: 0,
    rechnungsabgrenzung: 0,
  }

  const guv: GuV = {
    umsatzerloese: 0,
    materialaufwand: 0,
    personalaufwand: 0,
    abschreibungen: 0,
    sonstigerAufwand: 0,
    finanzergebnis: 0,
  }

  let unternehmen = ''
  let geschaeftsjahr = ''
  let rechtsform: 'gmbh' | 'flexco' | 'einzelunternehmen' = 'einzelunternehmen'
  let matchedFields = 0
  const totalRows = result.data.length

  // Determine column names (flexible — supports "position"+"betrag" or "kategorie"+"betrag")
  const headers = result.meta.fields?.map(f => f.toLowerCase()) || []
  const positionCol = headers.find(h => ['position', 'bezeichnung', 'posten', 'name'].includes(h)) || 'position'
  const betragCol = headers.find(h => ['betrag', 'wert', 'euro', 'eur', 'summe'].includes(h)) || 'betrag'
  const kategorieCol = headers.find(h => ['kategorie', 'typ', 'bereich', 'seite'].includes(h)) || 'kategorie'

  for (const row of result.data) {
    const position = (row[positionCol] || '').trim().toLowerCase()
    const betrag = parseGermanNumber(row[betragCol] || '0')
    const kategorie = (row[kategorieCol] || '').trim().toLowerCase()

    // Try to extract meta info
    if (position.includes('unternehmen') || position.includes('firma')) {
      unternehmen = row[betragCol] || ''
      continue
    }
    if (position.includes('geschäftsjahr') || position.includes('geschaeftsjahr') || position.includes('jahr')) {
      geschaeftsjahr = row[betragCol] || ''
      continue
    }
    if (position.includes('rechtsform')) {
      const rf = (row[betragCol] || '').toLowerCase()
      if (rf.includes('gmbh')) rechtsform = 'gmbh'
      else if (rf.includes('flexco') || rf.includes('flex')) rechtsform = 'flexco'
      else rechtsform = 'einzelunternehmen'
      continue
    }

    // Map position to structured fields
    let matched = false

    // Check GuV first (if kategorie hints at it, or position matches)
    if (kategorie === 'guv' || kategorie === 'gewinn- und verlustrechnung') {
      const guvKey = GUV_MAP[position]
      if (guvKey) {
        guv[guvKey] += betrag
        matched = true
      }
    }

    // Check Aktiva
    if (!matched && (kategorie === 'aktiva' || kategorie === 'aktiv' || kategorie === '')) {
      const aktivaKey = AKTIVA_MAP[position]
      if (aktivaKey) {
        aktiva[aktivaKey] += betrag
        matched = true
      }
    }

    // Check Passiva
    if (!matched && (kategorie === 'passiva' || kategorie === 'passiv' || kategorie === '')) {
      const passivaKey = PASSIVA_MAP[position]
      if (passivaKey) {
        passiva[passivaKey] += betrag
        matched = true
      }
    }

    // If no kategorie, try all maps
    if (!matched) {
      const aktivaKey = AKTIVA_MAP[position]
      if (aktivaKey) {
        aktiva[aktivaKey] += betrag
        matched = true
      }
    }
    if (!matched) {
      const passivaKey = PASSIVA_MAP[position]
      if (passivaKey) {
        passiva[passivaKey] += betrag
        matched = true
      }
    }
    if (!matched) {
      const guvKey = GUV_MAP[position]
      if (guvKey) {
        guv[guvKey] += betrag
        matched = true
      }
    }

    if (matched) matchedFields++
  }

  // Calculate aggregate totals if sub-items provided but top-level not
  if (aktiva.anlagevermoegen === 0) {
    aktiva.anlagevermoegen = aktiva.immaterielleVermoegen + aktiva.sachanlagen + aktiva.finanzanlagen
  }
  if (aktiva.umlaufvermoegen === 0) {
    aktiva.umlaufvermoegen = aktiva.vorraete + aktiva.forderungen + aktiva.wertpapiere + aktiva.fluessigeMittel
  }
  if (passiva.eigenkapital === 0) {
    passiva.eigenkapital = passiva.stammkapital + passiva.ruecklagen + passiva.gewinnvortrag + passiva.jahresueberschuss
  }
  if (passiva.fremdkapital === 0) {
    passiva.fremdkapital = passiva.rueckstellungen + passiva.langfristigeVerbindlichkeiten + passiva.kurzfristigeVerbindlichkeiten
  }

  const confidence = totalRows > 0 ? Math.min(matchedFields / totalRows, 1) : 0

  return {
    unternehmen,
    geschaeftsjahr,
    rechtsform,
    bilanz: { aktiva, passiva },
    guv,
  }
}

function parseGermanNumber(raw: string): number {
  // Handle German number format: 1.234,56 -> 1234.56
  const cleaned = raw
    .replace(/[€\s]/g, '')
    .replace(/\./g, '')    // Remove thousands separator
    .replace(',', '.')     // Decimal comma -> dot
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ── Route Handler ────────────────────────────────────────────

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
]

export async function POST(request: NextRequest) {
  try {
    // 1. Auth
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return Response.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const { data: { user }, error: authError } = await getSupabaseAdmin().auth.getUser(token)
    if (authError || !user) {
      return Response.json({ error: 'Ungültiges Token' }, { status: 401 })
    }

    // 2. Parse FormData
    const formData = await request.formData().catch(() => null)
    if (!formData) {
      return Response.json({ error: 'Ungültige Anfrage. FormData erwartet.' }, { status: 400 })
    }

    const file = formData.get('file')
    if (!file || !(file instanceof File)) {
      return Response.json({ error: 'Keine Datei hochgeladen.' }, { status: 400 })
    }

    // 3. Validate file
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: `Datei zu groß. Maximum: ${MAX_FILE_SIZE / 1024 / 1024} MB.` },
        { status: 400 }
      )
    }

    const fileType = file.type || ''
    const fileName = file.name.toLowerCase()
    const isCSV = fileType === 'text/csv' || fileName.endsWith('.csv')
    const isXLSX = fileType.includes('spreadsheet') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')
    const isPDF = fileType === 'application/pdf' || fileName.endsWith('.pdf')

    if (!isCSV && !isXLSX && !isPDF) {
      return Response.json(
        { error: 'Ungültiges Dateiformat. Erlaubt: CSV, XLSX, PDF.' },
        { status: 400 }
      )
    }

    // 4. Generate session ID
    const sessionId = crypto.randomUUID()

    // 5. Parse file content
    let parsed: ParsedBilanz
    let confidence: number

    if (isCSV) {
      const text = await file.text()
      parsed = parseCSV(text)

      // Calculate confidence from the parsed data
      const totalFields = Object.values(parsed.bilanz.aktiva).filter(v => v !== 0).length
        + Object.values(parsed.bilanz.passiva).filter(v => v !== 0).length
        + Object.values(parsed.guv).filter(v => v !== 0).length
      confidence = Math.min(totalFields / 10, 1) // 10 non-zero fields = 100%
    } else {
      // For XLSX and PDF: return a placeholder structure
      // Real implementation would use AI Vision for PDF or a XLSX parser
      parsed = {
        unternehmen: fileName.replace(/\.(xlsx|xls|pdf)$/i, ''),
        geschaeftsjahr: '2025',
        rechtsform: 'gmbh',
        bilanz: {
          aktiva: {
            anlagevermoegen: 0,
            immaterielleVermoegen: 0,
            sachanlagen: 0,
            finanzanlagen: 0,
            umlaufvermoegen: 0,
            vorraete: 0,
            forderungen: 0,
            wertpapiere: 0,
            fluessigeMittel: 0,
            rechnungsabgrenzung: 0,
          },
          passiva: {
            eigenkapital: 0,
            stammkapital: 0,
            ruecklagen: 0,
            gewinnvortrag: 0,
            jahresueberschuss: 0,
            fremdkapital: 0,
            rueckstellungen: 0,
            langfristigeVerbindlichkeiten: 0,
            kurzfristigeVerbindlichkeiten: 0,
            rechnungsabgrenzung: 0,
          },
        },
        guv: {
          umsatzerloese: 0,
          materialaufwand: 0,
          personalaufwand: 0,
          abschreibungen: 0,
          sonstigerAufwand: 0,
          finanzergebnis: 0,
        },
      }
      confidence = 0
    }

    return Response.json({
      sessionId,
      parsed,
      confidence,
      fileName: file.name,
      fileType: isCSV ? 'csv' : isXLSX ? 'xlsx' : 'pdf',
      hinweis: confidence === 0
        ? 'Die Datei konnte nicht automatisch geparst werden. Bitte fülle die Bilanz-Daten manuell aus oder lade eine CSV-Datei hoch.'
        : undefined,
    })
  } catch (err: unknown) {
    console.error('Bilanz Upload error:', err)
    console.error('Bilanz Upload detail:', err instanceof Error ? err.message : err)
    return Response.json({ error: 'Upload-Fehler. Bitte versuche es erneut.' }, { status: 500 })
  }
}
