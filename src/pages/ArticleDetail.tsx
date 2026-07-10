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

const accentMap: Record<string, string> = {
  lemon: 'bg-lemon-300/40 text-ink-900',
  orange: 'bg-orange-400/30 text-ink-900',
  mint: 'bg-mint-300/50 text-ink-900',
  blush: 'bg-blush-300/60 text-ink-900',
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
  const { prev, next } = useMemo(
    () => (id ? getAdjacentArticles(id) : { prev: undefined, next: undefined }),
    [id]
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

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

  const cat = getCategoryByKey(article.category);
  const html = renderMarkdown(article.content);
  const pill = cat ? accentMap[cat.accent] : 'bg-cream-200 text-ink-800';

  return (
    <article className="pb-20">
      {/* 顶部进度条 */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 bg-sun-gradient transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* 封面 */}
      <div className="relative h-[44vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/40 to-transparent" />
      </div>

      <div className="container max-w-3xl -mt-32 relative">
        <div className="rounded-3xl bg-cream-50/95 backdrop-blur border border-ink-900/8 shadow-soft p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className={`px-2.5 py-1 rounded-full font-medium ${pill}`}>
              {cat?.name}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} /> {article.date}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> 约 {article.readingMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl md:text-5xl text-ink-900 font-semibold leading-tight tracking-tight text-balance">
            {article.title}
          </h1>

          <p className="mt-4 text-ink-600 leading-relaxed text-pretty text-lg">
            {article.excerpt}
          </p>

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

        {/* 正文 */}
        <div
          className={cn('prose-cn mt-12 mx-auto')}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* 上下篇 */}
        <div className="divider-soft my-12" />
        <div className="grid sm:grid-cols-2 gap-4">
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
