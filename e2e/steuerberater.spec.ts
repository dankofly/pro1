import { test, expect } from '@playwright/test'

test.describe('Steuerberater Chatbot', () => {
  test('page loads and shows chatbot UI', async ({ page }) => {
    await page.goto('/steuerberater')

    // Should show the chatbot header
    await expect(page.locator('h2', { hasText: 'Steuer-Chatbot' })).toBeVisible({ timeout: 20000 })

    // Should show quickstart questions (welcome screen)
    await expect(page.getByText('Wie viel Einkommensteuer zahle ich')).toBeVisible()
    await expect(page.getByText('GmbH oder Einzelunternehmen')).toBeVisible()
    await expect(page.getByText('Bin ich Kleinunternehmer')).toBeVisible()

    // Should show disclaimer
    await expect(page.getByText('KI-Assistent — keine Steuerberatung')).toBeVisible()

    // Should show input area
    await expect(page.getByPlaceholder('Stelle eine Steuerfrage')).toBeVisible()
  })

  test('shows Pro badge', async ({ page }) => {
    await page.goto('/steuerberater')
    await expect(page.getByText('Pro').first()).toBeVisible({ timeout: 20000 })
  })

  test('navigation shows Steuerberater entry', async ({ page }) => {
    await page.goto('/steuerberater')

    // Desktop sidebar (if visible)
    const sidebar = page.locator('aside')
    if (await sidebar.isVisible()) {
      await expect(sidebar.getByText('Steuerberater')).toBeVisible()
    }
  })

  test('input textarea accepts text and has send button', async ({ page }) => {
    await page.goto('/steuerberater')
    await expect(page.getByPlaceholder('Stelle eine Steuerfrage')).toBeVisible({ timeout: 20000 })

    const textarea = page.getByPlaceholder('Stelle eine Steuerfrage')
    await textarea.fill('Testfrage')
    await expect(textarea).toHaveValue('Testfrage')

    // Send button should be enabled
    const sendButton = page.getByRole('button').filter({ has: page.locator('svg') }).last()
    await expect(sendButton).toBeEnabled()
  })
})
