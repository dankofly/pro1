// ── Krypto-Steuer Rechner Österreich 2026 ──────────────────────
// Regelwerk (§ 27b EStG, seit ÖkoStRefG 2022):
//   Altvermögen (Anschaffung vor 1.3.2021): Spekulationsfrist 1 Jahr,
//     bei Verkauf nach >1 Jahr steuerfrei. Tausch gilt hier als Veräußerung.
//   Neuvermögen (Anschaffung ab 1.3.2021): KESt 27,5 % auf realisierte Gewinne.
//   Tausch Krypto→Krypto (Neuvermögen): STEUERNEUTRAL (§ 27b Abs 2 EStG),
//     die Anschaffungskosten der hingegebenen Coins wandern auf die erhaltenen.
//   Mining/Lending: laufende Einkünfte, KESt 27,5 % bei Zufluss.
//   Staking-Rewards: KEIN Zufluss-Tatbestand; Ansatz mit AK 0, Besteuerung
//     erst bei späterer Veräußerung (§ 27b Abs 2 Z 2 EStG).
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
  let tauschUebertrageneAk = 0 // steuerneutral übertragene AK aus Krypto-Tausch

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
          // Altvermögen: auch Tausch gilt als Veräußerung (Spekulationsregime)
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
        } else if (tx.typ === 'tausch') {
          // Neuvermögen-Tausch Krypto→Krypto: steuerneutral (§ 27b Abs 2 EStG).
          // Die AK der hingegebenen Coins gehen auf die erhaltenen Coins über.
          tauschUebertrageneAk += costBasis
        } else {
          // Neuvermögen-Verkauf gegen Euro/FIAT — steuerpflichtig (KESt 27,5 %)
          neuGewinn += gain
        }

        lot.menge -= consumed
        remaining -= consumed
        if (lot.menge <= 0) {
          pool.shift()
        }
      }

      // Tausch (Neuvermögen) ist steuerneutral: Die erhaltene Kryptowährung
      // muss als "Kauf" mit den ÜBERNOMMENEN Anschaffungskosten erfasst werden
      // (nicht mit dem Marktwert), damit spätere Verkäufe korrekt rechnen.
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
    parts.push(`Mining/Lending: KESt ${formatEurInline(stakingKest)} auf ${formatEurInline(stakingErtraege)} Erträge (bei Zufluss steuerpflichtig). Hinweis: Echte Staking-Rewards sind bei Zufluss NICHT steuerpflichtig, sie werden mit Anschaffungskosten 0 angesetzt und erst beim Verkauf besteuert.`)
  }
  if (tauschUebertrageneAk > 0) {
    parts.push(`Krypto-Tausch steuerneutral (§ 27b Abs 2 EStG): ${formatEurInline(tauschUebertrageneAk)} Anschaffungskosten auf die erhaltenen Coins übertragen. Erfasse die erhaltenen Coins als Kauf mit diesen übernommenen Anschaffungskosten.`)
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
