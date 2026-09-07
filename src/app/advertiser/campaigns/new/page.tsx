import { CampaignWizard } from "@/components/advertiser/campaign-wizard";
import { ConsoleGate } from "@/components/app/console-gate";
import { getPublicInventory } from "@/lib/api/waitmint";
import { requireUser } from "@/lib/auth/guards";

export default async function NewCampaignPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <ConsoleGate
        title="New campaign"
        body="Campaign writes go to existing Exchange campaign tables. This form does not mint a local campaign."
        kind="unconfigured"
      />
    );
  }
  const inventory = await getPublicInventory();
  const surfaces = inventory.ok ? inventory.data.inventory : [];
  return (
    <div>
      <h1 className="font-display text-4xl">New campaign</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Writes to the existing Exchange campaign tables. Preview is not an impression and does not settle.
      </p>
      {!inventory.ok ? (
        <p className="mt-4 rounded-xl border border-[var(--wm-warn)]/30 p-4 text-sm text-[var(--wm-muted)]">
          Inventory catalog is unavailable. Only Exchange-verified surfaces can launch. ChatGPT is the
          documented live-verified surface until the catalog answers.
        </p>
      ) : null}
      <CampaignWizard surfaces={surfaces as never[]} />
    </div>
  );
}
