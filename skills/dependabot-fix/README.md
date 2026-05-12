# Dependabot Fix Skill

Automatically fix Dependabot security alerts in npm projects using the `gh` CLI.

```sh
npx skills add reyronald/skills --skill dependabot-fix
```

## Quick Start

1. **Get your alert ID or URL** from GitHub's Security tab
   - URL: `https://github.com/owner/repo/security/dependabot/123`
   - Or just the ID: `123`

2. **Run the skill**

   ```bash
   /dependabot-fix https://github.com/owner/repo/security/dependabot/123
   ```

   or

   ```bash
   /dependabot-fix 123
   ```

3. **Approve the fix** if needed (for semver conflicts)

4. **Review the summary** of commands executed

## What It Does

- ✅ Fetches security alert details from GitHub
- ✅ Attempts minimal version updates first
- ✅ Validates fixes with `npm audit`
- ✅ Asks for approval before overriding version constraints
- ✅ Provides a complete command log
- ⚠️ Does NOT auto-commit or push (you review changes first)

## Requirements

- GitHub CLI (`gh`) installed and authenticated
- Node.js and npm
- Repository with Dependabot alerts enabled

## Example

```
/dependabot-fix 42

Fetching alert #42...
Vulnerability: Regular Expression Denial of Service (ReDoS)
Package: lodash
Current Version: 4.17.15
Available Fix: 4.17.21

Attempting minimal update...
$ npm update lodash@4.17.21

✓ npm audit: All vulnerabilities resolved

Commands executed:
  1. npm update lodash@4.17.21
  2. npm audit
```

## Details

For implementation details and advanced usage, see [SKILL.md](SKILL.md)
