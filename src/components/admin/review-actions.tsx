"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ReviewActions({
  id,
  kind,
}: {
  id: string;
  kind: "campaign" | "funding";
}) {
  const router = useRouter();
  const [notes, setNotes] = useState("");

  async function decide(decision: string) {
    const path =
      kind === "campaign"
        ? `/api/waitmint/ads/admin/campaigns/${id}/review`
        : `/api/waitmint/ads/admin/funding/${id}/resolve`;
    await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, notes }),
    });
    router.refresh();
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <input
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Notes"
        className="h-11 min-w-40 flex-1 rounded-xl border border-[var(--wm-line)] bg-black/30 px-3 text-sm"
      />
      <Button type="button" onClick={() => decide(kind === "campaign" ? "approve" : "confirmed")}>
        Approve
      </Button>
      <Button type="button" variant="secondary" onClick={() => decide(kind === "campaign" ? "request_changes" : "rejected")}>
        {kind === "campaign" ? "Request changes" : "Reject"}
      </Button>
      {kind === "campaign" ? (
        <Button type="button" variant="danger" onClick={() => decide("reject")}>
          Reject
        </Button>
      ) : null}
    </div>
  );
}
