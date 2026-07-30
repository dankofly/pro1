import Link from 'next/link'

const FOOTER_COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Rechner',
    links: [
      { href: '/rechner', label: 'Steuerrechner' },
      { href: '/einkommensteuer', label: 'Einkommensteuer' },
      { href: '/misch-einkommen', label: 'Mischeinkommen' },
      { href: '/krypto-steuer', label: 'Krypto-Steuer' },
      { href: '/sachbezug-rechner', label: 'Sachbezug' },
      { href: '/investitionsfreibetrag', label: 'Investitionsfreibetrag' },
      { href: '/bilanz', label: 'Bilanz' },
    ],
  },
  {
    title: 'Steuerwissen',
    links: [
      { href: '/steuerwissen-hub', label: 'Alle Artikel' },
      { href: '/steuerwissen/svs-beitraege-senken', label: 'SVS-Beiträge senken' },
      { href: '/steuerwissen/svs-nachzahlung-vermeiden', label: 'SVS-Nachzahlung vermeiden' },
      { href: '/steuerwissen/steueroptimierung-selbststaendige', label: 'Steueroptimierung' },
      { href: '/steuerwissen/gewinnfreibetrag-nutzen', label: 'Gewinnfreibetrag' },
      { href: '/steuerwissen/kleinunternehmerregelung', label: 'Kleinunternehmerregelung' },
      { href: '/steuerwissen/gmbh-vs-einzelunternehmen', label: 'GmbH vs. Einzelunternehmen' },
    ],
  },
  {
    title: 'Mehr Wissen',
    links: [
      { href: '/steuerwissen/nebenberuflich-selbstaendig', label: 'Nebenberuflich selbständig' },
      { href: '/steuerwissen/krypto-steuer-oesterreich', label: 'Krypto-Steuer Österreich' },
      { href: '/steuerwissen/pauschalierung-oesterreich', label: 'Pauschalierung' },
      { href: '/steuerwissen/umsatzsteuer-selbstaendige', label: 'Umsatzsteuer' },
      { href: '/steuerwissen/flexkapg-vs-gmbh', label: 'FlexKapG vs. GmbH' },
      { href: '/steuerwissen/betriebsausgaben-checkliste', label: 'Betriebsausgaben' },
      { href: '/steuerwissen/steuer-jahresplanung', label: 'Steuer-Jahresplanung' },
      { href: '/steuerwissen/svs-nachzahlung-4-jahr', label: 'SVS im 4. Jahr' },
      { href: '/steuerwissen/glossar', label: 'Steuer-Glossar' },
    ],
  },
  {
    title: 'Produkt',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Preise' },
      { href: '/faq', label: 'FAQ' },
      { href: '/steuerberater', label: 'Steuerberater' },
      { href: '/auth/login', label: 'Anmelden' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-sb-line bg-sb-deep pb-8 pt-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-sb-dim">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm leading-relaxed text-sb-mut transition-colors duration-200 hover:text-sb-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal line */}
        <p className="mb-8 text-center text-xs text-sb-dim">
          Alle Angaben ohne Gewähr. Kein Ersatz für professionelle Steuerberatung. Der Betreiber erbringt keine
          Steuerberatung im Sinne des WTBG.
        </p>

        {/* Bottom bar */}
        <div className="border-t border-sb-line pt-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-sb-accent font-mono text-[13px] font-semibold text-sb-accent-ink">
                SB
              </span>
              <span className="font-heading text-base font-semibold text-sb-text">SteuerBoard.pro</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-sb-mut">
              <Link href="/impressum" className="transition-colors duration-200 hover:text-sb-text">Impressum</Link>
              <Link href="/datenschutz" className="transition-colors duration-200 hover:text-sb-text">Datenschutz</Link>
              <Link href="/agb" className="transition-colors duration-200 hover:text-sb-text">AGB</Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-sb-dim">
              <span suppressHydrationWarning>
                &copy; {new Date().getFullYear()} SteuerBoard.pro
              </span>
              <span aria-hidden>·</span>
              <a
                href="https://hypeakz.io"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-sb-mut"
              >
                App by Hypeakz.io
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
