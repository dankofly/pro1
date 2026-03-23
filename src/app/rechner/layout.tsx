import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'SVS Rechner 2026 — Beiträge, Nachzahlung & Netto berechnen | SteuerBoard.pro',
  description:
    'Kostenloser SVS Rechner für Selbständige in Österreich. SVS-Beiträge 2026 berechnen, Nachzahlung prognostizieren und echtes Netto erfahren.',
  alternates: { canonical: '/rechner' },
  openGraph: {
    title: 'SVS Rechner 2026 — Beiträge, Nachzahlung & Netto berechnen | SteuerBoard.pro',
    description: 'Kostenloser SVS Rechner für Selbständige in Österreich. SVS-Beiträge 2026 berechnen, Nachzahlung prognostizieren und echtes Netto erfahren.',
    url: '/rechner',
  },
}

const RECHNER_FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was berechnet der SVS-Beitragsrechner von SteuerBoard.pro?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der Rechner ermittelt auf Basis des Jahresgewinns die SVS-Beiträge aufgeschlüsselt nach Pensionsversicherung (18,50 %), Krankenversicherung (6,80 %), Selbständigenvorsorge (1,53 %) und Unfallversicherung. Zusätzlich berechnet er die Einkommensteuer nach dem progressiven Tarif (§ 33 EStG), die voraussichtliche SVS-Nachzahlung und das echte Netto.' },
    },
    {
      '@type': 'Question',
      name: 'Worin unterscheidet sich dieser Rechner vom WKO SVS-Rechner?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der WKO SVS-Beitragsrechner liefert nur die SVS-Beiträge. SteuerBoard.pro berechnet zusätzlich die Einkommensteuer-Prognose, die voraussichtliche Nachzahlung, das Geldfluss-Diagramm, die Wahrheits-Tabelle mit vorläufigen vs. endgültigen Beiträgen und monatliche Rücklagen-Empfehlungen. Außerdem bietet SteuerBoard einen AI SteuerBoard, GmbH-Vergleich und 7 weitere Steuerrechner.' },
    },
    {
      '@type': 'Question',
      name: 'Was ist die SVS-Nachzahlungsfalle?',
      acceptedAnswer: { '@type': 'Answer', text: 'Die SVS berechnet Beiträge zunächst vorläufig auf Basis des Gewinns von vor 3 Jahren (§ 25a GSVG). Bei steigendem Einkommen entsteht nach dem Steuerbescheid eine Nachzahlung. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann diese über 5.000 EUR betragen. SteuerBoard zeigt die exakte Differenz zwischen vorläufigen und endgültigen Beiträgen.' },
    },
    {
      '@type': 'Question',
      name: 'Für welche Steuerjahre funktioniert der SVS-Rechner?',
      acceptedAnswer: { '@type': 'Answer', text: 'Der Rechner unterstützt 2024, 2025 und 2026 mit aktuellen Werten: SVS-Beitragssätze, Einkommensteuertarif, Gewinnfreibetrag, Familienbonus Plus (2.100 EUR ab 2026), AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR) und Kleinunternehmergrenze (55.000 EUR).' },
    },
  ],
}

export default function RechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SteuerBoard.pro Beitragsrechner',
        url: 'https://steuerboard.pro/rechner',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne deine SVS-Beiträge, Nachzahlung und echtes Netto als Selbständiger in Österreich.',
        inLanguage: 'de-AT',
      }} />
      <JsonLd data={RECHNER_FAQ_JSONLD} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'SVS-Beiträge und Nachzahlung berechnen',
        description: 'So berechnest du deine SVS-Beiträge, die voraussichtliche Nachzahlung und dein echtes Netto als Selbständiger in Österreich.',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Jahresgewinn eingeben',
            text: 'Gib deinen Jahresumsatz und deine Betriebsausgaben ein. Der Rechner ermittelt deinen Gewinn automatisch.',
          },
          {
            '@type': 'HowToStep',
            name: 'Steuerjahr wählen',
            text: 'Wähle das Steuerjahr (2024, 2025 oder 2026) für die Berechnung mit den aktuellen Werten.',
          },
          {
            '@type': 'HowToStep',
            name: 'SVS-Beiträge und Nachzahlung ablesen',
            text: 'Der Rechner zeigt deine SVS-Beiträge (PV, KV, UV, SV), die Einkommensteuer, die voraussichtliche Nachzahlung und dein echtes Netto.',
          },
          {
            '@type': 'HowToStep',
            name: 'Wahrheits-Tabelle prüfen',
            text: 'In der Wahrheits-Tabelle siehst du die Differenz zwischen vorläufigen und endgültigen SVS-Beiträgen pro Quartal.',
          },
        ],
      }} />
      {children}
    </>
  )
}
