---
description: "创建 React 组件时使用 — 脚手架组件、测试和 Storybook 文件"
runAs: subagent
allowedTools: [read_file, search_content, glob, write_file, edit_file, run_command]
model: deepseek-v4-flash
---

# React Component — React 组件脚手架

创建符合最佳实践的 React 组件，含测试和 Storybook。

## 流程

1. **了解需求** — 组件用途、Props、状态、行为
2. **探索现有模式** — 查看项目中已有组件的风格
3. **创建文件：**
   - `ComponentName.tsx` — 组件实现
   - `ComponentName.test.tsx` — 测试
   - `ComponentName.stories.tsx` — Storybook（可选）

## 组件模板

```tsx
import { type FC } from 'react';

export interface ComponentNameProps {
  /** 描述 */
  children?: React.ReactNode;
  className?: string;
}

export const ComponentName: FC<ComponentNameProps> = ({
  children,
  className,
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
```

## 规则

- **TypeScript** 优先
- 导出 Props 类型
- 使用 `forwardRef` 当需要 ref 转发时
- 用 `clsx`/`cn` 合并 className
- 组件文件中不含默认导出（用 named export）
- 测试覆盖：渲染、交互、边界情况、无障碍
