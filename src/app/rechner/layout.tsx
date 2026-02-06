import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'SVS-Beitragsrechner – SVS Beitraege & Nachzahlung berechnen',
  description:
    'Berechne deine SVS-Beitraege (PV, KV, UV), die Nachzahlung und dein echtes Netto als Selbstaendiger in Oesterreich. Mit aktuellen Werten fuer 2024, 2025 und 2026. Kostenlos.',
  alternates: { canonical: '/rechner' },
  openGraph: {
    title: 'SVS-Beitragsrechner – SVS Nachzahlung berechnen',
    description: 'SVS-Beitraege, Nachzahlung, Einkommensteuer und echtes Netto in Sekunden berechnen.',
    url: '/rechner',
  },
}

export default function RechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SVS Checker Beitragsrechner',
        url: 'https://svs-checker.app/rechner',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne deine SVS-Beitraege, Nachzahlung und echtes Netto als Selbstaendiger in Oesterreich.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
