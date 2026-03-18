import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'SVS-Nachzahlung vermeiden — So schützt du dich vor der Nachzahlungsfalle',
  description: 'Erfahre wie du hohe SVS-Nachzahlungen vermeidest. Strategien für Selbstständige in Österreich mit konkreten Beispielen und Berechnungen.',
  openGraph: {
    title: 'SVS-Nachzahlung vermeiden — So schützt du dich vor der Nachzahlungsfalle',
    description: 'Erfahre wie du hohe SVS-Nachzahlungen vermeidest. Strategien für Selbstständige in Österreich mit konkreten Beispielen und Berechnungen.',
    url: '/steuerwissen/svs-nachzahlung-vermeiden'
  },
  alternates: {
    canonical: '/steuerwissen/svs-nachzahlung-vermeiden'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SVS-Nachzahlung vermeiden — So schützt du dich vor der Nachzahlungsfalle',
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
  description: 'Strategien und Tipps für österreichische Selbstständige um hohe SVS-Nachzahlungen zu vermeiden',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/svs-nachzahlung-vermeiden'
  },
  isAccessibleForFree: true,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist eine SVS-Nachzahlung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine SVS-Nachzahlung entsteht, wenn die vorläufigen Sozialversicherungsbeiträge niedriger waren als die endgültigen Beiträge basierend auf dem tatsächlichen Gewinn. Dies passiert oft bei steigenden Gewinnen.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wie kann ich eine SVS-Nachzahlung vermeiden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Du kannst eine Änderung der vorläufigen Beitragsgrundlage nach § 25a Abs 3 GSVG beantragen, monatliche Rücklagen bilden und den Gewinnfreibetrag optimal nutzen.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wann muss ich mit einer SVS-Nachzahlung rechnen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eine Nachzahlung wird drei Jahre nach dem Beitragsjahr fällig, wenn dein tatsächlicher Gewinn höher war als die Grundlage für die vorläufigen Beiträge.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wie hoch kann eine SVS-Nachzahlung sein?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Höhe hängt von der Differenz zwischen vorläufigen und endgültigen Beiträgen ab. Bei einem Gewinnsprung von 30.000€ auf 60.000€ können das über 5.000€ Nachzahlung sein.'
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