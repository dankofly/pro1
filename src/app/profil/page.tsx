'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown, ExternalLink, User, Mail, Calendar, LogOut, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function ProfilContent() {
  const router = useRouter()
  const { user, authLoading, subscription, handleLogout } = useAppShell()

  useEffect(() => {
    if (!authLoading && !subscription.loading && user === null) {
      router.push('/auth/login?redirect=/profil')
    }
  }, [user, authLoading, subscription.loading, router])

  if (!user) return null

  const planLabel =
    subscription.plan === 'pro'
      ? 'SVS Checker Pro'
      : subscription.plan === 'basic'
        ? 'Sicherheits-Plan'
        : 'Free'

  const statusLabel =
    subscription.status === 'active'
      ? 'Aktiv'
      : subscription.status === 'cancelled'
        ? 'Gekündigt'
        : subscription.status === 'past_due'
          ? 'Zahlung ausstehend'
          : subscription.status === 'trialing'
            ? 'Testphase'
            : subscription.isFree
              ? 'Kostenlos'
              : subscription.status ?? 'Unbekannt'

  const [portalLoading, setPortalLoading] = useState(false)

  const openPortal = async () => {
    setPortalLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Portal error:', err)
    } finally {
      setPortalLoading(false)
    }
  }

  const onLogout = async () => {
    await handleLogout()
    router.push('/')
  }

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden font-bold text-sm hover:opacity-80 transition-opacity">SVS Checker</Link>
            <div className="flex items-center gap-2">
              <User aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Mein Profil</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <User aria-hidden="true" className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-base font-semibold">{user.user_metadata?.full_name || 'Benutzer'}</p>
                <p className="text-sm font-normal text-muted-foreground flex items-center gap-1">
                  <Mail aria-hidden="true" className="h-3 w-3" />
                  {user.email}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Subscription */}
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown aria-hidden="true" className="h-5 w-5 text-amber-400" />
              Mein Abo
            </CardTitle>
            <CardDescription className="text-slate-400">
              Dein aktueller Plan und Abo-Status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={`text-sm px-3 py-1 ${
                subscription.isPro
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                  : subscription.isBasic
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                    : 'bg-slate-500/20 text-slate-300 border-slate-400/30'
              }`}>
                {planLabel}
              </Badge>
              <Badge variant="outline" className={`text-sm ${
                subscription.isActive || subscription.isFree
                  ? 'border-green-400/40 text-green-400'
                  : 'border-red-400/40 text-red-400'
              }`}>
                {statusLabel}
              </Badge>
            </div>

            {subscription.currentPeriodEnd && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar aria-hidden="true" className="h-4 w-4" />
                Nächste Abrechnung: {new Date(subscription.currentPeriodEnd).toLocaleDateString('de-AT')}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {subscription.isActive && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={openPortal}
                  disabled={portalLoading}
                >
                  {portalLoading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <ExternalLink className="h-4 w-4 mr-1" />}
                  Abo verwalten
                </Button>
              )}
              {subscription.isFree && (
                <Link href="/pricing">
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Crown aria-hidden="true" className="h-4 w-4 mr-1" />
                    Upgraden
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Plan Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Was ist in deinem Plan enthalten?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {[
                { label: 'SVS-Beitragsrechner', free: true },
                { label: 'Wahrheits-Tabelle', free: true },
                { label: 'Einkommensteuer-Prognose', basic: true },
                { label: 'Berechnungen speichern', basic: true },
                { label: 'Dashboard mit Verlauf', basic: true },
                { label: 'Misch-Einkommen Rechner', pro: true },
                { label: 'Familienbonus & Absetzbeträge', pro: true },
                { label: 'PDF-Export', pro: true },
                { label: 'Wasserfall-Analyse', pro: true },
              ].map((f) => {
                const included =
                  f.free ||
                  (f.basic && (subscription.isBasic || subscription.isPro)) ||
                  (f.pro && subscription.isPro)
                return (
                  <div key={f.label} className={`flex items-center gap-2 ${included ? '' : 'opacity-40'}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${included ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    {f.label}
                  </div>
                )
              })}
            </div>
            {!subscription.isPro && (
              <Link href="/pricing" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Alle Features freischalten
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="pt-6">
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={onLogout}
            >
              <LogOut aria-hidden="true" className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </CardContent>
        </Card>

        <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
          <p>SVS Checker – Alle Angaben ohne Gewähr.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
            <span>·</span>
            <Link href="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
          </div>
        </footer>
      </div>
    </>
  )
}

export default function ProfilPage() {
  return (
    <AppShell>
      <ProfilContent />
    </AppShell>
  )
}
