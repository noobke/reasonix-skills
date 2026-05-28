---
description: "复杂多步骤任务时使用 — 用 task_plan.md + findings.md + progress.md 持久化追踪进度，不怕 /clear"
runAs: inline
---

# Planning with Files — 文件式规划

像 Manus 一样工作：用持久化 markdown 文件作为"磁盘上的工作记忆"。

## 核心模式

```
上下文窗口 = RAM（易失、有限）
文件系统 = 磁盘（持久、无限）

→ 重要的东西都写到磁盘上。
```

## 三个文件

| 文件 | 用途 | 何时更新 |
|------|------|---------|
| `task_plan.md` | 阶段、进度、决策 | 每个阶段完成后 |
| `findings.md` | 研究、发现 | 任何发现后 |
| `progress.md` | 会话日志、测试结果 | 整个会话中 |

## 关键规则

### 1. 先创建计划
永远不要在复杂任务开始前没有 `task_plan.md`。不可协商。

### 2. 两操作规则
每 2 次浏览/搜索操作后，立即将关键发现保存到文件。

### 3. 决策前重读
重大决策前，重读计划文件。把目标保持在注意力窗口。

### 4. 行动后更新
每完成一个阶段：标记 `in_progress` → `complete`，记录错误。

### 5. 记录所有错误
```markdown
## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| FileNotFoundError | 1 | Created default config |
```

### 6. 永远不重复失败
失败了 → 下一个动作 ≠ 同样的动作。追踪尝试了什么，改变方法。

### 7. 恢复上下文
如果 `/clear` 后恢复：读取 `task_plan.md`、`findings.md`、`progress.md` + 运行 `git diff --stat`。

## 何时使用

**使用：** 3+ 步骤任务、研究任务、跨多次工具调用的任务
**跳过：** 简单问题、单文件编辑、快速查找
