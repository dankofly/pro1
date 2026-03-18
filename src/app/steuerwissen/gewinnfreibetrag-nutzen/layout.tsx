import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Gewinnfreibetrag 2026 — So sparst du bis zu 4.950 € Steuern',
  description: 'Gewinnfreibetrag Österreich: Spare bis zu 4.950€ Steuern mit dem Grundfreibetrag nach § 10 EStG. Berechne deinen Gewinnfreibetrag und nutze alle Vorteile optimal.',
  keywords: 'Gewinnfreibetrag, Gewinnfreibetrag Österreich, Gewinnfreibetrag berechnen, § 10 EStG, Grundfreibetrag, Steuerersparnis',
  alternates: {
    canonical: '/steuerwissen/gewinnfreibetrag-nutzen'
  },
  openGraph: {
    title: 'Gewinnfreibetrag 2026 — So sparst du bis zu 4.950 € Steuern',
    description: 'Gewinnfreibetrag Österreich: Spare bis zu 4.950€ Steuern mit dem Grundfreibetrag nach § 10 EStG. Berechne deinen Gewinnfreibetrag und nutze alle Vorteile optimal.',
    type: 'article',
    locale: 'de_AT'
  }
}

export default function GewinnfreibetragLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gewinnfreibetrag 2026 — So sparst du bis zu 4.950 € Steuern',
    description: 'Gewinnfreibetrag Österreich: Spare bis zu 4.950€ Steuern mit dem Grundfreibetrag nach § 10 EStG. Berechne deinen Gewinnfreibetrag und nutze alle Vorteile optimal.',
    image: 'https://steuerboard.pro/opengraph-image',
    author: {
      '@type': 'Organization',
      name: 'SteuerBoard.pro',
      url: 'https://steuerboard.pro',
    },
    datePublished: '2026-03-18',
    dateModified: '2026-03-18',
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
          text: 'Der Grundfreibetrag beträgt 15% auf die ersten 33.000€ Gewinn, maximal also 4.950€. Zusätzlich gibt es den investitionsbedingten Gewinnfreibetrag von 13% auf Gewinne über 33.000€ bei entsprechenden Investitionen.'
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
      <JsonLd data={faqStructuredData} />
      {children}
    </>
  )
}