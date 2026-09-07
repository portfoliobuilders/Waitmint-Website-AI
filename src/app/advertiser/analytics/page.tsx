import { ConsoleGate } from "@/components/app/console-gate";
import { StatCard } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";

type Analytics = {
  qualifiedImpressions?: number;
  verifiedAttentionSeconds?: number;
  averageVerifiedAttentionSeconds?: number;
  clicks?: number;
};

export default async function AnalyticsPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <ConsoleGate
        title="Analytics"
        body="Exchange measurements only. Sample impressions and invented CTR are never shown."
        kind="unconfigured"
      />
    );
  }
  const result = await callWaitmint<Analytics>("/api/ads/analytics", { accessToken: token });
  if (!result.ok) {
    return (
      <ConsoleGate
        title="Analytics"
        body="Exchange measurements only. Sample impressions and invented CTR are never shown."
        kind={result.kind === "error" ? "offline" : result.kind}
        message={result.message}
      />
    );
  }
  const data = result.data;
  return (
    <div>
      <h1 className="font-display text-4xl">Analytics</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">Exchange measurements only. No conversation targeting.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard label="Qualified impressions" value={data.qualifiedImpressions != null ? String(data.qualifiedImpressions) : "—"} />
        <StatCard label="Verified attention" value={data.verifiedAttentionSeconds != null ? `${data.verifiedAttentionSeconds}s` : "—"} />
        <StatCard label="Average verified wait" value={data.averageVerifiedAttentionSeconds != null ? `${data.averageVerifiedAttentionSeconds}s` : "—"} />
        <StatCard label="Clicks" value={data.clicks != null ? String(data.clicks) : "—"} />
      </div>
    </div>
  );
}
