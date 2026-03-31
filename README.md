# FIA Motorsport Games Esports — Registration Platform

A full-stack registration and leaderboard platform for sim-racing championships built on Assetto Corsa Rally.

**Stack:** Next.js 16 (App Router) · TypeScript · Supabase (Auth + Postgres) · Tailwind CSS 4

---

## Features

| Area | Details |
|---|---|
| **Home** | Branded landing page with hero, categories & how-to |
| **Regulations** | Full competition ruleset |
| **Leaderboards** | Category tabs (F4 / GT), country & driver search, live Supabase query |
| **Registration** | One-step sign-up form — creates Supabase auth account + DB record |
| **My Registration** | View & edit personal entry, sign out |
| **Admin** | All registrations table, country filter, CSV export |

---

## Prerequisites

- Node.js 20.9+
- A [Supabase](https://supabase.com) project

---

## Setup

### 1. Clone & install dependencies

```bash
git clone <repo-url>
cd esports-registration
npm install
```

### 2. Configure environment

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...

# Slug of the active championship (must match the `slug` column in the championships table)
NEXT_PUBLIC_CHAMPIONSHIP_SLUG=fia-motorsport-games-2026
```

> **Multi-championship deployments:** Deploy the same codebase to different URLs and set a different `NEXT_PUBLIC_CHAMPIONSHIP_SLUG` per deployment to target a different championship.

### 3. Set up the database

In your Supabase dashboard → **SQL Editor**, run these files **in order**:

```
sql/schema.sql    # creates tables, RLS policies, triggers, helper functions
sql/seed.sql      # inserts sample championship + leaderboard data
```

### 4. Configure Supabase Auth

In the Supabase Dashboard:

1. **Authentication → Providers** — ensure **Email** is enabled.
2. **Authentication → URL Configuration**:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URLs: add `http://localhost:3000/**`

### 5. Create an admin user

After registering a user through the app, promote them to admin in Supabase:

```sql
-- Replace with the user's UUID from auth.users
update profiles set is_admin = true where id = '<user-uuid>';
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  page.tsx                   # Home
  login/                     # Sign-in page
  register/                  # Registration form (creates account + entry)
  regulations/               # Competition rules
  leaderboards/              # Leaderboard viewer
  registrations/             # My registration (protected)
    edit/                    # Edit form
  admin/                     # Admin panel (admin-only)
  actions/
    auth.ts                  # signOut server action
    registration.ts          # updateRegistration server action

components/
  Header.tsx                 # Nav header
  Footer.tsx                 # Footer

lib/
  supabase/
    client.ts                # Browser Supabase client
    server.ts                # Server Supabase client (async cookies, Next.js 16)
  countries.ts               # ISO country list

proxy.ts                     # Next.js 16 auth middleware (renamed from middleware.ts)

sql/
  schema.sql                 # Tables, RLS policies, triggers
  seed.sql                   # Sample data

__tests__/
  countries.test.ts
  leaderboard.test.ts
  registration-validation.test.ts
```

---

## Database Schema

| Table | Key Columns |
|---|---|
| `championships` | `id`, `name`, `year`, `slug`, `is_active` |
| `profiles` | `id` (→ auth.users), `is_admin` |
| `registrations` | `id`, `championship_id`, `user_id`, `email`, `first_name`, `last_name`, `country`, `phone`, `steam_id`, consent fields |
| `leaderboard_entries` | `id`, `championship_id`, `category`, `position`, `full_name`, `country`, `car`, `time_display`, `time_ms` |

Row Level Security is enabled on all tables. Users can only read/write their own data. Admins have full read access.

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run test         # Run unit tests (vitest)
npm run test:watch   # Watch mode
npm run lint         # ESLint
```

---

## Adding a New Championship

1. Insert a row into `championships`:
   ```sql
   insert into championships (name, year, slug, is_active)
   values ('My Championship', 2027, 'my-championship-2027', true);
   ```
2. Deploy the app (or update `.env.local`) with:
   ```
   NEXT_PUBLIC_CHAMPIONSHIP_SLUG=my-championship-2027
   ```
3. Seed leaderboard data via `sql/seed.sql` or directly in Supabase.

---

## Notes

- **Next.js 16**: `middleware.ts` is renamed to `proxy.ts`; all `params`, `searchParams`, `cookies()`, `headers()` must be awaited.
- **Tailwind CSS 4**: configured via `@theme` blocks in CSS, not `tailwind.config.js`.
- **Supabase key**: stored as `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (new naming in Supabase v2+).
