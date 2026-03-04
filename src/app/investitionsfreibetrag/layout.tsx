import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Investitionsfreibetrag-Rechner 2026 — IFB & Gewinnfreibetrag',
  description:
    'Berechne deinen Investitionsfreibetrag (20%/22%), Gewinnfreibetrag (15%) und Forschungsprämie (14%) für Österreich 2026. Steuerersparnis sofort berechnen.',
  alternates: { canonical: '/investitionsfreibetrag' },
  openGraph: {
    title: 'Investitionsfreibetrag-Rechner 2026',
    description:
      'IFB 20%/22%, Gewinnfreibetrag 15% und Forschungsprämie 14% — Steuerersparnis durch Investitionen in Österreich berechnen.',
    url: '/investitionsfreibetrag',
  },
}

export default function IFBLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Investitionsfreibetrag-Rechner Österreich 2026',
        url: 'https://steuerboard.pro/investitionsfreibetrag',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne Investitionsfreibetrag (20%/22%), Gewinnfreibetrag und Forschungsprämie für Österreich 2026.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
