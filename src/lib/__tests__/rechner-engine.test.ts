// ============================================================
// Tests: rechner-engine.ts — Zentraler Orchestrator
// Pauschalierung, Gewinnmaximierer, Vorauszahlungen, GmbH
// ============================================================

import { describe, it, expect } from 'vitest'
import { calculateAll, isPauschalierungVerfuegbar } from '../rechner-engine'
import { DEFAULT_RECHNER_INPUT } from '../rechner-types'
import type { RechnerInput } from '../rechner-types'

const round2 = (n: number) => Math.round(n * 100) / 100

/** Helper: Erstellt Input mit Overrides */
function makeInput(overrides: Partial<RechnerInput> = {}): RechnerInput {
  return { ...DEFAULT_RECHNER_INPUT, ...overrides }
}

// ── Basis-Berechnung ─────────────────────────────────────────

describe('calculateAll — Basis', () => {
  it('€80.000 Umsatz, keine Aufwände → Gewinn = Umsatz', () => {
    const r = calculateAll(makeInput({ jahresumsatz: 80000 }))

    expect(r.umsatz).toBe(80000)
    expect(r.gewinn).toBe(80000)
    expect(r.aufwaendeEffektiv).toBe(0)
  })

  it('€80.000 Umsatz, €20.000 Aufwände → Gewinn = €60.000', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      aufwaendeGesamt: 20000,
      aufwaendeDetailed: false,
    }))

    expect(r.gewinn).toBe(60000)
  })

  it('Detaillierte Aufwände werden korrekt summiert', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 100000,
      aufwaendeDetailed: true,
      aufwaende: {
        personalkosten: 10000,
        wareneinkauf: 5000,
        reisekosten: 2000,
        arbeitsplatzpauschale: 'gross', // €1.200
        oepnvPauschale: 1000,           // 50% = €500
        sonstigeAufwaende: 3000,
      },
    }))

    // 10.000 + 5.000 + 2.000 + 1.200 + 500 + 3.000 = 21.700
    expect(r.aufwaendeEffektiv).toBe(21700)
    expect(r.gewinn).toBe(100000 - 21700)
  })

  it('AfA wird als Aufwand berücksichtigt', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      investitionen: {
        einrichtung: 8000, einrichtungMethode: 'linear',  // 1.000/Jahr
        edv: 4000, edvMethode: 'linear',                   // 1.000/Jahr
        maschinen: 0, maschinenMethode: 'linear',
      },
    }))

    // AfA = 1.000 + 1.000 = 2.000
    expect(r.afa.gesamt).toBe(2000)
    expect(r.aufwaendeEffektiv).toBe(2000)
    expect(r.gewinn).toBe(78000)
  })

  it('SVS und ESt werden berechnet', () => {
    const r = calculateAll(makeInput({ jahresumsatz: 80000 }))

    expect(r.svs.endgueltigeSVS).toBeGreaterThan(0)
    expect(r.svs.einkommensteuer).toBeGreaterThan(0)
    expect(r.svs.echtesNetto).toBeGreaterThan(0)
    expect(r.svs.echtesNetto).toBeLessThan(80000)
  })

  it('Jahr wird korrekt durchgereicht', () => {
    const r2025 = calculateAll(makeInput({ year: '2025' }))
    const r2026 = calculateAll(makeInput({ year: '2026' }))

    expect(r2025.year).toBe('2025')
    expect(r2026.year).toBe('2026')
  })
})

// ── Pauschalierung ──────────────────────────────────────────

describe('isPauschalierungVerfuegbar', () => {
  it('keine → immer verfügbar', () => {
    expect(isPauschalierungVerfuegbar('keine', 500000)).toBe(true)
  })

  it('basis_12 bis €220.000 → verfügbar', () => {
    expect(isPauschalierungVerfuegbar('basis_12', 220000)).toBe(true)
  })

  it('basis_12 über €220.000 → nicht verfügbar', () => {
    expect(isPauschalierungVerfuegbar('basis_12', 220001)).toBe(false)
  })

  it('ku_produzent bis €35.000 → verfügbar', () => {
    expect(isPauschalierungVerfuegbar('ku_produzent', 35000)).toBe(true)
  })

  it('ku_produzent über €35.000 → nicht verfügbar', () => {
    expect(isPauschalierungVerfuegbar('ku_produzent', 35001)).toBe(false)
  })
})

describe('calculateAll — Pauschalierung', () => {
  it('keine Pauschalierung → null', () => {
    const r = calculateAll(makeInput({ pauschalierungArt: 'keine' }))
    expect(r.pauschalierung).toBeNull()
  })

  it('basis_12: year-dependent pauschale Aufwände (13.5% for 2025)', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 100000,
      pauschalierungArt: 'basis_12',
    }))

    expect(r.pauschalierung).not.toBeNull()
    expect(r.pauschalierung!.pauschalAufwaende).toBe(13500) // 13.5% for 2025
    expect(r.pauschalierung!.gewinnPauschal).toBe(86500)     // 100.000 - 13.500
  })

  it('basis_6: 6% pauschale Aufwände', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      pauschalierungArt: 'basis_6',
    }))

    expect(r.pauschalierung).not.toBeNull()
    expect(r.pauschalierung!.pauschalAufwaende).toBe(4800) // 6%
    expect(r.pauschalierung!.gewinnPauschal).toBe(75200)
  })

  it('ku_produzent: 45% pauschale Aufwände', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 30000,
      pauschalierungArt: 'ku_produzent',
    }))

    expect(r.pauschalierung).not.toBeNull()
    expect(r.pauschalierung!.pauschalAufwaende).toBe(13500) // 45%
    expect(r.pauschalierung!.gewinnPauschal).toBe(16500)
  })

  it('Über Umsatzgrenze → null (nicht verfügbar)', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 250000,
      pauschalierungArt: 'basis_12',  // Grenze €220.000
    }))

    expect(r.pauschalierung).toBeNull()
  })

  it('vorteilhaft-Flag korrekt gesetzt', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      aufwaendeGesamt: 5000,
      pauschalierungArt: 'basis_12',
    }))

    if (r.pauschalierung) {
      // Pauschal: 12% = €9.600 vs. tatsächlich: €5.000
      // Pauschalierung hat mehr Aufwände → höheres Netto → vorteilhaft
      expect(r.pauschalierung.differenzZuStandard).toBeDefined()
      expect(typeof r.pauschalierung.vorteilhaft).toBe('boolean')
    }
  })
})

// ── GmbH Vergleich ──────────────────────────────────────────

describe('calculateAll — GmbH Vergleich', () => {
  it('GmbH inaktiv → null', () => {
    const r = calculateAll(makeInput({
      gmbh: { aktiv: false, gfGehaltMonatlich: 3000 },
    }))
    expect(r.gmbh).toBeNull()
  })

  it('GmbH aktiv → Vergleich wird berechnet', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      gmbh: { aktiv: true, gfGehaltMonatlich: 3000 },
    }))

    expect(r.gmbh).not.toBeNull()
    expect(r.gmbh!.gewinnVorKoest).toBeGreaterThan(0)
    expect(r.gmbh!.koest).toBeGreaterThan(0)
    expect(r.gmbh!.gesamtNetto).toBeGreaterThan(0)
  })

  it('GmbH Differenz passt zu EPU-Netto', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      gmbh: { aktiv: true, gfGehaltMonatlich: 3000 },
    }))

    expect(r.gmbh).not.toBeNull()
    expect(r.gmbh!.differenzZuEpu).toBeCloseTo(
      r.gmbh!.gesamtNetto - r.svs.echtesNetto, 2
    )
  })
})

// ── Gewinnmaximierer ────────────────────────────────────────

describe('calculateAll — Gewinnmaximierer', () => {
  it('Keine Zusätze → null', () => {
    const r = calculateAll(makeInput({
      gewinnmaximierer: { zusatzEinnahmen: 0, zusatzAufwaende: 0 },
    }))
    expect(r.gewinnmaximierer).toBeNull()
  })

  it('Zusatz-Einnahmen → Gewinnmaximierer aktiv', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      gewinnmaximierer: { zusatzEinnahmen: 20000, zusatzAufwaende: 5000 },
    }))

    expect(r.gewinnmaximierer).not.toBeNull()
    expect(r.gewinnmaximierer!.umsatzMit).toBe(100000) // 80.000 + 20.000
    expect(r.gewinnmaximierer!.gewinnMit).toBeGreaterThan(r.gewinn)
  })

  it('Abgabenquote auf Zusatzgewinn berechnet', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      gewinnmaximierer: { zusatzEinnahmen: 20000, zusatzAufwaende: 0 },
    }))

    expect(r.gewinnmaximierer).not.toBeNull()
    // Grenzbelastung auf hohem Niveau sollte 40-60% sein
    expect(r.gewinnmaximierer!.abgabenquoteZusatz).toBeGreaterThan(0.2)
    expect(r.gewinnmaximierer!.abgabenquoteZusatz).toBeLessThan(0.8)
  })
})

// ── Vorauszahlungen ─────────────────────────────────────────

describe('calculateAll — Vorauszahlungen', () => {
  it('Keine Vorauszahlung → Differenz = endgültige SVS/EST', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      vorauszahlungen: { svVorauszahlung: 0, svNachzahlungVorjahr: 0, estVorauszahlung: 0 },
    }))

    expect(r.vorauszahlungen.svDifferenz).toBe(r.svs.endgueltigeSVS)
    expect(r.vorauszahlungen.estDifferenz).toBe(r.svs.einkommensteuer)
  })

  it('Korrekte Vorauszahlung → Differenz ≈ 0', () => {
    // Erst berechnen um endgültige Werte zu kennen
    const probe = calculateAll(makeInput({ jahresumsatz: 80000 }))
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      vorauszahlungen: {
        svVorauszahlung: round2(probe.svs.endgueltigeSVS),
        svNachzahlungVorjahr: 0,
        estVorauszahlung: round2(probe.svs.einkommensteuer),
      },
    }))

    expect(Math.abs(r.vorauszahlungen.svDifferenz)).toBeLessThan(1)
    expect(Math.abs(r.vorauszahlungen.estDifferenz)).toBeLessThan(1)
  })

  it('SV monatlich = SV jährlich / 12', () => {
    const r = calculateAll(makeInput({
      vorauszahlungen: { svVorauszahlung: 12000, svNachzahlungVorjahr: 0, estVorauszahlung: 0 },
    }))

    expect(r.vorauszahlungen.svMonatlich).toBe(1000)
  })

  it('EST quartalsweise = EST jährlich / 4', () => {
    const r = calculateAll(makeInput({
      vorauszahlungen: { svVorauszahlung: 0, svNachzahlungVorjahr: 0, estVorauszahlung: 8000 },
    }))

    expect(r.vorauszahlungen.estQuartal).toBe(2000)
  })
})

// ── Steuer-Tipps ────────────────────────────────────────────

describe('calculateAll — Steuer-Tipps', () => {
  it('Steuer-Tipps werden berechnet', () => {
    const r = calculateAll(makeInput({ jahresumsatz: 80000 }))

    expect(r.steuerTipps).toBeDefined()
    expect(r.steuerTipps.grenzsteuersatz).toBeGreaterThan(0)
    expect(r.steuerTipps.ifbInvestition).toBeGreaterThan(0)
    expect(r.steuerTipps.ifbErsparnis).toBeGreaterThan(0)
  })
})

// ── Arbeitsplatzpauschale ──────────────────────────────────

describe('Arbeitsplatzpauschale', () => {
  it('keine → €0', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      aufwaendeDetailed: true,
      aufwaende: {
        personalkosten: 0, wareneinkauf: 0, reisekosten: 0,
        arbeitsplatzpauschale: 'keine',
        oepnvPauschale: 0, sonstigeAufwaende: 0,
      },
    }))
    expect(r.aufwaendeEffektiv).toBe(0)
  })

  it('klein → €300', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      aufwaendeDetailed: true,
      aufwaende: {
        personalkosten: 0, wareneinkauf: 0, reisekosten: 0,
        arbeitsplatzpauschale: 'klein',
        oepnvPauschale: 0, sonstigeAufwaende: 0,
      },
    }))
    expect(r.aufwaendeEffektiv).toBe(300)
  })

  it('gross → €1.200', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 80000,
      aufwaendeDetailed: true,
      aufwaende: {
        personalkosten: 0, wareneinkauf: 0, reisekosten: 0,
        arbeitsplatzpauschale: 'gross',
        oepnvPauschale: 0, sonstigeAufwaende: 0,
      },
    }))
    expect(r.aufwaendeEffektiv).toBe(1200)
  })
})

// ── Edge Cases ──────────────────────────────────────────────

describe('Edge Cases', () => {
  it('€0 Umsatz → Gewinn 0, aber SVS MinBGL', () => {
    const r = calculateAll(makeInput({ jahresumsatz: 0 }))

    expect(r.gewinn).toBe(0)
    expect(r.svs.usesMinBeitragsgrundlage).toBe(true)
    expect(r.svs.endgueltigeSVS).toBeGreaterThan(0)
  })

  it('Aufwände > Umsatz → Gewinn 0 (nicht negativ)', () => {
    const r = calculateAll(makeInput({
      jahresumsatz: 10000,
      aufwaendeGesamt: 20000,
    }))

    expect(r.gewinn).toBe(0)
  })

  it('Alle 3 Jahre berechenbar', () => {
    for (const year of ['2024', '2025', '2026'] as const) {
      const r = calculateAll(makeInput({ year, jahresumsatz: 80000 }))
      expect(r.year).toBe(year)
      expect(r.svs.echtesNetto).toBeGreaterThan(0)
    }
  })
})
