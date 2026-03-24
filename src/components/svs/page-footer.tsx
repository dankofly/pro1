import Link from 'next/link'

interface PageFooterProps {
  extra?: string
}

export function PageFooter({ extra }: PageFooterProps) {
  return (
    <div className="py-4 px-4 text-center">
      <p className="text-xs text-slate-500 leading-relaxed">
        Alle Angaben ohne Gewähr.{extra ? ` ${extra}` : ''} Kein Ersatz für{' '}
        <Link href="/agb" className="text-slate-400 underline underline-offset-2 hover:text-slate-300 transition-colors">
          professionelle Steuerberatung
        </Link>.
      </p>
    </div>
  )
}
