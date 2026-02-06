'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatEuro } from '@/lib/format'
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
import { Calculator, ArrowLeft, Trash2, LogOut, Crown, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { useSubscription } from '@/hooks/use-subscription'
import type { User } from '@supabase/supabase-js'
import type { Calculation } from '@/lib/supabase-types'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUser(user)
      await loadCalculations()
    }
    checkUser()
  }, [router])

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
      toast.error('Fehler beim Löschen.')
    } else {
      setCalculations((prev) => prev.filter((c) => c.id !== id))
      toast.success('Berechnung gelöscht.')
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const subscription = useSubscription(user)

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Meine Berechnungen</h1>
                <p className="text-blue-200 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Rechner
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-blue-200 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Gespeicherte Berechnungen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{calculations.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Höchste Nachzahlung</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {calculations.length > 0
                  ? formatEuro(Math.max(...calculations.map((c) => c.nachzahlung)))
                  : '–'}
              </p>
            </CardContent>
          </Card>
          <Card>
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
        <Card className="bg-gradient-to-br from-slate-800 via-slate-700 to-blue-800 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-400" />
              {subscription.isFree ? 'Upgrade dein Konto' : 'Dein Abo'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription.isFree ? (
              <div className="space-y-3">
                <p className="text-blue-100/80 text-sm">
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
                    {subscription.plan === 'pro' ? 'Butler-Vollversion' : 'Sicherheits-Plan'}
                  </Badge>
                  <Badge variant="outline" className="border-green-400/30 text-green-300">
                    {subscription.status}
                  </Badge>
                </div>
                {subscription.currentPeriodEnd && (
                  <p className="text-blue-200/70 text-sm">
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

        {/* Calculations Table */}
        <Card>
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
                    <TableHead className="text-right">SVS endgültig</TableHead>
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
                              <AlertDialogTitle>Berechnung löschen?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Willst du diese Berechnung wirklich löschen? Das kann nicht rückgängig gemacht werden.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(calc.id)}>
                                Löschen
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
      </main>
    </div>
  )
}
