import Link from 'next/link'

interface PageFooterProps {
  extra?: string
}

export function PageFooter({ extra }: PageFooterProps) {
  return (
    <footer className="text-center py-6 px-4 text-xs space-y-1" style={{ backgroundColor: 'hsl(var(--sidebar-background))' }}>
      <p className="text-blue-200/70">SteuerBoard.pro – Alle Angaben ohne Gewähr.{extra ? ` ${extra}` : ''}</p>
      <p className="text-blue-200/60">
        Dieser Rechner ist eine unverbindliche Orientierungshilfe und ersetzt keine{' '}
        <Link href="/agb" className="underline hover:text-blue-200 transition-colors text-blue-200/70">professionelle Steuerberatung</Link>.
        Die Ergebnisse sind Richtwerte — für verbindliche Auskünfte wende dich an einen Steuerberater.
        Der Betreiber erbringt keine Steuerberatung im Sinne des WTBG.
      </p>
      <p className="text-blue-200/60">
        Powered by{' '}
        <Link
          href="https://hypeakz.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-200/70 hover:text-blue-200 transition-colors"
        >
          HYPEAKZ.IO
        </Link>
      </p>
    </footer>
  )
}
