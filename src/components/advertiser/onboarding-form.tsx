"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OnboardingForm() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    const res = await fetch("/api/waitmint/ads/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName }),
    });
    const json = (await res.json().catch(() => ({}))) as { message?: string };
    setPending(false);
    if (!res.ok) {
      setError(json.message || "Could not create company.");
      return;
    }
    router.replace("/advertiser");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-4">
      <label className="block text-sm">
        Company name
        <input
          required
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
        />
      </label>
      {error ? <p className="text-sm text-[var(--wm-danger)]">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        Create advertiser account
      </Button>
    </form>
  );
}
