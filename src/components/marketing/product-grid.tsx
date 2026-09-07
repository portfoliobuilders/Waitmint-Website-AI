import Link from "next/link";
import { WAITMINT_PRODUCTS, type WaitMintProduct } from "@/lib/content/products";
import { cn } from "@/lib/utils";

function Cta({ product }: { product: WaitMintProduct }) {
  const className =
    "mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium";
  if (product.ctaHref.startsWith("http")) {
    return (
      <a
        href={product.ctaHref}
        className={cn(className, "bg-[var(--wm-mint)] text-[#04110c]")}
      >
        {product.ctaLabel}
      </a>
    );
  }
  return (
    <Link
      href={product.ctaHref}
      className={cn(
        className,
        product.status === "available"
          ? "bg-[var(--wm-mint)] text-[#04110c]"
          : "border border-[var(--wm-line-strong)]",
      )}
    >
      {product.ctaLabel}
    </Link>
  );
}

export function ProductGrid({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <ul className={cn("grid gap-6", compact ? "lg:grid-cols-3" : "lg:grid-cols-3")}>
      {WAITMINT_PRODUCTS.map((product) => (
        <li
          key={product.id}
          className="flex flex-col rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-aqua)]">{product.eyebrow}</p>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                product.status === "available"
                  ? "bg-[var(--wm-mint-dim)] text-[var(--wm-mint)]"
                  : "border border-[var(--wm-line)] text-[var(--wm-muted)]",
              )}
            >
              {product.statusLabel}
            </span>
          </div>
          <h3 className="font-display mt-4 text-3xl">{product.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-[var(--wm-muted)]">{product.summary}</p>
          {compact ? null : (
            <ul className="mt-6 space-y-2 text-sm leading-6 text-[var(--wm-muted)]">
              {product.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
          <Cta product={product} />
        </li>
      ))}
    </ul>
  );
}
