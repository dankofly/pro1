// ============================================================
// Tests: svs-calculator.ts — SVS-Beiträge + Einkommensteuer
// Manuelle Gegenrechnung gegen WKO SV-Rechner
// Nach Fix: Iterative Berechnung (SVS als Betriebsausgabe)
// ============================================================

import { describe, it, expect } from 'vitest'
import { calculateSvs, calculateEinkommensteuer } from '../svs-calculator'

const round2 = (n: number) => Math.round(n * 100) / 100

// ── SVS Beiträge — Gewerbetreibende ────────────────────────

describe('SVS Beiträge 2025 — Gewerbetreibende (GSVG)', () => {
  const stammdaten = {
    versicherungsart: 'gsvg_gewerbe' as const,
    jungunternehmer: false,
    gruendungsJahr: 2020,
  }

  it('€80.000 Gewinn → iterative SVS-Berechnung konvergiert', () => {
    const r = calculateSvs(80000, 0, '2025', undefined, stammdaten)

    // SVS ist Betriebsausgabe: Beitragsgrundlage = Gewinn - SVS (iteriert)
    // Daher: beitragsgrundlage < gewinn
    expect(r.beitragsgrundlage).toBeLessThan(80000)
    expect(r.beitragsgrundlage).toBeGreaterThan(50000) // Sanity check

    // Konsistenz: beitragsgrundlage ≈ gewinn - endgueltigeSVS
    expect(Math.abs(r.beitragsgrundlage - (80000 - r.endgueltigeSVS))).toBeLessThan(1)

    // Einzelbeiträge korrekte Prozentsätze auf die Beitragsgrundlage
    const bgl = r.beitragsgrundlage
    expect(r.pvBeitrag).toBeCloseTo(bgl * 0.185, 0)
    expect(r.kvBeitrag).toBeCloseTo(bgl * 0.068, 0)
    expect(r.mvBeitrag).toBeCloseTo(bgl * 0.0153, 0)
    expect(round2(r.uvBeitrag)).toBe(144.84) // 12,07 × 12

    // Gesamt-SVS = PV + KV + MV + UV
    expect(round2(r.endgueltigeSVS)).toBe(
      round2(r.pvBeitrag + r.kvBeitrag + r.mvBeitrag + r.uvBeitrag)
    )

    expect(r.belowMinimum).toBe(false)
    expect(r.cappedAtMax).toBe(false)
  })

  it('€3.000 Gewinn → Mindestbeitragsgrundlage greift', () => {
    const r = calculateSvs(3000, 0, '2025', undefined, stammdaten)

    // Gewerbetreibende: immer pflichtversichert, MinBGL = 6.613,20
    expect(r.beitragsgrundlage).toBe(6613.20)
    expect(r.usesMinBeitragsgrundlage).toBe(true)
    expect(r.belowMinimum).toBe(false)
  })

  it('€150.000 Gewinn → Höchstbeitragsgrundlage gedeckelt', () => {
    const r = calculateSvs(150000, 0, '2025', undefined, stammdaten)

    // BGL gedeckelt auf €90.300 (auch nach Iteration, weil 150k - SVS > 90.300)
    expect(r.beitragsgrundlage).toBe(90300)
    expect(r.cappedAtMax).toBe(true)
  })

  it('€0 Gewinn → Mindestbeitragsgrundlage', () => {
    const r = calculateSvs(0, 0, '2025', undefined, stammdaten)
    expect(r.beitragsgrundlage).toBe(6613.20)
    expect(r.usesMinBeitragsgrundlage).toBe(true)
  })

  it('Nachzahlung korrekt bei Vorschreibung', () => {
    const r = calculateSvs(80000, 500, '2025', undefined, stammdaten)

    // Vorläufig: 500 × 12 = 6.000
    expect(r.vorlaeufigeSVS).toBe(6000)

    // Nachzahlung: endgueltigeSVS - 6.000
    expect(round2(r.nachzahlung)).toBe(round2(r.endgueltigeSVS - 6000))

    // Sparempfehlung: Nachzahlung / 12
    expect(round2(r.sparEmpfehlung)).toBe(round2((r.endgueltigeSVS - 6000) / 12))
  })
})

// ── SVS — Neue Selbständige ────────────────────────────────

describe('SVS Beiträge 2025 — Neue Selbständige', () => {
  const stammdaten = {
    versicherungsart: 'gsvg_neu' as const,
    jungunternehmer: false,
    gruendungsJahr: 2020,
  }

  it('Unter Versicherungsgrenze → keine SVS (außer UV)', () => {
    // Versicherungsgrenze 2025: €6.613,20
    const r = calculateSvs(5000, 0, '2025', undefined, stammdaten)

    expect(r.belowMinimum).toBe(true)
    expect(r.beitragsgrundlage).toBe(0)
    expect(r.pvBeitrag).toBe(0)
    expect(r.kvBeitrag).toBe(0)
    expect(r.mvBeitrag).toBe(0)
    expect(r.uvBeitrag).toBe(0) // Auch UV entfällt unter Grenze
  })

  it('Über Versicherungsgrenze → iterative SVS', () => {
    const r = calculateSvs(40000, 0, '2025', undefined, stammdaten)

    expect(r.belowMinimum).toBe(false)
    // Nach Iteration: beitragsgrundlage = 40.000 - SVS < 40.000
    expect(r.beitragsgrundlage).toBeLessThan(40000)
    expect(r.beitragsgrundlage).toBeGreaterThan(25000)

    // Konsistenz: Raten stimmen auf Beitragsgrundlage
    expect(r.pvBeitrag).toBeCloseTo(r.beitragsgrundlage * 0.185, 0)
    expect(r.kvBeitrag).toBeCloseTo(r.beitragsgrundlage * 0.068, 0)
  })
})

// ── Jungunternehmer ────────────────────────────────────────

describe('Jungunternehmer KV-Ermäßigung', () => {
  it('Im Gründungsjahr → reduzierte KV (3,84%)', () => {
    const r = calculateSvs(50000, 0, '2025', undefined, {
      versicherungsart: 'gsvg_gewerbe',
      jungunternehmer: true,
      gruendungsJahr: 2025,
    })

    expect(r.isJungunternehmer).toBe(true)
    // KV: beitragsgrundlage × 3,84% (statt 6,80%)
    expect(r.kvBeitrag).toBeCloseTo(r.beitragsgrundlage * 0.0384, 0)
  })

  it('Gründungsjahr + 1 → noch Jungunternehmer', () => {
    const r = calculateSvs(50000, 0, '2025', undefined, {
      versicherungsart: 'gsvg_gewerbe',
      jungunternehmer: true,
      gruendungsJahr: 2024,
    })

    expect(r.isJungunternehmer).toBe(true)
    expect(r.kvBeitrag).toBeCloseTo(r.beitragsgrundlage * 0.0384, 0)
  })

  it('Gründungsjahr + 2 → kein Jungunternehmer mehr', () => {
    const r = calculateSvs(50000, 0, '2025', undefined, {
      versicherungsart: 'gsvg_gewerbe',
      jungunternehmer: true,
      gruendungsJahr: 2023,
    })

    expect(r.isJungunternehmer).toBe(false)
    expect(r.kvBeitrag).toBeCloseTo(r.beitragsgrundlage * 0.068, 0)
  })
})

// ── Einkommensteuer Integration ────────────────────────────

describe('Einkommensteuer im SVS-Kontext 2025', () => {
  const stammdaten = {
    versicherungsart: 'gsvg_gewerbe' as const,
    jungunternehmer: false,
    gruendungsJahr: 2020,
  }

  it('€80.000 Gewinn → korrektes Netto', () => {
    const r = calculateSvs(80000, 0, '2025', undefined, stammdaten)

    // Steuerlicher Gewinn = Gewinn - SVS
    const steuerGewinn = round2(80000 - r.endgueltigeSVS)
    expect(round2(r.grundfreibetrag)).toBe(4950)
    expect(round2(r.steuerpflichtig)).toBe(round2(steuerGewinn - 4950))

    // EST progressiv — should be reasonable range
    expect(r.steuerBrutto).toBeGreaterThan(10000)
    expect(r.steuerBrutto).toBeLessThan(15000)

    // Netto = Gewinn - SVS - EST
    expect(round2(r.echtesNetto)).toBe(round2(80000 - r.endgueltigeSVS - r.einkommensteuer))
  })

  it('€30.000 Gewinn → niedrige Steuerbelastung', () => {
    const r = calculateSvs(30000, 0, '2025', undefined, stammdaten)

    expect(r.echtesNetto).toBeGreaterThan(0)
    expect(r.endgueltigeSVS).toBeLessThan(30000)
    expect(r.einkommensteuer).toBeLessThan(30000)
    // Netto sollte >50% bei €30k sein
    expect(r.echtesNetto / 30000).toBeGreaterThan(0.5)
  })
})

// ── Einkommensteuer mit ProOptions ─────────────────────────

describe('Einkommensteuer mit Absetzbeträgen 2025', () => {
  it('Familienbonus: 2 Kinder unter 18 → €4.000 Abzug', () => {
    const r = calculateEinkommensteuer(60000, 15000, '2025', {
      kinderUnter18: 2,
      kinderUeber18: 0,
      alleinverdiener: false,
      pendlerKm: 0,
      pendlerOeffentlich: true,
      investitionen: 0,
    })

    expect(r.familienbonusAbzug).toBe(4000) // 2 × 2.000
    expect(r.steuerNetto).toBeLessThan(r.steuerBrutto)
  })

  it('AVAB: Alleinverdiener mit 2 Kindern → €813 Abzug', () => {
    const r = calculateEinkommensteuer(60000, 15000, '2025', {
      kinderUnter18: 2,
      kinderUeber18: 0,
      alleinverdiener: true,
      pendlerKm: 0,
      pendlerOeffentlich: true,
      investitionen: 0,
    })

    expect(r.avabAbzug).toBe(813)
  })

  it('Kindermehrbetrag: wenn FBP nicht voll genutzt', () => {
    // Sehr niedriges Einkommen → Steuer kleiner als FBP
    const r = calculateEinkommensteuer(20000, 5000, '2025', {
      kinderUnter18: 2,
      kinderUeber18: 0,
      alleinverdiener: false,
      pendlerKm: 0,
      pendlerOeffentlich: true,
      investitionen: 0,
    })

    // Steuer ist niedrig, FBP = 4.000 → KMB greift
    if (r.steuerBrutto < r.familienbonusAbzug) {
      expect(r.kindermehrbetrag).toBeGreaterThan(0)
      expect(r.kindermehrbetrag).toBeLessThanOrEqual(1400) // max 700 × 2
    }
  })

  it('Pendlerpauschale mindert Bemessungsgrundlage', () => {
    const without = calculateEinkommensteuer(60000, 15000, '2025')
    const withPendler = calculateEinkommensteuer(60000, 15000, '2025', {
      kinderUnter18: 0,
      kinderUeber18: 0,
      alleinverdiener: false,
      pendlerKm: 45,
      pendlerOeffentlich: true,
      investitionen: 0,
    })

    expect(withPendler.pendler).toBe(1356) // kleines PP 40-59 km
    expect(withPendler.steuerpflichtig).toBeLessThan(without.steuerpflichtig)
  })

  it('IFB reduziert steuerpflichtiges Einkommen', () => {
    const without = calculateEinkommensteuer(80000, 20000, '2025')
    const withIFB = calculateEinkommensteuer(80000, 20000, '2025', {
      kinderUnter18: 0,
      kinderUeber18: 0,
      alleinverdiener: false,
      pendlerKm: 0,
      pendlerOeffentlich: true,
      investitionen: 10000,
    })

    expect(withIFB.ifb).toBeGreaterThan(0)
    expect(withIFB.steuerNetto).toBeLessThan(without.steuerBrutto)
  })
})

// ── Weitere Einkünfte (Misch-Einkommen im SVS-Context) ────

describe('Weitere Einkünfte im SVS-Rechner', () => {
  const stammdaten = {
    versicherungsart: 'gsvg_gewerbe' as const,
    jungunternehmer: false,
    gruendungsJahr: 2020,
  }

  it('Anstellungs-Einkünfte erhöhen steuerpflichtiges Einkommen', () => {
    const ohne = calculateSvs(50000, 0, '2025', undefined, stammdaten, undefined)
    const mit = calculateSvs(50000, 0, '2025', undefined, stammdaten, {
      bruttoEntgeltMonatlich: 3000,
      vermietungsEinkuenfte: 0,
    })

    // Mehr steuerpflichtiges Einkommen → mehr EST
    expect(mit.steuerpflichtig).toBeGreaterThan(ohne.steuerpflichtig)
    expect(mit.einkommensteuer).toBeGreaterThan(ohne.einkommensteuer)

    // SVS bleibt gleich (nur auf Selbständigen-Gewinn)
    expect(mit.endgueltigeSVS).toBe(ohne.endgueltigeSVS)
  })
})

// ── Edge Cases ─────────────────────────────────────────────

describe('Edge Cases', () => {
  const stammdaten = {
    versicherungsart: 'gsvg_gewerbe' as const,
    jungunternehmer: false,
    gruendungsJahr: 2020,
  }

  it('Negativer Gewinn → 0 Steuer, MinBGL SVS', () => {
    const r = calculateSvs(-5000, 0, '2025', undefined, stammdaten)

    // Negative Gewinn → 0 für BGL → MinBGL greift
    expect(r.beitragsgrundlage).toBe(6613.20)
    expect(r.einkommensteuer).toBe(0)
  })

  it('Sehr hoher Gewinn → Höchstbeitragsgrundlage greift', () => {
    // 130.000 - SVS(~24k auf HBG) ≈ 106k > 90.300 → cap greift
    const r = calculateSvs(130000, 0, '2025', undefined, stammdaten)
    expect(r.beitragsgrundlage).toBe(90300)
    expect(r.cappedAtMax).toBe(true)
  })

  it('Iterative Konvergenz: BGL + SVS ≈ Gewinn', () => {
    // Kerntest: nach Iteration muss gelten: BGL ≈ Gewinn - SVS
    for (const gewinn of [30000, 50000, 80000, 120000]) {
      const r = calculateSvs(gewinn, 0, '2025', undefined, stammdaten)
      if (!r.usesMinBeitragsgrundlage && !r.cappedAtMax) {
        // Ohne Caps: BGL + SVS ≈ Gewinn
        expect(Math.abs(r.beitragsgrundlage + r.endgueltigeSVS - gewinn)).toBeLessThan(1)
      }
    }
  })

  it('Alle 3 Jahre (2024, 2025, 2026) berechenbar', () => {
    for (const year of ['2024', '2025', '2026'] as const) {
      const r = calculateSvs(50000, 0, year, undefined, stammdaten)
      expect(r.endgueltigeSVS).toBeGreaterThan(0)
      expect(r.einkommensteuer).toBeGreaterThan(0)
      expect(r.echtesNetto).toBeGreaterThan(0)
      expect(r.year).toBe(year)
    }
  })
})
