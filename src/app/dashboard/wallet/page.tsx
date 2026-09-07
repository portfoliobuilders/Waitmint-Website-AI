import { UnconfiguredAccount } from "@/components/app/connection-board";
import { DataGate } from "@/components/app/data-gate";
import { WalletHero } from "@/components/app/wallet-hero";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { LedgerEntry, WalletPayload } from "@/lib/api/types";
import { entryTypeLabel } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function WalletPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <div>
        <h1 className="font-display text-4xl">Wallet</h1>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          One Exchange wallet. Extension, SDK, and App never keep a second balance.
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

  const [wallet, ledger] = await Promise.all([
    callWaitmint<WalletPayload>("/api/v1/me/wallet", { accessToken: token }),
    callWaitmint<{ entries?: LedgerEntry[]; ledger?: LedgerEntry[] }>("/api/v1/me/ledger", { accessToken: token }),
  ]);

  if (!wallet.ok) {
    return (
      <div>
        <h1 className="font-display text-4xl">Wallet</h1>
        <div className="mt-8">
          <WalletHero available={null} lifetime={null} pending={null} withdrawn={null} live={false} />
        </div>
        <div className="mt-8">
          {wallet.kind === "unconfigured" ? (
            <UnconfiguredAccount />
          ) : (
            <DataGate kind={wallet.kind === "error" ? "offline" : wallet.kind} message={wallet.message} />
          )}
        </div>
      </div>
    );
  }
  const rows = ledger.ok ? (ledger.data.entries ?? ledger.data.ledger ?? []) : [];

  return (
    <div>
      <h1 className="font-display text-4xl">Wallet</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        This is the Exchange wallet. The website does not keep a second balance.
      </p>
      <div className="mt-8">
        <WalletHero
          available={wallet.data.availableMicropaise}
          lifetime={wallet.data.lifetimeEarnedMicropaise}
          pending={wallet.data.pendingMicropaise}
          withdrawn={wallet.data.lifetimePaidMicropaise}
          live
        />
      </div>
      <h2 className="mt-10 text-lg font-medium">Transactions</h2>
      {rows.length === 0 ? (
        <DataGate
          kind="empty"
          emptyTitle="You're connected. Qualifying advertiser-funded waits will appear here."
          emptyBody="Qualifying settlements will appear as integer micropaise credits."
        />
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
