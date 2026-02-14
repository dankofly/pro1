/**
 * Zentrale Feld-Erklärungen für alle Eingabefelder im Rechner.
 * Wird zusammen mit der <FieldInfo> Komponente verwendet.
 */
export const FIELD_DEFS = {
  // ── Onboarding ─────────────────────────────────────
  gruendungsMonat:
    'Der Monat deiner Gewerbeanmeldung. Relevant für die anteilige Berechnung der SVS-Beiträge im Gründungsjahr.',
  gruendungsJahr:
    'Das Jahr deiner Gewerbeanmeldung. In den ersten 2 Kalenderjahren nach Gründung gelten vergünstigte SVS-Mindestbeiträge (Jungunternehmer-Regelung).',
  jungunternehmer:
    'In den ersten 2 Kalenderjahren nach Gründung zahlst du deutlich reduzierte SVS-Mindestbeiträge (§ 25a GSVG). Die fixe Mindestbeitragsgrundlage entfällt.',
  versicherungsart:
    'Deine Pflichtversicherung hängt von deiner Kammerzugehörigkeit ab. GSVG gilt für Gewerbetreibende und Neue Selbständige, FSVG für Ärzte, Apotheker und Ziviltechniker.',

  // ── Umsatz & Aufwände ─────────────────────────────
  jahresumsatz:
    'Dein gesamter Jahresumsatz netto, also ohne Umsatzsteuer. Grundlage für die Gewinnberechnung und für Pauschalierungsgrenzen.',
  aufwaendeGesamt:
    'Alle Betriebsausgaben zusammengefasst. Wird vom Umsatz abgezogen, um deinen steuerlichen Gewinn zu ermitteln.',
  personalkosten:
    'Kosten für Angestellte, Freelancer oder Subunternehmer. Voll absetzbar als Betriebsausgabe.',
  wareneinkauf:
    'Kosten für Rohstoffe, Waren oder Material. Direkte Aufwände deiner Leistungserbringung.',
  reisekosten:
    'Geschäftsreisen, Fahrtkosten und Diäten. Es gilt das amtliche Kilometergeld (0,42 EUR/km) oder Einzelbelege.',
  arbeitsplatzpauschale:
    'Pauschalbeträge für dein Heimbüro: Klein (300 EUR/Jahr) wenn du auch einen anderen Arbeitsplatz hast, Groß (1.200 EUR/Jahr) bei ausschließlichem Heimbüro.',
  oepnvPauschale:
    'Kosten für öffentliche Verkehrsmittel (Jahreskarte, Einzeltickets). 50% davon sind als Betriebsausgabe absetzbar.',
  sonstigeAufwaende:
    'Alle weiteren Betriebsausgaben: Versicherungen, Telefon, Internet, Fachliteratur, Fortbildung, Werbung, Büromaterial etc.',

  // ── Investitionen (Pro) ────────────────────────────
  einrichtung:
    'Büromöbel, Schreibtische, Regale und sonstige Einrichtungsgegenstände. Abschreibung (AfA) über 8 Jahre, linear oder degressiv.',
  edv:
    'Computer, Laptops, Software, Drucker und IT-Ausstattung. Abschreibung über 4 Jahre. Geringwertige Wirtschaftsgüter (GWG) unter 1.000 EUR sind sofort absetzbar.',
  maschinen:
    'Maschinen, Werkzeuge und Fahrzeuge. Abschreibung über 8 Jahre. Ab 1.000 EUR Anschaffungskosten besteht Aktivierungspflicht.',

  // ── Pauschalierung (Pro) ───────────────────────────
  pauschalierungArt:
    'Statt tatsächlicher Betriebsausgaben kannst du pauschal einen Prozentsatz vom Umsatz abziehen. Vereinfacht die Buchführung erheblich und lohnt sich, wenn deine realen Kosten niedrig sind.',

  // ── Vorauszahlungen ────────────────────────────────
  svVorauszahlung:
    'Deine aktuelle SVS-Vorschreibung pro Jahr. Die SVS berechnet diese auf Basis deines Gewinns vor 3 Jahren (vorläufige Beitragsgrundlage). Wird nach dem Steuerbescheid nachträglich korrigiert.',
  svNachzahlungVorjahr:
    'Falls du bereits eine SVS-Nachzahlung aus dem Vorjahr erhalten hast. Hilft bei der Liquiditätsplanung und der Berechnung deiner tatsächlichen Gesamtbelastung.',
  estVorauszahlung:
    'Vom Finanzamt festgesetzte Einkommensteuer-Vorauszahlung pro Jahr. Basiert auf deinem letzten Steuerbescheid und wird vierteljährlich fällig.',

  // ── Weitere Einkünfte (Pro) ────────────────────────
  bruttoEntgeltMonatlich:
    'Wenn du neben der Selbständigkeit auch angestellt bist: dein Brutto-Monatsgehalt. Erhöht die Einkommensteuer-Bemessungsgrundlage durch den Progressionsvorbehalt.',
  vermietungsEinkuenfte:
    'Netto-Einkünfte aus Vermietung und Verpachtung pro Jahr (nach Abzug von Werbungskosten). Fließen in die Gesamteinkünfte für die Einkommensteuerberechnung ein.',

  // ── GmbH-Vergleich (Pro) ──────────────────────────
  gmbhAktiv:
    'Aktiviert den Vergleich zwischen Einzelunternehmen und GmbH. Zeigt die Gesamtbelastung bei einer GmbH-Struktur (Körperschaftsteuer + Kapitalertragsteuer + Sozialversicherung).',
  gfGehaltMonatlich:
    'Das Brutto-Gehalt, das du dir als Geschäftsführer auszahlen würdest (14× jährlich inkl. Urlaubs- und Weihnachtsgeld). Beeinflusst die optimale Aufteilung zwischen Gehalt und Gewinnausschüttung.',

  // ── Gewinnmaximierer (Pro) ─────────────────────────
  zusatzEinnahmen:
    'Simuliere einen zusätzlichen Auftrag oder ein Projekt. Der Rechner zeigt dir, wie viel davon nach SVS und Einkommensteuer netto bei dir ankommt.',
  zusatzAufwaende:
    'Kosten, die durch den Zusatzauftrag entstehen (Material, Reise, Subunternehmer). Werden vor der SVS- und ESt-Berechnung abgezogen.',

  // ── Steuer-Optimierung (Pro) ──────────────────────
  kinderUnter18:
    'Familienbonus Plus für Kinder unter 18: Wird direkt von deiner Steuerschuld abgezogen (nicht vom Gewinn). Aktueller Betrag wird je nach Steuerjahr berechnet.',
  kinderUeber18:
    'Familienbonus Plus für volljährige Kinder in Ausbildung. Der Betrag ist reduziert gegenüber Kindern unter 18 Jahren.',
  alleinverdiener:
    'Alleinverdiener-Absetzbetrag (AVAB) oder Alleinerzieher-Absetzbetrag (AEAB). Voraussetzung: mindestens 1 Kind und Partner unter der Einkommensgrenze.',
  pendlerKm:
    'Einfache Wegstrecke zwischen Wohnung und Arbeitsstätte in Kilometern. Ab 20 km gibt es die kleine Pendlerpauschale, ab 2 km bei fehlender Öffi-Verbindung die große Pendlerpauschale.',
} as const
