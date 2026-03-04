// ============================================================
// Tests: svs-calculator.ts — SVS-Beiträge + Einkommensteuer
// Manuelle Gegenrechnung gegen WKO SV-Rechner
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

  it('€80.000 Gewinn → korrekte SVS-Einzelbeiträge', () => {
    const r = calculateSvs(80000, 0, '2025', undefined, stammdaten)

    // BGL = €80.000 (innerhalb Min/Max)
    expect(r.beitragsgrundlage).toBe(80000)
    expect(r.belowMinimum).toBe(false)
    expect(r.cappedAtMax).toBe(false)

    // PV: 80.000 × 18,5% = 14.800
    expect(r.pvBeitrag).toBe(14800)

    // KV: 80.000 × 6,80% = 5.440
    expect(r.kvBeitrag).toBe(5440)

    // MV: 80.000 × 1,53% = 1.224
    expect(r.mvBeitrag).toBe(1224)

    // UV: 12,07 × 12 = 144,84
    expect(round2(r.uvBeitrag)).toBe(144.84)

    // Gesamt SVS: 14.800 + 5.440 + 1.224 + 144,84 = 21.608,84
    expect(round2(r.endgueltigeSVS)).toBe(21608.84)
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

    // BGL gedeckelt auf €90.300
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

    // Nachzahlung: 21.608,84 - 6.000 = 15.608,84
    expect(round2(r.nachzahlung)).toBe(round2(21608.84 - 6000))

    // Sparempfehlung: Nachzahlung / 12
    expect(round2(r.sparEmpfehlung)).toBe(round2((21608.84 - 6000) / 12))
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

  it('Über Versicherungsgrenze → normale SVS', () => {
    const r = calculateSvs(40000, 0, '2025', undefined, stammdaten)

    expect(r.belowMinimum).toBe(false)
    expect(r.beitragsgrundlage).toBe(40000)
    expect(r.pvBeitrag).toBe(40000 * 0.185)
    expect(r.kvBeitrag).toBe(40000 * 0.068)
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
    // KV: 50.000 × 3,84% = 1.920 (statt 3.400 mit 6,80%)
    expect(r.kvBeitrag).toBe(50000 * 0.0384)
  })

  it('Gründungsjahr + 1 → noch Jungunternehmer', () => {
    const r = calculateSvs(50000, 0, '2025', undefined, {
      versicherungsart: 'gsvg_gewerbe',
      jungunternehmer: true,
      gruendungsJahr: 2024,
    })

    expect(r.isJungunternehmer).toBe(true)
    expect(r.kvBeitrag).toBe(50000 * 0.0384)
  })

  it('Gründungsjahr + 2 → kein Jungunternehmer mehr', () => {
    const r = calculateSvs(50000, 0, '2025', undefined, {
      versicherungsart: 'gsvg_gewerbe',
      jungunternehmer: true,
      gruendungsJahr: 2023,
    })

    expect(r.isJungunternehmer).toBe(false)
    expect(r.kvBeitrag).toBe(50000 * 0.068)
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

    // SVS = 21.608,84
    // Steuerlicher Gewinn = 80.000 - 21.608,84 = 58.391,16
    // Grundfreibetrag = 33.000 × 15% = 4.950
    // Steuerpflichtig = 58.391,16 - 4.950 = 53.441,16
    const svs = round2(r.endgueltigeSVS)
    const steuerGewinn = round2(80000 - svs)
    expect(round2(r.grundfreibetrag)).toBe(4950)
    expect(round2(r.steuerpflichtig)).toBe(round2(steuerGewinn - 4950))

    // EST progressiv auf 53.441,16:
    // 0-13.308: 0
    // 13.308-21.617: 1.661,80
    // 21.617-35.836: 4.265,70
    // 35.836-53.441,16: (53.441,16-35.836) × 40% = 7.042,064
    // Gesamt ≈ 12.969,56
    expect(r.steuerBrutto).toBeGreaterThan(12900)
    expect(r.steuerBrutto).toBeLessThan(13100)

    // Netto = Gewinn - SVS - EST
    expect(round2(r.echtesNetto)).toBe(round2(80000 - svs - r.einkommensteuer))
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

  it('Exakt auf Höchstbeitragsgrundlage', () => {
    const r = calculateSvs(90300, 0, '2025', undefined, stammdaten)
    expect(r.beitragsgrundlage).toBe(90300)
    expect(r.cappedAtMax).toBe(false) // Exakt an der Grenze, nicht drüber
  })

  it('€1 über Höchstbeitragsgrundlage', () => {
    const r = calculateSvs(90301, 0, '2025', undefined, stammdaten)
    expect(r.beitragsgrundlage).toBe(90300)
    expect(r.cappedAtMax).toBe(true)
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
