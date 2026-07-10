import { describe, expect, test } from "bun:test";

import { githubUrl, gitpickCommand, GITPICK_REPO } from "@/lib/gitpick";

describe("gitpickCommand", () => {
  test("defaults the project name to my-project", () => {
    expect(gitpickCommand("react")).toBe(
      `bunx --bun gitpick ${GITPICK_REPO}/tree/main/templates/react my-project`,
    );
  });

  test("uses a custom project name when given", () => {
    expect(gitpickCommand("tss-shadcn", "my-app")).toBe(
      `bunx --bun gitpick ${GITPICK_REPO}/tree/main/templates/tss-shadcn my-app`,
    );
  });
});

describe("githubUrl", () => {
  test("builds the github tree url for a template", () => {
    expect(githubUrl("tss")).toBe(`https://github.com/${GITPICK_REPO}/tree/main/templates/tss`);
  });
});
