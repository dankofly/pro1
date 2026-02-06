'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { isAdmin } from '@/lib/admin'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Shield, Copy, Plus, Check } from 'lucide-react'
import { toast } from 'sonner'

interface PromoCode {
  id: string
  code: string
  note: string | null
  redeemed_by: string | null
  redeemed_at: string | null
  created_at: string
}

function AdminContent() {
  const router = useRouter()
  const { user } = useAppShell()
  const [authorized, setAuthorized] = useState(false)
  const [codes, setCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [count, setCount] = useState(1)
  const [note, setNote] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    if (!isAdmin(user.email)) {
      router.push('/')
      return
    }
    setAuthorized(true)
    loadCodes()
  }, [user, router])

  const loadCodes = useCallback(async () => {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch('/api/promo/list', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    if (res.ok) {
      const json = await res.json()
      setCodes(json.codes || [])
    }
    setLoading(false)
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch('/api/promo/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ count, note: note || null }),
    })

    if (res.ok) {
      const json = await res.json()
      toast.success(`${json.codes.length} Code(s) erstellt`)
      setNote('')
      await loadCodes()
    } else {
      const json = await res.json().catch(() => ({}))
      toast.error(json.error || 'Fehler beim Erstellen')
    }
    setGenerating(false)
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success('Code kopiert!')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  if (!user || !authorized) return null

  const usedCount = codes.filter((c) => c.redeemed_by).length
  const freeCount = codes.filter((c) => !c.redeemed_by).length

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <div className="flex items-center gap-3">
            <span className="md:hidden font-bold text-sm">SVS Checker</span>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <h1 className="text-sm font-semibold">Admin - Promo-Codes</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Codes gesamt</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{codes.length}</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Verfuegbar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{freeCount}</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Eingeloest</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">{usedCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Generator */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Neue Codes generieren</CardTitle>
            <CardDescription>Erstelle Promo-Codes fuer SVS Checker Pro Vollzugang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Label htmlFor="count">Anzahl</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={50}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value) || 1)}
                  className="w-24"
                />
              </div>
              <div className="space-y-2 flex-1 min-w-[200px]">
                <Label htmlFor="note">Notiz (optional)</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="z.B. Beta-Tester, Marketing-Aktion..."
                />
              </div>
              <Button onClick={handleGenerate} disabled={generating}>
                <Plus className="h-4 w-4 mr-1" />
                {generating ? 'Erstelle...' : 'Generieren'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code List */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Alle Codes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Laden...</p>
            ) : codes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Noch keine Codes erstellt.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Notiz</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Erstellt</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {codes.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-mono font-medium">{promo.code}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{promo.note || '–'}</TableCell>
                      <TableCell>
                        {promo.redeemed_by ? (
                          <Badge variant="secondary">
                            Eingeloest {promo.redeemed_at ? new Date(promo.redeemed_at).toLocaleDateString('de-AT') : ''}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 border-green-200">Verfuegbar</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(promo.created_at).toLocaleDateString('de-AT')}
                      </TableCell>
                      <TableCell>
                        {!promo.redeemed_by && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyCode(promo.code)}
                          >
                            {copiedCode === promo.code ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default function AdminPage() {
  return (
    <AppShell>
      <AdminContent />
    </AppShell>
  )
}
