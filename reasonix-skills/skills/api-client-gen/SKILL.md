---
description: "需要从 OpenAPI spec 生成类型安全的 API 客户端时使用"
runAs: subagent
allowedTools: [read_file, search_content, glob, run_command]
model: deepseek-v4-flash
---

# API Client Gen — API 客户端生成

从 OpenAPI/Swagger spec 或接口文档生成类型安全的 API 客户端。

## 流程

1. **读取 spec** — OpenAPI yaml/json 或接口文档
2. **分析接口** — 提取 endpoints、methods、parameters、responses
3. **生成类型** — TypeScript interfaces/types
4. **生成客户端** — 带类型的 fetch/axios 包装

## 输出

```
src/api/
├── types.ts       # 请求/响应类型
├── client.ts      # API 客户端（含错误处理）
└── endpoints/
    ├── users.ts   # 用户相关接口
    └── posts.ts   # 文章相关接口
```

## 客户端模板

```typescript
// client.ts
const BASE_URL = process.env.API_URL ?? 'http://localhost:3000';

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new ApiError(res.status, await res.text());
  }
  return res.json();
}
```
