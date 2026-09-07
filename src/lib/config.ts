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

function withHttps(host: string): string {
  if (host.startsWith("http://") || host.startsWith("https://")) return host;
  return `https://${host}`;
}

/** Resolves the public origin. Prefer an explicit SITE_URL, then Vercel aliases, then waitmint.ai. */
export function resolvePublicSiteUrl(env: NodeJS.Dict<string> = process.env): string {
  const raw = env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (raw && !(env.NODE_ENV === "production" && isLoopbackUrl(raw))) {
    return raw;
  }

  const productionHost = env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "");
  if (env.VERCEL_ENV === "production" && productionHost) {
    return withHttps(productionHost);
  }

  const deploymentHost = env.VERCEL_URL?.replace(/\/$/, "");
  if (deploymentHost) {
    return withHttps(deploymentHost);
  }

  if (productionHost) {
    return withHttps(productionHost);
  }

  if (env.NODE_ENV === "production") return "https://waitmint.ai";
  return "http://localhost:3000";
}

export function publicSiteUrl(): string {
  return resolvePublicSiteUrl();
}

export function waitmintApiUrl(): string | null {
  const server = process.env.WAITMINT_API_URL?.replace(/\/$/, "");
  const pub = process.env.NEXT_PUBLIC_WAITMINT_API_URL?.replace(/\/$/, "");
  const api = server || pub || null;
  if (api && process.env.NODE_ENV === "production" && isLoopbackUrl(api)) {
    return null;
  }
  return api;
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
  const rawApi = process.env.WAITMINT_API_URL || process.env.NEXT_PUBLIC_WAITMINT_API_URL;
  if (rawApi && isLoopbackUrl(rawApi)) {
    throw new Error(
      "WAITMINT_API_URL must not point at localhost in production. Leave it unset until the hosted WaitMint Exchange exists, or set it to that hosted origin.",
    );
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && isLoopbackUrl(site)) {
    console.warn(
      "[WaitMint] NEXT_PUBLIC_SITE_URL is a loopback address in production. Set it to the live Vercel alias (https://waitmintai.vercel.app) or https://waitmint.ai.",
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
