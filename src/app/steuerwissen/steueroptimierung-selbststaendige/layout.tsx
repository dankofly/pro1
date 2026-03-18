import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Steueroptimierung für Selbständige in Österreich — Die komplette Anleitung 2026',
  description: 'Steueroptimierung für Selbständige in Österreich: Alle legalen Steuerspartipps für EPU & Einzelunternehmer. Absetzbeträge, Betriebsausgaben & Investitionssteuerung optimal nutzen.',
  keywords: ['Steueroptimierung Selbständige', 'Steuern sparen Selbständig Österreich', 'Steuer Tipps EPU', 'Gewinnfreibetrag', 'Investitionsfreibetrag', 'Betriebsausgaben'],
  alternates: {
    canonical: '/steuerwissen/steueroptimierung-selbststaendige'
  },
  openGraph: {
    title: 'Steueroptimierung für Selbständige in Österreich — Die komplette Anleitung 2026',
    description: 'Steueroptimierung für Selbständige in Österreich: Alle legalen Steuerspartipps für EPU & Einzelunternehmer. Absetzbeträge, Betriebsausgaben & Investitionssteuerung optimal nutzen.',
    type: 'article',
    url: '/steuerwissen/steueroptimierung-selbststaendige'
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
        '@id': 'https://steuerboard.pro/steuerwissen/steueroptimierung-selbststaendige#article',
        headline: 'Steueroptimierung für Selbständige in Österreich — Die komplette Anleitung 2026',
        description: 'Steueroptimierung für Selbständige in Österreich: Alle legalen Steuerspartipps für EPU & Einzelunternehmer. Absetzbeträge, Betriebsausgaben & Investitionssteuerung optimal nutzen.',
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
        datePublished: '2026-03-18',
        dateModified: '2026-03-18',
        inLanguage: 'de-AT',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://steuerboard.pro/steuerwissen/steueroptimierung-selbststaendige'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://steuerboard.pro/steuerwissen/steueroptimierung-selbststaendige#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie viel Steuern kann ich als Selbständiger in Österreich sparen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch optimale Nutzung von Gewinnfreibetrag (15% auf erste 33.000€), Investitionsfreibetrag (20-22%) und vollständige Geltendmachung von Betriebsausgaben können Selbständige oft 3.000-10.000€ jährlich sparen.'
            }
          },
          {
            '@type': 'Question',
            name: 'Was ist der Gewinnfreibetrag nach § 10 EStG?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Der Gewinnfreibetrag beträgt 15% des Gewinns bis maximal 33.000€ (= max. 4.950€ Freibetrag). Er reduziert direkt die Steuerbemessungsgrundlage für Selbständige und EPU.'
            }
          },
          {
            '@type': 'Question',
            name: 'Welche Betriebsausgaben kann ich als Selbständiger absetzen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Alle betrieblich veranlassten Ausgaben: Arbeitszimmer, Fortbildung, Fachliteratur, Telefon/Internet (anteilig), Reisekosten, GWG bis 1.000€, Bewirtung (50%), Versicherungen und Beratungskosten.'
            }
          },
          {
            '@type': 'Question',
            name: 'Ab welchem Gewinn lohnt sich eine GmbH?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Der Break-Even liegt meist zwischen 60.000-80.000€ Jahresgewinn. Ab diesem Punkt wird die GmbH-Besteuerung (25% KöSt + 27,5% KESt auf Ausschüttungen) günstiger als der Einkommensteuertarif.'
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