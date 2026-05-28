---
description: "需要数据库迁移时使用 — 生成 migration 文件，含 up 和 down（回滚）"
runAs: subagent
allowedTools: [read_file, search_content, glob, run_command]
model: deepseek-v4-flash
---

# DB Migration — 数据库迁移

生成数据库迁移文件，含正向迁移和回滚脚本。

## 流程

1. **理解需求** — 用户描述的表/列变更
2. **检查现有 schema** — 读取现有 migration 文件或 schema 定义
3. **生成 migration** — up（正向）和 down（回滚）

## 支持的数据库

根据项目检测：
- PostgreSQL / MySQL / SQLite
- Prisma / Drizzle / Knex / 原生 SQL

## 输出格式

```sql
-- Up Migration
ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP;

-- Down Migration
ALTER TABLE users DROP COLUMN last_login_at;
```

或 Prisma 格式：

```sql
-- AlterTable
ALTER TABLE "users" ADD COLUMN "last_login_at" TIMESTAMP;

-- 回滚
ALTER TABLE "users" DROP COLUMN "last_login_at";
```

## 规则

- 始终提供回滚（down）脚本
- migration 文件名带时间戳
- 涉及数据迁移时警告用户
- 使用事务（如数据库支持）
