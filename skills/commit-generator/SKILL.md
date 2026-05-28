---
description: "提交代码前使用 — 从 staged 变更自动生成 Conventional Commits 格式的提交信息"
runAs: inline
---

# Commit Generator — 生成 Commit 信息

从 staged 变更生成 [Conventional Commits](https://www.conventionalcommits.org/) 格式的提交信息。

## 流程

1. 运行 `git diff --cached --stat` 查看暂存文件
2. 运行 `git diff --cached` 查看变更内容
3. 分析变更，确定 type 和 scope
4. 生成 Conventional Commits 格式信息

## 格式

```
<type>(<scope>): <description>

[body]
```

**Type 类型：**

| Type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 重构（不改变行为） |
| `docs` | 文档 |
| `test` | 测试 |
| `chore` | 构建/工具/依赖 |
| `style` | 格式（不影响逻辑） |
| `perf` | 性能优化 |

## 输出

```
建议的 commit 信息：

feat(auth): add JWT token refresh logic

- Add refreshToken method to AuthService
- Auto-refresh 5 minutes before expiry
- Handle refresh failure gracefully

提交？ [y/n]
```
