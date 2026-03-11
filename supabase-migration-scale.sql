-- Migration: Scalability fixes for 1000+ users
-- Run this in Supabase SQL Editor

-- ── 1. Indexes for ai_rate_limits (currently no indexes) ────
CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_user_id ON ai_rate_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_reset_at ON ai_rate_limits(reset_at);

-- ── 2. Indexes for promo_attempts ───────────────────────────
CREATE INDEX IF NOT EXISTS idx_promo_attempts_user_id_time ON promo_attempts(user_id, attempted_at DESC);

-- ── 3. IP rate limits table (replaces in-memory rate limiting) ──
CREATE TABLE IF NOT EXISTS ip_rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  reset_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ip_rate_limits_reset_at ON ip_rate_limits(reset_at);

-- Auto-cleanup old entries (older than 1 day)
-- Run this periodically or use pg_cron if available
-- DELETE FROM ip_rate_limits WHERE reset_at < NOW() - INTERVAL '1 day';

-- ── 4. Webhook idempotency table ────────────────────────────
CREATE TABLE IF NOT EXISTS webhook_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_event_id ON webhook_events(event_id);

-- Auto-cleanup: keep only last 30 days
-- DELETE FROM webhook_events WHERE processed_at < NOW() - INTERVAL '30 days';

-- ── 5. RLS policies ─────────────────────────────────────────
-- ip_rate_limits: only service role should access (API routes use admin client)
ALTER TABLE ip_rate_limits ENABLE ROW LEVEL SECURITY;
-- No RLS policies = only service_role can access (which is correct)

ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
-- No RLS policies = only service_role can access (which is correct)
