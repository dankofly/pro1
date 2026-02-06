'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, BarChart3, Clock, Crown, Shield, LogOut, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { isAdmin } from '@/lib/admin'
import type { PlanTier } from '@/lib/lemonsqueezy'

interface AppSidebarProps {
  user?: { email: string } | null
  plan?: PlanTier
  onLogout?: () => void
}

const NAV_ITEMS = [
  { href: '/rechner', label: 'Rechner', icon: Calculator },
  { href: '/misch-einkommen', label: 'Optimierung', icon: BarChart3, requiresPro: true },
  { href: '/dashboard', label: 'Verlauf', icon: Clock },
  { href: '/pricing', label: 'Pro-Vorteile', icon: Crown },
  { href: '/profil', label: 'Profil', icon: User },
]

export function AppSidebar({ user, plan, onLogout }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-[220px] min-h-screen bg-slate-900 text-white shrink-0">
      {/* Logo */}
      <div className="p-5 pb-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight">SVS Checker</p>
            <p className="text-[11px] text-slate-400">Beitragsrechner AT</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const locked = item.requiresPro && plan !== 'pro'

          return (
            <Link key={item.href} href={item.href}>
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

        {user && isAdmin(user.email) && (
          <Link href="/admin">
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

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <User className="h-4 w-4 text-slate-300" />
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
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5 h-8"
            >
              <LogOut className="h-3.5 w-3.5 mr-2" />
              <span className="text-xs">Abmelden</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href="/auth/login" className="block">
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/5 h-8">
                <User className="h-3.5 w-3.5 mr-2" />
                <span className="text-xs">Anmelden</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
