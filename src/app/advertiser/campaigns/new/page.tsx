import { CampaignWizard } from "@/components/advertiser/campaign-wizard";
import { getPublicInventory } from "@/lib/api/waitmint";

export default async function NewCampaignPage() {
  const inventory = await getPublicInventory();
  const surfaces = inventory.ok ? inventory.data.inventory : [];
  return (
    <div>
      <h1 className="font-display text-4xl">New campaign</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">Writes to the existing Exchange campaign tables.</p>
      <CampaignWizard surfaces={surfaces as never[]} />
    </div>
  );
}
