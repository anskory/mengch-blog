/**
 * 分类网格组件
 * 以网格布局展示所有文章分类，每个分类卡片包含分类名称和描述
 * 点击分类卡片可跳转到对应分类的文章列表页面
 */
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/lib/data';

/** 分类卡片渐变背景色映射表，根据分类的 accent 字段匹配对应的渐变起始色 */
const accentBg: Record<string, string> = {
  lemon: 'from-lemon-300/40 via-lemon-300/10',
  orange: 'from-orange-400/40 via-orange-400/10',
  mint: 'from-mint-300/50 via-mint-300/10',
  blush: 'from-blush-300/60 via-blush-300/10',
};

/** 分类圆点颜色映射表，根据分类的 accent 字段匹配对应的圆点背景色 */
const accentDot: Record<string, string> = {
  lemon: 'bg-lemon-400',
  orange: 'bg-orange-500',
  mint: 'bg-mint-500',
  blush: 'bg-blush-400',
};

/**
 * 分类网格组件
 * 展示所有文章分类的卡片网格，支持点击跳转至对应分类的文章列表
 */
export default function CategoryGrid() {
  return (
    <section className="container max-w-6xl">
      {/* 区块标题和查看全部链接 */}
      <div className="flex items-end justify-between mb-8">
        <div>
          {/* 眉题 */}
          <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-medium">
            Browse by
          </p>
          {/* 主标题 */}
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink-900 font-semibold tracking-tight">
            主题分类
          </h2>
        </div>
        {/* 查看全部文章链接，仅在中等及以上屏幕显示 */}
        <Link
          to="/articles"
          className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-700 hover:text-orange-600 transition-colors"
        >
          查看全部文章
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* 分类卡片网格：单列（移动端）/ 两列（平板及以上） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* 遍历所有分类生成卡片 */}
        {categories.map((c, idx) => (
          <Link
            key={c.key}
            to={`/articles?category=${c.key}`}
            // 分类卡片样式：渐变背景 + 悬浮动画效果
            className={`group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-gradient-to-br ${accentBg[c.accent]} to-transparent p-7 hover:shadow-glow transition-all duration-500 hover:-translate-y-0.5`}
            // 错开动画延迟，营造依次出现的效果
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                {/* 分类标识圆点 */}
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${accentDot[c.accent]}`}
                />
                {/* 分类名称 */}
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">
                  {c.name}
                </h3>
                {/* 分类描述 */}
                <p className="mt-2 text-sm text-ink-600">{c.description}</p>
              </div>
              {/* 右上角箭头图标，悬浮时有位移动画 */}
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
