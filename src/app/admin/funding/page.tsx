import { DataGate } from "@/components/app/data-gate";
import { ReviewActions } from "@/components/admin/review-actions";
import { requireAdmin } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function AdminFundingPage() {
  const { session, isAdmin, configured } = await requireAdmin();
  if (!configured) return <DataGate kind="unconfigured" />;
  if (!isAdmin) return <DataGate kind="forbidden" />;
  const token = session?.access_token;
  if (!token) return <DataGate kind="unauthorized" />;
  const result = await callWaitmint<{
    fundingRequests?: Array<{ id: string; amountMicropaise?: number; amount_micropaise?: number; status?: string }>;
  }>("/api/ads/admin/queue", { accessToken: token });
  if (!result.ok) return <DataGate kind={result.kind === "error" ? "offline" : result.kind} message={result.message} />;
  const rows = result.data.fundingRequests ?? [];
  return (
    <div>
      <h1 className="font-display text-4xl">Funding</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">Manual pilot credits. Approval writes an Exchange funding_credit ledger row.</p>
      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--wm-muted)]">No pending funding requests returned.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-[var(--wm-line)] p-4">
              <p>{row.status} · {formatInrFromMicropaise(row.amountMicropaise ?? row.amount_micropaise)}</p>
              <ReviewActions id={row.id} kind="funding" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
