import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/lib/data';

const accentBg: Record<string, string> = {
  lemon: 'from-lemon-300/40 via-lemon-300/10',
  orange: 'from-orange-400/40 via-orange-400/10',
  mint: 'from-mint-300/50 via-mint-300/10',
  blush: 'from-blush-300/60 via-blush-300/10',
};

const accentDot: Record<string, string> = {
  lemon: 'bg-lemon-400',
  orange: 'bg-orange-500',
  mint: 'bg-mint-500',
  blush: 'bg-blush-400',
};

export default function CategoryGrid() {
  return (
    <section className="container max-w-6xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-medium">
            Browse by
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink-900 font-semibold tracking-tight">
            主题分类
          </h2>
        </div>
        <Link
          to="/articles"
          className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-orange-600 transition-colors"
        >
          查看全部文章
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {categories.map((c, idx) => (
          <Link
            key={c.key}
            to={`/articles?category=${c.key}`}
            className={`group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-gradient-to-br ${accentBg[c.accent]} to-transparent p-7 hover:shadow-glow transition-all duration-500 hover:-translate-y-0.5`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${accentDot[c.accent]}`}
                />
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{c.description}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-ink-500 group-hover:text-orange-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
