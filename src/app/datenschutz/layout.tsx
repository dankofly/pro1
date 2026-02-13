import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von SteuerBoard.pro. Informationen zur Datenverarbeitung gemäß DSGVO.',
  alternates: { canonical: '/datenschutz' },
}

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
