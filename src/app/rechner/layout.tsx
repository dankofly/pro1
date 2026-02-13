import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'SVS-Beitragsrechner – SVS Beiträge & Nachzahlung berechnen',
  description:
    'Berechne deine SVS-Beiträge (PV, KV, UV), die Nachzahlung und dein echtes Netto als Selbständiger in Österreich. Mit aktuellen Werten für 2024, 2025 und 2026. Kostenlos.',
  alternates: { canonical: '/rechner' },
  openGraph: {
    title: 'SVS-Beitragsrechner – SVS Nachzahlung berechnen',
    description: 'SVS-Beiträge, Nachzahlung, Einkommensteuer und echtes Netto in Sekunden berechnen.',
    url: '/rechner',
  },
}

export default function RechnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SteuerBoard.pro Beitragsrechner',
        url: 'https://steuerboard.pro/rechner',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne deine SVS-Beiträge, Nachzahlung und echtes Netto als Selbständiger in Österreich.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
