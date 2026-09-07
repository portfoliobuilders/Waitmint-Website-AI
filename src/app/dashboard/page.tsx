import Link from "next/link";
import { UnconfiguredAccount } from "@/components/app/connection-board";
import { DataGate } from "@/components/app/data-gate";
import { WalletHero } from "@/components/app/wallet-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireMe } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { ExtensionLink, LedgerEntry, WalletPayload } from "@/lib/api/types";
import { entryTypeLabel, linkedExtensionsFromPayload } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function DashboardPage() {
  const { session, meError } = await requireMe();
  const token = session?.access_token;
  if (!token || meError === "unconfigured") {
    return (
      <div>
        <h1 className="font-display text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          One identity. One Exchange wallet. Extension, SDK, and App never keep a second balance.
        </p>
        <div className="mt-8">
          <WalletHero available={null} lifetime={null} pending={null} withdrawn={null} live={false} />
        </div>
        <div className="mt-8">
          <UnconfiguredAccount />
        </div>
      </div>
    );
  }

  const [wallet, earnings, extensions] = await Promise.all([
    callWaitmint<WalletPayload>("/api/v1/me/wallet", { accessToken: token }),
    callWaitmint<{ earnings?: LedgerEntry[]; entries?: LedgerEntry[] }>("/api/v1/me/earnings", { accessToken: token }),
    callWaitmint<{
      extensions?: ExtensionLink[];
      installations?: ExtensionLink[];
      links?: ExtensionLink[];
    }>("/api/v1/me/extensions", { accessToken: token }),
  ]);

  if (wallet.ok === false && wallet.kind === "offline") {
    return <DataGate kind="offline" message={wallet.message} />;
  }
  if (wallet.ok === false && wallet.kind === "unauthorized") {
    return <DataGate kind="unauthorized" />;
  }

  const w = wallet.ok ? wallet.data : null;
  const rows = earnings.ok ? (earnings.data.earnings ?? earnings.data.entries ?? []) : [];
  const links = extensions.ok ? linkedExtensionsFromPayload(extensions.data) : [];
  const connected = links.some((link) => !link.revokedAt);
  const hasEarnings = (w?.lifetimeEarnedMicropaise ?? 0) > 0 || rows.length > 0;

  return (
    <div>
      <h1 className="font-display text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Figures come from the WaitMint Exchange. Empty means no qualifying settlements yet.
      </p>
      {!connected ? (
        <div className="mt-8 rounded-2xl border border-[var(--wm-mint)]/30 bg-[var(--wm-mint-dim)] p-6">
          <h2 className="text-xl font-medium">Connect a WaitMint client</h2>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">
            Link the Chrome extension so qualifying waits settle to this account. SDK and App will
            use the same identity when they open.
          </p>
          <Link href="/dashboard/connections" className="mt-5 inline-flex">
            <Button type="button">Open connections</Button>
          </Link>
        </div>
      ) : null}
      {connected && !hasEarnings ? (
        <div className="mt-8">
          <DataGate
            kind="empty"
            emptyTitle="You're connected. Qualifying advertiser-funded waits will appear here."
            emptyBody="Use a supported AI product with Sponsored Waits on. No qualification. No charge. No earning."
          />
        </div>
      ) : null}
      <div className="mt-8">
        <WalletHero
          available={w?.availableMicropaise ?? null}
          lifetime={w?.lifetimeEarnedMicropaise ?? null}
          pending={w?.pendingMicropaise ?? null}
          withdrawn={w?.lifetimePaidMicropaise ?? null}
          live={Boolean(w)}
        />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm uppercase tracking-[0.14em] text-[var(--wm-muted)]">Connections</h2>
          <p className="mt-3 text-xl">{connected ? "Extension connected" : "No live client yet"}</p>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">
            Chrome is the live client. SDK and App share this identity when they open.
          </p>
          <Link href="/dashboard/connections" className="mt-4 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]">
            Manage Extension, SDK, and App
          </Link>
        </Card>
        <Card>
          <h2 className="text-sm uppercase tracking-[0.14em] text-[var(--wm-muted)]">Recent earnings</h2>
          {rows.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--wm-muted)]">No settled earnings yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {rows.slice(0, 5).map((row) => (
                <li key={row.id} className="flex justify-between gap-4">
                  <span>{entryTypeLabel(row.entryType)}</span>
                  <span className="font-mono">{formatInrFromMicropaise(row.amountMicropaise)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
