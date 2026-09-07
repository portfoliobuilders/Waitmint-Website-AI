"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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

export function CampaignWizard({ surfaces }: { surfaces: Surface[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [destinationUrl, setDestinationUrl] = useState("https://");
  const [brand, setBrand] = useState("");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [cta, setCta] = useState("Learn more");
  const [selected, setSelected] = useState<string[]>([]);
  const [cpmInr, setCpmInr] = useState(10);
  const [budgetInr, setBudgetInr] = useState(1000);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const catalog = useMemo(
    () =>
      surfaces.map((surface) => {
        const key = String(surface.surfaceKey ?? surface.surface_key ?? "");
        const serving = Boolean(surface.servingEnabled ?? surface.serving_enabled);
        const verification = String(surface.verificationStatus ?? surface.verification_status ?? "");
        return { key, name: surface.name || key, serving, verification };
      }),
    [surfaces],
  );

  async function submit() {
    setPending(true);
    setError(null);
    const res = await fetch("/api/waitmint/ads/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${brand} · ${headline}`.slice(0, 80),
        destinationUrl,
        advertiserName: brand,
        headline,
        description: body,
        ctaLabel: cta,
        ctaUrl: destinationUrl,
        surfaces: selected,
        targetingMode: "specific",
        cpmMicropaise: cpmInr * 100_000,
        totalBudgetMicropaise: budgetInr * 100_000,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { message?: string; data?: { id?: string; campaign?: { id?: string } } };
    setPending(false);
    if (!res.ok) {
      setError(json.message || "Could not create campaign.");
      return;
    }
    const id = json.data?.id || json.data?.campaign?.id;
    router.push(id ? `/advertiser/campaigns/${id}` : "/advertiser/campaigns");
  }

  return (
    <div className="mt-8 max-w-xl space-y-6">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">Step {step} of 6</p>
      {step === 1 ? (
        <label className="block text-sm">
          Destination URL
          <input className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} />
        </label>
      ) : null}
      {step === 2 ? (
        <div className="space-y-3">
          <input className="h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <input className="h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" placeholder="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          <input className="h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" placeholder="Optional body" value={body} onChange={(e) => setBody(e.target.value)} />
          <input className="h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" placeholder="CTA" value={cta} onChange={(e) => setCta(e.target.value)} />
        </div>
      ) : null}
      {step === 3 ? (
        <ul className="space-y-2">
          {catalog.map((surface) => {
            const live = surface.serving && surface.verification === "live_verified";
            return (
              <li key={surface.key}>
                <label className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[var(--wm-line)] px-3 text-sm">
                  <span>
                    <input
                      type="checkbox"
                      className="mr-3"
                      disabled={!live}
                      checked={selected.includes(surface.key)}
                      onChange={(event) => {
                        setSelected((current) =>
                          event.target.checked
                            ? [...current, surface.key]
                            : current.filter((key) => key !== surface.key),
                        );
                      }}
                    />
                    {surface.name}
                  </span>
                  <span className="text-xs text-[var(--wm-muted)]">{live ? "Live Verified" : "Testing"}</span>
                </label>
              </li>
            );
          })}
          {catalog.length === 0 ? <li className="text-sm text-[var(--wm-muted)]">Inventory unavailable. Only Exchange-verified surfaces can launch.</li> : null}
        </ul>
      ) : null}
      {step === 4 ? (
        <div className="space-y-3">
          <label className="block text-sm">CPM (whole rupees)
            <input type="number" min={10} className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" value={cpmInr} onChange={(e) => setCpmInr(Number(e.target.value))} />
          </label>
          <label className="block text-sm">Total budget (whole rupees)
            <input type="number" min={10} className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3" value={budgetInr} onChange={(e) => setBudgetInr(Number(e.target.value))} />
          </label>
        </div>
      ) : null}
      {step === 5 ? (
        <div className="rounded-2xl border border-[var(--wm-line)] bg-[#0a0c11] p-5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--wm-mint)]">Sponsored · Preview</p>
          <p className="mt-3 text-lg">{headline || "Headline"}</p>
          <p className="mt-1 text-sm text-[var(--wm-muted)]">{body || "Optional body"}</p>
          <p className="mt-4 text-sm">{cta} → {destinationUrl}</p>
        </div>
      ) : null}
      {step === 6 ? (
        <p className="text-sm text-[var(--wm-muted)]">
          Submit creates an Exchange draft. Review happens on the existing campaign states — not a website-only status.
        </p>
      ) : null}
      {error ? <p className="text-sm text-[var(--wm-danger)]">{error}</p> : null}
      <div className="flex gap-3">
        {step > 1 ? (
          <Button type="button" variant="secondary" onClick={() => setStep((n) => n - 1)}>
            Back
          </Button>
        ) : null}
        {step < 6 ? (
          <Button type="button" onClick={() => setStep((n) => n + 1)}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={submit} disabled={pending}>
            Create draft
          </Button>
        )}
      </div>
    </div>
  );
}
