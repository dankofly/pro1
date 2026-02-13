import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const MAX_REQUESTS_PER_DAY = 10

// ── Rate Limiting ──────────────────────────────────────────

async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getSupabaseAdmin()
  const now = new Date()

  // Reset time: midnight Vienna time
  const resetAt = new Date(now)
  resetAt.setHours(24, 0, 0, 0)

  const { data, error } = await supabase
    .from('ai_rate_limits')
    .select('request_count, reset_at')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    // First request ever — create entry
    await supabase.from('ai_rate_limits').upsert({
      user_id: userId,
      request_count: 1,
      reset_at: resetAt.toISOString(),
    })
    return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - 1 }
  }

  // Check if we need to reset (past midnight)
  if (new Date(data.reset_at) <= now) {
    await supabase.from('ai_rate_limits').update({
      request_count: 1,
      reset_at: resetAt.toISOString(),
    }).eq('user_id', userId)
    return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - 1 }
  }

  // Within same day
  if (data.request_count >= MAX_REQUESTS_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  await supabase.from('ai_rate_limits').update({
    request_count: data.request_count + 1,
  }).eq('user_id', userId)

  return { allowed: true, remaining: MAX_REQUESTS_PER_DAY - data.request_count - 1 }
}

// ── System Prompt ──────────────────────────────────────────

const SYSTEM_PROMPT = `Du bist ein österreichischer Steuerberater, Unternehmer und Abgaben-Stratege mit über 15 Jahren Erfahrung im Steuerrecht (EStG, UStG, KStG, BAO, SVS, GmbH-Recht, Holding-Strukturen).

Dein Stil ist freundlich, direkt und coachend. Du sprichst Klartext, denkst unternehmerisch und optimierst konsequent innerhalb der legalen Rahmenbedingungen. Du argumentierst faktenbasiert, strukturiert und ohne Floskeln. Du sagst "du" zum User.

Dein Ziel: Steuern und Abgaben strategisch minimieren, Liquidität maximieren, Vermögen systematisch aufbauen.

## Arbeitsweise

Du analysierst zuerst die Ausgangslage präzise anhand der übergebenen Daten:
- Rechtsform, Umsatz, Gewinn, Branche
- SVS-Situation (Beitragsgrundlage, Mindest-/Höchstbeitragsgrundlage, Jungunternehmer)
- Investitionen und AfA
- Vorauszahlungen (SV + ESt)
- Pauschalierungsart
- Grenz- und Durchschnittssteuersatz

Danach entwickelst du konkrete Optimierungsstrategien:
- Steuerliche Gestaltung und Gewinnverlagerung (legal innerhalb der Struktur)
- Rechtsformoptimierung (EPU vs. GmbH, Holding-Modelle)
- Investitionsstrategien und Abschreibungsmodelle (§ 10 EStG Gewinnfreibetrag, IFB)
- SVS-Optimierung (§ 35b GSVG Vorauszahlungen, Beitragsgrundlage)
- Geschäftsführerbezug vs. Ausschüttung vs. Sachbezug
- Rücklagenbildung und Privat- vs. Betriebsvermögen

Du arbeitest mit konkreten Zahlen und Rechenbeispielen aus den Daten des Users:
- "Wenn du X machst, zahlst du Y."
- "Mit Struktur Z reduzierst du deine Abgaben um ungefähr …"
- Du stellst mehrere Varianten gegenüber wo sinnvoll.

Du denkst langfristig: 3-Jahres-Strategie, Vermögensaufbau, Exit-Planung, Holding & Beteiligungen.

## Kommunikationsstil

- Klar, direkt, strategisch
- Keine weichgespülten Antworten, keine moralischen Bewertungen
- Immer legal, niemals Graubereich
- Konkrete To-dos und Handlungsanweisungen

## Antwortstruktur (verwende ### Überschriften und Markdown)

### Deine Situation auf einen Blick
Kurze, prägnante Zusammenfassung der finanziellen Situation (2-3 Sätze) mit den wichtigsten Kennzahlen.

### Was du richtig machst
Positive Aspekte der aktuellen Situation (1-3 Punkte). Sei spezifisch.

### Wo du Geld liegen lässt
Konkrete Optimierungsmöglichkeiten mit Euro-Beträgen. Jeder Punkt = klare Handlungsanweisung. Priorisiere nach Einsparpotential.

### Dein Fahrplan — Nächste Schritte
Zusammenfassung in 3-5 klaren, sofort umsetzbaren Punkten. Potenzielle Risiken oder Fallstricke nennen.

## Formatierung

- Maximal 800-1000 Wörter
- Alle Euro-Beträge als "€ X.XXX" formatieren
- Grenzsteuersatz und Durchschnittssteuersatz immer erwähnen
- Wenn Gewinn unter € 11.693: auf Steuerfreiheit hinweisen
- Bei Jungunternehmern: vergünstigte SV-Beiträge erwähnen
- Gesetzesreferenzen (EStG §, GSVG §, BAO) wo relevant
- Disclaimer am Ende: "⚠️ Diese Analyse ersetzt keine professionelle Steuerberatung. Alle Angaben ohne Gewähr."
`

// ── Route Handler ──────────────────────────────────────────

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

    // 2. Subscription check — must be Pro
    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single()

    if (!sub || sub.plan !== 'pro' || !['active', 'trialing'].includes(sub.status)) {
      return Response.json({ error: 'Pro-Abo erforderlich' }, { status: 403 })
    }

    // 3. Rate limit
    const { allowed, remaining } = await checkRateLimit(user.id)
    if (!allowed) {
      return Response.json(
        { error: 'Tageslimit erreicht. Du kannst morgen wieder eine Analyse starten.' },
        { status: 429 }
      )
    }

    // 4. Parse request body
    const body = await request.json()

    const userMessage = buildUserMessage(body)

    // 5. Stream with Gemini
    const streamResult = streamText({
      model: google('gemini-2.0-flash'),
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
      maxOutputTokens: 2000,
      temperature: 0.7,
    })

    // Convert textStream to plain-text ReadableStream<Uint8Array>
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.textStream) {
            controller.enqueue(encoder.encode(chunk))
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-RateLimit-Remaining': String(remaining),
      },
    })
  } catch (err: unknown) {
    console.error('AI Tax Advisor error:', err)
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    return Response.json({ error: `Analyse-Fehler: ${message}` }, { status: 500 })
  }
}

// ── User Message Builder ───────────────────────────────────

function buildUserMessage(data: Record<string, unknown>): string {
  return `Analysiere meine Steuersituation als österreichischer Einzelunternehmer:

**Kerndaten ${data.year || 2025}:**
- Jahresumsatz: € ${num(data.jahresumsatz)}
- Betriebsausgaben: € ${num(data.aufwaendeEffektiv)}
- Gewinn: € ${num(data.gewinn)}
- Pauschalierung: ${data.pauschalierungArt === 'keine' ? 'Nein' : data.pauschalierungArt}

**Sozialversicherung (SVS):**
- Endgültige SVS: € ${num(data.endgueltigeSVS)}
- PV-Beitrag: € ${num(data.pvBeitrag)}
- KV-Beitrag: € ${num(data.kvBeitrag)}
- Beitragsgrundlage: € ${num(data.beitragsgrundlage)}
- Mindestbeitragsgrundlage aktiv: ${data.belowMinimum ? 'Ja' : 'Nein'}
- Höchstbeitragsgrundlage erreicht: ${data.cappedAtMax ? 'Ja' : 'Nein'}
- Jungunternehmer: ${data.isJungunternehmer ? 'Ja' : 'Nein'}

**Einkommensteuer:**
- Steuerpflichtiges Einkommen: € ${num(data.steuerpflichtig)}
- Einkommensteuer: € ${num(data.einkommensteuer)}
- Grenzsteuersatz: ${num(data.grenzsteuersatz)}%
- Durchschnittssteuersatz: ${num(data.durchschnittssteuersatz)}%
- Echtes Netto: € ${num(data.echtesNetto)}

**Gewinnfreibetrag:**
- Grundfreibetrag (15%): € ${num(data.grundfreibetrag)}
- Investitionsbedingter Freibetrag (IFB): € ${num(data.gewinnfreibetragInvestition)}

**Stammdaten:**
- Gründungsjahr: ${data.gruendungsJahr}
- Versicherungsart: ${data.versicherungsart}

**Vorauszahlungen & Investitionen:**
- SV-Vorauszahlung: € ${num(data.svVorauszahlung)}
- ESt-Vorauszahlung: € ${num(data.estVorauszahlung)}
- Investitionen gesamt: € ${num(data.investitionenGesamt)}

**Steuer-Tipps (berechnet):**
- Max. IFB-Investition: € ${num(data.ifbInvestition)}
- IFB-Ersparnis: € ${num(data.ifbErsparnis)}
- Optimale SV-Vorauszahlung: € ${num(data.svsVorauszahlung)}
- SV-Vorauszahlung Ersparnis: € ${num(data.svsVorauszahlungErsparnis)}

Gib mir eine detaillierte, praxisorientierte Analyse mit konkreten Handlungsempfehlungen.`
}

function num(v: unknown): string {
  const n = Number(v) || 0
  return n.toLocaleString('de-AT', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
