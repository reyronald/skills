---
name: dependabot-fix
description: A skill for automatically fixing dependency updates and security vulnerabilities in project dependencies.
compatibility: Requires git and access to the internet
metadata:
  author: Ronald Rey
  version: "1.0"
  date: 2026-05-12
---

# dependabot-fix

## Overview

This skill automatically fixes Dependabot security alerts in npm projects by:

1. Fetching alert details from GitHub using the `gh` CLI
2. Identifying the minimum required version to fix the vulnerability
3. Attempting a minimal update first
4. Seeking user approval before resorting to overrides
5. Providing a summary of all executed commands

## Prerequisites

- `gh` CLI installed and authenticated
- Node.js and npm available
- Git repository with Dependabot alerts
- Write access to the repository

## Usage

Provide the Dependabot alert URL or numeric ID:

```
/dependabot-fix https://github.com/owner/repo/security/dependabot/1
```

## Implementation

### Step 1: Parse Alert Input

Extract the alert ID from:

- Full URL: `https://github.com/owner/repo/security/dependabot/123`
- Numeric ID: `123`
- Alert JSON (if piped)

### Step 2: Fetch Alert Details

Use `gh` CLI to retrieve alert information:

```bash
gh api repos/{owner}/{repo}/dependabot/alerts/{alert_number} --jq '.dependency.package.ecosystem, .dependency.package.name, .security_advisory.severity, .security_advisory.cvss.score, .security_vulnerability.vulnerable_version_range, .security_vulnerability.first_patched_version'
```

Extract:

- Ecosystem type (npm, pip, etc.)
- Package name
- Vulnerability severity
- Affected version range
- First patched version

### Step 3: Determine Minimum Fix Version

- Get the first patched version from the alert
- Verify it's available in npm registry
- Determine current installed version from `package.json` or lockfile

### Step 4: Attempt Minimal Update

Run the minimal update command:

```bash
npm update <package>@<first-patched-version>
```

Track this command for the final summary.

### Step 5: Validate the Fix

- Run `npm audit` to confirm the vulnerability is resolved
- Check for any new vulnerabilities introduced
- Verify the package.json/lockfile changes are minimal

### Step 6: Handle Update Failures

If the minimal update fails due to semver conflicts:

1. **Inform the user** of the constraint
2. **Request approval** before proceeding with overrides:

   ```
   The minimal fix (package@X.Y.Z) conflicts with existing constraints.

   Suggested override: npm install package@X.Y.Z --save

   This will update package.json to accept this version.
   Do you want to proceed? (yes/no)
   ```

3. If approved, use `npm install` with `--save` to override constraints
4. If denied, stop and report the conflict

### Step 7: Test and Verify

- Run `npm audit` to confirm resolution
- Check if tests pass (if test script exists)
- Verify no breaking changes

### Step 8: Create Summary

Display executed commands:

```
✓ Dependency fix completed successfully!

Commands executed:
  1. npm update express@4.18.2
  2. npm audit

Vulnerability fixed:
  - Package: express
  - Severity: high
  - Alert: #42
  - Fixed in version: 4.18.2
```

## Error Handling

### Invalid Alert ID

- Verify alert number exists in the repository
- Confirm `gh` authentication is valid
- Check repository owner/name

### Package Not Found

- Verify package name in npm registry
- Check if it's a scoped package (@scope/package)

### Semver Conflicts

- Display the conflicting constraint
- Show suggested version
- Request user approval for override

### Update Failure

- Display error from npm
- Suggest manual intervention
- Provide command for rollback

## Configuration

The skill respects:

- `package.json` and `package-lock.json` (or `yarn.lock`)
- Existing version constraints
- Project's npm configuration

## Safety Features

- ✓ Attempts minimal updates first
- ✓ Asks for approval before overriding constraints
- ✓ Validates fixes with `npm audit`
- ✓ Tracks all commands for rollback
- ✓ Does not commit changes automatically
- ✓ Does not push changes automatically

## Example Workflow

```
/dependabot-fix https://github.com/owner/repo/security/dependabot/1

Fetching alert #1...
Alert Type: Regular Expression Denial of Service (ReDoS)
Package: lodash
Current Version: 4.17.15
Severity: high

Attempting minimal fix...
npm update lodash@4.17.21

✓ npm audit passed

Commands executed:
  1. npm update lodash@4.17.21

Would you like to create a pull request? (yes/no)
```
