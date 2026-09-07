import { DataGate } from "@/components/app/data-gate";
import { StatCard } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";

export default async function AdminHomePage() {
  const { session, isAdmin, configured } = await requireAdmin();
  if (!configured) return <DataGate kind="unconfigured" />;
  if (!isAdmin) return <DataGate kind="forbidden" />;
  const token = session?.access_token;
  if (!token) return <DataGate kind="unauthorized" />;
  const result = await callWaitmint<Record<string, unknown>>("/api/ads/admin/queue", { accessToken: token });
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const data = result.data;
  const campaigns = Array.isArray(data.campaigns) ? data.campaigns.length : (data.pendingCampaigns as number | undefined);
  const funding = Array.isArray(data.fundingRequests) ? data.fundingRequests.length : undefined;

  return (
    <div>
      <h1 className="font-display text-4xl">Admin overview</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Server-authorized via Exchange profile role. Cards show only values the API returns.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Pending campaigns" value={campaigns != null ? String(campaigns) : "—"} />
        <StatCard label="Pending funding reviews" value={funding != null ? String(funding) : "—"} />
        <StatCard label="Paid inventory" value={typeof data.paidInventoryEnabled === "boolean" ? (data.paidInventoryEnabled ? "ON" : "OFF") : "—"} />
      </div>
    </div>
  );
}
