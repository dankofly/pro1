import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Misch-Einkommen Rechner — Anstellung + Selbständig berechnen',
  description:
    'Misch-Einkommen Rechner: Berechne dein Netto bei Anstellung plus Selbständigkeit. SVS-Differenzvorschreibung, kombinierte Steuerbelastung und echtes Netto.',
  alternates: { canonical: '/misch-einkommen' },
  openGraph: {
    title: 'Misch-Einkommen Rechner — Anstellung + Selbständig berechnen',
    description: 'Misch-Einkommen Rechner: Berechne dein Netto bei Anstellung plus Selbständigkeit. SVS-Differenzvorschreibung, kombinierte Steuerbelastung und echtes Netto.',
    url: '/misch-einkommen',
  },
}

const MISCH_HOWTO_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Misch-Einkommen berechnen: Angestellt und selbständig in Österreich',
  description: 'So berechnest du dein echtes Netto, wenn du angestellt bist und nebenbei selbständig arbeitest.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Bruttolohn eingeben',
      text: 'Gib dein monatliches Bruttogehalt aus deiner Anstellung ein.',
    },
    {
      '@type': 'HowToStep',
      name: 'Gewinn aus Selbständigkeit eingeben',
      text: 'Gib deinen Jahresgewinn aus der selbständigen Tätigkeit ein (Umsatz minus Betriebsausgaben).',
    },
    {
      '@type': 'HowToStep',
      name: 'Absetzbeträge konfigurieren',
      text: 'Wähle Familienbonus Plus, AVAB und weitere Absetzbeträge, die auf dich zutreffen.',
    },
    {
      '@type': 'HowToStep',
      name: 'Ergebnis analysieren',
      text: 'Sieh dein kombiniertes Netto, die SVS-Differenz-Vorschreibung und die Gesamtsteuerbelastung.',
    },
  ],
}

export default function MischLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Misch-Einkommen Rechner Österreich',
        url: 'https://steuerboard.pro/misch-einkommen',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Berechne dein kombiniertes Netto bei Anstellung und Nebengewerbe in Österreich.',
        inLanguage: 'de-AT',
      }} />
      <JsonLd data={MISCH_HOWTO_JSONLD} />
      {children}
    </>
  )
}
