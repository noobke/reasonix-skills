---
description: "开始需要隔离的功能开发时使用 — 用 git worktree 创建隔离工作空间，保护当前分支"
runAs: inline
---

# Git Worktrees — 隔离工作空间

## 概述

确保工作在隔离的工作空间中。用 `git worktree` 创建独立分支工作区。

**核心原则：** 先检测现有隔离。然后创建。永远不污染主分支。

## 流程

### 步骤 0: 检测现有隔离

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
```

**如果 `GIT_DIR != GIT_COMMON`：** 已在 worktree 中。跳到步骤 3。

**如果 `GIT_DIR == GIT_COMMON`：** 在普通仓库中。询问用户是否要创建隔离 worktree。

### 步骤 1: 创建隔离工作空间

```bash
# 创建分支和 worktree
git worktree add -b feature/<branch-name> .worktrees/<branch-name>
cd .worktrees/<branch-name>
```

### 步骤 2: 项目设置

```bash
# Node.js
if [ -f package.json ]; then npm install; fi
# 其他语言类似...
```

### 步骤 3: 验证干净基线

```bash
npm test  # 或其他测试命令
```

**测试失败？** 报告失败，询问是否继续。
**测试通过？** 报告就绪。

### 报告

```
Worktree ready at .worktrees/<branch-name>
Tests passing (N tests, 0 failures)
Ready to implement <feature-name>
```

## 记住

- 永远先在 main/master 上创建 worktree
- `.worktrees/` 必须在 `.gitignore` 中
- 不要在已有的 worktree 内再创建 worktree
- 完成后用 `/skill finish-branch` 清理
