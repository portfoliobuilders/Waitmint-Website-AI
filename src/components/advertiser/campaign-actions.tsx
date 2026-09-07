"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CampaignActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function post(path: string) {
    const res = await fetch(`/api/waitmint/ads/campaigns/${id}/${path}`, { method: "POST" });
    const json = (await res.json().catch(() => ({}))) as { message?: string };
    if (!res.ok) {
      setError(json.message || "Action failed.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {status === "draft" || status === "rejected" ? (
        <Button type="button" onClick={() => post("submit")}>
          Submit for review
        </Button>
      ) : null}
      {status === "active" ? (
        <Button type="button" variant="secondary" onClick={() => post("pause")}>
          Pause
        </Button>
      ) : null}
      {status === "paused" ? (
        <Button type="button" onClick={() => post("resume")}>
          Resume
        </Button>
      ) : null}
      {error ? <p className="w-full text-sm text-[var(--wm-danger)]">{error}</p> : null}
    </div>
  );
}
