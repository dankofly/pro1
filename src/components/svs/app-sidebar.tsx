'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, Crown, Shield, LogOut, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { isAdmin } from '@/lib/admin'
import type { NavSection } from '@/lib/nav-config'
import type { PlanTier } from '@/lib/stripe'

interface AppSidebarProps {
  user?: { email: string } | null
  plan?: PlanTier
  onLogout?: () => void
  navSections: NavSection[]
}

export function AppSidebar({ user, plan, onLogout, navSections }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-[240px] min-h-screen bg-sidebar text-white shrink-0 border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-5 pb-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight font-heading">SteuerBoard.pro</p>
            <p className="text-[11px] text-slate-400">Beitragsrechner AT</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-5 overflow-y-auto scrollbar-thin">
        {navSections.map((section, si) => (
          <div key={section.title}>
            {si > 0 && <div className="border-t border-white/[0.06] mb-4" />}
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const locked = item.requiresPro && plan !== 'pro'

                return (
                  <Link key={item.href} href={item.href} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar">
                    <div
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                        ${isActive
                          ? 'bg-emerald-500/12 text-emerald-400'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                        }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                      )}
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {locked && (
                        <Crown className="h-3 w-3 text-amber-400 ml-auto shrink-0" />
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {user && isAdmin(user.email) && (
          <div>
            <div className="border-t border-white/[0.06] mb-4" />
            <Link href="/admin" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar">
              <div
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
                  ${pathname === '/admin'
                    ? 'bg-emerald-500/12 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
              >
                {pathname === '/admin' && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                )}
                <Shield className="h-4 w-4 shrink-0" />
                <span>Admin</span>
              </div>
            </Link>
          </div>
        )}
      </nav>

      {/* User section */}
      <div className="p-4 pt-3 border-t border-white/[0.08]">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 truncate">{user.email}</p>
                {plan && plan !== 'free' && (
                  <Badge className="mt-0.5 bg-amber-500/20 text-amber-300 border-amber-400/30 text-[10px] px-1.5 py-0">
                    {plan === 'pro' ? 'Pro' : 'Basic'}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-slate-500 hover:text-slate-200 hover:bg-white/[0.04] h-9 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 mr-2" />
              <span className="text-xs">Abmelden</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] h-9">
              <Link href="/auth/login">
                <User className="h-3.5 w-3.5 mr-2" />
                <span className="text-xs">Anmelden</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
