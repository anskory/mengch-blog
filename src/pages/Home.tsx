import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import ArticleCard from '@/components/ArticleCard';
import CategoryGrid from '@/components/CategoryGrid';
import AboutTeaser from '@/components/AboutTeaser';
import { getFeaturedArticles, articles } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  const featured = getFeaturedArticles();
  const hero = featured[0] ?? articles[0];
  const restFeatured = featured.slice(1, 3);
  const latest = articles.slice(0, 5);

  return (
    <div className="flex flex-col">
      <Hero />

      {/* 精选文章 */}
      <section className="container max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader
            eyebrow="Editor's pick"
            title="本期精选"
            description="从近期的文章里，挑选了 3 篇最想分享给你的内容。"
          />
          <Link
            to="/articles"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-orange-600 transition-colors pb-1"
          >
            查看全部
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {hero && (
          <div className="grid lg:grid-cols-2 gap-6">
            <ArticleCard article={hero} variant="feature" />
            <div className="flex flex-col">
              {restFeatured.length > 0 ? (
                restFeatured.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center text-ink-500 text-sm">
                  更多精选内容正在准备中 🍊
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="my-20" />

      <CategoryGrid />

      <div className="my-20" />

      {/* 最新文章时间线 */}
      <section className="container max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader
            eyebrow="Recent"
            title="最新发布"
            description="按时间倒序排列的最新文章。"
          />
          <Link
            to="/articles"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-orange-600 transition-colors pb-1"
          >
            全部文章
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <div className="my-20" />

      <AboutTeaser />
    </div>
  );
}
