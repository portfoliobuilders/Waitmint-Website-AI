import Link from "next/link";
import { chromeExtensionUrl, siteConfig } from "@/lib/config";

export function AudienceSplit() {
  const store = chromeExtensionUrl();
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="wm-panel wm-panel-hover rounded-[1.7rem] p-7 sm:p-8">
        <p className="wm-kicker">Users</p>
        <h3 className="font-display mt-4 text-3xl">{siteConfig.userHeading}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--wm-muted)]">
          Keep using supported AI products. During an eligible wait, one labelled sponsored
          placement may appear. If it qualifies and settles, you receive 60% of the advertiser-funded
          revenue.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-[var(--wm-muted)]">
          <li>Free Chrome extension. No subscription to earn.</li>
          <li>Dismissible. No claim button. No survey.</li>
          <li>House inventory and failed gates settle at ₹0.</li>
        </ul>
        <a href={store} className="wm-btn wm-btn-primary mt-8">
          Add WaitMint to Chrome
        </a>
      </article>
      <article className="wm-panel wm-panel-hover rounded-[1.7rem] p-7 sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-gold)]">Advertisers</p>
        <h3 className="font-display mt-4 text-3xl">{siteConfig.advertiserHeading}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--wm-muted)]">
          Reach people during genuine generation waits. You buy impressions that completed the
          Verified Wait™ path — not a clock tick, and not a conversation we never opened.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-[var(--wm-muted)]">
          <li>Pay only when an impression qualifies and settles.</li>
          <li>Target inventory context, not prompt text.</li>
          <li>Private Pilot Funding in this phase — no invented gateway.</li>
        </ul>
        <Link href="/advertise" className="wm-btn wm-btn-ghost mt-8">
          Advertise with WaitMint
        </Link>
      </article>
    </div>
  );
}
