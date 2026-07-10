/**
 * 博客数据访问层
 * 从 JSON 数据源加载文章、分类和站点信息，并提供查询工具函数
 */
import data from '@/data/articles.json';
import type { Article, Category, CategoryKey, SiteMeta } from '@/lib/types';

/** 站点全局元信息 */
export const site: SiteMeta = data.site;

/** 文章分类列表 */
export const categories: Category[] = data.categories as Category[];

/**
 * 所有文章列表，按发布日期倒序排列（最新的在前）
 */
export const articles: Article[] = (data.articles as Article[]).sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);

/**
 * 根据文章 ID 获取文章详情
 * @param id - 文章唯一标识
 * @returns 匹配的文章对象，未找到则返回 undefined
 */
export const getArticleById = (id: string): Article | undefined =>
  articles.find((a) => a.id === id);

/**
 * 根据分类键值获取分类信息
 * @param key - 分类唯一键值
 * @returns 匹配的分类对象，未找到则返回 undefined
 */
export const getCategoryByKey = (key: string): Category | undefined =>
  categories.find((c) => c.key === key);

/**
 * 获取指定分类下的所有文章
 * @param key - 分类键值
 * @returns 该分类下的文章数组（已按日期倒序）
 */
export const getArticlesByCategory = (key: CategoryKey): Article[] =>
  articles.filter((a) => a.category === key);

/**
 * 获取所有精选文章
 * @returns 精选文章数组
 */
export const getFeaturedArticles = (): Article[] => articles.filter((a) => a.featured);

/**
 * 获取文章的上一篇和下一篇
 * 用于文章详情页底部的导航，首尾循环
 * @param id - 当前文章 ID
 * @returns 包含 prev（上一篇）和 next（下一篇）的对象
 */
export const getAdjacentArticles = (id: string) => {
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    // 如果是第一篇，上一篇就是最后一篇（循环）
    prev: idx > 0 ? articles[idx - 1] : articles[articles.length - 1],
    // 如果是最后一篇，下一篇就是第一篇（循环）
    next: idx < articles.length - 1 ? articles[idx + 1] : articles[0],
  };
};
