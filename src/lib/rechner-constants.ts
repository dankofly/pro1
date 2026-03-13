import type { Versicherungsart } from './rechner-types'

export const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

export const VERSICHERUNGSARTEN: { value: Versicherungsart; label: string; desc: string }[] = [
  { value: 'gsvg_gewerbe', label: 'Gewerbetreibender (GSVG)', desc: 'Gewerbe, Handel, Handwerk' },
  { value: 'gsvg_neu', label: 'Neuer Selbständiger (GSVG)', desc: 'Freiberufler, Werkvertrag, IT' },
  { value: 'fsvg_arzt', label: 'Arzt (FSVG)', desc: 'Ärztekammer-Mitglied' },
  { value: 'fsvg_patent', label: 'Apotheker / Patentanwalt / ZT (FSVG)', desc: 'Freier Beruf mit Kammermitgliedschaft' },
  { value: 'bsvg', label: 'Land- & Forstwirt (BSVG)', desc: 'Bauern-Sozialversicherung' },
]
