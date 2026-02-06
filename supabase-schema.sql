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
