import { describe, expect, it } from "vitest";
import { WAITMINT_PRODUCTS, productById } from "./products";

describe("WaitMint product catalog", () => {
  it("exposes extension, sdk, and app without extra wallets", () => {
    expect(WAITMINT_PRODUCTS.map((product) => product.id)).toEqual(["extension", "sdk", "app"]);
    expect(productById("extension").status).toBe("available");
    expect(productById("sdk").status).toBe("waitlist");
    expect(productById("app").status).toBe("waitlist");
    expect(productById("extension").dashboardHref).toContain("/dashboard/connections");
    expect(new Set(WAITMINT_PRODUCTS.map((product) => product.dashboardHref)).size).toBe(3);
  });
});
