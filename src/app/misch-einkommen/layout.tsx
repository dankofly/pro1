import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Misch-Einkommen Rechner – Angestellt + Selbstaendig',
  description:
    'Berechne dein kombiniertes Netto bei Anstellung und Nebengewerbe. SVS-Differenz-Vorschreibung, Einkommensteuer, Familienbonus und alle Absetzbeträge für 2024–2026.',
  alternates: { canonical: '/misch-einkommen' },
  openGraph: {
    title: 'Misch-Einkommen Rechner – Angestellt + Selbstaendig in Österreich',
    description: 'Was bleibt vom Nebengewerbe wirklich übrig? Berechne SVS, Steuer und echtes Netto.',
    url: '/misch-einkommen',
  },
}

export default function MischLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
