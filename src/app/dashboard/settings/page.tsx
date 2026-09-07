import { requireUser } from "@/lib/auth/guards";
import { WAITMINT_PRODUCTS } from "@/lib/content/products";
import Link from "next/link";

export default async function SettingsPage() {
  const { user } = await requireUser();
  return (
    <div>
      <h1 className="font-display text-4xl">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--wm-muted)]">
        One WaitMint identity for Extension, SDK, and App. Preferences here do not mint a wallet.
      </p>
      <dl className="mt-8 space-y-6 text-sm">
        <div>
          <dt className="text-[var(--wm-muted)]">Email</dt>
          <dd className="mt-1">{user?.email || "—"}</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Account</dt>
          <dd className="mt-1">You can earn and advertise without a second password.</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Connected clients</dt>
          <dd className="mt-2 space-y-2">
            {WAITMINT_PRODUCTS.map((product) => (
              <p key={product.id} className="text-[var(--wm-muted)]">
                <span className="text-[var(--wm-text)]">{product.shortName}</span> · {product.statusLabel}
              </p>
            ))}
            <Link href="/dashboard/connections" className="mt-2 inline-flex min-h-11 items-center text-[var(--wm-mint)]">
              Manage connections
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  );
}
