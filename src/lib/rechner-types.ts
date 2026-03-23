// ============================================================
// Rechner Master Types – WKO-Komplett-Rechner
// Alle Interfaces für Input, State und Ergebnisse
// ============================================================

import type { TaxYear } from './tax-constants'
import type { SvsResult, SteuerTipp } from './svs-calculator'

// ── Stammdaten ──────────────────────────────────────────────

export type Versicherungsart = 'gsvg_gewerbe' | 'gsvg_neu' | 'fsvg_arzt' | 'fsvg_patent' | 'bsvg'

export interface Stammdaten {
  gruendungsMonat: number   // 1-12
  gruendungsJahr: number    // 2010-2026
  jungunternehmer: boolean
  versicherungsart: Versicherungsart
}

// ── Aufwände ────────────────────────────────────────────────

export type ArbeitsplatzpauschaleType = 'keine' | 'klein' | 'gross'

export interface AufwaendeBreakdown {
  personalkosten: number
  wareneinkauf: number
  reisekosten: number
  arbeitsplatzpauschale: ArbeitsplatzpauschaleType
  oepnvPauschale: number
  sonstigeAufwaende: number
}

// ── Investitionen ───────────────────────────────────────────

export type AfaMethode = 'linear' | 'degressiv'

export interface InvestitionenInput {
  einrichtung: number
  einrichtungMethode: AfaMethode
  edv: number
  edvMethode: AfaMethode
  maschinen: number
  maschinenMethode: AfaMethode
}

// ── Pauschalierung ──────────────────────────────────────────

export type PauschalierungArt =
  | 'keine'
  | 'basis_12'   // 12% (allgemein, ab 2025)
  | 'basis_6'    // 6% (bestimmte Berufe)
  | 'ku_produzent'     // 45% (KU-Pauschalierung produzierend)
  | 'ku_dienstleister' // 20% (KU-Pauschalierung Dienstleistung)

// ── GmbH ────────────────────────────────────────────────────

export interface GmbhInput {
  aktiv: boolean
  gfGehaltMonatlich: number
}

// ── Gewinnmaximierer ────────────────────────────────────────

export interface GewinnmaximiererInput {
  zusatzEinnahmen: number
  zusatzAufwaende: number
}

// ── Vorauszahlungen ─────────────────────────────────────────

export interface VorauszahlungenInput {
  svVorauszahlung: number
  svNachzahlungVorjahr: number
  estVorauszahlung: number
}

// ── Weitere Einkünfte ───────────────────────────────────────

export interface WeitereEinkuenfteInput {
  bruttoEntgeltMonatlich: number
  vermietungsEinkuenfte: number
}

// ── USt / Kleinunternehmerregelung ──────────────────────────

export interface UstInput {
  ustPflichtig: boolean        // true = Regelbesteuerung, false = KUR
  vorsteuerJaehrlich: number   // Geschätzte Vorsteuer auf Einkäufe
  ustSatz: number              // 0.20 | 0.10 | 0.13
  b2bAnteil: number            // 0-100 (%) für Empfehlungslogik
}

export interface UstResult {
  kurBerechtigt: boolean       // Umsatz <= €55.000
  kurToleranz: boolean         // €55.000 < Umsatz <= €60.500
  // Szenario KUR
  kurNetto: number
  kurVorsteuerVerlust: number
  // Szenario Regel
  ustBrutto: number
  ustEinnahmen: number
  vorsteuerAbzug: number
  ustZahllast: number
  regelNetto: number
  // Vergleich
  vorteilKur: number           // positiv = KUR besser
  kurVorteilhaft: boolean
  zahllastMonatlich: number
  zahllastQuartal: number
  // Empfehlung
  empfehlung: 'kur' | 'regel'
  empfehlungGrund: string
}

// ── ProOptions ──────────────────────────────────────────────

export interface ProOptionsInput {
  kinderUnter18: number
  kinderUeber18: number
  alleinverdiener: boolean
  pendlerKm: number
  pendlerOeffentlich: boolean
}

// ── Master Input ────────────────────────────────────────────

export interface RechnerInput {
  // Stammdaten (aus Onboarding)
  stammdaten: Stammdaten

  // Kern
  year: TaxYear
  jahresumsatz: number

  // Aufwände
  aufwaende: AufwaendeBreakdown
  aufwaendeGesamt: number         // Manuelle Gesamtsumme (wenn nicht aufgeschlüsselt)
  aufwaendeDetailed: boolean      // true = Breakdown verwenden

  // Investitionen
  investitionen: InvestitionenInput

  // Pauschalierung
  pauschalierungArt: PauschalierungArt

  // GmbH
  gmbh: GmbhInput

  // Gewinnmaximierer
  gewinnmaximierer: GewinnmaximiererInput

  // Vorauszahlungen
  vorauszahlungen: VorauszahlungenInput

  // Weitere Einkünfte
  weitereEinkuenfte: WeitereEinkuenfteInput

  // ProOptions (Absetzbeträge)
  proOptions: ProOptionsInput

  // USt / Kleinunternehmerregelung
  ust: UstInput
}

// ── Computed Results ────────────────────────────────────────

export interface AfaResult {
  einrichtungJahr: number
  edvJahr: number
  maschinenJahr: number
  gesamt: number
}

export interface PauschalierungResult {
  art: PauschalierungArt
  pauschalAufwaende: number
  gewinnPauschal: number
  svsResult: SvsResult
  echtesNettoPauschal: number
  differenzZuStandard: number
  vorteilhaft: boolean
}

export interface GmbhWarnung {
  typ: 'kosten' | 'info'
  text: string
}

export interface GmbhResult {
  gewinnVorKoest: number
  koest: number
  gewinnNachKoest: number
  gfGehaltBrutto: number
  gfSv: number
  gfLohnsteuer: number
  gfNetto: number
  lohnnebenkosten: number       // DB + DZ + KommSt auf GF-Bezug
  personalAufwandGesamt: number  // GF-Bezug + Lohnnebenkosten
  minKoest: number               // Mindest-KöSt (500€ GmbH / 250€ FlexKapG)
  ausschuettung: number
  kapest: number
  gesamtNetto: number
  differenzZuEpu: number
  vorteilhaft: boolean
  warnungen: GmbhWarnung[]
}

export interface GewinnmaximiererResult {
  umsatzMit: number
  aufwaendeMit: number
  gewinnMit: number
  svsResult: SvsResult
  nettoMit: number
  nettoDifferenz: number
  abgabenquoteZusatz: number
}

export interface VorauszahlungenResult {
  svMonatlich: number
  svJaehrlich: number
  svDifferenz: number
  estQuartal: number
  estJaehrlich: number
  estDifferenz: number
}

export interface RuecklagenResult {
  svsMonatlich: number
  estMonatlich: number
  ustMonatlich: number
  gesamtMonatlich: number
  estQuartal: number
  svsJaehrlich: number
  estJaehrlich: number
  ustJaehrlich: number
  ruecklagenQuote: number
  freiesNettoMonatlich: number
}

export interface RechnerResult {
  // Kern-Werte
  umsatz: number
  aufwaendeEffektiv: number
  gewinn: number

  // SVS + ESt (Haupt-Berechnung)
  svs: SvsResult

  // AfA
  afa: AfaResult

  // Pauschalierung (nur wenn aktiv)
  pauschalierung: PauschalierungResult | null

  // GmbH Vergleich (nur wenn aktiv)
  gmbh: GmbhResult | null

  // Gewinnmaximierer (nur wenn Werte > 0)
  gewinnmaximierer: GewinnmaximiererResult | null

  // Vorauszahlungen
  vorauszahlungen: VorauszahlungenResult

  // Steuer-Tipps
  steuerTipps: SteuerTipp

  // USt / KUR
  ustResult: UstResult

  // Rücklagen
  ruecklagen: RuecklagenResult

  // Meta
  year: TaxYear
}

// ── Reducer Actions ─────────────────────────────────────────

export type RechnerAction =
  | { type: 'SET_FIELD'; field: keyof RechnerInput; value: unknown }
  | { type: 'SET_STAMMDATEN'; field: keyof Stammdaten; value: unknown }
  | { type: 'SET_AUFWAND'; field: keyof AufwaendeBreakdown; value: unknown }
  | { type: 'SET_INVESTITION'; field: keyof InvestitionenInput; value: unknown }
  | { type: 'SET_GMBH'; field: keyof GmbhInput; value: unknown }
  | { type: 'SET_GEWINNMAXIMIERER'; field: keyof GewinnmaximiererInput; value: unknown }
  | { type: 'SET_VORAUSZAHLUNG'; field: keyof VorauszahlungenInput; value: unknown }
  | { type: 'SET_WEITERE_EINKUENFTE'; field: keyof WeitereEinkuenfteInput; value: unknown }
  | { type: 'SET_PRO_OPTION'; field: keyof ProOptionsInput; value: unknown }
  | { type: 'SET_UST'; field: keyof UstInput; value: unknown }
  | { type: 'COMPLETE_ONBOARDING'; stammdaten: Stammdaten }
  | { type: 'RESET' }
  | { type: 'LOAD_SAVED'; input: RechnerInput }
  | { type: 'LOAD_PRESET'; preset: Partial<RechnerInput> }

// ── Default Values ──────────────────────────────────────────

export const DEFAULT_STAMMDATEN: Stammdaten = {
  gruendungsMonat: 1,
  gruendungsJahr: 2024,
  jungunternehmer: false,
  versicherungsart: 'gsvg_gewerbe',
}

export const DEFAULT_AUFWAENDE: AufwaendeBreakdown = {
  personalkosten: 0,
  wareneinkauf: 0,
  reisekosten: 0,
  arbeitsplatzpauschale: 'keine',
  oepnvPauschale: 0,
  sonstigeAufwaende: 0,
}

export const DEFAULT_INVESTITIONEN: InvestitionenInput = {
  einrichtung: 0,
  einrichtungMethode: 'linear',
  edv: 0,
  edvMethode: 'linear',
  maschinen: 0,
  maschinenMethode: 'linear',
}

export const DEFAULT_RECHNER_INPUT: RechnerInput = {
  stammdaten: DEFAULT_STAMMDATEN,
  year: '2025',
  jahresumsatz: 80000,
  aufwaende: DEFAULT_AUFWAENDE,
  aufwaendeGesamt: 0,
  aufwaendeDetailed: false,
  investitionen: DEFAULT_INVESTITIONEN,
  pauschalierungArt: 'keine',
  gmbh: { aktiv: false, gfGehaltMonatlich: 3000 },
  gewinnmaximierer: { zusatzEinnahmen: 0, zusatzAufwaende: 0 },
  vorauszahlungen: { svVorauszahlung: 0, svNachzahlungVorjahr: 0, estVorauszahlung: 0 },
  weitereEinkuenfte: { bruttoEntgeltMonatlich: 0, vermietungsEinkuenfte: 0 },
  proOptions: {
    kinderUnter18: 0,
    kinderUeber18: 0,
    alleinverdiener: false,
    pendlerKm: 0,
    pendlerOeffentlich: true,
  },
  ust: { ustPflichtig: false, vorsteuerJaehrlich: 0, ustSatz: 0.20, b2bAnteil: 0 },
}
