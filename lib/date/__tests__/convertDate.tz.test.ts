import { describe, expect, it } from "@jest/globals";

// Node applies TZ changes at runtime; Belgrade is UTC+1/+2, where the old code showed the wrong date.
process.env.TZ = "Europe/Belgrade";

import { convertDate } from "..";

describe("convertDate around local midnight (B24)", () => {
  it("00:30 local on Sat 15 Mar 2025 stays Saturday the 15th", () => {
    const localHalfPastMidnight = new Date(2025, 2, 15, 0, 30);
    // before the fix: weekday Saturday (local) but date 14 (UTC) → "Subota 14. Mart 2025."
    expect(convertDate(localHalfPastMidnight, "sr")).toBe("Subota 15. Mart 2025.");
  });
  it("ISO string from the backend", () => {
    expect(convertDate("2025-03-14T23:30:00Z", "en")).toBe("Saturday 15. March 2025.");
  });
});
