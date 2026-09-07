#!/usr/bin/env bash
# Set hosted Auth Site URL + redirect allow-list for the WaitMint website.
# Requires SUPABASE_ACCESS_TOKEN with auth_config_write (npx supabase login).
# Does not print the token. Does not touch service role or the database password.
set -euo pipefail

export WAITMINT_SUPABASE_PROJECT_REF="${WAITMINT_SUPABASE_PROJECT_REF:-vylhcsbbihpbrgpadxio}"
export WAITMINT_AUTH_SITE_URL="${WAITMINT_AUTH_SITE_URL:-https://waitmintai.vercel.app}"
export WAITMINT_AUTH_REDIRECTS="${WAITMINT_AUTH_REDIRECTS:-http://localhost:3000/auth/callback,https://waitmintai.vercel.app/auth/callback,https://waitmint.ai/auth/callback}"

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]]; then
  echo "SUPABASE_ACCESS_TOKEN is required." >&2
  echo "On your machine: npx supabase login" >&2
  echo "Create a token at https://supabase.com/dashboard/account/tokens" >&2
  exit 1
fi

python3 - <<'PY'
import json, os, sys, urllib.error, urllib.request

ref = os.environ["WAITMINT_SUPABASE_PROJECT_REF"]
site_url = os.environ["WAITMINT_AUTH_SITE_URL"]
allow_list = os.environ["WAITMINT_AUTH_REDIRECTS"]
token = os.environ["SUPABASE_ACCESS_TOKEN"]
body = json.dumps(
    {
        "site_url": site_url,
        "uri_allow_list": allow_list,
        "external_email_enabled": True,
    }
).encode()
req = urllib.request.Request(
    f"https://api.supabase.com/v1/projects/{ref}/config/auth",
    data=body,
    method="PATCH",
    headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    },
)
try:
    with urllib.request.urlopen(req, timeout=30) as res:
        data = json.loads(res.read().decode())
except urllib.error.HTTPError as err:
    print(err.read().decode()[:800], file=sys.stderr)
    raise SystemExit(f"Auth config update failed: HTTP {err.code}") from err

print("Updated hosted Auth for", ref)
print("site_url:", data.get("site_url") or site_url)
print("uri_allow_list:", data.get("uri_allow_list") or allow_list)
print("external_email_enabled:", data.get("external_email_enabled"))
PY
