# WaitMint.ai ↔ Exchange API contract

All money responses use **integer micropaise**. The website formats at the UI boundary.

Base URL: `WAITMINT_API_URL` (server) / `NEXT_PUBLIC_WAITMINT_API_URL` (browser, public routes only).

Envelope: `{ success: boolean, data?: T, message?: string, reason?: string }`

## Auth

Website sessions are Supabase Auth cookies. Server handlers read the session and send:

```
Authorization: Bearer <access_token>
```

Never send the service-role key from this app.

## Consumer

| Method | Path | Notes |
|---|---|---|
| POST | `/api/v1/auth/extension-link/create` | Returns `{ token, expiresAt }` once. Token format `WM-######`. |
| POST | `/api/v1/auth/extension-link/redeem` | Body `{ token, installUserId }`. Extension only. |
| GET | `/api/v1/me` | Profile, roles, org membership flags |
| GET | `/api/v1/me/wallet` | Aggregated Exchange wallet |
| GET | `/api/v1/me/ledger` | Ledger rows (auth + linked installs) |
| GET | `/api/v1/me/earnings` | Recent earning entries |
| GET | `/api/v1/me/extensions` | Linked installations |
| POST | `/api/v1/me/extensions/:id/revoke` | Soft-revoke mapping |
| GET | `/api/v1/me/redemptions` | Payout requests |
| POST | `/api/v1/me/redemptions` | Body `{ method, detail }`. Debits **auth** wallet only. |

Redemption `409` + `reason: funds_on_pre_link_installation` means combined UI balance includes pre-link install funds that have not been migrated. Do not invent a client-side transfer.

## Advertiser (`/api/ads/*`)

Reuse Omni Ads routes. JWT required except `GET /api/ads/inventory`.

Campaign writes use existing statuses. Do not POST invented enums.

## Admin

`profiles.role === 'admin'` on the Exchange. Website `/admin/*` is also server-guarded.

## Website BFF

Next.js proxies privileged consumer calls through `src/app/api/waitmint/[...path]/route.ts` so the access token stays in httpOnly cookies and is attached server-side.
