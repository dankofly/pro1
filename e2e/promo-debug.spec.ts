/**
 * Promo Code E2E Test
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local to create test user + promo code.
 * Run: npx playwright test e2e/promo-debug.spec.ts --headed
 */
import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local (Playwright doesn't load it automatically like Next.js)
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
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2JrY3pvZXBjdm53dHFueGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzEzMDMsImV4cCI6MjA4NTkwNzMwM30.qulDaztojFqqqeCKdIlVoildpUcadDW0IcEwk3N4jbc'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const TEST_EMAIL = `e2e-promo-${Date.now()}@test.steuerboard.pro`
const TEST_PASSWORD = 'E2eTestPass123!'
const TEST_CODE = `TST-${Math.random().toString(16).slice(2, 6).toUpperCase()}-${Math.random().toString(16).slice(2, 6).toUpperCase()}-${Math.random().toString(16).slice(2, 6).toUpperCase()}-${Math.random().toString(16).slice(2, 6).toUpperCase()}`

test.describe.serial('Promo Code Redemption', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set — add it to .env.local')

  let adminClient: ReturnType<typeof createClient>
  let testUserId: string

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

    // 1. Create auto-confirmed test user
    const { data: userData, error: userError } = await adminClient.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'E2E Promo Tester' },
    })
    if (userError) throw new Error(`User creation failed: ${userError.message}`)
    testUserId = userData.user.id
    console.log(`Created test user: ${TEST_EMAIL} (${testUserId})`)

    // 2. Create test promo code
    const { error: codeError } = await adminClient.from('promo_codes').insert({
      code: TEST_CODE,
      created_by: testUserId,
      note: 'E2E test',
    } as never)
    if (codeError) throw new Error(`Promo code creation failed: ${codeError.message}`)
    console.log(`Created test promo code: ${TEST_CODE}`)
  })

  test.afterAll(async () => {
    if (!adminClient || !testUserId) return
    await adminClient.from('promo_codes').delete().eq('code', TEST_CODE)
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)
    await adminClient.from('promo_attempts').delete().eq('user_id', testUserId)
    await adminClient.auth.admin.deleteUser(testUserId)
    console.log('Cleaned up test user and promo code')
  })

  test('API: redeem promo code directly', async ({ request }) => {
    // Sign in to get access token
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { data: session, error: signInError } = await anonClient.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })
    expect(signInError).toBeNull()
    const token = session.session!.access_token

    // Call redeem API
    const res = await request.post('/api/promo/redeem', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: { code: TEST_CODE },
    })

    const body = await res.json()
    console.log('Redeem response:', res.status(), JSON.stringify(body))

    expect(res.status()).toBe(200)
    expect(body.success).toBe(true)
    expect(body.plan).toBe('pro')

    // Verify code is redeemed in DB
    const { data: codeRow } = await adminClient
      .from('promo_codes')
      .select('redeemed_by')
      .eq('code', TEST_CODE)
      .single() as { data: { redeemed_by: string } | null }
    expect(codeRow?.redeemed_by).toBe(testUserId)

    // Verify subscription is active
    const { data: sub } = await adminClient
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', testUserId)
      .single() as { data: { plan: string; status: string } | null }
    expect(sub?.plan).toBe('pro')
    expect(sub?.status).toBe('active')
  })

  test('UI: login and redeem promo code via profile page', async ({ page }) => {
    // Reset: un-redeem the code for UI test
    await adminClient.from('promo_codes').update({
      redeemed_by: null,
      redeemed_at: null,
    } as never).eq('code', TEST_CODE)
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)

    // Login
    await page.goto('/auth/login')
    await page.getByLabel(/e-mail/i).first().fill(TEST_EMAIL)
    await page.getByLabel(/passwort/i).first().fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/(rechner|profil|dashboard)/, { timeout: 15000 })

    // Go to profile
    await page.goto('/profil')
    await page.waitForLoadState('networkidle')

    // Verify promo input is visible (free user)
    const promoInput = page.getByPlaceholder(/SVS/i).first()
    await expect(promoInput).toBeVisible({ timeout: 10000 })

    // Enter promo code and verify no truncation
    await promoInput.fill(TEST_CODE)
    const inputValue = await promoInput.inputValue()
    expect(inputValue.length).toBe(TEST_CODE.length)
    console.log(`Input: "${inputValue}" (${inputValue.length} chars)`)

    // Intercept API response
    const responsePromise = page.waitForResponse(
      res => res.url().includes('/api/promo/redeem'),
      { timeout: 10000 }
    )

    await page.getByRole('button', { name: /einlösen/i }).first().click()
    const response = await responsePromise
    const responseBody = await response.json()
    console.log('API:', response.status(), JSON.stringify(responseBody))

    expect(response.status()).toBe(200)
    await expect(page.getByText(/code eingelöst|pro wird aktiviert/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('UI: already redeemed code shows error', async ({ page }) => {
    // Code is now redeemed from previous test — delete subscription so promo input shows
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)

    await page.goto('/auth/login')
    await page.getByLabel(/e-mail/i).first().fill(TEST_EMAIL)
    await page.getByLabel(/passwort/i).first().fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/(rechner|profil|dashboard)/, { timeout: 15000 })

    await page.goto('/profil')
    await page.waitForLoadState('networkidle')

    const promoInput = page.getByPlaceholder(/SVS/i).first()
    await expect(promoInput).toBeVisible({ timeout: 10000 })
    await promoInput.fill(TEST_CODE)

    const responsePromise = page.waitForResponse(
      res => res.url().includes('/api/promo/redeem'),
      { timeout: 10000 }
    )

    await page.getByRole('button', { name: /einlösen/i }).first().click()
    const response = await responsePromise
    expect(response.status()).toBe(409)
  })

  test('UI: invalid code shows error', async ({ page }) => {
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)

    await page.goto('/auth/login')
    await page.getByLabel(/e-mail/i).first().fill(TEST_EMAIL)
    await page.getByLabel(/passwort/i).first().fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/(rechner|profil|dashboard)/, { timeout: 15000 })

    await page.goto('/profil')
    await page.waitForLoadState('networkidle')

    const promoInput = page.getByPlaceholder(/SVS/i).first()
    await expect(promoInput).toBeVisible({ timeout: 10000 })
    await promoInput.fill('INVALID-CODE-123')

    const responsePromise = page.waitForResponse(
      res => res.url().includes('/api/promo/redeem'),
      { timeout: 10000 }
    )

    await page.getByRole('button', { name: /einlösen/i }).first().click()
    const response = await responsePromise
    expect(response.status()).toBe(404)
  })
})
