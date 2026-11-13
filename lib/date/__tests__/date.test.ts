import { describe, expect, it } from "@jest/globals";

import {
  addMinutesToTime,
  convertDate,
  convertDateDetails,
  convertDayInitalValue,
  convertToDay,
  convertToDayTime,
  convertToMonthName,
  getCurrentUTCOffset,
  getTimeForUTCOffset,
} from "..";
import { getInitialsName, roundValue } from "../../format";

describe("addMinutesToTime", () => {
  it("adds minutes", () => expect(addMinutesToTime("09:30", 45)).toBe("10:15"));
  it("adds extra service duration", () => expect(addMinutesToTime("09:30", 30, 15)).toBe("10:15"));
  it("pads and wraps past midnight", () => expect(addMinutesToTime("23:50", 20)).toBe("00:10"));
});

describe("simple string conversions", () => {
  it("convertToMonthName", () => expect(convertToMonthName("15. 03. 2025")).toBe("MAR"));
  it("convertDayInitalValue", () => expect(convertDayInitalValue("15/03/2025, 10:00")).toBe("2025-03-15"));
  it("convertToDay", () => expect(convertToDay("15. 03. 2025")).toBe("15"));
  it("convertToDayTime pads", () => expect(convertToDayTime("15.03.2025 9:5")).toBe("09:05"));
  it("convertToDayTime keeps 2 digits", () => expect(convertToDayTime("15.03.2025 14:30")).toBe("14:30"));
});

describe("convertDateDetails (2025-03-15 is a Saturday)", () => {
  it("sr", () => expect(convertDateDetails("15. 03. 2025", "sr")).toBe("Subota 15. Mart 2025."));
  it("en", () => expect(convertDateDetails("15. 03. 2025", "en")).toBe("Saturday 15. March 2025."));
});

describe("convertDate", () => {
  // noon UTC → same calendar day in every timezone between UTC-11 and UTC+11
  it("sr", () => expect(convertDate("2025-03-15T12:00:00Z", "sr")).toBe("Subota 15. Mart 2025."));
  it("en", () => expect(convertDate("2025-03-15T12:00:00Z", "en")).toBe("Saturday 15. March 2025."));
});

describe("UTC offset helpers", () => {
  it("getCurrentUTCOffset has a sign", () => expect(getCurrentUTCOffset()).toMatch(/^[+-]\d+(\.\d+)?$/));
  it("getTimeForUTCOffset format", () => expect(getTimeForUTCOffset("+2")).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/));
  it("+0 equals current UTC time (minute precision)", () => {
    const utcNow = new Date().toISOString().slice(0, 16);
    expect(getTimeForUTCOffset("+0").slice(0, 16)).toBe(utcNow);
  });
});

describe("format", () => {
  it("roundValue", () => expect(roundValue(4.25)).toBe(4.3));
  it("roundValue undefined → NaN", () => expect(roundValue(undefined)).toBeNaN());
  it.each([
    ["Marko Marković", "MM"],
    ["Ana", "AN"],
    ["Jovan Petar Ilić", "JO"],
    ["  ana  ", "AN"],
    ["", undefined],
    [null, undefined],
  ])("getInitialsName(%p) = %p", (input, out) => expect(getInitialsName(input as string)).toBe(out));
});

describe("expired pending requests (B28)", () => {
  const { isExpiredPending, parseListDate } = require("..");
  const now = new Date(2026, 10, 13, 12, 0);
  it("parses list dates", () => {
    expect(parseListDate("10.11.2026 21:10")?.getTime()).toBe(new Date(2026, 10, 10, 21, 10).getTime());
    expect(parseListDate("15. 03. 2025 9:5")?.getTime()).toBe(new Date(2025, 2, 15, 9, 5).getTime());
    expect(parseListDate("")).toBeNull();
  });
  it("pending in the past is expired, future or other statuses are not", () => {
    expect(isExpiredPending({ status: 2, startDate: "10.11.2026 21:10" }, now)).toBe(true);
    expect(isExpiredPending({ status: 2, startDate: "18.11.2026 11:40" }, now)).toBe(false);
    expect(isExpiredPending({ status: 1, startDate: "10.11.2026 21:10" }, now)).toBe(false);
    expect(isExpiredPending({ status: 2, expirationDate: "2026-11-14T10:00:00Z", startDate: "10.11.2026 21:10" }, now)).toBe(false);
  });
});
