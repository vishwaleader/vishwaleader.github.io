# Vishwa Leader Workspace Rules

## Deployment and Git Workflow

To prevent issues with out-of-sync builds and missing untracked assets (like logos or new pages), please adhere to the following rules:

1. **GitHub is ONLY for code storage / version control.**
   - Do NOT rely on Vercel's automatic GitHub integration for production deployments.
   - Pushing to GitHub is only for backing up the code and keeping the repo up to date.

2. **Vercel Deployments must ONLY be pushed via Vercel CLI.**
   - Always run `npx vercel --prod` directly from the local terminal.
   - This ensures all local assets (including untracked logos or configuration files) are uploaded and built correctly.

3. **Use the `deploy.sh` script.**
   - A `deploy.sh` script has been created in the root of this workspace.
   - Always use this script to save changes to GitHub and deploy to Vercel in one step.
