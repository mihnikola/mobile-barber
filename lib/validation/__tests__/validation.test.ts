import { describe, expect, it } from "@jest/globals";

import { confirmPasswordProblem, isStrongPassword, isValidEmail } from "..";

describe("isValidEmail (one rule for the whole app, B23)", () => {
  it.each(["a@b.co", "first.last+tag@mail.example.rs", "x_y-z%1@sub.domain.com"])("accepts %s", (v) => {
    expect(isValidEmail(v)).toBe(true);
  });
  it.each(["", "plain", "a@b", "a@b.c", "a b@c.com", " a@b.com", "a@b.com ", "a@@b.com"])("rejects %p", (v) => {
    expect(isValidEmail(v)).toBe(false);
  });
});

describe("isStrongPassword", () => {
  it.each(["Abcdefg1!", "Password1.", "ZZZZZZZ9~", "1Abcdefg#"])("accepts %s", (v) => expect(isStrongPassword(v)).toBe(true));
  it.each(["Abc1!", "abcdefg1!", "Abcdefgh!", "Abcdefgh1"])("rejects %s", (v) => expect(isStrongPassword(v)).toBe(false));
});

describe("confirmPasswordProblem (same rule as the password, B23)", () => {
  it("mismatch first", () => expect(confirmPasswordProblem("Abcdefg1!", "Abcdefg1?")).toBe("mismatch"));
  it("ignores surrounding spaces", () => expect(confirmPasswordProblem("Abcdefg1!", " Abcdefg1! ")).toBe(null));
  it("weak when equal but not strong", () => expect(confirmPasswordProblem("abc", "abc")).toBe("weak"));
  it("accepts any special character, like the password field", () =>
    expect(confirmPasswordProblem("Password1.", "Password1.")).toBe(null));
  it("valid → null", () => expect(confirmPasswordProblem("Abcdefg1!", "Abcdefg1!")).toBe(null));
});
