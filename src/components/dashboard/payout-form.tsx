"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PayoutForm() {
  const [method, setMethod] = useState<"amazon_voucher" | "upi">("upi");
  const [detail, setDetail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    const res = await fetch("/api/waitmint/v1/me/redemptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, detail }),
    });
    const json = (await res.json().catch(() => ({}))) as { message?: string; reason?: string };
    setPending(false);
    if (!res.ok) {
      setError(json.message || "Payout request failed.");
      return;
    }
    setMessage("Pilot payout request recorded. Manual review is required.");
    setDetail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6">
      <label className="block text-sm">
        Method
        <select
          value={method}
          onChange={(event) => setMethod(event.target.value as "amazon_voucher" | "upi")}
          className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
        >
          <option value="upi">UPI (pilot)</option>
          <option value="amazon_voucher">Amazon voucher (pilot)</option>
        </select>
      </label>
      <label className="block text-sm">
        Details
        <input
          required
          value={detail}
          onChange={(event) => setDetail(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
          placeholder={method === "upi" ? "UPI ID" : "Email for voucher"}
        />
      </label>
      {error ? <p className="text-sm text-[var(--wm-danger)]">{error}</p> : null}
      {message ? <p className="text-sm text-[var(--wm-mint)]">{message}</p> : null}
      <Button type="submit" disabled={pending}>
        Request payout
      </Button>
    </form>
  );
}
