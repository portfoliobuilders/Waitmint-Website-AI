import type { NextConfig } from "next";
import { assertProductionUrls } from "./src/lib/config";

assertProductionUrls();

const waitmintApi = process.env.WAITMINT_API_URL?.replace(/\/$/, "") ?? "";

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
