# WaitMint.ai website

This repo is the public website and account UI. The financial engine lives in `Waitmint-AI-Waittime-Project`.

## Hard rules

- Do not create website wallets, ledgers, or advertiser balances.
- Display Exchange integers only. Format at the UI boundary.
- Never invent production earnings, impressions, or campaign performance.
- Never put `SUPABASE_SERVICE_ROLE_KEY` in this app.
- Admin authorization is server-side (`profiles.role = admin` via the Exchange).
- Extension `omniUserId` is an install anchor. Link it; do not delete it.

## Brand

WaitMint — Your AI thinks. Your wait earns.

Users: Monetize Your AI Wait Time  
Advertisers: Buy verified AI attention.  
Trust: Your conversations stay yours.  
Qualification: No qualification. No charge. No earning.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
