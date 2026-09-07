import { DataGate } from "@/components/app/data-gate";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { LedgerEntry } from "@/lib/api/types";
import { entryTypeLabel } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function EarningsPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) return <DataGate kind="unconfigured" />;
  const result = await callWaitmint<{ earnings?: LedgerEntry[]; entries?: LedgerEntry[] }>(
    "/api/v1/me/earnings",
    { accessToken: token },
  );
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const rows = result.data.earnings ?? result.data.entries ?? [];
  if (rows.length === 0) {
    return (
      <div>
        <h1 className="font-display text-4xl">Earnings</h1>
        <div className="mt-8">
          <DataGate kind="empty" emptyTitle="No earnings yet" emptyBody="Use a supported AI product with the extension connected. No qualification means no earning." />
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
