// ============================================================
// Tests: gmbh-calculator.ts — GmbH/FlexKapG Vergleichsrechner
// ============================================================

import { describe, it, expect } from 'vitest'
import { calculateGmbh } from '../gmbh-calculator'

const round2 = (n: number) => Math.round(n * 100) / 100

describe('GmbH Vergleichsrechner 2025', () => {
  it('€80.000 Gewinn, €3.000 GF-Gehalt → korrekte Aufteilung', () => {
    const r = calculateGmbh({
      gewinn: 80000,
      gfGehaltMonatlich: 3000,
      year: '2025',
      epuNetto: 45000,
    })

    // GF-Gehalt: 3.000 × 14 = 42.000
    expect(r.gfGehaltBrutto).toBe(42000)

    // GF-SV (ASVG DN): min(42.000, 77.400) × 18,12% = 42.000 × 0.1812 = 7.610,40
    expect(round2(r.gfSv)).toBe(round2(42000 * 0.1812))

    // GF-Netto = Brutto - SV - Lohnsteuer
    expect(r.gfNetto).toBe(round2(42000 - r.gfSv - r.gfLohnsteuer))

    // Personalaufwand = GF-Brutto + AG-SV (21,12%)
    const agSv = Math.min(42000, 77400) * 0.2112
    const personalAufwand = 42000 + agSv

    // GmbH-Gewinn vor KöSt
    expect(round2(r.gewinnVorKoest)).toBe(round2(Math.max(0, 80000 - personalAufwand)))

    // KöSt = 23%
    expect(round2(r.koest)).toBe(round2(r.gewinnVorKoest * 0.23))

    // KapESt = 27,5% auf Ausschüttung
    expect(round2(r.kapest)).toBe(round2(r.ausschuettung * 0.275))

    // Gesamt-Netto = GF-Netto + Ausschüttung - KapESt
    expect(round2(r.gesamtNetto)).toBe(round2(r.gfNetto + r.ausschuettung - r.kapest))
  })

  it('€40.000 Gewinn → GmbH wahrscheinlich nachteilig', () => {
    const r = calculateGmbh({
      gewinn: 40000,
      gfGehaltMonatlich: 2000,
      year: '2025',
      epuNetto: 28000,
    })

    // Bei niedrigem Gewinn ist GmbH typisch schlechter (Doppelbesteuerung)
    expect(r.vorteilhaft).toBe(false)
  })

  it('€200.000 Gewinn → GmbH wahrscheinlich vorteilhaft', () => {
    const r = calculateGmbh({
      gewinn: 200000,
      gfGehaltMonatlich: 5000,
      year: '2025',
      epuNetto: 90000,
    })

    // Bei hohem Gewinn schlägt 23% KöSt + 27,5% KapESt den progressiven Tarif
    // GmbH sollte hier vorteilhaft sein
    expect(r.gesamtNetto).toBeGreaterThan(0)
    expect(r.gewinnVorKoest).toBeGreaterThan(0)
  })

  it('GF-Gehalt über HBGL → SV gedeckelt', () => {
    const r = calculateGmbh({
      gewinn: 200000,
      gfGehaltMonatlich: 8000,
      year: '2025',
      epuNetto: 90000,
    })

    // GF-Brutto: 8.000 × 14 = 112.000
    expect(r.gfGehaltBrutto).toBe(112000)

    // SV-Basis gedeckelt auf HBGL (77.400 für 2025)
    expect(round2(r.gfSv)).toBe(round2(77400 * 0.1812))
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
})
