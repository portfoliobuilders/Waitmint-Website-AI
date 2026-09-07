import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { DataGate } from "@/components/app/data-gate";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";

type CampaignRow = {
  id: string;
  name?: string;
  headline?: string;
  status?: string;
  advertiserName?: string;
  advertiser_name?: string;
};

export default async function CreativesPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <ConsoleGate
        title="Creatives"
        body="Creatives live on Exchange campaigns. This page does not store a parallel creative library."
        kind="unconfigured"
      />
    );
  }

  const result = await callWaitmint<{ campaigns?: CampaignRow[] }>("/api/ads/campaigns", {
    accessToken: token,
  });
  if (!result.ok) {
    return (
      <ConsoleGate
        title="Creatives"
        body="Creatives live on Exchange campaigns. This page does not store a parallel creative library."
        kind={result.kind === "error" ? "offline" : result.kind}
        message={result.message}
      />
    );
  }

  const campaigns = result.data.campaigns ?? [];
  return (
    <div>
      <h1 className="font-display text-4xl">Creatives</h1>
      <p className="mt-3 max-w-xl text-sm text-[var(--wm-muted)]">
        Edit copy from a campaign. WaitMint does not keep a second creative database on this website.
      </p>
      {campaigns.length === 0 ? (
        <div className="mt-8">
          <DataGate
            kind="empty"
            emptyTitle="No campaign creatives yet"
            emptyBody="Create a draft campaign. The headline and body you submit become the labelled sponsored wait."
          >
            <Link
              href="/advertiser/campaigns/new"
              className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm text-[#04110c]"
            >
              New campaign
            </Link>
          </DataGate>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--wm-line)]">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="py-4">
              <Link href={`/advertiser/campaigns/${campaign.id}`} className="block">
                <p className="font-medium">{campaign.headline || campaign.name || "Untitled creative"}</p>
                <p className="mt-1 text-sm text-[var(--wm-muted)]">
                  {campaign.advertiserName || campaign.advertiser_name || campaign.name || "Campaign"}
                  {campaign.status ? ` · ${campaign.status}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
