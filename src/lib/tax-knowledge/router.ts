import type { ChapterId } from './index'

const CHAPTER_KEYWORDS: Record<ChapterId, string[]> = {
  'A-einfuehrung': [
    'steuerrecht', 'abgabe', 'steuerarten', 'rechtsquelle', 'steuerwissenschaft',
    'abgabenquote', 'steuerklassifikation', 'einteilung der steuern',
  ],
  'B-finanzverfassung': [
    'finanzverfassung', 'finanzausgleich', 'kompetenzverteilung', 'abgabenhoheit',
    'ertragshoheit', 'verwaltungshoheit', 'f-vg',
  ],
  'C-einkommensteuer': [
    'einkommensteuer', 'est', 'estg', 'lohnsteuer', 'tarifstufe', 'steuertarif',
    'absetzbetr', 'freibetrag', 'sonderausgab', 'werbungskosten', 'einkünfte',
    'gewinnermittlung', 'einnahmen-ausgaben', 'betriebsausgab', 'verlust',
    'pendlerpauschale', 'familienbonus', 'alleinverdiener', 'alleinerzieher',
    'sechstel', '13. gehalt', '14. gehalt', 'abfertigung', 'gewinnfreibetrag',
    'pauschalierung', 'einkunftsart', 'selbständig', 'nichtselbständig',
    'vermietung', 'kapitalvermögen', 'grundstück', 'spekulationsgeschäft',
    'liebhaberei', 'betriebsveräußerung', 'betriebsaufgabe',
  ],
  'D-koerperschaftsteuer': [
    'körperschaftsteuer', 'köst', 'kstg', 'gmbh', 'flexco', 'aktiengesellschaft',
    'kapitalgesellschaft', 'thesaurierung', 'ausschüttung', 'dividende',
    'mindestkörperschaftsteuer', 'verdeckte ausschüttung', 'verdeckte gewinnausschüttung',
    'gruppenbesteuerung', 'mantelkauf', 'verlustverrechnung',
    'privatstiftung', 'genossenschaft', 'verein',
  ],
  'E-internationales': [
    'international', 'dba', 'doppelbesteuerung', 'betriebsstätte', 'quellensteuer',
    'ansässigkeit', 'oecd', 'musterabkommen', 'verrechnungspreis', 'transfer pricing',
    'beschränkte steuerpflicht', 'unbeschränkte steuerpflicht', 'wegzugsbesteuerung',
  ],
  'F-umsatzsteuer': [
    'umsatzsteuer', 'ust', 'ustg', 'vorsteuer', 'mehrwertsteuer', 'mwst',
    'kleinunternehmer', 'reverse charge', 'innergemeinschaftlich', 'ig-lieferung',
    'ig-erwerb', 'einfuhrumsatzsteuer', 'steuerbar', 'steuerfrei', 'steuerpflichtig',
    'lieferung', 'sonstige leistung', 'leistungsort', 'bemessungsgrundlage',
    'rechnung', 'rechnungslegung', 'registrierkasse', 'belegerteilungspflicht',
    'dreiecksgeschäft', 'reihengeschäft', 'differenzbesteuerung',
  ],
  'G-verkehrsteuern': [
    'grunderwerbsteuer', 'grest', 'verkehrsteuer', 'gesellschaftsteuer',
    'versicherungssteuer', 'feuerschutzsteuer', 'stiftungseingangssteuer',
    'motorbezogene versicherungssteuer', 'nova', 'normverbrauchsabgabe',
    'grundstückserwerb', 'liegenschaft',
  ],
  'H-verfassung': [
    'verfassungsrecht', 'gleichheitssatz', 'legalitätsprinzip', 'eigentumsschutz',
    'grundrechte', 'besteuerungsrecht', 'verfassungsgerichtshof', 'vfgh',
  ],
  'I-finanzbehoerden': [
    'finanzamt', 'finanzbehörde', 'avog', 'zuständigkeit', 'finanzpolizei',
    'bundesfinanzgericht', 'bfg', 'abgabenbehörde', 'großbetriebsprüfung',
  ],
  'J-verfahrensrecht': [
    'bao', 'bundesabgabenordnung', 'abgabenverfahren', 'steuererklärung',
    'abgabenerklärung', 'bescheid', 'berufung', 'beschwerde', 'rechtsmittel',
    'betriebsprüfung', 'außenprüfung', 'selbstanzeige', 'verjährung',
    'festsetzungsverjährung', 'einhebungsverjährung', 'stundung', 'nachsicht',
    'veranlagung', 'vorauszahlung', 'anspruchszinsen', 'säumniszuschlag',
    'zustellung', 'wiederaufnahme', 'wiedereinsetzung',
  ],
  'K-rechtsanwendung': [
    'rechtsanwendung', 'auslegung', 'analogie', 'teleologische reduktion',
    'missbrauch', 'umgehung', 'wirtschaftliche betrachtungsweise',
    'substance over form',
  ],
  'L-finanzstrafrecht': [
    'finanzstrafrecht', 'finanzstrafgesetz', 'finstrag', 'steuerhinterziehung',
    'abgabenhinterziehung', 'finanzordnungswidrigkeit', 'schmuggel',
    'selbstanzeige', 'strafbefreiend', 'geldstrafe', 'freiheitsstrafe',
    'finanzstrafbehörde', 'finanzstrafverfahren',
  ],
}

/**
 * Routes a user question to the most relevant 1-2 chapters.
 * Returns chapter IDs sorted by relevance (highest first).
 */
export function routeToChapters(question: string, maxChapters = 2): ChapterId[] {
  const q = question.toLowerCase()

  const scores: { id: ChapterId; score: number }[] = []

  for (const [chapterId, keywords] of Object.entries(CHAPTER_KEYWORDS)) {
    let score = 0
    for (const kw of keywords) {
      if (q.includes(kw)) {
        // Longer keywords get higher scores (more specific)
        score += kw.length
      }
    }
    if (score > 0) {
      scores.push({ id: chapterId as ChapterId, score })
    }
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score)

  // Return top N chapters
  const result = scores.slice(0, maxChapters).map(s => s.id)

  // Fallback: if no match, return Einführung
  if (result.length === 0) {
    result.push('A-einfuehrung')
  }

  return result
}
