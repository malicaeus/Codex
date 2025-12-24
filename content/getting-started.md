---
title: Getting Started
description: Learn how to use and customize this wiki template
category: Documentation
tags:
  - tutorial
  - basics
featured: true
---

# Getting Started

Welcome to the wiki template! This guide will help you understand how to create and organize your content.

## Creating Articles

Each article is a Markdown file with YAML frontmatter. Here's the basic structure:

```markdown
---
title: Article Title
description: A brief description
category: Category Name
tags:
  - tag1
  - tag2
---

# Your Content Here

Write your content in Markdown...
```

## Frontmatter Options

| Field | Description | Required |
|-------|-------------|----------|
| `title` | Article title | Yes |
| `description` | Brief description for previews | No |
| `category` | Category name | No |
| `tags` | Array of tags | No |
| `featured` | Show on homepage | No |
| `infobox` | Structured data box | No |

## Using Wiki Links

You can link to other articles using the wiki link syntax:

- `[[Article Name]]` - Links to an article by title
- `[[characters/hero]]` - Links to a specific path

## Adding Infoboxes

For character or location pages, you can add an infobox:

```yaml
infobox:
  image: /images/character.jpg
  data:
    - label: Species
      value: Human
    - label: Occupation
      value: Hero
```

## Organizing Content

Create folders to organize your articles into categories:

- `/content/characters/` - Character articles
- `/content/locations/` - Location articles
- `/content/lore/` - Lore and world-building

The folder structure automatically generates the sidebar navigation.
