# MERCADEO

All-in-one business management platform with online catalog and AI copilot.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + Shadcn UI + Lucide Icons
- Supabase (`@supabase/ssr`) for auth and database

## Getting Started

```bash
cp .env.local.example .env.local
# Add your Supabase URL and anon key to .env.local
npm run dev
```

## Project Structure

| Path | Purpose |
|------|---------|
| `app/(auth)/` | Login & registration |
| `app/(dashboard)/` | Protected business management |
| `app/(public)/catalog/` | Public product storefront |
| `components/` | Shared UI and layout components |
| `lib/supabase/` | Supabase client utilities |
| `types/` | TypeScript type definitions |

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the schema SQL from `.cursorrules` in the SQL Editor
3. Copy project URL and anon key to `.env.local`

See `.cursorrules` for full schema, RLS policies, and development guidelines.
