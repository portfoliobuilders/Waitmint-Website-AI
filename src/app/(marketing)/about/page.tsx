import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "WaitMint turns real AI wait time into verified advertising attention. The public website displays accounts. The WaitMint Exchange is the financial source of truth.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">About</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            WaitMint exists because AI wait time is already attention. People sit with a product
            while a model thinks. That moment can be labelled, verified, and settled — or it can be
            turned into a points game. We chose the ledger.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">The company, in plain language</h2>
        <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[var(--wm-muted)]">
          <p>
            WaitMint is building a verified AI attention exchange. Users keep using supported AI
            products. During an eligible wait, one sponsored placement may appear. If that
            impression qualifies, the advertiser pays and the user receives 60% of the settled
            revenue.
          </p>
          <p>
            We do not read prompts, answers, conversation meaning, or uploaded files. We do not
            pay because a clock ticked. We do not run a second wallet on this website. Those
            constraints are the product.
          </p>
          <p>
            The public site you are reading — WaitMint.ai — is the account platform: sign-in,
            dashboards, campaign forms, and Trust Center copy. It displays and manages. It never
            manufactures earnings.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">The Exchange is the source of truth</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            Wallets, ledger entries, campaign spend, impression settlement, and inventory kill
            switches live on the WaitMint Exchange. Amounts are integer micropaise. Settlement is
            atomic. This website attaches a signed-in session and asks the Exchange what is true.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-text)]">
            If the Exchange is offline, WaitMint.ai will say so. It will not invent a live balance,
            a live CPM average, or a live platform that has not been verified.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">Private pilot honesty</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "Advertiser funding is Private Pilot Funding — manual admin credit.",
            "User payouts are Pilot Payout requests, reviewed manually.",
            "ChatGPT is the documented live-verified surface unless live inventory says otherwise.",
            "House inventory settles at ₹0 so empty demand is not disguised as earnings.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 text-sm leading-6 text-[var(--wm-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/trust"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
          >
            Trust Center
          </Link>
          <Link
            href="/verified-attention"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Verified Attention
          </Link>
        </div>
      </section>
    </main>
  );
}
