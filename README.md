# 檬橙博客 🍋

> 「在柠檬与橙光之间，记录下一些柔软的事。」

清新柠橙风格的个人博客，采用温暖明亮的配色方案，为读者带来舒适愉悦的阅读体验。博客以柠橙为主题，融合了柠檬的清新与橙子的温暖，营造出温馨而富有质感的阅读氛围。

## ✨ 功能特性

### 核心功能

- 🏠 **首页展示** - 精选文章与分类概览，打字机动画增添活力
- 📝 **文章列表** - 完整文章列表浏览，支持按分类筛选
- 📖 **文章详情** - Markdown 格式文章渲染，附带阅读进度条
- 🏷️ **分类筛选** - 按前端、后端、生活、笔记四大分类快速筛选
- 👤 **关于页面** - 博主个人介绍、技能标签与联系方式
- 🔍 **404 页面** - 友好的错误提示页面

### 设计与体验

- ✨ **Markdown 渲染** - 内置轻量级 Markdown 渲染器，支持标题、列表、引用、代码块等
- 📱 **响应式设计** - 完美适配桌面端、平板与移动端
- 🌙 **暗色模式支持** - 支持明暗主题切换（已预留接口）
- 🎨 **精致动效** - 页面入场动画、悬浮效果、打字机效果
- 🌈 **品牌设计** - 柠橙主题配色系统，统一的视觉语言
- 📋 **备案号展示** - 底部备案信息展示，符合中国大陆网站规范

### 技术亮点

- 📦 **零后端依赖** - 纯前端静态博客，文章数据以 JSON 形式存储
- 🚀 **快速加载** - Vite 构建，代码分割，首屏加载迅速
- 🎯 **类型安全** - 全量 TypeScript 编写，类型检查保驾护航
- 🧹 **代码规范** - ESLint 代码检查，统一的代码风格
- 🔧 **自动部署** - GitHub Actions 工作流，推送即部署

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18 | 前端框架 |
| Vite | 6 | 构建工具 |
| TypeScript | 5.8 | 类型安全 |
| Tailwind CSS | 3.4 | 原子化 CSS 框架 |
| React Router | 7 | 路由管理 |
| lucide-react | latest | 图标库 |
| ESLint | latest | 代码检查 |

## 📁 项目结构

```
mengch-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署工作流
├── public/                     # 静态资源目录
│   ├── favicon.png             # 网站图标
│   ├── 404.html                # GitHub Pages 404 回退页
│   └── CNAME                   # 自定义域名配置
├── src/
│   ├── assets/                 # 静态资源
│   ├── components/             # 公共组件
│   │   ├── Navbar.tsx            # 导航栏（滚动样式、移动端适配）
│   │   ├── Footer.tsx            # 页脚（备案号、联系方式）
│   │   ├── Hero.tsx              # 首页英雄区（打字机动画）
│   │   ├── ArticleCard.tsx       # 文章卡片
│   │   ├── CategoryGrid.tsx      # 分类网格
│   │   ├── AboutTeaser.tsx       # 关于作者预告
│   │   ├── SectionHeader.tsx     # 区块标题组件
│   │   ├── Empty.tsx             # 空状态占位
│   │   └── BeianBadge.tsx        # 工信部备案徽章
│   ├── pages/                  # 页面组件
│   │   ├── Home.tsx              # 首页
│   │   ├── ArticleList.tsx       # 文章列表页（分类筛选）
│   │   ├── ArticleDetail.tsx     # 文章详情页（阅读进度）
│   │   ├── About.tsx             # 关于页面
│   │   └── NotFound.tsx          # 404 页面
│   ├── lib/                    # 工具库
│   │   ├── data.ts               # 数据访问层（站点配置、文章、分类）
│   │   ├── markdown.ts           # 轻量级 Markdown 渲染器
│   │   ├── types.ts              # TypeScript 类型定义
│   │   └── utils.ts              # 通用工具函数
│   ├── data/                   # 静态数据
│   │   └── articles.json         # 文章数据（站点配置、分类、文章）
│   ├── hooks/                  # 自定义 Hooks
│   │   └── useTheme.ts           # 主题切换 Hook
│   ├── App.tsx                 # 应用根组件（路由配置）
│   ├── main.tsx                # React 入口文件
│   ├── index.css               # 全局样式（设计系统）
│   └── vite-env.d.ts           # Vite 环境类型声明
├── .gitignore
├── eslint.config.js            # ESLint 配置
├── index.html                  # HTML 入口
├── package.json                # 项目依赖与脚本
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.js          # Tailwind CSS 设计系统配置
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 构建配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20
- npm >= 9

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

### 类型检查

```bash
npm run check
```

### 代码检查

```bash
npm run lint
```

## 📝 添加文章

博客文章以 JSON 格式存储在 `src/data/articles.json` 中。添加新文章只需在 `articles` 数组中追加一条记录：

```json
{
  "id": "article-slug",
  "title": "文章标题",
  "excerpt": "文章摘要，用于列表页展示",
  "category": "frontend",
  "tags": ["标签1", "标签2"],
  "cover": "封面图 URL",
  "date": "2026-01-01",
  "readingMinutes": 5,
  "featured": true,
  "content": "## 标题\n\n文章正文内容，支持 Markdown 格式..."
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✅ | 文章唯一标识，用于 URL 路由 |
| title | string | ✅ | 文章标题 |
| excerpt | string | ✅ | 文章摘要 |
| category | string | ✅ | 分类 key（frontend/backend/life/notes） |
| tags | string[] | ✅ | 标签列表 |
| cover | string | ✅ | 封面图片 URL |
| date | string | ✅ | 发布日期（YYYY-MM-DD） |
| readingMinutes | number | ✅ | 预计阅读时长（分钟） |
| featured | boolean | ❌ | 是否为精选文章 |
| content | string | ✅ | 文章正文（Markdown 格式） |

## 🎨 设计系统

### 配色方案

| 色系 | 色值 | 用途 |
|------|------|------|
| 奶油白 | `#FBF8F3` | 主背景色 |
| 墨色 | `#1F1B16` | 标题和主要文字 |
| 柠檬黄 | `#F7C04A` | 亮色强调、渐变起始 |
| 橙色 | `#F08A4B` | 品牌主色、按钮 |
| 薄荷绿 | `#A8C8B5` | 辅助色、分类标签 |
| 柔粉 | `#F4B6B6` | 辅助色、分类标签 |

### 字体

- **标题字体**：Fraunces + Noto Serif SC（衬线体，优雅有质感）
- **正文字体**：Inter + Noto Sans SC（无衬线体，清晰易读）

## 🌐 部署方式

### GitHub Pages 自动部署

项目已配置 GitHub Actions 自动部署工作流（`.github/workflows/deploy.yml`）。

**使用方法：**

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. 在仓库设置中启用 GitHub Pages（Settings → Pages）
3. 工作流会自动构建并部署

**自定义域名：**

1. 在 `public/CNAME` 文件中填写你的域名
2. 在 DNS 服务商处配置 CNAME 记录指向 `username.github.io`
3. 在仓库 Pages 设置中确认自定义域名

### 手动部署

1. 构建项目：
   ```bash
   npm run build
   ```
2. 将 `dist` 目录的内容部署到任意静态文件服务器

### Vercel / Netlify

直接导入仓库即可一键部署，无需额外配置。

## 📄 许可证

MIT License

---

<p align="center">
  <em>用心记录，慢慢生长 🍊</em>
</p>
