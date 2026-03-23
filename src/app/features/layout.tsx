import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Features – Alle Funktionen von SteuerBoard.pro',
  description:
    'SVS-Beitragsrechner, Einkommensteuer-Prognose, AI SteuerBoard, Steuer-Chatbot mit 7 Rechnern, GmbH-Vergleich, Pauschalierung und mehr. Alle Features im Überblick.',
  alternates: { canonical: '/features' },
  openGraph: {
    title: 'SteuerBoard.pro Features – Alle Funktionen im Überblick',
    description:
      'Von der kostenlosen SVS-Berechnung bis zum AI SteuerBoard mit 7 spezialisierten Rechnern. Entdecke alle Funktionen.',
    url: '/features',
  },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'SteuerBoard.pro Features',
          description:
            'Alle Funktionen von SteuerBoard.pro: SVS-Rechner, Einkommensteuer, AI SteuerBoard, Steuer-Chatbot und mehr.',
          url: 'https://steuerboard.pro/features',
        }}
      />
      {children}
    </>
  )
}
