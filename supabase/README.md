# WaitMint Auth (this website)

This folder links the website to the **same** Supabase project the Exchange uses.

- Project ref: `vylhcsbbihpbrgpadxio`
- API URL: `https://vylhcsbbihpbrgpadxio.supabase.co`

Do **not** put `SUPABASE_SERVICE_ROLE_KEY`, `sb_secret_…`, or the database password in this app. The website uses the publishable / anon key only (`NEXT_PUBLIC_SUPABASE_ANON_KEY`). Ledger schema and service-role access live in `Waitmint-AI-Waittime-Project`.

## Link the CLI (on a machine that can log in)

```bash
npx supabase login
npx supabase link --project-ref vylhcsbbihpbrgpadxio
```

`supabase login` is interactive (or `SUPABASE_ACCESS_TOKEN`). This cloud agent cannot complete login without that token.

The Postgres URI belongs on the Exchange / operators, not in this website’s env.

## Hosted Auth URLs (dashboard)

Authentication → URL configuration:

- Site URL: `https://waitmintai.vercel.app` (until `waitmint.ai` DNS is attached)
- Redirect: `https://waitmintai.vercel.app/auth/callback`
- Local redirect: `http://localhost:3000/auth/callback`
