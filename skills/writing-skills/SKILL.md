---
description: "创建新 skill 或编辑现有 skill 时使用 — TDD 驱动的 skill 创作：先写压力测试，再写 skill，最后关闭漏洞"
runAs: inline
---

# Writing Skills — 创建 Reasonix Skills

## 概述

创建 skill 就是 TDD 应用于流程文档。

**核心原则：** 如果你没看到 agent 在没有 skill 的情况下失败，你就不知道这个 skill 教对了没有。

## Skill 是什么

Skill 是 Reasonix agent 的可复用行为指南。放在 `.reasonix/skills/<name>/SKILL.md` 中。

## TDD 对应关系

| TDD 概念 | Skill 创作 |
|----------|-----------|
| **测试用例** | 用 subagent 运行的压力场景 |
| **生产代码** | Skill 文档 (SKILL.md) |
| **测试失败 (RED)** | Agent 在没有 skill 时违规（基线） |
| **测试通过 (GREEN)** | Agent 有 skill 后遵守规则 |
| **重构** | 关闭漏洞同时保持合规 |

## 何时创建 Skill

**创建时机：**
- 技术/方法不是直觉能想到的
- 会跨项目重复使用
- 模式广泛适用（不是项目特定的）

**不要创建：**
- 一次性解决方案
- 已被广泛文档化的标准实践
- 项目特定约定（放 REASONIX.md）
- 可以用工具强制执行的机械约束

## SKILL.md 结构

### Frontmatter (YAML)

```yaml
---
description: "≤120 字符的一行描述。以「何时使用」开头。"
runAs: inline          # inline | subagent
allowedTools: [...]     # subagent 专用
model: deepseek-v4-flash  # subagent 专用
---
```

### Body 结构

```markdown
# Skill Name

## 概述
是什么？核心原则 1-2 句话。

## 何时使用
具体的触发条件、症状、场景。
何时不用。

## 流程/指令
步骤 1, 2, 3...

## 输出格式
调用者应该期望什么。

## 常见错误
什么问题 + 怎么修。
```

## 防借口设计

- **关闭所有漏洞** — 不要只陈述规则，明确禁止具体的变通方式
- **添加"红灯"列表** — 让 agent 能自我检查是否在找借口
- **构建借口表** — 从基线测试中捕捉，给每种借口配回应

## Skill 创作清单

- [ ] 创建压力场景（3+ 个组合压力用于纪律型 skill）
- [ ] 在没有 skill 的情况下运行场景 — 记录基线行为
- [ ] 识别借口/失败的模式
- [ ] 写最小 skill 解决那些具体的基线失败
- [ ] 用 skill 重新运行场景 — 验证 agent 现在遵守
- [ ] 识别新借口 → 添加明确回应 → 重新测试
- [ ] 提交 skill

## 底线

**创建 skill 就是流程文档的 TDD。**
同样的铁律：没有先写失败的测试就没有 skill。
同样的循环：RED（基线）→ GREEN（写 skill）→ REFACTOR（关闭漏洞）。
