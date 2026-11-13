import { describe, expect, it } from "@jest/globals";

import { formatDuration, formatPrice, formatRating } from "..";
import { addMinutesToTime, formatTimeRange } from "@/lib/date";

describe("display formats (Phase 5.7)", () => {
  it("duration", () => {
    expect(formatDuration(30)).toBe("30 min");
    expect(formatDuration("45")).toBe("45 min");
    expect(formatDuration(undefined)).toBe("");
    expect(formatDuration(NaN)).toBe("");
  });
  it("price", () => {
    expect(formatPrice(1200)).toBe("1.200 RSD");
    expect(formatPrice(1200, "en")).toBe("1,200 RSD");
    expect(formatPrice(800)).toBe("800 RSD");
    expect(formatPrice(1234567)).toBe("1.234.567 RSD");
    expect(formatPrice(null)).toBe("");
    expect(formatPrice("abc")).toBe("");
  });
  it("rating", () => {
    expect(formatRating(4.25)).toBe("4.3");
    expect(formatRating(undefined)).toBe("–");
  });
  it("time range", () => {
    expect(formatTimeRange("16:00", "16:50")).toBe("16:00 – 16:50");
    expect(formatTimeRange("16:00", "")).toBe("16:00");
    expect(formatTimeRange(undefined, undefined)).toBe("");
    expect(addMinutesToTime("16:00", 30, 20)).toBe("16:50");
    expect(addMinutesToTime("16:00", undefined as unknown as number)).toBe("");
  });
});
