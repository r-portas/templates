export const GITPICK_REPO = "r-portas/templates";

export function gitpickCommand(templateName: string, projectName = "my-project") {
  return `bunx --bun gitpick ${GITPICK_REPO}/tree/main/templates/${templateName} ${projectName}`;
}

export function githubUrl(templateName: string) {
  return `https://github.com/${GITPICK_REPO}/tree/main/templates/${templateName}`;
}
