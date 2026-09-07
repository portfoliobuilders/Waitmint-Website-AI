import Link from "next/link";
import { DataGate } from "@/components/app/data-gate";
import { StatCard } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

type Dash = {
  billing?: { availableMicropaise?: number; lifetimeSpentMicropaise?: number };
  analytics?: {
    qualifiedImpressions?: number;
    verifiedAttentionSeconds?: number;
    averageVerifiedAttentionSeconds?: number;
  };
  campaigns?: unknown[];
};

export default async function AdvertiserHomePage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <div>
        <h1 className="font-display text-4xl">Buy verified AI attention.</h1>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          Spend and impressions are Exchange totals only. Sample campaign performance is never shown.
        </p>
        <div className="mt-8">
          <DataGate kind="unconfigured" />
        </div>
      </div>
    );
  }
  const me = await callWaitmint<{ onboarded?: boolean }>("/api/ads/me", { accessToken: token });
  if (me.ok && me.data.onboarded === false) {
    return (
      <DataGate
        kind="empty"
        emptyTitle="Create your advertiser company"
        emptyBody="Onboarding writes to the existing Exchange org tables — not a second advertiser database."
      >
        <Link href="/advertiser/onboarding" className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm text-[#04110c]">
          Start onboarding
        </Link>
      </DataGate>
    );
  }
  const result = await callWaitmint<Dash>("/api/ads/dashboard", { accessToken: token });
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const data = result.data;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Buy verified AI attention.</h1>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">Spend and impressions are Exchange totals only.</p>
        </div>
        <Link href="/advertiser/campaigns/new" className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm text-[#04110c]">
          New campaign
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Spend" value={formatInrFromMicropaise(data.billing?.lifetimeSpentMicropaise)} />
        <StatCard label="Remaining funded balance" value={formatInrFromMicropaise(data.billing?.availableMicropaise)} />
        <StatCard label="Verified impressions" value={data.analytics?.qualifiedImpressions != null ? String(data.analytics.qualifiedImpressions) : "—"} />
        <StatCard
          label="Verified attention"
          value={data.analytics?.verifiedAttentionSeconds != null ? `${data.analytics.verifiedAttentionSeconds}s` : "—"}
        />
      </div>
    </div>
  );
}
