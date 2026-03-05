/**
 * Auth E2E Tests — Registration, Login, Password Reset
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local for functional tests.
 * Page-load tests run without it.
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

// ─── Page Load Tests (no service role key needed) ───

test.describe('Auth Pages', () => {
  test('login page loads with form', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.getByLabel(/e-mail|email/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByLabel(/passwort|password/i).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /anmelden|login/i }).first()).toBeVisible()
  })

  test('login page has link to register', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.getByRole('link', { name: /registrieren|register/i }).first()).toBeVisible()
  })

  test('login page has password reset link', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.getByText(/passwort vergessen/i).first()).toBeVisible()
  })

  test('register page loads with form', async ({ page }) => {
    await page.goto('/auth/register')
    await expect(page.getByLabel(/e-mail|email/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByLabel(/passwort|password/i).first()).toBeVisible()
    await expect(page.getByLabel(/name/i).first()).toBeVisible()
  })

  test('register page has link to login', async ({ page }) => {
    await page.goto('/auth/register')
    await expect(page.getByRole('link', { name: /anmelden/i }).first()).toBeVisible()
  })

  test('reset password page loads with form', async ({ page }) => {
    await page.goto('/auth/reset-password')
    await expect(page.getByLabel(/neues passwort/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByLabel(/passwort bestätigen/i).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /passwort ändern/i }).first()).toBeVisible()
  })

  test('empty login stays on page', async ({ page }) => {
    await page.goto('/auth/login')
    await page.getByRole('button', { name: /anmelden|login/i }).first().click()
    await expect(page).toHaveURL(/login/)
  })
})

// ─── Functional Auth Tests (require service role key) ───

test.describe.serial('Auth Flow: Login & Redirect', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set')

  const TEST_EMAIL = `e2e-auth-${Date.now()}@mailinator.com`
  const TEST_PASSWORD = 'E2eAuthTest123!'

  let adminClient: ReturnType<typeof createClient>
  let testUserId: string

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
    const { data, error } = await adminClient.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Auth Test User' },
    })
    if (error) throw new Error(`User creation failed: ${error.message}`)
    testUserId = data.user.id
  })

  test.afterAll(async () => {
    if (!adminClient || !testUserId) return
    await adminClient.from('subscriptions').delete().eq('user_id', testUserId)
    await adminClient.auth.admin.deleteUser(testUserId)
  })

  test('login with valid credentials redirects to /rechner', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()

    await page.waitForURL(/\/rechner/, { timeout: 15000 })
    expect(page.url()).toContain('/rechner')
  })

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill('WrongPassword999!')
    await page.getByRole('button', { name: /anmelden/i }).first().click()

    await expect(page.getByText(/ungültige anmeldedaten/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page).toHaveURL(/login/)
  })

  test('login with non-existent email shows error', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill('nonexistent@example.com')
    await page.locator('#password').fill('SomePassword123!')
    await page.getByRole('button', { name: /anmelden/i }).first().click()

    await expect(page.getByText(/ungültige anmeldedaten/i).first()).toBeVisible({ timeout: 10000 })
  })

  test('login with redirect param goes to correct page', async ({ page }) => {
    await page.goto('/auth/login?redirect=/profil')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()

    await page.waitForURL(/\/profil/, { timeout: 15000 })
    expect(page.url()).toContain('/profil')
  })

  test('logged-in user sees profile page with correct email', async ({ page }) => {
    // Login first
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(TEST_EMAIL)
    await page.locator('#password').fill(TEST_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()
    await page.waitForURL(/\/rechner/, { timeout: 15000 })

    // Navigate to profile
    await page.goto('/profil')
    await page.waitForLoadState('networkidle')
    // Email may be truncated on mobile, so check for text content instead of visibility
    await expect(page.getByText(/auth test user/i).first()).toBeVisible({ timeout: 10000 })
    const profileText = await page.locator('body').textContent()
    expect(profileText).toContain(TEST_EMAIL)
  })
})

test.describe.serial('Auth Flow: Registration', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set')

  const REGISTER_EMAIL = `e2e-register-${Date.now()}@mailinator.com`
  const REGISTER_PASSWORD = 'E2eRegister123!'

  let adminClient: ReturnType<typeof createClient>

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
  })

  test.afterAll(async () => {
    if (!adminClient) return
    // Clean up: find and delete the test user
    const { data } = await adminClient.auth.admin.listUsers()
    const testUser = data?.users?.find(u => u.email === REGISTER_EMAIL)
    if (testUser) {
      await adminClient.from('subscriptions').delete().eq('user_id', testUser.id)
      await adminClient.auth.admin.deleteUser(testUser.id)
    }
  })

  test('registration shows success or translated error', async ({ page }) => {
    await page.goto('/auth/register')
    await page.waitForLoadState('networkidle')
    await page.locator('#name').fill('Register Tester')
    await page.locator('#email').fill(REGISTER_EMAIL)
    await page.locator('#password').fill(REGISTER_PASSWORD)
    await page.getByRole('button', { name: /konto erstellen/i }).first().click()

    // Wait for either success or error (both are valid outcomes)
    await page.waitForTimeout(5000)
    const hasSuccess = await page.getByText(/registrierung erfolgreich/i).first().isVisible().catch(() => false)
    const hasGermanError = await page.getByText(/ungültige|e-mail-limit|bereits registriert/i).first().isVisible().catch(() => false)
    const hasEnglishError = await page.getByText(/invalid|rate limit|already registered/i).first().isVisible().catch(() => false)

    // Must show EITHER success OR a German error (not raw English from Supabase)
    console.log('Registration result:', { hasSuccess, hasGermanError, hasEnglishError })
    expect(hasSuccess || hasGermanError).toBe(true)
    // If there's an English error showing through, our translation is incomplete
    if (hasEnglishError && !hasGermanError && !hasSuccess) {
      const errorText = await page.locator('[role="alert"]').first().textContent()
      console.log('UNTRANSLATED ERROR:', errorText)
    }
  })

  test('duplicate email registration shows error', async ({ page }) => {
    // First auto-confirm the user so the email is taken
    const { data } = await adminClient.auth.admin.listUsers()
    const user = data?.users?.find(u => u.email === REGISTER_EMAIL)
    if (user) {
      await adminClient.auth.admin.updateUserById(user.id, { email_confirm: true })
    }

    await page.goto('/auth/register')
    await page.waitForLoadState('networkidle')
    await page.locator('#name').fill('Duplicate Tester')
    await page.locator('#email').fill(REGISTER_EMAIL)
    await page.locator('#password').fill(REGISTER_PASSWORD)
    await page.getByRole('button', { name: /konto erstellen/i }).first().click()

    // Supabase may show success (to prevent email enumeration) or error
    // Either way, page should respond within timeout
    await page.waitForTimeout(3000)
    // The registration page should either show success or an error - not hang
    const hasSuccess = await page.getByText(/registrierung erfolgreich/i).first().isVisible().catch(() => false)
    const hasError = await page.getByText(/error|fehler|already|bereits/i).first().isVisible().catch(() => false)
    expect(hasSuccess || hasError).toBe(true)
  })
})

test.describe.serial('Auth Flow: Password Reset', () => {
  test.skip(!SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY not set')

  const RESET_EMAIL = `e2e-reset-${Date.now()}@mailinator.com`
  const RESET_PASSWORD = 'E2eReset123!'
  const NEW_PASSWORD = 'E2eNewPass456!'

  let adminClient: ReturnType<typeof createClient>
  let testUserId: string

  test.beforeAll(async () => {
    adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
    const { data, error } = await adminClient.auth.admin.createUser({
      email: RESET_EMAIL,
      password: RESET_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: 'Reset Test User' },
    })
    if (error) throw new Error(`User creation failed: ${error.message}`)
    testUserId = data.user.id
  })

  test.afterAll(async () => {
    if (!adminClient || !testUserId) return
    await adminClient.auth.admin.deleteUser(testUserId)
  })

  test('password reset request from login page', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(RESET_EMAIL)
    await page.getByText(/passwort vergessen/i).first().click()

    // Accept either success message OR rate limit error (Supabase Free Tier: ~4 emails/hour)
    await page.waitForTimeout(3000)
    const hasSuccess = await page.getByText(/link zum zurücksetzen gesendet/i).first().isVisible().catch(() => false)
    const hasRateLimit = await page.getByText(/e-mail-limit erreicht|alle 60 sekunden/i).first().isVisible().catch(() => false)
    expect(hasSuccess || hasRateLimit).toBe(true)
  })

  test('password reset without email shows error', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    // Click "Passwort vergessen" without entering email
    await page.getByText(/passwort vergessen/i).first().click()

    await expect(page.getByText(/e-mail-adresse/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('reset password page validates matching passwords', async ({ page }) => {
    await page.goto('/auth/reset-password')
    await page.waitForLoadState('networkidle')
    await page.locator('#password').fill(NEW_PASSWORD)
    await page.locator('#confirm-password').fill('DifferentPass999!')
    await page.evaluate(() => document.querySelector('form')?.setAttribute('novalidate', ''))
    await page.getByRole('button', { name: /passwort ändern/i }).first().click()

    await expect(page.getByText(/stimmen nicht überein/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('reset password page validates minimum length', async ({ page }) => {
    await page.goto('/auth/reset-password')
    await page.waitForLoadState('networkidle')
    await page.locator('#password').fill('short')
    await page.locator('#confirm-password').fill('short')
    // Disable native browser minLength validation so our JS validation fires
    await page.evaluate(() => document.querySelector('form')?.setAttribute('novalidate', ''))
    await page.getByRole('button', { name: /passwort ändern/i }).first().click()

    await expect(page.getByText(/mindestens 8 zeichen/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('can login after admin password change', async ({ page }) => {
    // Change password via admin API
    await adminClient.auth.admin.updateUserById(testUserId, { password: NEW_PASSWORD })

    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    await page.locator('#email').fill(RESET_EMAIL)
    await page.locator('#password').fill(NEW_PASSWORD)
    await page.getByRole('button', { name: /anmelden/i }).first().click()

    await page.waitForURL(/\/rechner/, { timeout: 15000 })
    expect(page.url()).toContain('/rechner')
  })
})
