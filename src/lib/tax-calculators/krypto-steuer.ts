/**
 * Austrian Crypto Tax Calculator 2026
 * KESt (27.5%) on crypto gains, Alt-/Neuvermoegen, staking/mining.
 */

function r2(n: number): number {
  return Math.round(n * 100) / 100
}

const KEST_RATE = 0.275
const STICHTAG_NEUVERMOEGEN = new Date('2021-03-01')
const STICHTAG_NEUES_REGIME = new Date('2022-03-01')

export interface KryptoSteuerInput {
  transaktionen: Array<{
    typ: string
    datum: string
    krypto?: string
    menge?: number
    preis_eur?: number
    wert_eur?: number
    krypto_von?: string
    krypto_nach?: string
    menge_erhalten?: number
  }>
}

interface TxDetail {
  typ: string
  datum: string
  krypto: string
  menge: number
  wert_eur: number
  vermoegensart: string
  steuerpflichtig: boolean
  gewinn_verlust: number
  steuer: number
  grund: string
}

export interface KryptoSteuerResult {
  transaktionen_detail: TxDetail[]
  zusammenfassung: {
    steuerpflichtige_gewinne: number
    steuerfreie_gewinne: number
    verluste: number
    saldo: number
    kest_27_5: number
  }
  laufende_einkuenfte: {
    staking_mining: number
    steuer: number
  }
  portfolio: Array<{
    krypto: string
    menge: number
    einstandskosten: number
    durchschnittspreis: number
  }>
  hinweise: string[]
}

class CryptoPortfolio {
  private holdings: Record<string, { totalAmount: number; totalCost: number }> = {}

  add(crypto: string, amount: number, cost: number): void {
    if (!this.holdings[crypto]) {
      this.holdings[crypto] = { totalAmount: 0, totalCost: 0 }
    }
    this.holdings[crypto].totalAmount += amount
    this.holdings[crypto].totalCost += cost
  }

  getAvgCost(crypto: string): number {
    const h = this.holdings[crypto]
    if (!h || h.totalAmount <= 0) return 0
    return h.totalCost / h.totalAmount
  }

  remove(crypto: string, amount: number): number {
    const h = this.holdings[crypto]
    if (!h || h.totalAmount <= 0) return 0

    const avgCost = this.getAvgCost(crypto)
    const actualAmount = Math.min(amount, h.totalAmount)
    const costBasis = actualAmount * avgCost

    h.totalAmount -= actualAmount
    h.totalCost -= costBasis

    if (h.totalAmount < 0.0001) {
      h.totalAmount = 0
      h.totalCost = 0
    }

    return r2(costBasis)
  }

  getSummary(): Array<{ krypto: string; menge: number; einstandskosten: number; durchschnittspreis: number }> {
    return Object.entries(this.holdings)
      .filter(([, h]) => h.totalAmount > 0.0001)
      .map(([crypto, h]) => ({
        krypto: crypto,
        menge: Number(h.totalAmount.toFixed(8)),
        einstandskosten: r2(h.totalCost),
        durchschnittspreis: h.totalAmount > 0 ? r2(h.totalCost / h.totalAmount) : 0,
      }))
  }
}

function parseDate(dateStr: string): Date {
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? new Date('2026-01-01') : d
}

function classifyAsset(acquisitionDate: Date): string {
  return acquisitionDate < STICHTAG_NEUVERMOEGEN ? 'Altvermoegen' : 'Neuvermoegen'
}

function fmtEur(n: number): string {
  return n.toLocaleString('de-AT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function calculateKryptoSteuer(input: KryptoSteuerInput): KryptoSteuerResult {
  const portfolio = new CryptoPortfolio()

  const sortedTx = [...input.transaktionen].sort(
    (a, b) => parseDate(a.datum).getTime() - parseDate(b.datum).getTime()
  )

  const details: TxDetail[] = []
  let totalTaxableGains = 0
  let totalTaxFreeGains = 0
  let totalLosses = 0
  let totalStakingMining = 0
  let totalKest = 0

  for (const tx of sortedTx) {
    const txType = (tx.typ ?? '').toLowerCase()
    const txDate = parseDate(tx.datum)
    const crypto = tx.krypto ?? tx.krypto_von ?? 'UNKNOWN'
    const amount = tx.menge ?? 0
    const priceEur = tx.preis_eur ?? tx.wert_eur ?? 0

    const result: TxDetail = {
      typ: txType,
      datum: txDate.toISOString().split('T')[0],
      krypto: crypto,
      menge: amount,
      wert_eur: priceEur,
      vermoegensart: '-',
      steuerpflichtig: false,
      gewinn_verlust: 0,
      steuer: 0,
      grund: '',
    }

    if (txType === 'kauf') {
      portfolio.add(crypto, amount, priceEur)
      const assetType = classifyAsset(txDate)
      result.vermoegensart = assetType
      result.grund = `Kauf - ${assetType}, Einstandskosten EUR ${fmtEur(priceEur)}`
    } else if (txType === 'verkauf') {
      const costBasis = portfolio.remove(crypto, amount)
      const gain = r2(priceEur - costBasis)
      result.vermoegensart = 'Neuvermoegen'
      result.gewinn_verlust = gain
      result.steuerpflichtig = true
      result.steuer = r2(Math.max(gain, 0) * KEST_RATE)
      result.grund = `Verkauf Neuvermoegen an Fiat - Erloes EUR ${fmtEur(priceEur)}, Kosten EUR ${fmtEur(costBasis)}, Gewinn EUR ${fmtEur(gain)}`
    } else if (txType === 'tausch') {
      const cryptoFrom = tx.krypto_von ?? ''
      const cryptoTo = tx.krypto_nach ?? ''
      const amountTo = tx.menge_erhalten ?? amount
      const costBasis = portfolio.remove(cryptoFrom, amount)
      portfolio.add(cryptoTo, amountTo, costBasis)
      result.krypto = `${cryptoFrom} -> ${cryptoTo}`
      result.vermoegensart = 'Neuvermoegen'
      result.steuerpflichtig = false
      result.grund = `Tausch ${cryptoFrom} -> ${cryptoTo} -- steuerfrei (Anschaffungskosten EUR ${fmtEur(costBasis)} werden fortgefuehrt)`
    } else if (txType === 'staking' || txType === 'mining') {
      portfolio.add(crypto, amount, priceEur)
      result.vermoegensart = 'Neuvermoegen'
      result.steuerpflichtig = true
      result.gewinn_verlust = priceEur
      result.steuer = r2(priceEur * KEST_RATE)
      result.grund = `${txType.charAt(0).toUpperCase() + txType.slice(1)}-Einkuenfte - EUR ${fmtEur(priceEur)} bei Zufluss steuerpflichtig (27,5 % KESt)`
    } else if (['airdrop', 'bounty', 'hardfork'].includes(txType)) {
      portfolio.add(crypto, amount, 0)
      result.vermoegensart = 'Neuvermoegen'
      result.steuerpflichtig = false
      result.grund = `${txType.charAt(0).toUpperCase() + txType.slice(1)} - Anschaffungskosten EUR 0, Besteuerung erst bei Veraeusserung`
    } else {
      result.grund = `Unbekannter Transaktionstyp: ${txType}`
    }

    details.push(result)

    const gain = result.gewinn_verlust
    if (result.steuerpflichtig) {
      if (txType === 'staking' || txType === 'mining') {
        totalStakingMining += gain
      } else if (gain > 0) {
        totalTaxableGains += gain
      } else {
        totalLosses += Math.abs(gain)
      }
      totalKest += result.steuer
    } else if (gain > 0) {
      totalTaxFreeGains += gain
    }
  }

  const saldo = r2(totalTaxableGains - totalLosses)
  const netKest = r2(Math.max(saldo, 0) * KEST_RATE + totalStakingMining * KEST_RATE)

  const hinweise = [
    'Krypto-Verluste koennen mit anderen Kapitalertraegen (27,5 % KESt) verrechnet werden.',
    'Kein Verlustvortrag im ausserbetrieblichen Bereich.',
    'Gleitender Durchschnittspreis seit 1.1.2023 verpflichtend.',
  ]

  if (totalLosses > 0) {
    hinweise.push(
      `Realisierte Verluste: EUR ${fmtEur(totalLosses)} - Verlustausgleich mit Dividenden, Anleihen etc. moeglich.`
    )
  }

  return {
    transaktionen_detail: details,
    zusammenfassung: {
      steuerpflichtige_gewinne: r2(totalTaxableGains),
      steuerfreie_gewinne: r2(totalTaxFreeGains),
      verluste: r2(totalLosses),
      saldo,
      kest_27_5: r2(totalKest),
    },
    laufende_einkuenfte: {
      staking_mining: r2(totalStakingMining),
      steuer: r2(totalStakingMining * KEST_RATE),
    },
    portfolio: portfolio.getSummary(),
    hinweise,
  }
}
