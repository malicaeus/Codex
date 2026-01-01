import type { WikiArticle, WikiCategory, WikiNavItem, SearchResult, TOCItem, InfoboxData } from '@/types/wiki';

// Use Vite's glob import to load all markdown files at build time
const contentModules = import.meta.glob('/content/**/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

// Simple frontmatter parser (browser-compatible, no gray-matter dependency)
function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const yamlContent = match[1];
  const markdownContent = match[2];
  const data: Record<string, any> = {};
  
  // Parse YAML manually (simple key-value and arrays)
  let currentKey = '';
  let inArray = false;
  let inObject = false;
  let objectKey = '';
  let objectData: any[] = [];
  let currentObject: Record<string, any> = {};
  
  yamlContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    // Handle array items
    if (trimmed.startsWith('- ') && inArray && !inObject) {
      const value = trimmed.slice(2).trim();
      if (!data[currentKey]) data[currentKey] = [];
      data[currentKey].push(value);
      return;
    }
    
    // Handle nested object in array (like infobox.data)
    if (trimmed.startsWith('- ') && inObject) {
      if (Object.keys(currentObject).length > 0) {
        objectData.push(currentObject);
      }
      currentObject = {};
      const rest = trimmed.slice(2);
      const colonIdx = rest.indexOf(':');
      if (colonIdx > 0) {
        const k = rest.slice(0, colonIdx).trim();
        const v = rest.slice(colonIdx + 1).trim();
        currentObject[k] = v;
      }
      return;
    }
    
    // Handle object property continuation
    if (inObject && line.startsWith('      ')) {
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0) {
        const k = trimmed.slice(0, colonIdx).trim();
        const v = trimmed.slice(colonIdx + 1).trim();
        currentObject[k] = v;
      }
      return;
    }
    
    // Regular key: value
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx > 0) {
      const key = trimmed.slice(0, colonIdx).trim();
      const value = trimmed.slice(colonIdx + 1).trim();
      
      // Check if starting a new section
      if (line.startsWith('  ') && inObject) {
        // Nested property in infobox
        if (key === 'data') {
          inObject = true;
          objectKey = 'data';
          objectData = [];
          return;
        }
        data[objectKey] = data[objectKey] || {};
        data[objectKey][key] = value;
        return;
      }
      
      inArray = false;
      inObject = false;
      
      if (objectData.length > 0 || Object.keys(currentObject).length > 0) {
        if (Object.keys(currentObject).length > 0) objectData.push(currentObject);
        data[objectKey] = { ...data[objectKey], data: objectData };
        objectData = [];
        currentObject = {};
      }
      
      if (!value) {
        // Start of array or object
        currentKey = key;
        if (key === 'infobox') {
          inObject = true;
          objectKey = 'infobox';
          data[key] = {};
        } else {
          inArray = true;
        }
      } else {
        // Handle booleans
        if (value === 'true') data[key] = true;
        else if (value === 'false') data[key] = false;
        else data[key] = value;
      }
    }
  });
  
  // Finalize any pending object data
  if (objectData.length > 0 || Object.keys(currentObject).length > 0) {
    if (Object.keys(currentObject).length > 0) objectData.push(currentObject);
    data[objectKey] = { ...data[objectKey], data: objectData };
  }
  
  return { data, content: markdownContent };
}

// Transform infobox data from frontmatter format to app format
function transformInfobox(infobox: any): InfoboxData | undefined {
  if (!infobox) return undefined;
  
  return {
    title: infobox.title || '',
    image: infobox.image,
    rows: infobox.data?.map((item: any) => ({
      label: item.label,
      value: item.value,
    })) || [],
  };
}

// Parse all markdown files and extract their content
function parseMarkdownFiles(): WikiArticle[] {
  const articles: WikiArticle[] = [];
  
  for (const [filePath, content] of Object.entries(contentModules)) {
    if (typeof content !== 'string') continue;
    
    const { data, content: markdownContent } = parseFrontmatter(content);
    
    const slug = filePath.replace('/content/', '').replace('.md', '');
    const pathParts = slug.split('/');
    const category = pathParts.length > 1 ? pathParts[0] : '';
    const fileName = pathParts[pathParts.length - 1];
    const title = data.title || fileName.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const path = `/wiki/${slug}`;
    
    articles.push({
      slug,
      title,
      content: markdownContent.trim(),
      category,
      path,
      frontmatter: {
        title: data.title,
        description: data.description,
        image: data.image,
        infobox: transformInfobox(data.infobox),
        tags: data.tags,
        created: data.created,
        updated: data.updated,
        featured: data.featured,
      },
    });
  }
  
  return articles;
}

let cachedArticles: WikiArticle[] | null = null;

export function getAllArticles(): WikiArticle[] {
  if (!cachedArticles) cachedArticles = parseMarkdownFiles();
  return cachedArticles;
}

export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return getAllArticles().find(a => a.slug === slug);
}

export function getFeaturedArticles(): WikiArticle[] {
  return getAllArticles().filter(a => a.frontmatter.featured);
}

export function getRecentArticles(limit = 5): WikiArticle[] {
  return getAllArticles()
    .sort((a, b) => (b.frontmatter.updated || b.frontmatter.created || '').localeCompare(a.frontmatter.updated || a.frontmatter.created || ''))
    .slice(0, limit);
}

export function getArticlesByCategory(categorySlug: string): WikiArticle[] {
  return getAllArticles().filter(a => a.category === categorySlug);
}

export function getAllCategories(): WikiCategory[] {
  const articles = getAllArticles();
  const categoryMap = new Map<string, WikiCategory>();
  
  for (const article of articles) {
    if (!article.category) continue;
    const existing = categoryMap.get(article.category);
    if (existing) {
      existing.articles.push(article);
    } else {
      const name = article.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      categoryMap.set(article.category, { name, slug: article.category, path: `/wiki/${article.category}`, articles: [article], subcategories: [] });
    }
  }
  return Array.from(categoryMap.values());
}

export function getCategoryBySlug(slug: string): WikiCategory | undefined {
  return getAllCategories().find(c => c.slug === slug);
}

export function getNavigation(): WikiNavItem[] {
  const articles = getAllArticles();
  const categories = getAllCategories();
  
  const navItems: WikiNavItem[] = categories.map(cat => ({
    title: cat.name, slug: cat.slug, path: cat.path, type: 'category' as const,
    children: cat.articles.map(a => ({ title: a.title, slug: a.slug, path: a.path, type: 'article' as const })),
  }));
  
  const rootArticles = articles.filter(a => !a.category && a.slug !== 'index').map(a => ({ title: a.title, slug: a.slug, path: a.path, type: 'article' as const }));
  return [...rootArticles, ...navItems];
}

export function searchArticles(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const article of getAllArticles()) {
    const matches: string[] = [];
    let score = 0;
    if (article.title.toLowerCase().includes(lowerQuery)) { matches.push(`Title: ${article.title}`); score += 10; }
    if (article.frontmatter.description?.toLowerCase().includes(lowerQuery)) { matches.push(`Description: ${article.frontmatter.description}`); score += 5; }
    const contentIndex = article.content.toLowerCase().indexOf(lowerQuery);
    if (contentIndex !== -1) { matches.push(`...${article.content.slice(Math.max(0, contentIndex - 30), contentIndex + query.length + 30)}...`); score += 3; }
    if (article.frontmatter.tags?.some(t => t.toLowerCase().includes(lowerQuery))) { matches.push(`Tags: ${article.frontmatter.tags.join(', ')}`); score += 4; }
    if (matches.length > 0) results.push({ article, matches, score });
  }
  return results.sort((a, b) => b.score - a.score);
}

export function getBreadcrumbs(article: WikiArticle): { label: string; path: string }[] {
  const breadcrumbs: { label: string; path: string }[] = [{ label: 'Home', path: '/' }];
  if (article.category) {
    const cat = getCategoryBySlug(article.category);
    breadcrumbs.push({ label: cat?.name || article.category.charAt(0).toUpperCase() + article.category.slice(1), path: `/wiki/category/${article.category}` });
  }
  breadcrumbs.push({ label: article.title, path: article.path });
  return breadcrumbs;
}

export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    toc.push({ id, text, level });
  }
  return toc;
}

export function parseWikiLinks(content: string): string {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, displayText) => {
    const slug = link.trim().toLowerCase().replace(/\s+/g, '-');
    const text = displayText?.trim() || link.trim();
    return `[${text}](/wiki/article/${slug})`;
  });
}

// Find all articles that link to a given article
export function getBacklinks(targetSlug: string): WikiArticle[] {
  const allArticles = getAllArticles();
  const backlinks: WikiArticle[] = [];
  
  // Normalize target slug for comparison
  const normalizedTarget = targetSlug.toLowerCase().replace(/\s+/g, '-');
  
  for (const article of allArticles) {
    // Skip self
    if (article.slug === targetSlug) continue;
    
    // Check for wiki-style links [[target]] or [[target|display]]
    const wikiLinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    let match;
    
    while ((match = wikiLinkRegex.exec(article.content)) !== null) {
      const linkedSlug = match[1].trim().toLowerCase().replace(/\s+/g, '-');
      if (linkedSlug === normalizedTarget) {
        backlinks.push(article);
        break;
      }
    }
    
    // Also check for markdown links to the article
    if (!backlinks.includes(article)) {
      const mdLinkRegex = /\[([^\]]+)\]\(\/wiki\/article\/([^)]+)\)/g;
      while ((match = mdLinkRegex.exec(article.content)) !== null) {
        if (match[2] === normalizedTarget) {
          backlinks.push(article);
          break;
        }
      }
    }
  }
  
  return backlinks;
}

// Calculate estimated reading time in minutes
export function calculateReadingTime(content: string): number {
  // Clean markdown content
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`[^`]+`/g, '')         // Inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Images
    .replace(/\[[^\]]*\]\([^)]*\)/g, '$1') // Links (keep text)
    .replace(/[#*_~>`-]/g, '')       // Markdown syntax
    .trim();
  
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
