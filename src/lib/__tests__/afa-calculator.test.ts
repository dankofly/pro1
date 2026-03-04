// ============================================================
// Tests: afa-calculator.ts — AfA-Berechnung (Absetzung für Abnutzung)
// ============================================================

import { describe, it, expect } from 'vitest'
import {
  calcLinearAfA,
  calcDegressivAfA,
  calculateAfA,
  getTotalInvestments,
} from '../afa-calculator'

const round2 = (n: number) => Math.round(n * 100) / 100

// ── Lineare AfA ──────────────────────────────────────────────

describe('Lineare AfA', () => {
  it('€10.000 Einrichtung / 8 Jahre = €1.250/Jahr', () => {
    expect(calcLinearAfA(10000, 8)).toBe(1250)
  })

  it('€4.000 EDV / 4 Jahre = €1.000/Jahr', () => {
    expect(calcLinearAfA(4000, 4)).toBe(1000)
  })

  it('€0 → €0', () => {
    expect(calcLinearAfA(0, 8)).toBe(0)
  })

  it('Negativer Betrag → €0', () => {
    expect(calcLinearAfA(-1000, 8)).toBe(0)
  })
})

// ── Degressive AfA ────────────────────────────────────────────

describe('Degressive AfA (30%)', () => {
  it('€10.000 → 30% = €3.000 (höher als linear)', () => {
    // Linear: 10.000/8 = 1.250, Degressiv: 10.000 × 30% = 3.000
    expect(calcDegressivAfA(10000, 8)).toBe(3000)
  })

  it('€4.000 EDV → 30% = €1.200 (höher als linear €1.000)', () => {
    // Linear: 4.000/4 = 1.000, Degressiv: 4.000 × 30% = 1.200
    expect(calcDegressivAfA(4000, 4)).toBe(1200)
  })

  it('Nie weniger als linear (kurze Nutzungsdauer)', () => {
    // Bei 2 Jahren: linear = 5.000, degressiv = 3.000 → max(3.000, 5.000) = 5.000
    expect(calcDegressivAfA(10000, 2)).toBe(5000)
  })

  it('€0 → €0', () => {
    expect(calcDegressivAfA(0, 8)).toBe(0)
  })
})

// ── calculateAfA (Gesamtberechnung) ─────────────────────────

describe('calculateAfA — Gesamtberechnung', () => {
  it('Alles linear: korrekte Summe', () => {
    const result = calculateAfA({
      einrichtung: 8000, einrichtungMethode: 'linear',
      edv: 4000, edvMethode: 'linear',
      maschinen: 16000, maschinenMethode: 'linear',
    })

    expect(result.einrichtungJahr).toBe(8000 / 8)   // 1.000
    expect(result.edvJahr).toBe(4000 / 4)            // 1.000
    expect(result.maschinenJahr).toBe(16000 / 8)     // 2.000
    expect(result.gesamt).toBe(1000 + 1000 + 2000)   // 4.000
  })

  it('Alles degressiv: 30% im ersten Jahr', () => {
    const result = calculateAfA({
      einrichtung: 10000, einrichtungMethode: 'degressiv',
      edv: 4000, edvMethode: 'degressiv',
      maschinen: 10000, maschinenMethode: 'degressiv',
    })

    expect(result.einrichtungJahr).toBe(3000) // 30%
    expect(result.edvJahr).toBe(1200)          // 30%
    expect(result.maschinenJahr).toBe(3000)    // 30%
    expect(result.gesamt).toBe(3000 + 1200 + 3000)
  })

  it('Gemischt: linear + degressiv', () => {
    const result = calculateAfA({
      einrichtung: 8000, einrichtungMethode: 'linear',
      edv: 4000, edvMethode: 'degressiv',
      maschinen: 0, maschinenMethode: 'linear',
    })

    expect(result.einrichtungJahr).toBe(1000) // linear: 8.000/8
    expect(result.edvJahr).toBe(1200)          // degressiv: 4.000 × 30%
    expect(result.maschinenJahr).toBe(0)       // kein Investment
    expect(result.gesamt).toBe(1000 + 1200)
  })

  it('Keine Investitionen → alles 0', () => {
    const result = calculateAfA({
      einrichtung: 0, einrichtungMethode: 'linear',
      edv: 0, edvMethode: 'linear',
      maschinen: 0, maschinenMethode: 'linear',
    })

    expect(result.gesamt).toBe(0)
  })
})

// ── getTotalInvestments ─────────────────────────────────────

describe('getTotalInvestments', () => {
  it('Summe aller Investitionen', () => {
    expect(getTotalInvestments({
      einrichtung: 5000, einrichtungMethode: 'linear',
      edv: 3000, edvMethode: 'linear',
      maschinen: 7000, maschinenMethode: 'linear',
    })).toBe(15000)
  })

  it('Keine Investitionen → 0', () => {
    expect(getTotalInvestments({
      einrichtung: 0, einrichtungMethode: 'linear',
      edv: 0, edvMethode: 'linear',
      maschinen: 0, maschinenMethode: 'linear',
    })).toBe(0)
  })
})
