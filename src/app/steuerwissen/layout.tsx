import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Steuer-Wissen — Österreichisches Steuerrecht einfach erklärt',
  description:
    'Kostenloser KI-Tutor für österreichisches Steuerrecht. ESt, KöSt, USt, BAO und mehr — verständlich erklärt mit §-Referenzen. Basierend auf aktuellem Lehrbuch.',
  alternates: { canonical: '/steuerwissen' },
  openGraph: {
    title: 'Steuer-Wissen — Österreichisches Steuerrecht einfach erklärt',
    description:
      'Frag alles zum österreichischen Steuerrecht — kostenlos. KI-Tutor erklärt ESt, KöSt, USt, Verfahrensrecht und mehr.',
    url: '/steuerwissen',
  },
}

export default function SteuerwissenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Steuer-Wissen — Österreichisches Steuerrecht',
        url: 'https://steuerboard.pro/steuerwissen',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        description: 'Kostenloser KI-Tutor für österreichisches Steuerrecht. Erklärt ESt, KöSt, USt, BAO und mehr mit §-Referenzen.',
        inLanguage: 'de-AT',
      }} />
      {children}
    </>
  )
}
