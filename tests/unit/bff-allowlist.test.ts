import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const source = readFileSync(
  path.resolve(__dirname, "../../src/app/api/waitmint/[...path]/route.ts"),
  "utf8",
);

describe("website BFF allowlist", () => {
  it("does not proxy arbitrary userId wallet URLs", () => {
    expect(source).not.toContain("/exchange/wallet/");
    expect(source).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
  });

  it("only exposes authenticated /me and /ads surfaces", () => {
    expect(source).toContain("/api/v1/me/wallet");
    expect(source).toContain("/api/v1/auth/extension-link/create");
    expect(source).toContain("/api/ads/campaigns");
  });
});
