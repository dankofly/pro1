import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Steuerwissen für Selbständige in Österreich — Alle Guides & Tipps',
  description: 'Steuerwissen für Selbständige in Österreich: SVS-Beiträge senken, Gewinnfreibetrag nutzen, GmbH vs Einzelunternehmen und mehr. Praxisnahe Steuer-Guides mit konkreten Beispielen.',
  keywords: ['Steuerwissen Österreich', 'Steuer Tipps Selbständige', 'SVS Beiträge', 'Gewinnfreibetrag', 'GmbH gründen', 'Steueroptimierung'],
  alternates: {
    canonical: '/steuerwissen-hub',
  },
  openGraph: {
    title: 'Steuerwissen für Selbständige in Österreich — Alle Guides & Tipps',
    description: 'Praxisnahe Steuer-Guides für Selbständige: SVS optimieren, Steuern sparen, richtige Rechtsform wählen.',
    type: 'website',
    url: '/steuerwissen-hub',
  },
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
        '@type': 'CollectionPage',
        '@id': 'https://steuerboard.pro/steuerwissen-hub#collection',
        name: 'Steuerwissen für Selbständige in Österreich',
        description: 'Praxisnahe Steuer-Guides für Selbständige in Österreich.',
        publisher: {
          '@type': 'Organization',
          name: 'SteuerBoard.pro',
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              url: 'https://steuerboard.pro/steuerwissen/svs-beitraege-senken',
              name: 'SVS-Beiträge senken — 7 legale Strategien',
            },
            {
              '@type': 'ListItem',
              position: 2,
              url: 'https://steuerboard.pro/steuerwissen/svs-nachzahlung-vermeiden',
              name: 'SVS-Nachzahlung vermeiden',
            },
            {
              '@type': 'ListItem',
              position: 3,
              url: 'https://steuerboard.pro/steuerwissen/gewinnfreibetrag-nutzen',
              name: 'Gewinnfreibetrag 2026 optimal nutzen',
            },
            {
              '@type': 'ListItem',
              position: 4,
              url: 'https://steuerboard.pro/steuerwissen/gmbh-vs-einzelunternehmen',
              name: 'GmbH oder Einzelunternehmen?',
            },
            {
              '@type': 'ListItem',
              position: 5,
              url: 'https://steuerboard.pro/steuerwissen/steueroptimierung-selbststaendige',
              name: 'Steueroptimierung für Selbständige',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://steuerboard.pro/steuerwissen-hub#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wie kann ich als Selbständiger in Österreich Steuern sparen?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch optimale Nutzung von Gewinnfreibetrag (15% auf erste 33.000€), Investitionsfreibetrag (20%), vollständige Geltendmachung von Betriebsausgaben und strategische Gewinnsteuerung können Selbständige oft 3.000-10.000€ jährlich sparen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Ab welchem Gewinn lohnt sich eine GmbH in Österreich?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Der Break-Even liegt typischerweise zwischen 60.000-80.000€ Jahresgewinn. Ab diesem Punkt wird die GmbH-Besteuerung (23% KöSt + 27,5% KESt auf Ausschüttungen) günstiger als der progressive Einkommensteuertarif bis 55%.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie hoch sind die SVS-Beiträge für Selbständige?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Die SVS-Beiträge betragen insgesamt ca. 26,83% des Gewinns: 18,50% Pensionsversicherung, 6,80% Krankenversicherung, 1,53% Selbständigenvorsorge plus ca. 11,35€/Monat Unfallversicherung.',
            },
          },
          {
            '@type': 'Question',
            name: 'Was ist der Gewinnfreibetrag und wie nutze ich ihn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Der Gewinnfreibetrag nach § 10 EStG beträgt 15% auf die ersten 33.000€ Gewinn (max. 4.950€ Freibetrag). Er wird automatisch angewendet und reduziert direkt die Steuerbemessungsgrundlage. Darüber hinaus gibt es den investitionsbedingten Gewinnfreibetrag.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie kann ich eine SVS-Nachzahlung vermeiden?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Durch rechtzeitige Anpassung der vorläufigen Beitragsgrundlage (§ 25a Abs 3 GSVG), monatliche Rücklagenbildung von 25-30% des Gewinns und regelmäßige Gewinnprognosen lassen sich überraschende SVS-Nachzahlungen vermeiden.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  )
}
