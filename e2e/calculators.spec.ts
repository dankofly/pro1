import { test, expect } from '@playwright/test'

test.describe('Calculator Pages', () => {
  test('einkommensteuer page loads with H1', async ({ page }) => {
    await page.goto('/einkommensteuer')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/einkommensteuer/i).first()).toBeVisible()
  })

  test('krypto-steuer page loads with H1', async ({ page }) => {
    await page.goto('/krypto-steuer')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/krypto/i).first()).toBeVisible()
  })

  test('sachbezug-rechner page loads with H1', async ({ page }) => {
    await page.goto('/sachbezug-rechner')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/sachbezug/i).first()).toBeVisible()
  })

  test('investitionsfreibetrag page loads with H1', async ({ page }) => {
    await page.goto('/investitionsfreibetrag')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/investitionsfreibetrag/i).first()).toBeVisible()
  })

  test('bilanz page loads with H1', async ({ page }) => {
    await page.goto('/bilanz')
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(/bilanz/i).first()).toBeVisible()
  })
})

test.describe('Calculator SEO', () => {
  test('einkommensteuer has correct title', async ({ page }) => {
    await page.goto('/einkommensteuer')
    await expect(page).toHaveTitle(/einkommensteuer/i)
  })

  test('krypto-steuer has correct title', async ({ page }) => {
    await page.goto('/krypto-steuer')
    await expect(page).toHaveTitle(/krypto/i)
  })

  test('sachbezug-rechner has correct title', async ({ page }) => {
    await page.goto('/sachbezug-rechner')
    await expect(page).toHaveTitle(/sachbezug/i)
  })

  test('investitionsfreibetrag has correct title', async ({ page }) => {
    await page.goto('/investitionsfreibetrag')
    await expect(page).toHaveTitle(/investitionsfreibetrag/i)
  })

  test('bilanz has correct title', async ({ page }) => {
    await page.goto('/bilanz')
    await expect(page).toHaveTitle(/bilanz/i)
  })

  test('einkommensteuer has JSON-LD', async ({ page }) => {
    await page.goto('/einkommensteuer')
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd.first()).toBeAttached({ timeout: 15000 })
  })
})

test.describe('Navigation includes new pages', () => {
  test('sidebar shows new calculator links on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/rechner')

    // Check sidebar has new nav items
    await expect(page.getByRole('link', { name: /einkommensteuer/i }).first()).toBeVisible({ timeout: 15000 })
    await expect(page.getByRole('link', { name: /krypto-steuer/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /sachbezug/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /ifb-rechner/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /bilanz/i }).first()).toBeVisible()
  })
})
