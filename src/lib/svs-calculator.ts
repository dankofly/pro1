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
  einkommensteuer: number
  echtesNetto: number
  riskPercent: number
  belowMinimum: boolean
  cappedAtMax: boolean
}

export function calculateEinkommensteuer(gewinn: number, svsSumme: number): number {
  const grundfreibetrag = Math.min(gewinn, 33000) * 0.15
  let basis = gewinn - svsSumme - grundfreibetrag
  if (basis < 0) basis = 0

  let steuer = 0

  if (basis > 99266) {
    steuer += (basis - 99266) * 0.55
    basis = 99266
  }
  if (basis > 66612) {
    steuer += (basis - 66612) * 0.48
    basis = 66612
  }
  if (basis > 34513) {
    steuer += (basis - 34513) * 0.40
    basis = 34513
  }
  if (basis > 20818) {
    steuer += (basis - 20818) * 0.30
    basis = 20818
  }
  if (basis > 12816) {
    steuer += (basis - 12816) * 0.20
  }

  return steuer
}

export interface SteuerTipp {
  ifbInvestition: number
  ifbErsparnis: number
  svsVorauszahlung: number
  svsVorauszahlungErsparnis: number
  grenzsteuersatz: number
}

function getGrenzsteuersatz(basis: number): number {
  if (basis > 99266) return 0.55
  if (basis > 66612) return 0.48
  if (basis > 34513) return 0.40
  if (basis > 20818) return 0.30
  if (basis > 12816) return 0.20
  return 0
}

export function calculateSteuerTipps(gewinn: number, svsSumme: number): SteuerTipp {
  const grundfreibetrag = Math.min(gewinn, 33000) * 0.15
  const basis = Math.max(gewinn - svsSumme - grundfreibetrag, 0)
  const grenzsteuersatz = getGrenzsteuersatz(basis)

  // Investitionsbedingter Gewinnfreibetrag (IFB)
  // Nur für Gewinn über 33.000 € (Grundfreibetrag deckt bis 33.000 ab)
  let ifbInvestition = 0
  if (gewinn > 33000) {
    const ueber33k = Math.min(gewinn, 175000) - 33000
    const ueber175k = gewinn > 175000 ? Math.min(gewinn, 350000) - 175000 : 0
    const ueber350k = gewinn > 350000 ? gewinn - 350000 : 0
    ifbInvestition = ueber33k * 0.13 + ueber175k * 0.07 + ueber350k * 0.045
  }
  const ifbErsparnis = ifbInvestition * grenzsteuersatz

  // SVS-Vorauszahlung: Wie viel kann man noch sinnvoll einzahlen?
  // Maximale SVS = Höchstbeitragsgrundlage × Gesamtrate + UV
  const maxSvs = SVS.HOECHSTBEITRAG * (SVS.PV_RATE + SVS.KV_RATE + SVS.MV_RATE) + SVS.UV_MONTHLY * 12
  const svsVorauszahlung = Math.max(maxSvs - svsSumme, 0)
  const svsVorauszahlungErsparnis = svsVorauszahlung * grenzsteuersatz

  return { ifbInvestition, ifbErsparnis, svsVorauszahlung, svsVorauszahlungErsparnis, grenzsteuersatz }
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
  const einkommensteuer = calculateEinkommensteuer(gewinn, endgueltigeSVS)
  const echtesNetto = gewinn - endgueltigeSVS - einkommensteuer

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
    einkommensteuer,
    echtesNetto,
    riskPercent,
    belowMinimum,
    cappedAtMax,
  }
}
