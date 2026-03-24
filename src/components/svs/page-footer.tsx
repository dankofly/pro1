import Link from 'next/link'

interface PageFooterProps {
  extra?: string
}

export function PageFooter({ extra }: PageFooterProps) {
  return (
    <footer className="mt-12 py-8 px-6 border-t border-slate-800/50" style={{ backgroundColor: 'hsl(var(--sidebar-background))' }}>
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="bg-slate-900/30 rounded-lg p-6 border border-slate-800/50">
          <h4 className="text-slate-300 font-medium text-sm mb-3">
            Rechtlicher Hinweis
          </h4>
          <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
            <p>
              <strong className="text-slate-300">SteuerBoard.pro</strong> – Alle Angaben ohne Gewähr.{extra ? ` ${extra}` : ''}
            </p>
            <p>
              Dieser Rechner ist eine unverbindliche Orientierungshilfe und ersetzt keine{' '}
              <Link href="/agb" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline underline-offset-2">
                professionelle Steuerberatung
              </Link>.
              Die Ergebnisse sind Richtwerte — für verbindliche Auskünfte wende dich an einen Steuerberater.
              Der Betreiber erbringt keine Steuerberatung im Sinne des WTBG.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
