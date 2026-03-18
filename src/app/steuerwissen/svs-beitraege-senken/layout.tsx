import { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'SVS-Beiträge senken — 7 legale Strategien für Selbständige',
  description: 'SVS Beiträge senken: 7 bewährte Strategien für Selbständige in Österreich. SVS Beiträge reduzieren durch Gewinnfreibetrag, Betriebsausgaben und mehr. Jetzt Steuern sparen.',
  keywords: ['SVS Beiträge senken', 'SVS Beiträge reduzieren', 'SVS Selbständige Österreich', 'SVS Mindestbeiträge', 'Sozialversicherung Selbständige'],
  alternates: { canonical: '/steuerwissen/svs-beitraege-senken' },
  openGraph: {
    title: 'SVS-Beiträge senken — 7 legale Strategien für Selbständige',
    description: 'SVS Beiträge senken: 7 bewährte Strategien für Selbständige in Österreich. Jetzt Sozialversicherungsbeiträge legal reduzieren.',
    type: 'article',
    url: '/steuerwissen/svs-beitraege-senken',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVS-Beiträge senken — 7 legale Strategien für Selbständige',
    description: 'SVS Beiträge senken: 7 bewährte Strategien für Selbständige in Österreich. Jetzt Sozialversicherungsbeiträge legal reduzieren.',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": "/steuerwissen/svs-beitraege-senken#article",
              "headline": "SVS-Beiträge senken — 7 legale Strategien für Selbständige in Österreich",
              "description": "SVS Beiträge senken: 7 bewährte Strategien für Selbständige in Österreich. SVS Beiträge reduzieren durch Gewinnfreibetrag, Betriebsausgaben und mehr.",
              "datePublished": "2024-03-18T00:00:00+01:00",
              "dateModified": "2024-03-18T00:00:00+01:00",
              "author": {
                "@type": "Organization",
                "name": "Pro1 Steuerberatung"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Pro1 Steuerberatung"
              },
              "mainEntityOfPage": "/steuerwissen/svs-beitraege-senken",
              "articleSection": "Steuerwissen",
              "keywords": "SVS Beiträge senken, SVS Beiträge reduzieren, SVS Selbständige Österreich, Sozialversicherung"
            },
            {
              "@type": "FAQPage",
              "@id": "/steuerwissen/svs-beitraege-senken#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Wie kann ich meine SVS-Beiträge legal senken?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sie können Ihre SVS-Beiträge durch verschiedene legale Strategien senken: Gewinnfreibetrag nutzen (§ 10 EStG), Betriebsausgaben optimieren, Investitionsfreibetrag anwenden, Antrag auf niedrigere vorläufige Beitragsgrundlage stellen, Kleinunternehmerregelung prüfen, Pauschalierung nutzen oder ab höherem Gewinn eine GmbH-Gründung erwägen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Was sind die SVS-Mindestbeiträge für Selbständige?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die SVS-Beiträge setzen sich zusammen aus: Pensionsversicherung 18,50%, Krankenversicherung 6,80%, Selbständigenvorsorge 1,53% und Unfallversicherung pauschal ca. 11,35€/Monat. Die Mindestbeitragsgrundlage beträgt ca. 500€/Monat, die Höchstbeitragsgrundlage ca. 7.070€/Monat (2024)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kann ich als Jungunternehmer SVS-Beiträge sparen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, als Jungunternehmer profitieren Sie von reduzierten SVS-Mindestbeiträgen in den ersten zwei Jahren der Selbständigkeit. Die genaue Höhe der Reduktion hängt von Ihrem Einkommen und der Art Ihrer Tätigkeit ab."
                  }
                }
              ]
            }
          ]
        }}
      />
      {children}
    </>
  )
}