// ============================================================
// User Preferences — Branchen-Auswahl & Dashboard-Konfiguration
// Persisted in localStorage, read by nav + sidebar + onboarding
// ============================================================

import { useState, useEffect, useCallback } from 'react'

// ── Branchen ────────────────────────────────────────────────

export type Branche =
  | 'it_freelancer'
  | 'beratung'
  | 'handwerk'
  | 'kreativ'
  | 'gesundheit'
  | 'handel'
  | 'gastro'
  | 'landwirtschaft'
  | 'immobilien'
  | 'sonstige'

export interface BrancheInfo {
  value: Branche
  label: string
  desc: string
  icon: string // emoji
}

export const BRANCHEN: BrancheInfo[] = [
  { value: 'it_freelancer', label: 'IT & Software', desc: 'Entwicklung, Webdesign, IT-Consulting', icon: '💻' },
  { value: 'beratung', label: 'Beratung & Coaching', desc: 'Unternehmensberatung, Training, Coaching', icon: '📊' },
  { value: 'handwerk', label: 'Handwerk & Gewerbe', desc: 'Installateur, Elektriker, Tischler', icon: '🔧' },
  { value: 'kreativ', label: 'Kreativberufe', desc: 'Design, Fotografie, Video, Kunst', icon: '🎨' },
  { value: 'gesundheit', label: 'Gesundheit & Medizin', desc: 'Ärzte, Therapeuten, Pflege', icon: '🏥' },
  { value: 'handel', label: 'Handel & E-Commerce', desc: 'Online-Shop, Einzelhandel, Import/Export', icon: '🛒' },
  { value: 'gastro', label: 'Gastronomie & Tourismus', desc: 'Restaurant, Café, Hotellerie', icon: '🍽️' },
  { value: 'landwirtschaft', label: 'Land- & Forstwirtschaft', desc: 'Nebenerwerb, Direktvermarktung, Weinbau', icon: '🌾' },
  { value: 'immobilien', label: 'Immobilien & Vermietung', desc: 'Hausverwaltung, Makler, Vermietung', icon: '🏠' },
  { value: 'sonstige', label: 'Sonstiges', desc: 'Andere selbständige Tätigkeit', icon: '📋' },
]

// ── User Preferences ────────────────────────────────────────

export interface UserPreferences {
  branche: Branche
  visibleRechner: string[]  // rechner IDs the user wants to see (empty = use branche defaults)
  onboardingCompleted: boolean
}

const STORAGE_KEY = 'steuerboard_preferences'

export const DEFAULT_PREFERENCES: UserPreferences = {
  branche: 'sonstige',
  visibleRechner: [],
  onboardingCompleted: false,
}

// ── localStorage helpers ────────────────────────────────────

function loadPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PREFERENCES
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

function savePreferences(prefs: UserPreferences) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch { /* quota exceeded — ignore */ }
}

// ── Hook ────────────────────────────────────────────────────

export function useUserPreferences() {
  const [prefs, setPrefsState] = useState<UserPreferences>(DEFAULT_PREFERENCES)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setPrefsState(loadPreferences())
    setLoaded(true)
  }, [])

  const setPrefs = useCallback((update: Partial<UserPreferences>) => {
    setPrefsState((prev) => {
      const next = { ...prev, ...update }
      savePreferences(next)
      // Dispatch event so other components can react
      window.dispatchEvent(new CustomEvent('preferences-changed', { detail: next }))
      return next
    })
  }, [])

  const resetPrefs = useCallback(() => {
    const fresh = { ...DEFAULT_PREFERENCES }
    setPrefsState(fresh)
    savePreferences(fresh)
    // Also clear the old rechner onboarding flag
    try { localStorage.removeItem('rechner_onboarded') } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent('preferences-changed', { detail: fresh }))
  }, [])

  return { prefs, setPrefs, resetPrefs, loaded }
}
