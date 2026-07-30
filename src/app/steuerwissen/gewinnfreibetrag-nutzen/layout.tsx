import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Gewinnfreibetrag 2026: Bis zu 4.950 € Gewinn steuerfrei',
  description: 'Gewinnfreibetrag Österreich: Bis zu 4.950€ deines Gewinns steuerfrei mit dem Grundfreibetrag nach § 10 EStG. Berechne deinen Gewinnfreibetrag und nutze alle Vorteile optimal.',
  keywords: 'Gewinnfreibetrag, Gewinnfreibetrag Österreich, Gewinnfreibetrag berechnen, § 10 EStG, Grundfreibetrag, Steuerersparnis',
  alternates: {
    canonical: '/steuerwissen/gewinnfreibetrag-nutzen'
  },
  openGraph: {
    title: 'Gewinnfreibetrag 2026: Bis zu 4.950 € Gewinn steuerfrei',
    description: 'Gewinnfreibetrag Österreich: Bis zu 4.950€ deines Gewinns steuerfrei mit dem Grundfreibetrag nach § 10 EStG. Berechne deinen Gewinnfreibetrag und nutze alle Vorteile optimal.',
    type: 'article',
    locale: 'de_AT'
  }
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steuerboard.pro/' },
    { '@type': 'ListItem', position: 2, name: 'Steuerwissen', item: 'https://steuerboard.pro/steuerwissen' },
    { '@type': 'ListItem', position: 3, name: 'Gewinnfreibetrag nutzen', item: 'https://steuerboard.pro/steuerwissen/gewinnfreibetrag-nutzen' },
  ],
}

export default function GewinnfreibetragLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gewinnfreibetrag 2026: Bis zu 4.950 € Gewinn steuerfrei',
    description: 'Gewinnfreibetrag Österreich: Bis zu 4.950€ deines Gewinns steuerfrei mit dem Grundfreibetrag nach § 10 EStG. Berechne deinen Gewinnfreibetrag und nutze alle Vorteile optimal.',
    image: 'https://steuerboard.pro/opengraph-image',
    author: {
      '@type': 'Person',
      name: 'Daniel Kofler',
      jobTitle: 'Gründer SteuerBoard.pro',
      url: 'https://steuerboard.pro/impressum',
    },
    datePublished: '2026-03-18',
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://steuerboard.pro/steuerwissen/gewinnfreibetrag-nutzen'
    }
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist der Gewinnfreibetrag in Österreich?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Gewinnfreibetrag nach § 10 EStG ermöglicht Selbständigen in Österreich 15% ihres Gewinns bis maximal 4.950€ steuerfrei zu stellen. Er wird automatisch auf die ersten 33.000€ Gewinn angewendet.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie hoch ist der Gewinnfreibetrag 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Der Grundfreibetrag beträgt 15% auf die ersten 33.000€ Gewinn, maximal also 4.950€. Zusätzlich gibt es den investitionsbedingten Gewinnfreibetrag von 13% auf Gewinne über 33.000€ (bis 178.000€, darüber 7% bzw. 4,5%, Deckel gesamt 46.400€) bei entsprechenden Investitionen.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie berechne ich meinen Gewinnfreibetrag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grundfreibetrag: 15% von maximal 33.000€ Gewinn = bis zu 4.950€. Bei einem Gewinn von 20.000€ erhältst du 3.000€ Freibetrag. Bei 50.000€ Gewinn: 4.950€ Grundfreibetrag plus investitionsbedingter Freibetrag möglich.'
        }
      }
    ]
  }

  return (
    <>
      <JsonLd data={articleStructuredData} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqStructuredData} />
      {children}
    </>
  )
}