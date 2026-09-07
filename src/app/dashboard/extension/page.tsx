import { DataGate } from "@/components/app/data-gate";
import { LinkTokenPanel } from "@/components/dashboard/link-token-panel";
import { RevokeButton } from "@/components/dashboard/revoke-button";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint, getPublicInventory } from "@/lib/api/waitmint";
import type { ExtensionLink } from "@/lib/api/types";
import { linkedExtensionsFromPayload } from "@/lib/api/types";

export default async function ExtensionPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) return <DataGate kind="unconfigured" />;
  const [links, inventory] = await Promise.all([
    callWaitmint<{
      extensions?: ExtensionLink[];
      installations?: ExtensionLink[];
      links?: ExtensionLink[];
    }>("/api/v1/me/extensions", {
      accessToken: token,
    }),
    getPublicInventory(),
  ]);
  if (!links.ok && (links.kind === "unconfigured" || links.kind === "offline" || links.kind === "unauthorized")) {
    return <DataGate kind={links.kind} message={links.message} />;
  }
  const rows = links.ok ? linkedExtensionsFromPayload(links.data) : [];
  const surfaces = inventory.ok ? inventory.data.inventory : [];

  return (
    <div>
      <h1 className="font-display text-4xl">Extension</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        The Chrome extension stays a WaitMint client. Connecting maps its install ID to this account. Old
        UUIDs are preserved.
      </p>
      <div className="mt-8">
        <LinkTokenPanel />
      </div>
      <h2 className="mt-10 text-lg font-medium">Connected installations</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--wm-muted)]">No browsers linked yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-[var(--wm-line)] p-4 text-sm">
              <p className="font-mono text-xs">{row.extensionInstallId.slice(0, 8)}…</p>
              <p className="mt-2 text-[var(--wm-muted)]">
                Linked {new Date(row.linkedAt).toLocaleString()}
                {row.lastSeenAt ? ` · Last seen ${new Date(row.lastSeenAt).toLocaleString()}` : ""}
                {row.extensionVersion ? ` · v${row.extensionVersion}` : ""}
                {row.revokedAt ? " · Revoked" : ""}
              </p>
              {!row.revokedAt ? <RevokeButton id={row.installationId || row.id} /> : null}
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-10 text-lg font-medium">Supported AI platforms</h2>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Sponsored waits can be toggled in the extension popup. Serving state is controlled by the Exchange.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {surfaces.length === 0 ? (
          <li className="text-[var(--wm-muted)]">Inventory catalog unavailable. ChatGPT is the documented live-verified surface.</li>
        ) : (
          surfaces.map((surface) => (
            <li key={String(surface.surfaceKey ?? surface.surface_key)} className="flex justify-between border-b border-[var(--wm-line)] py-2">
              <span>{String(surface.name ?? surface.surfaceKey)}</span>
              <span className="text-[var(--wm-muted)]">{String(surface.verificationStatus ?? surface.verification_status)}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
