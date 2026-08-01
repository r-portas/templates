import { describe, expect, test } from "bun:test";

import { addonPath, isValidAddonSlug, parseFrontmatter } from "@/lib/addons";

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

describe("isValidAddonSlug", () => {
  test.each(["drizzle", "oxlint-oxfmt", "vitest2"])("accepts %p", (slug) => {
    expect(isValidAddonSlug(slug)).toBe(true);
  });

  test.each(["../package", "drizzle/../secret", "Drizzle", "drizzle.md", "", "a b"])(
    "rejects %p",
    (slug) => {
      expect(isValidAddonSlug(slug)).toBe(false);
    },
  );
});

describe("addonPath", () => {
  test("builds the raw markdown path for an addon", () => {
    expect(addonPath("drizzle")).toBe("/addons/drizzle.md");
  });
});
