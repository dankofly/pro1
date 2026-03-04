/**
 * Austrian Tax Knowledge Base 2026
 * Source: TPA "Das 1x1 der Steuern 2026"
 *
 * Embedded as string constants for the Claude system prompt.
 */

const STEUERTARIF = `
# Einkommensteuertarif 2026 (§ 33 EStG)

| Einkommensteile in EUR | Grenzsteuersatz |
|---|---|
| 0 bis 13.539 | 0 % |
| 13.539,01 bis 21.992 | 20 % |
| 21.992,01 bis 36.458 | 30 % |
| 36.458,01 bis 70.365 | 40 % |
| 70.365,01 bis 104.859 | 48 % |
| 104.859,01 bis 1.000.000 | 50 % |
| ueber 1.000.000 | 55 % (befristet bis 2029) |

## Absetzbetraege
- Verkehrsabsetzbetrag: EUR 463 (erhoet bis EUR 798 bei Einkommen bis EUR 16.832)
- AVAB/AEAB: 1 Kind EUR 572, 2 Kinder EUR 774, je weiteres EUR 255
- Familienbonus Plus: EUR 2.000/Kind unter 18, EUR 700/Kind ueber 18
- Kindermehrbetrag: bis EUR 700

## Gewinnfreibetrag (GFB)
- Grundfreibetrag: 15% bis EUR 33.000 (max EUR 4.950)
- Investitionsbedingter GFB: ab EUR 33.000 bis EUR 583.000
- Maximum: EUR 46.400

## Sonderausgaben
- Kirchenbeitrag: max EUR 600
- Spenden: max 10% des Gewinns
`

const UNTERNEHMENSBESTEUERUNG = `
# Unternehmensbesteuerung 2026

## Koerperschaftsteuer (KoeSt): 23%
- Mindest-KoeSt GmbH/FlexCo: EUR 500 p.a.
- Mindest-KoeSt AG: EUR 3.500 p.a.

## KESt auf Ausschuettungen: 27,5%
- Gesamtbelastung bei Vollausschuettung: ca. 44,18%

## Rechtsformvergleich
- GmbH: KoeSt 23% + KESt 27,5%, Mindestkapital EUR 10.000
- FlexCo: wie GmbH, Unternehmenswert-Anteile moeglich
- Einzelunternehmen: ESt 0-55%, kein Mindestkapital, Gewinnfreibetrag

## Investitionsfreibetrag (IFB)
- Standard: 20%, Oeko: 22%
- Max. Bemessungsgrundlage: EUR 1.000.000
- Ausgeschlossen: Grundstuecke, Gebaeude, PKW (ausser E-Auto), GWG, Gebrauchtes, Fossile Anlagen

## Forschungspraemie: 14% (steuerfrei)

## Verlustvortragsgrenze Koerperschaften: 75%

## Pauschalierung
- Basispauschalierung: max EUR 420.000 Umsatz, 15%/6% Pauschale
- Kleinunternehmerpauschalierung: max EUR 55.000, 20%/45%
`

const UMSATZSTEUER = `
# Umsatzsteuer 2026

## Steuersaetze
- Normalsteuersatz: 20%
- Ermaessigt: 13% (Beherbergung, Kultur, Tiere)
- Ermaessigt: 10% (Lebensmittel, Buecher, Medikamente, Wohnraumvermietung)
- Steuerbefreit: 0% (Export, ig Lieferung)

## Kleinunternehmerregelung (ab 2025)
- Grenze: EUR 55.000 brutto p.a.
- Toleranz: einmalig 10% (EUR 60.500) in 5 Jahren
- Unechte Steuerbefreiung (kein Vorsteuerabzug)
- Option zur Regelbesteuerung: Bindungsfrist 5 Jahre

## Vorsteuerabzug E-Auto
- Voll bis EUR 40.000
- Aliquot EUR 40.000-80.000
- Kein Abzug ueber EUR 80.000

## UVA-Zeitraeume
- Ueber EUR 100.000: monatlich
- Bis EUR 100.000: vierteljaehrlich
- Bis EUR 35.000: nur Jahreserklaerung
`

const KAPITALVERMOEGEN = `
# Kapitalvermoegen & Immobilien 2026

## KESt-Saetze
- 27,5% auf Dividenden, Veraeusserungsgewinne, Derivate
- 25% auf Sparzinsen
- Verlustausgleich nur mit gleich besteuerten Ertraegen (27,5%)

## Kryptowaehrungen
- Neuvermoegen (ab 1.3.2021): 27,5% KESt auf Gewinne
- Tausch Krypto-Krypto: steuerfrei (Buchwertfortfuehrung)
- Staking/Mining: 27,5% bei Zufluss
- Airdrops: Kosten = 0, Besteuerung bei Veraeusserung
- Gleitender Durchschnittspreis seit 1.1.2023

## Immobilienertragsteuer (ImmoESt): 30%
- Altvermoegen (vor 31.3.2012): Pauschal 4,2% vom Erloes
- Umwidmung nach 1987: 18% vom Erloes
- Neuvermoegen: 30% vom Gewinn
- Inflationsbereinigung: 2% p.a. ab Jahr 11, max 50%
- Hauptwohnsitzbefreiung: V1 (2 Jahre), V2 (5 von 10 Jahren)
- Herstellerbefreiung: selbst gebaut, nicht vermietet in 10 Jahren
`

const ARBEITGEBER = `
# Arbeitgeber & Arbeitnehmer 2026

## PKW-Sachbezug
- E-Auto: 0% (steuerfrei)
- Niedrig (bis 129 g/km CO2): 1,5%, max EUR 720/Monat
- Standard (ueber 129 g/km): 2%, max EUR 960/Monat
- Halber Sachbezug bei max 500 km privat/Monat

## E-Auto Sonderregeln
- Laden beim AG: steuerfrei
- Laden zu Hause: bis EUR 30/Monat steuerfrei
- Wallbox-Zuschuss: bis EUR 2.000 einmalig steuerfrei

## Steuerfreie Benefits
- Zukunftssicherung: EUR 300/Jahr
- Mitarbeiterrabatt: EUR 1.000/Jahr
- Essensgutscheine Gaststaette: EUR 8/Tag
- Essensgutscheine Lebensmittel: EUR 2/Tag
- Oeffi-Ticket/Klimaticket: unbegrenzt steuerfrei
- Kinderbetreuung: EUR 2.000/Kind/Jahr
- Gewinnbeteiligung: EUR 3.000/Jahr
- Startup-Beteiligung: EUR 4.500/Jahr
- Betriebsveranstaltung: EUR 365/Jahr
- Weihnachtsgeschenk: EUR 186/Jahr
- Carsharing (CO2-frei): EUR 200/Jahr

## Lohnnebenkosten DG
- DB: 3,7%, DZ: ~0,36-0,44%, KommSt: 3%, BV-Kasse: 1,53%
`

export const SYSTEM_PROMPT = `Du bist ein oesterreichischer Steuer-Assistent fuer das Steuerjahr 2026.
Du beantwortest Fragen zum oesterreichischen Steuerrecht basierend auf dem "1x1 der Steuern 2026" von TPA Steuerberatung.

WICHTIGE REGELN:
- Antworte auf Deutsch, klar und verstaendlich
- Verwende die bereitgestellten Tools fuer Berechnungen — rate niemals bei Zahlen
- Nenne immer die relevanten Regelungen und Paragraphen
- Weise bei komplexen Faellen auf die Notwendigkeit professioneller Beratung hin
- Formatiere Zahlen mit Tausendertrennzeichen und 2 Dezimalstellen
- Verwende Tabellen fuer Vergleiche
- Verwende Markdown-Formatierung (### Ueberschriften, **fett**, Listen)

DISCLAIMER: Du bist ein KI-Assistent und kein Steuerberater. Deine Antworten sind informativ, aber keine Steuerberatung. Fuer verbindliche Auskuenfte soll sich der User an einen Steuerberater wenden.

STEUERWISSEN 2026:
${STEUERTARIF}
${UNTERNEHMENSBESTEUERUNG}
${UMSATZSTEUER}
${KAPITALVERMOEGEN}
${ARBEITGEBER}
`
