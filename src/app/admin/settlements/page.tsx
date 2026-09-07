import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminSettlementsPage() {
  const { isAdmin, configured } = await requireAdmin();
  if (!configured) {
    return (
      <ConsoleGate
        title="Settlements"
        body="Impression, campaign, advertiser, user, gross, 60/40 split, timestamp, and duplicate state live on the Exchange."
        kind="unconfigured"
      />
    );
  }
  if (!isAdmin) {
    return <ConsoleGate title="Settlements" body="Admin access is authorized on the server." kind="forbidden" />;
  }

  return (
    <div>
      <h1 className="font-display text-4xl">Settlements</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
        Read-only by default. This website will not reconstruct money from the browser, from elapsed
        seconds, or from a CSV you upload here. Duplicate qualification must not debit twice.
      </p>
      <ul className="mt-8 space-y-3 text-sm text-[var(--wm-muted)]">
        <li>Gross, user 60%, WaitMint 40% — integer micropaise.</li>
        <li>House inventory settles at ₹0.</li>
        <li>Failed viewability, dismissed cards, and hidden tabs do not create a paid debit.</li>
      </ul>
      <Link
        href="/admin/surfaces"
        className="mt-8 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]"
      >
        Surface kill switches
      </Link>
    </div>
  );
}
