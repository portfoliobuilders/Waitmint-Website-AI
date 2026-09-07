import Link from "next/link";
import { WaitMintMark } from "@/components/marketing/mark";
import { siteConfig } from "@/lib/config";

const GROUPS = [
  {
    title: "Product",
    links: [
      { href: "/earn", label: "Earn" },
      { href: "/advertise", label: "Advertise" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/verified-attention", label: "Verified Attention" },
      { href: "/products", label: "Products" },
      { href: "/platforms", label: "Platforms" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/trust", label: "Trust" },
      { href: "/pricing", label: "Pricing" },
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
    <footer className="relative overflow-hidden border-t border-[var(--wm-line)]">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(600px_120px_at_50%_0%,rgba(62,230,182,0.12),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <WaitMintMark className="h-8 w-8" />
            <p className="text-sm font-medium">WaitMint</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-xs text-xs leading-5 text-[var(--wm-gold)]">
            Verified AI attention infrastructure. Not a lottery. Not a points game.
          </p>
        </div>
        {GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">{group.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--wm-text)]/80 transition-colors hover:text-[var(--wm-mint)]">
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
