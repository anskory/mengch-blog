/**
 * 文章详情页组件
 * 功能：展示单篇文章的完整内容，包含封面图、文章信息、正文渲染、上下篇导航
 * 特性：顶部阅读进度条随滚动实时更新，支持 Markdown 内容渲染
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import {
  getArticleById,
  getAdjacentArticles,
  getCategoryByKey,
} from '@/lib/data';
import { renderMarkdown } from '@/lib/markdown';
import { cn } from '@/lib/utils';

/**
 * 分类强调色映射表
 * 根据分类的 accent 键值匹配对应的背景色和文字色样式类
 */
const accentMap: Record<string, string> = {
  lemon: 'bg-lemon-300/40 text-ink-900',
  orange: 'bg-orange-400/30 text-ink-900',
  mint: 'bg-mint-300/50 text-ink-900',
  blush: 'bg-blush-300/60 text-ink-900',
};

/**
 * 文章详情页组件
 * @returns 返回文章详情页的完整 JSX 结构
 */
export default function ArticleDetail() {
  /** 从 URL 参数中获取文章 ID */
  const { id } = useParams<{ id: string }>();
  /** 根据 ID 获取当前文章对象，ID 不存在时为 undefined */
  const article = id ? getArticleById(id) : undefined;

  /**
   * 获取当前文章的上一篇和下一篇文章
   * 使用 useMemo 缓存计算结果，仅在 ID 变化时重新计算
   */
  const { prev, next } = useMemo(
    () => (id ? getAdjacentArticles(id) : { prev: undefined, next: undefined }),
    [id]
  );

  /** 阅读进度百分比（0-100），用于顶部进度条展示 */
  const [progress, setProgress] = useState(0);

  /**
   * 监听页面滚动事件，实时计算并更新阅读进度
   * 组件挂载时添加监听，卸载时移除监听
   */
  useEffect(() => {
    /** 滚动事件处理函数：计算当前阅读进度百分比 */
    const onScroll = () => {
      const h = document.documentElement;
      // 总可滚动高度 = 文档总高度 - 视口高度
      const total = h.scrollHeight - h.clientHeight;
      // 当前进度百分比 = 已滚动高度 / 总可滚动高度 * 100
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      // 限制进度值在 0-100 范围内
      setProgress(Math.min(100, Math.max(0, p)));
    };

    // 注册滚动事件监听器（使用 passive 提升滚动性能）
    window.addEventListener('scroll', onScroll, { passive: true });
    // 初始调用一次，确保页面加载时进度条正确显示
    onScroll();

    // 组件卸载时移除事件监听器，防止内存泄漏
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  // 文章不存在时显示 404 提示
  if (!article) {
    return (
      <div className="container max-w-3xl pt-24 pb-20 text-center">
        <h1 className="font-display text-3xl text-ink-900 font-semibold">
          找不到这篇文章
        </h1>
        <p className="mt-3 text-ink-600">
          它可能已经被删除，或者链接拼写错误。
        </p>
        <Link
          to="/articles"
          className="mt-6 inline-flex items-center gap-1.5 text-orange-600 hover:underline"
        >
          <ArrowLeft size={14} /> 返回文章列表
        </Link>
      </div>
    );
  }

  /** 获取文章所属分类的详细信息 */
  const cat = getCategoryByKey(article.category);
  /** 将 Markdown 内容渲染为 HTML 字符串 */
  const html = renderMarkdown(article.content);
  /** 分类标签的强调色样式类，无匹配时使用默认样式 */
  const pill = cat ? accentMap[cat.accent] : 'bg-cream-200 text-ink-800';

  return (
    <article className="pb-20">
      {/* 顶部阅读进度条：固定在页面顶部，宽度随阅读进度变化 */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 bg-sun-gradient transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* 文章封面图区域 */}
      <div className="relative h-[44vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* 底部渐变遮罩，使封面与下方内容平滑过渡 */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/40 to-transparent" />
      </div>

      {/* 文章主体内容容器（向上偏移与封面图叠加） */}
      <div className="container max-w-3xl -mt-32 relative">
        {/* 文章头部信息卡片 */}
        <div className="rounded-3xl bg-cream-50/95 backdrop-blur border border-ink-900/8 shadow-soft p-8 md:p-12">
          {/* 文章元信息：分类标签、发布日期、阅读时长 */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-600">
            {/* 分类标签 */}
            <span className={`px-2.5 py-1 rounded-full font-medium ${pill}`}>
              {cat?.name}
            </span>
            <span>·</span>
            {/* 发布日期 */}
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} /> {article.date}
            </span>
            <span>·</span>
            {/* 预计阅读时长 */}
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> 约 {article.readingMinutes} 分钟阅读
            </span>
          </div>

          {/* 文章标题 */}
          <h1 className="mt-4 font-display text-3xl md:text-5xl text-ink-900 font-semibold leading-tight tracking-tight text-balance">
            {article.title}
          </h1>

          {/* 文章摘要 */}
          <p className="mt-4 text-ink-600 leading-relaxed text-pretty text-lg">
            {article.excerpt}
          </p>

          {/* 文章标签列表 */}
          <div className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-cream-200 text-ink-700"
              >
                # {t}
              </span>
            ))}
          </div>
        </div>

        {/* 文章正文内容：使用 dangerouslySetInnerHTML 渲染 Markdown 转换后的 HTML */}
        <div
          className={cn('prose-cn mt-12 mx-auto')}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* 上下篇文章导航区域 */}
        <div className="divider-soft my-12" />
        <div className="grid sm:grid-cols-2 gap-4">
          {/* 上一篇文章链接 */}
          {prev && (
            <Link
              to={`/articles/${prev.id}`}
              className="group block p-5 rounded-2xl border border-ink-900/8 hover:border-orange-400/50 hover:shadow-soft transition-all"
            >
              <div className="text-xs text-ink-500 inline-flex items-center gap-1">
                <ArrowLeft size={12} /> 上一篇
              </div>
              <div className="mt-2 font-display text-base text-ink-900 font-semibold group-hover:text-orange-600 transition-colors line-clamp-2">
                {prev.title}
              </div>
            </Link>
          )}
          {/* 下一篇文章链接 */}
          {next && (
            <Link
              to={`/articles/${next.id}`}
              className="group block p-5 rounded-2xl border border-ink-900/8 hover:border-orange-400/50 hover:shadow-soft transition-all sm:text-right sm:ml-auto"
            >
              <div className="text-xs text-ink-500 inline-flex items-center gap-1">
                下一篇
                <ArrowRight size={12} />
              </div>
              <div className="mt-2 font-display text-base text-ink-900 font-semibold group-hover:text-orange-600 transition-colors line-clamp-2">
                {next.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
