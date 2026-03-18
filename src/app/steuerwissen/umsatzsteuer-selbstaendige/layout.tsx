import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Umsatzsteuer für Selbstständige in Österreich — USt-Guide 2026',
  description: 'Umsatzsteuer für Selbstständige in Österreich: USt-Sätze, Vorsteuerabzug, UVA, Reverse Charge, Kleinunternehmerregelung und häufige Fehler erklärt.',
  openGraph: {
    title: 'Umsatzsteuer für Selbstständige — USt-Guide Österreich 2026',
    description: 'USt-Sätze, Vorsteuerabzug, UVA-Meldung und Reverse Charge einfach erklärt.',
    url: '/steuerwissen/umsatzsteuer-selbstaendige'
  },
  alternates: {
    canonical: '/steuerwissen/umsatzsteuer-selbstaendige'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Umsatzsteuer für Selbstständige in Österreich — USt-Guide 2026',
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
  description: 'Kompletter Guide zur Umsatzsteuer für Selbstständige und Unternehmer in Österreich.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/umsatzsteuer-selbstaendige'
  },
  isAccessibleForFree: true,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welche USt-Sätze gelten in Österreich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Österreich gelten drei USt-Sätze: 20% Normalsteuersatz, 13% ermäßigter Satz (z.B. Blumen, Kunst) und 10% besonders ermäßigter Satz (z.B. Lebensmittel, Bücher, Miete).'
      }
    },
    {
      '@type': 'Question',
      name: 'Wann muss ich eine UVA abgeben?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Umsatzsteuervoranmeldung (UVA) ist monatlich abzugeben, wenn der Vorjahresumsatz über 100.000€ liegt. Bei Umsätzen zwischen 35.000€ und 100.000€ ist vierteljährliche Abgabe möglich. Unter 35.000€ entfällt die UVA-Pflicht.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was ist der Vorsteuerabzug?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Vorsteuerabzug erlaubt Unternehmern, die auf Einkäufe bezahlte Umsatzsteuer (Vorsteuer) von der an das Finanzamt abzuführenden USt abzuziehen. Effektiv zahlt man nur die Differenz.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was ist Reverse Charge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beim Reverse-Charge-Verfahren schuldet nicht der leistende Unternehmer, sondern der Leistungsempfänger die Umsatzsteuer. Dies gilt bei grenzüberschreitenden B2B-Leistungen innerhalb der EU.'
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
