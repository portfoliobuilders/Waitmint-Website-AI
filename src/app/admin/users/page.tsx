import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminUsersPage() {
  const { isAdmin, configured } = await requireAdmin();
  if (!configured) {
    return (
      <ConsoleGate
        title="Users"
        body="Search and inspect users through the Exchange. This console does not offer a casual balance edit."
        kind="unconfigured"
      />
    );
  }
  if (!isAdmin) return <ConsoleGate title="Users" body="Admin access is authorized on the server." kind="forbidden" />;

  return (
    <div>
      <h1 className="font-display text-4xl">Users</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
        Profiles, wallets, and linked installs live on the Exchange. This website will not list a
        local user table or edit a balance from a form. Any future adjustment must write an immutable
        ledger row with admin identity and reason.
      </p>
      <ul className="mt-8 space-y-3 text-sm text-[var(--wm-muted)]">
        <li>Linked Chrome installs are mapped, not deleted.</li>
        <li>SDK and App share the same WaitMint identity when they open.</li>
        <li>Pilot Payouts are reviewed on the Payouts queue.</li>
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/admin/payouts"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
        >
          Payout queue
        </Link>
        <Link
          href="/admin/settlements"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
        >
          Settlements
        </Link>
      </div>
    </div>
  );
}
