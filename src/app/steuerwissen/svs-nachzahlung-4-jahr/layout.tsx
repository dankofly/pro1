import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'SVS-Nachzahlung im 4. Jahr — Steuerschock für Neugründer vermeiden 2026',
  description: 'Warum trifft die SVS-Nachzahlung Neugründer besonders hart im 3./4. Jahr? Konkrete Berechnungen, Timeline und 5 Strategien zur Vermeidung des Steuerschocks.',
  keywords: 'SVS Nachzahlung 4. Jahr, SVS Beiträge Neugründer, Steuerschock Selbständige, SVS Nachforderung, Neugründer Österreich, SVS Mindestbeiträge',
  openGraph: {
    title: 'SVS-Nachzahlung im 4. Jahr — Steuerschock für Neugründer vermeiden 2026',
    description: 'Warum trifft die SVS-Nachzahlung Neugründer besonders hart im 3./4. Jahr? Konkrete Berechnungen, Timeline und 5 Strategien zur Vermeidung des Steuerschocks.',
    url: '/steuerwissen/svs-nachzahlung-4-jahr'
  },
  alternates: {
    canonical: '/steuerwissen/svs-nachzahlung-4-jahr'
  }
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'SVS-Nachzahlung im 4. Jahr — Steuerschock für Neugründer vermeiden',
  image: 'https://steuerboard.pro/opengraph-image',
  author: {
    '@type': 'Organization',
    name: 'SteuerBoard.pro',
    url: 'https://steuerboard.pro',
  },
  datePublished: '2026-03-19',
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
  description: 'Umfassender Guide warum die SVS-Nachzahlung Neugründer im 3./4. Jahr besonders hart trifft und wie man den Steuerschock vermeidet',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://steuerboard.pro/steuerwissen/svs-nachzahlung-4-jahr'
  },
  isAccessibleForFree: true,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Warum trifft die SVS-Nachzahlung Neugründer besonders hart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neugründer zahlen anfangs nur Mindestbeiträge (~150€/Monat). Steigen die Gewinne, folgt 3-4 Jahre später eine hohe Nachzahlung plus erhöhte laufende Beiträge — eine Doppelbelastung die viele überrascht.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wann kommt die erste große SVS-Nachzahlung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die erste Nachzahlung kommt typischerweise im 3. oder 4. Geschäftsjahr, basierend auf dem Steuerbescheid der ersten beiden Jahre. Die zeitliche Verzögerung macht sie so überraschend.'
      }
    },
    {
      '@type': 'Question',
      name: 'Wie hoch kann die SVS-Nachzahlung bei Neugründern sein?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bei einem Gewinnsprung von 0€ auf 45.000€ im zweiten Jahr kann die Nachzahlung über 10.000€ betragen — zusätzlich zu den erhöhten laufenden Beiträgen von ~1.000€/Monat.'
      }
    },
    {
      '@type': 'Question',
      name: 'Kann ich als Neugründer die hohe Nachzahlung vermeiden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, durch frühzeitige Beantragung höherer vorläufiger Beitragsgrundlagen bei der SVS, monatliche Rücklagenbildung von 25-30% des Gewinns und strategische Nutzung von Gewinnfreibeträgen.'
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