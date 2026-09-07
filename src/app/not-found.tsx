import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-mint)]">404</p>
      <h1 className="font-display mt-4 text-4xl">This page is not on the ledger.</h1>
      <p className="mt-3 max-w-md text-[var(--wm-muted)]">
        The route you asked for does not exist. No balances were affected.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
      >
        Back to WaitMint
      </Link>
    </main>
  );
}
