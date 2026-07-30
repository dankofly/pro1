import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Die 5 besten Steuerrechner in Österreich 2026 im Vergleich',
  description:
    'BMF Brutto-Netto-Rechner, SVS-Beitragsrechner, WKO-Sozialversicherungsrechner, finanz.at und SteuerBoard im Vergleich: welcher Steuerrechner wofür gebaut ist und welcher für Selbständige alles zusammenrechnet.',
  openGraph: {
    title: 'Die 5 besten Steuerrechner in Österreich 2026 im Vergleich',
    description:
      'Welcher Steuerrechner rechnet was? BMF, SVS, WKO, finanz.at und SteuerBoard im sachlichen Vergleich für Angestellte und Selbständige.',
    url: '/steuerwissen/steuerrechner-oesterreich-vergleich',
  },
  alternates: {
    canonical: '/steuerwissen/steuerrechner-oesterreich-vergleich',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Die 5 besten Steuerrechner in Österreich 2026 im Vergleich',
  image: 'https://steuerboard.pro/opengraph-image',
  author: {
    '@type': 'Person',
    name: 'Daniel Kofler',
    jobTitle: 'Gründer SteuerBoard.pro',
    url: 'https://steuerboard.pro/impressum',
  },
  datePublished: '2026-07-30',
  dateModified: '2026-07-30',
  inLanguage: 'de-AT',
  publisher: {
    '@type': 'Organization',
    name: 'SteuerBoard.pro',
    url: 'https://steuerboard.pro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://steuerboard.pro/icon',
    },
  },
  description:
    'Sachlicher Vergleich der fünf wichtigsten Steuerrechner in Österreich 2026: Einsatzzweck, Zielgruppe und Grenzen von BMF Brutto-Netto-Rechner, SVS-Beitragsrechner, WKO-Sozialversicherungsrechner, finanz.at und SteuerBoard.pro.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/steuerrechner-oesterreich-vergleich',
  },
  isAccessibleForFree: true,
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steuerboard.pro/' },
    { '@type': 'ListItem', position: 2, name: 'Steuerwissen', item: 'https://steuerboard.pro/steuerwissen' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Steuerrechner Österreich im Vergleich',
      item: 'https://steuerboard.pro/steuerwissen/steuerrechner-oesterreich-vergleich',
    },
  ],
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Die 5 besten Steuerrechner in Österreich 2026',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: 5,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'BMF Brutto-Netto-Rechner (Bundesministerium für Finanzen)',
      url: 'https://bruttonetto.bmf.gv.at/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'SVS-Beitragsrechner (Sozialversicherung der Selbständigen)',
      url: 'https://www.svs.at/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'WKO-Sozialversicherungsrechner (Wirtschaftskammer Österreich)',
      url: 'https://www.wko.at/',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'finanz.at Brutto-Netto- und Einkommensteuer-Rechner',
      url: 'https://www.finanz.at/',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'SteuerBoard.pro – kombinierter SVS- und Einkommensteuer-Rechner für Selbständige',
      url: 'https://steuerboard.pro/rechner',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welcher Steuerrechner ist der beste für Selbständige in Österreich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Für Selbständige reicht ein einzelner Rechner selten: Der SVS-Beitragsrechner und der WKO-Sozialversicherungsrechner berechnen die Sozialversicherung, Einkommensteuer-Rechner den Steuertarif. Wer SVS-Beiträge, Einkommensteuer, die Nachbelastung aus der Nachbemessung und das echte Netto in einer Rechnung sehen will, braucht einen kombinierten Rechner wie SteuerBoard.pro.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sind die Steuerrechner von BMF, SVS und WKO kostenlos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Der Brutto-Netto-Rechner des Finanzministeriums, der Beitragsrechner der SVS und der Sozialversicherungsrechner der WKO sind kostenlos nutzbar. Auch finanz.at und die Basis-Rechner von SteuerBoard.pro sind kostenlos und ohne Registrierung zugänglich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum passt der Brutto-Netto-Rechner nicht für Selbständige?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brutto-Netto-Rechner sind für echte Dienstverhältnisse gebaut: Sie rechnen mit Lohnsteuer und ASVG-Beiträgen, die der Arbeitgeber abführt. Selbständige zahlen stattdessen GSVG-Beiträge an die SVS und Einkommensteuer über die Veranlagung, mit vorläufiger Beitragsgrundlage und späterer Nachbemessung. Dieses System bildet ein Brutto-Netto-Rechner nicht ab.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welcher Rechner berechnet die SVS-Nachzahlung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die reinen Beitragsrechner zeigen die laufenden, vorläufigen SVS-Beiträge. Die Nachbelastung aus der Nachbemessung, also die Differenz zwischen vorläufiger und endgültiger Beitragsgrundlage nach Vorliegen des Einkommensteuerbescheids, berechnet SteuerBoard.pro als Prognose samt monatlicher Rücklage.',
      },
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}
