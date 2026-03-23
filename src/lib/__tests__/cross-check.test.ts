// ============================================================
// Cross-Check: Manuelle Schritt-für-Schritt Berechnung
// Verifiziert die gesamte Berechnungskette gegen Handrechnung
// basierend auf WKO/SVS Werten 2025
//
// HINWEIS: Seit der iterativen SVS-Berechnung (SVS als
// Betriebsausgabe, § 25 GSVG) ist BGL ≠ Gewinn.
// BGL = Gewinn - SVS (konvergiert iterativ).
// ============================================================

import { describe, it, expect } from 'vitest'
import { calculateSvs } from '../svs-calculator'
import { calculateMischEinkommen } from '../misch-einkommen'
import { calcProgressiveTax } from '../tax-constants'

const round2 = (n: number) => Math.round(n * 100) / 100

// ── Szenario 1: €80.000 Gewerbetreibender 2025 ──────────────

describe('Cross-Check: €80.000 Gewerbetreibender 2025', () => {
  const r = calculateSvs(80000, 0, '2025', undefined, {
    versicherungsart: 'gsvg_gewerbe',
    jungunternehmer: false,
    gruendungsJahr: 2020,
  })

  it('Iterative BGL: Beitragsgrundlage < Gewinn (SVS als Betriebsausgabe)', () => {
    // BGL = Gewinn - SVS (iteriert), daher BGL < 80.000
    expect(r.beitragsgrundlage).toBeLessThan(80000)
    expect(r.beitragsgrundlage).toBeGreaterThan(55000) // Sanity
  })

  it('Konsistenz: BGL ≈ Gewinn - SVS', () => {
    expect(Math.abs(r.beitragsgrundlage - (80000 - r.endgueltigeSVS))).toBeLessThan(1)
  })

  it('Einzelbeiträge korrekt auf iterierte BGL', () => {
    const bgl = r.beitragsgrundlage
    expect(r.pvBeitrag).toBeCloseTo(bgl * 0.185, 0)
    expect(r.kvBeitrag).toBeCloseTo(bgl * 0.068, 0)
    expect(r.mvBeitrag).toBeCloseTo(bgl * 0.0153, 0)
  })

  it('UV = €12,07 × 12 = €144,84', () => {
    expect(r.uvBeitrag).toBe(144.84)
  })

  it('SVS Gesamt = PV + KV + MV + UV', () => {
    expect(round2(r.endgueltigeSVS)).toBe(
      round2(r.pvBeitrag + r.kvBeitrag + r.mvBeitrag + r.uvBeitrag)
    )
  })

  it('Steuerlicher Gewinn = Gewinn - SVS', () => {
    const steuerGewinn = 80000 - r.endgueltigeSVS
    expect(steuerGewinn).toBeGreaterThan(60000)
    expect(steuerGewinn).toBeLessThan(70000)
  })

  it('Grundfreibetrag = €4.950 (33.000 × 15%)', () => {
    expect(r.grundfreibetrag).toBe(4950)
  })

  it('EST Brutto korrekt (progressive Berechnung auf iterierte Werte)', () => {
    // Steuerpflichtig = (Gewinn - SVS) - GFB
    const steuerGewinn = 80000 - r.endgueltigeSVS
    const steuerpflichtig = steuerGewinn - 4950
    const expectedEst = calcProgressiveTax(steuerpflichtig, '2025')
    expect(round2(r.steuerBrutto)).toBe(round2(expectedEst))
  })

  it('Echtes Netto = Gewinn - SVS - EST', () => {
    expect(round2(r.echtesNetto)).toBe(round2(80000 - r.endgueltigeSVS - r.einkommensteuer))
  })

  it('Netto plausibel (€47.000-€52.000)', () => {
    // Iterative SVS → niedrigere SVS → höheres Netto als bei nicht-iterativ
    expect(r.echtesNetto).toBeGreaterThan(47000)
    expect(r.echtesNetto).toBeLessThan(52000)
  })
})

// ── Szenario 2: €40.000 Gewerbetreibender 2025 ──────────────

describe('Cross-Check: €40.000 Gewerbetreibender 2025', () => {
  const r = calculateSvs(40000, 0, '2025', undefined, {
    versicherungsart: 'gsvg_gewerbe',
    jungunternehmer: false,
    gruendungsJahr: 2020,
  })

  it('Iterative BGL < Gewinn', () => {
    expect(r.beitragsgrundlage).toBeLessThan(40000)
    expect(r.beitragsgrundlage).toBeGreaterThan(28000)
  })

  it('SVS niedriger als bei nicht-iterativer Berechnung', () => {
    // Nicht-iterativ wäre: 40.000 × 26.83% + UV = ~10.877
    // Iterativ muss weniger sein
    expect(r.endgueltigeSVS).toBeLessThan(10877)
    expect(r.endgueltigeSVS).toBeGreaterThan(7000)
  })

  it('GFB auf steuerlichen Gewinn (nicht Brutto-Gewinn)', () => {
    const steuerGewinn = 40000 - r.endgueltigeSVS
    const expectedGfb = Math.min(steuerGewinn, 33000) * 0.15
    expect(round2(r.grundfreibetrag)).toBe(round2(expectedGfb))
  })

  it('EST korrekt (niedrige Progression)', () => {
    // Iteriert: SVS ~8.5k, SteuerGewinn ~31.5k, GFB ~4.7k, steuerpflichtig ~26.8k
    expect(r.einkommensteuer).toBeGreaterThan(1500)
    expect(r.einkommensteuer).toBeLessThan(3500)
  })

  it('Netto plausibel (€27.000-€30.000)', () => {
    // Iterative SVS → höheres Netto
    expect(r.echtesNetto).toBeGreaterThan(27000)
    expect(r.echtesNetto).toBeLessThan(30000)
  })
})

// ── Szenario 3: €5.000 Neue Selbständige 2025 ───────────────

describe('Cross-Check: €5.000 Neue Selbständige 2025', () => {
  const r = calculateSvs(5000, 0, '2025', undefined, {
    versicherungsart: 'gsvg_neu',
    jungunternehmer: false,
    gruendungsJahr: 2020,
  })

  it('Unter Versicherungsgrenze (€6.613,20) → keine SVS', () => {
    expect(r.belowMinimum).toBe(true)
    expect(r.beitragsgrundlage).toBe(0)
    expect(r.pvBeitrag).toBe(0)
    expect(r.kvBeitrag).toBe(0)
    expect(r.mvBeitrag).toBe(0)
    expect(r.uvBeitrag).toBe(0)
    expect(r.endgueltigeSVS).toBe(0)
  })

  it('Kein SVS-Abzug → ESt direkt auf Gewinn', () => {
    expect(r.grundfreibetrag).toBe(750)
    expect(r.einkommensteuer).toBe(0)
  })

  it('Netto = Gewinn (€5.000)', () => {
    expect(r.echtesNetto).toBe(5000)
  })
})

// ── Szenario 4: €120.000 mit HBGL-Deckel 2025 ──────────────

describe('Cross-Check: €120.000 Gewerbetreibender 2025 (HBGL)', () => {
  const r = calculateSvs(120000, 0, '2025', undefined, {
    versicherungsart: 'gsvg_gewerbe',
    jungunternehmer: false,
    gruendungsJahr: 2020,
  })

  it('Beitragsgrundlage gedeckelt auf HBGL €90.300', () => {
    // 120.000 - SVS(~24.372) ≈ 95.628 > 90.300 → HBGL greift
    expect(r.beitragsgrundlage).toBe(90300)
    expect(r.cappedAtMax).toBe(true)
  })

  it('SVS auf Basis HBGL berechnet', () => {
    // PV: 90.300 × 18,5% = 16.705,50
    // KV: 90.300 × 6,80% = 6.140,40
    // MV: 90.300 × 1,53% = 1.381,59
    // UV: 144,84
    expect(round2(r.pvBeitrag)).toBe(16705.50)
    expect(round2(r.kvBeitrag)).toBe(6140.40)
    expect(round2(r.mvBeitrag)).toBe(1381.59)
    expect(round2(r.endgueltigeSVS)).toBe(round2(16705.50 + 6140.40 + 1381.59 + 144.84))
  })

  it('Steuerpflichtiges Einkommen korrekt (hohe Stufe)', () => {
    const expectedSvs = 16705.50 + 6140.40 + 1381.59 + 144.84
    const steuerGewinn = 120000 - expectedSvs
    expect(round2(r.steuerpflichtig)).toBe(round2(steuerGewinn - 4950))
  })

  it('EST in 48%-Stufe (korrekte Progression)', () => {
    expect(r.einkommensteuer).toBeGreaterThan(29000)
    expect(r.einkommensteuer).toBeLessThan(30000)
  })

  it('Netto plausibel (€65.000-€67.000)', () => {
    expect(r.echtesNetto).toBeGreaterThan(65000)
    expect(r.echtesNetto).toBeLessThan(67000)
  })
})

// ── Szenario 5: MinBGL bei niedrigem Gewinn ──────────────────

describe('Cross-Check: €2.000 Gewerbetreibender 2025 (MinBGL)', () => {
  const r = calculateSvs(2000, 0, '2025', undefined, {
    versicherungsart: 'gsvg_gewerbe',
    jungunternehmer: false,
    gruendungsJahr: 2020,
  })

  it('Mindestbeitragsgrundlage greift (€6.613,20)', () => {
    expect(r.usesMinBeitragsgrundlage).toBe(true)
    expect(r.beitragsgrundlage).toBe(6613.20)
  })

  it('SVS auf MinBGL berechnet', () => {
    const expectedPv = 6613.20 * 0.185
    const expectedKv = 6613.20 * 0.068
    const expectedMv = 6613.20 * 0.0153
    const expectedSvs = expectedPv + expectedKv + expectedMv + 144.84

    expect(round2(r.pvBeitrag)).toBe(round2(expectedPv))
    expect(round2(r.kvBeitrag)).toBe(round2(expectedKv))
    expect(round2(r.endgueltigeSVS)).toBe(round2(expectedSvs))
  })

  it('SVS höher als Gewinn → negatives Netto möglich', () => {
    expect(r.einkommensteuer).toBe(0)
    expect(r.echtesNetto).toBeLessThan(200)
    expect(r.echtesNetto).toBeGreaterThan(-100)
  })
})

// ── Szenario 6: Misch-Einkommen Cross-Check ─────────────────

describe('Cross-Check: Misch-Einkommen €42.000 Gehalt + €15.000 Gewerbe', () => {
  const r = calculateMischEinkommen({
    bruttoGehalt: 42000,
    jahresgewinn: 15000,
    kinderUnter18: 0,
    kinderUeber18: 0,
    alleinverdiener: false,
    year: '2025',
  })

  it('Anstellung: SV = min(42.000, 77.400) × 18,12%', () => {
    const expectedSv = 42000 * 0.1812
    expect(round2(r.anstellung.sv)).toBe(round2(expectedSv))
  })

  it('Anstellung: steuerpflichtig = laufende Bezüge (12/14) - SV_laufend - WK', () => {
    // Sechstelregelung: nur 12/14 des Brutto wird progressiv besteuert
    const laufend = 42000 * 12 / 14
    const svLaufend = r.anstellung.sv * 12 / 14
    const expected = laufend - svLaufend - 132
    expect(round2(r.anstellung.steuerpflichtig)).toBeCloseTo(round2(expected), 0)
  })

  it('Gewerbe über Versicherungsgrenze → SVS-Beiträge', () => {
    expect(r.gewerbe.ueberVersicherungsgrenze).toBe(true)
    expect(r.gewerbe.svsGesamt).toBeGreaterThan(0)
  })

  it('Gewerbe SVS mit Differenzvorschreibung + Iteration', () => {
    // ASVG-BGL = 42.000, GSVG-HBGL = 90.300
    // Max GSVG-BGL = 90.300 - 42.000 = 48.300 (> 15.000, also Differenz-Cap greift nicht)
    // Aber: iterative SVS → BGL < 15.000 (SVS mindert eigene Basis)
    expect(r.gewerbe.svsPv).toBeLessThan(2775)  // < 15.000 × 18.5%
    expect(r.gewerbe.svsKv).toBeLessThan(1020)  // < 15.000 × 6.8%
    expect(r.gewerbe.svsPv).toBeGreaterThan(2000) // Sanity
    // Konsistenz: Raten stimmen auf BGL
    const impliedBgl = r.gewerbe.svsPv / 0.185
    expect(r.gewerbe.svsKv).toBeCloseTo(impliedBgl * 0.068, 0)
  })

  it('Gesamt steuerpflichtig = Anstellung + Gewerbe', () => {
    expect(round2(r.gesamtSteuerpflichtig)).toBe(
      round2(r.anstellung.steuerpflichtig + r.gewerbe.steuerpflichtig)
    )
  })

  it('Steuer mit Gewerbe > Steuer nur Gehalt (Progression)', () => {
    expect(r.steuerGesamt.steuerNetto).toBeGreaterThan(r.steuerNurGehalt.steuerNetto)
  })

  it('Netto mit Gewerbe > Netto nur Gehalt', () => {
    expect(r.nettoMitGewerbe).toBeGreaterThan(r.nettoNurGehalt)
  })

  it('Gewerbe-Nettocent realistisch (40-70 Cent pro Euro)', () => {
    expect(r.nebengewerbeNettoCent).toBeGreaterThan(0.3)
    expect(r.nebengewerbeNettoCent).toBeLessThan(0.7)
  })
})

// ── Szenario 7: Progressive Steuer Kontrollrechnung ──────────

describe('Cross-Check: EST Kontrollrechnung 2025', () => {
  it('€50.000 steuerpflichtig → exakte Handrechnung', () => {
    const handCalc = 8309 * 0.20 + 14219 * 0.30 + 14164 * 0.40
    expect(round2(calcProgressiveTax(50000, '2025'))).toBe(round2(handCalc))
  })

  it('€100.000 steuerpflichtig → exakte Handrechnung', () => {
    const handCalc =
      8309 * 0.20 +
      14219 * 0.30 +
      33330 * 0.40 +
      30834 * 0.48
    expect(round2(calcProgressiveTax(100000, '2025'))).toBe(round2(handCalc))
  })
})
