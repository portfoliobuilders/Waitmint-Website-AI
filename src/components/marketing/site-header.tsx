"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WaitMintMark } from "@/components/marketing/mark";
import { chromeExtensionUrl } from "@/lib/config";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/earn", label: "Earn" },
  { href: "/advertise", label: "Advertise" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/trust", label: "Trust" },
];

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  const store = chromeExtensionUrl();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--wm-line)] bg-[rgba(5,6,10,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-medium">
          <WaitMintMark className="h-8 w-8" />
          WaitMint
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[var(--wm-muted)] md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-[var(--wm-text)]",
                  current && "text-[var(--wm-text)]",
                )}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
                {current ? (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-[var(--wm-mint)]" aria-hidden />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {signedIn ? (
            <Link href="/dashboard" className="text-sm text-[var(--wm-muted)] hover:text-[var(--wm-text)]">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="text-sm text-[var(--wm-muted)] hover:text-[var(--wm-text)]">
              Login
            </Link>
          )}
          <a href={store} className="wm-btn wm-btn-primary px-4">
            Get WaitMint
          </a>
        </div>
        <details className="relative md:hidden">
          <summary
            className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--wm-line)] [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden>☰</span>
          </summary>
          <nav
            id="mobile-nav"
            className="fixed inset-x-3 top-[4.35rem] z-[80] rounded-2xl border border-[var(--wm-line-strong)] bg-[#0c0e15] px-3 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.75)]"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="flex min-h-11 items-center rounded-lg px-3 text-sm">
                {item.label}
              </Link>
            ))}
            <Link href={signedIn ? "/dashboard" : "/login"} className="flex min-h-11 items-center px-3 text-sm">
              {signedIn ? "Dashboard" : "Login"}
            </Link>
            <a
              href={store}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--wm-mint)] text-sm font-medium text-[#04110c]"
            >
              Get WaitMint
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
