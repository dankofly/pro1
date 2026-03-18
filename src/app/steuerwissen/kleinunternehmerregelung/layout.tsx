import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Kleinunternehmerregelung Österreich 2026 — Umsatzgrenze, Vorteile & Fallstricke',
  description: 'Alles zur Kleinunternehmerregelung in Österreich: Umsatzgrenze 42.000€, USt-Befreiung, Toleranzgrenze, EU-Regelung und wann sich der Verzicht lohnt.',
  openGraph: {
    title: 'Kleinunternehmerregelung Österreich 2026 — Kompletter Guide',
    description: 'Umsatzgrenze, USt-Befreiung, Vorsteuerabzug und wann sich die Regelbesteuerung lohnt.',
    url: '/steuerwissen/kleinunternehmerregelung'
  },
  alternates: {
    canonical: '/steuerwissen/kleinunternehmerregelung'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kleinunternehmerregelung Österreich 2026 — Umsatzgrenze, Vorteile & Fallstricke',
  image: 'https://steuerboard.pro/opengraph-image',
  author: {
    '@type': 'Organization',
    name: 'SteuerBoard.pro',
    url: 'https://steuerboard.pro',
  },
  datePublished: '2026-03-18',
  dateModified: '2026-03-19',
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
  description: 'Kompletter Guide zur Kleinunternehmerregelung in Österreich mit Umsatzgrenzen, Vor- und Nachteilen.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/kleinunternehmerregelung'
  },
  isAccessibleForFree: true,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wie hoch ist die Umsatzgrenze für Kleinunternehmer in Österreich 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Umsatzgrenze für Kleinunternehmer liegt seit 2025 bei 42.000€ netto pro Jahr. Zuvor lag sie bei 35.000€.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was passiert wenn ich die Kleinunternehmergrenze überschreite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine einmalige Überschreitung um bis zu 15% innerhalb von 5 Jahren wird toleriert. Bei größerer oder wiederholter Überschreitung fällt die Befreiung rückwirkend weg und USt muss nachgezahlt werden.'
      }
    },
    {
      '@type': 'Question',
      name: 'Kann ich als Kleinunternehmer Vorsteuer abziehen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein, Kleinunternehmer können keine Vorsteuer abziehen. Bezahlte Umsatzsteuer auf Einkäufe ist ein Kostenfaktor. Deshalb lohnt sich die Regelbesteuerung bei hohen Investitionen.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wie verzichte ich auf die Kleinunternehmerregelung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Verzicht (Option zur Regelbesteuerung) erfolgt durch schriftliche Erklärung beim Finanzamt. Er bindet für mindestens 5 Jahre und kann danach widerrufen werden.'
      }
    }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}
