import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'FAQ — Häufige Fragen zu SteuerBoard.pro',
  description:
    'Antworten auf häufige Fragen zu SteuerBoard.pro: SVS-Beitragsrechner, Einkommensteuer, Nachzahlung, Pro-Features, GmbH-Vergleich und AI SteuerBoard für österreichische Selbständige.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Häufige Fragen zu SteuerBoard.pro',
    description:
      'Alles über SVS-Beiträge, Nachzahlung, Einkommensteuer und Pro-Features für Selbständige in Österreich.',
    url: '/faq',
  },
}

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist SteuerBoard.pro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SteuerBoard.pro ist ein interaktiver Steuer- und SVS-Rechner für österreichische Selbständige — Einzelunternehmer (EPU), Freiberufler und Gewerbetreibende. Du gibst Umsatz und Betriebsausgaben ein und erhältst sofort eine Berechnung deiner SVS-Beiträge, der Einkommensteuer und deines echten Nettos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum SteuerBoard.pro und nicht der WKO SVS-Rechner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der WKO SVS-Beitragsrechner berechnet nur die reinen SVS-Beiträge. SteuerBoard.pro berechnet alles in einem Schritt: SVS-Beiträge, Einkommensteuer-Prognose, die voraussichtliche Nachzahlung, das Geldfluss-Diagramm, die Wahrheits-Tabelle, monatliche Rücklagen-Empfehlungen, das AI SteuerBoard, GmbH-Vergleich und 7 spezialisierte Steuerrechner.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was ist die SVS-Nachzahlungsfalle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die SVS berechnet Beiträge zunächst vorläufig auf Basis des Gewinns von vor 3 Jahren (§ 25a GSVG). Bei steigendem Einkommen entsteht nach dem Steuerbescheid eine Nachzahlung. Bei einer Gewinnsteigerung von 30.000 auf 60.000 EUR kann diese über 5.000 EUR betragen. SteuerBoard zeigt die exakte Differenz zwischen vorläufigen und endgültigen Beiträgen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welche Steuerjahre werden unterstützt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SteuerBoard.pro enthält die aktuellen Werte für 2024, 2025 und 2026 — inklusive Familienbonus Plus (2.100 EUR/Kind), angepasster AVAB (572 EUR), Verkehrsabsetzbetrag (481 EUR), Kindermehrbetrag (727 EUR) und Kleinunternehmergrenze (55.000 EUR netto).',
      },
    },
    {
      '@type': 'Question',
      name: 'Ersetzt SteuerBoard eine Steuerberatung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. SteuerBoard.pro ist ein Planungs- und Orientierungstool. Alle Berechnungen basieren auf den aktuellen gesetzlichen Grundlagen (EStG, GSVG, FSVG), sind aber Richtwerte ohne Gewähr. Für verbindliche Auskünfte empfehlen wir eine professionelle Steuerberatung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wann lohnt sich eine GmbH statt Einzelunternehmen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bei einer GmbH fallen 23 % Körperschaftsteuer (KöSt) plus 27,5 % KESt auf Ausschüttungen an. Typischerweise lohnt sich eine GmbH ab ca. 60.000–80.000 EUR Gewinn. SteuerBoard berechnet den exakten Break-Even-Punkt mit konkreten EUR-Beträgen für deine Situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was berechnet der SVS-Beitragsrechner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Rechner ermittelt auf Basis deines Jahresgewinns: SVS-Beiträge aufgeschlüsselt nach Pensionsversicherung (18,50 %), Krankenversicherung (6,80 %), Selbständigenvorsorge (1,53 %) und Unfallversicherung, die Einkommensteuer nach dem progressiven Tarif (§ 33 EStG), dein echtes Netto und die voraussichtliche SVS-Nachzahlung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was kosten die Pro-Features?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free (kostenlos): SVS-Beitragsrechner, Wahrheits-Tabelle, Geldfluss-Diagramm. Sicherheits-Plan (12,90 EUR/Monat): zusätzlich Einkommensteuer-Prognose, Familienbonus, Dashboard und Export. SteuerBoard Pro (24,90 EUR/Monat): alles plus AI SteuerBoard, 7 Rechner, GmbH-Vergleich, Pauschalierungs-Check und PDF-Export.',
      },
    },
  ],
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={FAQ_JSONLD} />
      {children}
    </>
  )
}
