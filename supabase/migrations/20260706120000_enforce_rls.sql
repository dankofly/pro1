-- ============================================================
-- Row Level Security fuer alle nutzerbezogenen Tabellen
--
-- Hintergrund: Der Client liest/schreibt calculations, subscriptions
-- und profiles mit dem Anon-Key. Ohne RLS koennte ein eingeloggter
-- Nutzer mit veraendertem Query fremde Daten lesen oder loeschen.
-- Diese Migration erzwingt, dass jeder nur seine eigenen Zeilen sieht.
--
-- Idempotent: mehrfaches Ausfuehren ist gefahrlos. Falls RLS bereits
-- aktiv ist, aendert sich nichts Wesentliches (Policies werden neu gesetzt).
--
-- Service-Role (Webhooks, API-Routen via supabase-admin) umgeht RLS
-- weiterhin vollstaendig, daher bleiben Stripe-Webhook-Schreibzugriffe
-- und serverseitige Rate-Limit-Updates funktionsfaehig.
-- ============================================================

-- ── profiles: Schluessel ist id (= auth.uid) ──────────────────
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ── calculations: user_id ─────────────────────────────────────
alter table public.calculations enable row level security;

drop policy if exists "calculations_select_own" on public.calculations;
create policy "calculations_select_own"
  on public.calculations for select
  using (auth.uid() = user_id);

drop policy if exists "calculations_insert_own" on public.calculations;
create policy "calculations_insert_own"
  on public.calculations for insert
  with check (auth.uid() = user_id);

drop policy if exists "calculations_delete_own" on public.calculations;
create policy "calculations_delete_own"
  on public.calculations for delete
  using (auth.uid() = user_id);

-- ── subscriptions: nur Lesen fuer den Eigentuemer ─────────────
-- Schreibzugriffe kommen ausschliesslich von der Service-Role
-- (Stripe-Webhook, Promo-Redeem-API), die RLS umgeht.
alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- ── Rein serverseitige Tabellen: RLS an, keine Client-Policy ──
-- Nur die Service-Role greift darauf zu. RLS ohne Policy bedeutet
-- fuer anon/authenticated: Zugriff verweigert (deny by default).
-- promo_attempts hat bereits eigene Policies (fruehere Migration).
-- Defensiv per DO-Block: bricht nicht ab, falls eine Tabelle fehlt
-- oder abweichend benannt ist.
do $$
declare t text;
begin
  foreach t in array array['ai_rate_limits','ip_rate_limits','webhook_events','promo_codes']
  loop
    if exists (
      select 1 from pg_tables where schemaname = 'public' and tablename = t
    ) then
      execute format('alter table public.%I enable row level security', t);
    end if;
  end loop;
end $$;
