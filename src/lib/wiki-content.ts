import { WikiArticle, WikiCategory, WikiNavItem, SearchResult, TOCItem } from '@/types/wiki';

// Demo wiki content - in a real app, this would be loaded from files
const wikiContent: Record<string, WikiArticle> = {
  'getting-started': {
    slug: 'getting-started',
    title: 'Getting Started',
    category: 'guides',
    path: '/wiki/guides/getting-started',
    frontmatter: {
      title: 'Getting Started',
      description: 'Learn how to set up and use this wiki template',
      featured: true,
      tags: ['tutorial', 'beginner'],
      created: '2024-01-15',
      updated: '2024-03-20',
    },
    content: `# Getting Started

Welcome to the Wiki Template! This guide will help you understand how to use and customize this wiki for your needs.

## Overview

This wiki template is designed to be:
- **Simple** - Content is stored in Markdown files
- **Fast** - No database required, everything is static
- **Flexible** - Easy to customize and extend
- **Beautiful** - Modern, clean design with dark mode support

## Directory Structure

The wiki content follows a simple folder structure:

\`\`\`
content/
├── guides/
│   ├── getting-started.md
│   └── customization.md
├── reference/
│   ├── markdown-syntax.md
│   └── frontmatter.md
└── examples/
    └── sample-article.md
\`\`\`

## Creating Articles

To create a new article, simply add a new \`.md\` file to the appropriate folder. The file should include YAML frontmatter at the top:

\`\`\`yaml
---
title: My Article Title
description: A brief description
tags: [tag1, tag2]
---
\`\`\`

## Internal Links

You can link to other articles using the [[wiki link]] syntax:

- [[Markdown Syntax]] - Learn about formatting
- [[Customization Guide]] - Customize your wiki

## Next Steps

1. Explore the [[Markdown Syntax]] guide
2. Learn about [[Frontmatter Reference]]
3. Check out the [[Example Article]]

Happy writing!`,
  },
  'markdown-syntax': {
    slug: 'markdown-syntax',
    title: 'Markdown Syntax',
    category: 'reference',
    path: '/wiki/reference/markdown-syntax',
    frontmatter: {
      title: 'Markdown Syntax',
      description: 'Complete guide to Markdown formatting in this wiki',
      tags: ['reference', 'markdown'],
      created: '2024-01-10',
      updated: '2024-02-15',
    },
    content: `# Markdown Syntax

This wiki supports full Markdown syntax with some extensions. Here's a comprehensive guide.

## Headings

Use \`#\` symbols to create headings:

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
\`\`\`

## Text Formatting

- **Bold text** - \`**bold**\`
- *Italic text* - \`*italic*\`
- ~~Strikethrough~~ - \`~~strikethrough~~\`
- \`Inline code\` - \`\\\`code\\\`\`

## Lists

### Unordered Lists
- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

### Ordered Lists
1. First item
2. Second item
3. Third item

## Blockquotes

> This is a blockquote. It's great for highlighting important information or quotes from other sources.

## Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |

## Links

- [External link](https://example.com)
- [[Internal Wiki Link]]
- [[Custom Display Text|actual-article]]

## Images

Images can be included using standard Markdown:

\`\`\`markdown
![Alt text](image-url.jpg)
\`\`\`

## Horizontal Rules

Use \`---\` or \`***\` to create horizontal rules:

---

## Next Steps

- Learn about [[Frontmatter Reference]]
- See [[Example Article]] for a practical example`,
  },
  'frontmatter-reference': {
    slug: 'frontmatter-reference',
    title: 'Frontmatter Reference',
    category: 'reference',
    path: '/wiki/reference/frontmatter-reference',
    frontmatter: {
      title: 'Frontmatter Reference',
      description: 'All available frontmatter options for wiki articles',
      tags: ['reference', 'frontmatter', 'yaml'],
      created: '2024-01-12',
    },
    content: `# Frontmatter Reference

Frontmatter is YAML metadata at the top of each Markdown file. It controls how articles are displayed and organized.

## Basic Frontmatter

Every article should have at minimum:

\`\`\`yaml
---
title: Article Title
description: A brief description of the article
---
\`\`\`

## All Options

| Property | Type | Description |
|----------|------|-------------|
| \`title\` | string | The article title |
| \`description\` | string | Brief description for SEO and previews |
| \`tags\` | array | List of tags for categorization |
| \`created\` | date | Creation date (YYYY-MM-DD) |
| \`updated\` | date | Last update date |
| \`featured\` | boolean | Show on homepage featured section |
| \`image\` | string | Cover image URL |
| \`infobox\` | object | Sidebar infobox data |

## Infobox Configuration

Infoboxes appear on the right side of articles:

\`\`\`yaml
---
infobox:
  title: Character Name
  image: /images/character.jpg
  rows:
    - label: Species
      value: Human
    - label: Occupation
      value: Explorer
    - label: Status
      value: Active
---
\`\`\`

## Tags

Tags help organize and find content:

\`\`\`yaml
---
tags:
  - tutorial
  - beginner
  - guide
---
\`\`\`

## Related

- [[Getting Started]] - Basic setup guide
- [[Markdown Syntax]] - Formatting reference`,
  },
  'example-article': {
    slug: 'example-article',
    title: 'The Ancient Library of Aethoria',
    category: 'examples',
    path: '/wiki/examples/example-article',
    frontmatter: {
      title: 'The Ancient Library of Aethoria',
      description: 'A mythical repository of all known knowledge in the realm',
      tags: ['locations', 'lore', 'magic'],
      featured: true,
      created: '2024-02-01',
      updated: '2024-03-10',
      infobox: {
        title: 'Library of Aethoria',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600',
        rows: [
          { label: 'Type', value: 'Magical Institution' },
          { label: 'Location', value: 'Aethoria, Central Realm' },
          { label: 'Founded', value: 'First Age, Year 342' },
          { label: 'Head Librarian', value: 'Archmage Thessaly' },
          { label: 'Status', value: 'Active' },
        ],
      },
    },
    content: `# The Ancient Library of Aethoria

The **Library of Aethoria** is the largest and oldest repository of knowledge in the known realms. Founded during the First Age, it houses millions of tomes, scrolls, and magical artifacts.

## History

### Founding

The library was established in the year 342 of the First Age by the Council of Twelve Mages. Their goal was to preserve all knowledge for future generations, creating a neutral ground where scholars from all nations could study.

> "Knowledge is the light that guides us through the darkness of ignorance."
> — Archmage Thessaly, Current Head Librarian

### The Great Expansion

During the Second Age, the library underwent massive expansion. New wings were added:

1. **The Hall of Histories** - Historical records and chronicles
2. **The Arcane Archives** - Magical texts and spellbooks
3. **The Naturalist's Gallery** - Studies of flora, fauna, and the natural world
4. **The Vault of Whispers** - Forbidden and dangerous knowledge

## Architecture

The library spans seven levels above ground and three below. Each level is designed for specific purposes:

| Level | Name | Purpose |
|-------|------|---------|
| 7 | The Apex | Astronomical observations |
| 6 | Scholar's Rest | Living quarters |
| 5 | Reading Halls | General study |
| 4 | Main Stacks | General collection |
| 3 | Special Collections | Rare materials |
| 2 | Reception Hall | Entry and registration |
| 1 | Ground Level | Exhibits and tours |
| -1 | The Depths | Ancient texts |
| -2 | The Catacombs | Sealed records |
| -3 | The Vault | Forbidden knowledge |

## Notable Features

### The Infinite Shelves

The library employs a unique enchantment known as *Spatial Expansion*. From the outside, the building appears modest, but inside, the shelves extend infinitely in all directions. Visitors must use enchanted maps or guide spirits to navigate.

### The Living Index

Rather than a traditional catalog, the library uses the **Living Index** - a collective consciousness formed from the spirits of former librarians. Visitors simply speak their query, and the Index guides them to relevant materials.

\`\`\`
Query: "Show me texts on elemental magic"
Index Response: "Three hundred forty-two volumes found. 
               Nearest relevant: Shelf 7, Row 42, Position 3."
\`\`\`

## Rules and Regulations

All visitors must adhere to strict rules:

- No food or drink beyond the ground level
- Magical silence is enforced in reading halls
- All borrowed texts must return within one lunar cycle
- Copying of restricted materials is forbidden
- The third basement level requires special authorization

## Related Articles

- [[Archmage Thessaly]] - Current Head Librarian
- [[The Council of Twelve]] - Founding organization
- [[Magical Institutions]] - Other centers of learning

## See Also

- [[Getting Started]] - How to use this wiki
- [[Markdown Syntax]] - Formatting guide`,
  },
  'customization-guide': {
    slug: 'customization-guide',
    title: 'Customization Guide',
    category: 'guides',
    path: '/wiki/guides/customization-guide',
    frontmatter: {
      title: 'Customization Guide',
      description: 'Learn how to customize the wiki appearance and behavior',
      tags: ['guide', 'customization', 'theming'],
      created: '2024-01-20',
    },
    content: `# Customization Guide

This guide covers how to customize the wiki's appearance and functionality to match your needs.

## Theming

### Colors

The wiki uses CSS custom properties for theming. Edit \`src/index.css\` to change colors:

\`\`\`css
:root {
  --primary: 35 90% 45%;
  --wiki-link: 35 85% 42%;
  /* ... */
}
\`\`\`

### Dark Mode

Dark mode is supported out of the box. The theme toggle in the header allows users to switch between modes.

### Typography

The wiki uses two font families:
- **Crimson Pro** - For body text (optimized for reading)
- **Inter** - For headings and UI elements

## Layout Customization

### Sidebar

The sidebar is automatically generated from your content structure. To customize:

1. Edit category names in folder names
2. Adjust order by prefixing with numbers (e.g., \`01-guides\`)

### Article Width

Article max-width can be adjusted in the article container styles.

## Components

### Infobox

Customize infobox appearance in \`index.css\`:

\`\`\`css
.wiki-infobox {
  @apply w-72; /* Change width */
}

.wiki-infobox-header {
  @apply bg-wiki-infobox-header; /* Change header color */
}
\`\`\`

## Related

- [[Getting Started]] - Basic setup
- [[Frontmatter Reference]] - Frontmatter options`,
  },
};

const categories: Record<string, WikiCategory> = {
  guides: {
    name: 'Guides',
    slug: 'guides',
    path: '/wiki/guides',
    articles: [wikiContent['getting-started'], wikiContent['customization-guide']],
    subcategories: [],
  },
  reference: {
    name: 'Reference',
    slug: 'reference',
    path: '/wiki/reference',
    articles: [wikiContent['markdown-syntax'], wikiContent['frontmatter-reference']],
    subcategories: [],
  },
  examples: {
    name: 'Examples',
    slug: 'examples',
    path: '/wiki/examples',
    articles: [wikiContent['example-article']],
    subcategories: [],
  },
};

// Export functions to access wiki content
export function getAllArticles(): WikiArticle[] {
  return Object.values(wikiContent);
}

export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return wikiContent[slug];
}

export function getFeaturedArticles(): WikiArticle[] {
  return Object.values(wikiContent).filter((a) => a.frontmatter.featured);
}

export function getRecentArticles(limit = 5): WikiArticle[] {
  return Object.values(wikiContent)
    .sort((a, b) => {
      const dateA = a.frontmatter.updated || a.frontmatter.created || '';
      const dateB = b.frontmatter.updated || b.frontmatter.created || '';
      return dateB.localeCompare(dateA);
    })
    .slice(0, limit);
}

export function getAllCategories(): WikiCategory[] {
  return Object.values(categories);
}

export function getCategoryBySlug(slug: string): WikiCategory | undefined {
  return categories[slug];
}

export function getNavigation(): WikiNavItem[] {
  return Object.values(categories).map((cat) => ({
    title: cat.name,
    slug: cat.slug,
    path: cat.path,
    type: 'category' as const,
    children: cat.articles.map((article) => ({
      title: article.title,
      slug: article.slug,
      path: article.path,
      type: 'article' as const,
    })),
  }));
}

export function searchArticles(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const article of Object.values(wikiContent)) {
    const matches: string[] = [];
    let score = 0;

    // Title match (highest priority)
    if (article.title.toLowerCase().includes(lowerQuery)) {
      matches.push(`Title: ${article.title}`);
      score += 10;
    }

    // Description match
    if (article.frontmatter.description?.toLowerCase().includes(lowerQuery)) {
      matches.push(`Description: ${article.frontmatter.description}`);
      score += 5;
    }

    // Content match
    const contentLower = article.content.toLowerCase();
    const contentIndex = contentLower.indexOf(lowerQuery);
    if (contentIndex !== -1) {
      const start = Math.max(0, contentIndex - 30);
      const end = Math.min(article.content.length, contentIndex + query.length + 30);
      const snippet = article.content.slice(start, end).replace(/\n/g, ' ');
      matches.push(`...${snippet}...`);
      score += 3;
    }

    // Tag match
    if (article.frontmatter.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
      const matchedTags = article.frontmatter.tags.filter((tag) =>
        tag.toLowerCase().includes(lowerQuery)
      );
      matches.push(`Tags: ${matchedTags.join(', ')}`);
      score += 4;
    }

    if (matches.length > 0) {
      results.push({ article, matches, score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, text, level });
  }

  return toc;
}

export function parseWikiLinks(content: string): string {
  // Convert [[Link Text]] to proper markdown links
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, display) => {
    const slug = link
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    const text = display || link;
    return `[${text}](/wiki/article/${slug})`;
  });
}

export function getBreadcrumbs(article: WikiArticle): { label: string; path: string }[] {
  const category = categories[article.category];
  return [
    { label: 'Home', path: '/' },
    { label: category?.name || article.category, path: `/wiki/category/${article.category}` },
    { label: article.title, path: article.path },
  ];
}
