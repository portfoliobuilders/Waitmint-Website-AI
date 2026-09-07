import Link from "next/link";
import { AudienceSplit } from "@/components/marketing/audience-split";
import { CtaBand } from "@/components/marketing/cta-band";
import { FaqList } from "@/components/marketing/faq-list";
import { GhostLink, PrimaryAnchor } from "@/components/marketing/cta";
import { HeroDemo } from "@/components/marketing/hero-demo";
import { HeroPointer } from "@/components/marketing/hero-pointer";
import { MarketDifference } from "@/components/marketing/market-difference";
import { ProductGrid } from "@/components/marketing/product-grid";
import { PrincipleMarquee } from "@/components/marketing/principle-marquee";
import { Reveal } from "@/components/marketing/reveal";
import { VerifiedFlow } from "@/components/marketing/verified-flow";
import { EarningsCalculator } from "@/components/marketing/earnings-calculator";
import { chromeExtensionUrl, siteConfig } from "@/lib/config";
import { FAQS } from "@/lib/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${siteConfig.name} · ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const CHIPS = [
  "No prompt reading",
  "60% revenue share",
  "One sponsored placement per eligible wait",
  "Verified advertiser-funded settlement",
];

const STEPS = [
  ["1. Use AI", "Use supported AI products normally. WaitMint watches generation state — not the prompt."],
  [
    "2. WaitMint appears",
    "During an eligible wait, one clearly labelled sponsored placement may appear. You can dismiss it.",
  ],
  [
    "3. Attention settles",
    "If the impression qualifies: advertiser pays → 60% user → 40% WaitMint. Otherwise ₹0.",
  ],
];

const PILLARS = [
  ["Ledger-first", "Wallets and settlement live on the WaitMint Exchange as integer micropaise. This website displays. It does not mint."],
  ["Privacy as architecture", "No prompts, answers, conversation meaning, or uploaded files. Targeting is inventory context."],
  ["Qualification or zero", "Time passing is not money. Hidden tabs, short waits, and house inventory do not invent a balance."],
  ["Investable honesty", "No live earnings tickers, no fake traction, no lottery. The product is the standard."],
];

export default function HomePage() {
  const store = chromeExtensionUrl();

  return (
    <main>
      <HeroPointer>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="wm-kicker">{siteConfig.userHeading}</p>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Your AI thinks.
              <br />
              Your wait earns.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--wm-muted)]">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryAnchor href={store}>Add WaitMint to Chrome</PrimaryAnchor>
              <GhostLink href="/advertise">Advertise with WaitMint</GhostLink>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/how-it-works" className="inline-flex min-h-11 items-center text-sm text-[var(--wm-aqua)]">
                See how it works
              </Link>
              <Link href="#calculator" className="inline-flex min-h-11 items-center text-sm text-[var(--wm-aqua)]">
                Open the illustrative calculator
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[var(--wm-line)] bg-white/3 px-3 py-2 text-xs text-[var(--wm-muted)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <HeroDemo />
        </div>
      </HeroPointer>

      <PrincipleMarquee />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-gold)]">The category</p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl sm:text-5xl">
            AI wait time is already attention. WaitMint is the exchange that can prove it.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            Every time an AI assistant is thinking — generating code, running a tool, or streaming a
            response — there can be a short wait. Competitors turn that moment into a raffle, a
            points game, or a conversation they should never have opened. WaitMint turns eligible
            waits into labelled, viewable, advertiser-funded settlement.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PILLARS.map(([title, body], index) => (
            <Reveal key={title} delayMs={index * 80}>
              <article className="wm-panel wm-panel-hover h-full rounded-2xl p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--wm-mint)]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-muted)]">How WaitMint works</p>
          <h2 className="font-display mt-3 text-4xl">Three steps. One settlement.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(([title, body], index) => (
            <Reveal key={title} delayMs={index * 90}>
              <article className="wm-panel wm-panel-hover h-full rounded-2xl p-6">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xl font-medium text-[var(--wm-mint)]">{siteConfig.qualificationLine}</p>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-gold)]">The WaitMint stack</p>
            <h2 className="font-display mt-3 text-4xl">Extension. SDK. App.</h2>
            <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
              One identity across every client. Only the Chrome extension is live for wait detection
              today. SDK and App open with the hosted Exchange and never keep a second wallet.
            </p>
          </Reveal>
          <div className="mt-10">
            <ProductGrid compact />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="font-display text-4xl">Verified Wait™</h2>
            <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
              Earnings exist only when a real advertiser-funded impression qualifies and settles.
              This is financial infrastructure, not a points game.
            </p>
          </Reveal>
          <div className="mt-10">
            <VerifiedFlow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="wm-kicker">Why WaitMint is the standard</p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl">
            Built to be the most serious product in a noisy market.
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--wm-muted)]">
            Luxury here is restraint: no fake wallets on the homepage, no hourly prize wheel, no
            prompt surveillance. Investors can underwrite a ledger. Users can trust a privacy
            boundary. Advertisers can buy attention that actually happened.
          </p>
        </Reveal>
        <div className="mt-10">
          <MarketDifference />
        </div>
      </section>

      <section className="border-y border-[var(--wm-line)] bg-[var(--wm-bg-elevated)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="font-display text-4xl">Two sides. One Exchange.</h2>
            <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
              People monetize the wait they already take. Brands buy verified AI attention. Both
              read the same settlement path.
            </p>
          </Reveal>
          <div className="mt-10">
            <AudienceSplit />
          </div>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <EarningsCalculator />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl">What is AI wait-time monetization?</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
            AI wait-time monetization turns eligible moments in that wait into value through small,
            clearly labelled sponsored placements. When an impression meets WaitMint&apos;s
            verification requirements and settles, the user receives 60% of the advertiser-funded
            revenue.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-text)]">
            WaitMint does not pay simply because time passed. Earnings exist only when a real
            advertiser-funded impression qualifies and settles.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl">{siteConfig.trustHeading}</h2>
          <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
            WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file
            contents. It needs generation state, wait sessions, viewability, and settlement
            metadata — nothing more.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Reveal>
          <p className="wm-kicker">Questions</p>
          <h2 className="font-display mt-3 text-4xl">Direct answers. Same rules as the ledger.</h2>
        </Reveal>
        <div className="mt-8">
          <FaqList items={FAQS.slice(0, 6)} />
        </div>
        <Link href="/faq" className="mt-6 inline-flex min-h-11 items-center text-sm text-[var(--wm-aqua)]">
          Open the full FAQ
        </Link>
      </section>

      <CtaBand
        title="The wait is already happening."
        body="Create an account when you are ready to link an install, request a Pilot Payout, or submit a campaign. The Exchange remains the source of truth."
        primary="signup"
      />
    </main>
  );
}
