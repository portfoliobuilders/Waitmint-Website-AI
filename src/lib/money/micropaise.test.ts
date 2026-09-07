import { describe, expect, it } from "vitest";
import {
  asMicropaiseInteger,
  formatInrFromMicropaise,
  illustrativeUserShareMicropaise,
} from "./micropaise";

describe("micropaise display helpers", () => {
  it("accepts integers and digit strings only", () => {
    expect(asMicropaiseInteger(12472000)).toBe(12472000);
    expect(asMicropaiseInteger("600")).toBe(600);
    expect(asMicropaiseInteger(0.6)).toBeNull();
    expect(asMicropaiseInteger("1.2")).toBeNull();
    expect(asMicropaiseInteger(undefined)).toBeNull();
  });

  it("formats display rupees without inventing values", () => {
    expect(formatInrFromMicropaise(null)).toBe("—");
    expect(formatInrFromMicropaise(0)).toBe("₹0");
    expect(formatInrFromMicropaise(60)).toBe("₹0.0006");
    expect(formatInrFromMicropaise(12_472_000)).toMatch(/^₹/);
  });

  it("illustrative calculator uses integer floor math", () => {
    const qualifying = 10;
    const share = illustrativeUserShareMicropaise(qualifying, 10);
    expect(Number.isInteger(share)).toBe(true);
    expect(share).toBe(6_000);
  });
});
