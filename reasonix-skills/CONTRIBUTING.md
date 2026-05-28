# Contributing

This repository is a curated collection of Reasonix-compatible skills. The goal is quality over quantity — each skill should be self-contained, project-agnostic, and genuinely useful across different codebases.

## What Makes a Good Skill

- **Single responsibility.** One skill, one workflow. If you find yourself writing "and also…" in the description, split it into two skills.
- **Project-agnostic.** No hardcoded paths, no proprietary internal conventions. A skill should work in any repository of the target language or framework.
- **Reasonix-native frontmatter.** Every skill must declare `runAs` (`inline` or `subagent`). Subagent skills must declare `allowedTools`. See the [template](./TEMPLATE.md).
- **Concise.** Target ≤ 200 lines. The model reads this on every invocation — every token counts.
- **Self-contained for subagents.** A subagent skill receives *only* its own SKILL.md body as context. Write it as a complete prompt: include tool instructions, error handling, and expected output format.

## Skill Format

```markdown
---
description: "≤120 chars. Describe *when* to use the skill, not *what* it does."
runAs: inline          # or: subagent
# allowedTools: [read_file, search_content, glob]   # required for subagent
# model: deepseek-v4-flash                           # optional, default flash
---

# Skill Title

## Purpose
One paragraph on what this skill accomplishes.

## When to Use
Concrete triggers — what the user says or what situation signals this skill.

## Instructions
Step-by-step. Imperative mood. Be explicit about tools and ordering.

## Output Format
What the caller should expect back.

## Common Mistakes
What goes wrong and how to avoid it.
```

### Frontmatter Reference

| Key | Required | Description |
|---|---|---|
| `description` | Yes | ≤ 120 characters. Appears in `/skill list`. Start with "Use when…" to describe triggering conditions, not workflow summary. |
| `runAs` | Yes | `inline` (body augments parent context) or `subagent` (isolated child agent). |
| `allowedTools` | Subagent only | Array of tool names the child agent can access. Omit to inherit the full toolset — but prefer a tight allowlist to save tokens. |
| `model` | No | `deepseek-v4-flash` (default) or `deepseek-v4-pro`. Override only when the skill genuinely needs the stronger model. |

### Reasonix Tool Names

When referencing tools in a skill body, use Reasonix-native names:

`read_file` · `search_content` · `search_files` · `glob` · `get_file_info` · `get_symbols` · `find_in_code`
`run_command` · `edit_file` · `multi_edit` · `write_file` · `todo_write` · `submit_plan`
`explore` · `review` · `security_review` · `research` · `web_search` · `web_fetch`

## Testing Your Skill

```bash
# Install locally
node bin/cli.js install your-skill

# Invoke in Reasonix
/skill your-skill "a concrete test task"

# Iterate until the model follows the skill correctly
```

For discipline-enforcing skills (like TDD), test with pressure scenarios — does the model still comply under time pressure, sunk cost, or exhaustion? If not, add explicit counter-rationalizations.

## Pull Request Guidelines

1. One skill per PR (or a few closely related ones).
2. Include a short test scenario in the PR description — what you asked the model and whether it followed the skill correctly.
3. Follow the [TEMPLATE.md](./TEMPLATE.md) format.
4. No proprietary code, internal paths, or company-specific conventions.

## Code of Conduct

This project follows the [Reasonix Community Code of Conduct](https://github.com/esengine/DeepSeek-Reasonix/blob/main/CODE_OF_CONDUCT.md).
