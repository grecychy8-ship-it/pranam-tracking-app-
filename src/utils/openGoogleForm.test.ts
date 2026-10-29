import { describe, expect, it } from "vitest";
import { isValidFormUrl } from "./openGoogleForm";

describe("isValidFormUrl", () => {
  it("accepts a standard responder link", () => {
    expect(isValidFormUrl("https://docs.google.com/forms/d/e/abc123/viewform")).toBe(true);
  });
  it("accepts forms.gle short links", () => {
    expect(isValidFormUrl("https://forms.gle/AbC123")).toBe(true);
  });
  it("rejects admin edit links", () => {
    expect(isValidFormUrl("https://docs.google.com/forms/d/abc123/edit")).toBe(false);
  });
  it("rejects non-https and empty links", () => {
    expect(isValidFormUrl("http://forms.gle/AbC123")).toBe(false);
    expect(isValidFormUrl("")).toBe(false);
  });
});
