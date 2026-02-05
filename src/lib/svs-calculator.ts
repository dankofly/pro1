import { SVS } from './svs-constants'

export interface SvsResult {
  beitragsgrundlage: number
  pvBeitrag: number
  kvBeitrag: number
  mvBeitrag: number
  uvBeitrag: number
  endgueltigeSVS: number
  endgueltigeMonatlich: number
  vorlaeufigeSVS: number
  nachzahlung: number
  sparEmpfehlung: number
  steuerErsparnis: number
  effektiveSVS: number
  riskPercent: number
  belowMinimum: boolean
  cappedAtMax: boolean
}

export function calculateSvs(gewinn: number, monatlicheVorschreibung: number): SvsResult {
  const belowMinimum = gewinn < SVS.GERINGFUEGIGKEIT
  const cappedAtMax = gewinn > SVS.HOECHSTBEITRAG
  const beitragsgrundlage = belowMinimum ? 0 : Math.min(gewinn, SVS.HOECHSTBEITRAG)

  const pvBeitrag = beitragsgrundlage * SVS.PV_RATE
  const kvBeitrag = beitragsgrundlage * SVS.KV_RATE
  const mvBeitrag = beitragsgrundlage * SVS.MV_RATE
  const uvBeitrag = belowMinimum ? 0 : SVS.UV_MONTHLY * 12

  const endgueltigeSVS = pvBeitrag + kvBeitrag + mvBeitrag + uvBeitrag
  const vorlaeufigeSVS = monatlicheVorschreibung * 12
  const nachzahlung = endgueltigeSVS - vorlaeufigeSVS

  const sparEmpfehlung = nachzahlung > 0 ? nachzahlung / 12 : 0

  const steuerErsparnis = endgueltigeSVS * SVS.STEUER_ERSPARNIS_RATE
  const effektiveSVS = endgueltigeSVS - steuerErsparnis

  let riskPercent = 0
  if (nachzahlung > 0 && endgueltigeSVS > 0) {
    riskPercent = Math.min((nachzahlung / endgueltigeSVS) * 100, 100)
  }

  const endgueltigeMonatlich = endgueltigeSVS / 12

  return {
    beitragsgrundlage,
    pvBeitrag,
    kvBeitrag,
    mvBeitrag,
    uvBeitrag,
    endgueltigeSVS,
    endgueltigeMonatlich,
    vorlaeufigeSVS,
    nachzahlung,
    sparEmpfehlung,
    steuerErsparnis,
    effektiveSVS,
    riskPercent,
    belowMinimum,
    cappedAtMax,
  }
}
