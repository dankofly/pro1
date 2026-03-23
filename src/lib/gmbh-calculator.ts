// ============================================================
// GmbH / FlexKapG Vergleichsrechner
// Berechnet die Gesamtbelastung bei GmbH-Struktur
//
// Typischer Fall: Gesellschafter-GF mit >25% Anteil
// → GSVG-pflichtversichert (Neue Selbständige), NICHT ASVG
// → Kein AG-SV-Anteil für die GmbH
// → GF zahlt GSVG auf Einkünfte § 22 Z 2 EStG
// → GSVG ist Betriebsausgabe des GF (iterative Berechnung)
// → GmbH zahlt Lohnnebenkosten (DB/DZ/KommSt) auf GF-Bezug
// ============================================================

import type { TaxYear } from './tax-constants'
import { YEAR_CONFIGS, calcProgressiveTax } from './tax-constants'
import type { GmbhResult, GmbhWarnung } from './rechner-types'

// KöSt und KapESt Sätze (konstant über alle Jahre)
const KOEST_RATE = 0.23  // 23% seit 2024
const KAPEST_RATE = 0.275 // 27,5%

// Mindest-KöSt (seit 2024)
const MIN_KOEST_GMBH = 500       // GmbH: €500/Jahr (= €125/Quartal)

// GSVG-Sätze für GGF >25% (Neue Selbständige)
const GGF_PV_RATE = 0.185   // Pensionsversicherung
const GGF_KV_RATE = 0.068   // Krankenversicherung
const GGF_MV_RATE = 0.0153  // Selbständigenvorsorge
const GGF_UV_MONTHLY = 12.07 // Unfallversicherung pauschal/Monat

// Lohnnebenkosten auf GF-Bezug (GmbH als Dienstgeber)
const DB_RATE = 0.037     // Dienstgeberbeitrag: 3,7%
const DZ_RATE = 0.0036    // Zuschlag zum DB: ~0,36% (Durchschnitt)
const KOMMST_RATE = 0.03  // Kommunalsteuer: 3,0%
const LOHNNEBENKOSTEN_RATE = DB_RATE + DZ_RATE + KOMMST_RATE  // ~7,06%

interface GmbhCalcInput {
  gewinn: number               // EPU-Gewinn (= Umsatz - Aufwände)
  gfGehaltMonatlich: number    // GF-Bezug brutto/Monat
  year: TaxYear
  epuNetto: number             // EPU echtes Netto (zum Vergleich)
}

export function calculateGmbh(input: GmbhCalcInput): GmbhResult {
  const { gewinn, gfGehaltMonatlich, year, epuNetto } = input
  const cfg = YEAR_CONFIGS[year]

  // GF-Bezug: 14 Bezüge (inkl. 13./14.)
  const gfGehaltBrutto = gfGehaltMonatlich * 14

  // ── GGF GSVG-Beiträge (iterativ, da Betriebsausgabe) ──
  const svsCfg = cfg.svs
  const totalRate = GGF_PV_RATE + GGF_KV_RATE + GGF_MV_RATE
  const uvJaehrlich = GGF_UV_MONTHLY * 12

  let gsvgBeitraege = 0
  for (let i = 0; i < 10; i++) {
    const einkuenfte = Math.max(0, gfGehaltBrutto - gsvgBeitraege)
    const bgl = Math.min(Math.max(einkuenfte, svsCfg.minBeitragsgrundlage), svsCfg.hoechstbeitrag)
    const neueBeitraege = bgl * totalRate + uvJaehrlich
    if (Math.abs(neueBeitraege - gsvgBeitraege) < 0.01) {
      gsvgBeitraege = neueBeitraege
      break
    }
    gsvgBeitraege = neueBeitraege
  }

  const gfSv = gsvgBeitraege

  // GF-ESt: Bezug - GSVG → progressiver Tarif
  const gfSteuerpflichtig = Math.max(0, gfGehaltBrutto - gfSv)
  const gfLohnsteuer = calcProgressiveTax(gfSteuerpflichtig, year)

  // GF Netto
  const gfNetto = gfGehaltBrutto - gfSv - gfLohnsteuer

  // ── GmbH-Kosten ──
  // Lohnnebenkosten: DB (3,7%) + DZ (~0,36%) + KommSt (3,0%) auf GF-Bezug
  const lohnnebenkosten = gfGehaltBrutto * LOHNNEBENKOSTEN_RATE

  // Personalaufwand gesamt = GF-Bezug + Lohnnebenkosten (kein AG-SV bei GSVG-GGF)
  const personalAufwandGesamt = gfGehaltBrutto + lohnnebenkosten

  const gewinnVorKoest = Math.max(0, gewinn - personalAufwandGesamt)

  // KöSt (23% seit 2024, mindestens Mindest-KöSt)
  const minKoest = MIN_KOEST_GMBH
  const koest = Math.max(gewinnVorKoest * KOEST_RATE, minKoest)
  const gewinnNachKoest = Math.max(0, gewinnVorKoest - koest)

  // Ausschüttung (gesamter Gewinn nach KöSt)
  const ausschuettung = gewinnNachKoest

  // KapESt auf Ausschüttung (27,5%)
  const kapest = ausschuettung * KAPEST_RATE

  // Gesamt-Netto: GF-Netto + Ausschüttung nach KapESt
  const gesamtNetto = gfNetto + ausschuettung - kapest

  const differenzZuEpu = gesamtNetto - epuNetto

  // ── Warnungen ──
  const warnungen: GmbhWarnung[] = []

  warnungen.push({
    typ: 'kosten',
    text: `Laufende GmbH-Kosten nicht eingerechnet: Bilanzierungspflicht (Steuerberater ca. €3.000–5.000/Jahr), Firmenbuchgebühren, Notar, ggf. Geschäftsführer-Haftpflichtversicherung. Diese reduzieren den GmbH-Vorteil zusätzlich.`,
  })

  if (gewinnVorKoest * KOEST_RATE < minKoest) {
    warnungen.push({
      typ: 'info',
      text: `Mindest-KöSt greift: Die KöSt beträgt mindestens €${minKoest}/Jahr, auch wenn kein oder wenig Gewinn anfällt.`,
    })
  }

  return {
    gewinnVorKoest,
    koest,
    gewinnNachKoest,
    gfGehaltBrutto,
    gfSv,
    gfLohnsteuer,
    gfNetto,
    lohnnebenkosten,
    personalAufwandGesamt,
    minKoest,
    ausschuettung,
    kapest,
    gesamtNetto,
    differenzZuEpu,
    vorteilhaft: differenzZuEpu > 0,
    warnungen,
  }
}
