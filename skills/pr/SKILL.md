---
name: pr
description: Creates a branch and a pull request for a given change. This skill is useful for automating the process of creating pull requests in a Git repository.
metadata:
  author: Ronald Rey
  version: "1.0"
  date: 2026-07-10
---

# pr

> **IMPORTANT — Do not destroy work under any circumstances.**
> Never run `git stash drop`, `git reset --hard`, `git clean`, `git checkout -- .`, or any other command that discards or overwrites uncommitted changes. If a step seems to require discarding changes, stop and ask the user instead.

Before starting:
- Check which branch the repo is currently on (`git branch --show-current`). If it is not the default branch (usually `main` or `master`), inform the user and ask for permission before proceeding.
- Ask the user if there's a Jira ticket associated with the change. This is optional.

1. Ensure the default branch is up to date. Check out the repo's default branch and run `git pull` to get the latest changes. If the user was on a non-default branch and granted permission, carry their uncommitted changes over (e.g. via `git stash` / `git stash pop`) — never discard them.
2. Create a branch for the changes. Use only lowercase letters, numbers, and hyphens — no slashes, spaces, single/double quotes, or special characters. If there is a Jira ticket, use the full ticket ID followed by a brief descriptive name, e.g. `ABC-123-fix-login-bug`. If there is no Jira ticket, use a descriptive name such as `fix-login-bug`.
3. Commit all current changes (`git add -A`). Commit with a relevant message using conventional commits. Include the Jira ticket number if applicable, e.g. `fix(login): ABC-123 fix login bug`.
4. Push the branch to the remote repository.
5. Create a pull request targeting the repo's default branch. Decide yourself what the title and description should be based on the Jira ticket and the changes made. Keep the description brief but include all relevant information. If there is a Jira ticket, include the ticket number in the title and description, e.g. `ABC-123: Fix login bug`. Use the GitHub CLI: `gh pr create --base main --title "ABC-123: Fix login bug" --body "..."`. Replace `main` with the actual default branch if different.


