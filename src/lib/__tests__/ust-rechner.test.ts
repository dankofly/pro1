import { describe, it, expect } from 'vitest'
import { calcUst } from '../rechner-engine'
import { calculateAll } from '../rechner-engine'
import { DEFAULT_RECHNER_INPUT } from '../rechner-types'
import { KUR_CONFIG } from '../tax-constants'

const round2 = (n: number) => Math.round(n * 100) / 100

describe('USt/KUR-Rechner', () => {
  describe('KUR-Berechtigung', () => {
    it('€30.000 Umsatz → KUR berechtigt', () => {
      const r = calcUst(30000, 0, 0.20, 0)
      expect(r.kurBerechtigt).toBe(true)
      expect(r.kurToleranz).toBe(false)
    })

    it('€55.000 Umsatz → KUR berechtigt (genau an Grenze)', () => {
      const r = calcUst(55000, 0, 0.20, 0)
      expect(r.kurBerechtigt).toBe(true)
      expect(r.kurToleranz).toBe(false)
    })

    it('€55.001 Umsatz → Toleranzzone', () => {
      const r = calcUst(55001, 0, 0.20, 0)
      expect(r.kurBerechtigt).toBe(false)
      expect(r.kurToleranz).toBe(true)
    })

    it('€60.500 Umsatz → Toleranzzone (genau an Grenze)', () => {
      const r = calcUst(60500, 0, 0.20, 0)
      expect(r.kurBerechtigt).toBe(false)
      expect(r.kurToleranz).toBe(true)
    })

    it('€60.501 Umsatz → KUR NICHT berechtigt', () => {
      const r = calcUst(60501, 0, 0.20, 0)
      expect(r.kurBerechtigt).toBe(false)
      expect(r.kurToleranz).toBe(false)
    })

    it('€0 Umsatz → KUR berechtigt', () => {
      const r = calcUst(0, 0, 0.20, 0)
      expect(r.kurBerechtigt).toBe(true)
    })
  })

  describe('USt-Berechnung', () => {
    it('USt-Einnahmen = Umsatz × 20%', () => {
      const r = calcUst(80000, 0, 0.20, 0)
      expect(round2(r.ustEinnahmen)).toBe(16000)
    })

    it('USt-Einnahmen mit 10% Satz', () => {
      const r = calcUst(80000, 0, 0.10, 0)
      expect(round2(r.ustEinnahmen)).toBe(8000)
    })

    it('USt-Einnahmen mit 13% Satz', () => {
      const r = calcUst(80000, 0, 0.13, 0)
      expect(round2(r.ustEinnahmen)).toBe(10400)
    })

    it('Zahllast = USt-Einnahmen - Vorsteuer', () => {
      const r = calcUst(80000, 4000, 0.20, 0)
      expect(round2(r.ustZahllast)).toBe(12000) // 16000 - 4000
    })

    it('Zahllast monatlich = Zahllast / 12', () => {
      const r = calcUst(80000, 4000, 0.20, 0)
      expect(round2(r.zahllastMonatlich)).toBe(round2(12000 / 12))
    })

    it('Zahllast quartal = Zahllast / 4', () => {
      const r = calcUst(80000, 4000, 0.20, 0)
      expect(round2(r.zahllastQuartal)).toBe(3000)
    })

    it('Negative Zahllast bei hoher Vorsteuer (Gutschrift)', () => {
      const r = calcUst(10000, 5000, 0.20, 0)
      // Einnahmen: 2000, Vorsteuer: 5000 → Zahllast: -3000
      expect(r.ustZahllast).toBeLessThan(0)
    })

    it('USt-Brutto = Umsatz + USt-Einnahmen', () => {
      const r = calcUst(80000, 0, 0.20, 0)
      expect(r.ustBrutto).toBe(96000) // 80000 + 16000
    })
  })

  describe('KUR vs. Regel Vergleich', () => {
    it('Vorsteuer = 0 → KUR-Netto gleich Regel-Netto', () => {
      const r = calcUst(50000, 0, 0.20, 0)
      // KUR: 50000, Regel: 50000 + 0 = 50000
      expect(r.kurNetto).toBe(50000)
      expect(r.regelNetto).toBe(50000)
      expect(r.vorteilKur).toBe(0)
    })

    it('Hohe Vorsteuer → Regel vorteilhaft', () => {
      const r = calcUst(50000, 5000, 0.20, 0)
      // KUR: 50000, Regel: 50000 + 5000 = 55000
      expect(r.kurVorteilhaft).toBe(false)
      expect(r.vorteilKur).toBe(-5000)
    })

    it('vorteilKur = kurNetto - regelNetto', () => {
      const vorsteuer = 3000
      const r = calcUst(80000, vorsteuer, 0.20, 0)
      expect(r.vorteilKur).toBe(r.kurNetto - r.regelNetto)
    })

    it('KUR Vorsteuer-Verlust = eingegebene Vorsteuer', () => {
      const r = calcUst(50000, 8000, 0.20, 0)
      expect(r.kurVorsteuerVerlust).toBe(8000)
    })

    it('Regel-Netto = Umsatz + Vorsteuerabzug', () => {
      const r = calcUst(80000, 4000, 0.20, 0)
      expect(r.regelNetto).toBe(84000) // 80000 + 4000
    })
  })

  describe('B2B-Empfehlungslogik', () => {
    it('100% B2C, keine Vorsteuer → KUR empfohlen', () => {
      const r = calcUst(40000, 0, 0.20, 0) // b2bAnteil = 0
      expect(r.empfehlung).toBe('kur')
    })

    it('100% B2B → Regel empfohlen', () => {
      const r = calcUst(40000, 0, 0.20, 100) // b2bAnteil = 100
      expect(r.empfehlung).toBe('regel')
    })

    it('50/50 B2B/B2C mit etwas Vorsteuer → korrekte Empfehlung', () => {
      // effektiverKurVorteil = 40000 * 0.20 * 0.5 - 2000 = 4000 - 2000 = 2000 > 0
      const r = calcUst(40000, 2000, 0.20, 50)
      expect(r.empfehlung).toBe('kur')
    })

    it('50/50 B2B/B2C mit hoher Vorsteuer → Regel empfohlen', () => {
      // effektiverKurVorteil = 40000 * 0.20 * 0.5 - 6000 = 4000 - 6000 = -2000 < 0
      const r = calcUst(40000, 6000, 0.20, 50)
      expect(r.empfehlung).toBe('regel')
    })

    it('Über KUR-Grenze → immer Regel empfohlen', () => {
      const r = calcUst(70000, 0, 0.20, 0) // > €60.500
      expect(r.empfehlung).toBe('regel')
      expect(r.empfehlungGrund).toContain('KUR-Grenze')
    })

    it('Empfehlung hat immer einen Grund', () => {
      const r1 = calcUst(40000, 0, 0.20, 0)
      const r2 = calcUst(40000, 5000, 0.20, 100)
      const r3 = calcUst(70000, 0, 0.20, 0)
      expect(r1.empfehlungGrund.length).toBeGreaterThan(0)
      expect(r2.empfehlungGrund.length).toBeGreaterThan(0)
      expect(r3.empfehlungGrund.length).toBeGreaterThan(0)
    })
  })

  describe('Integration mit calculateAll()', () => {
    it('Default-Input enthält ustResult im Ergebnis', () => {
      const result = calculateAll(DEFAULT_RECHNER_INPUT)
      expect(result.ustResult).toBeDefined()
      expect(result.ustResult.kurBerechtigt).toBeDefined()
    })

    it('KUR-Berechtigung spiegelt Jahresumsatz wider', () => {
      const niedrig = calculateAll({ ...DEFAULT_RECHNER_INPUT, jahresumsatz: 30000 })
      const hoch = calculateAll({ ...DEFAULT_RECHNER_INPUT, jahresumsatz: 70000 })
      expect(niedrig.ustResult.kurBerechtigt).toBe(true)
      expect(hoch.ustResult.kurBerechtigt).toBe(false)
    })

    it('Vorsteuer-Änderung ändert Vergleich', () => {
      const ohne = calculateAll({ ...DEFAULT_RECHNER_INPUT, ust: { ...DEFAULT_RECHNER_INPUT.ust, vorsteuerJaehrlich: 0 } })
      const mit = calculateAll({ ...DEFAULT_RECHNER_INPUT, ust: { ...DEFAULT_RECHNER_INPUT.ust, vorsteuerJaehrlich: 10000 } })
      expect(mit.ustResult.regelNetto).toBeGreaterThan(ohne.ustResult.regelNetto)
    })

    it('ustPflichtig toggle wirkt sich auf Rücklagen aus', () => {
      const ohneUst = calculateAll({ ...DEFAULT_RECHNER_INPUT, ust: { ...DEFAULT_RECHNER_INPUT.ust, ustPflichtig: false } })
      const mitUst = calculateAll({ ...DEFAULT_RECHNER_INPUT, ust: { ...DEFAULT_RECHNER_INPUT.ust, ustPflichtig: true } })
      expect(ohneUst.ruecklagen.ustMonatlich).toBe(0)
      expect(mitUst.ruecklagen.ustMonatlich).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('€0 Umsatz → USt-Zahllast = 0 (bei 0 Vorsteuer)', () => {
      const r = calcUst(0, 0, 0.20, 0)
      expect(r.ustZahllast).toBe(0)
      expect(r.ustEinnahmen).toBe(0)
    })

    it('€0 Umsatz mit Vorsteuer → negative Zahllast', () => {
      const r = calcUst(0, 1000, 0.20, 0)
      expect(r.ustZahllast).toBe(-1000)
    })

    it('KUR_CONFIG.grenze = 55000', () => {
      expect(KUR_CONFIG.grenze).toBe(55000)
    })

    it('KUR_CONFIG.toleranz = 60500', () => {
      expect(KUR_CONFIG.toleranz).toBe(60500)
    })

    it('Sehr hohe Vorsteuer → großer Regel-Vorteil', () => {
      const r = calcUst(50000, 20000, 0.20, 0)
      expect(r.vorteilKur).toBe(-20000)
      expect(r.kurVorteilhaft).toBe(false)
    })
  })
})
