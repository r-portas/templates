export const GITPICK_REPO = "r-portas/templates";

// Set from VERCEL_GIT_COMMIT_REF at build time (see vite.config.ts) so preview
// deployments point gitpick at the deployed branch instead of main.
const GIT_BRANCH = import.meta.env.VITE_GIT_BRANCH || "main";

export function gitpickCommand(templateName: string, projectName = "my-project") {
  return `bunx --bun gitpick ${GITPICK_REPO}/tree/${GIT_BRANCH}/templates/${templateName} ${projectName}`;
}

export function githubUrl(templateName: string) {
  return `https://github.com/${GITPICK_REPO}/tree/${GIT_BRANCH}/templates/${templateName}`;
}
