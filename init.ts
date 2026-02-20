import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const skillName = process.argv[2];

if (!skillName) {
  console.error("Error: skill name is required.");
  console.error("Usage: npm run init -- <skill-name>");
  process.exit(1);
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(skillName)) {
  console.error(
    "Error: skill name must be lowercase alphanumeric with hyphens, and cannot start or end with a hyphen.",
  );
  process.exit(1);
}

const skillDir = join(process.cwd(), "skills", skillName);

if (existsSync(skillDir)) {
  console.error(`Error: directory already exists: skills/${skillName}`);
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const skillMdContent = `---
name: ${skillName}
description: 
metadata:
  author: Ronald Rey
  version: "1.0"
  date: ${today}
---

# ${skillName}


`;

const readmeMdContent = `# ${skillName}

\`\`\`sh
npx skills add https://github.com/reyronald/skills --skill ${skillName}
\`\`\`
`;

mkdirSync(skillDir, { recursive: true });
writeFileSync(join(skillDir, "SKILL.md"), skillMdContent, "utf-8");
writeFileSync(join(skillDir, "README.md"), readmeMdContent, "utf-8");

console.log(`✅ Created skills/${skillName}`);
console.log();
