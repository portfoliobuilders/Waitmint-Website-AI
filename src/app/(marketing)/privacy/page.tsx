import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "WaitMint does not read prompts, AI responses, conversation meaning, or uploaded files. This page explains what the website and Exchange actually keep.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">Legal</p>
        <h1 className="font-display mt-5 text-5xl leading-[1.05]">Privacy</h1>
        <p className="mt-4 text-sm text-[var(--wm-muted)]">Effective 7 September 2026. Written for humans.</p>
        <div className="mt-10 space-y-8 text-base leading-8 text-[var(--wm-muted)]">
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">What this covers</h2>
            <p className="mt-3">
              This page covers WaitMint.ai (the public website and account platform) and the
              WaitMint Chrome extension as they talk to the WaitMint Exchange. The Exchange is the
              ledger. This website does not keep a second wallet table.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">What we do not read</h2>
            <p className="mt-3">
              WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file
              contents. Targeting is surface context — that a supported AI product is in a wait —
              not the text that caused the wait. We also do not collect general browsing history
              outside that wait-detection path.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">What we need</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Generation state and wait-session identifiers so one generation cannot settle twice.</li>
              <li>Viewability and qualification signals required to settle an impression.</li>
              <li>Settlement metadata: campaign, surface, amounts in integer micropaise, timestamps.</li>
              <li>A local extension install identifier used to map an install to an account you choose to link.</li>
              <li>Account email and authentication records if you create a WaitMint.ai login.</li>
              <li>Payout method and detail you voluntarily submit for a Pilot Payout.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Where records live</h2>
            <p className="mt-3">
              Financial rows — wallets, ledger entries, advertiser spend, redemptions — live on the
              WaitMint Exchange. WaitMint.ai stores the session you use to sign in and asks the
              Exchange for display data. Linking an extension maps an anonymous install to your
              signed-in profile. Historical ledger rows stay on the original install profile.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Cookies and sign-in</h2>
            <p className="mt-3">
              Signed-in sessions use httpOnly cookies from Supabase Auth. We do not use those
              cookies to retarget you across the web from conversation content, because we do not
              have conversation content.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Your choices</h2>
            <p className="mt-3">
              You can dismiss a placement, stop using the extension, unlink an install, or request
              deletion of account data. Uninstalling the extension stops further wait detection
              from that browser. Deletion of Exchange ledger history may be limited where records
              are required to keep settlement auditable.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl text-[var(--wm-text)]">Contact</h2>
            <p className="mt-3">
              Privacy questions:{" "}
              <a className="text-[var(--wm-mint)]" href="mailto:contact@portfoliobuilders.in">
                contact@portfoliobuilders.in
              </a>
              . Also see the{" "}
              <Link href="/trust" className="text-[var(--wm-mint)]">
                Trust Center
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-[var(--wm-mint)]">
                Terms
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
