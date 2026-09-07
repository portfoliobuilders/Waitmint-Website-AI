import { DataGate } from "@/components/app/data-gate";
import { PayoutForm } from "@/components/dashboard/payout-form";
import { StatCard } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { Redemption, WalletPayload } from "@/lib/api/types";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

export default async function PayoutsPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) return <DataGate kind="unconfigured" />;
  const [wallet, redemptions] = await Promise.all([
    callWaitmint<WalletPayload>("/api/v1/me/wallet", { accessToken: token }),
    callWaitmint<{ redemptions?: Redemption[] }>("/api/v1/me/redemptions", { accessToken: token }),
  ]);
  if (!wallet.ok) return <DataGate kind={wallet.kind === "error" ? "offline" : wallet.kind} message={wallet.message} />;
  const rows = redemptions.ok ? (redemptions.data.redemptions ?? []) : [];

  return (
    <div>
      <h1 className="font-display text-4xl">Payouts</h1>
      <p className="mt-3 max-w-2xl rounded-xl border border-[var(--wm-warn)]/30 bg-[var(--wm-warn)]/5 p-4 text-sm">
        Pilot Payout. Payout requests are manually reviewed during the private pilot. Automated UPI or bank
        payouts are not claimed here.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard label="Available" value={formatInrFromMicropaise(wallet.data.availableMicropaise)} />
        <StatCard label="Minimum redemption" value="₹100" hint="Enforced by the Exchange." />
      </div>
      <PayoutForm />
      <h2 className="mt-10 text-lg font-medium">History</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--wm-muted)]">No payout requests yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--wm-line)]">
          {rows.map((row) => (
            <li key={row.id} className="flex justify-between gap-4 py-3 text-sm">
              <span>
                {row.status} · {row.method}
              </span>
              <span className="font-mono">{formatInrFromMicropaise(row.amountMicropaise)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
