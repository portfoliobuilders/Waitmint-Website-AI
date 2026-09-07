import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminSystemPage() {
  const { isAdmin, configured } = await requireAdmin();
  if (!configured) {
    return (
      <ConsoleGate
        title="System"
        body="Exchange configuration, paid inventory, and surface kill switches live on the WaitMint API — not in this website’s database."
        kind="unconfigured"
      />
    );
  }
  if (!isAdmin) return <ConsoleGate title="System" body="Admin access is authorized on the server." kind="forbidden" />;

  return (
    <div>
      <h1 className="font-display text-4xl">System</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[var(--wm-muted)]">
        <li>Supabase/Postgres is the financial source of truth.</li>
        <li>SQLite in backend-core is legacy only.</li>
        <li>Do not reset the production campaign named ChatGPT live paid inventory.</li>
        <li>House inventory settles at ₹0.</li>
        <li>Paid inventory and surface serving are toggled on Surfaces, not with a frontend-only flag.</li>
      </ul>
      <Link
        href="/admin/surfaces"
        className="mt-8 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]"
      >
        Open surfaces
      </Link>
    </div>
  );
}
