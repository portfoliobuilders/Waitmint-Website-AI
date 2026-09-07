import { requireUser } from "@/lib/auth/guards";

export default async function SettingsPage() {
  const { user } = await requireUser();
  return (
    <div>
      <h1 className="font-display text-4xl">Settings</h1>
      <dl className="mt-8 space-y-4 text-sm">
        <div>
          <dt className="text-[var(--wm-muted)]">Email</dt>
          <dd className="mt-1">{user?.email || "—"}</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Account</dt>
          <dd className="mt-1">One WaitMint identity. You can earn and advertise without a second password.</dd>
        </div>
      </dl>
    </div>
  );
}
