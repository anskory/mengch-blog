import data from '@/data/articles.json';
import type { Article, Category, CategoryKey, SiteMeta } from '@/lib/types';

export const site: SiteMeta = data.site;
export const categories: Category[] = data.categories as Category[];
export const articles: Article[] = (data.articles as Article[]).sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);

export const getArticleById = (id: string): Article | undefined =>
  articles.find((a) => a.id === id);

export const getCategoryByKey = (key: string): Category | undefined =>
  categories.find((c) => c.key === key);

export const getArticlesByCategory = (key: CategoryKey): Article[] =>
  articles.filter((a) => a.category === key);

export const getFeaturedArticles = (): Article[] => articles.filter((a) => a.featured);

export const getAdjacentArticles = (id: string) => {
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? articles[idx - 1] : articles[articles.length - 1],
    next: idx < articles.length - 1 ? articles[idx + 1] : articles[0],
  };
};
