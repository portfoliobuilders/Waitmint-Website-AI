import Link from "next/link";
import { chromeExtensionUrl } from "@/lib/config";

const NAV = [
  { href: "/earn", label: "Earn" },
  { href: "/advertise", label: "Advertise" },
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/trust", label: "Trust" },
];

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  const store = chromeExtensionUrl();

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
            href={store}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-4 text-sm font-medium text-[#04110c]"
          >
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
            className="absolute right-0 z-50 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] px-3 py-3"
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
