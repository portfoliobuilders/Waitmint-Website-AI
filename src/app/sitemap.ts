import type { MetadataRoute } from "next";
import { publicSiteUrl } from "@/lib/config";

const paths = [
  "/",
  "/earn",
  "/advertise",
  "/how-it-works",
  "/verified-attention",
  "/platforms",
  "/trust",
  "/pricing",
  "/about",
  "/blog",
  "/faq",
  "/privacy",
  "/terms",
  "/login",
  "/signup",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicSiteUrl();
  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
