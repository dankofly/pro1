import { STRIPE_PLANS } from '@/lib/stripe'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = 'noreply@steuerboard.pro'
const FROM_NAME = 'SteuerBoard.pro'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://steuerboard.pro'

// ─── Branded HTML Template ───

function brandedTemplate(content: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SteuerBoard.pro</title>
${preheader ? `<span style="display:none;font-size:1px;color:#f8fafc;max-height:0;overflow:hidden">${preheader}</span>` : ''}
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto">
      <tr>
        <td style="background:#0d9488;width:36px;height:36px;border-radius:8px;text-align:center;vertical-align:middle;font-size:18px;color:#fff">&#9744;</td>
        <td style="padding-left:12px">
          <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px">SteuerBoard.pro</span><br>
          <span style="color:#94a3b8;font-size:12px">Dein AI-Steuer-Dashboard für Österreich</span>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Content -->
  <tr><td style="background:#ffffff;padding:32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0">
    ${content}
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f8fafc;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;text-align:center">
    <p style="margin:0 0 8px;color:#64748b;font-size:13px">
      <a href="${SITE_URL}" style="color:#0d9488;text-decoration:none">steuerboard.pro</a> &middot;
      <a href="${SITE_URL}/pricing" style="color:#0d9488;text-decoration:none">Preise</a> &middot;
      <a href="${SITE_URL}/faq" style="color:#0d9488;text-decoration:none">FAQ</a> &middot;
      <a href="${SITE_URL}/datenschutz" style="color:#0d9488;text-decoration:none">Datenschutz</a>
    </p>
    <p style="margin:0;color:#94a3b8;font-size:11px">
      &copy; ${new Date().getFullYear()} SteuerBoard.pro<br>
      Diese E-Mail wurde automatisch versendet. Bitte nicht direkt antworten.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function button(text: string, href: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:24px auto">
  <tr><td style="background:#0d9488;border-radius:8px;padding:14px 32px;text-align:center">
    <a href="${href}" style="color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;display:inline-block">${text}</a>
  </td></tr>
  </table>`
}

function heading(text: string): string {
  return `<h1 style="margin:0 0 16px;color:#0f172a;font-size:24px;font-weight:700">${text}</h1>`
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6">${text}</p>`
}

function highlight(text: string): string {
  return `<div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:16px;margin:16px 0">
    <p style="margin:0;color:#0f766e;font-size:14px;line-height:1.5">${text}</p>
  </div>`
}

// ─── Email Types ───

export async function sendWelcomeEmail(email: string, name?: string) {
  const displayName = name || 'Steuerprofi'

  return sendEmail({
    to: email,
    subject: 'Willkommen bei SteuerBoard.pro!',
    html: brandedTemplate(
      heading(`Hallo ${displayName}!`) +
      paragraph('Willkommen bei SteuerBoard.pro — deinem smarten Steuerrechner für Selbstständige in Österreich.') +
      paragraph('Mit deinem kostenlosen Account hast du Zugriff auf:') +
      `<ul style="margin:0 0 16px;padding-left:20px;color:#334155;font-size:15px;line-height:2">
        <li>SVS-Beitragsrechner</li>
        <li>Einkommensteuer-Übersicht</li>
        <li>Wahrheits-Tabelle & Geldfluss-Diagramm</li>
        <li>Sachbezug-Rechner</li>
        <li>Steuer-Wissen Bot</li>
      </ul>` +
      button('Jetzt loslegen', `${SITE_URL}/rechner`) +
      highlight('Tipp: Upgrade auf den Sicherheits-Plan oder SteuerBoard Pro für Einkommensteuer-Prognose, KI-Steuerberater und mehr.'),
      'Dein SteuerBoard.pro Account ist bereit!'
    ),
  })
}

export async function sendSubscriptionConfirmEmail(
  email: string,
  plan: 'basic' | 'pro',
  interval: 'month' | 'year',
  name?: string,
) {
  const displayName = name || 'Steuerprofi'
  const planKey = `${plan}_${interval === 'year' ? 'yearly' : 'monthly'}` as keyof typeof STRIPE_PLANS
  const planConfig = STRIPE_PLANS[planKey]
  const planName = planConfig.label
  const intervalLabel = interval === 'year' ? 'Jahr' : 'Monat'
  const priceDisplay = `${planConfig.priceDisplay} EUR/${intervalLabel}`

  const proFeatures = plan === 'pro'
    ? `<ul style="margin:0 0 16px;padding-left:20px;color:#334155;font-size:15px;line-height:2">
        <li>KI-Steuerberater mit persönlicher Optimierung</li>
        <li>Steuer-Chatbot mit 7 Rechnern</li>
        <li>Misch-Einkommen Rechner</li>
        <li>GmbH-Vergleich & Pauschalierungsvergleich</li>
        <li>USt-Rechner & Rücklagen</li>
        <li>Gewinnmaximierer & AfA-Rechner</li>
        <li>PDF-Export für den Steuerberater</li>
      </ul>`
    : `<ul style="margin:0 0 16px;padding-left:20px;color:#334155;font-size:15px;line-height:2">
        <li>Einkommensteuer-Prognose</li>
        <li>Familienbonus & Absetzbeträge</li>
        <li>Berechnungen speichern</li>
        <li>Dashboard mit Verlauf</li>
        <li>Export-Funktionen</li>
      </ul>`

  return sendEmail({
    to: email,
    subject: `Dein ${planName} ist aktiv!`,
    html: brandedTemplate(
      heading(`${displayName}, dein ${planName} ist aktiv!`) +
      highlight(`<strong>${planName}</strong> — ${priceDisplay}`) +
      paragraph('Ab sofort hast du vollen Zugriff auf:') +
      proFeatures +
      button('Zum Dashboard', `${SITE_URL}/rechner`) +
      paragraph('Du kannst dein Abo jederzeit in deinem <a href="' + SITE_URL + '/profil" style="color:#0d9488">Profil</a> verwalten oder kündigen.') +
      highlight('Die Kosten für SteuerBoard sind oft steuerlich absetzbar. Wie viel du effektiv sparst, kannst du direkt mit SteuerBoard berechnen.'),
      `Dein ${planName} ist aktiv — alle Features freigeschaltet!`
    ),
  })
}

export async function sendCancellationEmail(
  email: string,
  plan: 'basic' | 'pro',
  endsAt: string | null,
  name?: string,
) {
  const displayName = name || 'Steuerprofi'
  const planName = plan === 'pro' ? 'SteuerBoard Pro' : 'Sicherheits-Plan'
  const endDate = endsAt
    ? new Date(endsAt).toLocaleDateString('de-AT', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Ende der Laufzeit'

  return sendEmail({
    to: email,
    subject: `Dein ${planName} wurde gekündigt`,
    html: brandedTemplate(
      heading(`${displayName}, schade dass du gehst!`) +
      paragraph(`Dein <strong>${planName}</strong> wurde gekündigt. Du behältst deinen Zugang bis zum <strong>${endDate}</strong>.`) +
      paragraph('Danach wechselst du automatisch zum kostenlosen Free-Plan. Deine gespeicherten Berechnungen bleiben erhalten.') +
      highlight('<strong>Hast du gewusst?</strong> Die Kosten für SteuerBoard sind oft steuerlich absetzbar — und mit dem Pro-Plan findest du Optimierungen, die sich schnell mehrfach bezahlt machen.') +
      button('Abo reaktivieren', `${SITE_URL}/pricing`) +
      paragraph('Falls du Feedback hast, warum du gekündigt hast, würden wir uns über eine kurze Nachricht freuen. Wir arbeiten ständig daran, SteuerBoard besser zu machen.'),
      `Dein ${planName} läuft noch bis ${endDate}`
    ),
  })
}

export async function sendPaymentSuccessEmail(email: string, name?: string) {
  const displayName = name || 'Steuerprofi'

  return sendEmail({
    to: email,
    subject: 'Zahlung erfolgreich — dein Abo ist wieder aktiv!',
    html: brandedTemplate(
      heading(`${displayName}, alles wieder in Ordnung!`) +
      paragraph('Deine Zahlung wurde erfolgreich verarbeitet. Dein SteuerBoard-Abo ist wieder vollständig aktiv.') +
      highlight('Alle Premium-Features sind wieder freigeschaltet.') +
      button('Zum Dashboard', `${SITE_URL}/rechner`) +
      paragraph('Danke, dass du SteuerBoard weiterhin nutzt!'),
      'Dein Abo ist wieder aktiv'
    ),
  })
}

export async function sendPaymentFailedEmail(email: string, name?: string) {
  const displayName = name || 'Steuerprofi'

  return sendEmail({
    to: email,
    subject: 'Zahlung fehlgeschlagen — Aktion erforderlich',
    html: brandedTemplate(
      heading(`${displayName}, deine Zahlung ist fehlgeschlagen`) +
      paragraph('Wir konnten deine letzte Zahlung für SteuerBoard leider nicht verarbeiten. Bitte aktualisiere deine Zahlungsmethode, damit dein Zugang nicht unterbrochen wird.') +
      highlight('Ohne erfolgreiche Zahlung wird dein Abo in wenigen Tagen pausiert und du verlierst den Zugang zu den Premium-Features.') +
      button('Zahlungsmethode aktualisieren', `${SITE_URL}/profil`) +
      paragraph('Falls du Fragen hast, schau in unsere <a href="' + SITE_URL + '/faq" style="color:#0d9488">FAQ</a> oder kontaktiere uns.'),
      'Bitte aktualisiere deine Zahlungsmethode'
    ),
  })
}

// ─── Send Helper (Resend API) ───

interface EmailParams {
  to: string
  subject: string
  html: string
}

async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email to', params.to)
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [params.to],
        subject: params.subject,
        html: params.html,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('Resend error:', response.status, error)
      return false
    }

    console.log(`Email sent: "${params.subject}" → ${params.to}`)
    return true
  } catch (error: unknown) {
    console.error('Email send error:', error instanceof Error ? error.message : error)
    return false
  }
}
