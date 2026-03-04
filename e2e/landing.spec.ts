import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('loads and shows headline', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/SteuerBoard|SVS/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('has CTA button linking to rechner', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', { name: /rechner|berechnen|jetzt starten/i })
    await expect(cta.first()).toBeVisible()
  })

  test('has navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /pricing|preise/i }).first()).toBeVisible()
  })

  test('footer links to impressum and datenschutz', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /impressum/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /datenschutz/i }).first()).toBeVisible()
  })
})
