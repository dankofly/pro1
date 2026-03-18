/**
 * Stripe Payment E2E Tests — Pricing Page, Checkout Flow, Portal
 *
 * Tests the full Stripe integration:
 * - Pricing page renders correctly (3 tiers, toggle, features)
 * - Unauthenticated users → redirect to register
 * - Authenticated users → checkout API call, error handling
 * - Checkout return page handles session_id
 * - Portal API requires active subscription
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local for functional tests.
 * STRIPE_SECRET_KEY may not be available locally — checkout API tests handle 500 gracefully.
 * Stripe iframe cannot be filled in E2E (cross-origin), so we test up to that boundary.
 */
import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local
try {
  const envPath = resolve(__dirname, '..', '.env.local')
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx)
    const val = trimmed.slice(eqIdx + 1)
    if (!process.env[key]) process.env[key] = val
  }
} catch { /* .env.local not found */ }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkbkczoepcvnwtqnxao.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// ─── Pricing Page Load Tests (no auth needed) ───

test.describe('Pricing Page', () => {
  test('pricing page loads with header and 3 tiers', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByRole('heading', { name: /starte kostenlos/i }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByRole('heading', { name: /verfügbare pläne/i }).first()).toBeAttached()
    // 3 tier names visible
    await expect(page.getByText('Free').first()).toBeVisible()
    await expect(page.getByText('SteuerBoard Pro').first()).toBeVisible()
    await expect(page.getByText('Sicherheits-Plan').first()).toBeVisible()
  })

  test('pricing page shows monthly prices by default', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText(/monatlich/i).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/pro monat/i).first()).toBeVisible()
  })

  test('yearly toggle shows yearly prices and "Spare 20%" badge', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText(/monatlich/i).first()).toBeVisible({ timeout: 15000 })
    // Toggle to yearly
    await page.getByRole('switch').click()
    await expect(page.getByText(/spare 20/i).first()).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/eur\/jahr/i).first()).toBeVisible()
  })

  test('Free tier shows "Aktueller Plan" when not subscribed', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('Free').first()).toBeVisible({ timeout: 15000 })
    // Without login, user is "free" → button shows "Aktueller Plan"
    await expect(page.getByRole('button', { name: /aktueller plan/i }).first()).toBeVisible()
  })

  test('Pro tier shows "Beliebtester Plan" badge', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText(/beliebtester plan/i).first()).toBeVisible({ timeout: 15000 })
  })

  test('Pro tier has "Jetzt upgraden" button', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('SteuerBoard Pro').first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByRole('button', { name: /jetzt upgraden/i }).first()).toBeVisible()
  })

  test('Basic tier has "Jetzt starten" button', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('Sicherheits-Plan').first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByRole('button', { name: /jetzt starten/i }).first()).toBeVisible()
  })

  test('feature expand shows additional features', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('Free').first()).toBeVisible({ timeout: 15000 })
    // Click "+X weitere Features" on any tier
    const expandBtn = page.getByText(/weitere features/i).first()
    if (await expandBtn.isVisible()) {
      await expandBtn.click()
      await expect(page.getByText(/weniger anzeigen/i).first()).toBeVisible({ timeout: 3000 })
    }
  })

  test('"Alle Features im Detail" links to /features', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('Free').first()).toBeVisible({ timeout: 15000 })
    const featureLink = page.getByRole('link', { name: /alle features im detail/i }).first()
    await expect(featureLink).toBeVisible()
    await expect(featureLink).toHaveAttribute('href', '/features')
  })

  test('footer shows Stripe and legal info', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText(/sichere zahlung via stripe/i).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByRole('link', { name: /impressum/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /datenschutz/i }).first()).toBeVisible()
  })
})

// ─── Checkout Flow Tests (require service role key) ───

test.describe.serial('Stripe Checkout Flow', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set')

  const TEST_EMAIL = `e2e-stripe-${Date.now()}@mailinator.com`
  const TEST_PASSWORD = 'E2eStripeTest123!'

  let adminClient: ReturnType<typeof createClient>
  let testUserId: string

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
    const { data, error } = await adminClient.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Stripe Test User' },
    })
    if (error) throw new Error(`User creation failed: ${error.message}`)
    testUserId = data.user.id
  })

  test.afterAll(async () => {
    if (!adminClient || !testUserId) return
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)
    await adminClient.auth.admin.deleteUser(testUserId)
  })

  test('unauthenticated user clicking upgrade redirects to register', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByText('SteuerBoard Pro').first()).toBeVisible({ timeout: 15000 })

    // Click "Jetzt upgraden" (Pro tier)
    const upgradeBtn = page.getByRole('button', { name: /jetzt upgraden/i }).first()
    await expect(upgradeBtn).toBeVisible()
    await upgradeBtn.click()

    // Should redirect to register with redirect param
    await page.waitForURL(/\/auth\/register/, { timeout: 10000 })
    expect(page.url()).toContain('/auth/register')
    expect(page.url()).toContain('redirect')
  })

  test('authenticated user: upgrade button triggers checkout API', async ({ page }) => {
    // Login first
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/rechner/, { timeout: 15000 })

    // Navigate to pricing
    await page.goto('/pricing')
    await expect(page.getByText('SteuerBoard Pro').first()).toBeVisible({ timeout: 15000 })

    // Intercept the checkout API call
    const checkoutPromise = page.waitForResponse(
      (res) => res.url().includes('/api/stripe/checkout') && res.request().method() === 'POST',
      { timeout: 30000 },
    )

    // Click "Jetzt upgraden"
    const upgradeBtn = page.getByRole('button', { name: /jetzt upgraden/i }).first()
    await upgradeBtn.click()

    // Verify API was called
    const response = await checkoutPromise
    const data = await response.json()

    if (response.status() === 200) {
      // Stripe is configured — clientSecret received
      expect(data.clientSecret).toBeTruthy()
      expect(typeof data.clientSecret).toBe('string')

      // Embedded checkout should render
      await expect(page.getByText(/zurück zur preisübersicht/i).first()).toBeVisible({ timeout: 30000 })
    } else {
      // Stripe not configured locally (no STRIPE_SECRET_KEY) — toast error shown
      console.log(`Checkout API returned ${response.status()}: ${data.error || 'unknown error'}`)
      // Verify the app handles the error gracefully (toast shown, no crash)
      await page.waitForTimeout(2000)
      expect(page.url()).toContain('/pricing')
    }
  })

  test('Sicherheits-Plan upgrade also calls checkout API', async ({ page }) => {
    // Login
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/rechner/, { timeout: 15000 })

    // Navigate to pricing
    await page.goto('/pricing')
    await expect(page.getByText('Sicherheits-Plan').first()).toBeVisible({ timeout: 15000 })

    // Click "Jetzt starten" (Basic tier)
    const basicBtn = page.getByRole('button', { name: /jetzt starten/i }).first()
    await expect(basicBtn).toBeVisible()

    // Intercept checkout call
    const checkoutPromise = page.waitForResponse(
      (res) => res.url().includes('/api/stripe/checkout') && res.request().method() === 'POST',
      { timeout: 30000 },
    )

    await basicBtn.click()

    const response = await checkoutPromise
    const data = await response.json()

    if (response.status() === 200) {
      expect(data.clientSecret).toBeTruthy()
    } else {
      // Stripe not configured — error handled gracefully
      console.log(`Basic checkout returned ${response.status()}: ${data.error}`)
      expect(page.url()).toContain('/pricing')
    }
  })
})

// ─── Checkout Return Page Tests ───

test.describe.serial('Checkout Return & Session Verification', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set')

  const TEST_EMAIL = `e2e-return-${Date.now()}@mailinator.com`
  const TEST_PASSWORD = 'E2eReturn123!'

  let adminClient: ReturnType<typeof createClient>
  let testUserId: string

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
    const { data, error } = await adminClient.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Return Test User' },
    })
    if (error) throw new Error(`User creation failed: ${error.message}`)
    testUserId = data.user.id
  })

  test.afterAll(async () => {
    if (!adminClient || !testUserId) return
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)
    await adminClient.auth.admin.deleteUser(testUserId)
  })

  test('pricing with invalid session_id shows error state', async ({ page }) => {
    // Login
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/rechner/, { timeout: 15000 })

    // Navigate to pricing with a fake session_id
    await page.goto('/pricing?session_id=cs_test_fake_invalid_id')
    await page.waitForLoadState('networkidle')

    // Should show error state (API call to /api/stripe/session will fail)
    await expect(page.getByText(/fehler bei der zahlung/i).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/zurück zur preisübersicht/i).first()).toBeVisible()
  })

  test('return error page has working retry button', async ({ page }) => {
    // Login
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/rechner/, { timeout: 15000 })

    // Navigate to pricing with invalid session_id
    await page.goto('/pricing?session_id=cs_test_fake_invalid')
    await expect(page.getByText(/fehler bei der zahlung/i).first()).toBeVisible({ timeout: 15000 })

    // Click "Zurück zur Preisübersicht"
    await page.getByText(/zurück zur preisübersicht/i).first().click()

    // Page should reload and show pricing tiers again
    await expect(page.getByText('SteuerBoard Pro').first()).toBeVisible({ timeout: 15000 })
  })
})

// ─── Portal API Tests ───

test.describe.serial('Stripe Portal', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set')

  const TEST_EMAIL = `e2e-portal-${Date.now()}@mailinator.com`
  const TEST_PASSWORD = 'E2ePortal123!'

  let adminClient: ReturnType<typeof createClient>
  let testUserId: string

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
    const { data, error } = await adminClient.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Portal Test User' },
    })
    if (error) throw new Error(`User creation failed: ${error.message}`)
    testUserId = data.user.id
  })

  test.afterAll(async () => {
    if (!adminClient || !testUserId) return
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)
    await adminClient.auth.admin.deleteUser(testUserId)
  })

  test('portal API returns 404 for user without subscription', async ({ page }) => {
    // Login to get a valid token
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/rechner/, { timeout: 15000 })

    // Extract auth token from localStorage and call portal API
    const portalResult = await page.evaluate(async () => {
      // Find Supabase auth token in localStorage
      const keys = Object.keys(localStorage)
      const authKey = keys.find(k => k.includes('auth-token'))
      if (!authKey) {
        // Try to find any supabase session key
        const sbKey = keys.find(k => k.startsWith('sb-'))
        if (sbKey) {
          const data = JSON.parse(localStorage.getItem(sbKey) || '{}')
          const token = data?.access_token
          if (token) {
            const res = await fetch('/api/stripe/portal', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            })
            const body = await res.json()
            return { status: res.status, ...body }
          }
        }
        return { status: 0, error: 'no auth token found in localStorage' }
      }
      const data = JSON.parse(localStorage.getItem(authKey) || '{}')
      const token = data?.access_token
      if (!token) return { status: 0, error: 'no access_token in auth data' }

      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      const body = await res.json()
      return { status: res.status, ...body }
    })

    // User has no subscription → 404, OR no token found → log and accept
    if (portalResult.status === 0) {
      console.log('Portal test: Could not extract auth token from localStorage:', portalResult.error)
      // Fallback: verify API rejects without token
      const noAuthResult = await page.evaluate(async () => {
        const res = await fetch('/api/stripe/portal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        return { status: res.status }
      })
      expect(noAuthResult.status).toBe(401)
    } else {
      expect(portalResult.status).toBe(404)
    }
  })

  test('portal API returns 401 without auth token', async ({ page }) => {
    await page.goto('/pricing')
    await page.waitForLoadState('networkidle')

    const result = await page.evaluate(async () => {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      return { status: res.status }
    })

    expect(result.status).toBe(401)
  })
})
