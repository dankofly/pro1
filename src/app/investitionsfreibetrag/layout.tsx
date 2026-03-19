import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Investitionsfreibetrag Rechner 2026 — IFB 15%/20% berechnen',
  description:
    'Investitionsfreibetrag Rechner: IFB 15% (Standard) und 20% (ökologisch) nach § 11 EStG berechnen. Steuerersparnis für Selbständige in Österreich.',
  alternates: { canonical: '/investitionsfreibetrag' },
  openGraph: {
    title: 'Investitionsfreibetrag Rechner 2026 — IFB 15%/20% berechnen',
    description:
      'Investitionsfreibetrag Rechner: IFB 15% (Standard) und 20% (ökologisch) nach § 11 EStG berechnen. Steuerersparnis für Selbständige in Österreich.',
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
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Investitionsfreibetrag und Gewinnfreibetrag berechnen',
        description: 'So nutzt du den Investitionsfreibetrag (IFB) und Gewinnfreibetrag (GFB) in Österreich, um deine Steuerlast zu senken.',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Gewinn und Investitionen eingeben',
            text: 'Gib deinen Jahresgewinn und geplante betriebliche Investitionen ein.',
          },
          {
            '@type': 'HowToStep',
            name: 'Freibeträge berechnen',
            text: 'Der Rechner ermittelt den Gewinnfreibetrag (15 %, § 10 EStG), den Investitionsfreibetrag (20 %/22 %, § 11 EStG) und die Forschungsprämie (14 %).',
          },
          {
            '@type': 'HowToStep',
            name: 'Steuerersparnis ablesen',
            text: 'Sieh die konkrete Steuerersparnis in EUR durch die Nutzung der Freibeträge.',
          },
        ],
      }} />
      {children}
    </>
  )
}
