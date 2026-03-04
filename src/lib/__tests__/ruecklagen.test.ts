import { describe, it, expect } from 'vitest'
import { calcRuecklagen } from '../rechner-engine'
import { calculateAll } from '../rechner-engine'
import { DEFAULT_RECHNER_INPUT } from '../rechner-types'

const round2 = (n: number) => Math.round(n * 100) / 100

describe('Rücklagen-Rechner', () => {
  describe('calcRuecklagen()', () => {
    it('€80.000 Umsatz → monatliche Rücklagen zwischen €1.500 und €3.000', () => {
      const r = calcRuecklagen(80000, 0, 21609, 12970, false)
      expect(r.gesamtMonatlich).toBeGreaterThan(1500)
      expect(r.gesamtMonatlich).toBeLessThan(3500)
    })

    it('SVS monatlich = SVS jährlich / 12', () => {
      const svs = 21609
      const r = calcRuecklagen(80000, 0, svs, 12970, false)
      expect(round2(r.svsMonatlich)).toBe(round2(svs / 12))
    })

    it('ESt monatlich = ESt jährlich / 12', () => {
      const est = 12970
      const r = calcRuecklagen(80000, 0, 21609, est, false)
      expect(round2(r.estMonatlich)).toBe(round2(est / 12))
    })

    it('ESt Quartal = ESt jährlich / 4', () => {
      const est = 12970
      const r = calcRuecklagen(80000, 0, 21609, est, false)
      expect(round2(r.estQuartal)).toBe(round2(est / 4))
    })

    it('USt = 0 wenn nicht USt-pflichtig', () => {
      const r = calcRuecklagen(80000, 0, 21609, 12970, false)
      expect(r.ustMonatlich).toBe(0)
      expect(r.ustJaehrlich).toBe(0)
    })

    it('USt = Umsatz × 20% / 12 wenn USt-pflichtig', () => {
      const r = calcRuecklagen(80000, 0, 21609, 12970, true)
      expect(round2(r.ustMonatlich)).toBe(round2(80000 * 0.20 / 12))
      expect(round2(r.ustJaehrlich)).toBe(round2(80000 * 0.20))
    })

    it('Freies Netto = (Umsatz - Aufwände) / 12 - Gesamt', () => {
      const umsatz = 80000
      const aufwaende = 20000
      const r = calcRuecklagen(umsatz, aufwaende, 21609, 12970, false)
      const expected = (umsatz - aufwaende) / 12 - r.gesamtMonatlich
      expect(round2(r.freiesNettoMonatlich)).toBe(round2(expected))
    })

    it('Rücklagen-Quote = Gesamt × 12 / Umsatz', () => {
      const umsatz = 80000
      const r = calcRuecklagen(umsatz, 0, 21609, 12970, false)
      const expected = (r.gesamtMonatlich * 12) / umsatz
      expect(round2(r.ruecklagenQuote)).toBe(round2(expected))
    })

    it('€0 Umsatz → Rücklagen-Quote = 0', () => {
      const r = calcRuecklagen(0, 0, 2000, 0, false)
      expect(r.ruecklagenQuote).toBe(0)
    })

    it('Negative ESt → 0 (kein negativer Rücklagebetrag)', () => {
      const r = calcRuecklagen(10000, 0, 2000, -500, false)
      expect(r.estMonatlich).toBe(0)
      expect(r.estJaehrlich).toBe(0)
    })
  })

  describe('Integration mit calculateAll()', () => {
    it('Default-Input enthält ruecklagen im Ergebnis', () => {
      const result = calculateAll(DEFAULT_RECHNER_INPUT)
      expect(result.ruecklagen).toBeDefined()
      expect(result.ruecklagen.gesamtMonatlich).toBeGreaterThan(0)
      expect(result.ruecklagen.svsMonatlich).toBeGreaterThan(0)
    })

    it('USt-pflichtig toggle wirkt sich auf ruecklagen aus', () => {
      const ohneUst = calculateAll({ ...DEFAULT_RECHNER_INPUT, ust: { ...DEFAULT_RECHNER_INPUT.ust, ustPflichtig: false } })
      const mitUst = calculateAll({ ...DEFAULT_RECHNER_INPUT, ust: { ...DEFAULT_RECHNER_INPUT.ust, ustPflichtig: true } })

      expect(ohneUst.ruecklagen.ustMonatlich).toBe(0)
      expect(mitUst.ruecklagen.ustMonatlich).toBeGreaterThan(0)
      expect(mitUst.ruecklagen.gesamtMonatlich).toBeGreaterThan(ohneUst.ruecklagen.gesamtMonatlich)
    })
  })
})
