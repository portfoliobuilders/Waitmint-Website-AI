import { waitmintApiUrl } from "@/lib/config";
import type { ApiEnvelope } from "@/lib/api/types";

export class WaitmintApiError extends Error {
  status: number;
  reason?: string;
  constructor(message: string, status: number, reason?: string) {
    super(message);
    this.name = "WaitmintApiError";
    this.status = status;
    this.reason = reason;
  }
}

export type WaitmintResult<T> =
  | { ok: true; data: T }
  | { ok: false; kind: "unconfigured" | "offline" | "unauthorized" | "error"; message: string; status?: number; reason?: string };

async function exchangeFetch(
  path: string,
  init: RequestInit & { accessToken?: string | null } = {},
): Promise<Response> {
  const base = waitmintApiUrl();
  if (!base) {
    throw new WaitmintApiError("WaitMint API is not configured.", 503, "unconfigured");
  }
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (init.accessToken) {
    headers.set("Authorization", `Bearer ${init.accessToken}`);
  }
  const rest = { ...init };
  delete rest.accessToken;
  return fetch(`${base}${path}`, {
    ...rest,
    headers,
    cache: "no-store",
  });
}

export async function callWaitmint<T>(
  path: string,
  init: RequestInit & { accessToken?: string | null } = {},
): Promise<WaitmintResult<T>> {
  try {
    const res = await exchangeFetch(path, init);
    const json = (await res.json().catch(() => ({}))) as ApiEnvelope<T>;
    if (res.status === 401) {
      return { ok: false, kind: "unauthorized", message: json.message || "Sign in required.", status: 401 };
    }
    if (!res.ok || json.success === false) {
      return {
        ok: false,
        kind: res.status >= 500 ? "offline" : "error",
        message: json.message || `Request failed (${res.status})`,
        status: res.status,
        reason: json.reason,
      };
    }
    return { ok: true, data: json.data as T };
  } catch (error) {
    if (error instanceof WaitmintApiError && error.reason === "unconfigured") {
      return { ok: false, kind: "unconfigured", message: error.message };
    }
    return {
      ok: false,
      kind: "offline",
      message: error instanceof Error ? error.message : "WaitMint Exchange is unreachable.",
    };
  }
}

export async function getPublicInventory() {
  return callWaitmint<{ inventory: Array<Record<string, unknown>> }>("/api/ads/inventory");
}

export async function getPublicConfig() {
  return callWaitmint<Record<string, unknown>>("/api/v1/config");
}
