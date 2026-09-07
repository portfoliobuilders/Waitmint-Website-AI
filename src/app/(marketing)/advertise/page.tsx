import Link from "next/link";
import { HeroDemo } from "@/components/marketing/hero-demo";
import { ProductGrid } from "@/components/marketing/product-grid";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteConfig.advertiserHeading,
  description:
    "Reach users during genuine AI generation waits and pay only when an impression meets WaitMint's qualification requirements.",
  path: "/advertise",
});

const SECTIONS = [
  {
    title: "Verified Attention",
    body: "You buy impressions that completed the Verified Wait™ path: generation, wait detection, render, visible tab, viewability, qualification, and settlement. Time passing is not enough.",
  },
  {
    title: "AI-native surfaces",
    body: "Placements appear during genuine AI generation waits on supported products. One generation can produce at most one ad and at most one paid impression. The user stays in the AI product they already opened.",
  },
  {
    title: "Surface targeting",
    body: "Campaigns target inventory context — for example a ChatGPT wait — not prompt text, answers, or conversation meaning. Surface-lock campaigns to the products you actually want. Code-ready adapters are not automatically live inventory.",
  },
  {
    title: "Pay for qualification",
    body: "Set a CPM and a budget. You are charged only when an impression qualifies and settles. Hidden tabs, dismissed cards, failed viewability, exhausted budgets, and house inventory do not create a paid debit.",
  },
  {
    title: "Privacy-safe advertising",
    body: "WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file contents. That is a product rule, not a slogan. You reach people during a verified wait, not because we opened their chat.",
  },
  {
    title: "Transparent measurement",
    body: "Spend, status, and settlement live on the WaitMint Exchange as integer micropaise. This website displays those records. It does not invent campaign performance. House inventory settles at ₹0 so empty demand is visible instead of hidden.",
  },
];

export default function AdvertisePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">For advertisers</p>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
              {siteConfig.advertiserHeading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--wm-muted)]">
              Reach users during genuine AI generation waits and pay only when an impression meets
              WaitMint&apos;s qualification requirements.
            </p>
            <p className="mt-4 text-xl font-medium text-[var(--wm-mint)]">{siteConfig.qualificationLine}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup?next=/advertiser"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
              >
                Create advertiser account
              </Link>
              <Link
                href="/verified-attention"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
              >
                See Verified Attention
              </Link>
            </div>
          </div>
          <HeroDemo />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">Why wait-time inventory is different</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SECTIONS.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6"
            >
              <h3 className="text-lg font-medium">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">Where verified waits come from</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
            Advertisers buy inventory that WaitMint clients detect. The Chrome extension is live.
            SDK inventory opens with the hosted Exchange. The app is a companion, not a second
            campaign system.
          </p>
          <div className="mt-10">
            <ProductGrid compact />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl">Campaign preview note</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            Creatives render as a clearly labelled sponsored wait card — the same shape a person may
            see while an AI product is thinking. Previewing a campaign is not an impression, does
            not charge budget, and does not settle. Campaigns move draft → submitted → active only
            after review. During the private pilot, funding is manual admin credit labelled Private
            Pilot Funding.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-[var(--wm-line)] bg-[#0a0c11] p-8 sm:p-12">
          <h2 className="font-display text-3xl">Start with a reviewed campaign</h2>
          <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
            Create an advertiser account, describe the company, and submit a campaign against the
            surfaces you actually intend to buy.
          </p>
          <Link
            href="/signup?next=/advertiser"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Create advertiser account
          </Link>
        </div>
      </section>
    </main>
  );
}
