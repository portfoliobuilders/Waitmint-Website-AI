import { DataGate } from "@/components/app/data-gate";
import { WAITMINT_PRODUCTS } from "@/lib/content/products";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ConnectionBoard({
  highlight,
}: {
  highlight?: "extension" | "sdk" | "app";
}) {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {WAITMINT_PRODUCTS.map((product) => (
        <li
          key={product.id}
          className={cn(
            "scroll-mt-28 rounded-2xl border bg-[var(--wm-bg-elevated)] p-5",
            highlight === product.id ? "border-[var(--wm-mint)]/40 wm-glow" : "border-[var(--wm-line)]",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">{product.shortName}</p>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px]",
                product.status === "available"
                  ? "bg-[var(--wm-mint-dim)] text-[var(--wm-mint)]"
                  : "border border-[var(--wm-line)] text-[var(--wm-muted)]",
              )}
            >
              {product.statusLabel}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{product.summary}</p>
          <Link
            href={product.status === "available" ? product.dashboardHref : product.href}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-[var(--wm-mint)]"
          >
            {product.status === "available" ? "Connect" : "How this will work"}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function UnconfiguredAccount({
  title = "Your account is ready. The ledger is not on this website.",
}: {
  title?: string;
}) {
  return (
    <div className="space-y-6">
      <DataGate kind="unconfigured">
        <Link
          href="/dashboard/connections"
          className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
        >
          Open connections
        </Link>
      </DataGate>
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="mt-2 text-sm text-[var(--wm-muted)]">
          Connect the Chrome extension when the Exchange is hosted. SDK and App use the same identity
          and will not keep a second wallet.
        </p>
        <div className="mt-5">
          <ConnectionBoard />
        </div>
      </div>
    </div>
  );
}
