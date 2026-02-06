'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { supabase } from '@/lib/supabase'
import { AppSidebar } from './app-sidebar'
import { BottomNav } from './bottom-nav'
import { useSubscription, type SubscriptionInfo } from '@/hooks/use-subscription'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface AppShellContextValue {
  user: User | null
  authLoading: boolean
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
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const subscription = useSubscription(user, authLoading)

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast.success('Erfolgreich abgemeldet.')
  }, [])

  return (
    <AppShellContext.Provider value={{ user, authLoading, subscription, handleLogout }}>
      <div className="flex min-h-screen bg-background">
        <AppSidebar
          user={user ? { email: user.email ?? '' } : null}
          plan={subscription.plan}
          onLogout={handleLogout}
        />
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {authLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Laden...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
        <BottomNav />
      </div>
    </AppShellContext.Provider>
  )
}
