'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { supabase } from '@/lib/supabase'
import { AppSidebar } from './app-sidebar'
import { BottomNav } from './bottom-nav'
import { useSubscription, type SubscriptionInfo } from '@/hooks/use-subscription'
import { toast } from 'sonner'
import type { User } from '@supabase/supabase-js'

interface AppShellContextValue {
  user: User | null
  subscription: SubscriptionInfo
  handleLogout: () => Promise<void>
}

const AppShellContext = createContext<AppShellContextValue | null>(null)

export function useAppShell() {
  const ctx = useContext(AppShellContext)
  if (!ctx) throw new Error('useAppShell must be used within AppShell')
  return ctx
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const subscription = useSubscription(user)

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast.success('Erfolgreich abgemeldet.')
  }, [])

  return (
    <AppShellContext.Provider value={{ user, subscription, handleLogout }}>
      <div className="flex min-h-screen bg-background">
        <AppSidebar
          user={user ? { email: user.email ?? '' } : null}
          plan={subscription.plan}
          onLogout={handleLogout}
        />
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </AppShellContext.Provider>
  )
}
