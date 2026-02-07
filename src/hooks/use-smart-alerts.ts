'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface AlertPreferences {
  enabled: boolean
  threshold: number
  notificationsEnabled: boolean
}

const STORAGE_KEY = 'svs-checker-alert-prefs'
const DEFAULT_PREFS: AlertPreferences = {
  enabled: false,
  threshold: 1000,
  notificationsEnabled: false,
}

function loadPrefs(): AlertPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : DEFAULT_PREFS
  } catch {
    return DEFAULT_PREFS
  }
}

function savePrefs(prefs: AlertPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}

export function useSmartAlerts(nachzahlung: number) {
  const [prefs, setPrefs] = useState<AlertPreferences>(DEFAULT_PREFS)
  const [isExceeded, setIsExceeded] = useState(false)
  const lastNotifiedRef = useRef<number>(0)

  useEffect(() => {
    setPrefs(loadPrefs())
  }, [])

  useEffect(() => {
    const exceeded = prefs.enabled && nachzahlung > prefs.threshold
    setIsExceeded(exceeded)

    if (
      exceeded &&
      prefs.notificationsEnabled &&
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted' &&
      Math.abs(nachzahlung - lastNotifiedRef.current) > 100
    ) {
      lastNotifiedRef.current = nachzahlung
      new Notification('SVS Checker – Nachzahlungs-Warnung', {
        body: `Deine geschätzte Nachzahlung beträgt €${Math.round(nachzahlung).toLocaleString('de-AT')} und übersteigt deinen Schwellwert von €${Math.round(prefs.threshold).toLocaleString('de-AT')}.`,
        icon: '/favicon.ico',
      })
    }
  }, [nachzahlung, prefs])

  const updatePrefs = useCallback((updates: Partial<AlertPreferences>) => {
    setPrefs(prev => {
      const next = { ...prev, ...updates }
      savePrefs(next)
      return next
    })
  }, [])

  const requestNotificationPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return false
    if (Notification.permission === 'granted') return true
    const result = await Notification.requestPermission()
    return result === 'granted'
  }, [])

  return {
    prefs,
    isExceeded,
    updatePrefs,
    requestNotificationPermission,
  }
}
