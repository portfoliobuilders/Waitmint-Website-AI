import Link from "next/link";
import { USER_SHARE_PERCENT } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "Terms for using WaitMint.ai, the Chrome extension, and advertiser tools during the private pilot. The Exchange ledger is the source of financial truth.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="overflow-x-hidden">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">Legal</p>
        <h1 className="font-display mt-5 text-5xl leading-[1.05]">Terms</h1>
        <p className="mt-4 text-sm text-[var(--wm-muted)]">Effective 7 September 2026. Private pilot terms.</p>
        <div className="mt-10 space-y-8 text-base leading-8 text-[var(--wm-muted)]">
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">The service</h2>
            <p className="mt-3">
              WaitMint provides a Chrome extension, this website, and advertiser tools that sit in
              front of the WaitMint Exchange. The Exchange records wallets, impressions, and
              campaign spend as integer micropaise. WaitMint.ai does not create a parallel ledger
              and does not calculate payout amounts in the browser.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Accounts</h2>
            <p className="mt-3">
              One login may be an earner, an advertiser, or both. Roles come from server-side
              profile and membership records, not from a field you type about yourself. You are
              responsible for the email and recovery methods you use. Linking an extension maps
              future settlements to your signed-in profile; it does not rewrite historical rows.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Earnings are not guaranteed</h2>
            <p className="mt-3">
              Users may receive {USER_SHARE_PERCENT}% of advertiser-funded revenue on impressions
              that qualify and settle. A wait, a visible tab, or a labelled card is not enough.
              House inventory settles at ₹0. Illustrative calculators on this site are not offers
              and are not live wallet figures.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Advertisers</h2>
            <p className="mt-3">
              You pay only when an impression qualifies. Campaigns are reviewed before they serve.
              You may not target prompt content, because WaitMint does not read it. Private Pilot
              Funding is manual admin credit. We do not claim an automated payment gateway or
              instant UPI campaign top-up in this phase.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Acceptable use</h2>
            <p className="mt-3">
              Do not attempt to fabricate viewability, replay qualification, automate clicks as
              if they were attention, or interfere with settlement. Do not use WaitMint to buy
              or sell inventory we have not marked live. ChatGPT is the documented live-verified
              surface unless live inventory says otherwise.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Pilot payouts</h2>
            <p className="mt-3">
              Redemptions are Pilot Payout requests. They are reviewed manually. Combined display
              balances may include funds that still sit on a pre-link installation. Requesting a
              payout does not move those rows by itself.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Limitation</h2>
            <p className="mt-3">
              The service is provided as a private pilot. We may pause serving, pause paid
              inventory, or change a surface&apos;s verification status. We are not liable for
              missed waits, Exchange downtime, or advertiser demand that does not appear. These
              terms are not a prospectus.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Contact</h2>
            <p className="mt-3">
              Questions:{" "}
              <a className="text-[var(--wm-mint)]" href="mailto:contact@portfoliobuilders.in">
                contact@portfoliobuilders.in
              </a>
              . Read{" "}
              <Link href="/privacy" className="text-[var(--wm-mint)]">
                Privacy
              </Link>{" "}
              and the{" "}
              <Link href="/trust" className="text-[var(--wm-mint)]">
                Trust Center
              </Link>{" "}
              before you treat this as a bank.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
