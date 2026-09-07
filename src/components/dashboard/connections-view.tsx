import { DataGate } from "@/components/app/data-gate";
import { ConnectionBoard, UnconfiguredAccount } from "@/components/app/connection-board";
import { LinkTokenPanel } from "@/components/dashboard/link-token-panel";
import { RevokeButton } from "@/components/dashboard/revoke-button";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint, getPublicInventory } from "@/lib/api/waitmint";
import type { ExtensionLink } from "@/lib/api/types";
import { linkedExtensionsFromPayload } from "@/lib/api/types";
import { chromeExtensionUrl } from "@/lib/config";
import { productById } from "@/lib/content/products";
import Link from "next/link";

export async function ConnectionsView() {
  const { session, configured } = await requireUser();
  const token = session?.access_token;
  if (!configured || !token) {
    return (
      <div>
        <ConnectionsIntro />
        <div className="mt-8">
          <UnconfiguredAccount title="Link clients after the Exchange is hosted." />
        </div>
      </div>
    );
  }

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
    return (
      <div>
        <ConnectionsIntro />
        <div className="mt-8">
          <DataGate kind={links.kind} message={links.message} />
        </div>
        <div className="mt-8">
          <ConnectionBoard />
        </div>
      </div>
    );
  }
  const rows = links.ok ? linkedExtensionsFromPayload(links.data) : [];
  const surfaces = inventory.ok ? inventory.data.inventory : [];
  const sdk = productById("sdk");
  const app = productById("app");

  return (
    <div>
      <ConnectionsIntro />
      <div className="mt-8">
        <ConnectionBoard highlight="extension" />
      </div>

      <section id="extension" className="scroll-mt-28 mt-12">
        <h2 className="font-display text-3xl">{productById("extension").name}</h2>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          Connecting maps the install ID to this account. The extension stays a WaitMint client. Old
          UUIDs are preserved.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={chromeExtensionUrl()}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Add WaitMint to Chrome
          </a>
          <Link
            href="/products#extension"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
          >
            How linking works
          </Link>
        </div>
        <div className="mt-8">
          <LinkTokenPanel />
        </div>
        <h3 className="mt-10 text-lg font-medium">Connected installations</h3>
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
        <h3 className="mt-10 text-lg font-medium">Supported AI platforms</h3>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          Sponsored waits can be toggled in the extension popup. Serving state is controlled by the Exchange.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {surfaces.length === 0 ? (
            <li className="text-[var(--wm-muted)]">
              Inventory catalog unavailable. ChatGPT is the documented live-verified surface.
            </li>
          ) : (
            surfaces.map((surface) => (
              <li
                key={String(surface.surfaceKey ?? surface.surface_key)}
                className="flex justify-between border-b border-[var(--wm-line)] py-2"
              >
                <span>{String(surface.name ?? surface.surfaceKey)}</span>
                <span className="text-[var(--wm-muted)]">
                  {String(surface.verificationStatus ?? surface.verification_status)}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      <section id="sdk" className="scroll-mt-28 mt-12 rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-aqua)]">{sdk.statusLabel}</p>
        <h2 className="font-display mt-2 text-3xl">{sdk.name}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">{sdk.body}</p>
        <Link
          href="/products#sdk"
          className="mt-6 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]"
        >
          How the SDK will attach
        </Link>
      </section>

      <section id="app" className="scroll-mt-28 mt-6 rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-aqua)]">{app.statusLabel}</p>
        <h2 className="font-display mt-2 text-3xl">{app.name}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">{app.body}</p>
        <Link
          href="/products#app"
          className="mt-6 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]"
        >
          How the companion app will work
        </Link>
      </section>
    </div>
  );
}

function ConnectionsIntro() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Clients</p>
      <h1 className="font-display mt-3 text-4xl">Connections</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
        One WaitMint identity across Extension, SDK, and App. Only the Chrome extension can link an
        install today. SDK and App will attach to this same account — they will not create extra wallets.
      </p>
    </div>
  );
}
