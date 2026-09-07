# WaitMint.ai production environment

Website (`Waitmint-Website-AI`) uses **only** these names. Do not invent aliases.

```text
NEXT_PUBLIC_SITE_URL=https://waitmint.ai
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
WAITMINT_API_URL=
NEXT_PUBLIC_WAITMINT_API_URL=
NEXT_PUBLIC_CHROME_EXTENSION_URL=
```

## Rules

- Never put `SUPABASE_SERVICE_ROLE_KEY`, database passwords, or Exchange admin keys in this app.
- `WAITMINT_API_URL` in production must be the hosted Exchange. A production build/runtime **fails** if it is localhost / 127.0.0.1.
- `NEXT_PUBLIC_*` values are visible in the browser. Anon key only — never service role.
- Auth callbacks are `${origin}/auth/callback`. Configure both:
  - local: `http://localhost:3000/auth/callback`
  - production: `https://waitmint.ai/auth/callback`

## Canonical site

Public canonical host: `https://waitmint.ai`

Sitemap, robots, Open Graph, and JSON-LD use `NEXT_PUBLIC_SITE_URL` (defaulting to `https://waitmint.ai` in production).

## Engine (separate repository)

Hosted Exchange needs `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` on the **API server only**. Optional: `WAITMINT_CORS_ORIGINS` for extra advertiser portal origins. `https://waitmint.ai` is already allowed.

Do not apply database migrations until the WaitMint hosted Supabase project is positively identified. The Supabase project currently connected to this agent (`portfolixslipgen`) is **not** WaitMint.
