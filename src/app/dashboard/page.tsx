'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatEuro } from '@/lib/format'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Calculator, Trash2, Crown, ExternalLink, Gift } from 'lucide-react'
import { toast } from 'sonner'
import type { Calculation } from '@/lib/supabase-types'

function DashboardContent() {
  const router = useRouter()
  const { user, authLoading, subscription } = useAppShell()
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [redeeming, setRedeeming] = useState(false)

  useEffect(() => {
    if (user === null) return
    loadCalculations()
  }, [user])

  useEffect(() => {
    if (!authLoading && !subscription.loading && user === null) {
      router.push('/auth/login?redirect=/dashboard')
    }
  }, [user, authLoading, subscription.loading, router])

  const loadCalculations = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Fehler beim Laden der Berechnungen.')
    } else {
      setCalculations((data as Calculation[]) || [])
    }
    setLoading(false)
  }

  const handleDelete = useCallback(async (id: string) => {
    const { error } = await supabase.from('calculations').delete().eq('id', id)
    if (error) {
      toast.error('Fehler beim Loeschen.')
    } else {
      setCalculations((prev) => prev.filter((c) => c.id !== id))
      toast.success('Berechnung geloescht.')
    }
  }, [])

  const handleRedeemPromo = async () => {
    if (!promoCode.trim()) return
    setRedeeming(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch('/api/promo/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ code: promoCode }),
    })

    const json = await res.json().catch(() => ({}))
    if (res.ok) {
      toast.success('Code eingeloest! Du hast jetzt SVS Checker Pro.')
      setPromoCode('')
      subscription.refresh()
    } else {
      toast.error(json.error || 'Fehler beim Einloesen')
    }
    setRedeeming(false)
  }

  if (!user) return null

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <div className="flex items-center gap-3">
            <span className="md:hidden font-bold text-sm">SVS Checker</span>
            <h1 className="text-sm font-semibold">Meine Berechnungen</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Gespeicherte Berechnungen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{calculations.length}</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Hoechste Nachzahlung</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {calculations.length > 0
                  ? formatEuro(Math.max(...calculations.map((c) => c.nachzahlung)))
                  : '–'}
              </p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Letzte Berechnung</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {calculations.length > 0
                  ? new Date(calculations[0].created_at).toLocaleDateString('de-AT')
                  : '–'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Card */}
        <Card className="glass-dark text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-400" />
              {subscription.isFree ? 'Upgrade dein Konto' : 'Dein Abo'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription.isFree ? (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">
                  Schalte alle Pro-Werkzeuge frei: PDF-Export, Bank-Anbindung und Smart Alerts.
                </p>
                <Link href="/pricing">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Crown className="h-4 w-4 mr-1" />
                    Preise ansehen
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30">
                    {subscription.plan === 'pro' ? 'SVS Checker Pro' : 'Sicherheits-Plan'}
                  </Badge>
                  <Badge variant="outline" className="border-green-400/30 text-green-300">
                    {subscription.status}
                  </Badge>
                </div>
                {subscription.currentPeriodEnd && (
                  <p className="text-slate-400 text-sm">
                    Naechste Abrechnung: {new Date(subscription.currentPeriodEnd).toLocaleDateString('de-AT')}
                  </p>
                )}
                {subscription.customerPortalUrl && (
                  <a href={subscription.customerPortalUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Abo verwalten
                    </Button>
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promo Code */}
        {subscription.isFree && (
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-amber-500" />
                Promo-Code einloesen
              </CardTitle>
              <CardDescription>Hast du einen Promo-Code? Loese ihn hier ein fuer SVS Checker Pro.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="SVS-XXXX-XXXX"
                  className="font-mono max-w-[220px]"
                  onKeyDown={(e) => e.key === 'Enter' && handleRedeemPromo()}
                />
                <Button onClick={handleRedeemPromo} disabled={redeeming || !promoCode.trim()}>
                  {redeeming ? 'Einloesen...' : 'Einloesen'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calculations Table */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Berechnungs-Verlauf</CardTitle>
            <CardDescription>Alle gespeicherten SVS-Berechnungen</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Laden...</p>
            ) : calculations.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Noch keine Berechnungen gespeichert.</p>
                <Link href="/">
                  <Button>Erste Berechnung erstellen</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead className="text-right">Gewinn</TableHead>
                    <TableHead className="text-right">SVS endgueltig</TableHead>
                    <TableHead className="text-right">Nachzahlung</TableHead>
                    <TableHead className="text-right">Steuerersparnis</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calculations.map((calc) => (
                    <TableRow key={calc.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">
                            {new Date(calc.created_at).toLocaleDateString('de-AT')}
                          </p>
                          {calc.label && (
                            <p className="text-xs text-muted-foreground">{calc.label}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatEuro(calc.jahresgewinn)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatEuro(calc.endgueltige_svs)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={calc.nachzahlung > 0 ? 'destructive' : 'secondary'}
                          className="font-mono"
                        >
                          {calc.nachzahlung > 0 ? '+' : ''}
                          {formatEuro(calc.nachzahlung)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-emerald-600">
                        -{formatEuro(calc.steuer_ersparnis)}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Berechnung loeschen?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Willst du diese Berechnung wirklich loeschen? Das kann nicht rueckgaengig gemacht werden.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(calc.id)}>
                                Loeschen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <footer className="text-center py-8 text-xs text-muted-foreground space-y-2">
          <p>SVS Checker – Alle Angaben ohne Gewaehr.</p>
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

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  )
}
