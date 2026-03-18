# SteuerBoard.pro – CLAUDE.md

## PROJEKT
SteuerBoard.pro ist eine AI-gestützte Steuerplattform für österreichische Steuerpflichtige.
Ziel: Steueroptimierung, Steuerrechner, AI Tax Advisor und Steuerwissen – alles in einer modernen Web-App.
Gründer: Daniel Kofler (Hypeakz Agency). Launch-Phase: Influencer-Tests + Beta-User.

## TECH STACK
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Sprache:** TypeScript (strict)
- **UI:** React 19 + Tailwind CSS 3.4 + shadcn/ui + Radix UI + Lucide Icons
- **Animationen:** Motion (framer-motion successor)
- **Datenbank:** Supabase (PostgreSQL + Auth + RLS)
- **Payments:** Stripe (Embedded Checkout, Customer Portal, Webhooks)
- **AI:** Vercel AI SDK v5+ mit Google Gemini (streamText)
- **Anthropic SDK:** @anthropic-ai/sdk (für erweiterte AI-Features)
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod Validation
- **PDF Export:** jsPDF + jspdf-autotable
- **CSV Import:** PapaParse
- **Testing:** Playwright (E2E) + Vitest
- **Deployment:** Netlify (@netlify/plugin-nextjs)

## ARCHITEKTUR

### Kernmodule (src/app/)
- `/dashboard` – Hauptübersicht nach Login
- `/rechner` – Steuerrechner (ESt, Bilanz, Krypto, Sachbezug, Investitionsfreibetrag, Misch-Einkommen)
- `/steuerwissen` – Wissens-Content
- `/steuerberater` – Steuerberater-Verzeichnis
- `/pricing` – Preisseite (Free/Pro)
- `/admin` – Admin-Panel
- `/auth` – Login/Signup
- `/api/stripe/*` – Checkout, Portal, Webhooks
- `/api/ai/tax-advisor` – AI Steuerberater (Gemini Streaming, Pro-gated, Rate-Limited)
- `/api/promo/redeem` – Promo-Code Einlösung

### Kern-Libraries (src/lib/)
- `stripe.ts` – Client-safe Config, STRIPE_PLANS, getStripePromise()
- `stripe-server.ts` – Server-only lazy Stripe Singleton (NICHT module-level init)
- `supabase.ts` – Supabase Client

### Kern-Components (src/components/)
- `svs/app-shell.tsx` – AppShell Context (User, Subscription, Auth)
- `rechner/ai-tax-advisor.tsx` – AI Chat UI, Streaming, Pro-Gate
- `ui/` – shadcn/ui Komponenten

### Hooks
- `use-subscription.ts` – Subscription State Hook

## KRITISCHE REGELN

### Code-Qualität
1. **Button + Link:** IMMER `<Button asChild><Link href="...">text</Link></Button>`. NIEMALS `<Link><Button>` (invalid HTML, bricht Navigation)
2. **React Hooks:** KEINE Hooks nach conditional early returns. Alle Hooks müssen unconditional laufen.
3. **Stripe SDK v17+:** `current_period_end` ist auf `SubscriptionItem`, NICHT auf `Subscription`. Nutze `subscription.items.data[0].current_period_end`
4. **Vercel AI SDK v5+:** Nutze `maxOutputTokens` (NICHT `maxTokens`) in `streamText()` / `generateText()`
5. **Stripe Server:** Nutze `getStripeServer()` lazy Singleton aus `@/lib/stripe-server` (nicht module-level init – bricht den Build)
6. **Umlaute:** IMMER echte Unicode-Zeichen (ä, ö, ü). Keine ASCII-Approximationen.
7. **API Fehler:** IMMER Toast/Alert bei API-Fehlern zeigen. Kein stilles `console.error`.

### Datenbank
- Supabase mit Row Level Security (RLS) auf allen Tabellen
- `calculations` – User-Berechnungen mit `user_id` Index
- `subscriptions` – Abo-Status (Stripe-synced via Webhooks)
- `promo_codes` – Admin-generierte Promo-Codes (nur Service Role Zugriff)
- `ai_rate_limits` – Rate-Limiting für AI-Features (user_id, request_count, reset_at)
- Spalten heißen `stripe_*` (NICHT `lemonsqueezy_*` – Migration erledigt)

### Security
- Supabase Auth für alle geschützten Routen
- Stripe Webhook Signature Verification
- Service Role Key nur serverseitig
- RLS auf allen Tabellen
- Rate Limiting auf AI-Endpoints
- Input Validation mit Zod auf allen API Routes

## ENV VARIABLES
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
GOOGLE_GENERATIVE_AI_API_KEY=
ANTHROPIC_API_KEY=
```

## BUSINESS KONTEXT
- **Zielmarkt:** Österreich (Steuerrecht AT)
- **Monetarisierung:** Freemium (Free = begrenzte Rechner, Pro = alle Features + AI Advisor)
- **Payment:** Stripe mit monatlichem/jährlichem Abo
- **Promo-System:** Admin-generierte Codes für Influencer/Tester
- **Launch-Strategie:** Influencer-Seeding → Beta-User → Public Launch

## LAUNCH-PRIORITÄTEN
1. Custom SMTP für gebrandete Auth-Emails (noreply@steuerboard.pro)
2. Email-Templates mit eigenem Branding/Logo
3. Alle Rechner funktional + getestet
4. AI Tax Advisor stabil + Rate-Limited
5. Stripe Checkout + Portal fehlerfrei
6. Landing Page conversion-optimiert
7. SEO Basics (Sitemap, Robots, Meta, OG)
8. DSGVO-konforme Seiten (Impressum, Datenschutz, AGB)

## COMMIT CONVENTION
Semantic Commits auf Deutsch:
- `feat: Neuer Krypto-Steuerrechner`
- `fix: Stripe Webhook Signatur-Prüfung`
- `style: Dashboard responsive Layout`
- `refactor: AppShell Context vereinfacht`
- `docs: API Dokumentation ergänzt`
- `test: E2E Tests für Auth Flow`

## DEVELOPMENT
```bash
npm run dev          # Dev Server (Turbopack)
npm run build        # Production Build
npm run test:e2e     # Playwright Tests
npm run lint         # ESLint
```

## WORKFLOW
1. Immer zuerst betroffene Dateien lesen bevor Änderungen gemacht werden
2. Kleine, fokussierte Commits
3. Jede API Route hat Input Validation (Zod)
4. Jede UI-Änderung responsive testen
5. Keine neuen Dependencies ohne klaren Grund
6. TypeScript strict – keine `any` Types
