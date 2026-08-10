import { describe, expect, test } from "bun:test";

import { addonPath, isValidAddonFilename } from "@/lib/addons";

describe("isValidAddonFilename", () => {
  test.each(["drizzle.md", "oxlint-oxfmt.md", "vitest2.md"])("accepts %p", (filename) => {
    expect(isValidAddonFilename(filename)).toBe(true);
  });

  test.each([
    "drizzle",
    "../package.md",
    "drizzle/../secret.md",
    "Drizzle.md",
    "drizzle.txt",
    "",
    "a b.md",
  ])("rejects %p", (filename) => {
    expect(isValidAddonFilename(filename)).toBe(false);
  });
});

describe("addonPath", () => {
  test("builds the raw markdown path for an addon", () => {
    expect(addonPath("drizzle.md")).toBe("/addons/drizzle.md");
  });
});
