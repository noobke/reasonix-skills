---
description: "需要国际化时使用 — 提取硬编码字符串，生成 i18n key 和翻译文件"
runAs: subagent
allowedTools: [read_file, search_content, glob, edit_file, run_command]
model: deepseek-v4-flash
---

# Translate i18n — 国际化

从代码中提取硬编码字符串，生成 i18n key 和翻译文件。

## 流程

1. **扫描文件** — 搜索硬编码的用户可见字符串
2. **生成 key** — 按模块/组件组织命名空间
3. **替换字符串** — 用 `t('key')` 或 `useTranslation()` 替换
4. **生成翻译文件** — 至少包含源语言

## 支持的框架

根据项目检测：
- react-i18next / next-intl / vue-i18n / 自定义

## 提取规则

**提取这些：**
- UI 标签、按钮文字、提示信息
- 错误消息、表单验证文本
- 页面标题、aria-label

**不提取：**
- console.log 中的字符串
- 注释
- 已经用 `t()` 包裹的
- 测试文件中的

## 输出

```
locales/
├── en/
│   └── common.json    # { "save": "Save", "cancel": "Cancel" }
└── zh/
    └── common.json    # { "save": "保存", "cancel": "取消" }
```

## 规则

- key 使用点号命名空间：`common.save`、`auth.login.title`
- 保持翻译文件扁平（最多 2 层嵌套）
- 不要翻译代码中的 keys
