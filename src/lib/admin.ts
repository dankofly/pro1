// Admin-Konfiguration
// Admin-E-Mails die Zugriff auf /admin haben
// Set ADMIN_EMAILS env var as comma-separated list, e.g. "a@example.com,b@example.com"

const HARDCODED_ADMINS = ['danielkofler@gmail.com']

const envEmails = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || ''
const envList = envEmails
  ? envEmails.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  : []

// Merge env-configured admins with hardcoded fallback (deduped)
export const ADMIN_EMAILS: readonly string[] = [...new Set([...HARDCODED_ADMINS, ...envList])]

export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
