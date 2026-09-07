import { DataGate } from "@/components/app/data-gate";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { LedgerEntry } from "@/lib/api/types";
import { entryTypeLabel } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function ActivityPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) return <DataGate kind="unconfigured" />;
  const result = await callWaitmint<{ entries?: LedgerEntry[]; ledger?: LedgerEntry[] }>(
    "/api/v1/me/ledger",
    { accessToken: token },
  );
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const rows = result.data.entries ?? result.data.ledger ?? [];
  return (
    <div>
      <h1 className="font-display text-4xl">Activity</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">Ledger activity from the Exchange, including linked installs.</p>
      {rows.length === 0 ? (
        <div className="mt-8">
          <DataGate kind="empty" />
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--wm-line)]">
          {rows.map((row) => (
            <li key={row.id} className="py-4">
              <p className="font-medium">{entryTypeLabel(row.entryType)}</p>
              <p className="mt-1 text-sm text-[var(--wm-muted)]">
                {new Date(row.createdAt).toLocaleString()} · {formatInrFromMicropaise(row.amountMicropaise)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
