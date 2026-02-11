'use client'

import { useReducer, useMemo, useEffect, useCallback } from 'react'
import type {
  RechnerInput,
  RechnerResult,
  RechnerAction,
  Stammdaten,
} from '@/lib/rechner-types'
import { DEFAULT_RECHNER_INPUT } from '@/lib/rechner-types'
import { calculateAll } from '@/lib/rechner-engine'

// ── LocalStorage Keys ───────────────────────────────────────

const LS_KEY_INPUT = 'rechner_input'
const LS_KEY_ONBOARDED = 'rechner_onboarded'

// ── Reducer ─────────────────────────────────────────────────

function rechnerReducer(state: RechnerInput, action: RechnerAction): RechnerInput {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }

    case 'SET_STAMMDATEN':
      return {
        ...state,
        stammdaten: { ...state.stammdaten, [action.field]: action.value },
      }

    case 'SET_AUFWAND':
      return {
        ...state,
        aufwaende: { ...state.aufwaende, [action.field]: action.value },
      }

    case 'SET_INVESTITION':
      return {
        ...state,
        investitionen: { ...state.investitionen, [action.field]: action.value },
      }

    case 'SET_GMBH':
      return {
        ...state,
        gmbh: { ...state.gmbh, [action.field]: action.value },
      }

    case 'SET_GEWINNMAXIMIERER':
      return {
        ...state,
        gewinnmaximierer: { ...state.gewinnmaximierer, [action.field]: action.value },
      }

    case 'SET_VORAUSZAHLUNG':
      return {
        ...state,
        vorauszahlungen: { ...state.vorauszahlungen, [action.field]: action.value },
      }

    case 'SET_WEITERE_EINKUENFTE':
      return {
        ...state,
        weitereEinkuenfte: { ...state.weitereEinkuenfte, [action.field]: action.value },
      }

    case 'SET_PRO_OPTION':
      return {
        ...state,
        proOptions: { ...state.proOptions, [action.field]: action.value },
      }

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        stammdaten: action.stammdaten,
      }

    case 'RESET':
      return DEFAULT_RECHNER_INPUT

    case 'LOAD_SAVED':
      return action.input

    case 'LOAD_PRESET':
      return { ...state, ...action.preset }

    default:
      return state
  }
}

// ── Persistence ─────────────────────────────────────────────

function loadFromLocalStorage(): RechnerInput | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LS_KEY_INPUT)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<RechnerInput>
    // Merge with defaults to handle schema changes
    return { ...DEFAULT_RECHNER_INPUT, ...parsed }
  } catch {
    return null
  }
}

function saveToLocalStorage(input: RechnerInput): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LS_KEY_INPUT, JSON.stringify(input))
  } catch {
    // localStorage voll oder nicht verfügbar
  }
}

// ── Hook ────────────────────────────────────────────────────

export interface UseRechnerStateReturn {
  input: RechnerInput
  result: RechnerResult
  dispatch: React.Dispatch<RechnerAction>
  isOnboarded: boolean
  completeOnboarding: (stammdaten: Stammdaten) => void
  resetOnboarding: () => void
  setField: <K extends keyof RechnerInput>(field: K, value: RechnerInput[K]) => void
}

export function useRechnerState(): UseRechnerStateReturn {
  const [input, dispatch] = useReducer(rechnerReducer, DEFAULT_RECHNER_INPUT)

  // Load saved state on mount
  useEffect(() => {
    const saved = loadFromLocalStorage()
    if (saved) {
      dispatch({ type: 'LOAD_SAVED', input: saved })
    }
  }, [])

  // Persist on every change (debounced implicitly by React batching)
  useEffect(() => {
    saveToLocalStorage(input)
  }, [input])

  // Computed result
  const result = useMemo(() => calculateAll(input), [input])

  // Onboarding
  const isOnboarded = useMemo(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(LS_KEY_ONBOARDED) === 'true'
  }, [])

  const completeOnboarding = useCallback((stammdaten: Stammdaten) => {
    dispatch({ type: 'COMPLETE_ONBOARDING', stammdaten })
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_KEY_ONBOARDED, 'true')
    }
  }, [])

  const resetOnboarding = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LS_KEY_ONBOARDED)
    }
    dispatch({ type: 'RESET' })
  }, [])

  const setField = useCallback(<K extends keyof RechnerInput>(field: K, value: RechnerInput[K]) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }, [])

  return {
    input,
    result,
    dispatch,
    isOnboarded,
    completeOnboarding,
    resetOnboarding,
    setField,
  }
}
