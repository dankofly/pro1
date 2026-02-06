// Admin-Konfiguration
// Admin-E-Mails die Zugriff auf /admin haben

export const ADMIN_EMAILS = [
  'danielkofler@gmail.com',
] as const

export function isAdmin(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase() as typeof ADMIN_EMAILS[number])
}
