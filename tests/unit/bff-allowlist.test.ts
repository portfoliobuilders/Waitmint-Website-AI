import { describe, expect, it } from "vitest";
import { isBffAllowed, normalizeExchangePath } from "@/lib/api/bff";

describe("website BFF allowlist", () => {
  it("allows authenticated consumer and ads surfaces", () => {
    expect(isBffAllowed("GET", "/api/v1/me/wallet")).toBe(true);
    expect(isBffAllowed("POST", "/api/v1/auth/extension-link/create")).toBe(true);
    expect(isBffAllowed("GET", "/api/ads/campaigns")).toBe(true);
  });

  it("does not proxy arbitrary wallet, admin sqlite, or foreign URLs", () => {
    expect(normalizeExchangePath(["v1", "exchange", "wallet", "someone"])).toBeNull();
    expect(isBffAllowed("GET", "/api/v1/exchange/wallet/abc")).toBe(false);
    expect(isBffAllowed("POST", "/api/v1/admin/reset")).toBe(false);
    expect(normalizeExchangePath(["https:", "evil.example"])).toBeNull();
    expect(normalizeExchangePath(["v1", "..", "secret"])).toBeNull();
    expect(normalizeExchangePath(["v1", "me", "..", "admin"])).toBeNull();
  });

  it("does not allow service-role or unlisted methods", () => {
    expect(isBffAllowed("DELETE", "/api/v1/me")).toBe(false);
    expect(isBffAllowed("GET", "/api/v1/me/wallet/../admin")).toBe(false);
  });
});
