import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteConfig.trustHeading,
  description:
    "WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file contents. It needs generation state, wait sessions, viewability, and settlement metadata.",
  path: "/trust",
});

const DOES_NOT_READ = [
  "Prompts you type into a supported AI product",
  "AI responses, streamed tokens, or conversation meaning",
  "Uploaded file contents",
  "General browsing history outside the wait-detection path",
];

const NEEDS = [
  "Generation state — that a supported product is actually producing a response",
  "Wait sessions — a bounded session so one generation cannot mint unlimited impressions",
  "Viewability — the tab is visible and the placement met the threshold",
  "Settlement metadata — enough to debit an advertiser once and credit a user once",
];

export default function TrustPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">Trust Center</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            {siteConfig.trustHeading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file
            contents. It needs generation state, wait sessions, viewability, and settlement
            metadata — nothing more.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">Privacy boundary</h2>
        <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
          Targeting is inventory context — a ChatGPT wait, a Claude wait — not the essay that
          caused the wait.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-danger)]">Does not read</p>
            <h3 className="font-display mt-3 text-3xl">Closed to WaitMint</h3>
            <ul className="mt-6 space-y-3">
              {DOES_NOT_READ.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--wm-line)] bg-[#0a0c11] px-4 py-3 text-sm leading-6 text-[var(--wm-muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-[var(--wm-mint)]/30 bg-[var(--wm-mint-dim)] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Needs</p>
            <h3 className="font-display mt-3 text-3xl">Required to settle</h3>
            <ul className="mt-6 space-y-3">
              {NEEDS.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[var(--wm-mint)]/20 bg-[#0a0c11] px-4 py-3 text-sm leading-6 text-[var(--wm-text)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">What this website stores</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            WaitMint.ai holds the account you sign in with and shows balances the Exchange already
            keeps. Linking an extension maps an install to your account. It does not rewrite
            historical ledger rows and it does not open the conversation that produced a wait.
            Pilot payout requests include only the method and detail you submit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
            >
              Privacy
            </Link>
            <Link
              href="/faq"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
            >
              FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
