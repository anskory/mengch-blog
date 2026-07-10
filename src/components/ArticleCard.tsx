import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Article } from '@/lib/types';
import { getCategoryByKey } from '@/lib/data';

const accentMap: Record<string, string> = {
  lemon: 'bg-lemon-300/40 text-ink-900',
  orange: 'bg-orange-400/30 text-ink-900',
  mint: 'bg-mint-300/50 text-ink-900',
  blush: 'bg-blush-300/60 text-ink-900',
};

export default function ArticleCard({
  article,
  variant = 'default',
}: {
  article: Article;
  variant?: 'default' | 'feature' | 'compact';
}) {
  const cat = getCategoryByKey(article.category);
  const pillClass = cat ? accentMap[cat.accent] : 'bg-cream-200 text-ink-800';

  if (variant === 'feature') {
    return (
      <Link
        to={`/articles/${article.id}`}
        className="group relative block overflow-hidden rounded-3xl bg-cream-50 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-7">
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
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900 leading-snug group-hover:text-orange-600 transition-colors text-balance">
            {article.title}
          </h3>
          <p className="mt-2 text-ink-600 leading-relaxed text-pretty">
            {article.excerpt}
          </p>
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

  if (variant === 'compact') {
    return (
      <Link
        to={`/articles/${article.id}`}
        className="group flex items-center gap-4 py-4 border-b border-ink-900/8 last:border-b-0"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-ink-600 mb-1.5">
            <span className={`px-2 py-0.5 rounded-full ${pillClass}`}>
              {cat?.name}
            </span>
            <span>{article.date}</span>
          </div>
          <h4 className="font-display text-base text-ink-900 font-semibold truncate group-hover:text-orange-600 transition-colors">
            {article.title}
          </h4>
        </div>
        <ArrowUpRight
          size={16}
          className="text-ink-500 group-hover:text-orange-500 transition-colors flex-shrink-0"
        />
      </Link>
    );
  }

  return (
    <Link
      to={`/articles/${article.id}`}
      className="group block overflow-hidden rounded-2xl bg-cream-50 border border-ink-900/6 shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-ink-600">
          <span className={`px-2.5 py-1 rounded-full font-medium ${pillClass}`}>
            {cat?.name}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {article.readingMinutes} 分钟
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-ink-900 leading-snug group-hover:text-orange-600 transition-colors text-balance">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2 text-pretty">
          {article.excerpt}
        </p>
        <div className="mt-4 text-xs text-ink-500">{article.date}</div>
      </div>
    </Link>
  );
}
