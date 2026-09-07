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
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase project as the Exchange |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon / publishable key |
| `WAITMINT_API_URL` | Server-side Exchange API origin |
| `NEXT_PUBLIC_WAITMINT_API_URL` | Public catalog / config origin |
| `NEXT_PUBLIC_CHROME_EXTENSION_URL` | Chrome Web Store listing |

Never put `SUPABASE_SERVICE_ROLE_KEY` or database passwords in this repository.

Local development talks to local Supabase + `http://127.0.0.1:3001`. Production must use hosted URLs.

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

Public: `/` `/earn` `/advertise` `/how-it-works` `/verified-attention` `/platforms` `/trust` `/pricing` `/about` `/blog` `/faq` `/privacy` `/terms`

Auth: `/login` `/signup` `/forgot-password` `/auth/callback`

User: `/dashboard` `/dashboard/wallet` `/dashboard/earnings` `/dashboard/activity` `/dashboard/payouts` `/dashboard/extension` `/dashboard/settings` `/dashboard/security`

Advertiser: `/advertiser` `/advertiser/onboarding` `/advertiser/campaigns` `/advertiser/campaigns/new` `/advertiser/campaigns/[id]` `/advertiser/creatives` `/advertiser/billing` `/advertiser/analytics` `/advertiser/settings`

Admin: `/admin` `/admin/users` `/admin/advertisers` `/admin/campaigns` `/admin/funding` `/admin/payouts` `/admin/surfaces` `/admin/settlements` `/admin/system`

## Deployment

Portable to any Node host that can run Next.js. Set environment-based API URLs. Do not ship localhost endpoints to production.

## License

Proprietary. WaitMint / Portfolio Builders.
