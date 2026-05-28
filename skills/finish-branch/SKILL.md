---
description: "实现完成、所有测试通过时使用 — 呈现结构化选项：merge/PR/保留/丢弃"
runAs: inline
---

# Finish Branch — 完成开发分支

## 概述

完成开发工作后，呈现清晰选项并执行选择的工作流。

**核心原则：** 验证测试 → 检测环境 → 呈现选项 → 执行选择 → 清理。

## 流程

### 步骤 1: 验证测试

```bash
npm test  # 或其他测试命令
```

**测试失败？** 停下来。不能继续。先修复。

### 步骤 2: 检测环境

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

### 步骤 3: 确定 base 分支

```bash
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

### 步骤 4: 呈现选项

```
实现完成。你想怎么做？

1. 合并回 <base-branch>（本地）
2. Push 并创建 Pull Request
3. 保持分支现状（我之后处理）
4. 丢弃这个工作

选哪个？
```

### 步骤 5: 执行选择

**选项 1 — 本地合并：**
```bash
git checkout <base-branch>
git pull
git merge <feature-branch>
npm test  # 验证合并结果
git worktree remove .worktrees/<branch-name>
git branch -d <feature-branch>
```

**选项 2 — Push 并创建 PR：**
```bash
git push -u origin <feature-branch>
gh pr create --title "<title>" --body "<summary>"
```
**不要清理 worktree** — 用户需要它来做 PR 迭代。

**选项 3 — 保持现状：**
报告 "保留分支 <name>。Worktree 保留在 <path>。"

**选项 4 — 丢弃：**
先确认。等用户输入 "discard" 确认后：
```bash
git checkout <base-branch>
git worktree remove .worktrees/<branch-name>
git branch -D <feature-branch>
```

## 记住

- 不要在有失败测试的情况下继续
- 不要未经确认就删除工作
- 不要在 worktree 内部运行 `git worktree remove`（要先 cd 到主仓库）
- 清理后运行 `git worktree prune`
