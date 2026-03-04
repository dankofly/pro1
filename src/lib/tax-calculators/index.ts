/**
 * Austrian Tax Calculators — Tool definitions and dispatcher.
 */

export { calculateEinkommensteuer, type EinkommensteuerInput } from './einkommensteuer'
export { calculateKoerperschaftsteuer, type KoerperschaftsteuerInput } from './koerperschaftsteuer'
export { calculateUmsatzsteuer, type UmsatzsteuerInput } from './umsatzsteuer'
export { calculateSachbezug, type SachbezugInput } from './sachbezug'
export { calculateInvestitionsfreibetrag, type InvestitionsfreibetragInput } from './investitionsfreibetrag'
export { calculateImmobilienertragssteuer, type ImmobilienertragssteuerInput } from './immobilienertragssteuer'
export { calculateKryptoSteuer, type KryptoSteuerInput } from './krypto-steuer'

import { calculateEinkommensteuer, type EinkommensteuerInput } from './einkommensteuer'
import { calculateKoerperschaftsteuer, type KoerperschaftsteuerInput } from './koerperschaftsteuer'
import { calculateUmsatzsteuer, type UmsatzsteuerInput } from './umsatzsteuer'
import { calculateSachbezug, type SachbezugInput } from './sachbezug'
import { calculateInvestitionsfreibetrag, type InvestitionsfreibetragInput } from './investitionsfreibetrag'
import { calculateImmobilienertragssteuer, type ImmobilienertragssteuerInput } from './immobilienertragssteuer'
import { calculateKryptoSteuer, type KryptoSteuerInput } from './krypto-steuer'

export const TOOL_DEFINITIONS = [
  {
    name: 'einkommensteuer_berechnen' as const,
    description:
      'Berechnet die oesterreichische Einkommensteuer 2026 basierend auf dem Bruttoeinkommen. Verwende dieses Tool wenn der User nach seiner Steuerlast, seinem Grenzsteuersatz oder seiner Einkommensteuer fragt.',
    input_schema: {
      type: 'object' as const,
      properties: {
        bruttoeinkommen: { type: 'number' as const, description: 'Jaehrliches Bruttoeinkommen in EUR' },
        abzuege: { type: 'number' as const, description: 'Werbungskosten/Betriebsausgaben in EUR' },
        kinder: { type: 'integer' as const, description: 'Anzahl der Kinder (unter 18) fuer Familienbonus Plus' },
        kinder_ueber_18: { type: 'integer' as const, description: 'Anzahl der Kinder ueber 18 Jahre' },
        alleinverdiener: { type: 'boolean' as const, description: 'Alleinverdienerabsetzbetrag anwendbar' },
        alleinerzieher: { type: 'boolean' as const, description: 'Alleinerzieherabsetzbetrag anwendbar' },
        pendlerpauschale: { type: 'number' as const, description: 'Jaehrliche Pendlerpauschale in EUR' },
      },
      required: ['bruttoeinkommen'],
    },
  },
  {
    name: 'koerperschaftsteuer_berechnen' as const,
    description:
      'Berechnet die Gesamtsteuerbelastung fuer GmbH/FlexCo (KoeSt + KESt auf Ausschuettungen). Verwende dieses Tool bei Fragen zu Unternehmensbesteuerung, Rechtsformvergleich, Thesaurierung vs. Ausschuettung.',
    input_schema: {
      type: 'object' as const,
      properties: {
        gewinn: { type: 'number' as const, description: 'Jahresgewinn vor Steuern in EUR' },
        ausschuettung_prozent: { type: 'number' as const, description: 'Anteil des Gewinns der ausgeschuettet wird (0-100)' },
        rechtsform: { type: 'string' as const, enum: ['gmbh', 'flexco', 'einzelunternehmen'], description: 'Rechtsform des Unternehmens' },
        verlustvortraege: { type: 'number' as const, description: 'Vorhandene Verlustvortraege in EUR' },
      },
      required: ['gewinn'],
    },
  },
  {
    name: 'umsatzsteuer_berechnen' as const,
    description:
      'Berechnet die Umsatzsteuer-Zahllast und prueft die Kleinunternehmerregelung. Verwende bei Fragen zu USt, Vorsteuer, Kleinunternehmer-Grenze.',
    input_schema: {
      type: 'object' as const,
      properties: {
        umsaetze: {
          type: 'array' as const,
          description: 'Liste der Umsaetze mit Bezeichnung, Nettobetrag und Steuersatz',
          items: {
            type: 'object' as const,
            properties: {
              bezeichnung: { type: 'string' as const },
              netto: { type: 'number' as const },
              steuersatz: { type: 'integer' as const, enum: [0, 10, 13, 20] },
            },
            required: ['netto', 'steuersatz'],
          },
        },
        vorsteuer: { type: 'number' as const, description: 'Vorsteuer aus Eingangsrechnungen in EUR' },
      },
      required: ['umsaetze'],
    },
  },
  {
    name: 'sachbezug_berechnen' as const,
    description:
      'Berechnet Sachbezugswerte fuer Dienstnehmer (PKW, Benefits, Essensgutscheine). Verwende bei Fragen zu Firmenwagenbesteuerung oder Mitarbeiter-Benefits.',
    input_schema: {
      type: 'object' as const,
      properties: {
        dienstwagen: {
          type: 'object' as const,
          description: 'Firmenwagen-Daten',
          properties: {
            listenpreis: { type: 'number' as const, description: 'Brutto-Listenpreis in EUR' },
            co2_emission: { type: 'integer' as const, description: 'CO2 in g/km (WLTP)' },
            ist_elektro: { type: 'boolean' as const },
            privat_km_monat: { type: 'integer' as const },
          },
        },
        benefits: {
          type: 'array' as const,
          description: 'Liste der Mitarbeiter-Benefits',
          items: {
            type: 'object' as const,
            properties: {
              typ: { type: 'string' as const },
              betrag: { type: 'number' as const },
              tage: { type: 'integer' as const },
            },
            required: ['typ'],
          },
        },
      },
    },
  },
  {
    name: 'investitionsfreibetrag_berechnen' as const,
    description:
      'Berechnet den Investitionsfreibetrag und die Forschungspraemie. Verwende bei Fragen zu Investitionsfoerderungen oder Steuerbeguenstigungen.',
    input_schema: {
      type: 'object' as const,
      properties: {
        investitionen: {
          type: 'array' as const,
          description: 'Liste der Investitionen',
          items: {
            type: 'object' as const,
            properties: {
              bezeichnung: { type: 'string' as const },
              betrag: { type: 'number' as const },
              kategorie: { type: 'string' as const, enum: ['standard', 'oeko', 'gebraucht', 'gwg', 'grundstueck', 'gebaeude', 'pkw_verbrenner', 'fossil'] },
            },
            required: ['betrag', 'kategorie'],
          },
        },
        gewinn: { type: 'number' as const, description: 'Jahresgewinn in EUR' },
        forschungsaufwendungen: { type: 'number' as const, description: 'F&E-Aufwendungen in EUR' },
      },
      required: ['investitionen'],
    },
  },
  {
    name: 'immobilienertragssteuer_berechnen' as const,
    description:
      'Berechnet die Immobilienertragsteuer bei Grundstuecksverkaeufen. Verwende bei Fragen zu Immobilienverkauf, Spekulationssteuer, Hauptwohnsitzbefreiung.',
    input_schema: {
      type: 'object' as const,
      properties: {
        kaufdatum: { type: 'string' as const, description: 'Kaufdatum (YYYY-MM-DD)' },
        kaufpreis: { type: 'number' as const, description: 'Kaufpreis in EUR' },
        verkaufspreis: { type: 'number' as const, description: 'Verkaufspreis in EUR' },
        verkaufsdatum: { type: 'string' as const, description: 'Verkaufsdatum (YYYY-MM-DD)' },
        ist_hauptwohnsitz: { type: 'boolean' as const },
        hauptwohnsitz_jahre: { type: 'number' as const },
        instandsetzungskosten: { type: 'number' as const },
        nebenkosten_kauf: { type: 'number' as const },
        nebenkosten_verkauf: { type: 'number' as const },
      },
      required: ['kaufpreis', 'verkaufspreis'],
    },
  },
  {
    name: 'krypto_steuer_berechnen' as const,
    description:
      'Berechnet die Besteuerung von Kryptowaehrungsgewinnen. Verwende bei Fragen zu Bitcoin/Krypto-Steuern, Altvermoegen, Staking.',
    input_schema: {
      type: 'object' as const,
      properties: {
        transaktionen: {
          type: 'array' as const,
          description: 'Liste der Krypto-Transaktionen',
          items: {
            type: 'object' as const,
            properties: {
              typ: { type: 'string' as const, enum: ['kauf', 'verkauf', 'tausch', 'staking', 'mining', 'airdrop'] },
              datum: { type: 'string' as const, description: 'Datum (YYYY-MM-DD)' },
              krypto: { type: 'string' as const, description: 'Kryptowaehrung (z.B. BTC, ETH)' },
              menge: { type: 'number' as const },
              preis_eur: { type: 'number' as const, description: 'Gesamtpreis in EUR' },
              krypto_von: { type: 'string' as const },
              krypto_nach: { type: 'string' as const },
              wert_eur: { type: 'number' as const },
            },
            required: ['typ', 'datum'],
          },
        },
      },
      required: ['transaktionen'],
    },
  },
]

type ToolName = typeof TOOL_DEFINITIONS[number]['name']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function executeTool(toolName: string, toolInput: Record<string, any>): string {
  try {
    switch (toolName as ToolName) {
      case 'einkommensteuer_berechnen':
        return JSON.stringify(calculateEinkommensteuer(toolInput as EinkommensteuerInput))
      case 'koerperschaftsteuer_berechnen':
        return JSON.stringify(calculateKoerperschaftsteuer(toolInput as KoerperschaftsteuerInput))
      case 'umsatzsteuer_berechnen':
        return JSON.stringify(calculateUmsatzsteuer(toolInput as UmsatzsteuerInput))
      case 'sachbezug_berechnen':
        return JSON.stringify(calculateSachbezug(toolInput as SachbezugInput))
      case 'investitionsfreibetrag_berechnen':
        return JSON.stringify(calculateInvestitionsfreibetrag(toolInput as InvestitionsfreibetragInput))
      case 'immobilienertragssteuer_berechnen':
        return JSON.stringify(calculateImmobilienertragssteuer(toolInput as ImmobilienertragssteuerInput))
      case 'krypto_steuer_berechnen':
        return JSON.stringify(calculateKryptoSteuer(toolInput as KryptoSteuerInput))
      default:
        return JSON.stringify({ error: `Unbekanntes Tool: ${toolName}` })
    }
  } catch (err) {
    return JSON.stringify({ error: `Tool-Fehler: ${err instanceof Error ? err.message : String(err)}` })
  }
}
