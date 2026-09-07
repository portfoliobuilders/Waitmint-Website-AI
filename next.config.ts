import type { NextConfig } from "next";

const waitmintApi = process.env.WAITMINT_API_URL?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
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
