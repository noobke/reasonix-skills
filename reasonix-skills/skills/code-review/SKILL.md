---
description: "完成任务、实现功能或合并前使用 — 结构化代码审查：正确性、安全、测试、风格、架构"
runAs: inline
---

# Code Review — 代码审查

## 概述

执行结构化代码审查。标记正确性问题、风格违规、缺失测试和架构问题。

## 何时使用

- "review my changes"
- "code review this PR"
- "check this diff before I commit"
- "are there any issues with this file?"

## 流程

确定范围：

- **用户指定了文件/路径** → 只审这些文件
- **用户说 "diff" 或 "changes" 或没说** → 运行 `git diff` 和 `git diff --cached` 获取待变更 + `git log --oneline -5` 了解上下文

### 审查清单

对每个变更文件检查：

1. **正确性** — 逻辑错误、类型不匹配、竞态条件、边界情况
2. **安全性** — 未净化的用户输入、密钥泄露、缺失认证检查
3. **测试** — 新行为无测试、测试碰巧通过而非真断言、不可测试的紧耦合
4. **风格与可维护性** — 命名不一致、魔法数字、过度复杂、死代码
5. **架构** — 重复造轮子、模块间紧耦合、公共 API 不兼容变更

### 输出格式

```
## Code Review

### 🔴 Critical (must fix)
- **file:line** — description + suggested fix

### 🟡 Warning (should fix)
- **file:line** — description + suggested fix

### 🔵 Suggestion (nice to have)
- **file:line** — description + suggestion

### ✅ What looks good
- Positive observations

### 📊 Summary
- Files reviewed: N
- Critical: N / Warning: N / Suggestion: N
```

只包含有发现的级别。一切没问题就说清楚——不要发明问题。

## 对于深度安全审查

用 `/skill security-review` 做专项安全审查。
