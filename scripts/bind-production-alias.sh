#!/usr/bin/env bash
# Bind https://waitmintai.vercel.app to a Ready Production deployment.
# Does not create a new Vercel project. Does not print tokens.
set -euo pipefail

SCOPE="${VERCEL_SCOPE:-team_awqGHouzlfFcOUI0SqcUTtw2}"
ALIAS="${WAITMINT_PRODUCTION_ALIAS:-waitmintai.vercel.app}"
DEPLOYMENT_URL="${1:-${WAITMINT_PRODUCTION_DEPLOYMENT_URL:-}}"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN is required. Create one at https://vercel.com/account/tokens" >&2
  exit 1
fi

if [[ -z "$DEPLOYMENT_URL" ]]; then
  echo "Usage: $0 <production-deployment-url>" >&2
  echo "Example: $0 https://waitmint-266yd4vi8-portfolios-projects-8cfcc159.vercel.app" >&2
  exit 1
fi

DEPLOYMENT_URL="${DEPLOYMENT_URL#https://}"
DEPLOYMENT_URL="${DEPLOYMENT_URL#http://}"
DEPLOYMENT_URL="${DEPLOYMENT_URL%%/*}"

npx --yes vercel@latest alias set "$DEPLOYMENT_URL" "$ALIAS" --yes --scope "$SCOPE" --token "$VERCEL_TOKEN"
echo "Bound $ALIAS -> $DEPLOYMENT_URL"
echo "Verify: curl -I https://$ALIAS"
