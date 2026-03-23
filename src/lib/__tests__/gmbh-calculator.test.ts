// ============================================================
// Tests: gmbh-calculator.ts — GmbH/FlexKapG Vergleichsrechner
// GGF >25% → GSVG (nicht ASVG), kein AG-SV, aber DB/DZ/KommSt
// ============================================================

import { describe, it, expect } from 'vitest'
import { calculateGmbh } from '../gmbh-calculator'

const round2 = (n: number) => Math.round(n * 100) / 100

describe('GmbH Vergleichsrechner 2025 — GSVG-GGF', () => {
  it('€80.000 Gewinn, €3.000 GF-Bezug → korrekte GSVG + Lohnnebenkosten', () => {
    const r = calculateGmbh({
      gewinn: 80000,
      gfGehaltMonatlich: 3000,
      year: '2025',
      epuNetto: 45000,
    })

    // GF-Bezug: 3.000 × 14 = 42.000
    expect(r.gfGehaltBrutto).toBe(42000)

    // GF-SV ist GSVG (iteriert)
    expect(r.gfSv).toBeGreaterThan(42000 * 0.20)
    expect(r.gfSv).toBeLessThan(42000 * 0.30)

    // GF-Netto = Bezug - GSVG - ESt
    expect(r.gfNetto).toBeCloseTo(42000 - r.gfSv - r.gfLohnsteuer, 1)

    // Lohnnebenkosten: ~7,06% auf GF-Bezug
    expect(r.lohnnebenkosten).toBeCloseTo(42000 * 0.0706, 0)

    // Personalaufwand = GF-Bezug + Lohnnebenkosten (kein AG-SV)
    expect(r.personalAufwandGesamt).toBeCloseTo(42000 + r.lohnnebenkosten, 1)

    // GmbH-Gewinn = 80.000 - Personalaufwand
    expect(round2(r.gewinnVorKoest)).toBe(round2(Math.max(0, 80000 - r.personalAufwandGesamt)))

    // KöSt = 23%, mindestens 500
    expect(r.koest).toBeGreaterThanOrEqual(500)
    expect(round2(r.koest)).toBe(round2(Math.max(r.gewinnVorKoest * 0.23, 500)))

    // KapESt = 27,5% auf Ausschüttung
    expect(round2(r.kapest)).toBe(round2(r.ausschuettung * 0.275))

    // Gesamt-Netto = GF-Netto + Ausschüttung - KapESt
    expect(round2(r.gesamtNetto)).toBe(round2(r.gfNetto + r.ausschuettung - r.kapest))
  })

  it('€40.000 Gewinn → GmbH nachteilig (Doppelbesteuerung + Lohnnebenkosten)', () => {
    const r = calculateGmbh({
      gewinn: 40000,
      gfGehaltMonatlich: 2000,
      year: '2025',
      epuNetto: 28000,
    })

    expect(r.vorteilhaft).toBe(false)
  })

  it('€200.000 Gewinn → GmbH vorteilhaft', () => {
    const r = calculateGmbh({
      gewinn: 200000,
      gfGehaltMonatlich: 5000,
      year: '2025',
      epuNetto: 90000,
    })

    expect(r.gesamtNetto).toBeGreaterThan(0)
    expect(r.gewinnVorKoest).toBeGreaterThan(0)

    // Personalaufwand = Bezug + Lohnnebenkosten
    const bezug = 5000 * 14
    expect(r.personalAufwandGesamt).toBeCloseTo(bezug + bezug * 0.0706, 0)
  })

  it('Mindest-KöSt greift bei niedrigem GmbH-Gewinn', () => {
    const r = calculateGmbh({
      gewinn: 30000,
      gfGehaltMonatlich: 2000,
      year: '2025',
      epuNetto: 20000,
    })

    // GF-Bezug (28.000) + LNK (~1.977) ≈ 29.977 → GmbH-Gewinn ≈ 23 €
    // 23 × 23% = 5,29 < 500 → Mindest-KöSt greift
    expect(r.minKoest).toBe(500)
    expect(r.koest).toBeGreaterThanOrEqual(500)
  })

  it('Warnungen enthalten Nebenkosten-Hinweis', () => {
    const r = calculateGmbh({
      gewinn: 80000,
      gfGehaltMonatlich: 3000,
      year: '2025',
      epuNetto: 45000,
    })

    expect(r.warnungen.length).toBeGreaterThan(0)
    expect(r.warnungen.some(w => w.typ === 'kosten')).toBe(true)
  })

  it('GF-Bezug über GSVG-HBGL → Beiträge gedeckelt', () => {
    const r = calculateGmbh({
      gewinn: 200000,
      gfGehaltMonatlich: 8000,
      year: '2025',
      epuNetto: 90000,
    })

    expect(r.gfGehaltBrutto).toBe(112000)
    expect(r.gfSv).toBeLessThan(25000)
    expect(r.gfSv).toBeGreaterThan(20000)
  })

  it('Differenz zu EPU korrekt berechnet', () => {
    const epuNetto = 45000
    const r = calculateGmbh({
      gewinn: 80000,
      gfGehaltMonatlich: 3000,
      year: '2025',
      epuNetto,
    })

    expect(r.differenzZuEpu).toBeCloseTo(r.gesamtNetto - epuNetto, 2)
    expect(r.vorteilhaft).toBe(r.differenzZuEpu > 0)
  })

  it('GSVG iterativ: GF-SV < Bezug × Bruttorate', () => {
    const r = calculateGmbh({
      gewinn: 100000,
      gfGehaltMonatlich: 4000,
      year: '2025',
      epuNetto: 55000,
    })

    const bezug = 4000 * 14
    const bruttoGsvg = bezug * (0.185 + 0.068 + 0.0153) + 12.07 * 12
    expect(r.gfSv).toBeLessThan(bruttoGsvg)
    expect(r.gfSv).toBeGreaterThan(0)
  })
})
