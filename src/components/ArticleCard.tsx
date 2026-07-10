/**
 * 文章卡片组件
 * 用于展示单篇文章的预览信息，支持三种展示样式：默认样式、特色样式和紧凑样式
 * 包含文章封面、分类标签、发布日期、阅读时长、标题和摘要等信息
 */
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Article } from '@/lib/types';
import { getCategoryByKey } from '@/lib/data';

/** 分类强调色映射表，根据分类的 accent 字段匹配对应的背景色和文字色样式 */
const accentMap: Record<string, string> = {
  lemon: 'bg-lemon-300/40 text-ink-900',
  orange: 'bg-orange-400/30 text-ink-900',
  mint: 'bg-mint-300/50 text-ink-900',
  blush: 'bg-blush-300/60 text-ink-900',
};

/**
 * 文章卡片组件
 * @param article - 文章数据对象
 * @param variant - 卡片展示样式，可选值：'default'（默认）、'feature'（特色）、'compact'（紧凑）
 */
export default function ArticleCard({
  article,
  variant = 'default',
}: {
  article: Article;
  variant?: 'default' | 'feature' | 'compact';
}) {
  /** 根据文章分类键获取分类详细信息 */
  const cat = getCategoryByKey(article.category);
  /** 分类标签的样式类名，根据分类强调色动态生成，无匹配时使用默认样式 */
  const pillClass = cat ? accentMap[cat.accent] : 'bg-cream-200 text-ink-800';

  // 特色样式：大卡片展示，包含完整封面、标题、摘要和阅读按钮
  if (variant === 'feature') {
    return (
      <Link
        to={`/articles/${article.id}`}
        className="group relative block overflow-hidden rounded-3xl bg-cream-50 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
      >
        {/* 文章封面图片区域，16:10 比例 */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* 文章内容区域 */}
        <div className="p-7">
          {/* 元信息行：分类标签、日期、阅读时长 */}
          <div className="flex items-center gap-2 text-xs text-ink-600">
            <span
              className={`px-2.5 py-1 rounded-full font-medium ${pillClass}`}
            >
              {cat?.name}
            </span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {article.readingMinutes} 分钟
            </span>
          </div>
          {/* 文章标题 */}
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900 leading-snug group-hover:text-orange-600 transition-colors text-balance">
            {article.title}
          </h3>
          {/* 文章摘要 */}
          <p className="mt-2 text-ink-600 leading-relaxed text-pretty">
            {article.excerpt}
          </p>
          {/* 继续阅读按钮 */}
          <div className="mt-4 inline-flex items-center gap-1 text-sm text-orange-600 font-medium">
            继续阅读
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    );
  }

  // 紧凑样式：横向排列，仅显示分类、日期和标题，适用于列表展示
  if (variant === 'compact') {
    return (
      <Link
        to={`/articles/${article.id}`}
        className="group flex items-center gap-4 py-4 border-b border-ink-900/8 last:border-b-0"
      >
        {/* 左侧文字内容区域 */}
        <div className="flex-1 min-w-0">
          {/* 分类和日期 */}
          <div className="flex items-center gap-2 text-[11px] text-ink-600 mb-1.5">
            <span className={`px-2 py-0.5 rounded-full ${pillClass}`}>
              {cat?.name}
            </span>
            <span>{article.date}</span>
          </div>
          {/* 文章标题，超出省略 */}
          <h4 className="font-display text-base text-ink-900 font-semibold truncate group-hover:text-orange-600 transition-colors">
            {article.title}
          </h4>
        </div>
        {/* 右侧箭头图标 */}
        <ArrowUpRight
          size={16}
          className="text-ink-500 group-hover:text-orange-500 transition-colors flex-shrink-0"
        />
      </Link>
    );
  }

  // 默认样式：标准卡片，包含封面、分类、阅读时长、标题和摘要
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block overflow-hidden rounded-2xl bg-cream-50 border border-ink-900/6 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
    >
      {/* 文章封面图片区域，16:10 比例 */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {/* 文章内容区域 */}
      <div className="p-6">
        {/* 元信息行：分类标签和阅读时长 */}
        <div className="flex items-center gap-2 text-xs text-ink-600">
          <span className={`px-2.5 py-1 rounded-full font-medium ${pillClass}`}>
            {cat?.name}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {article.readingMinutes} 分钟
          </span>
        </div>
        {/* 文章标题 */}
        <h3 className="mt-3 font-display text-lg font-semibold text-ink-900 leading-snug group-hover:text-orange-600 transition-colors text-balance">
          {article.title}
        </h3>
        {/* 文章摘要，限制显示2行 */}
        <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2 text-pretty">
          {article.excerpt}
        </p>
        {/* 发布日期 */}
        <div className="mt-4 text-xs text-ink-500">{article.date}</div>
      </div>
    </Link>
  );
}
