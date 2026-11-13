import { describe, expect, it } from "@jest/globals";

import {
  CONFIRM_PASSWORD_MESSAGES,
  confirmPasswordError,
  isEmailLike,
  isStrongConfirmPassword,
  isStrongPassword,
  isValidEmail,
} from "..";

describe("isValidEmail (strict)", () => {
  it.each(["a@b.co", "first.last+tag@mail.example.rs", "x_y-z%1@sub.domain.com"])("accepts %s", (v) => {
    expect(isValidEmail(v)).toBe(true);
  });
  it.each(["", "plain", "a@b", "a@b.c", "a b@c.com", " a@b.com", "a@b.com ", "a@@b.com"])("rejects %p", (v) => {
    expect(isValidEmail(v)).toBe(false);
  });
});

describe("isEmailLike (loose)", () => {
  it("accepts what the strict rule accepts", () => expect(isEmailLike("a@b.co")).toBe(true));
  it("is looser than the strict rule (B23)", () => {
    expect(isEmailLike("a@b.c")).toBe(true);
    expect(isValidEmail("a@b.c")).toBe(false);
  });
  it("rejects spaces", () => expect(isEmailLike("a b@c.com")).toBe(false));
});

describe("isStrongPassword", () => {
  it.each(["Abcdefg1!", "Password1.", "ZZZZZZZ9~"])("accepts %s", (v) => expect(isStrongPassword(v)).toBe(true));
  it.each(["Abc1!", "abcdefg1!", "Abcdefgh!", "Abcdefgh1"])("rejects %s", (v) => expect(isStrongPassword(v)).toBe(false));
});

describe("isStrongConfirmPassword (stricter, B23)", () => {
  it("accepts only #@$!%*?& as special", () => {
    expect(isStrongConfirmPassword("Abcdefg1!")).toBe(true);
    expect(isStrongConfirmPassword("Password1.")).toBe(false);
    expect(isStrongPassword("Password1.")).toBe(true);
  });
});

describe("confirmPasswordError", () => {
  it("reports mismatch first", () =>
    expect(confirmPasswordError("Abcdefg1!", "Abcdefg1?")).toBe(CONFIRM_PASSWORD_MESSAGES.mismatch));
  it("compares the raw input (trailing space = mismatch)", () =>
    expect(confirmPasswordError("Abcdefg1!", "Abcdefg1! ")).toBe(CONFIRM_PASSWORD_MESSAGES.mismatch));
  it("reports weak when equal but not strong", () =>
    expect(confirmPasswordError("abc", "abc")).toBe(CONFIRM_PASSWORD_MESSAGES.weak));
  it("returns empty string when valid", () => expect(confirmPasswordError("Abcdefg1!", "Abcdefg1!")).toBe(""));
});
