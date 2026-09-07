# WaitMint.ai production environment

Website (`Waitmint-Website-AI`) uses **only** these names. Do not invent aliases.

```text
NEXT_PUBLIC_SITE_URL=https://waitmintai.vercel.app
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
WAITMINT_API_URL=
NEXT_PUBLIC_WAITMINT_API_URL=
NEXT_PUBLIC_CHROME_EXTENSION_URL=
```

Set these in the Vercel project **waitmint.ai** (Production / Preview / Development as appropriate). Do not put real secret values in git.

## Vercel project

- Dashboard: `https://vercel.com/portfolios-projects-8cfcc159/waitmint.ai`
- GitHub: `portfoliobuilders/Waitmint-Website-AI`
- Production branch: `main`
- Current free alias to use: `https://waitmintai.vercel.app`
- Preferred alias `https://waitmint.vercel.app` is already serving a different Vite app. Do not try to take it from another project.
- Future custom domain: `https://waitmint.ai` (not configured in this task)

## Rules

- Never put `SUPABASE_SERVICE_ROLE_KEY`, database passwords, or Exchange admin keys in this app.
- Leave `WAITMINT_API_URL` unset until a hosted Exchange exists. A production build **fails** if it is localhost / 127.0.0.1. Do not fake a hosted API URL.
- Without a hosted API, the public marketing site can still deploy. Wallet, dashboard, advertiser, and admin Exchange data stay blocked.
- `NEXT_PUBLIC_*` values are visible in the browser. Anon key only — never service role.
- Auth callbacks are `${origin}/auth/callback`. Configure:
  - local: `http://localhost:3000/auth/callback`
  - current Vercel production: `https://waitmintai.vercel.app/auth/callback`
  - future custom domain: `https://waitmint.ai/auth/callback`

## Canonical site

Until `waitmint.ai` DNS is attached, canonical URLs should use the live Vercel alias (`https://waitmintai.vercel.app`).

Sitemap, robots, Open Graph, and JSON-LD use `NEXT_PUBLIC_SITE_URL` when set. On Vercel, if that variable is unset, the app uses `VERCEL_PROJECT_PRODUCTION_URL` (production) or `VERCEL_URL` (preview).

## Engine (separate repository)

Hosted Exchange needs `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` on the **API server only**. Optional: `WAITMINT_CORS_ORIGINS` for extra advertiser portal origins. `https://waitmint.ai` is already allowed.

Do not apply database migrations until the WaitMint hosted Supabase project is positively identified. The Supabase project currently connected to this agent (`portfolixslipgen`) is **not** WaitMint.
