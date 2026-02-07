import { ImageResponse } from 'next/og'

export const alt = 'SVS Checker – SVS-Beitragsrechner für Selbständige in Österreich'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #172554 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: 'rgba(16, 185, 129, 0.2)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              color: '#10b981',
              fontWeight: 800,
            }}
          >
            S
          </div>
          <span style={{ fontSize: 36, color: 'white', fontWeight: 700 }}>
            SVS Checker
          </span>
        </div>
        <div
          style={{
            fontSize: 48,
            color: 'white',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          SVS-Beitragsrechner für Selbständige in Österreich
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(147, 197, 253, 0.6)',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          Berechne SVS-Beiträge, Nachzahlung und echtes Netto. Kostenlos.
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 40,
          }}
        >
          {['PV', 'KV', 'UV', 'EST', 'Netto'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '8px 20px',
                color: 'rgba(147, 197, 253, 0.8)',
                fontSize: 16,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
