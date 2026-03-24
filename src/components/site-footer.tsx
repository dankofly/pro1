import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/50 pt-16 pb-8" style={{ backgroundColor: 'hsl(var(--sidebar-background))' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Rechner */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Rechner</h3>
            <ul className="space-y-3">
              <li><Link href="/rechner" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Steuerrechner</Link></li>
              <li><Link href="/einkommensteuer" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Einkommensteuer</Link></li>
              <li><Link href="/misch-einkommen" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Mischeinkommen</Link></li>
              <li><Link href="/krypto-steuer" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Krypto-Steuer</Link></li>
              <li><Link href="/sachbezug-rechner" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Sachbezug</Link></li>
              <li><Link href="/investitionsfreibetrag" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Investitionsfreibetrag</Link></li>
              <li><Link href="/bilanz" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Bilanz</Link></li>
            </ul>
          </div>

          {/* Steuerwissen */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Steuerwissen</h3>
            <ul className="space-y-3">
              <li><Link href="/steuerwissen-hub" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Alle Artikel</Link></li>
              <li><Link href="/steuerwissen/svs-beitraege-senken" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">SVS-Beiträge senken</Link></li>
              <li><Link href="/steuerwissen/svs-nachzahlung-vermeiden" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">SVS-Nachzahlung vermeiden</Link></li>
              <li><Link href="/steuerwissen/steueroptimierung-selbststaendige" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Steueroptimierung</Link></li>
              <li><Link href="/steuerwissen/gewinnfreibetrag-nutzen" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Gewinnfreibetrag</Link></li>
              <li><Link href="/steuerwissen/kleinunternehmerregelung" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Kleinunternehmerregelung</Link></li>
              <li><Link href="/steuerwissen/gmbh-vs-einzelunternehmen" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">GmbH vs. Einzelunternehmen</Link></li>
            </ul>
          </div>

          {/* Mehr Wissen */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Mehr Wissen</h3>
            <ul className="space-y-3">
              <li><Link href="/steuerwissen/nebenberuflich-selbstaendig" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Nebenberuflich selbständig</Link></li>
              <li><Link href="/steuerwissen/krypto-steuer-oesterreich" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Krypto-Steuer Österreich</Link></li>
              <li><Link href="/steuerwissen/pauschalierung-oesterreich" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Pauschalierung</Link></li>
              <li><Link href="/steuerwissen/umsatzsteuer-selbstaendige" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Umsatzsteuer</Link></li>
              <li><Link href="/steuerwissen/flexkapg-vs-gmbh" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">FlexKapG vs. GmbH</Link></li>
              <li><Link href="/steuerwissen/betriebsausgaben-checkliste" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Betriebsausgaben</Link></li>
              <li><Link href="/steuerwissen/steuer-jahresplanung" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Steuer-Jahresplanung</Link></li>
              <li><Link href="/steuerwissen/svs-nachzahlung-4-jahr" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">SVS im 4. Jahr</Link></li>
              <li><Link href="/steuerwissen/glossar" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Steuer-Glossar</Link></li>
            </ul>
          </div>

          {/* Produkt */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Produkt</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Features</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Preise</Link></li>
              <li><Link href="/faq" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">FAQ</Link></li>
              <li><Link href="/steuerberater" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Steuerberater</Link></li>
              <li><Link href="/auth/login" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed">Anmelden</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/20">
                <Calculator className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="font-semibold text-white text-base">SteuerBoard.pro</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/impressum" className="hover:text-white transition-colors duration-200">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors duration-200">Datenschutz</Link>
              <Link href="/agb" className="hover:text-white transition-colors duration-200">AGB</Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span suppressHydrationWarning>
                &copy; {new Date().getFullYear()} SteuerBoard.pro
              </span>
              <span className="text-slate-600">·</span>
              <a
                href="https://hypeakz.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 transition-colors duration-200"
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
