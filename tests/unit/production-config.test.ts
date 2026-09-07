import { describe, expect, it } from "vitest";
import { isLoopbackUrl, resolvePublicSiteUrl } from "@/lib/config";
import { linkedExtensionsFromPayload } from "@/lib/api/types";

describe("production URL safety", () => {
  it("detects localhost Exchange URLs", () => {
    expect(isLoopbackUrl("http://localhost:3001")).toBe(true);
    expect(isLoopbackUrl("http://127.0.0.1:3001")).toBe(true);
    expect(isLoopbackUrl("https://waitmint.ai")).toBe(false);
    expect(isLoopbackUrl(null)).toBe(false);
  });

  it("uses the explicit public site URL when it is not a production loopback", () => {
    expect(
      resolvePublicSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://waitmintai.vercel.app",
        NODE_ENV: "production",
      }),
    ).toBe("https://waitmintai.vercel.app");
  });

  it("prefers the Vercel production alias over waitmint.ai when SITE_URL is unset", () => {
    expect(
      resolvePublicSiteUrl({
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        VERCEL_PROJECT_PRODUCTION_URL: "waitmintai.vercel.app",
      }),
    ).toBe("https://waitmintai.vercel.app");
  });

  it("uses the preview deployment host on Vercel preview builds", () => {
    expect(
      resolvePublicSiteUrl({
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        VERCEL_URL: "waitmintai-git-example.vercel.app",
      }),
    ).toBe("https://waitmintai-git-example.vercel.app");
  });

  it("ignores localhost SITE_URL in production and falls back to the Vercel alias", () => {
    expect(
      resolvePublicSiteUrl({
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        VERCEL_ENV: "production",
        VERCEL_PROJECT_PRODUCTION_URL: "waitmintai.vercel.app",
      }),
    ).toBe("https://waitmintai.vercel.app");
  });
});

describe("extension payload aliases", () => {
  it("reads engine extensions without dropping linked installs", () => {
    const rows = linkedExtensionsFromPayload({
      extensions: [
        {
          id: "inst-1",
          extensionInstallId: "aaaa",
          linkedAt: "2026-09-07T00:00:00.000Z",
        },
      ],
    });
    expect(rows).toHaveLength(1);
    expect(rows[0]?.id).toBe("inst-1");
  });
});
