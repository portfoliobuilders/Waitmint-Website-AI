import { describe, expect, it } from "vitest";
import { safeNextPath } from "@/lib/auth/paths";

describe("safeNextPath", () => {
  it("accepts same-origin relative paths only", () => {
    expect(safeNextPath("/dashboard", "/dashboard")).toBe("/dashboard");
    expect(safeNextPath("/advertiser", "/dashboard")).toBe("/advertiser");
    expect(safeNextPath("//evil.example", "/dashboard")).toBe("/dashboard");
    expect(safeNextPath("https://evil.example", "/dashboard")).toBe("/dashboard");
    expect(safeNextPath(undefined, "/onboarding")).toBe("/onboarding");
  });
});
