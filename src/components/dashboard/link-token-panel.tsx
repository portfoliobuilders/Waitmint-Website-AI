"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LinkTokenPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function createToken() {
    setPending(true);
    setError(null);
    const res = await fetch("/api/waitmint/v1/auth/extension-link/create", { method: "POST" });
    const json = (await res.json().catch(() => ({}))) as {
      data?: { token?: string; expiresAt?: string };
      message?: string;
    };
    setPending(false);
    if (!res.ok || !json.data?.token) {
      setError(json.message || "Could not create a connection code.");
      return;
    }
    setToken(json.data.token);
    setExpiresAt(json.data.expiresAt ?? null);
  }

  return (
    <div className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6">
      <h2 className="text-lg font-medium">Connect WaitMint Extension</h2>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Generate a one-time code. Enter it in the extension popup. The code expires quickly and cannot be reused.
      </p>
      <Button type="button" className="mt-5" onClick={createToken} disabled={pending}>
        Connect Extension
      </Button>
      {token ? (
        <p className="mt-5 font-mono text-3xl tracking-[0.18em] text-[var(--wm-mint)]">{token}</p>
      ) : null}
      {expiresAt ? (
        <p className="mt-2 text-xs text-[var(--wm-muted)]">Expires {new Date(expiresAt).toLocaleTimeString()}</p>
      ) : null}
      {error ? <p className="mt-3 text-sm text-[var(--wm-danger)]">{error}</p> : null}
    </div>
  );
}
