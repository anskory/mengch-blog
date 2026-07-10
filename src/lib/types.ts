/**
 * 全局类型定义
 * 定义了博客系统中所有核心数据结构的接口和类型别名
 */

/** 文章分类的键值枚举 */
export type CategoryKey = 'frontend' | 'backend' | 'life' | 'notes';

/**
 * 文章数据结构
 * 包含文章的完整信息，包括元数据和正文内容
 */
export interface Article {
  /** 文章唯一标识，用于路由和查询 */
  id: string;
  /** 文章标题 */
  title: string;
  /** 文章摘要，显示在卡片和列表中 */
  excerpt: string;
  /** 文章所属分类 */
  category: CategoryKey;
  /** 文章标签数组 */
  tags: string[];
  /** 封面图片 URL */
  cover: string;
  /** 发布日期，格式 YYYY-MM-DD */
  date: string;
  /** 预估阅读时长（分钟） */
  readingMinutes: number;
  /** 是否为精选文章，精选文章会在首页突出展示 */
  featured?: boolean;
  /** 文章正文，Markdown 格式 */
  content: string;
}

/**
 * 文章分类数据结构
 * 定义每个分类的展示信息和配色主题
 */
export interface Category {
  /** 分类唯一键值 */
  key: CategoryKey;
  /** 分类显示名称 */
  name: string;
  /** 分类描述文字 */
  description: string;
  /** 分类主题色，用于卡片和标签的视觉区分 */
  accent: 'lemon' | 'orange' | 'mint' | 'blush';
}

/**
 * 导航菜单项
 */
export interface NavItem {
  /** 菜单显示文本 */
  label: string;
  /** 跳转路径 */
  to: string;
}

/**
 * 社交媒体链接项
 */
export interface SocialItem {
  /** 平台名称 */
  label: string;
  /** 链接地址 */
  url: string;
}

/**
 * 站点全局元信息
 * 包含博客名称、口号、作者信息、联系方式等
 */
export interface SiteMeta {
  /** 博客名称 */
  name: string;
  /** 博客口号/副标题 */
  slogan: string;
  /** 博客描述 */
  description: string;
  /** 作者昵称 */
  owner: string;
  /** 联系邮箱 */
  email: string;
  /** 社交媒体链接列表 */
  social: SocialItem[];
  /** 顶部导航菜单 */
  nav: NavItem[];
}
