import Link from "next/link";
import { chromeExtensionUrl } from "@/lib/config";
import { requireUser } from "@/lib/auth/guards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Welcome",
  description: "Get started with WaitMint.",
  path: "/onboarding",
  index: false,
});

const STEPS = [
  ["1", "Welcome to WaitMint", "One account. One wallet. Real advertiser-funded settlement."],
  ["2", "Install the extension", "Keep using supported AI products normally."],
  ["3", "Connect this browser", "Generate a one-time code on the Extension page and enter it in the popup."],
  ["4", "Start using supported AI", "Earnings appear only after a qualifying impression settles."],
];

export default async function OnboardingPage() {
  await requireUser();
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-mint)]">Onboarding</p>
      <h1 className="font-display mt-3 text-4xl">Welcome to WaitMint</h1>
      <ol className="mt-10 space-y-4">
        {STEPS.map(([n, title, body]) => (
          <li key={n} className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-5">
            <p className="font-mono text-xs text-[var(--wm-mint)]">{n}</p>
            <h2 className="mt-2 text-lg font-medium">{title}</h2>
            <p className="mt-1 text-sm text-[var(--wm-muted)]">{body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={chromeExtensionUrl()}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
        >
          Install extension
        </a>
        <Link
          href="/dashboard/extension"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
        >
          Connect this browser
        </Link>
      </div>
    </main>
  );
}
