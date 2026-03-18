import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Pauschalierung in Österreich 2026 — Basispauschalierung, Branchenpauschalierung & Kleinunternehmerpauschalierung',
  description: 'Alle Pauschalierungsarten für Selbstständige in Österreich erklärt. Vergleich, Voraussetzungen, Berechnung und wann sich welche Pauschalierung lohnt.',
  openGraph: {
    title: 'Pauschalierung in Österreich — Kompletter Guide für Selbstständige',
    description: 'Basispauschalierung, Branchenpauschalierung & Kleinunternehmerpauschalierung im Vergleich.',
    url: '/steuerwissen/pauschalierung-oesterreich'
  },
  alternates: {
    canonical: '/steuerwissen/pauschalierung-oesterreich'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pauschalierung in Österreich 2026 — Basispauschalierung, Branchenpauschalierung & Kleinunternehmerpauschalierung',
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
  description: 'Alle Pauschalierungsarten für Selbstständige in Österreich erklärt mit Vergleich, Voraussetzungen und Berechnungsbeispielen.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/pauschalierung-oesterreich'
  },
  isAccessibleForFree: true,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist die Basispauschalierung in Österreich?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bei der Basispauschalierung können Selbstständige pauschal 12% (bzw. 6% bei bestimmten Tätigkeiten) ihrer Betriebseinnahmen als Betriebsausgaben absetzen, ohne jeden Beleg einzeln nachweisen zu müssen. Die Umsatzgrenze liegt bei 220.000€ pro Jahr.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wann lohnt sich die Pauschalierung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Pauschalierung lohnt sich, wenn Ihre tatsächlichen Betriebsausgaben unter dem pauschalen Prozentsatz liegen. Bei Dienstleistungen mit wenig Materialeinsatz (z.B. Beratung, IT) ist die Pauschalierung oft vorteilhaft.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was ist die Kleinunternehmerpauschalierung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Kleinunternehmerpauschalierung nach § 17 Abs 3a EStG erlaubt Kleinunternehmern (Umsatz bis 42.000€) pauschal 45% (Dienstleistungen) oder 20% (andere Tätigkeiten) als Betriebsausgaben anzusetzen.'
      }
    },
    {
      '@type': 'Question',
      name: 'Kann ich zwischen Pauschalierung und tatsächlichen Ausgaben wechseln?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Sie können jährlich zwischen Pauschalierung und der Erfassung tatsächlicher Betriebsausgaben wechseln. Ein Wechsel ist mit der Steuererklärung für das jeweilige Jahr möglich.'
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
