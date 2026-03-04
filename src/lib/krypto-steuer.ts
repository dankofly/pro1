// ── Krypto-Steuer Rechner Österreich 2026 ──────────────────────
// Regelwerk:
//   Altvermögen (Anschaffung vor 1.3.2021): Spekulationsfrist 1 Jahr,
//     bei Verkauf nach >1 Jahr steuerfrei.
//   Neuvermögen (Anschaffung ab 1.3.2021): KESt 27,5 % auf realisierte Gewinne.
//   Tausch Krypto→Krypto: steuerpflichtig (Neuvermögen), steuerneutral (Altvermögen).
//   Staking/Mining: Einkünfte aus Kapitalvermögen, KESt 27,5 % bei Zufluss.
//   Kostenbasis: FIFO (First In, First Out).

export interface KryptoTransaktion {
  id: string
  datum: string // ISO date
  typ: 'kauf' | 'verkauf' | 'tausch'
  coin: string
  menge: number
  preisEur: number   // Preis pro Einheit
  gesamtEur: number  // menge * preisEur
}

export interface KryptoResult {
  transaktionen: KryptoTransaktion[]
  altvermoegen: { gewinn: number; steuerfrei: boolean; info: string }
  neuvermoegen: { gewinn: number; kest: number }
  stakingErtraege: number
  stakingKest: number
  gesamtKest: number
  zusammenfassung: string
}

// ── Constants ──────────────────────────────────────────────────

const KEST_RATE = 0.275
const STICHTAG = new Date('2021-03-01')
const ONE_YEAR_MS = 365.25 * 24 * 60 * 60 * 1000

// ── FIFO cost-basis lot ────────────────────────────────────────

interface Lot {
  datum: Date
  coin: string
  menge: number        // remaining quantity
  preisEur: number     // acquisition price per unit
  isAltvermoegen: boolean
}

// ── Calculation ────────────────────────────────────────────────

export function calculateKryptoSteuer(
  transaktionen: KryptoTransaktion[],
  stakingErtraege: number,
): KryptoResult {
  // Sort transactions chronologically
  const sorted = [...transaktionen].sort(
    (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
  )

  // FIFO pool per coin
  const lots: Map<string, Lot[]> = new Map()

  let altGewinn = 0
  let altSteuerfrei = true // all Altvermögen disposals held > 1y?
  let altInfo = ''
  let neuGewinn = 0

  for (const tx of sorted) {
    const coin = tx.coin.toUpperCase()
    const txDate = new Date(tx.datum)
    const isAlt = txDate < STICHTAG

    if (tx.typ === 'kauf') {
      // Add lot to FIFO pool
      const pool = lots.get(coin) ?? []
      pool.push({
        datum: txDate,
        coin,
        menge: tx.menge,
        preisEur: tx.preisEur,
        isAltvermoegen: isAlt,
      })
      lots.set(coin, pool)
    } else {
      // verkauf or tausch — consume lots FIFO
      let remaining = tx.menge
      const pool = lots.get(coin) ?? []

      while (remaining > 0 && pool.length > 0) {
        const lot = pool[0]
        const consumed = Math.min(remaining, lot.menge)
        const costBasis = consumed * lot.preisEur
        const proceeds = consumed * tx.preisEur
        const gain = proceeds - costBasis

        if (lot.isAltvermoegen) {
          // Check Spekulationsfrist (1 year)
          const heldMs = txDate.getTime() - lot.datum.getTime()
          if (heldMs > ONE_YEAR_MS) {
            // Steuerfrei — no tax
            altGewinn += gain
          } else {
            // Within Spekulationsfrist — taxable at personal rate
            // We still report it, but flag it
            altGewinn += gain
            altSteuerfrei = false
            altInfo = 'Teile des Altvermögens wurden innerhalb der 1-Jahres-Spekulationsfrist verkauft.'
          }
          // Tausch Krypto→Krypto is steuerneutral for Altvermögen
          // (original cost basis carries over)
        } else {
          // Neuvermögen — always taxable (KESt 27,5 %)
          neuGewinn += gain
        }

        lot.menge -= consumed
        remaining -= consumed
        if (lot.menge <= 0) {
          pool.shift()
        }
      }

      // If tausch (Neuvermögen): the received coin gets a new lot
      // at the current market value (= tx.preisEur * tx.menge = tx.gesamtEur)
      // We treat tausch as: sell coin A, buy coin B
      // The "buy" side is handled implicitly: user should add a kauf for the received coin.
      // For Altvermögen tausch: cost basis of original lot carries over.
    }
  }

  // Default info text for Altvermögen
  if (!altInfo) {
    if (altGewinn === 0) {
      altInfo = 'Keine Altvermögen-Transaktionen vorhanden.'
    } else if (altSteuerfrei) {
      altInfo = 'Alle Altvermögen-Verkäufe wurden nach der 1-Jahres-Spekulationsfrist durchgeführt — steuerfrei.'
    }
  }

  const stakingKest = roundCent(stakingErtraege * KEST_RATE)
  const neuKest = roundCent(Math.max(0, neuGewinn) * KEST_RATE)
  const gesamtKest = roundCent(neuKest + stakingKest)

  // Zusammenfassung
  const parts: string[] = []
  if (neuGewinn > 0) {
    parts.push(`Neuvermögen: KESt ${formatEurInline(neuKest)} auf ${formatEurInline(neuGewinn)} Gewinn.`)
  } else if (neuGewinn < 0) {
    parts.push(`Neuvermögen: Verlust von ${formatEurInline(Math.abs(neuGewinn))} (Verlustausgleich möglich).`)
  }
  if (stakingErtraege > 0) {
    parts.push(`Staking/Mining: KESt ${formatEurInline(stakingKest)} auf ${formatEurInline(stakingErtraege)} Erträge.`)
  }
  if (altGewinn !== 0) {
    parts.push(
      altSteuerfrei
        ? `Altvermögen: ${formatEurInline(altGewinn)} Gewinn — steuerfrei (Haltefrist > 1 Jahr).`
        : `Altvermögen: ${formatEurInline(altGewinn)} Gewinn — teilweise steuerpflichtig (Spekulationsfrist).`
    )
  }
  if (parts.length === 0) {
    parts.push('Keine steuerpflichtigen Krypto-Erträge.')
  }

  return {
    transaktionen: sorted,
    altvermoegen: { gewinn: altGewinn, steuerfrei: altSteuerfrei, info: altInfo },
    neuvermoegen: { gewinn: neuGewinn, kest: neuKest },
    stakingErtraege,
    stakingKest,
    gesamtKest,
    zusammenfassung: parts.join(' '),
  }
}

// ── Helpers ────────────────────────────────────────────────────

function roundCent(v: number): number {
  return Math.round(v * 100) / 100
}

function formatEurInline(v: number): string {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v)
}
