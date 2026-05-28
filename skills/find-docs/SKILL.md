---
description: "需要任何库/框架/SDK 的最新文档时使用 — 用 Context7 CLI 拉取最新 API 参考和代码示例，不要靠训练数据"
runAs: subagent
allowedTools: [run_command]
model: deepseek-v4-flash
---

# Find Docs — 文档查找

用 Context7 CLI 获取任何库的最新文档和代码示例。

## 前置

```bash
npm install -g ctx7@latest
# 或: npx ctx7@latest <command>
```

## 流程

两步：解析库名 → 查询文档。

```bash
# Step 1: 解析库 ID
ctx7 library react "How to clean up useEffect with async operations"

# Step 2: 查询文档
ctx7 docs /facebook/react "How to clean up useEffect with async operations"
```

**必须先跑 `ctx7 library` 获取有效的 library ID。** 除非用户明确提供了 `/org/project` 格式的 ID。

## 选择标准

从 `ctx7 library` 的结果中选择最匹配的：
- 名称匹配度（精确匹配优先）
- 描述相关性
- Code Snippets 数量（越多越好）
- Benchmark Score（越高越好，100 最高）

## 写好查询

| 好 | 差 |
|----|-----|
| `"How to set up authentication with JWT in Express.js"` | `"auth"` |
| `"React useEffect cleanup function with async"` | `"hooks"` |

## 错误处理

- 3 次尝试后没找到 → 用最好的一次结果
- 配额超限 → 告知用户，回退到训练知识并标注可能过时
- 不要静默回退到训练数据

## 认证（可选）

```bash
export CONTEXT7_API_KEY=your_key
# 或
ctx7 login
```
