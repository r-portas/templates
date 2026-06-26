---
name: create-template
description: Assist the human with creating a new template
---

## Things to check for the human

- Is the templating using the common tooling as defined in "Common Tooling" @README.md?
- Does the template's README.md file follow the same structure as other templates?
- Is the template minimal? Is there any unnecessary code or dependencies that can be removed?
  - Does the `package.json` follow the same structure as the other templates? Have we striped out any unnecessary fields?
  - Does the `tsconfig.json` follow the same structure as the other templates? Noting that the configuration might need to change based on the template's requirements
