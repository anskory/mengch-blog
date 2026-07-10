/**
 * 文章列表页组件
 * 功能：展示所有文章列表，支持按分类筛选文章
 * 交互：通过 URL 查询参数（category）控制当前选中的分类，筛选结果实时更新
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import SectionHeader from '@/components/SectionHeader';
import { articles, categories } from '@/lib/data';
import { cn } from '@/lib/utils';

/**
 * 文章列表页组件
 * @returns 返回文章列表页的完整 JSX 结构，包含分类筛选器和文章卡片网格
 */
export default function ArticleList() {
  /** URL 查询参数管理钩子，用于读取和设置分类筛选参数 */
  const [params, setParams] = useSearchParams();
  /** 当前选中的分类，默认为 'all'（全部） */
  const current = params.get('category') ?? 'all';

  /**
   * 根据当前分类筛选文章列表
   * 使用 useMemo 缓存计算结果，避免每次渲染都重新筛选
   */
  const list = useMemo(() => {
    // 选中"全部"时返回所有文章
    if (current === 'all') return articles;
    // 按分类筛选文章
    return articles.filter((a) => a.category === current);
  }, [current]);

  return (
    <div className="container max-w-6xl pt-12 pb-20">
      {/* 页面标题区域 */}
      <SectionHeader
        eyebrow="All Articles"
        title="所有文章"
        description={`目前共 ${articles.length} 篇文章，按时间倒序排列。`}
      />

      {/* 分类筛选器区域 */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 -mx-1 px-1">
        {/* 筛选图标和文字标签 */}
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-600 mr-1 flex-shrink-0">
          <Filter size={12} />
          筛选
        </span>
        {/* "全部"筛选按钮 */}
        <FilterChip
          active={current === 'all'}
          onClick={() => setParams({})}
          label="全部"
        />
        {/* 动态渲染所有分类筛选按钮 */}
        {categories.map((c) => (
          <FilterChip
            key={c.key}
            active={current === c.key}
            onClick={() => setParams({ category: c.key })}
            label={c.name}
          />
        ))}
      </div>

      {/* 文章列表展示区域 */}
      {list.length === 0 ? (
        /* 该分类下无文章时的空状态提示 */
        <div className="py-24 text-center text-ink-500 text-sm">
          这个分类下还没有文章 🍃
        </div>
      ) : (
        /* 文章卡片网格：响应式布局（移动端1列，平板2列，桌面3列） */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 分类筛选按钮组件
 * @param active - 是否为当前选中状态
 * @param onClick - 点击事件回调
 * @param label - 按钮显示的文字
 * @returns 返回筛选按钮的 JSX 结构
 */
function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
        // 激活状态与未激活状态的样式切换
        active
          ? 'bg-sun-gradient text-ink-900 border-transparent shadow-soft'
          : 'bg-cream-50 text-ink-700 border-ink-900/8 hover:border-orange-400/60 hover:text-orange-600'
      )}
    >
      {label}
    </button>
  );
}
