import Link from "next/link";
import { HeroDemo } from "@/components/marketing/hero-demo";
import { VerifiedFlow } from "@/components/marketing/verified-flow";
import { chromeExtensionUrl, siteConfig } from "@/lib/config";
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

export default function HomePage() {
  return (
    <main>
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">
              {siteConfig.userHeading}
            </p>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
              Your AI thinks.
              <br />
              Your wait earns.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--wm-muted)]">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={chromeExtensionUrl()}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
              >
                Add WaitMint to Chrome
              </a>
              <Link
                href="/advertise"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
              >
                Advertise with WaitMint
              </Link>
            </div>
            <Link href="/how-it-works" className="mt-4 inline-block text-sm text-[var(--wm-aqua)]">
              See how it works
            </Link>
            <ul className="mt-8 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[var(--wm-line)] px-3 py-2 text-xs text-[var(--wm-muted)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <HeroDemo />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-muted)]">How WaitMint works</p>
        <h2 className="font-display mt-3 text-4xl">Three steps. One settlement.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["1. Use AI", "Use supported AI products normally."],
            ["2. WaitMint appears", "During an eligible wait, one clearly labelled sponsored placement may appear."],
            ["3. Attention settles", "If the impression qualifies: advertiser pays → 60% user → 40% WaitMint."],
          ].map(([title, body]) => (
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
          <h2 className="font-display text-4xl">Verified Wait™</h2>
          <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
            Earnings exist only when a real advertiser-funded impression qualifies and settles.
            This is financial infrastructure, not a points game.
          </p>
          <div className="mt-10">
            <VerifiedFlow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl">What is AI wait-time monetization?</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-muted)]">
          Every time an AI assistant is thinking — generating code, running a tool, or streaming a
          response — there can be a short wait. AI wait-time monetization turns eligible moments in
          that wait into value through small, clearly labelled sponsored placements. When an
          impression meets WaitMint&apos;s verification requirements and settles, the user receives
          60% of the advertiser-funded revenue.
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wm-text)]">
          WaitMint does not pay simply because time passed. Earnings exist only when a real
          advertiser-funded impression qualifies and settles.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-[var(--wm-line)] bg-[#0a0c11] p-8 sm:p-12">
          <h2 className="font-display text-3xl">{siteConfig.trustHeading}</h2>
          <p className="mt-4 max-w-2xl text-[var(--wm-muted)]">
            WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file
            contents. It needs generation state, wait sessions, viewability, and settlement
            metadata — nothing more.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/trust"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
            >
              Open the Trust Center
            </Link>
            <Link
              href="/signup"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
            >
              Create your WaitMint account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
