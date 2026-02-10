import { NextRequest, NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe-server'

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.json({ error: 'session_id fehlt' }, { status: 400 })
    }

    const session = await getStripeServer().checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email ?? null,
    })
  } catch (err) {
    console.error('Session retrieve error:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
