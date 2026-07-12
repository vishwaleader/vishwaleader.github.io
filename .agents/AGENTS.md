# Project Specific Rules for Vishwa Leader

## CRITICAL: Deployment Workflow
1. **GitHub is only for code storage and backup.** Do NOT trigger production deploys through GitHub push (always disconnect or ignore automatic git builds on Vercel if possible).
2. **Always deploy to Vercel via CLI.** Run `npx vercel --prod` directly from the local terminal. This ensures all local untracked files (such as payment logos) are properly bundled and uploaded.
3. **Use the `deploy.sh` script.** It commits/pushes to Git and then deploys to Vercel via CLI in a single step.
