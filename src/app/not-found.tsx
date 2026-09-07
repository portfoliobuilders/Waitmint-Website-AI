import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="wm-hero-veil" aria-hidden />
      <p className="wm-kicker relative">404</p>
      <h1 className="font-display relative mt-4 text-4xl sm:text-5xl">This page is not on the ledger.</h1>
      <p className="relative mt-3 max-w-md text-[var(--wm-muted)]">
        The route you asked for does not exist. No balances were affected.
      </p>
      <Link
        href="/"
        className="wm-btn wm-btn-primary relative mt-8"
      >
        Back to WaitMint
      </Link>
    </main>
  );
}
