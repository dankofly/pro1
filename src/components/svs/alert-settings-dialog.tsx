'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BellRing, Bell, BellOff, Info } from 'lucide-react'
import { toast } from 'sonner'
import { formatEuro } from '@/lib/format'
import type { AlertPreferences } from '@/hooks/use-smart-alerts'

interface AlertSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefs: AlertPreferences
  updatePrefs: (updates: Partial<AlertPreferences>) => void
  requestNotificationPermission: () => Promise<boolean>
  currentNachzahlung: number
}

export function AlertSettingsDialog({
  open,
  onOpenChange,
  prefs,
  updatePrefs,
  requestNotificationPermission,
  currentNachzahlung,
}: AlertSettingsDialogProps) {
  const isExceeded = prefs.enabled && currentNachzahlung > prefs.threshold

  const handleNotificationToggle = async (checked: boolean) => {
    if (checked) {
      const granted = await requestNotificationPermission()
      if (granted) {
        updatePrefs({ notificationsEnabled: true })
        toast.success('Browser-Benachrichtigungen aktiviert.')
      } else {
        toast.error('Benachrichtigungen wurden im Browser blockiert. Bitte erlaube sie in den Browser-Einstellungen.')
      }
    } else {
      updatePrefs({ notificationsEnabled: false })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-orange-500" />
            Smart Alerts
          </DialogTitle>
          <DialogDescription>
            Werde gewarnt, wenn deine Nachzahlung einen Schwellwert übersteigt.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Enable toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="alert-enable" className="flex items-center gap-2 cursor-pointer">
              {prefs.enabled ? <Bell className="h-4 w-4 text-orange-500" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
              Nachzahlungs-Warnungen
            </Label>
            <Switch
              id="alert-enable"
              checked={prefs.enabled}
              onCheckedChange={(checked) => updatePrefs({ enabled: checked })}
            />
          </div>

          {prefs.enabled && (
            <>
              {/* Threshold input */}
              <div className="space-y-2">
                <Label htmlFor="threshold">Schwellwert (EUR)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="threshold"
                    type="number"
                    min={0}
                    step={100}
                    value={prefs.threshold}
                    onChange={(e) => updatePrefs({ threshold: Math.max(0, Number(e.target.value) || 0) })}
                    className="font-mono"
                  />
                  <Badge variant="outline" className="shrink-0 font-mono">
                    {formatEuro(prefs.threshold)}
                  </Badge>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={prefs.threshold}
                  onChange={(e) => updatePrefs({ threshold: Number(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Current status */}
              <div className={`p-3 rounded-lg border ${isExceeded ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-sm font-medium ${isExceeded ? 'text-red-800' : 'text-green-800'}`}>
                  {isExceeded
                    ? `Warnung aktiv! Nachzahlung ${formatEuro(currentNachzahlung)} > Schwellwert ${formatEuro(prefs.threshold)}`
                    : `Alles im gruenen Bereich. Nachzahlung ${formatEuro(Math.max(0, currentNachzahlung))} < Schwellwert ${formatEuro(prefs.threshold)}`
                  }
                </p>
              </div>

              {/* Browser notifications */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify" className="cursor-pointer text-sm">
                    Browser-Benachrichtigungen
                  </Label>
                  <Switch
                    id="notify"
                    checked={prefs.notificationsEnabled}
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>
                {prefs.notificationsEnabled && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-800 text-xs">
                      Du erhältst eine Browser-Benachrichtigung, wenn sich deine Nachzahlung ändert und den Schwellwert übersteigt.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => { onOpenChange(false); toast.success('Einstellungen gespeichert.') }}>
            Fertig
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
