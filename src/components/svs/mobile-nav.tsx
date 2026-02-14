'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, BarChart3, Clock, Crown, HelpCircle, User, Shield, Menu, LogOut } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppShell } from './app-shell'
import { isAdmin } from '@/lib/admin'

const NAV_ITEMS = [
  { href: '/rechner', label: 'Rechner', icon: Calculator },
  { href: '/misch-einkommen', label: 'Optimierung', icon: BarChart3, requiresPro: true },
  { href: '/dashboard', label: 'Verlauf', icon: Clock },
  { href: '/pricing', label: 'Pro-Vorteile', icon: Crown },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/profil', label: 'Profil', icon: User },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user, subscription, handleLogout } = useAppShell()

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menü öffnen</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0 bg-slate-900 text-white border-slate-800">
          <SheetHeader className="p-5 pb-4 border-b border-white/10">
            <SheetTitle className="text-left">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight text-white">SteuerBoard.pro</p>
                  <p className="text-[11px] text-slate-400 font-normal">Beitragsrechner AT</p>
                </div>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              const locked = item.requiresPro && subscription.plan !== 'pro'

              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {locked && (
                      <Crown className="h-3 w-3 text-amber-400 ml-auto shrink-0" />
                    )}
                  </div>
                </Link>
              )
            })}

            {user && isAdmin(user.email ?? '') && (
              <Link href="/admin" onClick={() => setOpen(false)}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${pathname === '/admin'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Shield className="h-4 w-4 shrink-0" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </nav>

          <div className="mt-auto p-4 border-t border-white/10">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <User className="h-4 w-4 text-slate-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 truncate">{user.email}</p>
                    {subscription.plan && subscription.plan !== 'free' && (
                      <Badge className="mt-0.5 bg-amber-500/20 text-amber-300 border-amber-400/30 text-[10px] px-1.5 py-0">
                        {subscription.plan === 'pro' ? 'Pro' : 'Basic'}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { handleLogout(); setOpen(false) }}
                  className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5 h-8"
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  <span className="text-xs">Abmelden</span>
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm" className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/5 h-8">
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <User className="h-3.5 w-3.5 mr-2" />
                  <span className="text-xs">Anmelden</span>
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
