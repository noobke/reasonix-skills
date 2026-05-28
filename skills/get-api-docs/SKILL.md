---
description: "写第三方 API/SDK 集成代码前使用 — 用 chub CLI 获取最新的 API 文档，不要依赖训练数据"
runAs: subagent
allowedTools: [run_command]
model: deepseek-v4-flash
---

# Get API Docs — 获取 API 文档

写第三方 API 或 SDK 集成代码前，用 `chub` CLI 获取最新文档。

## Step 1: 确保 chub 可用

```bash
chub --help
```

如果不存在：

```bash
npm install -g @aisuite/chub
```

## Step 2: 搜索文档

```bash
chub search "<keywords>" --json
```

选择最匹配的 `id`（如 `openai/chat`、`stripe/api`）。

## Step 3: 获取文档

```bash
chub get <id> --lang ts    # 或 --lang py, --lang js
```

## Step 4: 使用文档 + 留下反馈

读取获取的内容，用来写准确的代码。不要依赖记忆中的 API 形状。

完成后如有发现（gotcha、变通方法、版本怪癖）：
```bash
chub annotate <id> "Webhook verification requires raw body — do not parse before verifying"
```
