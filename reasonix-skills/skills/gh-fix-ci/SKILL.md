---
description: "GitHub Actions CI 失败时使用 — 用 gh CLI 检查 PR checks、拉日志、总结失败原因、生成修复方案"
runAs: subagent
allowedTools: [run_command]
model: deepseek-v4-flash
---

# Gh Fix CI — 修复 CI

用 `gh` CLI 定位失败的 PR checks，获取 GitHub Actions 日志，总结失败原因，生成修复方案。

**前置：** `gh auth login` + `gh auth status`（需要 repo + workflow 权限）。

## 流程

1. 验证 gh 认证：`gh auth status`
2. 解析 PR：`gh pr view --json number,url`
3. 检查失败：`gh pr checks <pr> --json name,state,bucket,link`
4. 拉取日志：对每个失败的 check，
   ```bash
   gh run view <run_id> --log
   ```
5. 总结失败 + 提修复方案
6. 用户确认后实施
7. 修复后重新检查

## 外部 CI（Buildkite 等）

只报告 URL，不尝试拉取日志。
