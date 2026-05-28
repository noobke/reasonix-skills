const fs = require("fs");
const path = require("path");
const https = require("https");
const { getCatalog, getCategories } = require("./catalog");

const REPO_RAW =
  "https://raw.githubusercontent.com/noobke/reasonix-skills/main/skills";

/**
 * Download a skill's SKILL.md from the GitHub repo and write it to the
 * Reasonix skills directory.
 */
function install(skillName, { global: isGlobal, cwd } = {}) {
  const catalog = getCatalog();
  const skill = catalog.find((s) => s.name === skillName);
  if (!skill) {
    throw new Error(
      `Unknown skill "${skillName}". Run "npx reasonix-skills list" to see available skills.`
    );
  }

  const targetDir = isGlobal
    ? path.join(require("os").homedir(), ".reasonix", "skills")
    : path.join(cwd || process.cwd(), ".reasonix", "skills");

  const skillDir = path.join(targetDir, skillName);
  const skillFile = path.join(skillDir, "SKILL.md");

  // Ensure target directory exists
  fs.mkdirSync(skillDir, { recursive: true });

  const url = `${REPO_RAW}/${skillName}/SKILL.md`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 404) {
          reject(
            new Error(
              `Skill "${skillName}" found in catalog but SKILL.md not found at ${url}`
            )
          );
          return;
        }
        if (res.statusCode !== 200) {
          reject(
            new Error(`Failed to download: HTTP ${res.statusCode} from ${url}`)
          );
          return;
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          fs.writeFileSync(skillFile, data, "utf-8");
          resolve({
            skill: skillName,
            path: skillFile,
            type: skill.runAs,
          });
        });
      })
      .on("error", (err) => {
        reject(new Error(`Download failed: ${err.message}`));
      });
  });
}

/**
 * Install all skills (or all skills in a category).
 */
async function installAll({ category, global, cwd } = {}) {
  const catalog = getCatalog();
  let skills = catalog;
  if (category) {
    skills = catalog.filter((s) => s.category === category);
    if (skills.length === 0) {
      throw new Error(`Unknown category "${category}". Run "npx reasonix-skills list" to see categories.`);
    }
  }

  const results = [];
  for (const skill of skills) {
    try {
      const r = await install(skill.name, { global, cwd });
      results.push({ ...r, status: "ok" });
    } catch (err) {
      results.push({ skill: skill.name, status: "error", error: err.message });
    }
  }
  return results;
}

module.exports = { install, installAll };
