import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import SectionHeader from '@/components/SectionHeader';
import { articles, categories } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ArticleList() {
  const [params, setParams] = useSearchParams();
  const current = params.get('category') ?? 'all';

  const list = useMemo(() => {
    if (current === 'all') return articles;
    return articles.filter((a) => a.category === current);
  }, [current]);

  return (
    <div className="container max-w-6xl pt-12 pb-20">
      <SectionHeader
        eyebrow="All Articles"
        title="所有文章"
        description={`目前共 ${articles.length} 篇文章，按时间倒序排列。`}
      />

      {/* 筛选器 */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 -mx-1 px-1">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-600 mr-1 flex-shrink-0">
          <Filter size={12} />
          筛选
        </span>
        <FilterChip
          active={current === 'all'}
          onClick={() => setParams({})}
          label="全部"
        />
        {categories.map((c) => (
          <FilterChip
            key={c.key}
            active={current === c.key}
            onClick={() => setParams({ category: c.key })}
            label={c.name}
          />
        ))}
      </div>

      {list.length === 0 ? (
        <div className="py-24 text-center text-ink-500 text-sm">
          这个分类下还没有文章 🍃
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

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
        active
          ? 'bg-sun-gradient text-ink-900 border-transparent shadow-soft'
          : 'bg-cream-50 text-ink-700 border-ink-900/8 hover:border-orange-400/60 hover:text-orange-600'
      )}
    >
      {label}
    </button>
  );
}
