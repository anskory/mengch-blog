// 首页组件
// 功能：展示博客首页内容，包含精选文章区域、分类导航、最新文章列表等模块
// 布局：Hero 英雄区 → 精选文章区 → 分类网格 → 最新文章时间线 → 关于预告
import Hero from '@/components/Hero';
import SectionHeader from '@/components/SectionHeader';
import ArticleCard from '@/components/ArticleCard';
import CategoryGrid from '@/components/CategoryGrid';
import AboutTeaser from '@/components/AboutTeaser';
import { getFeaturedArticles, articles } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// 首页组件
// @returns 返回首页的完整 JSX 结构
export default function Home() {
  // 获取所有精选文章列表
  const featured = getFeaturedArticles();
  // 首篇精选文章（用于大卡片展示），若无精选则取第一篇文章
  const hero = featured[0] ?? articles[0];
  // 剩余精选文章（第2、3篇），用于紧凑卡片展示
  const restFeatured = featured.slice(1, 3);
  // 最新发布的5篇文章，用于最新文章时间线展示
  const latest = articles.slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* 首页英雄区域 */}
      <Hero />

      {/* 精选文章区域 */}
      <section className="container max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader
            eyebrow="Editor's pick"
            title="本期精选"
            description="从近期的文章里，挑选了 3 篇最想分享给你的内容。"
          />
          {/* 查看全部文章链接（仅在 sm 及以上屏幕显示） */}
          <Link
            to="/articles"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-orange-600 transition-colors pb-1"
          >
            查看全部
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 精选文章网格布局：左侧大卡片 + 右侧两个紧凑卡片 */}
        {hero && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 首篇精选：大卡片样式 */}
            <ArticleCard article={hero} variant="feature" />
            <div className="flex flex-col">
              {/* 渲染剩余精选文章的紧凑卡片 */}
              {restFeatured.length > 0 ? (
                restFeatured.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))
              ) : (
                /* 暂无更多精选时的占位提示 */
                <div className="flex-1 flex items-center justify-center text-ink-500 text-sm">
                  更多精选内容正在准备中 🍊
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 间距分隔 */}
      <div className="my-20" />

      {/* 文章分类网格展示 */}
      <CategoryGrid />

      {/* 间距分隔 */}
      <div className="my-20" />

      {/* 最新发布文章时间线区域 */}
      <section className="container max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader
            eyebrow="Recent"
            title="最新发布"
            description="按时间倒序排列的最新文章。"
          />
          {/* 全部文章链接（仅在 sm 及以上屏幕显示） */}
          <Link
            to="/articles"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-orange-600 transition-colors pb-1"
          >
            全部文章
            <ArrowUpRight size={14} />
          </Link>
        </div>
        {/* 最新文章网格：响应式布局（移动端1列，平板2列，桌面3列） */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* 间距分隔 */}
      <div className="my-20" />

      {/* 关于页面预告区域 */}
      <AboutTeaser />
    </div>
  );
}
