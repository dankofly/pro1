'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calculator, LogIn, User, LogOut, Save, Crown } from 'lucide-react'
import { SvsTooltip } from './svs-tooltip'
import Link from 'next/link'
import type { PlanTier } from '@/lib/lemonsqueezy'

interface HeaderProps {
  user?: { email: string } | null
  onSave?: () => void
  onLogout?: () => void
  saving?: boolean
  alertActive?: boolean
  plan?: PlanTier
}

export function SvsHeader({ user, onSave, onLogout, saving, alertActive, plan }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              {alertActive && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">SVS Checker</h1>
              <p className="text-blue-200 text-sm sm:text-base font-light">Dein SVS-Beitragsrechner</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                {plan === 'free' && (
                  <Link href="/pricing">
                    <Button variant="outline" size="sm" className="bg-amber-500/20 border-amber-400/30 text-amber-200 hover:bg-amber-500/30 hover:text-white">
                      <Crown className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  </Link>
                )}
                {onSave && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onSave}
                    disabled={saving}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {saving ? 'Speichert...' : 'Speichern'}
                  </Button>
                )}
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                    <User className="h-4 w-4 mr-1" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-blue-200 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/pricing">
                  <Button variant="outline" size="sm" className="bg-amber-500/20 border-amber-400/30 text-amber-200 hover:bg-amber-500/30 hover:text-white">
                    <Crown className="h-4 w-4 mr-1" />
                    Preise
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                    <LogIn className="h-4 w-4 mr-1" />
                    Anmelden
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <p className="text-blue-100/70 text-sm mt-4 max-w-2xl leading-relaxed">
          Behalte den Überblick über deine SVS-Beiträge als Selbständige/r in Österreich.
          Vermeide die <SvsTooltip term="Nachzahlungsfalle" /> und plane voraus.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-white/10 text-blue-100 border-white/20">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5" />
            Werte 2024/25
          </Badge>
          <Badge variant="outline" className="bg-white/10 text-blue-100 border-white/20">
            AT Österreich
          </Badge>
          {user && (
            <Badge variant="outline" className="bg-white/10 text-blue-100 border-white/20">
              <User className="h-3 w-3 mr-1" />
              {user.email}
            </Badge>
          )}
          {plan && plan !== 'free' && (
            <Badge variant="outline" className="bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Crown className="h-3 w-3 mr-1" />
              {plan === 'pro' ? 'Butler-Vollversion' : 'Sicherheits-Plan'}
            </Badge>
          )}
        </div>
      </div>
    </header>
  )
}
