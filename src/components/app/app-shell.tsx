"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type AppArea = "earn" | "advertise" | "admin";

const NAV: Record<AppArea, Array<{ href: string; label: string }>> = {
  earn: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/wallet", label: "Wallet" },
    { href: "/dashboard/earnings", label: "Earnings" },
    { href: "/dashboard/activity", label: "Activity" },
    { href: "/dashboard/payouts", label: "Payouts" },
    { href: "/dashboard/extension", label: "Extension" },
    { href: "/dashboard/settings", label: "Settings" },
    { href: "/dashboard/security", label: "Security" },
  ],
  advertise: [
    { href: "/advertiser", label: "Overview" },
    { href: "/advertiser/campaigns", label: "Campaigns" },
    { href: "/advertiser/analytics", label: "Analytics" },
    { href: "/advertiser/billing", label: "Billing" },
    { href: "/advertiser/creatives", label: "Creatives" },
    { href: "/advertiser/settings", label: "Settings" },
  ],
  admin: [
    { href: "/admin", label: "Overview" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/advertisers", label: "Advertisers" },
    { href: "/admin/campaigns", label: "Campaigns" },
    { href: "/admin/funding", label: "Funding" },
    { href: "/admin/payouts", label: "Payouts" },
    { href: "/admin/surfaces", label: "Surfaces" },
    { href: "/admin/settlements", label: "Settlements" },
    { href: "/admin/system", label: "System" },
  ],
};

export function AppShell({
  area,
  email,
  canAdvertise,
  isAdmin,
  children,
}: {
  area: AppArea;
  email?: string | null;
  canAdvertise?: boolean;
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = NAV[area];

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-30 border-b border-[var(--wm-line)] bg-[rgba(7,8,11,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium">
              WaitMint
            </Link>
            {(canAdvertise || isAdmin) && (
              <div className="hidden rounded-full border border-[var(--wm-line)] p-1 text-xs sm:flex">
                <Link
                  href="/dashboard"
                  className={cn(
                    "inline-flex min-h-9 items-center rounded-full px-3",
                    area === "earn" && "bg-white/8",
                  )}
                >
                  Earn
                </Link>
                {canAdvertise ? (
                  <Link
                    href="/advertiser"
                    className={cn(
                      "inline-flex min-h-9 items-center rounded-full px-3",
                      area === "advertise" && "bg-white/8",
                    )}
                  >
                    Advertise
                  </Link>
                ) : null}
                {isAdmin ? (
                  <Link
                    href="/admin"
                    className={cn(
                      "inline-flex min-h-9 items-center rounded-full px-3",
                      area === "admin" && "bg-white/8",
                    )}
                  >
                    Admin
                  </Link>
                ) : null}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[var(--wm-muted)] sm:inline">{email}</span>
            <form action="/api/auth/signout" method="post">
              <button className="text-sm text-[var(--wm-muted)] hover:text-[var(--wm-text)]" type="submit">
                Log out
              </button>
            </form>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--wm-line)] lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              ☰
            </button>
          </div>
        </div>
        <nav className="mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-4 pb-3 lg:flex" aria-label="Account">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full px-3 text-sm whitespace-nowrap",
                pathname === item.href
                  ? "bg-[var(--wm-mint-dim)] text-[var(--wm-mint)]"
                  : "text-[var(--wm-muted)] hover:text-[var(--wm-text)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {open ? (
          <nav className="border-t border-[var(--wm-line)] px-4 py-3 lg:hidden">
            {(canAdvertise || isAdmin) ? (
              <div className="mb-3 flex flex-wrap gap-2">
                <Link href="/dashboard" className="inline-flex min-h-11 items-center rounded-full border border-[var(--wm-line)] px-3 text-sm">
                  Earn
                </Link>
                {canAdvertise ? (
                  <Link href="/advertiser" className="inline-flex min-h-11 items-center rounded-full border border-[var(--wm-line)] px-3 text-sm">
                    Advertise
                  </Link>
                ) : null}
                {isAdmin ? (
                  <Link href="/admin" className="inline-flex min-h-11 items-center rounded-full border border-[var(--wm-line)] px-3 text-sm">
                    Admin
                  </Link>
                ) : null}
              </div>
            ) : null}
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
