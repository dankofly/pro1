import { NextRequest } from 'next/server'
import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { checkAiRateLimit } from '@/lib/rate-limit'

export const maxDuration = 60

const MAX_FORECASTS_PER_DAY = 3

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

interface Kennzahlen {
  bilanzsumme: number
  eigenkapitalquote: number
  verschuldungsgrad: number
  liquiditaet1Grad: number
  liquiditaet3Grad: number
  umsatzrentabilitaet: number
  ekRentabilitaet: number
  gkRentabilitaet: number
  workingCapital: number
  gewinn: number
}

// ── Zod Schema for AI Output ─────────────────────────────────

const SzenarioSchema = z.object({
  umsatz: z.number().describe('Prognostizierter Umsatz in Euro'),
  gewinn: z.number().describe('Prognostizierter Gewinn in Euro'),
  steuer: z.number().describe('Geschätzte Steuerbelastung in Euro'),
  cashflow: z.number().describe('Prognostizierter operativer Cashflow in Euro'),
})

const OptimierungSchema = z.object({
  titel: z.string().describe('Kurzer Titel der Optimierungsmaßnahme'),
  beschreibung: z.string().describe('Detaillierte Beschreibung der Maßnahme'),
  ersparnisEur: z.number().describe('Geschätzte Steuerersparnis in Euro'),
  prioritaet: z.enum(['hoch', 'mittel', 'niedrig']).describe('Priorität der Maßnahme'),
})

const ForecastSchema = z.object({
  forecast: z.object({
    konservativ: SzenarioSchema.describe('Konservatives Szenario: -10-15% Wachstum, höhere Kosten'),
    realistisch: SzenarioSchema.describe('Realistisches Szenario: moderates Wachstum basierend auf Trend'),
    optimistisch: SzenarioSchema.describe('Optimistisches Szenario: +15-25% Wachstum, Effizienzsteigerung'),
  }),
  optimierungen: z.array(OptimierungSchema).min(2).max(6).describe('Steuerliche Optimierungsvorschläge'),
  empfehlungen: z.string().describe('Zusammenfassende Empfehlung als Markdown-Text (max. 500 Wörter)'),
})

// ── System Prompt ────────────────────────────────────────────

const SYSTEM_PROMPT = `Du bist ein österreichischer Steuer-Assistent und Finanzanalyst mit 15+ Jahren Erfahrung in KMU-Beratung, Bilanzanalyse und Steueroptimierung nach österreichischem Recht.

Du erstellst eine 12-Monats-Prognose in 3 Szenarien basierend auf den übergebenen Bilanzdaten und Kennzahlen.

## Österreichisches Steuerrecht — Aktuelle Werte

### Einkommensteuer (ESt) — 7 Stufen
- Bis € 12.816: 0%
- € 12.816 – € 20.818: 20%
- € 20.818 – € 34.513: 30%
- € 34.513 – € 66.612: 40%
- € 66.612 – € 99.266: 48%
- € 99.266 – € 1.000.000: 50%
- Über € 1.000.000: 55%

### Körperschaftsteuer (KöSt)
- 23% auf den Gewinn (seit 2024)
- Mindest-KöSt: € 1.750 (GmbH), € 500 (FlexCo)

### Kapitalertragsteuer (KESt)
- 27,5% auf Ausschüttungen

### Wichtige Freibeträge und Prämien
- Gewinnfreibetrag (GFB): 15% des Gewinns, max. € 46.400
- Investitionsfreibetrag (IFB): 10% (Standard), 15% (ökologisch/digital)
  - Max. Bemessungsgrundlage: € 1.000.000
- Forschungsprämie: 14% der F&E-Aufwendungen
- Bildungsfreibetrag: 20% / Bildungsprämie: 12%

### SVS (Sozialversicherung Selbständige)
- PV: 18,5%, KV: 6,8%, UV: 1,2%
- Mindestbeitragsgrundlage: ca. € 537/Monat
- Höchstbeitragsgrundlage: ca. € 7.070/Monat

## Deine Aufgabe

1. Analysiere die übergebenen Bilanzdaten und Kennzahlen
2. Erstelle 3 realistische Szenarien (konservativ, realistisch, optimistisch)
3. Berechne für jedes Szenario: Umsatz, Gewinn, Steuerbelastung, Cashflow
4. Gib 2-6 konkrete, umsetzbare Steueroptimierungen mit Euro-Beträgen
5. Schreibe eine zusammenfassende Empfehlung

## Wichtig
- Alle Beträge in Euro, auf ganze Euro gerundet
- Steuerlich korrekt nach österreichischem Recht
- Praxisorientiert und umsetzbar
- Rechtsform berücksichtigen (GmbH vs. Einzelunternehmen vs. FlexCo)
- Bei Einzelunternehmen: SVS-Auswirkungen berücksichtigen`

// ── Route Handler ────────────────────────────────────────────

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

    // 2. Subscription check — Pro only
    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single()

    const { isAdmin } = await import('@/lib/admin')
    if (!isAdmin(user.email) && (!sub || sub.plan !== 'pro' || !['active', 'trialing', 'past_due'].includes(sub.status))) {
      return Response.json({ error: 'Pro-Abo erforderlich' }, { status: 403 })
    }

    // 3. Rate limit
    const { allowed, remaining } = await checkAiRateLimit(user.id, MAX_FORECASTS_PER_DAY)
    if (!allowed) {
      return Response.json(
        { error: 'Tageslimit erreicht. Du kannst morgen wieder eine Prognose erstellen. (max. 3 pro Tag)' },
        { status: 429 }
      )
    }

    // 4. Parse & validate request body
    const body = await request.json().catch(() => null)
    if (!body || !body.parsed || !body.kennzahlen) {
      return Response.json({ error: 'Bilanz-Daten und Kennzahlen fehlen.' }, { status: 400 })
    }

    const { sessionId, parsed, kennzahlen } = body as {
      sessionId: string
      parsed: ParsedBilanz
      kennzahlen: Kennzahlen
    }

    if (!sessionId) {
      return Response.json({ error: 'Session-ID fehlt.' }, { status: 400 })
    }

    // 5. Build user message from data
    const userMessage = buildUserMessage(parsed, kennzahlen)

    // 6. Generate forecast with Gemini
    const result = await generateObject({
      model: google('gemini-2.0-flash'),
      system: SYSTEM_PROMPT,
      prompt: userMessage,
      schema: ForecastSchema,
      maxOutputTokens: 4000,
      temperature: 0.6,
    })

    return Response.json({
      sessionId,
      ...result.object,
    }, {
      headers: {
        'X-RateLimit-Remaining': String(remaining),
      },
    })
  } catch (err: unknown) {
    console.error('Bilanz Forecast error:', err)
    console.error('Bilanz Forecast detail:', err instanceof Error ? err.message : err)
    return Response.json({ error: 'Prognose-Fehler. Bitte versuche es erneut.' }, { status: 500 })
  }
}

// ── User Message Builder ─────────────────────────────────────

function buildUserMessage(parsed: ParsedBilanz, kennzahlen: Kennzahlen): string {
  const { aktiva, passiva } = parsed.bilanz
  const { guv } = parsed

  return `Erstelle eine 12-Monats-Prognose für folgendes Unternehmen:

**Stammdaten:**
- Unternehmen: ${parsed.unternehmen || 'Nicht angegeben'}
- Geschäftsjahr: ${parsed.geschaeftsjahr || 'Aktuell'}
- Rechtsform: ${formatRechtsform(parsed.rechtsform)}

**Bilanz — Aktiva:**
- Anlagevermögen: € ${fmt(aktiva.anlagevermoegen)}
  - Immaterielle Vermögensgegenstände: € ${fmt(aktiva.immaterielleVermoegen)}
  - Sachanlagen: € ${fmt(aktiva.sachanlagen)}
  - Finanzanlagen: € ${fmt(aktiva.finanzanlagen)}
- Umlaufvermögen: € ${fmt(aktiva.umlaufvermoegen)}
  - Vorräte: € ${fmt(aktiva.vorraete)}
  - Forderungen: € ${fmt(aktiva.forderungen)}
  - Wertpapiere: € ${fmt(aktiva.wertpapiere)}
  - Flüssige Mittel: € ${fmt(aktiva.fluessigeMittel)}
- Bilanzsumme Aktiva: € ${fmt(aktiva.anlagevermoegen + aktiva.umlaufvermoegen + aktiva.rechnungsabgrenzung)}

**Bilanz — Passiva:**
- Eigenkapital: € ${fmt(passiva.eigenkapital)}
  - Stammkapital: € ${fmt(passiva.stammkapital)}
  - Rücklagen: € ${fmt(passiva.ruecklagen)}
  - Gewinnvortrag: € ${fmt(passiva.gewinnvortrag)}
  - Jahresüberschuss: € ${fmt(passiva.jahresueberschuss)}
- Fremdkapital: € ${fmt(passiva.fremdkapital)}
  - Rückstellungen: € ${fmt(passiva.rueckstellungen)}
  - Langfristige Verbindlichkeiten: € ${fmt(passiva.langfristigeVerbindlichkeiten)}
  - Kurzfristige Verbindlichkeiten: € ${fmt(passiva.kurzfristigeVerbindlichkeiten)}

**Gewinn- und Verlustrechnung:**
- Umsatzerlöse: € ${fmt(guv.umsatzerloese)}
- Materialaufwand: € ${fmt(guv.materialaufwand)}
- Personalaufwand: € ${fmt(guv.personalaufwand)}
- Abschreibungen: € ${fmt(guv.abschreibungen)}
- Sonstiger Aufwand: € ${fmt(guv.sonstigerAufwand)}
- Finanzergebnis: € ${fmt(guv.finanzergebnis)}

**Berechnete Kennzahlen:**
- Bilanzsumme: € ${fmt(kennzahlen.bilanzsumme)}
- Eigenkapitalquote: ${kennzahlen.eigenkapitalquote}%
- Verschuldungsgrad: ${kennzahlen.verschuldungsgrad}%
- Liquidität 1. Grades: ${kennzahlen.liquiditaet1Grad}%
- Liquidität 3. Grades: ${kennzahlen.liquiditaet3Grad}%
- Umsatzrentabilität: ${kennzahlen.umsatzrentabilitaet}%
- EK-Rentabilität: ${kennzahlen.ekRentabilitaet}%
- GK-Rentabilität: ${kennzahlen.gkRentabilitaet}%
- Working Capital: € ${fmt(kennzahlen.workingCapital)}
- Gewinn: € ${fmt(kennzahlen.gewinn)}

Erstelle eine fundierte Prognose mit 3 Szenarien und konkreten Steueroptimierungen für die Rechtsform "${formatRechtsform(parsed.rechtsform)}" nach österreichischem Steuerrecht.`
}

function fmt(v: number): string {
  return (v || 0).toLocaleString('de-AT', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

function formatRechtsform(rf: string): string {
  switch (rf) {
    case 'gmbh': return 'GmbH'
    case 'flexco': return 'FlexCo'
    case 'einzelunternehmen': return 'Einzelunternehmen'
    default: return rf
  }
}
