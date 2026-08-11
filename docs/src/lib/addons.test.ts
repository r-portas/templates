import { describe, expect, test } from "bun:test";

import { addonPath, isListableAddonFilename, isValidAddonFilename } from "@/lib/addons";

describe("isValidAddonFilename", () => {
  test.each(["drizzle.md", "oxlint-oxfmt.md", "vitest2.md", "_template.md"])(
    "accepts %p",
    (filename) => {
      expect(isValidAddonFilename(filename)).toBe(true);
    },
  );

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

describe("isListableAddonFilename", () => {
  test("accepts a real addon filename", () => {
    expect(isListableAddonFilename("drizzle.md")).toBe(true);
  });

  test("rejects the authoring template", () => {
    expect(isListableAddonFilename("_template.md")).toBe(false);
  });
});

describe("addonPath", () => {
  test("builds the raw markdown path for an addon", () => {
    expect(addonPath("drizzle")).toBe("/addons/drizzle.md");
  });
});
