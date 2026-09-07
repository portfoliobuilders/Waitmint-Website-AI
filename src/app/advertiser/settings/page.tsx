import Link from "next/link";
import { ConsoleGate } from "@/components/app/console-gate";
import { requireUser } from "@/lib/auth/guards";
import { callWaitmint } from "@/lib/api/waitmint";
import type { MePayload } from "@/lib/api/types";

export default async function AdvertiserSettingsPage() {
  const { session, user } = await requireUser();
  const token = session?.access_token;
  if (!token) {
    return (
      <ConsoleGate
        title="Advertiser settings"
        body="Organization membership is stored on the Exchange. Use the same WaitMint login to switch back to Earn."
        kind="unconfigured"
      />
    );
  }

  const me = await callWaitmint<MePayload>("/api/ads/me", { accessToken: token });
  if (!me.ok) {
    return (
      <ConsoleGate
        title="Advertiser settings"
        body="Organization membership is stored on the Exchange. Use the same WaitMint login to switch back to Earn."
        kind={me.kind === "error" ? "offline" : me.kind}
        message={me.message}
      />
    );
  }

  return (
    <div>
      <h1 className="font-display text-4xl">Advertiser settings</h1>
      <p className="mt-2 max-w-xl text-sm text-[var(--wm-muted)]">
        One WaitMint identity. This page does not create a second advertiser password or wallet.
      </p>
      <dl className="mt-8 space-y-6 text-sm">
        <div>
          <dt className="text-[var(--wm-muted)]">Email</dt>
          <dd className="mt-1">{user?.email || me.data.actor.email || "—"}</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Company onboarding</dt>
          <dd className="mt-1">{me.data.onboarded ? "Onboarded on the Exchange" : "Not onboarded yet"}</dd>
        </div>
        <div>
          <dt className="text-[var(--wm-muted)]">Member role</dt>
          <dd className="mt-1">{me.data.org?.memberRole || "—"}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {me.data.onboarded ? (
          <Link
            href="/advertiser/campaigns/new"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            New campaign
          </Link>
        ) : (
          <Link
            href="/advertiser/onboarding"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            Start onboarding
          </Link>
        )}
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
        >
          Back to Earn
        </Link>
      </div>
    </div>
  );
}
