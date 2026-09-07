"use client";

import Link from "next/link";
import { useState } from "react";
import { chromeExtensionUrl } from "@/lib/config";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/earn", label: "Earn" },
  { href: "/advertise", label: "Advertise" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/platforms", label: "Platforms" },
  { href: "/trust", label: "Trust" },
];

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--wm-line)] bg-[rgba(7,8,11,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--wm-mint)] text-[#04110c]">
            W
          </span>
          WaitMint
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[var(--wm-muted)] md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--wm-text)]">
              {item.label}
            </Link>
          ))}
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
          <a
            href={chromeExtensionUrl()}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-4 text-sm font-medium text-[#04110c]"
          >
            Get WaitMint
          </a>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--wm-line)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className={cn("block h-px w-4 bg-[var(--wm-text)]", open && "rotate-45")} />
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-[var(--wm-line)] px-4 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={signedIn ? "/dashboard" : "/login"} className="flex min-h-11 items-center px-3 text-sm">
              {signedIn ? "Dashboard" : "Login"}
            </Link>
            <a
              href={chromeExtensionUrl()}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] text-sm font-medium text-[#04110c]"
            >
              Get WaitMint
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
