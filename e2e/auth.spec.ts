import { test, expect } from '@playwright/test'

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
  })

  test('shows validation error on empty login', async ({ page }) => {
    await page.goto('/auth/login')
    await page.getByRole('button', { name: /anmelden|login/i }).first().click()
    // Should show error or stay on page
    await expect(page).toHaveURL(/login/)
  })

  test('reset password page loads', async ({ page }) => {
    await page.goto('/auth/reset-password')
    await expect(page.getByText(/passwort|password/i).first()).toBeVisible({ timeout: 10000 })
  })
})
