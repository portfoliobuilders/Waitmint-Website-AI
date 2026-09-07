import Link from "next/link";
import { VerifiedFlow } from "@/components/marketing/verified-flow";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verified Attention",
  description:
    "Verified Wait™ is advertiser-funded AI wait time that passed viewability and settled on the Exchange. This is financial infrastructure, not a points game.",
  path: "/verified-attention",
});

const PILLARS = [
  {
    title: "A wait is evidence, not money",
    body: "Generation started and a wait was detected. That is the beginning of a session. It is not a balance. The Exchange has not settled anything yet.",
  },
  {
    title: "Viewability is a gate",
    body: "The placement must render and the tab must stay visible long enough to clear the threshold. A hidden, background, or immediately closed wait cannot qualify.",
  },
  {
    title: "Settlement is the only credit",
    body: "When qualification succeeds, advertiser funds move as integer micropaise: 60% to the user, 40% to WaitMint. House inventory and failed gates settle at ₹0.",
  },
  {
    title: "The website does not mint value",
    body: "WaitMint.ai displays wallets, campaigns, and payout requests. It does not keep a second ledger. If the Exchange is unreachable, there is no honest live balance to invent.",
  },
];

export default function VerifiedAttentionPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-hero wm-grid overflow-hidden border-b border-[var(--wm-line)]">
        <div className="wm-hero-veil" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="wm-kicker">Verified Wait™</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            Verified AI Attention
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            Verified Wait™ is a wait that became advertiser-funded attention and then settled.
            Verified AI Attention is that same impression from the buyer&apos;s side. Earnings exist
            only when a real advertiser-funded impression qualifies and settles.
          </p>
          <p className="mt-4 text-xl font-medium text-[var(--wm-mint)]">{siteConfig.qualificationLine}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">Financial infrastructure, not a points game</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
          There is no fixed daily reward, no claim button, no streak, and no browser-side payout
          math. Amounts are integer BIGINT micropaise on the WaitMint Exchange. This website
          formats them. It never manufactures them.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6"
            >
              <h3 className="text-lg font-medium">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">The Verified Wait™ sequence</h2>
          <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
            Each step is a prerequisite for the next. Skipping a gate would make the ledger a story
            instead of a record.
          </p>
          <div className="mt-10">
            <VerifiedFlow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-[var(--wm-line)] bg-[#0a0c11] p-8 sm:p-12">
          <h2 className="font-display text-3xl">Buy or earn the same path</h2>
          <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
            Users receive 60% of qualifying settled revenue. Advertisers pay only on qualification.
            Both sides read the same Exchange.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/advertise"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
            >
              Advertise with WaitMint
            </Link>
            <Link
              href="/earn"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
            >
              Monetize your wait
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
