import { Clock, Crown, HelpCircle, User, Settings } from 'lucide-react'
import { getVisibleRechner } from './rechner-registry'
import type { Branche } from './user-preferences'

export type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  requiresPro?: boolean
}

export type NavSection = { title: string; items: NavItem[] }

/** Build navigation sections filtered by user's branche + custom overrides */
export function getNavSections(branche: Branche, visibleRechner: string[]): NavSection[] {
  const visible = getVisibleRechner(branche, visibleRechner)

  const rechnerItems: NavItem[] = visible
    .filter((r) => r.section === 'rechner')
    .map((r) => ({
      href: r.href,
      label: r.label,
      icon: r.icon,
      requiresPro: r.requiresPro,
    }))

  const aiItems: NavItem[] = visible
    .filter((r) => r.section === 'ai')
    .map((r) => ({
      href: r.href,
      label: r.label,
      icon: r.icon,
      requiresPro: r.requiresPro,
    }))

  return [
    { title: 'Rechner', items: rechnerItems },
    { title: 'AI & Analyse', items: aiItems },
    {
      title: 'Konto',
      items: [
        { href: '/dashboard', label: 'Verlauf', icon: Clock },
        { href: '/einstellungen', label: 'Einstellungen', icon: Settings },
        { href: '/pricing', label: 'Pro-Vorteile', icon: Crown },
        { href: '/faq', label: 'FAQ', icon: HelpCircle },
        { href: '/profil', label: 'Profil', icon: User },
      ],
    },
  ]
}

/** Static fallback for SSR / before preferences load — shows all rechner */
export const NAV_SECTIONS: NavSection[] = getNavSections('sonstige', [])
