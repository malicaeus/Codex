// Wiki content structure and types
export interface WikiArticle {
  slug: string;
  title: string;
  content: string;
  category: string;
  path: string;
  frontmatter: ArticleFrontmatter;
}

export interface ArticleFrontmatter {
  title?: string;
  description?: string;
  image?: string;
  infobox?: InfoboxData;
  tags?: string[];
  created?: string;
  updated?: string;
  featured?: boolean;
}

export interface InfoboxData {
  title: string;
  image?: string;
  rows: { label: string; value: string }[];
}

export interface WikiCategory {
  name: string;
  slug: string;
  path: string;
  articles: WikiArticle[];
  subcategories: WikiCategory[];
}

export interface WikiNavItem {
  title: string;
  slug: string;
  path: string;
  type: 'article' | 'category';
  children?: WikiNavItem[];
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface SearchResult {
  article: WikiArticle;
  matches: string[];
  score: number;
}
