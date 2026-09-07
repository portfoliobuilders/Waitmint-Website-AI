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

## Hosted Auth URLs (dashboard or token)

Authentication → URL configuration, or:

```bash
npx supabase login
export SUPABASE_ACCESS_TOKEN=...   # https://supabase.com/dashboard/account/tokens
./scripts/configure-hosted-auth.sh
```

That sets:

- Site URL: `https://waitmintai.vercel.app` (until `waitmint.ai` DNS is attached)
- Redirects: `http://localhost:3000/auth/callback`, `https://waitmintai.vercel.app/auth/callback`, `https://waitmint.ai/auth/callback`

## Cursor MCP

`.cursor/mcp.json` is scoped to this project and **read-only**. Agents can inspect docs/schema/logs and read publishable keys. They cannot `apply_migration`, write SQL, deploy Edge Functions, or branch this production database. Ledger writes belong in `Waitmint-AI-Waittime-Project`.

