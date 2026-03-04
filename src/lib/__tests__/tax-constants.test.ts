// ============================================================
// Tests: tax-constants.ts — Verifizierung gegen WKO/SVS Quellen
// Quellen:
//   - wko.at/steuern/einkommen-koerperschaftsteuer-2026
//   - wko.at/steuern/werte-einkommen-koerperschaftsteuer-ab-2025
//   - svs.at (Beitragstabellen 2024-2026)
// ============================================================

import { describe, it, expect } from 'vitest'
import {
  YEAR_CONFIGS,
  calcProgressiveTax,
  getGrenzsteuersatz,
  calcGrundfreibetrag,
  calcMaxIFB,
  calcActualIFB,
  calcAvab,
  calcPendlerpauschale,
} from '../tax-constants'

// ── Helper ─────────────────────────────────────────────────
const round2 = (n: number) => Math.round(n * 100) / 100

// ── EST Brackets Verification ──────────────────────────────

describe('Einkommensteuer-Tarif 2026', () => {
  const year = '2026' as const

  it('0 Einkommen → 0 Steuer', () => {
    expect(calcProgressiveTax(0, year)).toBe(0)
  })

  it('Steuerfreibetrag €13.539 → 0 Steuer', () => {
    expect(calcProgressiveTax(13539, year)).toBe(0)
  })

  it('€20.000 → 20%-Stufe', () => {
    // (20.000 - 13.539) × 20% = 6.461 × 0.20 = 1.292,20
    expect(round2(calcProgressiveTax(20000, year))).toBe(1292.20)
  })

  it('€21.992 → Grenze 20%/30% = 1.690,60', () => {
    // WKO: (21.992 - 13.539) × 20% = 8.453 × 0.20 = 1.690,60
    expect(round2(calcProgressiveTax(21992, year))).toBe(1690.60)
  })

  it('€36.458 → Grenze 30%/40% = 6.030,40', () => {
    // WKO: 1.690,60 + (36.458 - 21.992) × 30% = 1.690,60 + 4.339,80 = 6.030,40
    expect(round2(calcProgressiveTax(36458, year))).toBe(6030.40)
  })

  it('€70.365 → Grenze 40%/48% = 19.593,20', () => {
    // WKO: 6.030,40 + (70.365 - 36.458) × 40% = 6.030,40 + 13.562,80 = 19.593,20
    expect(round2(calcProgressiveTax(70365, year))).toBe(19593.20)
  })

  it('€104.859 → Grenze 48%/50% = 36.150,32', () => {
    // WKO: 19.593,20 + (104.859 - 70.365) × 48% = 19.593,20 + 16.557,12 = 36.150,32
    expect(round2(calcProgressiveTax(104859, year))).toBe(36150.32)
  })

  it('€1.000.000 → Grenze 50%/55% = 483.720,82', () => {
    // WKO: 36.150,32 + (1.000.000 - 104.859) × 50% = 36.150,32 + 447.570,50 = 483.720,82
    expect(round2(calcProgressiveTax(1000000, year))).toBe(483720.82)
  })

  it('€50.000 → korrekte Mischberechnung', () => {
    // 0-13.539: 0
    // 13.539-21.992: 8.453 × 20% = 1.690,60
    // 21.992-36.458: 14.466 × 30% = 4.339,80
    // 36.458-50.000: 13.542 × 40% = 5.416,80
    // Gesamt: 11.447,20
    expect(round2(calcProgressiveTax(50000, year))).toBe(11447.20)
  })
})

describe('Einkommensteuer-Tarif 2025', () => {
  const year = '2025' as const

  it('Steuerfreibetrag €13.308 → 0 Steuer', () => {
    expect(calcProgressiveTax(13308, year)).toBe(0)
  })

  it('€21.617 → Grenze 20%/30% = 1.661,80', () => {
    // WKO: (21.617 - 13.308) × 20% = 8.309 × 0.20 = 1.661,80
    expect(round2(calcProgressiveTax(21617, year))).toBe(1661.80)
  })

  it('€35.836 → Grenze 30%/40% = 5.927,50', () => {
    // WKO: 1.661,80 + (35.836 - 21.617) × 30% = 1.661,80 + 4.265,70 = 5.927,50
    expect(round2(calcProgressiveTax(35836, year))).toBe(5927.50)
  })

  it('€69.166 → Grenze 40%/48% = 19.259,50', () => {
    // 5.927,50 + (69.166 - 35.836) × 40% = 5.927,50 + 13.332,00 = 19.259,50
    expect(round2(calcProgressiveTax(69166, year))).toBe(19259.50)
  })
})

// ── Grenzsteuersatz ────────────────────────────────────────

describe('Grenzsteuersatz 2026', () => {
  const year = '2026' as const

  it('€10.000 → 0%', () => {
    expect(getGrenzsteuersatz(10000, year)).toBe(0)
  })

  it('€15.000 → 20%', () => {
    expect(getGrenzsteuersatz(15000, year)).toBe(0.20)
  })

  it('€30.000 → 30%', () => {
    expect(getGrenzsteuersatz(30000, year)).toBe(0.30)
  })

  it('€50.000 → 40%', () => {
    expect(getGrenzsteuersatz(50000, year)).toBe(0.40)
  })

  it('€80.000 → 48%', () => {
    expect(getGrenzsteuersatz(80000, year)).toBe(0.48)
  })

  it('€200.000 → 50%', () => {
    expect(getGrenzsteuersatz(200000, year)).toBe(0.50)
  })

  it('€2.000.000 → 55%', () => {
    expect(getGrenzsteuersatz(2000000, year)).toBe(0.55)
  })
})

// ── Grundfreibetrag ────────────────────────────────────────

describe('Grundfreibetrag (15% bis €33.000)', () => {
  const year = '2025' as const

  it('€20.000 Gewinn → €3.000 GFB', () => {
    expect(calcGrundfreibetrag(20000, year)).toBe(3000)
  })

  it('€33.000 Gewinn → €4.950 GFB (Maximum)', () => {
    expect(calcGrundfreibetrag(33000, year)).toBe(4950)
  })

  it('€100.000 Gewinn → €4.950 GFB (gedeckelt)', () => {
    expect(calcGrundfreibetrag(100000, year)).toBe(4950)
  })

  it('€0 Gewinn → €0 GFB', () => {
    expect(calcGrundfreibetrag(0, year)).toBe(0)
  })
})

// ── Investitionsbedingter Gewinnfreibetrag ──────────────────

describe('Max IFB Berechnung', () => {
  const year = '2025' as const

  it('€20.000 → 0 (unter €33.000)', () => {
    expect(calcMaxIFB(20000, year)).toBe(0)
  })

  it('€33.000 → 0 (Grenze)', () => {
    expect(calcMaxIFB(33000, year)).toBe(0)
  })

  it('€50.000 → (50.000-33.000) × 13% = 2.210', () => {
    expect(calcMaxIFB(50000, year)).toBe(17000 * 0.13)
  })

  it('€175.000 → (175.000-33.000) × 13% = 18.460', () => {
    expect(calcMaxIFB(175000, year)).toBe(142000 * 0.13)
  })

  it('€200.000 → Tier1 + Tier2', () => {
    // Tier1: (175.000 - 33.000) × 13% = 18.460
    // Tier2: (200.000 - 175.000) × 7% = 1.750
    // Gesamt: 20.210
    expect(calcMaxIFB(200000, year)).toBe(18460 + 1750)
  })

  it('€400.000 → Tier1 + Tier2 + Tier3', () => {
    // Tier1: 142.000 × 13% = 18.460
    // Tier2: 175.000 × 7% = 12.250
    // Tier3: (400.000 - 350.000) × 4,5% = 2.250
    // Gesamt: 32.960
    expect(calcMaxIFB(400000, year)).toBe(18460 + 12250 + 2250)
  })

  it('Actual IFB begrenzt durch Investitionen', () => {
    // Max IFB bei €50.000 = 2.210
    // Investition nur 1.000 → IFB = 1.000
    expect(calcActualIFB(50000, 1000, year)).toBe(1000)
  })

  it('Actual IFB begrenzt durch Max', () => {
    // Max IFB bei €50.000 = 2.210
    // Investition 10.000 → IFB = 2.210 (gedeckelt)
    expect(calcActualIFB(50000, 10000, year)).toBe(2210)
  })
})

// ── AVAB ────────────────────────────────────────────────────

describe('AVAB/AEAB 2026', () => {
  const year = '2026' as const

  it('0 Kinder → €0', () => {
    expect(calcAvab(0, year)).toBe(0)
  })

  it('1 Kind → €612', () => {
    expect(calcAvab(1, year)).toBe(612)
  })

  it('2 Kinder → €828', () => {
    expect(calcAvab(2, year)).toBe(828)
  })

  it('3 Kinder → €828 + €273 = €1.101', () => {
    expect(calcAvab(3, year)).toBe(828 + 273)
  })

  it('5 Kinder → €828 + 3 × €273 = €1.647', () => {
    expect(calcAvab(5, year)).toBe(828 + 3 * 273)
  })
})

// ── Pendlerpauschale ────────────────────────────────────────

describe('Pendlerpauschale 2026', () => {
  const year = '2026' as const

  it('0 km → €0', () => {
    expect(calcPendlerpauschale(0, true, year)).toBe(0)
  })

  it('10 km mit Öffi → €0 (unter 20km)', () => {
    expect(calcPendlerpauschale(10, true, year)).toBe(0)
  })

  it('25 km mit Öffi → kleines PP €696', () => {
    expect(calcPendlerpauschale(25, true, year)).toBe(696)
  })

  it('45 km mit Öffi → kleines PP €1.356', () => {
    expect(calcPendlerpauschale(45, true, year)).toBe(1356)
  })

  it('65 km mit Öffi → kleines PP €2.016', () => {
    expect(calcPendlerpauschale(65, true, year)).toBe(2016)
  })

  it('5 km ohne Öffi → großes PP €372', () => {
    expect(calcPendlerpauschale(5, false, year)).toBe(372)
  })

  it('25 km ohne Öffi → großes PP €1.476', () => {
    expect(calcPendlerpauschale(25, false, year)).toBe(1476)
  })

  it('65 km ohne Öffi → großes PP €3.672', () => {
    expect(calcPendlerpauschale(65, false, year)).toBe(3672)
  })
})

// ── SVS Konfiguration ──────────────────────────────────────

describe('SVS Konfiguration 2026', () => {
  const cfg = YEAR_CONFIGS['2026'].svs

  it('PV Rate = 18,5%', () => {
    expect(cfg.pvRate).toBe(0.185)
  })

  it('KV Rate = 6,80%', () => {
    expect(cfg.kvRate).toBe(0.068)
  })

  it('MV Rate = 1,53%', () => {
    expect(cfg.mvRate).toBe(0.0153)
  })

  it('UV = €12,95/Monat', () => {
    expect(cfg.uvMonthly).toBe(12.95)
  })

  it('Höchstbeitragsgrundlage = €97.020/Jahr (€8.085/Monat)', () => {
    expect(cfg.hoechstbeitrag).toBe(97020)
    expect(cfg.hoechstbeitrag / 12).toBe(8085)
  })

  it('Mindestbeitragsgrundlage = €6.613,20/Jahr (€551,10/Monat)', () => {
    expect(cfg.minBeitragsgrundlage).toBe(6613.20)
    expect(round2(cfg.minBeitragsgrundlage / 12)).toBe(551.10)
  })

  it('Gesamtrate = PV + KV + MV = 26,83%', () => {
    expect(round2(cfg.gesamtRate)).toBe(round2(0.185 + 0.068 + 0.0153))
  })

  it('KV Jungunternehmer = 3,84%', () => {
    expect(cfg.kvRateJungunternehmer).toBe(0.0384)
  })
})
