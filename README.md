# Reasonix Skills

A curated collection of reusable skills for [Reasonix](https://github.com/esengine/DeepSeek-Reasonix), the DeepSeek-native AI coding agent. Each skill is a standalone Markdown playbook that teaches Reasonix how to perform a specific workflow — from test-driven development to systematic debugging, from code review to database migrations.

Skills are sourced from the highest-quality community repositories ([superpowers](https://github.com/obra/superpowers) 210k ⭐, [ok-skills](https://github.com/mxyhi/ok-skills) 379 ⭐, and others), then adapted to Reasonix-native format with proper frontmatter (`runAs`, `allowedTools`, `model`).

---

## Installation

```bash
npx reasonix-skills install tdd
```

That's it. The CLI downloads the skill into `.reasonix/skills/` and it's immediately available in Reasonix via `/skill tdd`.

```bash
npx reasonix-skills install tdd -g    # install globally (~/.reasonix/skills/)
npx reasonix-skills install --all     # install everything
npx reasonix-skills list              # browse all available skills
npx reasonix-skills search debug      # search by keyword
npx reasonix-skills info tdd          # show skill details
```

> **Manual install:** `git clone` this repo and copy individual skill directories into `.reasonix/skills/`.

---

## Available Skills

### Development Workflow

| Skill | Description |
|---|---|
| `brainstorming` | Explore requirements and produce a design document before any code is written |
| `writing-plans` | Break a design into bite-sized 2–5 minute tasks with exact file paths and verification steps |
| `executing-plans` | Load a plan, review it critically, execute tasks step by step, report on completion |
| `tdd` | RED-GREEN-REFACTOR: write a failing test, watch it fail, write minimal code, refactor |
| `systematic-debugging` | Four-phase root-cause investigation before any fix is attempted |
| `verification-before-completion` | Run verification commands and read the output before claiming anything is done |
| `code-review` | Structured review covering correctness, security, testing, style, and architecture |

### Git

| Skill | Description |
|---|---|
| `git-worktrees` | Create isolated git worktrees for feature work without touching the main branch |
| `finish-branch` | Verify tests, then present structured options: merge locally, create PR, keep, or discard |
| `commit-generator` | Generate Conventional Commits messages from staged changes |

### Planning & Research

| Skill | Description |
|---|---|
| `planning-with-files` | Persistent markdown-based planning with `task_plan.md`, `findings.md`, and `progress.md` |
| `grill-me` | Stress-test a design by asking one question at a time until every branch of the decision tree is resolved |
| `autoresearch` | Autonomous goal-directed iteration: modify → verify → keep/discard → repeat |

### Documentation

| Skill | Description |
|---|---|
| `find-docs` | Fetch current library documentation and code examples via the Context7 CLI |
| `get-api-docs` | Retrieve up-to-date third-party API and SDK documentation before writing integration code |
| `doc-writer` | Generate API references, READMEs, or module documentation from source code |

### Automation

| Skill | Description |
|---|---|
| `agent-browser` | Browser automation for navigation, form filling, screenshots, scraping, and end-to-end testing |
| `gh-fix-ci` | Inspect failing GitHub Actions checks, pull logs, summarize failures, and draft a fix plan |

### Frontend

| Skill | Description |
|---|---|
| `frontend-design` | Produce polished, production-grade interfaces with strong typography, spacing, and motion |
| `react-component` | Scaffold a React component with tests and Storybook, following project conventions |

### Specialized

| Skill | Description |
|---|---|
| `security-review` | Security-focused audit covering injection, authentication, secrets, deserialization, and path traversal |
| `api-client-gen` | Generate a type-safe API client from an OpenAPI specification |
| `db-migration` | Generate database migration files with forward (`up`) and rollback (`down`) scripts |
| `translate-i18n` | Extract hardcoded strings and generate i18n translation keys and files |

### Meta

| Skill | Description |
|---|---|
| `writing-skills` | Create new Reasonix skills using test-driven methodology — baseline, write, close loopholes |
| `stream-coding` | A documentation-first methodology: spec before code, 80% of time on the spec |

---

## Skill Types

| Type | Frontmatter | Behavior |
|---|---|---|
| **Inline** | `runAs: inline` | The skill body augments the parent agent's context. Best for behavioral guidance and lightweight workflows. |
| **Subagent** | `runAs: subagent` | Spawns an isolated child agent with its own context. Only the final answer returns to the parent. Best for heavy reading, searching, or multi-step tasks that would bloat the session. |

Subagent skills also declare `allowedTools` to constrain which tools the child agent can use, and optionally `model` to override the default model tier.

---

## Source Repositories

These skills are adapted from the following open-source collections. Each skill has been reviewed and converted to Reasonix-native frontmatter format.

| Repository | Stars | Skills Adapted |
|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | 210k ⭐ | brainstorming, writing-plans, executing-plans, tdd, systematic-debugging, verification-before-completion, code-review, git-worktrees, finish-branch, writing-skills |
| [mxyhi/ok-skills](https://github.com/mxyhi/ok-skills) | 379 ⭐ | planning-with-files, grill-me, autoresearch, find-docs, get-api-docs, agent-browser, gh-fix-ci, frontend-design |
| [frmoretto/stream-coding](https://github.com/frmoretto/stream-coding) | 93 ⭐ | stream-coding |
| [awesome-reasonix-skills](https://github.com/) | — | security-review, commit-generator, react-component, doc-writer, api-client-gen, db-migration, translate-i18n |

---

## Creating Your Own Skill

Skills are plain Markdown with YAML frontmatter. Start from the template:

```bash
cp TEMPLATE.md skills/my-skill/SKILL.md
```

Minimum viable frontmatter:

```yaml
---
description: "≤120-char summary — describe when to use this skill"
runAs: inline
---
```

For subagent skills, add `allowedTools` and optionally `model`:

```yaml
---
description: "Use when doing X, Y, or Z"
runAs: subagent
allowedTools: [read_file, search_content, glob, run_command]
model: deepseek-v4-flash
---
```

See [TEMPLATE.md](./TEMPLATE.md) for the full boilerplate and [CONTRIBUTING.md](./CONTRIBUTING.md) for submission guidelines.

---

## Contributing

Pull requests are welcome. One skill per PR (or a few closely related ones). See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
