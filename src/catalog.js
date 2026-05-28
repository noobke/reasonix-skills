// Skill catalog — single source of truth for all skills in this repo.
// Each entry maps to skills/<name>/SKILL.md.
// Used by CLI (list, search, install) and for README generation.

const catalog = [
  // ── SDLC ──────────────────────────────────────────
  {
    name: "brainstorming",
    category: "sdlc",
    description: "写代码前先对齐需求，探索方案，产出设计文档",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "writing-plans",
    category: "sdlc",
    description: "把设计拆成 2-5 分钟的小任务，生成实施计划",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "executing-plans",
    category: "sdlc",
    description: "按计划分步执行，每步验证，批量推进",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "tdd",
    category: "sdlc",
    description: "RED-GREEN-REFACTOR 铁律：先写测试，看它失败，再写代码",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "systematic-debugging",
    category: "sdlc",
    description: "4 阶段系统化调试：复现→诊断→修复→验证",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "verification-before-completion",
    category: "sdlc",
    description: "完成前强制验证：证据优先于声称",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "code-review",
    category: "sdlc",
    description: "结构化代码审查：正确性/安全/测试/风格/架构",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },

  // ── Git ───────────────────────────────────────────
  {
    name: "git-worktrees",
    category: "git",
    description: "为每个功能创建隔离的 git worktree，并行开发不干扰",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "finish-branch",
    category: "git",
    description: "任务完成后：验证测试 → 选择 merge/PR/保留/丢弃",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "commit-generator",
    category: "git",
    description: "从 staged 变更自动生成 Conventional Commits 信息",
    runAs: "inline",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },

  // ── Planning ──────────────────────────────────────
  {
    name: "planning-with-files",
    category: "planning",
    description: "文件式规划：task_plan.md + findings.md + progress.md 持久化追踪",
    runAs: "inline",
    source: { repo: "ok-skills", stars: "379" },
  },
  {
    name: "grill-me",
    category: "planning",
    description: "逐一追问你的方案/设计，直到没有模糊地带",
    runAs: "inline",
    source: { repo: "ok-skills", stars: "379" },
  },
  {
    name: "autoresearch",
    category: "planning",
    description: "自主目标驱动迭代：修改→验证→保留/丢弃→重复",
    runAs: "subagent",
    source: { repo: "ok-skills", stars: "379" },
  },

  // ── Docs ──────────────────────────────────────────
  {
    name: "find-docs",
    category: "docs",
    description: "拉取最新的库文档、API 参考和代码示例",
    runAs: "subagent",
    source: { repo: "ok-skills", stars: "379" },
  },
  {
    name: "get-api-docs",
    category: "docs",
    description: "写第三方 API 集成代码前，先获取最新 SDK 文档",
    runAs: "subagent",
    source: { repo: "ok-skills", stars: "379" },
  },
  {
    name: "doc-writer",
    category: "docs",
    description: "从代码自动生成 API 文档或 README",
    runAs: "subagent",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },

  // ── Automation ────────────────────────────────────
  {
    name: "agent-browser",
    category: "automation",
    description: "浏览器自动化：导航、填表、截图、抓取、端到端测试",
    runAs: "subagent",
    source: { repo: "ok-skills", stars: "379" },
  },
  {
    name: "gh-fix-ci",
    category: "automation",
    description: "检查失败的 GitHub Actions，拉日志，生成修复方案",
    runAs: "subagent",
    source: { repo: "ok-skills", stars: "379" },
  },

  // ── Frontend ──────────────────────────────────────
  {
    name: "frontend-design",
    category: "frontend",
    description: "打造有设计感的生产级前端界面",
    runAs: "inline",
    source: { repo: "ok-skills", stars: "379" },
  },
  {
    name: "react-component",
    category: "frontend",
    description: "脚手架 React 组件：含测试和 Storybook",
    runAs: "subagent",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },

  // ── Meta ──────────────────────────────────────────
  {
    name: "writing-skills",
    category: "meta",
    description: "创建新的 Reasonix skill：从需求到测试到发布",
    runAs: "inline",
    source: { repo: "obra/superpowers", stars: "210k" },
  },
  {
    name: "stream-coding",
    category: "meta",
    description: "文档优先的 Stream Coding 方法论：先写清楚再写代码",
    runAs: "inline",
    source: { repo: "frmoretto/stream-coding", stars: "93" },
  },

  // ── Specialized ───────────────────────────────────
  {
    name: "security-review",
    category: "specialized",
    description: "安全专项审查：注入/认证/密钥/反序列化/路径穿越",
    runAs: "subagent",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },
  {
    name: "api-client-gen",
    category: "specialized",
    description: "从 OpenAPI spec 生成类型安全的 API 客户端",
    runAs: "subagent",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },
  {
    name: "db-migration",
    category: "specialized",
    description: "生成数据库迁移文件，含回滚脚本",
    runAs: "subagent",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },
  {
    name: "translate-i18n",
    category: "specialized",
    description: "提取硬编码字符串，生成 i18n 国际化 key",
    runAs: "subagent",
    source: { repo: "awesome-reasonix-skills", stars: "—" },
  },
];

// Category metadata — display names and emoji
const categories = {
  sdlc:     { emoji: "🔄", name: "开发流程", desc: "从需求到上线的完整 SDLC" },
  git:      { emoji: "🌿", name: "Git 工作流", desc: "分支、提交、合并" },
  planning: { emoji: "📋", name: "规划与研究", desc: "规划、调研、方案评审" },
  docs:     { emoji: "📚", name: "文档与搜索", desc: "文档生成、API 参考查询" },
  automation:{ emoji: "🤖", name: "自动化与工具", desc: "浏览器自动化、CI 修复" },
  frontend: { emoji: "🎨", name: "前端开发", desc: "组件脚手架、设计系统" },
  meta:     { emoji: "🔧", name: "元技能", desc: "创建技能、方法论" },
  specialized:{ emoji: "⚡", name: "专项技能", desc: "安全、迁移、国际化" },
};

function getCatalog() {
  return catalog.map(s => ({
    ...s,
    installCmd: `npx reasonix-skills install ${s.name}`,
  }));
}

function getCategories() {
  return categories;
}

module.exports = { getCatalog, getCategories };
