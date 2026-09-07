import { UnconfiguredAccount } from "@/components/app/connection-board";
import { DataGate } from "@/components/app/data-gate";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { LedgerEntry } from "@/lib/api/types";
import { entryTypeLabel } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function EarningsPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <div>
        <h1 className="font-display text-4xl">Earnings</h1>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          Settled user share from qualifying waits. Empty until the Exchange records one.
        </p>
        <div className="mt-8">
          <UnconfiguredAccount />
        </div>
      </div>
    );
  }
  const result = await callWaitmint<{ earnings?: LedgerEntry[]; entries?: LedgerEntry[] }>(
    "/api/v1/me/earnings",
    { accessToken: token },
  );
  if (!result.ok) {
    if (result.kind === "unconfigured") {
      return (
        <div>
          <h1 className="font-display text-4xl">Earnings</h1>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">
            Settled user share from qualifying waits. Empty until the Exchange records one.
          </p>
          <div className="mt-8">
            <UnconfiguredAccount />
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1 className="font-display text-4xl">Earnings</h1>
        <div className="mt-8">
          <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />
        </div>
      </div>
    );
  }
  const rows = result.data.earnings ?? result.data.entries ?? [];
  if (rows.length === 0) {
    return (
      <div>
        <h1 className="font-display text-4xl">Earnings</h1>
        <div className="mt-8">
          <DataGate kind="empty" emptyTitle="You're connected. Qualifying advertiser-funded waits will appear here." emptyBody="Use a supported AI product with a connected WaitMint client. No qualification means no earning." />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-display text-4xl">Earnings</h1>
      <ul className="mt-8 divide-y divide-[var(--wm-line)]">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p>{entryTypeLabel(row.entryType)}</p>
              <p className="text-xs text-[var(--wm-muted)]">{row.platform || "—"} · {new Date(row.createdAt).toLocaleString()}</p>
            </div>
            <p className="font-mono">{formatInrFromMicropaise(row.amountMicropaise)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
