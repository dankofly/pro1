import Link from 'next/link'
import { Calculator } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/[0.04] pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Rechner */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Rechner</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rechner" className="text-blue-200/50 hover:text-blue-200 transition-colors">Steuerrechner</Link></li>
              <li><Link href="/einkommensteuer" className="text-blue-200/50 hover:text-blue-200 transition-colors">Einkommensteuer</Link></li>
              <li><Link href="/misch-einkommen" className="text-blue-200/50 hover:text-blue-200 transition-colors">Mischeinkommen</Link></li>
              <li><Link href="/krypto-steuer" className="text-blue-200/50 hover:text-blue-200 transition-colors">Krypto-Steuer</Link></li>
              <li><Link href="/sachbezug-rechner" className="text-blue-200/50 hover:text-blue-200 transition-colors">Sachbezug</Link></li>
              <li><Link href="/investitionsfreibetrag" className="text-blue-200/50 hover:text-blue-200 transition-colors">Investitionsfreibetrag</Link></li>
              <li><Link href="/bilanz" className="text-blue-200/50 hover:text-blue-200 transition-colors">Bilanz</Link></li>
            </ul>
          </div>
          {/* Steuerwissen */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Steuerwissen</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/steuerwissen-hub" className="text-blue-200/50 hover:text-blue-200 transition-colors">Alle Artikel</Link></li>
              <li><Link href="/steuerwissen/svs-beitraege-senken" className="text-blue-200/50 hover:text-blue-200 transition-colors">SVS-Beiträge senken</Link></li>
              <li><Link href="/steuerwissen/svs-nachzahlung-vermeiden" className="text-blue-200/50 hover:text-blue-200 transition-colors">SVS-Nachzahlung vermeiden</Link></li>
              <li><Link href="/steuerwissen/steueroptimierung-selbststaendige" className="text-blue-200/50 hover:text-blue-200 transition-colors">Steueroptimierung</Link></li>
              <li><Link href="/steuerwissen/gewinnfreibetrag-nutzen" className="text-blue-200/50 hover:text-blue-200 transition-colors">Gewinnfreibetrag</Link></li>
              <li><Link href="/steuerwissen/kleinunternehmerregelung" className="text-blue-200/50 hover:text-blue-200 transition-colors">Kleinunternehmerregelung</Link></li>
              <li><Link href="/steuerwissen/gmbh-vs-einzelunternehmen" className="text-blue-200/50 hover:text-blue-200 transition-colors">GmbH vs. Einzelunternehmen</Link></li>
            </ul>
          </div>
          {/* Mehr Wissen */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Mehr Wissen</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/steuerwissen/nebenberuflich-selbstaendig" className="text-blue-200/50 hover:text-blue-200 transition-colors">Nebenberuflich selbständig</Link></li>
              <li><Link href="/steuerwissen/krypto-steuer-oesterreich" className="text-blue-200/50 hover:text-blue-200 transition-colors">Krypto-Steuer Österreich</Link></li>
              <li><Link href="/steuerwissen/pauschalierung-oesterreich" className="text-blue-200/50 hover:text-blue-200 transition-colors">Pauschalierung</Link></li>
              <li><Link href="/steuerwissen/umsatzsteuer-selbstaendige" className="text-blue-200/50 hover:text-blue-200 transition-colors">Umsatzsteuer</Link></li>
              <li><Link href="/steuerwissen/flexkapg-vs-gmbh" className="text-blue-200/50 hover:text-blue-200 transition-colors">FlexKapG vs. GmbH</Link></li>
              <li><Link href="/steuerwissen/betriebsausgaben-checkliste" className="text-blue-200/50 hover:text-blue-200 transition-colors">Betriebsausgaben</Link></li>
              <li><Link href="/steuerwissen/steuer-jahresplanung" className="text-blue-200/50 hover:text-blue-200 transition-colors">Steuer-Jahresplanung</Link></li>
              <li><Link href="/steuerwissen/svs-nachzahlung-4-jahr" className="text-blue-200/50 hover:text-blue-200 transition-colors">SVS im 4. Jahr</Link></li>
              <li><Link href="/steuerwissen/glossar" className="text-blue-200/50 hover:text-blue-200 transition-colors">Steuer-Glossar</Link></li>
            </ul>
          </div>
          {/* Produkt */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Produkt</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="text-blue-200/50 hover:text-blue-200 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-blue-200/50 hover:text-blue-200 transition-colors">Preise</Link></li>
              <li><Link href="/faq" className="text-blue-200/50 hover:text-blue-200 transition-colors">FAQ</Link></li>
              <li><Link href="/steuerberater" className="text-blue-200/50 hover:text-blue-200 transition-colors">Steuerberater</Link></li>
              <li><Link href="/auth/login" className="text-blue-200/50 hover:text-blue-200 transition-colors">Anmelden</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20">
              <Calculator className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <span className="font-semibold text-white text-sm">SteuerBoard.pro</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-blue-200/40">
            <Link href="/impressum" className="hover:text-blue-200 transition-colors duration-150">Impressum</Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-blue-200 transition-colors duration-150">Datenschutz</Link>
            <span>·</span>
            <Link href="/agb" className="hover:text-blue-200 transition-colors duration-150">AGB</Link>
          </div>
          <p className="text-xs text-blue-200/30" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} SteuerBoard.pro. Alle Rechte vorbehalten.
            <span className="mx-1">·</span>
            <a href="https://hypeakz.io" target="_blank" rel="noopener noreferrer" className="text-blue-200/40 hover:text-blue-200 transition-colors duration-150">App by Hypeakz.io</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
