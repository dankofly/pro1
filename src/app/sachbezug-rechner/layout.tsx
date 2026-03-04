import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Sachbezug-Rechner 2026 — Mitarbeiter-Benefits berechnen',
  description:
    'Berechne Sachbezugswerte für Firmenwagen (CO2-basiert), Essensgutscheine, Zukunftssicherung und weitere steuerfreie Mitarbeiter-Benefits in Österreich 2026.',
  alternates: { canonical: '/sachbezug-rechner' },
  openGraph: {
    title: 'Sachbezug-Rechner 2026 — Mitarbeiter-Benefits berechnen',
    description:
      'Firmenwagen-Sachbezug, steuerfreie Benefits und Lohnnebenkosten-Ersparnis berechnen. Für Arbeitgeber in Österreich.',
    url: '/sachbezug-rechner',
  },
}

export default function SachbezugLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Sachbezug-Rechner Österreich 2026',
        url: 'https://steuerboard.pro/sachbezug-rechner',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne Sachbezugswerte für Firmenwagen, Essensgutscheine und steuerfreie Mitarbeiter-Benefits in Österreich.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
