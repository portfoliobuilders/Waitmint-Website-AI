const MAX_BODY_BYTES = 64 * 1024;
const MAX_LOGO_BODY_BYTES = 1024 * 1024;

const ALLOWED = new Set([
  "GET /api/v1/me",
  "GET /api/v1/me/wallet",
  "GET /api/v1/me/ledger",
  "GET /api/v1/me/earnings",
  "GET /api/v1/me/extensions",
  "GET /api/v1/me/redemptions",
  "POST /api/v1/me/redemptions",
  "POST /api/v1/auth/extension-link/create",
  "GET /api/ads/me",
  "GET /api/ads/dashboard",
  "GET /api/ads/billing",
  "GET /api/ads/campaigns",
  "GET /api/ads/analytics",
  "GET /api/ads/inventory",
  "GET /api/ads/admin/queue",
  "POST /api/ads/onboarding",
  "POST /api/ads/funding",
  "POST /api/ads/campaigns",
]);

function looksLikeTraversal(path: string): boolean {
  return (
    path.includes("..") ||
    path.includes("\\") ||
    path.includes("://") ||
    path.includes("@") ||
    path.includes("%2e%2e") ||
    path.includes("//")
  );
}

export function normalizeExchangePath(segments: string[]): string | null {
  if (!Array.isArray(segments) || segments.length === 0) return null;
  if (segments.some((part) => !part || part.includes("/") || part.includes("\\"))) {
    return null;
  }
  const exchangePath = `/api/${segments.join("/")}`;
  if (looksLikeTraversal(exchangePath.toLowerCase())) return null;
  if (!exchangePath.startsWith("/api/v1/") && !exchangePath.startsWith("/api/ads/")) {
    return null;
  }
  if (exchangePath.startsWith("/api/v1/admin") || exchangePath.startsWith("/api/v1/exchange/")) {
    return null;
  }
  return exchangePath;
}

export function isBffAllowed(method: string, exchangePath: string): boolean {
  if (ALLOWED.has(`${method} ${exchangePath}`)) return true;
  if (method === "GET" && /^\/api\/ads\/campaigns\/[^/]+$/.test(exchangePath)) return true;
  if (method === "PATCH" && /^\/api\/ads\/campaigns\/[^/]+$/.test(exchangePath)) return true;
  if (method === "POST" && /^\/api\/ads\/campaigns\/[^/]+\/(submit|pause|resume|logo)$/.test(exchangePath)) {
    return true;
  }
  if (method === "POST" && /^\/api\/v1\/me\/extensions\/[^/]+\/revoke$/.test(exchangePath)) {
    return true;
  }
  if (method === "POST" && /^\/api\/ads\/admin\/campaigns\/[^/]+\/review$/.test(exchangePath)) {
    return true;
  }
  if (method === "POST" && /^\/api\/ads\/admin\/funding\/[^/]+\/resolve$/.test(exchangePath)) {
    return true;
  }
  if (method === "POST" && exchangePath === "/api/ads/admin/paid-inventory") return true;
  if (method === "POST" && exchangePath === "/api/ads/admin/inventory") return true;
  return false;
}

export function maxBffBodyBytes(exchangePath: string): number {
  if (exchangePath.endsWith("/logo")) return MAX_LOGO_BODY_BYTES;
  return MAX_BODY_BYTES;
}
