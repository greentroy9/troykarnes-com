-- HALT Journal schema
-- Run this once in the Supabase SQL Editor.

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null,
  created_at timestamptz not null default now(),
  days_sober integer,
  sleep smallint,                -- 1-4
  mood smallint,                 -- "How was your day yesterday?" 1-4
  goal_accomplished text,        -- 'Yes' / 'No'
  workout_type text,
  workout_minutes numeric,
  breakfast text,
  breakfast_plan smallint,       -- 1-4
  lunch text,
  lunch_plan smallint,
  dinner text,
  dinner_plan smallint,
  snacks text,
  snacks_plan smallint,
  weight numeric,
  goal text,                     -- today's goal
  prompt text,                   -- the journal prompt shown that day
  journal text                   -- the journal writing itself
);
create index if not exists journal_entries_date_idx on journal_entries (entry_date desc);

create table if not exists journal_prompts (
  id uuid primary key default gen_random_uuid(),
  day_of_week smallint not null, -- 1=Monday ... 7=Sunday
  theme text not null,           -- e.g. 'Intentions'
  prompt text not null,
  active boolean not null default true
);

create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscription jsonb not null,
  created_at timestamptz not null default now()
);

-- small key/value store (last reminder sent, etc.)
create table if not exists journal_kv (
  key text primary key,
  value jsonb
);

-- Lock everything down (service role bypasses RLS; anon gets nothing)
alter table journal_entries enable row level security;
alter table journal_prompts enable row level security;
alter table push_subscriptions enable row level security;
alter table journal_kv enable row level security;
