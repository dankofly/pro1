create table public.promo_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  attempted_at timestamptz not null default now()
);

-- Index for rate-limit lookups (user + time window)
create index idx_promo_attempts_user_time
  on public.promo_attempts (user_id, attempted_at desc);

-- RLS: users can only see/insert their own attempts
alter table public.promo_attempts enable row level security;

create policy "Users can insert own attempts"
  on public.promo_attempts for insert
  with check (auth.uid() = user_id);

create policy "Users can read own attempts"
  on public.promo_attempts for select
  using (auth.uid() = user_id);
