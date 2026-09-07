import Link from "next/link";
import { chromeExtensionUrl, siteConfig, USER_SHARE_PERCENT } from "@/lib/config";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about WaitMint earnings, qualification, privacy, platforms, advertiser billing, and the Exchange ledger.",
  path: "/faq",
});

const FAQS = [
  {
    q: "Does WaitMint read my prompts?",
    a: "No. WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file contents. It needs generation state, wait sessions, viewability, and settlement metadata.",
  },
  {
    q: "How do I earn?",
    a: "Add the free Chrome extension, use a supported AI product normally, and keep the tab visible during an eligible wait. If a sponsored placement qualifies and settles, you receive 60% of the advertiser-funded revenue.",
  },
  {
    q: "Why didn’t I earn on a wait?",
    a: "A wait is not an earning. Short waits, hidden tabs, dismissed cards, house inventory, failed qualification, failed settlement, or a generation that ended first all settle at ₹0. No qualification. No charge. No earning.",
  },
  {
    q: "What is a qualifying impression?",
    a: "An impression that completed the Verified Wait™ path: generation started, wait detected, ad returned, rendered, tab visible, viewability threshold, qualified, and settled on the Exchange.",
  },
  {
    q: "How is money split?",
    a: "On each qualifying settled impression, 60% goes to the user and 40% stays with WaitMint. Amounts are integer micropaise. This website formats them; it does not invent them.",
  },
  {
    q: "Which AI products work today?",
    a: "ChatGPT is the documented live-verified surface unless the live inventory API lists others as live_verified. Adapters that exist in code are Testing or Coming Soon until verification says otherwise.",
  },
  {
    q: "Do advertisers pay for every wait?",
    a: "No. Advertisers set a CPM and a budget and pay only when an impression qualifies. House inventory and failed gates do not debit a campaign.",
  },
  {
    q: "Is funding automatic?",
    a: "Not in this phase. Advertiser money enters as Private Pilot Funding — manual admin credit. There is no claimed Stripe, Razorpay, or UPI automation for campaign funding.",
  },
  {
    q: "How do payouts work?",
    a: "Users can request a Pilot Payout with an Amazon voucher or UPI detail. Requests are reviewed manually. Combined balances may include pre-link install funds that have not moved to the signed-in wallet.",
  },
  {
    q: "Where is the ledger?",
    a: "On the WaitMint Exchange, not in this website’s database. WaitMint.ai displays wallets, ledger rows, and campaign spend that the Exchange already recorded.",
  },
  {
    q: "Can I dismiss a sponsored wait?",
    a: "Yes. The placement is labelled and dismissible. Dismissing it means that wait does not qualify. WaitMint will not invent a consolation earning.",
  },
  {
    q: "Is the extension free?",
    a: "Yes. There is no subscription to earn. You receive 60% of qualifying settled revenue. There are no advertised discounts because there is no paid user plan to discount.",
  },
];

export default function FaqPage() {
  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">Questions</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">FAQ</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            Direct answers from the same rules as the homepage: {siteConfig.qualificationLine} You
            receive {USER_SHARE_PERCENT}% of qualifying settled revenue.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="space-y-4">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-5"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium">
                <span>{item.q}</span>
                <span aria-hidden className="text-[var(--wm-mint)] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[var(--wm-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/trust"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
          >
            Trust Center
          </Link>
          <a
            href={chromeExtensionUrl()}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Add WaitMint to Chrome
          </a>
        </div>
      </section>
    </main>
  );
}
