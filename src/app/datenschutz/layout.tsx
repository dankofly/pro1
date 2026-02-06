import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklaerung',
  description: 'Datenschutzerklaerung von SVS Checker. Informationen zur Datenverarbeitung gemaess DSGVO.',
  alternates: { canonical: '/datenschutz' },
}

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
