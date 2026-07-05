import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Nur Unit-Tests; Playwright-E2E-Specs (e2e/) laufen über "npm run test:e2e"
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
