---
description: "需要自主目标驱动迭代时使用 — 修改→验证→保留/丢弃的自动循环，支持多种模式"
runAs: subagent
allowedTools: [read_file, search_content, glob, run_command, edit_file]
model: deepseek-v4-flash
---

# Autoresearch — 自主目标驱动迭代

## 概述

针对一个目标自主迭代：修改 → 验证 → 保留/丢弃 → 重复。

**安全不变式：**
- 未经用户明确批准，绝不 push、publish 或 deploy
- 默认有上限（可覆盖）
- 所有结果记录到 `autoresearch/` 目录

## 模式

| 模式 | 做什么 | 默认迭代 |
|------|--------|---------|
| `autoresearch` | 迭代优化指标 | 25 |
| `autoresearch plan` | 目标转成 Scope/Metric/Verify | N/A |
| `autoresearch debug` | 假设→测试→证伪→重复 | 15 |
| `autoresearch fix` | 逐个消灭错误 | 20 |
| `autoresearch scenario` | 12 维度生成边界用例 | 20 |

## 流程

1. 读取目标，明确评估指标
2. 修改代码
3. 运行验证命令检查指标
4. 指标改善 → 保留。指标变差 → 丢弃回滚
5. 记录每次迭代的结果
6. 到达迭代上限或指标达标 → 汇报总结

## 输出

```
📊 Autoresearch 完成
─────────────────────
目标: [目标描述]
迭代: N 次
最佳指标: [value]
保留变更: [文件列表]
```
