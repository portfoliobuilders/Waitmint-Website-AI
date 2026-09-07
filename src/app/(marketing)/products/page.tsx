import { ProductCompare } from "@/components/marketing/product-compare";
import { ProductGrid } from "@/components/marketing/product-grid";
import { WAITMINT_PRODUCTS } from "@/lib/content/products";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Extension, SDK, and App",
  description:
    "WaitMint is one identity across Chrome extension, partner SDK, and companion app. Only the extension is live for wait detection today. The SDK and app open with the hosted Exchange — they never keep a second wallet.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-hero wm-grid overflow-hidden border-b border-[var(--wm-line)]">
        <div className="wm-hero-veil" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="wm-kicker">The WaitMint stack</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            Extension. SDK. App.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            Competitors sell points, toolbars, and a second ledger. WaitMint is one account and one
            Exchange wallet across every client. Clients detect waits. They do not invent balances.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <ProductGrid />
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Compared honestly</p>
          <h2 className="font-display mt-3 text-4xl">Three clients. One ledger.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
            Points apps, toolbars, and “second wallets” hide the truth. WaitMint clients never mint
            a private balance. They either detect waits or display Exchange integers.
          </p>
          <div className="mt-10">
            <ProductCompare />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-20 sm:px-6">
          {WAITMINT_PRODUCTS.map((product) => (
            <article key={product.id} id={product.id} className="scroll-mt-28">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">
                {product.eyebrow} · {product.statusLabel}
              </p>
              <h2 className="font-display mt-3 text-4xl">{product.name}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">{product.body}</p>
              <ul className="mt-6 max-w-xl space-y-2 text-sm leading-6 text-[var(--wm-muted)]">
                {product.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {product.ctaHref.startsWith("http") ? (
                <a
                  href={product.ctaHref}
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
                >
                  {product.ctaLabel}
                </a>
              ) : (
                <Link
                  href="/signup"
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
                >
                  Create the account this client will use
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
