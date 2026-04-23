-- =============================================================================
-- Esports Registration Platform - Database Schema
-- Run this in your Supabase SQL editor
-- =============================================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- =============================================================================
-- TABLES
-- =============================================================================

-- Championships table
create table if not exists championships (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  year        integer not null,
  slug        text not null unique,   -- used in env var NEXT_PUBLIC_CHAMPIONSHIP_SLUG
  is_active   boolean not null default false,
  created_at  timestamptz default now()
);

-- Profiles table (extends auth.users with role info)
create table if not exists profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  is_admin    boolean not null default false,
  created_at  timestamptz default now()
);

-- Registrations table
create table if not exists registrations (
  id                    uuid default gen_random_uuid() primary key,
  championship_id       uuid references championships(id) on delete cascade not null,
  user_id               uuid references auth.users(id) on delete cascade not null,
  email                         text not null,
  first_name                    text not null,
  last_name                     text not null,
  nationality                   text not null,
  phone                         text not null,
  steam_id                      text not null,
  is_of_legal_age               boolean not null default true,
  named_competitor_first_name   text,
  named_competitor_last_name    text,
  named_competitor_nationality  text,
  named_competitor_email        text,
  named_competitor_phone        text,
  consent_profiling             boolean not null default false,
  consent_marketing             boolean not null default false,
  accepted_regulation           boolean not null default false,
  created_at                    timestamptz default now(),
  updated_at            timestamptz default now(),
  unique(championship_id, user_id)
);

-- Leaderboard entries table
create table if not exists leaderboard_entries (
  id              uuid default gen_random_uuid() primary key,
  championship_id uuid references championships(id) on delete cascade not null,
  position        integer not null,
  full_name       text not null,
  country         text not null,
  time_display    text not null,        -- formatted e.g. "1:23.456"
  time_ms         integer not null,     -- milliseconds, used for sorting
  raw_json        jsonb,                -- raw entry payload from ACR API
  created_at      timestamptz default now()
);

-- =============================================================================
-- FUNCTIONS & TRIGGERS
-- =============================================================================

-- Auto-create profile on user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Auto-update updated_at on registrations
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists registrations_updated_at on registrations;
create trigger registrations_updated_at
  before update on registrations
  for each row execute procedure update_updated_at();

-- Helper function to check admin status
create or replace function is_admin()
returns boolean as $$
  select coalesce(
    (select is_admin from profiles where id = auth.uid()),
    false
  )
$$ language sql security definer stable;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table championships enable row level security;
alter table profiles enable row level security;
alter table registrations enable row level security;
alter table leaderboard_entries enable row level security;

-- Championships: public read
create policy "Championships are publicly readable"
  on championships for select
  using (true);

-- Championships: admin write
create policy "Admins can manage championships"
  on championships for all
  using (is_admin());

-- Profiles: users read their own
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

-- Profiles: admins read all
create policy "Admins can read all profiles"
  on profiles for select
  using (is_admin());

-- Profiles: users update their own
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Registrations: users read their own
create policy "Users can read own registration"
  on registrations for select
  using (auth.uid() = user_id);

-- Registrations: users create their own
create policy "Users can create own registration"
  on registrations for insert
  with check (auth.uid() = user_id);

-- Registrations: users update their own
create policy "Users can update own registration"
  on registrations for update
  using (auth.uid() = user_id);

-- Registrations: admins read all
create policy "Admins can read all registrations"
  on registrations for select
  using (is_admin());

-- Leaderboard entries: public read
create policy "Leaderboard entries are publicly readable"
  on leaderboard_entries for select
  using (true);

-- Leaderboard entries: admin write
create policy "Admins can manage leaderboard entries"
  on leaderboard_entries for all
  using (is_admin());
