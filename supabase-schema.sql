-- ============================================================
-- SVS Checker – Supabase Schema
-- ============================================================

-- Section: Promo Codes
-- Einmalige Promo-Codes für Pro-Zugang (Admin-generiert)

CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  note text,
  created_by uuid REFERENCES auth.users(id),
  redeemed_by uuid REFERENCES auth.users(id),
  redeemed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- RLS: Kein direkter Client-Zugriff, nur via Service Role (API Routes)
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Keine Policies = kein Client-Zugriff (nur Service Role Key kann lesen/schreiben)

-- ============================================================
-- Performance Indexes
-- ============================================================

-- calculations: Dashboard-Abfragen filtern nach user_id + sortieren nach created_at
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id);
CREATE INDEX IF NOT EXISTS idx_calculations_user_created ON calculations(user_id, created_at DESC);

-- subscriptions: Abo-Lookup pro User (jede Seitennavigation)
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- promo_codes: Redeem-Query filtert nach code + redeemed_by IS NULL
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_redeemed_by ON promo_codes(redeemed_by);
