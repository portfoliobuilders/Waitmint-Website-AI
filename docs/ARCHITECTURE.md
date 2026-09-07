# WaitMint.ai Architecture

**Your AI thinks. Your wait earns.**

This repository is the WaitMint.ai **main website and account platform**. It is not the financial engine.

## Two repositories

| Repository | Role |
|---|---|
| `portfoliobuilders/Waitmint-Website-AI` (this repo) | Public website, Supabase Auth UI, user / advertiser / admin consoles |
| `portfoliobuilders/Waitmint-AI-Waittime-Project` | Chrome extension, Exchange API, Postgres settlement, Omni Ads BFF |

Local sibling workspace used during development:

```text
WaitMint-Workspace/
├── Waitmint-Website-AI/              → /workspace in Cloud Agent
└── Waitmint-AI-Waittime-Project/     → /home/ubuntu/WaitMint-Workspace/...
```

Do not copy the engine into this repository. Do not create a second wallet, ledger, or campaign database here.

## Canonical system

```text
WAITMINT.AI (this Next.js app)
       │
       ├── Public Website
       ├── Supabase Auth (email, Google, magic link)
       ├── User Dashboard  → Wallet / Earnings / Payouts / Extension
       ├── Advertiser Dashboard → Campaigns / Billing / Analytics
       └── Admin Dashboard
               │
               ↓  Bearer JWT + server BFF
        Existing WaitMint API  (backend-core :3001)
               │
               ↓  service role (API only — never the browser)
       Supabase / Postgres
               │
               ↓
        WaitMint Exchange  (settle_impression RPC)
               ↑
               │
      WaitMint Chrome Extension  (omniUserId install anchor)
```

## One of each

| Concern | Source of truth |
|---|---|
| User identity | Supabase Auth `auth.users.id` = `profiles.id` |
| Extension install | `installations.extension_install_id` derived from local `omniUserId` |
| Account link | `extension_account_links` (mapping only — no ledger rewrite) |
| User wallet | Postgres `wallets` + `ledger_entries` |
| Advertiser money | `advertiser_wallets` + `advertiser_ledger_entries` |
| Campaigns | `campaigns`, `creatives`, `campaign_surfaces` |
| Settlement | `omni_private.settle_impression()` |
| Surfaces / kill switch | `inventory_surfaces.serving_enabled`, `app_config.paid_inventory_enabled` |

The website **displays and manages**. It never manufactures earnings.

## Money loop (unchanged)

```text
AI generation
→ WaitMint wait detected
→ sponsored placement
→ verified viewability
→ qualifying impression
→ advertiser-funded settlement
→ 60% user
→ 40% WaitMint
```

**No qualification. No charge. No earning.**

House inventory settles at ₹0. Amounts are integer **BIGINT micropaise** (`1 INR = 100,000 micropaise`). Display conversion happens only at the UI boundary.

## Identity model (audited)

### Earners (extension, historically anonymous)

1. Extension generates `omniUserId` (`crypto.randomUUID`) in `chrome.storage.local`.
2. API maps it with `profileIdFromUserId()`:
   - UUID → used as `profiles.id`
   - otherwise SHA-256 → deterministic UUID
3. `installations.extension_install_id` is that derived UUID.
4. There is **no** cryptographic proof on legacy `/api/v1/exchange/wallet/:userId` routes.

### Earners (WaitMint.ai account)

1. User signs up on WaitMint.ai via Supabase Auth.
2. Trigger `handle_new_auth_user` creates `profiles` (+ `advertiser_profiles`).
3. Website issues a short-lived `WM-######` link token (hashed, one-time, 10 minutes).
4. Extension redeems the token through the **API** (never with a service-role key).
5. Backend writes `extension_account_links`:
   - `anonymous_profile_id` → original install profile
   - `auth_profile_id` → signed-in `auth.users.id`
6. **New** wait sessions settle to the auth profile. Historical ledger rows stay on the anonymous profile.
7. `/api/v1/me/wallet` **sums** auth + actively linked anonymous wallets (integers only).

Do not delete `omniUserId`. Do not rewrite historical financial rows.

### Advertisers

Supabase Auth JWT → `GET /api/ads/me` → `advertiser_members` org context. A single login may be both earner and advertiser.

### Admins

`profiles.role = 'admin'` checked **on the server** (`/api/ads/admin/*` and website server guards). Frontend route hiding is not authorization.

## What this website must never do

- Create `wallets`, `ledger_entries`, or advertiser balance tables of its own
- Compute balances in the browser from impressions or timers
- Trust `user_metadata` for roles (use `profiles.role` / `app_metadata` / API)
- Expose `SUPABASE_SERVICE_ROLE_KEY` or database passwords
- Fake production earnings, impressions, or campaign performance
- Claim live UPI/bank automation or a payment gateway during the private pilot

## Existing Exchange APIs reused

Consumer (JWT):

- `POST /api/v1/auth/extension-link/create`
- `POST /api/v1/auth/extension-link/redeem`
- `GET /api/v1/me`, `/me/wallet`, `/me/ledger`, `/me/earnings`, `/me/extensions`, `/me/redemptions`
- `POST /api/v1/me/redemptions`
- `POST /api/v1/me/extensions/:id/revoke`

Advertiser / admin (JWT, existing Omni Ads BFF):

- `/api/ads/me`, `/onboarding`, `/dashboard`, `/billing`, `/funding`
- `/api/ads/campaigns`, `/campaigns/:id`, `/submit`, `/pause`, `/resume`, `/logo`
- `/api/ads/analytics`, `/inventory`
- `/api/ads/admin/queue`, `/admin/campaigns/:id/review`, `/admin/funding/:id/resolve`
- `/api/ads/admin/paid-inventory`, `/admin/inventory`

Public:

- `GET /api/v1/config`
- `GET /api/ads/inventory`

Legacy unauthenticated `GET /api/v1/exchange/wallet/:userId` is **not** used by this website.

## Campaign states (backend enums — display only)

`draft` → `pending_review` → `active` ⇄ `paused` → `exhausted` | `rejected` | `ended`

`review_status`: `pending` | `approved` | `rejected` | `changes_requested`

UI labels may say “Submitted” for `pending_review`. Do not invent conflicting status strings in writes.

## Pilot honesty

- Advertiser funding is **manual admin credit** (`Private Pilot Funding`).
- User payouts are **Pilot Payout** requests (`amazon_voucher` | `upi`), reviewed manually.
- ChatGPT is the only **live verified** surface unless `inventory_surfaces` says otherwise.

## Website stack

Next.js (App Router) + React + TypeScript + Tailwind + Zod + React Hook Form + Supabase Auth (`@supabase/ssr`) + Vitest + Playwright.

Privileged calls go through Next.js server components / route handlers that attach the user JWT to the Exchange API. The browser never receives the service-role key.
