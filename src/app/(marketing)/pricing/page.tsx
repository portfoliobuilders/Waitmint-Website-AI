import Link from "next/link";
import { EarningsCalculator } from "@/components/marketing/earnings-calculator";
import { ProductGrid } from "@/components/marketing/product-grid";
import { chromeExtensionUrl, PLATFORM_SHARE_PERCENT, siteConfig, USER_SHARE_PERCENT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "The WaitMint extension is free. Users receive 60% of qualifying settled revenue. Advertisers pay only on qualification. SDK and App use the same wallet — they are not extra plans.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">Pricing</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            No subscription theatre.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            Users keep every client free and receive {USER_SHARE_PERCENT}% of qualifying settled
            revenue. Advertisers pay only when an impression qualifies. There are no launch
            discounts, no fake list prices, and no guaranteed earnings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Clients</p>
        <h2 className="font-display mt-3 text-4xl">Extension, SDK, and App — one split</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
          WaitMint does not sell three wallets. The Chrome extension is live. SDK and App open with
          the hosted Exchange and display the same integers.
        </p>
        <div className="mt-10">
          <ProductGrid compact />
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <EarningsCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Users</p>
            <h2 className="font-display mt-3 text-3xl">Free to earn</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--wm-muted)]">
              Add WaitMint at no charge. You create the attention. You receive{" "}
              {USER_SHARE_PERCENT}% of qualifying settled revenue. WaitMint receives{" "}
              {PLATFORM_SHARE_PERCENT}%.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--wm-muted)]">
              <li>No subscription to earn.</li>
              <li>No points, streaks, or claim buttons.</li>
              <li>House inventory and failed qualification settle at ₹0.</li>
              <li>Pilot Payouts are manual reviews for Amazon voucher or UPI details you submit.</li>
            </ul>
            <a
              href={chromeExtensionUrl()}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
            >
              Add WaitMint to Chrome
            </a>
          </article>

          <article className="rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Advertisers</p>
            <h2 className="font-display mt-3 text-3xl">Pay on qualification</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--wm-muted)]">
              You set a CPM and a budget. You are charged only when an impression meets WaitMint
              qualification requirements and settles on the Exchange.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--wm-muted)]">
              <li>CPM is an integer rupee bid. Campaign drafts use a ₹10 minimum CPM and budget.</li>
              <li>Spend is integer micropaise on the Exchange, not a browser estimate.</li>
              <li>Private Pilot Funding is manual admin credit. There is no claimed payment gateway in this phase.</li>
              <li>{siteConfig.qualificationLine}</li>
            </ul>
            <Link
              href="/signup?next=/advertiser"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
            >
              Create advertiser account
            </Link>
          </article>
        </div>
      </section>

      <section className="border-t border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">What we will not put on this page</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            Average monthly earnings, “users made ₹X last week,” countdown coupons, or a discounted
            CPM that was never a real price. Those numbers would be fiction. Live money is whatever
            the Exchange settled.
          </p>
        </div>
      </section>
    </main>
  );
}
