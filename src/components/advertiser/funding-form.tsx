"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FundingForm() {
  const router = useRouter();
  const [rupees, setRupees] = useState(10000);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/waitmint/ads/funding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountMicropaise: rupees * 100_000, notes }),
    });
    const json = (await res.json().catch(() => ({}))) as { message?: string };
    if (!res.ok) {
      setError(json.message || "Request failed.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-md space-y-3">
      <label className="block text-sm">
        Amount (whole rupees)
        <input
          type="number"
          min={1}
          value={rupees}
          onChange={(event) => setRupees(Number(event.target.value))}
          className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
        />
      </label>
      <label className="block text-sm">
        Notes
        <input
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
        />
      </label>
      {error ? <p className="text-sm text-[var(--wm-danger)]">{error}</p> : null}
      <Button type="submit">Request funding</Button>
    </form>
  );
}
