import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Pauschalierung in Österreich 2026: Basispauschalierung, Branchenpauschalierung & Kleinunternehmerpauschalierung',
  description: 'Alle Pauschalierungsarten für Selbstständige in Österreich erklärt. Vergleich, Voraussetzungen, Berechnung und wann sich welche Pauschalierung lohnt.',
  openGraph: {
    title: 'Pauschalierung in Österreich: Kompletter Guide für Selbstständige',
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
        text: 'Bei der Basispauschalierung können Selbstständige pauschal 15% (ab 2026; 2025: 13,5%, 2024: 12%) bzw. 6% bei bestimmten Tätigkeiten ihrer Betriebseinnahmen als Betriebsausgaben absetzen, ohne jeden Beleg einzeln nachweisen zu müssen. Die Umsatzgrenze liegt ab 2026 bei 420.000€ pro Jahr (2025: 320.000€).'
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
        text: 'Die Kleinunternehmerpauschalierung nach § 17 Abs 3a EStG erlaubt Kleinunternehmern (Umsatz bis 55.000€ brutto seit 2025) pauschal 45% (Handel/Produktion, Deckel 24.750€) oder 20% (Dienstleistungen, Deckel 11.000€) als Betriebsausgaben anzusetzen.'
      }
    },
    {
      '@type': 'Question',
      name: 'Kann ich zwischen Pauschalierung und tatsächlichen Ausgaben wechseln?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Der Wechsel von der Pauschalierung zur Erfassung tatsächlicher Betriebsausgaben ist mit der Steuererklärung jederzeit möglich. Eine Rückkehr zur Basispauschalierung ist danach aber erst nach 5 Wirtschaftsjahren zulässig, zur Kleinunternehmerpauschalierung nach 3 Wirtschaftsjahren.'
      }
    }
  ]
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://steuerboard.pro/' },
    { '@type': 'ListItem', position: 2, name: 'Steuerwissen', item: 'https://steuerboard.pro/steuerwissen' },
    { '@type': 'ListItem', position: 3, name: 'Pauschalierung Österreich', item: 'https://steuerboard.pro/steuerwissen/pauschalierung-oesterreich' },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}
