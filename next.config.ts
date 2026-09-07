import type { NextConfig } from "next";
import { assertProductionUrls, isLoopbackUrl } from "./src/lib/config";

assertProductionUrls();

const rawApi = process.env.WAITMINT_API_URL?.replace(/\/$/, "") ?? "";
const waitmintApi =
  process.env.NODE_ENV === "production" && isLoopbackUrl(rawApi) ? "" : rawApi;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async rewrites() {
    if (!waitmintApi) return [];
    return [
      {
        source: "/exchange-api/ads/:path*",
        destination: `${waitmintApi}/api/ads/:path*`,
      },
    ];
  },
};

export default nextConfig;
