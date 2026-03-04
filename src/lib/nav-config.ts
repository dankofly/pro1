import { Calculator, BarChart3, Clock, Crown, HelpCircle, User, MessageSquare, Receipt, Coins, Gift, TrendingUp, FileBarChart, BookOpen } from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  requiresPro?: boolean
}

export type NavSection = { title: string; items: NavItem[] }

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Rechner',
    items: [
      { href: '/rechner', label: 'SVS-Rechner', icon: Calculator },
      { href: '/einkommensteuer', label: 'Einkommensteuer', icon: Receipt },
      { href: '/krypto-steuer', label: 'Krypto-Steuer', icon: Coins, requiresPro: true },
      { href: '/sachbezug-rechner', label: 'Sachbezug', icon: Gift },
      { href: '/investitionsfreibetrag', label: 'IFB-Rechner', icon: TrendingUp },
    ],
  },
  {
    title: 'AI & Analyse',
    items: [
      { href: '/steuerwissen', label: 'Steuer-Wissen', icon: BookOpen },
      { href: '/steuerberater', label: 'AI Steuerberater', icon: MessageSquare, requiresPro: true },
      { href: '/misch-einkommen', label: 'Optimierung', icon: BarChart3, requiresPro: true },
      { href: '/bilanz', label: 'Bilanz-Analyse', icon: FileBarChart, requiresPro: true },
    ],
  },
  {
    title: 'Konto',
    items: [
      { href: '/dashboard', label: 'Verlauf', icon: Clock },
      { href: '/pricing', label: 'Pro-Vorteile', icon: Crown },
      { href: '/faq', label: 'FAQ', icon: HelpCircle },
      { href: '/profil', label: 'Profil', icon: User },
    ],
  },
]
