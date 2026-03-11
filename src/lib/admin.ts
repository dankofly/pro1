// Admin-Konfiguration
// Admin-E-Mails die Zugriff auf /admin haben
// Set ADMIN_EMAILS env var as comma-separated list, e.g. "a@example.com,b@example.com"

const envEmails = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || ''
const fallback = 'danielkofler@gmail.com'

export const ADMIN_EMAILS: readonly string[] = envEmails
  ? envEmails.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  : [fallback]

export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
