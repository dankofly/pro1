'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calculator, Menu, X } from 'lucide-react'

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
  { href: '#problem', label: 'Problem', isAnchor: true },
  { href: '/features', label: 'Features', isAnchor: false },
  { href: '#pricing', label: 'Preise', isAnchor: true },
  { href: '#faq', label: 'FAQ', isAnchor: true },
  { href: '/steuerwissen-hub', label: 'Steuerwissen', isAnchor: false },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || mobileOpen
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/[0.06] shadow-elevation-3'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
              <Calculator className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="font-bold text-white text-lg font-heading">SteuerBoard.pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-blue-200">
            {NAV_LINKS.map((l) =>
              l.isAnchor ? (
                <a key={l.href} href={l.href} className="hover:text-white transition-colors duration-150">{l.label}</a>
              ) : (
                <Link key={l.href} href={l.href} className="hover:text-white transition-colors duration-150">{l.label}</Link>
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-blue-200 hover:text-white hover:bg-white/10">
            <Link href="/auth/login">Anmelden</Link>
          </Button>
          <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-elevation-2 shadow-emerald-500/25">
            <Link href="/rechner">Jetzt berechnen</Link>
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors duration-150 cursor-pointer"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/[0.04] px-4 pb-6 pt-2 space-y-1">
          {NAV_LINKS.map((l) =>
            l.isAnchor ? (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 text-base text-blue-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 text-base text-blue-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150"
              >
                {l.label}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-white/[0.04]">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-base text-blue-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150"
            >
              Anmelden
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
