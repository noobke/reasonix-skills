---
description: "需要浏览器自动化时使用 — 导航、填表、截图、抓取、端到端测试"
runAs: subagent
allowedTools: [run_command]
model: deepseek-v4-flash
---

# Agent Browser — 浏览器自动化

快速浏览器自动化 CLI，基于 Chrome/Chromium CDP。

安装：`npm i -g agent-browser && agent-browser install`

## 使用方式

加载 CLI 自带的最新使用指南：

```bash
agent-browser skills get core              # 入门：工作流、常见模式
agent-browser skills get core --full       # 完整命令参考
```

## 专项技能

```bash
agent-browser skills get electron          # Electron 桌面应用
agent-browser skills get slack             # Slack 自动化
agent-browser skills get dogfood           # 探索性测试/QA
```

## 为什么用 agent-browser

- 原生 Rust CLI，速度快
- CDP 直连 Chrome，无需 Playwright/Puppeteer
- 无障碍树快照 + 元素引用，交互可靠
- 会话、认证保险库、状态持久化、视频录制
