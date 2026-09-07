import { DataGate } from "@/components/app/data-gate";
import { SurfaceControls } from "@/components/admin/surface-controls";
import { getPublicInventory } from "@/lib/api/waitmint";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminSurfacesPage() {
  const { isAdmin, configured } = await requireAdmin();
  if (!configured) return <DataGate kind="unconfigured" />;
  if (!isAdmin) return <DataGate kind="forbidden" />;
  const inventory = await getPublicInventory();
  if (!inventory.ok) return <DataGate kind={inventory.kind === "error" ? "offline" : inventory.kind} message={inventory.message} />;
  return (
    <div>
      <h1 className="font-display text-4xl">Surfaces</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Toggles call Exchange `serving_enabled` and the global paid-inventory switch. Not frontend-only flags.
      </p>
      <SurfaceControls surfaces={inventory.data.inventory as never[]} />
    </div>
  );
}
