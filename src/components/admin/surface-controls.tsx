"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Surface = {
  surfaceKey?: string;
  surface_key?: string;
  name?: string;
  servingEnabled?: boolean;
  serving_enabled?: boolean;
  verificationStatus?: string;
  verification_status?: string;
};

export function SurfaceControls({ surfaces }: { surfaces: Surface[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function togglePaid(enabled: boolean) {
    if (!confirm(`Turn paid inventory ${enabled ? "ON" : "OFF"}?`)) return;
    setBusy(true);
    await fetch("/api/waitmint/ads/admin/paid-inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
    setBusy(false);
    router.refresh();
  }

  async function toggleSurface(surfaceKey: string, servingEnabled: boolean) {
    setBusy(true);
    await fetch("/api/waitmint/ads/admin/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ surfaceKey, servingEnabled }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-2xl border border-[var(--wm-danger)]/30 p-5">
        <h2 className="text-lg font-medium">Paid Inventory</h2>
        <p className="mt-1 text-sm text-[var(--wm-muted)]">Global kill switch. Confirmation required.</p>
        <div className="mt-4 flex gap-3">
          <Button type="button" disabled={busy} onClick={() => togglePaid(true)}>
            ON
          </Button>
          <Button type="button" variant="danger" disabled={busy} onClick={() => togglePaid(false)}>
            OFF
          </Button>
        </div>
      </div>
      <ul className="space-y-2">
        {surfaces.map((surface) => {
          const key = String(surface.surfaceKey ?? surface.surface_key);
          const serving = Boolean(surface.servingEnabled ?? surface.serving_enabled);
          const verification = String(surface.verificationStatus ?? surface.verification_status ?? "");
          return (
            <li key={key} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--wm-line)] px-4 py-3 text-sm">
              <span>
                {surface.name || key}
                <span className="ml-2 text-[var(--wm-muted)]">{verification || (serving ? "Live Verified" : "Testing")}</span>
              </span>
              <Button
                type="button"
                variant="secondary"
                disabled={busy}
                onClick={() => toggleSurface(key, !serving)}
              >
                {serving ? "Disable serving" : "Enable serving"}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
