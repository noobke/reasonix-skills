#!/usr/bin/env node

const { getCatalog, getCategories } = require("../src/catalog");
const { install, installAll } = require("../src/install");

const args = process.argv.slice(2);
const cmd = args[0];

function showHelp() {
  console.log(`
  🛒 Reasonix Skills Store

  Usage:
    npx reasonix-skills list              Browse all skills
    npx reasonix-skills search <query>     Search skills
    npx reasonix-skills install <name>     Install a skill
    npx reasonix-skills install <name> -g  Install globally
    npx reasonix-skills install --all      Install all skills
    npx reasonix-skills install --cat <c>  Install all skills in a category
    npx reasonix-skills info <name>        Show skill details
`);
}

function showList() {
  const catalog = getCatalog();
  const cats = getCategories();

  for (const [key, cat] of Object.entries(cats)) {
    const skills = catalog.filter((s) => s.category === key);
    if (skills.length === 0) continue;

    console.log(`\n${cat.emoji}  ${cat.name} — ${cat.desc}`);
    console.log("─".repeat(70));

    for (const s of skills) {
      const typeIcon = s.runAs === "subagent" ? "🧬" : "📄";
      const typeLabel = s.runAs === "subagent" ? "subagent" : "inline";
      console.log(
        `  ${typeIcon} ${s.name.padEnd(28)} ${typeLabel.padEnd(10)} ${s.description}`
      );
    }
  }

  console.log(`\n📦 ${catalog.length} skills total. Install: npx reasonix-skills install <name>\n`);
}

function showSearch(query) {
  const catalog = getCatalog();
  const q = query.toLowerCase();
  const matches = catalog.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    console.log(`No skills found for "${query}". Try "npx reasonix-skills list".`);
    return;
  }

  const cats = getCategories();
  for (const s of matches) {
    const cat = cats[s.category];
    const typeIcon = s.runAs === "subagent" ? "🧬" : "📄";
    console.log(
      `${typeIcon} ${cat.emoji} ${s.name}  [${cat.name}]  ${s.description}`
    );
    console.log(`   install: npx reasonix-skills install ${s.name}\n`);
  }
}

function showInfo(skillName) {
  const catalog = getCatalog();
  const skill = catalog.find((s) => s.name === skillName);
  if (!skill) {
    console.log(`Unknown skill "${skillName}". Run "npx reasonix-skills list".`);
    return;
  }

  const cats = getCategories();
  const cat = cats[skill.category];
  const typeLabel = skill.runAs === "subagent" ? "🧬 subagent (isolated)" : "📄 inline (augments parent)";

  console.log(`
  ${cat.emoji}  ${skill.name}
  ─────────────────────────────────────────
  Category:    ${cat.name} — ${cat.desc}
  Type:        ${typeLabel}
  Description: ${skill.description}
  Source:      ${skill.source.repo} (${skill.source.stars}⭐)

  Install:
    npx reasonix-skills install ${skill.name}       # project-scoped
    npx reasonix-skills install ${skill.name} -g    # global (~/.reasonix/)

  After install:
    /skill ${skill.name} <task>
`);
}

async function main() {
  if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
    showHelp();
    return;
  }

  switch (cmd) {
    case "list":
    case "ls":
      showList();
      break;

    case "search":
    case "find": {
      const query = args.slice(1).join(" ");
      if (!query) {
        console.log('Usage: npx reasonix-skills search <query>');
        return;
      }
      showSearch(query);
      break;
    }

    case "info":
    case "show": {
      const name = args[1];
      if (!name) {
        console.log("Usage: npx reasonix-skills info <skill-name>");
        return;
      }
      showInfo(name);
      break;
    }

    case "install":
    case "i": {
      const target = args[1];
      const isGlobal = args.includes("-g") || args.includes("--global");

      if (!target) {
        console.log("Usage: npx reasonix-skills install <skill-name>");
        return;
      }

      if (target === "--all" || target === "-a") {
        const catIdx = args.indexOf("--cat");
        const category = catIdx >= 0 ? args[catIdx + 1] : null;
        console.log(category
          ? `Installing all skills in category "${category}"...`
          : "Installing all skills..."
        );
        const results = await installAll({ category, global: isGlobal });
        for (const r of results) {
          if (r.status === "ok") {
            console.log(`  ✅ ${r.skill} → ${r.path}`);
          } else {
            console.log(`  ❌ ${r.skill}: ${r.error}`);
          }
        }
        console.log(`\nDone. ${results.filter(r=>r.status==="ok").length} installed, ${results.filter(r=>r.status!=="ok").length} failed.`);
        return;
      }

      try {
        const result = await install(target, { global: isGlobal });
        const scope = isGlobal ? "global (~/.reasonix/)" : "project (.reasonix/)";
        console.log(`✅ Installed ${result.skill} (${result.type})`);
        console.log(`   → ${result.path}`);
        console.log(`   Scope: ${scope}`);
        console.log(`\nNext: /skill ${result.skill} <task>`);
      } catch (err) {
        console.error(`❌ ${err.message}`);
        process.exit(1);
      }
      break;
    }

    default:
      console.log(`Unknown command: ${cmd}`);
      showHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(`❌ ${err.message}`);
  process.exit(1);
});
