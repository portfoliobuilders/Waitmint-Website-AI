import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { waitmintApiUrl } from "@/lib/config";
import {
  isBffAllowed,
  maxBffBodyBytes,
  normalizeExchangePath,
} from "@/lib/api/bff";

export const dynamic = "force-dynamic";

async function proxy(request: Request, params: { path: string[] }) {
  const base = waitmintApiUrl();
  if (!base) {
    return NextResponse.json(
      { success: false, message: "WaitMint API is not configured." },
      { status: 503 },
    );
  }

  const exchangePath = normalizeExchangePath(params.path);
  if (!exchangePath || !isBffAllowed(request.method, exchangePath)) {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  const { session } = await getSessionUser();
  if (!session?.access_token && exchangePath !== "/api/ads/inventory") {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const headers = new Headers();
  headers.set("Content-Type", request.headers.get("Content-Type") || "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const search = new URL(request.url).search;
  const isBodyless = request.method === "GET" || request.method === "HEAD";
  const body = isBodyless ? undefined : await request.arrayBuffer();
  if (body && body.byteLength > maxBffBodyBytes(exchangePath)) {
    return NextResponse.json({ success: false, message: "Payload too large." }, { status: 413 });
  }

  try {
    const upstream = await fetch(`${base}${exchangePath}${search}`, {
      method: request.method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
      cache: "no-store",
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/json",
      },
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
