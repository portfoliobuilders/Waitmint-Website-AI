import Link from "next/link";
import { DataGate } from "@/components/app/data-gate";
import { Card, StatCard } from "@/components/ui/card";
import { requireMe } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { ExtensionLink, LedgerEntry, WalletPayload } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";
import { entryTypeLabel } from "@/lib/api/types";

export default async function DashboardPage() {
  const { session, meError } = await requireMe();
  const token = session?.access_token;
  if (!token || meError === "unconfigured") {
    return <DataGate kind="unconfigured" />;
  }

  const [wallet, earnings, extensions] = await Promise.all([
    callWaitmint<WalletPayload>("/api/v1/me/wallet", { accessToken: token }),
    callWaitmint<{ earnings?: LedgerEntry[]; entries?: LedgerEntry[] }>("/api/v1/me/earnings", { accessToken: token }),
    callWaitmint<{ installations?: ExtensionLink[]; links?: ExtensionLink[] }>("/api/v1/me/extensions", { accessToken: token }),
  ]);

  if (wallet.ok === false && wallet.kind === "offline") {
    return <DataGate kind="offline" message={wallet.message} />;
  }
  if (wallet.ok === false && wallet.kind === "unauthorized") {
    return <DataGate kind="unauthorized" />;
  }

  const w = wallet.ok ? wallet.data : null;
  const rows = earnings.ok ? (earnings.data.earnings ?? earnings.data.entries ?? []) : [];
  const links = extensions.ok ? (extensions.data.installations ?? extensions.data.links ?? []) : [];
  const connected = links.some((link) => !link.revokedAt);

  return (
    <div>
      <h1 className="font-display text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        Figures come from the WaitMint Exchange. Empty means no qualifying settlements yet.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Available" value={formatInrFromMicropaise(w?.availableMicropaise)} />
        <StatCard label="Lifetime earned" value={formatInrFromMicropaise(w?.lifetimeEarnedMicropaise)} />
        <StatCard
          label="Pending"
          value={w && w.pendingMicropaise > 0 ? formatInrFromMicropaise(w.pendingMicropaise) : "—"}
          hint="Only shown when the Exchange has real pending state."
        />
        <StatCard label="Withdrawn" value={formatInrFromMicropaise(w?.lifetimePaidMicropaise)} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-sm uppercase tracking-[0.14em] text-[var(--wm-muted)]">Extension</h2>
          <p className="mt-3 text-xl">{connected ? "Connected" : "Not connected"}</p>
          <Link href="/dashboard/extension" className="mt-4 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]">
            Manage connection
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
