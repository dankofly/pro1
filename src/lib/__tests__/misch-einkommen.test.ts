// ============================================================
// Tests: misch-einkommen.ts — Anstellung + Nebengewerbe
// ============================================================

import { describe, it, expect } from 'vitest'
import {
  calcAnstellung,
  calcGewerbe,
  calcAbsetzbetraege,
  calculateMischEinkommen,
} from '../misch-einkommen'
import type { MischInput } from '../misch-einkommen'
import { YEAR_CONFIGS } from '../tax-constants'

const round2 = (n: number) => Math.round(n * 100) / 100

const DEFAULT_INPUT: MischInput = {
  bruttoGehalt: 42000,   // €3.000 × 14
  jahresgewinn: 15000,
  kinderUnter18: 0,
  kinderUeber18: 0,
  alleinverdiener: false,
  year: '2025',
}

function makeInput(overrides: Partial<MischInput> = {}): MischInput {
  return { ...DEFAULT_INPUT, ...overrides }
}

// ── calcAnstellung ──────────────────────────────────────────

describe('calcAnstellung', () => {
  const year = '2025' as const
  const cfg = YEAR_CONFIGS[year]

  it('€42.000 Brutto → SV + Werbungskosten abgezogen', () => {
    const r = calcAnstellung(42000, year)

    expect(r.brutto).toBe(42000)
    // SV: min(42.000, HBGL) × DN-Rate
    const expectedSv = Math.min(42000, cfg.svHoechstbeitragsgrundlageAngestellt) * cfg.employeeSvRate
    expect(round2(r.sv)).toBe(round2(expectedSv))
    expect(r.werbungskosten).toBe(cfg.werbungskostenpauschale)
    expect(r.steuerpflichtig).toBe(Math.max(0, 42000 - expectedSv - cfg.werbungskostenpauschale))
  })

  it('€0 Brutto → alles 0 (außer Werbungskosten)', () => {
    const r = calcAnstellung(0, year)

    expect(r.sv).toBe(0)
    expect(r.steuerpflichtig).toBe(0)
  })

  it('Über HBGL → SV gedeckelt', () => {
    const r = calcAnstellung(100000, year)

    const maxSv = cfg.svHoechstbeitragsgrundlageAngestellt * cfg.employeeSvRate
    expect(round2(r.sv)).toBe(round2(maxSv))
  })
})

// ── calcGewerbe ─────────────────────────────────────────────

describe('calcGewerbe', () => {
  const year = '2025' as const
  const cfg = YEAR_CONFIGS[year]

  it('€15.000 über Versicherungsgrenze → SVS-Beiträge', () => {
    const r = calcGewerbe(15000, year)

    // €15.000 > Versicherungsgrenze (€6.613,20 für 2025)
    expect(r.ueberVersicherungsgrenze).toBe(true)
    expect(r.svsGesamt).toBeGreaterThan(0)
    expect(r.svsPv).toBeGreaterThan(0)
    expect(r.svsKv).toBeGreaterThan(0)
  })

  it('€3.000 unter Versicherungsgrenze → nur UV', () => {
    const r = calcGewerbe(3000, year)

    expect(r.ueberVersicherungsgrenze).toBe(false)
    expect(r.svsPv).toBe(0)
    expect(r.svsKv).toBe(0)
    expect(r.svsMv).toBe(0)
    expect(r.svsUv).toBe(cfg.svs.uvMonthly * 12)
    expect(r.svsGesamt).toBe(r.svsUv)
  })

  it('Grundfreibetrag korrekt berechnet', () => {
    const r = calcGewerbe(20000, year)

    // Steuergewinn = 20.000 - SVS, GFB = min(steuerGewinn, 33.000) × 15%
    const steuerGewinn = Math.max(0, 20000 - r.svsGesamt)
    const expectedGfb = Math.min(steuerGewinn, cfg.gewinnfreibetrag.grundfreibetragMaxGewinn) *
      cfg.gewinnfreibetrag.grundfreibetragRate
    expect(round2(r.grundfreibetrag)).toBe(round2(expectedGfb))
  })

  it('€0 Gewinn → unter Versicherungsgrenze', () => {
    const r = calcGewerbe(0, year)

    expect(r.ueberVersicherungsgrenze).toBe(false)
    expect(r.svsPv).toBe(0)
  })
})

// ── calcAbsetzbetraege ──────────────────────────────────────

describe('calcAbsetzbetraege', () => {
  const year = '2025' as const
  const cfg = YEAR_CONFIGS[year].absetzbetraege

  it('Mit Gehalt → Verkehrsabsetzbetrag', () => {
    const r = calcAbsetzbetraege(makeInput())

    expect(r.verkehrsabsetzbetrag).toBe(cfg.verkehrsabsetzbetrag)
  })

  it('Ohne Gehalt → kein Verkehrsabsetzbetrag', () => {
    const r = calcAbsetzbetraege(makeInput({ bruttoGehalt: 0 }))

    expect(r.verkehrsabsetzbetrag).toBe(0)
  })

  it('2 Kinder unter 18 → Familienbonus', () => {
    const r = calcAbsetzbetraege(makeInput({ kinderUnter18: 2 }))

    expect(r.familienbonus).toBe(2 * cfg.familienbonusUnder18)
  })

  it('1 Kind über 18 → reduzierter Familienbonus', () => {
    const r = calcAbsetzbetraege(makeInput({ kinderUeber18: 1 }))

    expect(r.familienbonus).toBe(cfg.familienbonusOver18)
  })

  it('Alleinverdiener mit Kindern → AVAB', () => {
    const r = calcAbsetzbetraege(makeInput({
      alleinverdiener: true,
      kinderUnter18: 2,
    }))

    expect(r.alleinverdiener).toBeGreaterThan(0)
  })

  it('Alleinverdiener ohne Kinder → kein AVAB im Misch-Rechner', () => {
    // calcAvab(0, year) = 0
    const r = calcAbsetzbetraege(makeInput({
      alleinverdiener: true,
      kinderUnter18: 0,
      kinderUeber18: 0,
    }))

    expect(r.alleinverdiener).toBe(0)
  })
})

// ── calculateMischEinkommen (Hauptberechnung) ────────────────

describe('calculateMischEinkommen — Hauptberechnung', () => {
  it('€42.000 Gehalt + €15.000 Gewerbe → plausibles Netto', () => {
    const r = calculateMischEinkommen(makeInput())

    // Netto mit Gewerbe > Netto nur Gehalt
    expect(r.nettoMitGewerbe).toBeGreaterThan(r.nettoNurGehalt)
    // Aber nicht volle €15.000 mehr (wegen SVS + Steuerprogression)
    expect(r.nettoGewerbeAnteil).toBeLessThan(15000)
    expect(r.nettoGewerbeAnteil).toBeGreaterThan(0)
  })

  it('Nebengewerbe-Abgabenquote plausibel (30-60%)', () => {
    const r = calculateMischEinkommen(makeInput({
      bruttoGehalt: 42000,
      jahresgewinn: 15000,
    }))

    // Abgabenquote auf Nebengewerbe liegt typisch bei 30-60%
    expect(r.nebengewerbeAbgabenquote).toBeGreaterThan(0.2)
    expect(r.nebengewerbeAbgabenquote).toBeLessThan(0.7)
  })

  it('Steuerdifferenz: Steuer mit Gewerbe > Steuer nur Gehalt', () => {
    const r = calculateMischEinkommen(makeInput())

    expect(r.steuerDifferenz).toBeGreaterThan(0)
    expect(r.steuerGesamt.steuerNetto).toBeGreaterThan(r.steuerNurGehalt.steuerNetto)
  })

  it('€0 Gewinn → kein Gewerbe-Beitrag', () => {
    const r = calculateMischEinkommen(makeInput({ jahresgewinn: 0 }))

    expect(r.gewerbe.svsGesamt).toBe(YEAR_CONFIGS['2025'].svs.uvMonthly * 12)
    expect(r.nettoGewerbeAnteil).toBeLessThan(0) // UV + evtl. Steuerdifferenz
  })

  it('Hohes Gehalt + Gewerbe → hohe Grenzbelastung', () => {
    const r = calculateMischEinkommen(makeInput({
      bruttoGehalt: 84000,   // €6.000 × 14
      jahresgewinn: 30000,
    }))

    // Grenzsteuersatz sollte mindestens 40% sein bei hohem Gesamteinkommen
    expect(r.steuerGesamt.grenzsteuersatz).toBeGreaterThanOrEqual(0.40)
  })
})

// ── Wasserfall ──────────────────────────────────────────────

describe('Wasserfall-Darstellung', () => {
  it('Wasserfall enthält Start, Abzüge und Ergebnis', () => {
    const r = calculateMischEinkommen(makeInput())

    expect(r.wasserfall.length).toBeGreaterThanOrEqual(3)
    expect(r.wasserfall[0].typ).toBe('start')
    expect(r.wasserfall[r.wasserfall.length - 1].typ).toBe('ergebnis')
  })

  it('Wasserfall-Endwert = Netto mit Gewerbe', () => {
    const r = calculateMischEinkommen(makeInput())

    const endStep = r.wasserfall[r.wasserfall.length - 1]
    expect(round2(endStep.laufend)).toBeCloseTo(round2(r.nettoMitGewerbe), 0)
  })
})

// ── Vergleich ───────────────────────────────────────────────

describe('Vergleich-Tabelle', () => {
  it('4 Zeilen: Brutto, SV, EST, Netto', () => {
    const r = calculateMischEinkommen(makeInput())

    expect(r.vergleich.length).toBe(4)
    expect(r.vergleich[0].label).toBe('Brutto')
    expect(r.vergleich[3].label).toBe('Netto')
  })

  it('Differenz = mitGewerbe - nurGehalt', () => {
    const r = calculateMischEinkommen(makeInput())

    for (const row of r.vergleich) {
      expect(round2(row.differenz)).toBeCloseTo(
        round2(row.mitGewerbe - row.nurGehalt), 1
      )
    }
  })
})

// ── Edge Cases ──────────────────────────────────────────────

describe('Misch-Einkommen Edge Cases', () => {
  it('Nur Gehalt, kein Gewerbe → Gewerbe-Anteil nahe 0', () => {
    const r = calculateMischEinkommen(makeInput({ jahresgewinn: 0 }))

    // Gewerbe-Anteil ist negativ wegen UV-Beiträge
    expect(Math.abs(r.nettoGewerbeAnteil)).toBeLessThan(500)
  })

  it('Hohes Gewerbe, kein Gehalt', () => {
    const r = calculateMischEinkommen(makeInput({
      bruttoGehalt: 0,
      jahresgewinn: 80000,
    }))

    expect(r.anstellung.steuerpflichtig).toBe(0)
    expect(r.nettoMitGewerbe).toBeGreaterThan(0)
    expect(r.nettoNurGehalt).toBeCloseTo(0, 0)
  })

  it('Alle 3 Jahre berechenbar', () => {
    for (const year of ['2024', '2025', '2026'] as const) {
      const r = calculateMischEinkommen(makeInput({ year }))
      expect(r.year).toBe(year)
      expect(r.nettoMitGewerbe).toBeGreaterThan(0)
    }
  })

  it('Mit 2 Kindern → Familienbonus reduziert Steuer', () => {
    const ohne = calculateMischEinkommen(makeInput())
    const mit = calculateMischEinkommen(makeInput({ kinderUnter18: 2 }))

    expect(mit.steuerGesamt.steuerNetto).toBeLessThan(ohne.steuerGesamt.steuerNetto)
    expect(mit.nettoMitGewerbe).toBeGreaterThan(ohne.nettoMitGewerbe)
  })
})
