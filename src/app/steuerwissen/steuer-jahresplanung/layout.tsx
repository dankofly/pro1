import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Steuer-Jahresplanung 2026 für Selbständige — Fristen, UVA & Vorsorge',
  description: 'Komplette Steuer-Jahresplanung für österreichische Selbständige: UVA-Termine, EST-Vorauszahlungen, Rücklagen-Empfehlungen und Jahresend-Optimierung.',
  keywords: ['Jahresplanung Steuern Selbständige', 'Steuer Vorschau Selbständige', 'Steuerfristen Österreich 2026', 'UVA Termine', 'EST Vorauszahlungen', 'Steuern Rücklage', 'Jahresplanung Steuer'],
  alternates: {
    canonical: '/steuerwissen/steuer-jahresplanung'
  },
  openGraph: {
    title: 'Steuer-Jahresplanung 2026 für Selbständige — Fristen, UVA & Vorsorge',
    description: 'Komplette Steuer-Jahresplanung für österreichische Selbständige: UVA-Termine, EST-Vorauszahlungen, Rücklagen-Empfehlungen und Jahresend-Optimierung.',
    type: 'article',
    url: '/steuerwissen/steuer-jahresplanung'
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://steuerboard.pro/steuerwissen/steuer-jahresplanung#article',
        headline: 'Steuer-Jahresplanung 2026 für Selbständige — Fristen, UVA & Vorsorge',
        description: 'Komplette Steuer-Jahresplanung für österreichische Selbständige: UVA-Termine, EST-Vorauszahlungen, Rücklagen-Empfehlungen und Jahresend-Optimierung.',
        image: 'https://steuerboard.pro/opengraph-image',
        author: {
          '@type': 'Organization',
          name: 'SteuerBoard.pro',
          url: 'https://steuerboard.pro',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SteuerBoard.pro',
          url: 'https://steuerboard.pro',
          logo: {
            '@type': 'ImageObject',
            url: 'https://steuerboard.pro/icon',
          },
        },
        datePublished: '2026-03-19',
        dateModified: '2026-03-19',
        inLanguage: 'de-AT',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://steuerboard.pro/steuerwissen/steuer-jahresplanung'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://steuerboard.pro/steuerwissen/steuer-jahresplanung#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wann sind die UVA-Termine 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'UVA-Termine sind grundsätzlich am 15. des Folgemonats. Bei monatlicher Abgabe (ab 100.000€ Vorjahresumsatz) jeden Monat, bei quartalsweiser Abgabe am 15. Februar, 15. Mai, 15. August und 15. November.'
            }
          },
          {
            '@type': 'Question',
            name: 'Wie hoch sollten meine monatlichen Steuerrücklagen sein?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Faustregeln: Bei 30.000€ Gewinn → 650€/Monat, bei 50.000€ → 1.200€/Monat, bei 80.000€ → 2.100€/Monat, bei 100.000€ → 2.800€/Monat. Inkludiert EST, SVS und UVA.'
            }
          },
          {
            '@type': 'Question',
            name: 'Wann sind EST-Vorauszahlungen fällig?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'EST-Vorauszahlungen nach § 45 EStG sind vierteljährlich fällig: 15. Februar, 15. Mai, 15. August und 15. November. Die Höhe richtet sich nach dem letzten Steuerbescheid.'
            }
          },
          {
            '@type': 'Question',
            name: 'Welche Jahresend-Maßnahmen sparen Steuern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Investitionen vorziehen (GWG, IFB nutzen), Gewinnfreibetrag durch Wertpapierkauf ausschöpfen, Betriebsausgaben ins laufende Jahr vorziehen, Rechnungen noch im alten Jahr stellen oder Einnahmen ins Folgejahr verschieben.'
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  )
}