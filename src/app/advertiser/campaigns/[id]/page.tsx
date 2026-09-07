import { DataGate } from "@/components/app/data-gate";
import { CampaignActions } from "@/components/advertiser/campaign-actions";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import { campaignStatusLabel, reviewStatusLabel } from "@/lib/api/types";
import { formatCpmFromMicropaise, formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) return <DataGate kind="unconfigured" />;
  const result = await callWaitmint<{ campaign?: Record<string, unknown> }>(`/api/ads/campaigns/${id}`, {
    accessToken: token,
  });
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const campaign = (result.data.campaign ?? result.data) as Record<string, unknown>;
  const status = String(campaign.status ?? "draft");

  return (
    <div>
      <h1 className="font-display text-4xl">{String(campaign.name ?? "Campaign")}</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        {campaignStatusLabel(status)}
        {reviewStatusLabel(campaign.reviewStatus as string ?? campaign.review_status as string) ? ` · ${reviewStatusLabel(campaign.reviewStatus as string ?? campaign.review_status as string)}` : ""}
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
        <div>
          <dt className="text-[var(--wm-muted)]">CPM</dt>
          <dd className="mt-1">{formatCpmFromMicropaise((campaign.cpmMicropaise ?? campaign.cpm_micropaise) as number)}</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Budget</dt>
          <dd className="mt-1">{formatInrFromMicropaise((campaign.totalBudgetMicropaise ?? campaign.total_budget_micropaise) as number)}</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Spent</dt>
          <dd className="mt-1">{formatInrFromMicropaise((campaign.spentMicropaise ?? campaign.spent_micropaise) as number)}</dd>
        </div>
      </dl>
      <CampaignActions id={id} status={status} />
    </div>
  );
}
