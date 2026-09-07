import Link from "next/link";
import { ProductGrid } from "@/components/marketing/product-grid";
import { VerifiedFlow } from "@/components/marketing/verified-flow";
import { chromeExtensionUrl, siteConfig, USER_SHARE_PERCENT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "Use AI normally. During an eligible wait, one labelled sponsored placement may appear. If it qualifies, 60% settles to the user.",
  path: "/how-it-works",
});

const STEPS = [
  {
    title: "1. Use AI",
    body: "Install the WaitMint Chrome extension and keep using ChatGPT or another supported product the way you already do. WaitMint watches generation state — that a response is being produced — not the prompt, the answer, or the file you uploaded.",
  },
  {
    title: "2. WaitMint appears",
    body: "If the wait is eligible, one clearly labelled sponsored placement may appear. It does not block the AI product. You can dismiss it. There is no claim button, no survey, and no requirement to click through for the wait to remain valid.",
  },
  {
    title: "3. Attention settles",
    body: `Qualification is a sequence, not a vibe. The card must render, the tab must stay visible, and viewability must clear its threshold. Only then can the Exchange settle: advertiser pays → ${USER_SHARE_PERCENT}% user → 40% WaitMint.`,
  },
];

const GATES = [
  ["Wait too short", "No charge. No earning."],
  ["Tab hidden", "Viewability cannot pass. No charge. No earning."],
  ["Placement dismissed", "The card is gone. No charge. No earning."],
  ["House inventory", "A labelled card may still appear. Settlement is ₹0."],
  ["Settlement failed", "Duplicate or failed settlement does not mint a balance."],
  ["Generation ended first", "The wait closed before qualification. No charge. No earning."],
];

export default function HowItWorksPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">The loop</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            How WaitMint works
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-xl font-medium text-[var(--wm-mint)]">{siteConfig.qualificationLine}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">Three steps. One settlement.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.title} className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6">
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">The clients in the loop</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
            Detection lives in the Chrome extension today. SDK and App attach to the same identity
            when the hosted Exchange opens them.
          </p>
          <div className="mt-10">
            <ProductGrid compact />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">The qualification line</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            {siteConfig.qualificationLine} WaitMint will not invent a consolation reward when a wait
            fails the path. That would turn a ledger into a game.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {GATES.map(([title, body]) => (
              <article
                key={title}
                className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6"
              >
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wm-muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">Verified Wait™ path</h2>
        <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
          Earnings exist only when a real advertiser-funded impression qualifies and settles. This
          is financial infrastructure, not a points game.
        </p>
        <div className="mt-10">
          <VerifiedFlow />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={chromeExtensionUrl()}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Add WaitMint to Chrome
          </a>
          <Link
            href="/verified-attention"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
          >
            Read Verified Attention
          </Link>
        </div>
      </section>
    </main>
  );
}
