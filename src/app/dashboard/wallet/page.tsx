import { DataGate } from "@/components/app/data-gate";
import { Card, StatCard } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { LedgerEntry, WalletPayload } from "@/lib/api/types";
import { entryTypeLabel } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function WalletPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) return <DataGate kind="unconfigured" />;

  const [wallet, ledger] = await Promise.all([
    callWaitmint<WalletPayload>("/api/v1/me/wallet", { accessToken: token }),
    callWaitmint<{ entries?: LedgerEntry[]; ledger?: LedgerEntry[] }>("/api/v1/me/ledger", { accessToken: token }),
  ]);

  if (!wallet.ok) return <DataGate kind={wallet.kind === "error" ? "offline" : wallet.kind} message={wallet.message} />;
  const rows = ledger.ok ? (ledger.data.entries ?? ledger.data.ledger ?? []) : [];

  return (
    <div>
      <h1 className="font-display text-4xl">Wallet</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        This is the Exchange wallet. The website does not keep a second balance.
      </p>
      <div className="mt-8">
        <Card className="wm-glow">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">Available balance</p>
          <p className="font-display mt-3 text-5xl">{formatInrFromMicropaise(wallet.data.availableMicropaise)}</p>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Lifetime earned" value={formatInrFromMicropaise(wallet.data.lifetimeEarnedMicropaise)} />
        <StatCard
          label="This month"
          value="—"
          hint="Shown only when the Exchange returns a period total."
        />
        <StatCard label="Verified waits" value="—" hint="Count appears when the API provides it." />
      </div>
      <h2 className="mt-10 text-lg font-medium">Transactions</h2>
      {rows.length === 0 ? (
        <DataGate kind="empty" emptyTitle="You're connected. Qualifying advertiser-funded waits will appear here." emptyBody="Qualifying settlements will appear as integer micropaise credits." />
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-[var(--wm-muted)]">
              <tr>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--wm-line)]">
                  <td className="py-3 pr-4">{new Date(row.createdAt).toLocaleString()}</td>
                  <td className="py-3 pr-4">{entryTypeLabel(row.entryType)}</td>
                  <td className="py-3 pr-4 font-mono">{formatInrFromMicropaise(row.amountMicropaise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
