import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { DataGate } from "@/components/app/data-gate";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import { campaignStatusLabel, reviewStatusLabel } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

type CampaignRow = {
  id: string;
  name?: string;
  status?: string;
  review_status?: string | null;
  reviewStatus?: string | null;
  spent_micropaise?: number;
  spentMicropaise?: number;
  total_budget_micropaise?: number;
  totalBudgetMicropaise?: number;
};

export default async function CampaignsPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <ConsoleGate
        title="Campaigns"
        body="Campaign drafts, review, and spend live on the Exchange. This website does not keep a second campaign table."
        kind="unconfigured"
      />
    );
  }
  const result = await callWaitmint<{ campaigns?: CampaignRow[] }>("/api/ads/campaigns", { accessToken: token });
  if (!result.ok) {
    return (
      <ConsoleGate
        title="Campaigns"
        body="Campaign drafts, review, and spend live on the Exchange. This website does not keep a second campaign table."
        kind={result.kind === "error" ? "offline" : result.kind}
        message={result.message}
      />
    );
  }
  const campaigns = result.data.campaigns ?? [];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-4xl">Campaigns</h1>
        <Link href="/advertiser/campaigns/new" className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm text-[#04110c]">
          New
        </Link>
      </div>
      {campaigns.length === 0 ? (
        <div className="mt-8">
          <DataGate kind="empty" emptyTitle="No campaigns" emptyBody="Create a draft. It stays on the Exchange until review." />
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--wm-line)]">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="py-4">
              <Link href={`/advertiser/campaigns/${campaign.id}`} className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{campaign.name || "Untitled"}</p>
                  <p className="text-xs text-[var(--wm-muted)]">
                    {campaignStatusLabel(campaign.status || "draft")}
                    {reviewStatusLabel(campaign.reviewStatus ?? campaign.review_status)
                      ? ` · ${reviewStatusLabel(campaign.reviewStatus ?? campaign.review_status)}`
                      : ""}
                  </p>
                </div>
                <p className="font-mono text-sm">
                  {formatInrFromMicropaise(campaign.spentMicropaise ?? campaign.spent_micropaise)} /{" "}
                  {formatInrFromMicropaise(campaign.totalBudgetMicropaise ?? campaign.total_budget_micropaise)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
