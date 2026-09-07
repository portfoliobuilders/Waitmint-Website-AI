import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminPayoutsPage() {
  const { isAdmin, configured } = await requireAdmin();
  if (!configured) {
    return (
      <ConsoleGate
        title="Payouts"
        body="User redemptions are Exchange rows. This page does not mark payouts paid in a website database."
        kind="unconfigured"
      />
    );
  }
  if (!isAdmin) return <ConsoleGate title="Payouts" body="Admin access is authorized on the server." kind="forbidden" />;

  return (
    <div>
      <h1 className="font-display text-4xl">Payouts</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
        Pilot Payout requests are recorded on the Exchange and reviewed manually. Resolution must go
        through the existing redemption workflow. Combined user balances may include pre-link install
        funds that have not moved.
      </p>
      <p className="mt-6 text-sm text-[var(--wm-muted)]">
        There is no website-side “mark paid” switch. If a queue is not returned by the Exchange, this
        page stays empty instead of inventing rows.
      </p>
      <Link
        href="/admin/funding"
        className="mt-8 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]"
      >
        Open funding reviews
      </Link>
    </div>
  );
}
