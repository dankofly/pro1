import Link from 'next/link'

interface PageFooterProps {
  extra?: string
}

export function PageFooter({ extra }: PageFooterProps) {
  return (
    <footer className="text-center py-8 text-xs text-muted-foreground space-y-1">
      <p>SteuerBoard.pro – Alle Angaben ohne Gewähr.{extra ? ` ${extra}` : ''}</p>
      <p>
        Powered by{' '}
        <Link
          href="https://hypeakz.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground/60 hover:text-foreground transition-colors"
        >
          HYPEAKZ.IO
        </Link>
      </p>
    </footer>
  )
}
