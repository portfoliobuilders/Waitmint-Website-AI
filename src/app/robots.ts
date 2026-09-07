import type { MetadataRoute } from "next";
import { publicSiteUrl } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/advertiser", "/admin", "/api", "/onboarding"],
      },
    ],
    sitemap: `${publicSiteUrl()}/sitemap.xml`,
  };
}
