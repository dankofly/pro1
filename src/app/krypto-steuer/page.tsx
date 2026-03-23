'use client'

import { useState, useMemo, useCallback } from 'react'
import { PageFooter } from '@/components/svs/page-footer'
import { RechnerDisclaimer } from '@/components/rechner/rechner-disclaimer'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link'
import { formatEuro } from '@/lib/format'
import {
  calculateKryptoSteuer,
  type KryptoTransaktion,
  type KryptoResult,
} from '@/lib/krypto-steuer'
import { AppShell, useAppShell } from '@/components/svs/app-shell'
import { MobileNav } from '@/components/svs/mobile-nav'
import { UpgradeDialog } from '@/components/svs/upgrade-dialog'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Bitcoin, Plus, Trash2, Calculator, Crown, Info,
  ShieldCheck, ArrowRightLeft, TrendingUp, Coins,
} from 'lucide-react'

// ── Helpers ──────────────────────────────────────────────────

function createEmptyTransaktion(): KryptoTransaktion {
  return {
    id: crypto.randomUUID(),
    datum: new Date().toISOString().slice(0, 10),
    typ: 'kauf',
    coin: 'BTC',
    menge: 0,
    preisEur: 0,
    gesamtEur: 0,
  }
}

// ── Result Cards ─────────────────────────────────────────────

function ResultCards({ result }: { result: KryptoResult }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* Altvermögen */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
            </div>
            Altvermögen
          </CardTitle>
          <CardDescription>Anschaffung vor 1.3.2021</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Gewinn</span>
              <span className="font-mono font-medium">{formatEuro(result.altvermoegen.gewinn)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              {result.altvermoegen.steuerfrei ? (
                <Badge className="bg-emerald-500/100/10 text-emerald-400 border-emerald-500/30">Steuerfrei</Badge>
              ) : (
                <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Steuerpflichtig</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground pt-1">{result.altvermoegen.info}</p>
          </div>
        </CardContent>
      </Card>

      {/* Neuvermögen */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            Neuvermögen
          </CardTitle>
          <CardDescription>Anschaffung ab 1.3.2021</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Realisierter Gewinn</span>
              <span className={`font-mono font-medium ${result.neuvermoegen.gewinn < 0 ? 'text-red-400' : ''}`}>
                {formatEuro(result.neuvermoegen.gewinn)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">KESt (27,5 %)</span>
              <span className="font-mono font-medium text-red-400">
                {formatEuro(result.neuvermoegen.kest)}
              </span>
            </div>
            {result.neuvermoegen.gewinn < 0 && (
              <p className="text-xs text-muted-foreground pt-1">
                Verluste können mit anderen Einkünften aus Kapitalvermögen gegengerechnet werden.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Staking */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
              <Coins className="h-4 w-4 text-violet-500" />
            </div>
            Staking / Mining
          </CardTitle>
          <CardDescription>Erträge bei Zufluss</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Erträge</span>
              <span className="font-mono font-medium">{formatEuro(result.stakingErtraege)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">KESt (27,5 %)</span>
              <span className="font-mono font-medium text-red-400">
                {formatEuro(result.stakingKest)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gesamt KESt */}
      <Card className="glass-dark border-0 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-2 relative">
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Calculator className="h-4 w-4 text-emerald-400" />
            </div>
            Gesamt KESt
          </CardTitle>
          <CardDescription className="text-slate-400">Deine gesamte Krypto-Steuerlast</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-3xl font-bold text-emerald-400">{formatEuro(result.gesamtKest)}</p>
          <p className="text-xs text-slate-400 mt-2">{result.zusammenfassung}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Info Cards ───────────────────────────────────────────────

function InfoCards() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-blue-500" />
            Altvermögen vs. Neuvermögen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Stichtag 1. März 2021:</strong> Kryptowährungen,
            die vor diesem Datum angeschafft wurden, gelten als Altvermögen. Es gilt die alte
            Regelung mit 1 Jahr Spekulationsfrist.
          </p>
          <p>
            Ab dem 1.3.2021 angeschaffte Kryptowährungen (Neuvermögen) unterliegen der
            KESt von 27,5 % auf realisierte Gewinne — unabhängig von der Haltedauer.
          </p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowRightLeft className="h-4 w-4 text-amber-500" />
            Tausch Krypto zu Krypto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Neuvermögen:</strong> Jeder Tausch (z. B. BTC zu ETH)
            ist ein steuerpflichtiger Vorgang. Der Gewinn wird zum Zeitpunkt des Tauschs realisiert
            und mit 27,5 % KESt besteuert.
          </p>
          <p>
            <strong className="text-foreground">Altvermögen:</strong> Tausch ist steuerneutral.
            Die Anschaffungskosten des ursprünglichen Coins werden auf den neuen Coin übertragen.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Transaction Table ────────────────────────────────────────

function TransaktionenTable({
  transaktionen,
  onUpdate,
  onRemove,
  onAdd,
  maxRows,
  onUpgradeRequired,
}: {
  transaktionen: KryptoTransaktion[]
  onUpdate: (id: string, field: keyof KryptoTransaktion, value: string | number) => void
  onRemove: (id: string) => void
  onAdd: () => void
  maxRows: number
  onUpgradeRequired: () => void
}) {
  const canAdd = transaktionen.length < maxRows

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <Bitcoin className="h-4 w-4 text-emerald-500" />
          </div>
          Transaktionen
        </CardTitle>
        <CardDescription>
          Füge deine Krypto-Käufe, -Verkäufe und -Tausche hinzu. Kostenbasis wird nach FIFO berechnet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-6 px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[130px]">Datum</TableHead>
                <TableHead className="w-[120px]">Typ</TableHead>
                <TableHead className="w-[100px]">Coin</TableHead>
                <TableHead className="w-[110px] text-right">Menge</TableHead>
                <TableHead className="w-[130px] text-right">Preis / Einheit</TableHead>
                <TableHead className="w-[130px] text-right">Gesamt EUR</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaktionen.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Input
                      type="date"
                      value={tx.datum}
                      onChange={(e) => onUpdate(tx.id, 'datum', e.target.value)}
                      className="h-8 text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={tx.typ}
                      onValueChange={(v) => onUpdate(tx.id, 'typ', v)}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kauf">Kauf</SelectItem>
                        <SelectItem value="verkauf">Verkauf</SelectItem>
                        <SelectItem value="tausch">Tausch</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={tx.coin}
                      onChange={(e) => onUpdate(tx.id, 'coin', e.target.value.toUpperCase())}
                      placeholder="BTC"
                      className="h-8 text-sm font-mono uppercase"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={tx.menge || ''}
                      onChange={(e) => onUpdate(tx.id, 'menge', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="h-8 text-sm text-right font-mono"
                      step="any"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">EUR</span>
                      <Input
                        type="number"
                        value={tx.preisEur || ''}
                        onChange={(e) => onUpdate(tx.id, 'preisEur', parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                        className="h-8 text-sm text-right font-mono pl-10"
                        step="any"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {formatEuro(tx.gesamtEur)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 cursor-pointer text-muted-foreground hover:text-red-400"
                      onClick={() => onRemove(tx.id)}
                      disabled={transaktionen.length <= 1}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          {canAdd ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onAdd}
              className="gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Transaktion hinzufügen
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onUpgradeRequired}
              className="gap-1.5 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              <Crown className="h-3.5 w-3.5" />
              Mehr Transaktionen (Pro)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Main Content ─────────────────────────────────────────────

function KryptoSteuerContent() {
  const { subscription } = useAppShell()

  // Upgrade dialog state
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState('')

  // Transaction state
  const [transaktionen, setTransaktionen] = useState<KryptoTransaktion[]>([
    createEmptyTransaktion(),
  ])
  const [stakingErtraege, setStakingErtraege] = useState(0)

  // Free: 1 transaction, Basic: 10, Pro: unlimited
  const maxTransaktionen = subscription.isPro ? Infinity : subscription.plan === 'basic' ? 10 : 1

  const handleUpgradeRequired = useCallback((feature: string) => {
    setUpgradeFeature(feature)
    setUpgradeOpen(true)
  }, [])

  const handleAddTransaktion = useCallback(() => {
    if (transaktionen.length >= maxTransaktionen) {
      handleUpgradeRequired('Unbegrenzte Krypto-Transaktionen')
      return
    }
    setTransaktionen((prev) => [...prev, createEmptyTransaktion()])
  }, [transaktionen.length, maxTransaktionen, handleUpgradeRequired])

  const handleRemoveTransaktion = useCallback((id: string) => {
    setTransaktionen((prev) => prev.filter((tx) => tx.id !== id))
  }, [])

  const handleUpdateTransaktion = useCallback(
    (id: string, field: keyof KryptoTransaktion, value: string | number) => {
      setTransaktionen((prev) =>
        prev.map((tx) => {
          if (tx.id !== id) return tx
          const updated = { ...tx, [field]: value }
          // Recalculate gesamtEur when menge or preisEur changes
          if (field === 'menge' || field === 'preisEur') {
            updated.gesamtEur = Math.round(updated.menge * updated.preisEur * 100) / 100
          }
          return updated
        }),
      )
    },
    [],
  )

  const handleStakingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.')
    setStakingErtraege(parseFloat(raw) || 0)
  }, [])

  // Calculate result
  const result: KryptoResult = useMemo(
    () => calculateKryptoSteuer(transaktionen, stakingErtraege),
    [transaktionen, stakingErtraege],
  )

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4 text-amber-500" />
              <h1 className="text-sm font-semibold">Krypto-Steuer-Rechner</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              AT 2026
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Krypto-Steuer-Rechner Österreich 2026
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
            Berechne deine KESt auf Kryptowährungen nach dem öKESt-Regime (ab 1.3.2022).
            Altvermögen, Neuvermögen, Staking und Tausch — alles auf einen Blick.
          </p>
        </div>

        {/* Stichtag Alert */}
        <Alert className="border-blue-500/30 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-foreground">
            <strong>Stichtag 1. März 2021:</strong> Krypto-Assets, die davor angeschafft wurden
            (Altvermögen), unterliegen der alten Spekulationsfrist von 1 Jahr. Ab diesem Datum
            gilt pauschal 27,5 % KESt auf realisierte Gewinne (Neuvermögen).
          </AlertDescription>
        </Alert>

        {/* Transaction Table */}
        <TransaktionenTable
          transaktionen={transaktionen}
          onUpdate={handleUpdateTransaktion}
          onRemove={handleRemoveTransaktion}
          onAdd={handleAddTransaktion}
          maxRows={maxTransaktionen}
          onUpgradeRequired={() => handleUpgradeRequired('Unbegrenzte Krypto-Transaktionen')}
        />

        {/* Free-tier hint */}
        {!subscription.isPro && transaktionen.length >= maxTransaktionen && (
          <Alert className="border-amber-500/30 bg-amber-500/10">
            <Crown className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-foreground">
              Im kostenlosen Plan ist nur 1 Transaktion möglich.{' '}
              <button
                onClick={() => handleUpgradeRequired('Unbegrenzte Krypto-Transaktionen')}
                className="font-semibold underline underline-offset-2 hover:text-amber-400"
              >
                Upgrade auf Pro
              </button>{' '}
              für unbegrenzte Transaktionen und alle Premium-Features.
            </AlertDescription>
          </Alert>
        )}

        {/* Staking Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <Coins className="h-4 w-4 text-violet-500" />
              </div>
              Staking / Mining Erträge
            </CardTitle>
            <CardDescription>
              Einkünfte aus Staking, Lending oder Mining werden bei Zufluss mit 27,5 % KESt besteuert.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-sm space-y-2">
              <Label htmlFor="staking" className="text-sm font-medium">
                Gesamte Staking-/Mining-Erträge (EUR)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">EUR</span>
                <Input
                  id="staking"
                  value={stakingErtraege > 0 ? stakingErtraege.toLocaleString('de-AT') : ''}
                  onChange={handleStakingChange}
                  placeholder="0,00"
                  className="pl-12 text-right font-mono text-lg font-medium"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Gesamtbetrag der im Jahr 2026 zugeflossenen Staking-/Mining-Erträge in EUR.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <ResultCards result={result} />

        {/* Info Cards */}
        <InfoCards />

        {/* Upgrade Dialog */}
        <UpgradeDialog
          open={upgradeOpen}
          onOpenChange={setUpgradeOpen}
          feature={upgradeFeature}
          requiredPlan="pro"
        />

        <RechnerDisclaimer vereinfachungen={[
          'Pauschale KESt-Berechnung (27,5%) ohne individuelle Verlustverrechnung',
          'Keine Berücksichtigung von Mining, Staking-Rewards oder Airdrops',
          'Altvermögen (vor 1.3.2021) vereinfacht dargestellt',
          'Keine DeFi- oder NFT-spezifischen Regelungen',
        ]} />

        {/* Footer */}
        <PageFooter extra="Kein Ersatz für professionelle Steuerberatung." />
        <SiteFooter />
      </div>
    </>
  )
}

export default function KryptoSteuerPage() {
  return (
    <AppShell>
      <KryptoSteuerContent />
    </AppShell>
  )
}
