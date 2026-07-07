// Gemeinsamer Typ + Validierung für den 49-€-Tripwire (SVS-Rücklagenplan).
// Der Payload reist als Stripe-Session-Metadata (Limit 500 Zeichen pro Key),
// deshalb nur kompakte Zahlen, keine verschachtelten Strukturen.

export interface RuecklagenplanPayload {
  /** Jahresgewinn */
  g: number
  /** Vorläufige SVS-Vorschreibung (Jahr) */
  vs: number
  /** Endgültige SVS (Jahr) */
  se: number
  /** Vorläufige SVS laut Rechner (Jahr) */
  sv: number
  /** Voraussichtliche SVS-Nachzahlung */
  nz: number
  /** Einkommensteuer (Jahr) */
  est: number
  /** Echtes Netto (Jahr) */
  net: number
  /** Rücklage SVS pro Monat */
  rs: number
  /** Rücklage ESt pro Monat */
  re: number
  /** Rücklage gesamt pro Monat */
  rg: number
  /** Steuerjahr */
  y: number
}

const LIMITS: Record<keyof RuecklagenplanPayload, [number, number]> = {
  g: [-10_000_000, 10_000_000],
  vs: [0, 1_000_000],
  se: [0, 1_000_000],
  sv: [0, 1_000_000],
  nz: [-1_000_000, 1_000_000],
  est: [0, 10_000_000],
  net: [-10_000_000, 10_000_000],
  rs: [0, 100_000],
  re: [0, 100_000],
  rg: [0, 200_000],
  y: [2020, 2035],
}

/** Validiert und normalisiert einen unbekannten Payload. Gibt null zurück, wenn ungültig. */
export function parseRuecklagenplanPayload(raw: unknown): RuecklagenplanPayload | null {
  if (typeof raw !== 'object' || raw === null) return null
  const obj = raw as Record<string, unknown>
  const out = {} as RuecklagenplanPayload
  for (const key of Object.keys(LIMITS) as (keyof RuecklagenplanPayload)[]) {
    const v = Number(obj[key])
    const [min, max] = LIMITS[key]
    if (!Number.isFinite(v) || v < min || v > max) return null
    out[key] = Math.round(v * 100) / 100
  }
  return out
}

/** Kompakte Serialisierung für Stripe-Metadata (bleibt unter 500 Zeichen). */
export function serializeRuecklagenplanPayload(payload: RuecklagenplanPayload): string {
  return JSON.stringify(payload)
}

export const RUECKLAGENPLAN_PRICE_CENTS = 4900
export const RUECKLAGENPLAN_PRODUCT_NAME = 'SVS-Rücklagenplan (PDF)'
