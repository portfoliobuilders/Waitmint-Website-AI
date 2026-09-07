# WaitMint.ai Auth setup (Supabase dashboard)

Do this in the **same** Supabase project the Exchange uses. Do not create a second Auth project.

Redirect URLs (Authentication → URL configuration):

- `http://localhost:3000/auth/callback`
- `https://waitmint.ai/auth/callback`

Site URL: `https://waitmint.ai` for production, `http://localhost:3000` for local.

## Email / password

Enable Email provider. Confirm email for new signups during the private pilot.

The database trigger `handle_new_auth_user` creates `profiles` with `role = 'user'`. The website never sends a role from the browser. A later migration blocks client `profiles.role` updates.

## Magic link / OTP

Enable Email OTP / magic link. Redirect: `/auth/callback`.

## Password reset

Uses `resetPasswordForEmail` with redirect `/auth/callback?next=/dashboard/security`.

## Google OAuth

Do **not** claim Google login works until these exist in the Supabase dashboard:

1. Google Cloud OAuth client (Web application)
2. Authorized redirect URI from Supabase (Authentication → Providers → Google)
3. Client ID and Client secret pasted into Supabase (never commit them)

Supabase callback shape:

`https://<PROJECT_REF>.supabase.co/auth/v1/callback`

After the provider is saved, test:

- local: Sign in with Google from `http://localhost:3000/login`
- production: Sign in with Google from `https://waitmint.ai/login`

Until that configuration exists, the website button will fail at the provider, not in application code.

## Logout

`POST /api/auth/signout` clears the cookie session.

## Roles

- Default: `user`
- Advertiser: organization membership via `/api/ads/onboarding` (server)
- Admin: `profiles.role = 'admin'` set by a trusted operator / service role — never `user_metadata`
