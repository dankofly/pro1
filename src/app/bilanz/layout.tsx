import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { ToolIntro } from '@/components/tool-intro'

export const metadata: Metadata = {
  title: 'Bilanz-Rechner — Bilanzierungspflicht & EAR-Grenze prüfen',
  description:
    'Bilanzierungspflicht prüfen: Ab welchem Umsatz gilt die Pflicht zur doppelten Buchführung? EAR vs Bilanz Vergleich für Österreich.',
  alternates: { canonical: '/bilanz' },
  openGraph: {
    title: 'Bilanz-Rechner — Bilanzierungspflicht & EAR-Grenze prüfen',
    description:
      'Bilanzierungspflicht prüfen: Ab welchem Umsatz gilt die Pflicht zur doppelten Buchführung? EAR vs Bilanz Vergleich für Österreich.',
    url: '/bilanz',
  },
}

export default function BilanzLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Bilanz-Analyse & AI Forecast',
        url: 'https://steuerboard.pro/bilanz',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '24.90',
          priceCurrency: 'EUR',
          description: 'Pro-Plan für vollen Zugriff inkl. AI Forecast',
        },
        description: 'Bilanz hochladen, Finanzkennzahlen berechnen und AI-gestützten Forecast mit Steueroptimierung erhalten.',
        inLanguage: 'de-AT',
      }} />
      <ToolIntro h1="Bilanz-Analyse für Selbständige und GmbHs">
        Das Tool liest deine Kennzahlen aus und gibt eine erste Orientierung zu Ergebnis und
        Steuerlast. Orientierungshilfe, keine Wirtschaftsprüfung und keine Steuerberatung.
      </ToolIntro>
      {children}
    </>
  )
}
