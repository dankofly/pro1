// ============================================================
// Rechner Registry — Central calculator config with Branche tags
// Single source of truth for all calculators + their visibility
// ============================================================

import {
  Calculator, Receipt, Coins, Gift, TrendingUp,
  BookOpen, MessageSquare, BarChart3, FileBarChart,
} from 'lucide-react'
import type { Branche } from './user-preferences'

export interface RechnerDef {
  id: string
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  section: 'rechner' | 'ai'
  requiresPro?: boolean
  /** Which Branchen this calculator is relevant for. Empty array = always visible. */
  relevantFor: Branche[]
}

export const RECHNER_REGISTRY: RechnerDef[] = [
  // ── Rechner Section ──────────────────────────────────────
  {
    id: 'svs',
    href: '/rechner',
    label: 'Steuerrechner',
    icon: Calculator,
    section: 'rechner',
    relevantFor: [], // always visible
  },
  {
    id: 'einkommensteuer',
    href: '/einkommensteuer',
    label: 'Einkommensteuer',
    icon: Receipt,
    section: 'rechner',
    relevantFor: [], // always visible
  },
  {
    id: 'krypto',
    href: '/krypto-steuer',
    label: 'Krypto-Steuer',
    icon: Coins,
    section: 'rechner',
    requiresPro: true,
    relevantFor: ['it_freelancer', 'beratung', 'kreativ', 'handel', 'sonstige'],
  },
  {
    id: 'sachbezug',
    href: '/sachbezug-rechner',
    label: 'Sachbezug',
    icon: Gift,
    section: 'rechner',
    relevantFor: ['beratung', 'handwerk', 'gesundheit', 'gastro', 'handel', 'immobilien', 'sonstige'],
  },
  {
    id: 'ifb',
    href: '/investitionsfreibetrag',
    label: 'IFB-Rechner',
    icon: TrendingUp,
    section: 'rechner',
    relevantFor: [], // always visible — relevant for all
  },

  // ── AI & Analyse Section ─────────────────────────────────
  {
    id: 'steuerwissen',
    href: '/steuerwissen',
    label: 'Steuer-Wissen',
    icon: BookOpen,
    section: 'ai',
    relevantFor: [], // always visible
  },
  {
    id: 'steuerberater',
    href: '/steuerberater',
    label: 'AI Steuerberater',
    icon: MessageSquare,
    section: 'ai',
    requiresPro: true,
    relevantFor: [], // always visible
  },
  {
    id: 'misch-einkommen',
    href: '/misch-einkommen',
    label: 'Optimierung',
    icon: BarChart3,
    section: 'ai',
    requiresPro: true,
    relevantFor: ['it_freelancer', 'beratung', 'kreativ', 'landwirtschaft', 'immobilien', 'sonstige'],
  },
  {
    id: 'bilanz',
    href: '/bilanz',
    label: 'Bilanz-Analyse',
    icon: FileBarChart,
    section: 'ai',
    requiresPro: true,
    relevantFor: ['beratung', 'handwerk', 'handel', 'gastro', 'immobilien', 'sonstige'],
  },
]

/** Get all rechner IDs that are relevant for a given Branche */
export function getDefaultRechnerForBranche(branche: Branche): string[] {
  return RECHNER_REGISTRY
    .filter((r) => r.relevantFor.length === 0 || r.relevantFor.includes(branche))
    .map((r) => r.id)
}

/** Get visible rechner definitions based on user preferences */
export function getVisibleRechner(
  branche: Branche,
  visibleRechner: string[],
): RechnerDef[] {
  // If user has custom selection, use that; otherwise use branche defaults
  const activeIds = visibleRechner.length > 0
    ? visibleRechner
    : getDefaultRechnerForBranche(branche)

  return RECHNER_REGISTRY.filter((r) => activeIds.includes(r.id))
}
