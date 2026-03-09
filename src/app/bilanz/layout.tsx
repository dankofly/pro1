import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Bilanz-Analyse & AI Forecast — Kennzahlen und Steueroptimierung',
  description:
    'Lade deine Bilanz hoch und erhalte sofort Finanzkennzahlen, Steueranalyse und AI-gestützten Forecast mit Optimierungsvorschlägen. Für österreichische Unternehmen.',
  alternates: { canonical: '/bilanz' },
  openGraph: {
    title: 'Bilanz-Analyse & AI Forecast',
    description:
      'Bilanz hochladen, Kennzahlen berechnen, Steueroptimierung erhalten. Mit AI-Forecast in 3 Szenarien.',
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
      {children}
    </>
  )
}
