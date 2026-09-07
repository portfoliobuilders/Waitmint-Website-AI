import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminAdvertisersPage() {
  const { isAdmin, configured } = await requireAdmin();
  if (!configured) {
    return (
      <ConsoleGate
        title="Advertisers"
        body="Organizations live in Exchange tables. Review campaigns and funding from their dedicated queues."
        kind="unconfigured"
      />
    );
  }
  if (!isAdmin) {
    return <ConsoleGate title="Advertisers" body="Admin access is authorized on the server." kind="forbidden" />;
  }

  return (
    <div>
      <h1 className="font-display text-4xl">Advertisers</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
        Advertiser companies are Exchange organizations. This console does not keep a second advertiser
        directory or invent campaign performance.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/campaigns" className="rounded-2xl border border-[var(--wm-line)] p-5">
          <p className="font-medium">Campaign review</p>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">Approve or reject drafts that already exist on the Exchange.</p>
        </Link>
        <Link href="/admin/funding" className="rounded-2xl border border-[var(--wm-line)] p-5">
          <p className="font-medium">Private Pilot Funding</p>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">Credit writes an Exchange funding_credit row. There is no payment gateway here.</p>
        </Link>
      </div>
    </div>
  );
}
