import Link from "next/link";
import { siteConfig } from "@/lib/config";

const GROUPS = [
  {
    title: "Product",
    links: [
      { href: "/earn", label: "Earn" },
      { href: "/advertise", label: "Advertise" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/products", label: "Products" },
      { href: "/platforms", label: "Platforms" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/trust", label: "Trust" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--wm-line)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-sm font-medium">WaitMint</p>
          <p className="mt-2 text-sm text-[var(--wm-muted)]">{siteConfig.tagline}</p>
        </div>
        {GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">{group.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--wm-mint)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
