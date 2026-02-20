---
name: code-review
description: A skill for performing code reviews, providing feedback on code quality, style, and best practices on both local development branches and GitHub pull requests.
compatibility: Requires git and/or and access to the internet
metadata:
  author: Ronald Rey
  version: "1.0"
  date: 2026-02-20
---

# code-review

You will perform a code review and provide feedback on code quality, style, and best practices. Please ensure that your review is constructive and actionable.

## Workflow

### 1. Determine Review Target

- Remote PR: If the user provides a PR number or URL (e.g., "Review PR #123"), target that remote PR.
- Local Changes: If no specific PR is mentioned, or if the user asks to "review my changes", target the changes in the current branch compared to the main branch.

### 2. Preparation

**For Remote PRs:**

Read the PR description and any existing comments to understand the goal and history.

Use the GitHub CLI to checkout the PR.

```bash
gh pr checkout <PR_NUMBER>
```

**For Local Changes:**

Use the following command to get the list of changed files:

```bash
git --no-pager diff main...HEAD -- ':!package-lock.json'
```

### 3. In-Depth Analysis

Analyze the code changes based on the following pillars:

- Correctness: Does the code achieve its stated purpose without bugs or logical errors?
- Maintainability: Is the code clean, well-structured, and easy to understand and modify in the future? Consider factors like code clarity, modularity, and adherence to established design patterns.
- Readability: Is the code well-commented (where necessary) and consistently formatted according to our project's coding style guidelines?
- Efficiency: Are there any obvious performance bottlenecks or resource inefficiencies introduced by the changes?
- Security: Are there any potential security vulnerabilities or insecure coding practices?
- Edge Cases and Error Handling: Does the code appropriately handle edge cases and potential errors?
- Testability: Is the new or modified code adequately covered by tests (even if preflight checks pass)? Suggest additional test cases that would improve coverage or robustness.

### 4. Context Gathering

Before providing feedback, gather broader context to ensure your review is well-informed:

- Read related files that interact with the changes to understand dependencies and usage patterns.
- Check for similar patterns in the codebase to ensure consistency.
- Review recent history of modified files to understand the evolution and rationale behind previous decisions.
- Look for related issues, tickets, or PR descriptions to understand the problem being solved.
- Consider the impact on the overall system architecture and design.

### 5. Provide Feedback

**Structure**

- Summary: A high-level overview of the review.
- Findings:
  - Critical: Bugs, security issues, or breaking changes.
  - Improvements: Suggestions for better code quality or performance.
  - Nitpicks: Formatting or minor style issues (optional).
- Conclusion: Clear recommendation (Approved / Request Changes).

**Tone**

- Be constructive, professional, and friendly.
- Explain why a change is requested.
- For approvals, acknowledge the specific value of the contribution.

### 6. Post-Review Actions

After providing your review feedback:

- Offer to fix minor issues directly if appropriate (e.g., formatting, simple refactoring).
- Ask if the user wants help addressing specific concerns or implementing suggestions.
- For larger refactoring suggestions, offer to create follow-up tickets or document the technical debt.
- If breaking changes or major issues are found, discuss the path forward and offer to help with the solution.

### 7. Cleanup (Remote PRs only)

After the review, ask the user if they want to switch back to the default branch (e.g., `main` or `master`).
