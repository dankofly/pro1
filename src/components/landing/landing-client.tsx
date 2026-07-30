'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

/* ─── Recovery redirect interceptor ─── */
export function RecoveryRedirect() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || !hash.includes('access_token')) return
    window.location.href = '/auth/callback' + hash
  }, [])

  return null
}

/* ─── Navbar ─── */
const NAV_LINKS = [
  { href: '/rechner', label: 'Rechner', isAnchor: false },
  // /#anker statt #anker: funktioniert auch von Unterseiten aus
  { href: '/#features', label: 'Features', isAnchor: true },
  { href: '/#pricing', label: 'Preise', isAnchor: true },
  { href: '/#faq', label: 'FAQ', isAnchor: true },
  { href: '/steuerwissen-hub', label: 'Steuerwissen', isAnchor: false },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[14px] border border-sb-line bg-[oklch(0.21_0.008_60/0.85)] py-2.5 pl-4 pr-3 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-[17px] font-bold text-sb-text">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-sb-accent font-mono text-[13px] font-semibold text-sb-accent-ink">
            SB
          </span>
          SteuerBoard
        </Link>

        <div className="hidden items-center gap-7 text-[14.5px] text-sb-mut md:flex">
          {NAV_LINKS.map((l) =>
            l.isAnchor ? (
              <a key={l.href} href={l.href} className="transition-colors duration-150 hover:text-sb-text">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="transition-colors duration-150 hover:text-sb-text">
                {l.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="hidden text-[14.5px] text-sb-mut transition-colors duration-150 hover:text-sb-text sm:block">
            Anmelden
          </Link>
          {/* Unter 420px kollidiert der CTA mit dem Wortmarken-Logo; das Burger-Menü deckt den Einstieg ab */}
          <Link
            href="/rechner"
            className="hidden min-[420px]:inline-flex h-9 items-center rounded-[10px] bg-sb-accent px-4 font-heading text-sm font-semibold text-sb-accent-ink transition-colors duration-150 hover:bg-sb-accent-deep"
          >
            Rechner öffnen
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-sb-text transition-colors duration-150 hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mx-auto max-w-6xl overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-2 space-y-1 rounded-[14px] border border-sb-line bg-[oklch(0.21_0.008_60/0.95)] px-3 py-3 backdrop-blur-md">
          {NAV_LINKS.map((l) =>
            l.isAnchor ? (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-base text-sb-mut transition-colors duration-150 hover:bg-white/5 hover:text-sb-text"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-base text-sb-mut transition-colors duration-150 hover:bg-white/5 hover:text-sb-text"
              >
                {l.label}
              </Link>
            )
          )}
          <div className="border-t border-sb-line pt-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-base text-sb-mut transition-colors duration-150 hover:bg-white/5 hover:text-sb-text"
            >
              Anmelden
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
