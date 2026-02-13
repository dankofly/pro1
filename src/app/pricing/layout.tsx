import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Preise – SteuerBoard.pro Pläne',
  description:
    'SteuerBoard.pro Preise: Kostenloser SVS-Beitragsrechner, Sicherheits-Plan ab 9,90 EUR/Monat, Pro ab 19,90 EUR/Monat. Monatlich kündbar.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'SteuerBoard.pro Preise – Starte kostenlos',
    description: 'Free, Sicherheits-Plan und Pro: Alle Features und Preise im Überblick.',
    url: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SteuerBoard.pro',
        applicationCategory: 'FinanceApplication',
        offers: [
          {
            '@type': 'Offer',
            name: 'Free',
            price: '0',
            priceCurrency: 'EUR',
            description: 'SVS-Beitragsrechner und Wahrheits-Tabelle',
          },
          {
            '@type': 'Offer',
            name: 'Sicherheits-Plan',
            price: '9.90',
            priceCurrency: 'EUR',
            description: 'Einkommensteuer-Prognose, Berechnungen speichern, Dashboard',
          },
          {
            '@type': 'Offer',
            name: 'SteuerBoard Pro',
            price: '19.90',
            priceCurrency: 'EUR',
            description: 'Misch-Einkommen, Familienbonus, Wasserfall-Analyse, PDF-Export',
          },
        ],
      }} />
      {children}
    </>
  )
}
