import { describe, expect, test } from "bun:test";

import { addonPath, isValidAddonFilename, parseFrontmatter } from "@/lib/addons";

describe("parseFrontmatter", () => {
  test("parses the fields of a leading frontmatter block", () => {
    const source = [
      "---",
      "name: drizzle",
      "description: Add Drizzle ORM",
      "---",
      "",
      "# Drizzle",
    ].join("\n");

    expect(parseFrontmatter(source)).toEqual({
      name: "drizzle",
      description: "Add Drizzle ORM",
    });
  });

  test("keeps colons that appear in the value", () => {
    const source = ["---", "description: Uses a url: file:./local.db", "---"].join("\n");

    expect(parseFrontmatter(source).description).toBe("Uses a url: file:./local.db");
  });

  test("strips matching surrounding quotes", () => {
    const source = ["---", `name: "drizzle"`, "description: 'Add Drizzle ORM'", "---"].join("\n");

    expect(parseFrontmatter(source)).toEqual({
      name: "drizzle",
      description: "Add Drizzle ORM",
    });
  });

  test("handles carriage returns", () => {
    expect(parseFrontmatter("---\r\nname: drizzle\r\n---\r\n")).toEqual({ name: "drizzle" });
  });

  test("returns nothing when there is no frontmatter", () => {
    expect(parseFrontmatter("# Drizzle\n\nSome content")).toEqual({});
  });

  test("ignores a frontmatter block that does not start the document", () => {
    expect(parseFrontmatter("# Drizzle\n\n---\nname: drizzle\n---")).toEqual({});
  });
});

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
