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
