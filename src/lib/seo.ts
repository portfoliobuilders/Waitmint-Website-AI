import type { Metadata } from "next";
import { publicSiteUrl, siteConfig } from "@/lib/config";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = `${publicSiteUrl()}${input.path}`;
  const title = input.title.includes("WaitMint")
    ? input.title
    : `${input.title} · WaitMint`;
  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.index === false ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WaitMint",
    url: publicSiteUrl(),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
  };
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WaitMint",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
