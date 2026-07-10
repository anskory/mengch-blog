/**
 * 关于页面组件
 * 功能：展示博客作者的个人介绍、技能标签、兴趣爱好和联系方式
 * 布局：头像与自我介绍 → 博客介绍 → 技能标签 → 兴趣卡片 → 联系方式
 */
import { Github, Mail, Coffee, BookOpen, Code2, Sparkles, type LucideIcon } from 'lucide-react';
import { site } from '@/lib/data';

/**
 * 技能标签数据
 * 每项包含技能名称和对应的色调样式类
 */
const skills = [
  { name: 'TypeScript', tone: 'bg-lemon-300/40 text-ink-900' },
  { name: 'React',      tone: 'bg-mint-300/50 text-ink-900' },
  { name: 'Vue',        tone: 'bg-blush-300/60 text-ink-900' },
  { name: 'Node.js',    tone: 'bg-orange-400/30 text-ink-900' },
  { name: 'Tailwind',   tone: 'bg-mint-300/50 text-ink-900' },
  { name: 'Figma',      tone: 'bg-blush-300/60 text-ink-900' },
  { name: 'Rust',       tone: 'bg-lemon-300/40 text-ink-900' },
  { name: 'PostgreSQL', tone: 'bg-orange-400/30 text-ink-900' },
];

/**
 * 社交图标映射表
 * 将社交平台名称映射到对应的 Lucide 图标组件
 */
const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  Email: Mail,
};

/**
 * 兴趣爱好数据
 * 每项包含图标组件、标题和描述文字
 */
const interests = [
  { icon: Code2,    title: '写代码',  desc: '在编辑器里熬过很多个夜晚，也写出过一些让自己满意的小东西。' },
  { icon: BookOpen, title: '读杂书',  desc: '从设计、心理学到诗歌都翻一翻，相信跨界的灵感最有趣。' },
  { icon: Coffee,   title: '慢慢生活',desc: '不追赶任何节奏，在自己舒服的频率上一点点向前走。' },
  { icon: Sparkles, title: '小灵感',  desc: '会把灵光乍现的瞬间记在备忘录里，再慢慢写成文章。' },
];

/**
 * 关于页面组件
 * @returns 返回关于页面的完整 JSX 结构
 */
export default function About() {
  return (
    <div className="container max-w-4xl pt-16 pb-20">
      {/* 页面头部：头像 + 姓名 + 简介 */}
      <header className="text-center max-w-2xl mx-auto">
        <div className="relative inline-block">
          {/* 圆形头像容器（带渐变边框） */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-sun-gradient p-1.5 shadow-soft mx-auto">
            <div className="w-full h-full rounded-full bg-cream-100 flex items-center justify-center">
              {/* 头像文字（"檬"字） */}
              <span className="font-display text-5xl md:text-6xl font-bold text-ink-900">
                檬
              </span>
            </div>
          </div>
          {/* 右下角装饰小图标（星星） */}
          <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-mint-400 border-4 border-cream-100 text-cream-50">
            <Sparkles size={16} />
          </span>
        </div>

        {/* 作者姓名 */}
        <h1 className="mt-8 font-display text-4xl md:text-5xl font-semibold text-ink-900 tracking-tight text-balance">
          你好，我是 {site.owner}
        </h1>
        {/* 个人简介 */}
        <p className="mt-4 text-ink-600 leading-relaxed text-pretty">
          工程师 · 写字的人 · 业余设计师
          <br />
          这个博客是我的小角落，用来记录我感兴趣的一切。
        </p>
      </header>

      {/* 分隔线 */}
      <div className="divider-soft my-12" />

      {/* 博客介绍与技能兴趣部分 */}
      <section className="prose-cn">
        <h2>关于这个博客</h2>
        <p>
          檬橙博客创建于 2026 年的夏天，是我尝试认真做内容的一个开端。
          这里会有 <strong>前端笔记</strong>、<strong>后端随想</strong>、
          <strong>生活片段</strong> 和 <strong>读书清单</strong>。
        </p>
        <p>
          我希望它能保持长期的、慢节奏的更新——不追热点、不为流量，
          只在有话想说的时候写下来。
        </p>

        <h2>技能 & 兴趣</h2>
      </section>

      {/* 技能标签列表 */}
      <div className="flex flex-wrap gap-2 my-6">
        {skills.map((s) => (
          <span
            key={s.name}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${s.tone}`}
          >
            {s.name}
          </span>
        ))}
      </div>

      {/* 兴趣爱好卡片网格 */}
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {interests.map((it) => {
          // 动态获取图标组件
          const Icon = it.icon;
          return (
            <div
              key={it.title}
              className="p-5 rounded-2xl bg-cream-50 border border-ink-900/8"
            >
              {/* 兴趣图标 */}
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream-200 text-orange-600">
                <Icon size={16} />
              </div>
              {/* 兴趣标题 */}
              <h3 className="mt-3 font-display text-lg text-ink-900 font-semibold">
                {it.title}
              </h3>
              {/* 兴趣描述 */}
              <p className="mt-1 text-sm text-ink-600 leading-relaxed">
                {it.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 分隔线 */}
      <div className="divider-soft my-12" />

      {/* 联系方式区域 */}
      <section>
        <h2 className="font-display text-2xl text-ink-900 font-semibold">
          联系我
        </h2>
        <p className="mt-2 text-ink-600 leading-relaxed">
          如果你愿意和我交流，无论是技术问题、生活感悟，还是
          只是简单地说一句「你好」，都非常欢迎。
        </p>

        {/* 社交链接按钮列表 */}
        <div className="mt-5 flex flex-wrap gap-3">
          {site.social.map((s) => {
            // 根据社交平台名称匹配图标，无匹配时使用邮件图标
            const Icon = socialIcons[s.label] ?? Mail;
            return (
              <a
                key={s.url}
                href={s.url}
                // 外部链接在新标签页打开
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream-50 border border-ink-900/8 hover:border-orange-400/60 hover:text-orange-600 transition-all text-sm font-medium text-ink-800"
              >
                <Icon size={14} />
                {s.label}
                {/* 显示去除协议头的 URL 地址 */}
                <span className="text-ink-500 group-hover:text-orange-500/80 text-xs">
                  {s.url.replace(/^https?:\/\//, '').replace(/^mailto:/, '')}
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
