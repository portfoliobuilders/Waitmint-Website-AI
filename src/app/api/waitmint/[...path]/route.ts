import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { waitmintApiUrl } from "@/lib/config";

export const dynamic = "force-dynamic";

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

function isAllowed(method: string, exchangePath: string): boolean {
  if (ALLOWED.has(`${method} ${exchangePath}`)) return true;
  if (method === "GET" && /^\/api\/ads\/campaigns\/[^/]+$/.test(exchangePath)) return true;
  if (method === "PATCH" && /^\/api\/ads\/campaigns\/[^/]+$/.test(exchangePath)) return true;
  if (method === "POST" && /^\/api\/ads\/campaigns\/[^/]+\/(submit|pause|resume|logo)$/.test(exchangePath)) return true;
  if (method === "POST" && /^\/api\/v1\/me\/extensions\/[^/]+\/revoke$/.test(exchangePath)) return true;
  if (method === "POST" && /^\/api\/ads\/admin\/campaigns\/[^/]+\/review$/.test(exchangePath)) return true;
  if (method === "POST" && /^\/api\/ads\/admin\/funding\/[^/]+\/resolve$/.test(exchangePath)) return true;
  if (method === "POST" && exchangePath === "/api/ads/admin/paid-inventory") return true;
  if (method === "POST" && exchangePath === "/api/ads/admin/inventory") return true;
  return false;
}

async function proxy(request: Request, params: { path: string[] }) {
  const base = waitmintApiUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, message: "WaitMint API is not configured." },
      { status: 503 },
    );
  }

  const exchangePath = `/api/${params.path.join("/")}`;
  if (!isAllowed(request.method, exchangePath)) {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  const { session } = await getSessionUser();
  if (!session?.access_token && exchangePath !== "/api/ads/inventory") {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const search = new URL(request.url).search;
  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  try {
    const upstream = await fetch(`${base}${exchangePath}${search}`, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "WaitMint Exchange is unreachable." },
      { status: 503 },
    );
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await context.params);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await context.params);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, await context.params);
}
