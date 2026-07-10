export type CategoryKey = 'frontend' | 'backend' | 'life' | 'notes';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryKey;
  tags: string[];
  cover: string;
  date: string;
  readingMinutes: number;
  featured?: boolean;
  content: string;
}

export interface Category {
  key: CategoryKey;
  name: string;
  description: string;
  accent: 'lemon' | 'orange' | 'mint' | 'blush';
}

export interface NavItem {
  label: string;
  to: string;
}

export interface SocialItem {
  label: string;
  url: string;
}

export interface SiteMeta {
  name: string;
  slogan: string;
  description: string;
  owner: string;
  email: string;
  social: SocialItem[];
  nav: NavItem[];
}
