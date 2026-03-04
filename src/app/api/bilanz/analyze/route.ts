import { NextRequest } from 'next/server'
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
  anlagenintensitaet: number
  umlaufintensitaet: number
  gewinn: number
}

interface SteuerAnalyse {
  koerperschaftsteuer: number
  koestSatz: number
  effektiverSteuersatz: number
  gewinnVorSteuern: number
  gewinnNachSteuern: number
}

interface Optimierung {
  titel: string
  beschreibung: string
  ersparnisEur: number
  prioritaet: 'hoch' | 'mittel' | 'niedrig'
}

// ── KPI Calculations ─────────────────────────────────────────

function safeDiv(numerator: number, denominator: number): number {
  if (denominator === 0) return 0
  return numerator / denominator
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function roundPct(value: number): number {
  return Math.round(value * 10000) / 100 // e.g. 0.2345 -> 23.45
}

function calculateKennzahlen(parsed: ParsedBilanz): Kennzahlen {
  const { aktiva, passiva } = parsed.bilanz
  const { guv } = parsed

  const bilanzsumme = aktiva.anlagevermoegen + aktiva.umlaufvermoegen + aktiva.rechnungsabgrenzung

  // Gewinn = Umsatzerlöse - alle Aufwände + Finanzergebnis
  const gewinn = guv.umsatzerloese
    - guv.materialaufwand
    - guv.personalaufwand
    - guv.abschreibungen
    - guv.sonstigerAufwand
    + guv.finanzergebnis

  // Zinsen aus Finanzergebnis (only negative part = interest expense)
  const zinsen = guv.finanzergebnis < 0 ? Math.abs(guv.finanzergebnis) : 0

  return {
    bilanzsumme: round2(bilanzsumme),
    eigenkapitalquote: roundPct(safeDiv(passiva.eigenkapital, bilanzsumme)),
    verschuldungsgrad: roundPct(safeDiv(passiva.fremdkapital, passiva.eigenkapital)),
    liquiditaet1Grad: roundPct(safeDiv(aktiva.fluessigeMittel, passiva.kurzfristigeVerbindlichkeiten)),
    liquiditaet3Grad: roundPct(safeDiv(aktiva.umlaufvermoegen, passiva.kurzfristigeVerbindlichkeiten)),
    umsatzrentabilitaet: roundPct(safeDiv(gewinn, guv.umsatzerloese)),
    ekRentabilitaet: roundPct(safeDiv(gewinn, passiva.eigenkapital)),
    gkRentabilitaet: roundPct(safeDiv(gewinn + zinsen, bilanzsumme)),
    workingCapital: round2(aktiva.umlaufvermoegen - passiva.kurzfristigeVerbindlichkeiten),
    anlagenintensitaet: roundPct(safeDiv(aktiva.anlagevermoegen, bilanzsumme)),
    umlaufintensitaet: roundPct(safeDiv(aktiva.umlaufvermoegen, bilanzsumme)),
    gewinn: round2(gewinn),
  }
}

// ── Tax Analysis ─────────────────────────────────────────────

const KOEST_RATE = 0.23 // KöSt 23% (Austria, since 2024)

function calculateSteuerAnalyse(parsed: ParsedBilanz, kennzahlen: Kennzahlen): SteuerAnalyse {
  const gewinnVorSteuern = kennzahlen.gewinn

  let koerperschaftsteuer = 0
  let effektiverSteuersatz = 0

  if (parsed.rechtsform === 'gmbh' || parsed.rechtsform === 'flexco') {
    // KöSt for corporations
    koerperschaftsteuer = Math.max(gewinnVorSteuern * KOEST_RATE, 0)
    effektiverSteuersatz = gewinnVorSteuern > 0
      ? roundPct(koerperschaftsteuer / gewinnVorSteuern)
      : 0
  } else {
    // Einzelunternehmen: ESt brackets (simplified top-level)
    koerperschaftsteuer = calculateESt(gewinnVorSteuern)
    effektiverSteuersatz = gewinnVorSteuern > 0
      ? roundPct(koerperschaftsteuer / gewinnVorSteuern)
      : 0
  }

  return {
    koerperschaftsteuer: round2(koerperschaftsteuer),
    koestSatz: parsed.rechtsform === 'einzelunternehmen' ? 0 : KOEST_RATE * 100,
    effektiverSteuersatz,
    gewinnVorSteuern: round2(gewinnVorSteuern),
    gewinnNachSteuern: round2(gewinnVorSteuern - koerperschaftsteuer),
  }
}

// Austrian ESt brackets 2025/2026
function calculateESt(einkommen: number): number {
  if (einkommen <= 0) return 0

  const brackets = [
    { bis: 12816, satz: 0 },
    { bis: 20818, satz: 0.20 },
    { bis: 34513, satz: 0.30 },
    { bis: 66612, satz: 0.40 },
    { bis: 99266, satz: 0.48 },
    { bis: 1000000, satz: 0.50 },
    { bis: Infinity, satz: 0.55 },
  ]

  let steuer = 0
  let prevBis = 0

  for (const bracket of brackets) {
    if (einkommen <= prevBis) break
    const taxableInBracket = Math.min(einkommen, bracket.bis) - prevBis
    steuer += Math.max(taxableInBracket, 0) * bracket.satz
    prevBis = bracket.bis
  }

  return steuer
}

// ── Optimization Suggestions ─────────────────────────────────

function generateOptimierungen(
  parsed: ParsedBilanz,
  kennzahlen: Kennzahlen,
  steuerAnalyse: SteuerAnalyse
): Optimierung[] {
  const optimierungen: Optimierung[] = []
  const { aktiva, passiva } = parsed.bilanz
  const { guv } = parsed

  // 1. Eigenkapitalquote check
  if (kennzahlen.eigenkapitalquote < 20) {
    optimierungen.push({
      titel: 'Eigenkapitalquote stärken',
      beschreibung: `Eigenkapitalquote liegt bei nur ${kennzahlen.eigenkapitalquote}%. Eine Quote unter 20% signalisiert hohes Risiko. Gewinnthesaurierung oder Gesellschaftereinlage prüfen.`,
      ersparnisEur: 0,
      prioritaet: 'hoch',
    })
  }

  // 2. Liquiditätsprobleme
  if (kennzahlen.liquiditaet1Grad < 20) {
    optimierungen.push({
      titel: 'Liquidität verbessern',
      beschreibung: `Liquidität 1. Grades bei ${kennzahlen.liquiditaet1Grad}% — Faustregel: mindestens 20%. Debitorenmanagement optimieren, Zahlungsziele nachverhandeln.`,
      ersparnisEur: 0,
      prioritaet: 'hoch',
    })
  }

  // 3. Gewinnfreibetrag (GFB) — 15% des Gewinns, max. € 46.400 (2025)
  if (parsed.rechtsform === 'einzelunternehmen' && kennzahlen.gewinn > 0) {
    const gfb = Math.min(kennzahlen.gewinn * 0.15, 46400)
    const gfbErsparnis = gfb * 0.42 // avg marginal rate approximation
    optimierungen.push({
      titel: 'Gewinnfreibetrag (§ 10 EStG) nutzen',
      beschreibung: `Grundfreibetrag bis € ${Math.round(gfb).toLocaleString('de-AT')} steht dir automatisch zu. Für den investitionsbedingten GFB geeignete Wertpapiere (z. B. Wohnbauanleihen) anschaffen.`,
      ersparnisEur: Math.round(gfbErsparnis),
      prioritaet: 'hoch',
    })
  }

  // 4. Investitionsfreibetrag (IFB) — 10%/15% of qualifying investments
  if (aktiva.sachanlagen > 0) {
    const ifbBasis = aktiva.sachanlagen
    const ifbRate = 0.15 // 15% standard, 20% for eco/digital
    const ifb = Math.min(ifbBasis * ifbRate, 1000000) // max. € 1 Mio. Bemessungsgrundlage
    if (ifb > 0) {
      const ersparnisRate = parsed.rechtsform === 'einzelunternehmen' ? 0.42 : KOEST_RATE
      optimierungen.push({
        titel: 'Investitionsfreibetrag (§ 11 EStG) prüfen',
        beschreibung: `Bei Neuinvestitionen in Sachanlagen bis zu 15% (bzw. 20% für ökologische/digitale Investitionen) als Freibetrag absetzen. Potenzial: bis € ${Math.round(ifb).toLocaleString('de-AT')}.`,
        ersparnisEur: Math.round(ifb * ersparnisRate),
        prioritaet: 'mittel',
      })
    }
  }

  // 5. Forschungsprämie
  if (guv.sonstigerAufwand > 50000) {
    optimierungen.push({
      titel: 'Forschungsprämie (§ 108c EStG) prüfen',
      beschreibung: 'Bei F&E-Aufwendungen steht eine 14%ige Forschungsprämie zu. Falls Teile des sonstigen Aufwands Forschung betreffen, FFG-Gutachten beantragen.',
      ersparnisEur: Math.round(guv.sonstigerAufwand * 0.05 * 0.14), // conservative estimate: 5% of other expenses qualify
      prioritaet: 'mittel',
    })
  }

  // 6. GmbH Rechtsformwechsel
  if (parsed.rechtsform === 'einzelunternehmen' && kennzahlen.gewinn > 80000) {
    const estBelastung = steuerAnalyse.koerperschaftsteuer
    const koestBelastung = kennzahlen.gewinn * KOEST_RATE
    const ersparnis = estBelastung - koestBelastung
    if (ersparnis > 3000) {
      optimierungen.push({
        titel: 'Rechtsformwechsel zur GmbH prüfen',
        beschreibung: `Ab einem Gewinn von ca. € 80.000 kann die GmbH steuerlich günstiger sein. Dein geschätzter Vorteil: ca. € ${Math.round(ersparnis).toLocaleString('de-AT')} p.a. (KöSt 23% vs. ESt-Grenzsteuersatz). Achtung: GF-Bezug, Sozialversicherung und Mindest-KöSt berücksichtigen.`,
        ersparnisEur: Math.round(ersparnis),
        prioritaet: 'hoch',
      })
    }
  }

  // 7. Working Capital negative
  if (kennzahlen.workingCapital < 0) {
    optimierungen.push({
      titel: 'Negatives Working Capital beheben',
      beschreibung: `Working Capital ist € ${Math.round(Math.abs(kennzahlen.workingCapital)).toLocaleString('de-AT')} negativ. Kurzfristige Verbindlichkeiten übersteigen Umlaufvermögen — Refinanzierungsbedarf prüfen.`,
      ersparnisEur: 0,
      prioritaet: 'hoch',
    })
  }

  // 8. Abschreibungen check
  if (guv.abschreibungen === 0 && aktiva.sachanlagen > 0) {
    optimierungen.push({
      titel: 'Abschreibungspotenzial prüfen',
      beschreibung: 'Es sind Sachanlagen vorhanden, aber keine Abschreibungen verbucht. Sicherstellen, dass alle AfA-Potenziale (linear, degressiv seit 2020) genutzt werden.',
      ersparnisEur: 0,
      prioritaet: 'mittel',
    })
  }

  // Sort by priority: hoch > mittel > niedrig
  const prio = { hoch: 0, mittel: 1, niedrig: 2 }
  optimierungen.sort((a, b) => prio[a.prioritaet] - prio[b.prioritaet])

  return optimierungen
}

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

    // 2. Subscription check — Basic or Pro
    const { data: sub } = await getSupabaseAdmin()
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single()

    if (!sub || !['active', 'trialing'].includes(sub.status)) {
      return Response.json({ error: 'Aktives Abo erforderlich.' }, { status: 403 })
    }

    if (!['basic', 'pro'].includes(sub.plan)) {
      return Response.json({ error: 'Basic- oder Pro-Abo erforderlich.' }, { status: 403 })
    }

    // 3. Parse request body
    const body = await request.json().catch(() => null)
    if (!body || !body.parsed) {
      return Response.json({ error: 'Bilanz-Daten fehlen.' }, { status: 400 })
    }

    const { sessionId, parsed } = body as { sessionId: string; parsed: ParsedBilanz }

    if (!sessionId) {
      return Response.json({ error: 'Session-ID fehlt.' }, { status: 400 })
    }

    // Validate that we have at least some data to analyze
    const hasAktiva = Object.values(parsed.bilanz?.aktiva || {}).some(v => typeof v === 'number' && v !== 0)
    const hasPassiva = Object.values(parsed.bilanz?.passiva || {}).some(v => typeof v === 'number' && v !== 0)
    const hasGuV = Object.values(parsed.guv || {}).some(v => typeof v === 'number' && v !== 0)

    if (!hasAktiva && !hasPassiva && !hasGuV) {
      return Response.json(
        { error: 'Keine Bilanz-Daten vorhanden. Bitte lade zuerst eine Datei hoch oder fülle die Daten manuell aus.' },
        { status: 400 }
      )
    }

    // 4. Calculate KPIs
    const kennzahlen = calculateKennzahlen(parsed)

    // 5. Tax analysis
    const steuerAnalyse = calculateSteuerAnalyse(parsed, kennzahlen)

    // 6. Generate optimization suggestions
    const optimierungen = generateOptimierungen(parsed, kennzahlen, steuerAnalyse)

    return Response.json({
      sessionId,
      kennzahlen,
      steuerAnalyse,
      optimierungen,
    })
  } catch (err: unknown) {
    console.error('Bilanz Analyze error:', err)
    console.error('Bilanz Analyze detail:', err instanceof Error ? err.message : err)
    return Response.json({ error: 'Analyse-Fehler. Bitte versuche es erneut.' }, { status: 500 })
  }
}
