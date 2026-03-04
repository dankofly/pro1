import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Einkommensteuer-Rechner 2026 — Steuer sofort berechnen',
  description:
    'Berechne deine österreichische Einkommensteuer 2026 mit allen 7 Tarifstufen, Familienbonus Plus und Absetzbeträgen. Kostenlos und sofort.',
  alternates: { canonical: '/einkommensteuer' },
  openGraph: {
    title: 'Einkommensteuer-Rechner 2026 — Steuer sofort berechnen',
    description:
      'Österreichische Einkommensteuer 2026 berechnen: 7 Tarifstufen, Familienbonus Plus, Alleinverdienerabsetzbetrag und mehr.',
    url: '/einkommensteuer',
  },
}

export default function EinkommensteuerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Einkommensteuer-Rechner Österreich 2026',
        url: 'https://steuerboard.pro/einkommensteuer',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne deine österreichische Einkommensteuer 2026 mit allen 7 Tarifstufen, Familienbonus Plus und Absetzbeträgen.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
