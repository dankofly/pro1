import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Einkommensteuer Rechner 2026 für Selbständige in Österreich',
  description:
    'Einkommensteuer Rechner für Selbständige: EST-Prognose nach österreichischem Steuertarif 2026. Grenzsteuersatz, Absetzbeträge und Netto berechnen.',
  alternates: { canonical: '/einkommensteuer' },
  openGraph: {
    title: 'Einkommensteuer Rechner 2026 für Selbständige in Österreich',
    description:
      'Einkommensteuer Rechner für Selbständige: EST-Prognose nach österreichischem Steuertarif 2026. Grenzsteuersatz, Absetzbeträge und Netto berechnen.',
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
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Einkommensteuer in Österreich berechnen',
        description: 'So berechnest du deine Einkommensteuer als Selbständiger in Österreich mit allen 7 Tarifstufen und Absetzbeträgen.',
        totalTime: 'PT1M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Jahresgewinn eingeben',
            text: 'Gib deinen Gewinn aus selbständiger Tätigkeit ein (Einnahmen minus Betriebsausgaben).',
          },
          {
            '@type': 'HowToStep',
            name: 'Absetzbeträge konfigurieren',
            text: 'Wähle Familienbonus Plus, Alleinverdienerabsetzbetrag (AVAB), Verkehrsabsetzbetrag und Pendlerpauschale.',
          },
          {
            '@type': 'HowToStep',
            name: 'Steuerbelastung ablesen',
            text: 'Der Rechner zeigt deine Einkommensteuer nach dem progressiven Tarif (§ 33 EStG), den Grenz- und Durchschnittssteuersatz.',
          },
        ],
      }} />
      {children}
    </>
  )
}
