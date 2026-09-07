export const siteConfig = {
  name: "WaitMint",
  tagline: "Your AI thinks. Your wait earns.",
  userHeading: "Monetize Your AI Wait Time",
  advertiserHeading: "Buy verified AI attention.",
  trustHeading: "Your conversations stay yours.",
  revenueLine:
    "You create the attention. You receive 60% of qualifying settled revenue.",
  qualificationLine: "No qualification. No charge. No earning.",
  description:
    "WaitMint turns real AI wait time into verified advertising attention. Use supported AI tools normally. When a qualifying sponsored wait settles, you receive 60% of the advertiser-funded revenue.",
} as const;

export function publicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (raw) return raw;
  if (process.env.NODE_ENV === "production") return "https://waitmint.ai";
  return "http://localhost:3000";
}

export function waitmintApiUrl(): string | null {
  const server = process.env.WAITMINT_API_URL?.replace(/\/$/, "");
  const pub = process.env.NEXT_PUBLIC_WAITMINT_API_URL?.replace(/\/$/, "");
  return server || pub || null;
}

export function isLoopbackUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
  } catch {
    return /localhost|127\.0\.0\.1|::1/.test(value);
  }
}

/** Production builds must not silently talk to a developer laptop. */
export function assertProductionUrls(): void {
  if (process.env.NODE_ENV !== "production") return;
  const api = waitmintApiUrl();
  if (api && isLoopbackUrl(api)) {
    throw new Error(
      "WAITMINT_API_URL must not point at localhost in production. Set it to the hosted WaitMint Exchange.",
    );
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && isLoopbackUrl(site)) {
    console.warn(
      "[WaitMint] NEXT_PUBLIC_SITE_URL is a loopback address in production. Canonical URLs should be https://waitmint.ai",
    );
  }
}

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function chromeExtensionUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CHROME_EXTENSION_URL ||
    "https://chromewebstore.google.com/"
  );
}

export const USER_SHARE_PERCENT = 60;
export const PLATFORM_SHARE_PERCENT = 40;
