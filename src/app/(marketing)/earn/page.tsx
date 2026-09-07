import Link from "next/link";
import { EarningsCalculator } from "@/components/marketing/earnings-calculator";
import { chromeExtensionUrl, siteConfig, USER_SHARE_PERCENT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteConfig.userHeading,
  description:
    "Use supported AI tools normally. When a qualifying sponsored wait settles, you receive 60% of the advertiser-funded revenue.",
  path: "/earn",
});

const STEPS = [
  ["1. Use AI", "Use supported AI products normally. WaitMint does not ask you to change how you work."],
  [
    "2. WaitMint appears",
    "During an eligible wait, one clearly labelled sponsored placement may appear. You can dismiss it.",
  ],
  [
    "3. Attention settles",
    `If the impression qualifies: advertiser pays → ${USER_SHARE_PERCENT}% user → 40% WaitMint.`,
  ],
];

export default function EarnPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">For people who wait</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            {siteConfig.userHeading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            {siteConfig.description}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--wm-text)]">
            {siteConfig.revenueLine}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={chromeExtensionUrl()}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
            >
              Add WaitMint to Chrome
            </a>
            <Link
              href="/how-it-works"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-muted)]">How earning works</p>
        <h2 className="font-display mt-3 text-4xl">Three steps. One settlement.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6">
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-xl font-medium text-[var(--wm-mint)]">{siteConfig.qualificationLine}</p>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <EarningsCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">What never becomes an earning</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "The wait was too short to qualify.",
            "The tab was hidden before viewability cleared.",
            "You dismissed the sponsored placement.",
            "No paid campaign was available — house inventory settles at ₹0.",
            "Qualification or settlement failed on the Exchange.",
            "The generation ended before the impression could qualify.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] px-5 py-4 text-sm leading-6 text-[var(--wm-muted)]"
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
            Read the Trust Center
          </Link>
          <Link
            href="/signup"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Create your WaitMint account
          </Link>
        </div>
      </section>
    </main>
  );
}
