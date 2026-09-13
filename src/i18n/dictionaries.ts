import type { Locale } from "./config";

export interface Dictionary {
  nav: {
    blog: string;
    lab: string;
    papers: string;
    claudeCode: string;
    claude: string;
    joinCta: string;
  };
  footer: {
    tagline: string;
    contact: string;
    disclaimer: string;
    wechatTitle: string;
    wechatCaption: string;
    wechatEmailHint: string;
    close: string;
  };
  blog: {
    listSectionLabel: string;
    listTitleLine1: string;
    listTitleLine2: string;
    listSubtitle: string;
    readMore: string;
    readTimeSuffix: string;
    backToAll: string;
    allArticles: string;
    tagLabels: Record<string, string>;
  };
  lab: {
    metaTitle: string;
    metaDescription: string;
    listSectionLabel: string;
    listTitleLine1: string;
    listTitleLine2: string;
    listSubtitle: string;
    episodePrefix: string;
    backToAll: string;
    allEpisodes: string;
  };
  papers: {
    metaTitle: string;
    metaDescription: string;
    listSectionLabel: string;
    listTitleLine1: string;
    listTitleLine2: string;
    listSubtitle: string;
    rssLink: string;
    empty: string;
    backToAll: string;
    allPapers: string;
  };
  mccSeries: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    heroLine1: string;
    heroLine2: string;
    heroSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    githubHint: string;
    statsHeading: string;
    statLoc: string;
    statLocValue: string;
    statFiles: string;
    statFilesValue: string;
    statDeps: string;
    statDepsValue: string;
    statEpisodes: string;
    statEpisodesValue: string;
    tocHeading: string;
    tocSub: string;
    startHeading: string;
    startSub: string;
    safetyHeading: string;
    safetyItems: string[];
    footerNextHeading: string;
    footerNextSub: string;
  };
  claudeCodeHub: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    heroLine1: string;
    heroLine2: string;
    shortAnswer: string;
    hubSectionTitle: string;
    tagGuide: string;
    tagComparison: string;
    tagLab: string;
    tagDeepDive: string;
    tagResearch: string;
    claudeMdTitle: string;
    claudeMdDesc: string;
    hooksTitle: string;
    hooksDesc: string;
    cursorCompareTitle: string;
    cursorCompareDesc: string;
    miniClaudeCodeTitle: string;
    miniClaudeCodeDesc: string;
    contextEngTitle: string;
    contextEngDesc: string;
    longContextTitle: string;
    longContextDesc: string;
    planModeTitle: string;
    planModeDesc: string;
    firstWeekTitle: string;
    firstWeekDesc: string;
    tocLabel: string;
    tocContext: string;
    tocLoop: string;
    tocHandoff: string;
    section1Title: string;
    section1Text: string;
    section2Title: string;
    section2Text: string;
    section3Title: string;
    section3Text: string;
    ctaTitle: string;
    ctaText: string;
    backLink: string;
  };
  claudeHub: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    heroLine1: string;
    heroLine2: string;
    shortAnswer: string;
    hubSectionTitle: string;
    tagGuide: string;
    tagLab: string;
    tagDeepDive: string;
    tagResearch: string;
    contextEngTitle: string;
    contextEngDesc: string;
    longContextTitle: string;
    longContextDesc: string;
    claudeCodeTitle: string;
    claudeCodeDesc: string;
    miniClaudeCodeTitle: string;
    miniClaudeCodeDesc: string;
    tocLabel: string;
    tocPrompt: string;
    tocContext: string;
    tocVerification: string;
    codeLabel: string;
    section1Title: string;
    section1Text: string;
    section2Title: string;
    section2Text: string;
    section3Title: string;
    section3Text: string;
    ctaTitle: string;
    backLink: string;
  };
  common: {
    skipToContent: string;
    languageLabel: string;
  };
}

const en: Dictionary = {
  nav: { blog: "Blog", lab: "Lab", papers: "Papers", claudeCode: "Claude Code", claude: "Claude", joinCta: "Join waitlist" },
  footer: {
    tagline: "Independent field notes for Claude builders.",
    contact: "Contact",
    disclaimer: "Independent. Not affiliated with Anthropic.",
    wechatTitle: "Join the WeChat group",
    wechatCaption: "Scan with WeChat to join the Claude Community chat.",
    wechatEmailHint: "Prefer email?",
    close: "Close",
  },
  blog: {
    listSectionLabel: "// FIELD NOTES",
    listTitleLine1: "Guides from the",
    listTitleLine2: "workbench.",
    listSubtitle:
      "In-depth articles on Claude Code, workflows, and building with Claude. Written from real projects, not documentation.",
    readMore: "Read",
    readTimeSuffix: "read",
    backToAll: "Back to all articles",
    allArticles: "All articles",
    tagLabels: {
      "claude-code": "Claude Code",
      comparison: "Comparison",
      "claude-md": "CLAUDE.md",
      hooks: "Hooks",
      automation: "Automation",
      setup: "Setup",
      research: "Research",
      distillation: "Distillation",
      claude: "Claude",
      reasoning: "Reasoning",
      evaluation: "Evaluation",
      dataset: "Dataset",
      workflow: "Workflow",
      economics: "Economics",
      architecture: "Architecture",
      "mini-claude-code": "Mini Claude Code",
      series: "Series",
      typescript: "TypeScript",
      agents: "Agents",
      paper: "Paper",
      "long-context": "Long context",
      "coding-agents": "Coding agents",
      "plan-mode": "Plan mode",
      install: "Install",
      "getting-started": "Getting started",
    },
  },
  lab: {
    metaTitle: "Lab — Build a coding agent from scratch",
    metaDescription:
      "Hands-on series that build real agent systems end-to-end. Start with Mini Claude Code: 6 episodes, ~500 lines of TypeScript, from REPL to eval harness.",
    listSectionLabel: "// LAB",
    listTitleLine1: "Build agents",
    listTitleLine2: "from zero.",
    listSubtitle:
      "Hands-on series that ship real code. Currently running: Mini Claude Code — a working coding agent built in six episodes, no framework hiding the moving parts.",
    episodePrefix: "EP",
    backToAll: "Back to all episodes",
    allEpisodes: "All episodes",
  },
  papers: {
    metaTitle: "Papers — Weekly deep reads for Claude builders",
    metaDescription:
      "One arXiv paper a week, read from an engineer's angle. TL;DR in 60 seconds, ten-minute deep read, reproducible appendix. What Anthropic-style teams should actually care about.",
    listSectionLabel: "// PAPERS",
    listTitleLine1: "One paper a week,",
    listTitleLine2: "engineer-first.",
    listSubtitle:
      "New arXiv work on agents, tool use, long context, and coding agents — read from a builder's angle, in four languages, every Saturday.",
    rssLink: "Subscribe via RSS →",
    empty: "First edition dropping soon.",
    backToAll: "Back to all papers",
    allPapers: "All papers",
  },
  mccSeries: {
    metaTitle: "Mini Claude Code — a coding agent in ~500 lines of TypeScript",
    metaDescription:
      "Full source and eval harness for the six-episode Mini Claude Code series. REPL, tools, apply_patch, observation masking, sub-agents, and a working eval loop — every file readable in one sitting.",
    kicker: "// SERIES",
    heroLine1: "Mini Claude",
    heroLine2: "Code.",
    heroSub:
      "A coding agent built from scratch in ~500 lines of TypeScript. Six episodes, one working repository. No framework, no hidden layers — every file readable in one sitting.",
    ctaPrimary: "Get the code on GitHub",
    ctaSecondary: "Start with Episode 01",
    githubHint: "MIT · runs on Node 20+ · Anthropic SDK only",
    statsHeading: "By the numbers",
    statLoc: "Lines of code",
    statLocValue: "~500",
    statFiles: "Source files",
    statFilesValue: "4",
    statDeps: "Runtime deps",
    statDepsValue: "1",
    statEpisodes: "Episodes",
    statEpisodesValue: "6",
    tocHeading: "The six episodes",
    tocSub: "Each episode reads like a chapter. Each chapter maps to a file you can open right now.",
    startHeading: "Run it in three commands",
    startSub: "Clone, install, launch. Then talk to it.",
    safetyHeading: "Built for real repositories",
    safetyItems: [
      "apply_patch uses byte-exact context matching — refuses to apply on drift",
      ".bak backup written next to every edited file",
      "run_bash has 15s timeout and 20KB output cap",
      "read_file / list_dir refuse to escape the workspace root",
      "sub-agents cannot spawn more sub-agents (no recursion)",
      "y/N confirmation before every write, unless MCC_AUTO_APPROVE=1",
    ],
    footerNextHeading: "What's next",
    footerNextSub:
      "The eval harness ships with three seed tasks. The plan is to grow it toward a 15-task SWE-lite subset and pin a baseline you can regress against. If you want to add tasks, open a PR.",
  },
  claudeCodeHub: {
    metaTitle: "Claude Code — Anthropic's AI coding agent for the terminal",
    metaDescription: "Claude Code is a terminal-based AI coding agent that reads, writes, and runs code in your repository. Learn what it is, who it's for, and how to get started with guides, comparisons, and tutorials.",
    kicker: "// CLAUDE CODE",
    heroLine1: "Claude Code is a",
    heroLine2: "context machine.",
    shortAnswer: "Claude Code is Anthropic's agentic coding tool. It runs in your terminal, reads and writes files, executes shell commands, and iterates on code autonomously. It's built for engineers who want an AI that works inside their existing workflow—not a new IDE. Use it when you need multi-file refactors, automated testing loops, or codebase-wide changes that require real tool access.",
    hubSectionTitle: "Guides & Resources",
    tagGuide: "Guide",
    tagComparison: "Comparison",
    tagLab: "Lab",
    tagDeepDive: "Deep Dive",
    tagResearch: "Research",
    claudeMdTitle: "The Complete CLAUDE.md Guide",
    claudeMdDesc: "How to write context files that survive real projects. Structure, content, and iteration patterns.",
    hooksTitle: "Claude Code Hooks",
    hooksDesc: "Automate quality checks, trigger tests, and extend Claude Code with shell scripts.",
    cursorCompareTitle: "Claude Code vs Cursor",
    cursorCompareDesc: "An honest comparison: different philosophies, different strengths. How to choose.",
    miniClaudeCodeTitle: "Build Your Own Agent",
    miniClaudeCodeDesc: "Mini Claude Code: a working coding agent in ~500 lines. Six episodes, full source.",
    contextEngTitle: "Context Engineering",
    contextEngDesc: "A practitioner's synthesis of frontier research on context management for coding agents.",
    longContextTitle: "Coding Agents vs Long Context",
    longContextDesc: "Why agents outperform long-context systems: the Duke paper breakdown.",
    planModeTitle: "Plan Mode",
    planModeDesc: "Research first, edit after approval. When the extra review step is worth it.",
    firstWeekTitle: "First Week Guide",
    firstWeekDesc: "Install to first useful session in seven days — without drowning in docs.",
    tocLabel: "IN THIS MANUAL",
    tocContext: "CLAUDE.md",
    tocLoop: "Plan → build → verify",
    tocHandoff: "Clean handoffs",
    section1Title: "Context is the product",
    section1Text: "Your CLAUDE.md should describe the commands, architecture, boundaries, and proof required to finish work. Keep it short enough to stay true.",
    section2Title: "The plan → build → verify loop",
    section2Text: "Start by mapping what exists. Make the smallest coherent plan. Build within explicit boundaries. Then verify the behavior, not merely the diff.",
    section3Title: "Leave a clean handoff",
    section3Text: "A useful completion note says what changed, what was verified, and what remains uncertain. It should help the next person move without replaying the entire session.",
    ctaTitle: "Stay close to the tool.",
    ctaText: "Join the first readers of the Claude Code field manual.",
    backLink: "← Back to the workbench",
  },
  claudeHub: {
    metaTitle: "Claude — AI assistant for research, writing, and analysis",
    metaDescription: "Claude is Anthropic's AI assistant built for thoughtful, reliable work. Learn practical patterns for research, writing, analysis, and coding with guides, deep dives, and real examples.",
    kicker: "// FIELD GUIDE",
    heroLine1: "Claude, without",
    heroLine2: "the magic tricks.",
    shortAnswer: "Claude is Anthropic's AI assistant. It excels at research synthesis, long-form writing, code explanation, and tasks requiring careful reasoning. It's for anyone who needs a thoughtful collaborator—not a chatbot that guesses. Use it when you want reliable outputs you can actually verify, not confident-sounding answers.",
    hubSectionTitle: "Guides & Resources",
    tagGuide: "Guide",
    tagLab: "Lab",
    tagDeepDive: "Deep Dive",
    tagResearch: "Research",
    contextEngTitle: "Context Engineering",
    contextEngDesc: "A practitioner's synthesis of frontier research on context management for AI systems.",
    longContextTitle: "Coding Agents vs Long Context",
    longContextDesc: "Why agents outperform long-context systems: the Duke paper breakdown.",
    claudeCodeTitle: "Claude Code Field Manual",
    claudeCodeDesc: "The agentic coding tool from Anthropic. Terminal-first, tool-using, autonomous.",
    miniClaudeCodeTitle: "Build Your Own Agent",
    miniClaudeCodeDesc: "Mini Claude Code: a working coding agent in ~500 lines. Six episodes, full source.",
    tocLabel: "IN THIS GUIDE",
    tocPrompt: "Prompt as interface",
    tocContext: "Context engineering",
    tocVerification: "Verification loops",
    codeLabel: "A durable prompt shape",
    section1Title: "Prompt as interface",
    section1Text: "A good prompt is not an incantation. It is an interface between your intent and a model: the job, the available context, the constraints, and the shape of a useful result.",
    section2Title: "Context is a design decision",
    section2Text: "More context is not automatically better. Give Claude the smallest complete world it needs: source material, audience, examples, and the decisions already made.",
    section3Title: "Ask for evidence, not confidence",
    section3Text: "Separate creation from checking. Have Claude identify assumptions, cite the supplied material, and describe what it could not verify.",
    ctaTitle: "One sharp workflow per issue.",
    backLink: "← Back to the workbench",
  },
  common: { skipToContent: "Skip to content", languageLabel: "Language" },
};

const zhCN: Dictionary = {
  nav: { blog: "文章", lab: "实战", papers: "论文", claudeCode: "Claude Code", claude: "Claude", joinCta: "加入等待名单" },
  footer: {
    tagline: "写给 Claude 构建者的独立实战笔记。",
    contact: "联系",
    disclaimer: "独立站点，与 Anthropic 无关。",
    wechatTitle: "加入微信群",
    wechatCaption: "微信扫码，加入 Claude Community 交流群。",
    wechatEmailHint: "更习惯用邮件？",
    close: "关闭",
  },
  blog: {
    listSectionLabel: "// 实战笔记",
    listTitleLine1: "来自工作台的",
    listTitleLine2: "实操指南。",
    listSubtitle:
      "关于 Claude Code、工作流以及使用 Claude 构建产品的深度文章。写自真实项目，而非文档搬运。",
    readMore: "阅读",
    readTimeSuffix: "阅读",
    backToAll: "返回所有文章",
    allArticles: "所有文章",
    tagLabels: {
      "claude-code": "Claude Code",
      comparison: "对比",
      "claude-md": "CLAUDE.md",
      hooks: "Hooks",
      automation: "自动化",
      setup: "配置",
      research: "研究",
      distillation: "蒸馏",
      claude: "Claude",
      reasoning: "推理",
      evaluation: "评估",
      dataset: "数据集",
      workflow: "工作流",
      economics: "经济学",
      architecture: "架构",
      "mini-claude-code": "Mini Claude Code",
      series: "系列",
      typescript: "TypeScript",
      agents: "Agent",
      paper: "论文精读",
      "long-context": "长上下文",
      "coding-agents": "Coding Agent",
      "plan-mode": "计划模式",
      install: "安装",
      "getting-started": "入门指南",
    },
  },
  lab: {
    metaTitle: "实战 — 从零构建 Coding Agent",
    metaDescription:
      "一起动手做真实的 Agent 系统。首发系列 Mini Claude Code：6 集，约 500 行 TypeScript，从 REPL 一路建到评测闭环。",
    listSectionLabel: "// 实战",
    listTitleLine1: "从零开始",
    listTitleLine2: "自己造 Agent。",
    listSubtitle:
      "写代码、跑得起来的动手系列。当前连载：Mini Claude Code —— 六集之内做一个能跑的 coding agent，不藏在任何框架背后。",
    episodePrefix: "第",
    backToAll: "返回所有集数",
    allEpisodes: "所有集数",
  },
  papers: {
    metaTitle: "论文 — 给构建者的每周精读",
    metaDescription:
      "每周一篇 arXiv 论文，用工程师的视角读完。60 秒 TL;DR、十分钟精读、可复现附录 —— 只讲 Anthropic 一类团队真正在乎的部分。",
    listSectionLabel: "// 论文精读",
    listTitleLine1: "每周一篇",
    listTitleLine2: "工程师视角。",
    listSubtitle:
      "Agent、Tool use、长上下文、Coding Agent —— 从构建者角度精读 arXiv 新论文，四语同步，每周六更新。",
    rssLink: "RSS 订阅 →",
    empty: "首期即将上线。",
    backToAll: "返回所有精读",
    allPapers: "所有精读",
  },
  mccSeries: {
    metaTitle: "Mini Claude Code — 约 500 行 TypeScript 写出的 Coding Agent",
    metaDescription:
      "Mini Claude Code 六集完整源码与评测代码。REPL、工具、apply_patch、观察遮蔽、子 Agent、可跑的评测闭环——每个文件一次都能读完。",
    kicker: "// 系列",
    heroLine1: "Mini Claude",
    heroLine2: "Code。",
    heroSub:
      "从零构建的 Coding Agent，一共约 500 行 TypeScript。六集、一个可运行仓库。没有框架，没有隐藏层——每个文件都能一次读完。",
    ctaPrimary: "去 GitHub 拿代码",
    ctaSecondary: "从第 01 集开始",
    githubHint: "MIT · 需 Node 20+ · 只依赖 Anthropic SDK",
    statsHeading: "数据",
    statLoc: "代码行数",
    statLocValue: "约 500",
    statFiles: "源文件",
    statFilesValue: "4",
    statDeps: "运行时依赖",
    statDepsValue: "1",
    statEpisodes: "集数",
    statEpisodesValue: "6",
    tocHeading: "六集目录",
    tocSub: "每一集是一个章节，每一章都对应一份现在就能打开的文件。",
    startHeading: "三条命令跑起来",
    startSub: "克隆、安装、启动，然后开始对话。",
    safetyHeading: "为真实仓库准备的安全模型",
    safetyItems: [
      "apply_patch 采用字节级 context 匹配——文件漂移即拒绝应用",
      "每次改动写入前，都会生成 .bak 备份",
      "run_bash 15 秒超时、20KB 输出上限",
      "read_file / list_dir 拒绝跳出 workspace 根目录",
      "子 Agent 无法再生成子 Agent（禁止递归）",
      "每次写入前 y/N 确认，除非 MCC_AUTO_APPROVE=1",
    ],
    footerNextHeading: "接下来",
    footerNextSub:
      "评测集首发 3 题，后续会推进到 SWE-lite 15 题 + 固定基线，方便你回归。有想加的任务欢迎发 PR。",
  },
  claudeCodeHub: {
    metaTitle: "Claude Code — Anthropic 的终端 AI 编程代理",
    metaDescription: "Claude Code 是运行在终端的 AI 编程代理，能够在你的仓库中读写文件、执行命令。了解它是什么、适合谁、如何开始，以及相关指南、对比和教程。",
    kicker: "// CLAUDE CODE",
    heroLine1: "Claude Code 是一台",
    heroLine2: "上下文机器。",
    shortAnswer: "Claude Code 是 Anthropic 出品的自主编程工具。它在终端运行，读写文件、执行 shell 命令，自主迭代代码。它专为想在现有工作流中使用 AI 的工程师设计——不是新 IDE。当你需要跨文件重构、自动化测试循环或需要真实工具访问的全仓库级改动时使用它。",
    hubSectionTitle: "指南与资源",
    tagGuide: "指南",
    tagComparison: "对比",
    tagLab: "实战",
    tagDeepDive: "深度解读",
    tagResearch: "研究",
    claudeMdTitle: "CLAUDE.md 完全指南",
    claudeMdDesc: "如何编写能在真实项目中存活的上下文文件。结构、内容与迭代模式。",
    hooksTitle: "Claude Code Hooks",
    hooksDesc: "用 shell 脚本自动化质量检查、触发测试、扩展 Claude Code。",
    cursorCompareTitle: "Claude Code vs Cursor",
    cursorCompareDesc: "一篇诚实的对比：不同的理念，不同的优势。如何选择。",
    miniClaudeCodeTitle: "自己造一个 Agent",
    miniClaudeCodeDesc: "Mini Claude Code：约 500 行的可运行编程代理。六集，完整源码。",
    contextEngTitle: "上下文工程",
    contextEngDesc: "编程代理上下文管理前沿研究的实践者综述。",
    longContextTitle: "Coding Agent 对阵长上下文",
    longContextDesc: "为什么代理胜过长上下文系统：Duke 论文解读。",
    planModeTitle: "计划模式",
    planModeDesc: "先研究后编辑，审批后再改动。何时值得多一步审查。",
    firstWeekTitle: "第一周指南",
    firstWeekDesc: "七天内从安装到第一个有用的会话——不被文档淹没。",
    tocLabel: "本手册内容",
    tocContext: "CLAUDE.md",
    tocLoop: "计划 → 构建 → 验证",
    tocHandoff: "干净的交接",
    section1Title: "上下文即产品",
    section1Text: "你的 CLAUDE.md 应该描述完成工作所需的命令、架构、边界和验证方式。保持简短，才能保持真实。",
    section2Title: "计划 → 构建 → 验证循环",
    section2Text: "先梳理现有内容。制定最小可行计划。在明确边界内构建。然后验证行为，而不仅仅是 diff。",
    section3Title: "留下干净的交接",
    section3Text: "一份有用的完成说明应该说明改了什么、验证了什么、还有什么不确定。它应该帮助下一个人继续推进，而无需重放整个会话。",
    ctaTitle: "紧跟工具的发展。",
    ctaText: "加入 Claude Code 实战手册的第一批读者。",
    backLink: "← 返回工作台",
  },
  claudeHub: {
    metaTitle: "Claude — 用于研究、写作和分析的 AI 助手",
    metaDescription: "Claude 是 Anthropic 打造的 AI 助手，专为可靠、深思熟虑的工作设计。学习研究、写作、分析和编程的实用模式，包括指南、深度解读和真实案例。",
    kicker: "// 实用指南",
    heroLine1: "Claude，",
    heroLine2: "没有魔法。",
    shortAnswer: "Claude 是 Anthropic 的 AI 助手。它擅长研究综合、长文写作、代码解释以及需要仔细推理的任务。它适合任何需要深思熟虑的协作者——而非只会猜测的聊天机器人。当你想要可验证的可靠输出，而非听起来自信的答案时，使用它。",
    hubSectionTitle: "指南与资源",
    tagGuide: "指南",
    tagLab: "实战",
    tagDeepDive: "深度解读",
    tagResearch: "研究",
    contextEngTitle: "上下文工程",
    contextEngDesc: "AI 系统上下文管理前沿研究的实践者综述。",
    longContextTitle: "Coding Agent 对阵长上下文",
    longContextDesc: "为什么代理胜过长上下文系统：Duke 论文解读。",
    claudeCodeTitle: "Claude Code 实战手册",
    claudeCodeDesc: "Anthropic 出品的自主编程工具。终端优先，使用工具，自主运行。",
    miniClaudeCodeTitle: "自己造一个 Agent",
    miniClaudeCodeDesc: "Mini Claude Code：约 500 行的可运行编程代理。六集，完整源码。",
    tocLabel: "本指南内容",
    tocPrompt: "提示词即接口",
    tocContext: "上下文工程",
    tocVerification: "验证循环",
    codeLabel: "一个持久的提示词结构",
    section1Title: "提示词即接口",
    section1Text: "好的提示词不是咒语。它是你的意图与模型之间的接口：任务、可用上下文、约束条件，以及有用结果的形状。",
    section2Title: "上下文是设计决策",
    section2Text: "更多上下文不一定更好。给 Claude 它需要的最小完整世界：原材料、受众、示例，以及已做出的决定。",
    section3Title: "要证据，不要自信",
    section3Text: "把创作和检查分开。让 Claude 识别假设、引用提供的材料、描述它无法验证的内容。",
    ctaTitle: "每个问题，一个精准的工作流。",
    backLink: "← 返回工作台",
  },
  common: { skipToContent: "跳到正文", languageLabel: "语言" },
};

const zhTW: Dictionary = {
  nav: { blog: "文章", lab: "實戰", papers: "論文", claudeCode: "Claude Code", claude: "Claude", joinCta: "加入等候名單" },
  footer: {
    tagline: "寫給 Claude 開發者的獨立實戰筆記。",
    contact: "聯絡",
    disclaimer: "獨立網站，與 Anthropic 無關。",
    wechatTitle: "加入微信群組",
    wechatCaption: "用微信掃描，加入 Claude Community 交流群組。",
    wechatEmailHint: "習慣用信箱聯絡？",
    close: "關閉",
  },
  blog: {
    listSectionLabel: "// 實戰筆記",
    listTitleLine1: "來自工作檯的",
    listTitleLine2: "實作指南。",
    listSubtitle:
      "關於 Claude Code、工作流程以及使用 Claude 打造產品的深度文章。寫自真實專案，而非文件搬運。",
    readMore: "閱讀",
    readTimeSuffix: "閱讀時間",
    backToAll: "返回所有文章",
    allArticles: "所有文章",
    tagLabels: {
      "claude-code": "Claude Code",
      comparison: "比較",
      "claude-md": "CLAUDE.md",
      hooks: "Hooks",
      automation: "自動化",
      setup: "設定",
      research: "研究",
      distillation: "蒸餾",
      claude: "Claude",
      reasoning: "推理",
      evaluation: "評估",
      dataset: "資料集",
      workflow: "工作流程",
      economics: "經濟",
      architecture: "架構",
      "mini-claude-code": "Mini Claude Code",
      series: "系列",
      typescript: "TypeScript",
      agents: "Agent",
      paper: "論文精讀",
      "long-context": "長上下文",
      "coding-agents": "Coding Agent",
      "plan-mode": "計畫模式",
      install: "安裝",
      "getting-started": "入門指南",
    },
  },
  lab: {
    metaTitle: "實戰 — 從零打造 Coding Agent",
    metaDescription:
      "一起動手做真的 Agent 系統。首發系列 Mini Claude Code：6 集、約 500 行 TypeScript，從 REPL 一路做到評測迴圈。",
    listSectionLabel: "// 實戰",
    listTitleLine1: "從零開始",
    listTitleLine2: "自己造 Agent。",
    listSubtitle:
      "跑得起來、能落地的動手系列。目前連載：Mini Claude Code —— 六集之內打造一個真的能跑的 coding agent，沒有任何框架把細節藏起來。",
    episodePrefix: "第",
    backToAll: "返回所有集數",
    allEpisodes: "所有集數",
  },
  papers: {
    metaTitle: "論文 — 給開發者的每週精讀",
    metaDescription:
      "每週一篇 arXiv 論文，用工程師的角度讀完。60 秒 TL;DR、十分鐘精讀、可重現附錄 —— 只講 Anthropic 這類團隊真正在乎的部分。",
    listSectionLabel: "// 論文精讀",
    listTitleLine1: "每週一篇",
    listTitleLine2: "工程師視角。",
    listSubtitle:
      "Agent、Tool use、長上下文、Coding Agent —— 從開發者角度精讀 arXiv 新論文，四語同步，每週六更新。",
    rssLink: "RSS 訂閱 →",
    empty: "首期即將上線。",
    backToAll: "返回所有精讀",
    allPapers: "所有精讀",
  },
  mccSeries: {
    metaTitle: "Mini Claude Code — 約 500 行 TypeScript 打造的 Coding Agent",
    metaDescription:
      "Mini Claude Code 六集完整原始碼與評測程式。REPL、工具、apply_patch、觀察遮罩、子 Agent、可執行的評測迴圈——每個檔案一次就能讀完。",
    kicker: "// 系列",
    heroLine1: "Mini Claude",
    heroLine2: "Code。",
    heroSub:
      "從零打造的 Coding Agent，總共約 500 行 TypeScript。六集、一個可執行的儲存庫。沒有框架、沒有隱藏層——每個檔案都能一次讀完。",
    ctaPrimary: "到 GitHub 取原始碼",
    ctaSecondary: "從第 01 集開始",
    githubHint: "MIT · 需 Node 20+ · 僅依賴 Anthropic SDK",
    statsHeading: "數據",
    statLoc: "程式碼行數",
    statLocValue: "約 500",
    statFiles: "原始檔",
    statFilesValue: "4",
    statDeps: "執行期相依",
    statDepsValue: "1",
    statEpisodes: "集數",
    statEpisodesValue: "6",
    tocHeading: "六集目錄",
    tocSub: "每一集是一個章節，每一章都對應一份現在就能打開的檔案。",
    startHeading: "三條指令跑起來",
    startSub: "clone、install、start，然後開始對話。",
    safetyHeading: "為真實儲存庫準備的安全模型",
    safetyItems: [
      "apply_patch 採用位元組級 context 比對——檔案漂移即拒絕套用",
      "每次改動寫入前，都會產生 .bak 備份",
      "run_bash 15 秒逾時、20KB 輸出上限",
      "read_file / list_dir 拒絕跳出 workspace 根目錄",
      "子 Agent 無法再產生子 Agent（禁止遞迴）",
      "每次寫入前 y/N 確認，除非 MCC_AUTO_APPROVE=1",
    ],
    footerNextHeading: "接下來",
    footerNextSub:
      "評測集首發 3 題，後續會推進到 SWE-lite 15 題 + 固定 baseline，方便你回歸。想加任務歡迎發 PR。",
  },
  claudeCodeHub: {
    metaTitle: "Claude Code — Anthropic 的終端 AI 程式碼代理",
    metaDescription: "Claude Code 是執行在終端的 AI 程式碼代理，能在你的儲存庫中讀寫檔案、執行指令。了解它是什麼、適合誰、如何開始，以及相關指南、比較和教學。",
    kicker: "// CLAUDE CODE",
    heroLine1: "Claude Code 是一台",
    heroLine2: "上下文機器。",
    shortAnswer: "Claude Code 是 Anthropic 出品的自主程式碼工具。它在終端執行，讀寫檔案、執行 shell 指令，自主迭代程式碼。它專為想在現有工作流程中使用 AI 的工程師設計——不是新的 IDE。當你需要跨檔案重構、自動化測試迴圈或需要真實工具存取的全儲存庫級變更時使用它。",
    hubSectionTitle: "指南與資源",
    tagGuide: "指南",
    tagComparison: "比較",
    tagLab: "實戰",
    tagDeepDive: "深度解讀",
    tagResearch: "研究",
    claudeMdTitle: "CLAUDE.md 完全指南",
    claudeMdDesc: "如何撰寫能在真實專案中存活的上下文檔案。結構、內容與迭代模式。",
    hooksTitle: "Claude Code Hooks",
    hooksDesc: "用 shell 腳本自動化品質檢查、觸發測試、擴展 Claude Code。",
    cursorCompareTitle: "Claude Code vs Cursor",
    cursorCompareDesc: "一篇誠實的比較：不同的理念，不同的優勢。如何選擇。",
    miniClaudeCodeTitle: "自己造一個 Agent",
    miniClaudeCodeDesc: "Mini Claude Code：約 500 行的可執行程式碼代理。六集，完整原始碼。",
    contextEngTitle: "上下文工程",
    contextEngDesc: "程式碼代理上下文管理前沿研究的實踐者綜述。",
    longContextTitle: "Coding Agent 對陣長上下文",
    longContextDesc: "為什麼代理勝過長上下文系統：Duke 論文解讀。",
    planModeTitle: "計畫模式",
    planModeDesc: "先研究後編輯，審批後再改動。何時值得多一步審查。",
    firstWeekTitle: "第一週指南",
    firstWeekDesc: "七天內從安裝到第一個有用的會話——不被文件淹沒。",
    tocLabel: "本手冊內容",
    tocContext: "CLAUDE.md",
    tocLoop: "計畫 → 建構 → 驗證",
    tocHandoff: "乾淨的交接",
    section1Title: "上下文即產品",
    section1Text: "你的 CLAUDE.md 應該描述完成工作所需的指令、架構、邊界和驗證方式。保持簡短，才能保持真實。",
    section2Title: "計畫 → 建構 → 驗證迴圈",
    section2Text: "先梳理現有內容。制定最小可行計畫。在明確邊界內建構。然後驗證行為，而不僅僅是 diff。",
    section3Title: "留下乾淨的交接",
    section3Text: "一份有用的完成說明應該說明改了什麼、驗證了什麼、還有什麼不確定。它應該幫助下一個人繼續推進，而無需重播整個會話。",
    ctaTitle: "緊跟工具的發展。",
    ctaText: "加入 Claude Code 實戰手冊的第一批讀者。",
    backLink: "← 返回工作檯",
  },
  claudeHub: {
    metaTitle: "Claude — 用於研究、寫作和分析的 AI 助手",
    metaDescription: "Claude 是 Anthropic 打造的 AI 助手，專為可靠、深思熟慮的工作設計。學習研究、寫作、分析和程式碼的實用模式，包括指南、深度解讀和真實案例。",
    kicker: "// 實用指南",
    heroLine1: "Claude，",
    heroLine2: "沒有魔法。",
    shortAnswer: "Claude 是 Anthropic 的 AI 助手。它擅長研究綜合、長文寫作、程式碼解釋以及需要仔細推理的任務。它適合任何需要深思熟慮的協作者——而非只會猜測的聊天機器人。當你想要可驗證的可靠輸出，而非聽起來自信的答案時，使用它。",
    hubSectionTitle: "指南與資源",
    tagGuide: "指南",
    tagLab: "實戰",
    tagDeepDive: "深度解讀",
    tagResearch: "研究",
    contextEngTitle: "上下文工程",
    contextEngDesc: "AI 系統上下文管理前沿研究的實踐者綜述。",
    longContextTitle: "Coding Agent 對陣長上下文",
    longContextDesc: "為什麼代理勝過長上下文系統：Duke 論文解讀。",
    claudeCodeTitle: "Claude Code 實戰手冊",
    claudeCodeDesc: "Anthropic 出品的自主程式碼工具。終端優先，使用工具，自主執行。",
    miniClaudeCodeTitle: "自己造一個 Agent",
    miniClaudeCodeDesc: "Mini Claude Code：約 500 行的可執行程式碼代理。六集，完整原始碼。",
    tocLabel: "本指南內容",
    tocPrompt: "提示詞即介面",
    tocContext: "上下文工程",
    tocVerification: "驗證迴圈",
    codeLabel: "一個持久的提示詞結構",
    section1Title: "提示詞即介面",
    section1Text: "好的提示詞不是咒語。它是你的意圖與模型之間的介面：任務、可用上下文、約束條件，以及有用結果的形狀。",
    section2Title: "上下文是設計決策",
    section2Text: "更多上下文不一定更好。給 Claude 它需要的最小完整世界：原材料、受眾、範例，以及已做出的決定。",
    section3Title: "要證據，不要自信",
    section3Text: "把創作和檢查分開。讓 Claude 識別假設、引用提供的材料、描述它無法驗證的內容。",
    ctaTitle: "每個問題，一個精準的工作流程。",
    backLink: "← 返回工作檯",
  },
  common: { skipToContent: "跳至內容", languageLabel: "語言" },
};

const ja: Dictionary = {
  nav: { blog: "ブログ", lab: "実戦", papers: "論文", claudeCode: "Claude Code", claude: "Claude", joinCta: "ウェイトリスト参加" },
  footer: {
    tagline: "Claude で開発する人のための独立系フィールドノート。",
    contact: "お問い合わせ",
    disclaimer: "独立サイト。Anthropic との提携関係はありません。",
    wechatTitle: "WeChatグループに参加",
    wechatCaption: "WeChatでスキャンして Claude Community グループに参加。",
    wechatEmailHint: "メールで連絡したい方は",
    close: "閉じる",
  },
  blog: {
    listSectionLabel: "// フィールドノート",
    listTitleLine1: "ワークベンチ発の",
    listTitleLine2: "実践ガイド。",
    listSubtitle:
      "Claude Code、ワークフロー、そして Claude を使ったプロダクト開発に関する深掘り記事。ドキュメント引き写しではなく、実プロジェクト発。",
    readMore: "読む",
    readTimeSuffix: "読了時間",
    backToAll: "記事一覧に戻る",
    allArticles: "記事一覧",
    tagLabels: {
      "claude-code": "Claude Code",
      comparison: "比較",
      "claude-md": "CLAUDE.md",
      hooks: "フック",
      automation: "自動化",
      setup: "セットアップ",
      research: "研究",
      distillation: "蒸留",
      claude: "Claude",
      reasoning: "推論",
      evaluation: "評価",
      dataset: "データセット",
      workflow: "ワークフロー",
      economics: "経済性",
      architecture: "アーキテクチャ",
      "mini-claude-code": "Mini Claude Code",
      series: "シリーズ",
      typescript: "TypeScript",
      agents: "エージェント",
      paper: "論文精読",
      "long-context": "ロングコンテキスト",
      "coding-agents": "コーディングエージェント",
      "plan-mode": "プランモード",
      install: "インストール",
      "getting-started": "入門ガイド",
    },
  },
  lab: {
    metaTitle: "実戦 — Coding Agent をゼロから作る",
    metaDescription:
      "手を動かして本物の Agent システムを作るシリーズ。第一弾 Mini Claude Code：全 6 話、TypeScript 約 500 行で、REPL から評価ハーネスまで。",
    listSectionLabel: "// 実戦",
    listTitleLine1: "ゼロから",
    listTitleLine2: "エージェントを組む。",
    listSubtitle:
      "実際に動くコードを積み上げていくハンズオン連載。現在進行中：Mini Claude Code —— 全 6 話で組む本物の coding agent、フレームワークで隠されていない全パーツ公開。",
    episodePrefix: "第",
    backToAll: "エピソード一覧に戻る",
    allEpisodes: "エピソード一覧",
  },
  papers: {
    metaTitle: "論文 — Claude 開発者のための週刊精読",
    metaDescription:
      "arXiv の新着論文を週 1 本、エンジニア視点で読み解く。60 秒の TL;DR、10 分の深堀り、再現可能な付録 —— Anthropic のようなチームが本当に気にする部分だけ。",
    listSectionLabel: "// 論文精読",
    listTitleLine1: "週に一本、",
    listTitleLine2: "エンジニア視点で。",
    listSubtitle:
      "エージェント、ツール使用、長文脈、コーディングエージェント —— arXiv の新着論文を開発者視点で精読、四言語同時、毎週土曜更新。",
    rssLink: "RSS 購読 →",
    empty: "第 1 号は近日公開。",
    backToAll: "論文一覧に戻る",
    allPapers: "論文一覧",
  },
  mccSeries: {
    metaTitle: "Mini Claude Code — TypeScript 約 500 行の Coding Agent",
    metaDescription:
      "Mini Claude Code 全 6 話のフルソースと評価ハーネス。REPL、ツール、apply_patch、観測マスキング、サブエージェント、動く評価ループ——どのファイルも一気に読み切れます。",
    kicker: "// シリーズ",
    heroLine1: "Mini Claude",
    heroLine2: "Code。",
    heroSub:
      "ゼロから作る Coding Agent、合計およそ 500 行の TypeScript。全 6 話、1 つの動くリポジトリ。フレームワークなし、隠されたレイヤーなし——どのファイルも一気読みできます。",
    ctaPrimary: "GitHub でコードを見る",
    ctaSecondary: "第 01 話から始める",
    githubHint: "MIT · Node 20+ · Anthropic SDK のみ依存",
    statsHeading: "数字で見る",
    statLoc: "コード行数",
    statLocValue: "約 500",
    statFiles: "ソースファイル",
    statFilesValue: "4",
    statDeps: "ランタイム依存",
    statDepsValue: "1",
    statEpisodes: "エピソード",
    statEpisodesValue: "6",
    tocHeading: "全 6 話の目次",
    tocSub: "各エピソード = 1 章。各章 = いま開けるファイル 1 つ。",
    startHeading: "3 コマンドで起動",
    startSub: "clone、install、start。あとは対話するだけ。",
    safetyHeading: "本物のリポジトリのための安全モデル",
    safetyItems: [
      "apply_patch はバイト単位の context 照合——ドリフトを検知したら適用しない",
      "書き込み前に .bak バックアップを作成",
      "run_bash は 15 秒タイムアウト、出力 20KB 上限",
      "read_file / list_dir は workspace 外への脱出を拒否",
      "サブエージェントはさらにサブエージェントを起動できない（再帰禁止）",
      "書き込みごとに y/N 確認、ただし MCC_AUTO_APPROVE=1 で無効化",
    ],
    footerNextHeading: "次にやること",
    footerNextSub:
      "評価集は 3 題からスタート。SWE-lite サブセット 15 題 + 固定ベースラインへ育てていく予定。タスク追加は PR 歓迎。",
  },
  claudeCodeHub: {
    metaTitle: "Claude Code — Anthropic のターミナル AI コーディングエージェント",
    metaDescription: "Claude Code はターミナルで動作する AI コーディングエージェントで、リポジトリ内のファイルを読み書きし、コマンドを実行します。これは何か、誰向けか、始め方、ガイド、比較、チュートリアルを学べます。",
    kicker: "// CLAUDE CODE",
    heroLine1: "Claude Code は",
    heroLine2: "コンテキストマシン。",
    shortAnswer: "Claude Code は Anthropic のエージェント型コーディングツールです。ターミナルで動作し、ファイルの読み書き、shell コマンドの実行、コードの自律的な反復を行います。既存のワークフローで AI を使いたいエンジニア向けに設計されています——新しい IDE ではありません。複数ファイルのリファクタ、自動テストループ、実際のツールアクセスが必要なリポジトリ全体の変更が必要な場合に使用します。",
    hubSectionTitle: "ガイド＆リソース",
    tagGuide: "ガイド",
    tagComparison: "比較",
    tagLab: "実戦",
    tagDeepDive: "深掘り",
    tagResearch: "研究",
    claudeMdTitle: "完全 CLAUDE.md ガイド",
    claudeMdDesc: "実プロジェクトで生き残るコンテキストファイルの書き方。構造、内容、反復パターン。",
    hooksTitle: "Claude Code Hooks",
    hooksDesc: "shell スクリプトで品質チェックを自動化し、テストをトリガーし、Claude Code を拡張。",
    cursorCompareTitle: "Claude Code vs Cursor",
    cursorCompareDesc: "正直な比較：異なる哲学、異なる強み。選び方。",
    miniClaudeCodeTitle: "自分でエージェントを作る",
    miniClaudeCodeDesc: "Mini Claude Code：約 500 行の動くコーディングエージェント。全 6 話、フルソース。",
    contextEngTitle: "コンテキストエンジニアリング",
    contextEngDesc: "コーディングエージェントのコンテキスト管理に関する最先端研究の実践者による統合。",
    longContextTitle: "コーディングエージェント vs 長文脈",
    longContextDesc: "なぜエージェントが長文脈システムを上回るのか：Duke 論文の解説。",
    planModeTitle: "プランモード",
    planModeDesc: "先に調査、承認後に編集。追加のレビューステップが価値を持つとき。",
    firstWeekTitle: "最初の 1 週間ガイド",
    firstWeekDesc: "インストールから最初の有用なセッションまで 7 日間 —— ドキュメントに溺れずに。",
    tocLabel: "このマニュアルの内容",
    tocContext: "CLAUDE.md",
    tocLoop: "計画 → 構築 → 検証",
    tocHandoff: "クリーンな引き継ぎ",
    section1Title: "コンテキストこそ製品",
    section1Text: "CLAUDE.md には、作業を完了するために必要なコマンド、アーキテクチャ、境界、検証方法を記述します。真実を維持するために、短く保ちましょう。",
    section2Title: "計画 → 構築 → 検証ループ",
    section2Text: "まず既存のものをマッピング。最小限の一貫した計画を立てる。明示的な境界内で構築。そして diff ではなく振る舞いを検証する。",
    section3Title: "クリーンな引き継ぎを残す",
    section3Text: "有用な完了メモには、何が変わったか、何を検証したか、何が不確実かを記載します。次の人がセッション全体を再生せずに進められるようにすべきです。",
    ctaTitle: "ツールに近づき続けよう。",
    ctaText: "Claude Code フィールドマニュアルの最初の読者に加わりましょう。",
    backLink: "← ワークベンチに戻る",
  },
  claudeHub: {
    metaTitle: "Claude — 研究、執筆、分析のための AI アシスタント",
    metaDescription: "Claude は Anthropic が構築した AI アシスタントで、思慮深く信頼性の高い作業のために設計されています。ガイド、深掘り、実例を通じて、研究、執筆、分析、コーディングの実践的なパターンを学べます。",
    kicker: "// フィールドガイド",
    heroLine1: "Claude、",
    heroLine2: "魔法なしで。",
    shortAnswer: "Claude は Anthropic の AI アシスタントです。研究の統合、長文の執筆、コードの説明、慎重な推論が必要なタスクに優れています。推測するチャットボットではなく、思慮深い協力者が必要な人向けです。自信ありげに聞こえる答えではなく、実際に検証できる信頼性の高い出力が欲しい場合に使用します。",
    hubSectionTitle: "ガイド＆リソース",
    tagGuide: "ガイド",
    tagLab: "実戦",
    tagDeepDive: "深掘り",
    tagResearch: "研究",
    contextEngTitle: "コンテキストエンジニアリング",
    contextEngDesc: "AI システムのコンテキスト管理に関する最先端研究の実践者による統合。",
    longContextTitle: "コーディングエージェント vs 長文脈",
    longContextDesc: "なぜエージェントが長文脈システムを上回るのか：Duke 論文の解説。",
    claudeCodeTitle: "Claude Code フィールドマニュアル",
    claudeCodeDesc: "Anthropic のエージェント型コーディングツール。ターミナルファースト、ツール使用、自律実行。",
    miniClaudeCodeTitle: "自分でエージェントを作る",
    miniClaudeCodeDesc: "Mini Claude Code：約 500 行の動くコーディングエージェント。全 6 話、フルソース。",
    tocLabel: "このガイドの内容",
    tocPrompt: "プロンプトはインターフェース",
    tocContext: "コンテキストエンジニアリング",
    tocVerification: "検証ループ",
    codeLabel: "持続可能なプロンプトの形",
    section1Title: "プロンプトはインターフェース",
    section1Text: "良いプロンプトは呪文ではありません。それはあなたの意図とモデルの間のインターフェースです：仕事、利用可能なコンテキスト、制約、そして有用な結果の形。",
    section2Title: "コンテキストは設計上の決定",
    section2Text: "コンテキストが多いほど良いとは限りません。Claude に必要な最小限の完全な世界を与えましょう：ソース資料、対象者、例、そしてすでに行われた決定。",
    section3Title: "自信ではなく証拠を求める",
    section3Text: "作成と確認を分離します。Claude に仮定を特定させ、提供された資料を引用させ、検証できなかったことを説明させます。",
    ctaTitle: "問題ごとに 1 つのシャープなワークフロー。",
    backLink: "← ワークベンチに戻る",
  },
  common: { skipToContent: "本文へスキップ", languageLabel: "言語" },
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
