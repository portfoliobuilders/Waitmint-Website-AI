import Link from "next/link";
import { WAITMINT_PRODUCTS } from "@/lib/content/products";

export function AuthStage() {
  return (
    <aside className="mx-auto w-full max-w-md lg:max-w-none">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-mint)]">One identity</p>
      <h2 className="font-display mt-3 text-4xl">Sign in once. Connect everything.</h2>
      <p className="mt-4 text-sm leading-6 text-[var(--wm-muted)]">
        WaitMint Auth is the same account for earning, advertising, and admin. The Chrome extension
        is the live client. SDK and App use this identity when the Exchange opens them — they never
        keep a second wallet.
      </p>
      <ul className="mt-8 space-y-3">
        {WAITMINT_PRODUCTS.map((product) => (
          <li key={product.id} className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">{product.name}</p>
              <span className="text-xs text-[var(--wm-muted)]">{product.statusLabel}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--wm-muted)]">{product.summary}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-[var(--wm-muted)]">
        Google sign-in works only after the Google provider is enabled in WaitMint Auth. Email is on.
      </p>
      <Link href="/products" className="mt-4 inline-flex min-h-11 items-center text-sm text-[var(--wm-aqua)]">
        Compare Extension, SDK, and App
      </Link>
    </aside>
  );
}
