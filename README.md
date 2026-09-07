# WaitMint.ai

**Your AI thinks. Your wait earns.**

This repository is the WaitMint.ai main website and account platform:

- public marketing site
- Supabase Auth
- user dashboard, wallet, payouts, extension linking
- advertiser console
- admin console

It is **not** the financial engine.

## Architecture

```text
WaitMint.ai (this Next.js app)
   → WaitMint API (backend-core)
      → Supabase / Postgres
         → WaitMint Exchange (settle_impression)
```

The Exchange repository is `portfoliobuilders/Waitmint-AI-Waittime-Project`.

There is one user identity, one wallet, one ledger, one campaign system, and one settlement engine. This website displays and manages that system. It never manufactures earnings.

See `docs/ARCHITECTURE.md` and `docs/API_CONTRACT.md`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod · React Hook Form · Supabase Auth (`@supabase/ssr`) · Vitest · Playwright

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

The app listens on [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase project as the Exchange (`https://vylhcsbbihpbrgpadxio.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon / publishable key |
| `WAITMINT_API_URL` | Server-side Exchange API origin |
| `NEXT_PUBLIC_WAITMINT_API_URL` | Public catalog / config origin |
| `NEXT_PUBLIC_CHROME_EXTENSION_URL` | Chrome Web Store listing |

Never put `SUPABASE_SERVICE_ROLE_KEY`, `sb_secret_…`, or database passwords in this repository.

Local website development uses the hosted Auth project (or `supabase start` from this folder). Production must not use localhost for the Exchange API.

### Supabase Auth

Enable in the Supabase dashboard:

- Email + password
- Google
- Email magic link / OTP

Redirect URL: `https://<your-domain>/auth/callback`

## Scripts

```bash
npm run dev
npm run build
npm start
npm run typecheck
npm run lint
npm test
npm run test:e2e
```

## Security

- Privileged Exchange calls go through `src/app/api/waitmint/[...path]/route.ts` with the user JWT.
- Admin pages additionally require `profiles.role = admin` from the Exchange.
- Wallet numbers are integers from the API. Unavailable values render as `—`.
- Extension link tokens are created and redeemed on the Exchange, never invented in the browser.

## Routes

Public: `/` `/earn` `/advertise` `/how-it-works` `/verified-attention` `/platforms` `/products` `/trust` `/pricing` `/about` `/blog` `/faq` `/privacy` `/terms`

Auth: `/login` `/signup` `/forgot-password` `/auth/callback`

User: `/dashboard` `/dashboard/wallet` `/dashboard/earnings` `/dashboard/activity` `/dashboard/payouts` `/dashboard/connections` `/dashboard/extension` `/dashboard/settings` `/dashboard/security`

Advertiser: `/advertiser` `/advertiser/onboarding` `/advertiser/campaigns` `/advertiser/campaigns/new` `/advertiser/campaigns/[id]` `/advertiser/creatives` `/advertiser/billing` `/advertiser/analytics` `/advertiser/settings`

Admin: `/admin` `/admin/users` `/admin/advertisers` `/admin/campaigns` `/admin/funding` `/admin/payouts` `/admin/surfaces` `/admin/settlements` `/admin/system`

## Deployment

GitHub: [portfoliobuilders/Waitmint-Website-AI](https://github.com/portfoliobuilders/Waitmint-Website-AI)

Hosting: Vercel project **waitmint.ai** (team `portfolios-projects`)

Production (current free URL): **https://waitmintai.vercel.app**

`https://waitmint.vercel.app` is already used by a different Vite app. Do not try to take that alias from another Vercel project. Do not use `waitmint.ai.vercel.app`.

Future custom domain: **https://waitmint.ai** (DNS not configured yet)

Git integration is connected to this repository. The intended flow is:

```text
Cursor edits
  → commit
  → push to GitHub
  → Vercel preview for branches / PRs
  → merge to main deploys production
```

You should not need to upload build files by hand.

### Local Vercel linking

From this repository (do not commit the result):

```bash
npx vercel login
npx vercel link
npx vercel env pull .env.local
```

When linking, choose the existing project **waitmint.ai**. `.vercel/` is gitignored.

If `https://waitmintai.vercel.app` returns Vercel platform `404 NOT_FOUND` while Production is Ready, check **Framework Preset first**. It must be Next.js (`vercel.json` pins this). A preset of Other deploys `public/` only and looks Ready with empty output.

If the preset is already Next.js, bind the public alias:

```bash
npx vercel alias set <unique-production-url> waitmintai.vercel.app
```

See `docs/PRODUCTION.md`.

### Production environment

Configure these in the Vercel dashboard. Never put real secrets in git or in `NEXT_PUBLIC_*` except the public anon key.

| Variable | Production |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://waitmintai.vercel.app` until `waitmint.ai` is attached |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://vylhcsbbihpbrgpadxio.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | WaitMint publishable key (Vercel / `.env.local` only) |
| `WAITMINT_API_URL` | Hosted Exchange origin only — never localhost |
| `NEXT_PUBLIC_WAITMINT_API_URL` | Same hosted origin, or leave unset |
| `NEXT_PUBLIC_CHROME_EXTENSION_URL` | Chrome Web Store listing, when ready |

Leave `WAITMINT_API_URL` unset until a hosted Exchange exists. Do not put `SUPABASE_SERVICE_ROLE_KEY` or database passwords in this app.

The marketing site can deploy without Auth or the Exchange. Login, wallet, extension linking, and advertiser management are **not** production-ready until those hosted values exist.

See `docs/PRODUCTION.md` and `docs/AUTH_SETUP.md`.

## License

Proprietary. WaitMint / Portfolio Builders.
