import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Misch-Einkommen Rechner – Angestellt + Selbstaendig',
  description:
    'Berechne dein kombiniertes Netto bei Anstellung und Nebengewerbe. SVS-Differenz-Vorschreibung, Einkommensteuer, Familienbonus und alle Absetzbetraege fuer 2024–2026.',
  alternates: { canonical: '/misch-einkommen' },
  openGraph: {
    title: 'Misch-Einkommen Rechner – Angestellt + Selbstaendig in Oesterreich',
    description: 'Was bleibt vom Nebengewerbe wirklich uebrig? Berechne SVS, Steuer und echtes Netto.',
    url: '/misch-einkommen',
  },
}

export default function MischLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
