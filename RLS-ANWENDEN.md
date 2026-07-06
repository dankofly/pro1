# RLS anwenden (letzter Freigabe-Schritt)

Diese SQL macht Row Level Security auf allen nutzerbezogenen Tabellen scharf.
Sie ist idempotent: mehrfaches Ausfuehren ist gefahrlos. Falls RLS bereits
aktiv ist, aendert sich nichts Wesentliches.

## So wendest du sie an (30 Sekunden)

**Weg A (empfohlen, ohne CLI):**
1. Supabase Dashboard oeffnen, Projekt SVS (igkbkczoepcvnwtqnxao)
2. Links: SQL Editor, dann "New query"
3. Den Inhalt von `supabase/migrations/20260706120000_enforce_rls.sql` einfuegen
4. "Run" klicken. Fertig.

**Weg B (mit Supabase CLI, wenn eingerichtet):**
```
supabase db push
```

## Danach pruefen (Behavioural-Test)

Im SQL Editor:
```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('profiles','calculations','subscriptions','ai_rate_limits','webhook_events');
```
`rowsecurity` muss ueberall `true` sein.

Policies pruefen:
```sql
select tablename, policyname, cmd
from pg_policies
where schemaname = 'public'
order by tablename;
```
Erwartet: profiles (select/update/insert own), calculations (select/insert/delete own),
subscriptions (select own), promo_attempts (aus frueherer Migration).

Sobald `rowsecurity = true` auf profiles, calculations und subscriptions steht,
ist der letzte Datenschutz-Blocker vor dem scharfen Abo-Verkauf erledigt.
