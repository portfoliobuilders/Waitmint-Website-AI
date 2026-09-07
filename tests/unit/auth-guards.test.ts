import { describe, expect, it } from "vitest";
import { campaignStatusLabel, entryTypeLabel } from "@/lib/api/types";

describe("status labels", () => {
  it("maps backend campaign enums without inventing write values", () => {
    expect(campaignStatusLabel("pending_review")).toBe("Submitted");
    expect(campaignStatusLabel("draft")).toBe("Draft");
    expect(campaignStatusLabel("exhausted")).toBe("Exhausted");
  });

  it("labels ledger types for display only", () => {
    expect(entryTypeLabel("direct_ad_earning")).toBe("Sponsored wait earning");
    expect(entryTypeLabel("redemption_request")).toBe("Redemption");
  });
});
