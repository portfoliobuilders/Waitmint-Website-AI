import { describe, expect, it } from "vitest";
import { isLoopbackUrl } from "@/lib/config";
import { linkedExtensionsFromPayload } from "@/lib/api/types";

describe("production URL safety", () => {
  it("detects localhost Exchange URLs", () => {
    expect(isLoopbackUrl("http://localhost:3001")).toBe(true);
    expect(isLoopbackUrl("http://127.0.0.1:3001")).toBe(true);
    expect(isLoopbackUrl("https://waitmint.ai")).toBe(false);
    expect(isLoopbackUrl(null)).toBe(false);
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
