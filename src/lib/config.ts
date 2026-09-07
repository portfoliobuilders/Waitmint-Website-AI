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
  return "http://localhost:3000";
}

export function waitmintApiUrl(): string | null {
  const server = process.env.WAITMINT_API_URL?.replace(/\/$/, "");
  const pub = process.env.NEXT_PUBLIC_WAITMINT_API_URL?.replace(/\/$/, "");
  return server || pub || null;
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
