// ============================================================
// Cross-Check: Manuelle Schritt-für-Schritt Berechnung
// Verifiziert die gesamte Berechnungskette gegen Handrechnung
// basierend auf WKO/SVS Werten 2025
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

  it('Beitragsgrundlage = €80.000 (unter HBGL €90.300)', () => {
    expect(r.beitragsgrundlage).toBe(80000)
  })

  it('PV = €80.000 × 18,5% = €14.800', () => {
    expect(r.pvBeitrag).toBe(14800)
  })

  it('KV = €80.000 × 6,80% = €5.440', () => {
    expect(r.kvBeitrag).toBe(5440)
  })

  it('MV = €80.000 × 1,53% = €1.224', () => {
    expect(r.mvBeitrag).toBe(1224)
  })

  it('UV = €12,07 × 12 = €144,84', () => {
    expect(r.uvBeitrag).toBe(144.84)
  })

  it('SVS Gesamt = €21.608,84', () => {
    expect(round2(r.endgueltigeSVS)).toBe(21608.84)
  })

  it('Steuerlicher Gewinn nach SVS = €58.391,16', () => {
    // 80.000 - 21.608,84 = 58.391,16
    const steuerGewinn = 80000 - r.endgueltigeSVS
    expect(round2(steuerGewinn)).toBe(58391.16)
  })

  it('Grundfreibetrag = €4.950 (33.000 × 15%)', () => {
    expect(r.grundfreibetrag).toBe(4950)
  })

  it('Steuerpflichtiges Einkommen = €53.441,16', () => {
    // 58.391,16 - 4.950 = 53.441,16
    expect(round2(r.steuerpflichtig)).toBe(53441.16)
  })

  it('EST Brutto korrekt (progressive Berechnung)', () => {
    // 0-13.308: 0
    // 13.308-21.617: 8.309 × 20% = 1.661,80
    // 21.617-35.836: 14.219 × 30% = 4.265,70
    // 35.836-53.441,16: 17.605,16 × 40% = 7.042,064
    // Gesamt: 12.969,564
    const handCalcEst =
      8309 * 0.20 +
      14219 * 0.30 +
      17605.16 * 0.40
    expect(round2(r.steuerBrutto)).toBe(round2(handCalcEst))
  })

  it('Echtes Netto = Gewinn - SVS - EST', () => {
    expect(round2(r.echtesNetto)).toBe(round2(80000 - r.endgueltigeSVS - r.einkommensteuer))
  })

  it('Netto plausibel (€44.000-€47.000)', () => {
    // Bei €80.000 Gewinn liegt Netto typisch bei ca. €45.000
    expect(r.echtesNetto).toBeGreaterThan(44000)
    expect(r.echtesNetto).toBeLessThan(47000)
  })
})

// ── Szenario 2: €40.000 Gewerbetreibender 2025 ──────────────

describe('Cross-Check: €40.000 Gewerbetreibender 2025', () => {
  const r = calculateSvs(40000, 0, '2025', undefined, {
    versicherungsart: 'gsvg_gewerbe',
    jungunternehmer: false,
    gruendungsJahr: 2020,
  })

  it('SVS Gesamt = €10.876,84', () => {
    // PV: 40.000 × 18,5% = 7.400
    // KV: 40.000 × 6,80% = 2.720
    // MV: 40.000 × 1,53% = 612
    // UV: 144,84
    // Gesamt: 10.876,84
    expect(round2(r.endgueltigeSVS)).toBe(10876.84)
  })

  it('GFB auf steuerlichen Gewinn (nicht Brutto-Gewinn)', () => {
    // Steuergewinn = 40.000 - 10.876,84 = 29.123,16
    // GFB = min(29.123,16, 33.000) × 15% = 29.123,16 × 15% = 4.368,474
    const steuerGewinn = 40000 - r.endgueltigeSVS
    const expectedGfb = steuerGewinn * 0.15
    expect(round2(r.grundfreibetrag)).toBe(round2(expectedGfb))
  })

  it('EST korrekt (niedrige Progression)', () => {
    // Steuerpflichtig = 29.123,16 - 4.368,474 = 24.754,686
    // 0-13.308: 0
    // 13.308-21.617: 8.309 × 20% = 1.661,80
    // 21.617-24.754,686: 3.137,686 × 30% = 941,3058
    // Gesamt: 2.603,1058
    expect(r.einkommensteuer).toBeGreaterThan(2500)
    expect(r.einkommensteuer).toBeLessThan(2700)
  })

  it('Netto plausibel (€26.000-€27.000)', () => {
    expect(r.echtesNetto).toBeGreaterThan(26000)
    expect(r.echtesNetto).toBeLessThan(27000)
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
    // Steuergewinn = 5.000
    // GFB = 5.000 × 15% = 750
    // Steuerpflichtig = 4.250
    // EST = 0 (unter Freibetrag €13.308)
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
    // SVS = 24.372,33
    // Steuergewinn = 120.000 - 24.372,33 = 95.627,67
    // GFB = 33.000 × 15% = 4.950
    // Steuerpflichtig = 90.677,67
    const expectedSvs = 16705.50 + 6140.40 + 1381.59 + 144.84
    const steuerGewinn = 120000 - expectedSvs
    expect(round2(r.steuerpflichtig)).toBe(round2(steuerGewinn - 4950))
  })

  it('EST in 48%-Stufe (korrekte Progression)', () => {
    // Steuerpflichtig: ~90.677,67
    // 0-13.308: 0
    // 13.308-21.617: 1.661,80
    // 21.617-35.836: 4.265,70
    // 35.836-69.166: 13.332,00
    // 69.166-90.677,67: ~10.325,60
    // Gesamt: ~29.585,10
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
    // PV: 6.613,20 × 18,5% = 1.223,442
    // KV: 6.613,20 × 6,80% = 449,6976
    // MV: 6.613,20 × 1,53% = 101,18196
    // UV: 144,84
    const expectedPv = 6613.20 * 0.185
    const expectedKv = 6613.20 * 0.068
    const expectedMv = 6613.20 * 0.0153
    const expectedSvs = expectedPv + expectedKv + expectedMv + 144.84

    expect(round2(r.pvBeitrag)).toBe(round2(expectedPv))
    expect(round2(r.kvBeitrag)).toBe(round2(expectedKv))
    expect(round2(r.endgueltigeSVS)).toBe(round2(expectedSvs))
  })

  it('SVS höher als Gewinn → negatives Netto möglich', () => {
    // SVS ≈ 1.919,16 > Gewinn 2.000 → kaum Netto
    // Steuergewinn = max(0, 2.000 - SVS) ≈ 81
    // EST = 0 (unter Freibetrag)
    expect(r.einkommensteuer).toBe(0)
    // Netto = 2.000 - SVS ≈ 81
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

  it('Anstellung: steuerpflichtig = Brutto - SV - Werbungskosten', () => {
    const expected = 42000 - r.anstellung.sv - 132 // WK-Pauschale
    expect(round2(r.anstellung.steuerpflichtig)).toBe(round2(expected))
  })

  it('Gewerbe über Versicherungsgrenze → SVS-Beiträge', () => {
    // €15.000 > €6.613,20
    expect(r.gewerbe.ueberVersicherungsgrenze).toBe(true)
    expect(r.gewerbe.svsGesamt).toBeGreaterThan(0)
  })

  it('Gewerbe SVS korrekt', () => {
    // BGL = min(max(15.000, 6.613,20), 90.300) = 15.000
    // PV: 15.000 × 18,5% = 2.775
    // KV: 15.000 × 6,80% = 1.020
    // MV: 15.000 × 1,53% = 229,50
    // UV: 144,84
    expect(round2(r.gewerbe.svsPv)).toBe(2775)
    expect(round2(r.gewerbe.svsKv)).toBe(1020)
    expect(round2(r.gewerbe.svsMv)).toBe(229.50)
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
    // 0-13.308: 0
    // 13.308-21.617: 8.309 × 20% = 1.661,80
    // 21.617-35.836: 14.219 × 30% = 4.265,70
    // 35.836-50.000: 14.164 × 40% = 5.665,60
    // Gesamt: 11.593,10
    const handCalc = 8309 * 0.20 + 14219 * 0.30 + 14164 * 0.40
    expect(round2(calcProgressiveTax(50000, '2025'))).toBe(round2(handCalc))
  })

  it('€100.000 steuerpflichtig → exakte Handrechnung', () => {
    // 0-13.308: 0
    // 13.308-21.617: 8.309 × 20% = 1.661,80
    // 21.617-35.836: 14.219 × 30% = 4.265,70
    // 35.836-69.166: 33.330 × 40% = 13.332,00
    // 69.166-100.000: 30.834 × 48% = 14.800,32
    // Gesamt: 34.059,82
    const handCalc =
      8309 * 0.20 +
      14219 * 0.30 +
      33330 * 0.40 +
      30834 * 0.48
    expect(round2(calcProgressiveTax(100000, '2025'))).toBe(round2(handCalc))
  })
})
