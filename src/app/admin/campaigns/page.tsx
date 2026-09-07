import { DataGate } from "@/components/app/data-gate";
import { ReviewActions } from "@/components/admin/review-actions";
import { requireAdmin } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import { campaignStatusLabel } from "@/lib/api/types";

export default async function AdminCampaignsPage() {
  const { session, isAdmin, configured } = await requireAdmin();
  if (!configured) return <DataGate kind="unconfigured" />;
  if (!isAdmin) return <DataGate kind="forbidden" />;
  const token = session?.access_token;
  if (!token) return <DataGate kind="unauthorized" />;
  const result = await callWaitmint<{ campaigns?: Array<{ id: string; name?: string; status?: string }> }>(
    "/api/ads/admin/queue",
    { accessToken: token },
  );
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const campaigns = result.data.campaigns ?? [];
  return (
    <div>
      <h1 className="font-display text-4xl">Campaign review</h1>
      {campaigns.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--wm-muted)]">No campaigns in the queue, or the API did not return a list.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="rounded-2xl border border-[var(--wm-line)] p-4">
              <p className="font-medium">{campaign.name || campaign.id}</p>
              <p className="text-xs text-[var(--wm-muted)]">{campaignStatusLabel(campaign.status || "pending_review")}</p>
              <ReviewActions id={campaign.id} kind="campaign" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
