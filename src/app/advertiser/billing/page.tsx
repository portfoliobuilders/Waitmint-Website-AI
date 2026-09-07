import { ConsoleGate } from "@/components/app/console-gate";
import { FundingForm } from "@/components/advertiser/funding-form";
import { StatCard } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import { formatInrFromMicropaise } from "@/lib/money/micropaise";

type Billing = {
  availableMicropaise?: number;
  lifetimeFundedMicropaise?: number;
  lifetimeSpentMicropaise?: number;
  fundingRequests?: Array<{ id: string; status: string; amountMicropaise?: number; amount_micropaise?: number }>;
};

export default async function BillingPage() {
  const { session } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <ConsoleGate
        title="Billing"
        body="Private Pilot Funding is manual admin credit on the Exchange. There is no live payment gateway on this website."
        kind="unconfigured"
      />
    );
  }
  const result = await callWaitmint<Billing>("/api/ads/billing", { accessToken: token });
  if (!result.ok) {
    return (
      <ConsoleGate
        title="Billing"
        body="Private Pilot Funding is manual admin credit on the Exchange. There is no live payment gateway on this website."
        kind={result.kind === "error" ? "offline" : result.kind}
        message={result.message}
      />
    );
  }
  const data = result.data;

  return (
    <div>
      <h1 className="font-display text-4xl">Billing</h1>
      <p className="mt-3 rounded-xl border border-[var(--wm-warn)]/30 p-4 text-sm">
        Private Pilot Funding. Request a deposit. An admin credits the Exchange wallet. There is no live payment gateway.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Available" value={formatInrFromMicropaise(data.availableMicropaise)} />
        <StatCard label="Lifetime funded" value={formatInrFromMicropaise(data.lifetimeFundedMicropaise)} />
        <StatCard label="Lifetime spent" value={formatInrFromMicropaise(data.lifetimeSpentMicropaise)} />
      </div>
      <FundingForm />
      <h2 className="mt-10 text-lg">Funding requests</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {(data.fundingRequests ?? []).map((row) => (
          <li key={row.id} className="flex justify-between border-b border-[var(--wm-line)] py-2">
            <span>{row.status}</span>
            <span className="font-mono">{formatInrFromMicropaise(row.amountMicropaise ?? row.amount_micropaise)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
