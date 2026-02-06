/**
 * Validates a redirect URL to prevent open redirect attacks.
 * Only allows relative paths starting with '/'.
 * Returns fallback if the URL is invalid or external.
 */
export function safeRedirect(url: string | null | undefined, fallback = '/rechner'): string {
  if (!url) return fallback

  // Must start with / and must NOT start with // (protocol-relative URL)
  if (!url.startsWith('/') || url.startsWith('//')) return fallback

  // Block any URL with protocol
  try {
    const parsed = new URL(url, 'http://localhost')
    if (parsed.host !== 'localhost') return fallback
  } catch {
    return fallback
  }

  return url
}
