# 📚 Codex - Documentation

## Vue d'ensemble

Ce projet est un **wiki moderne basé sur des fichiers Markdown**, construit avec React, TypeScript, Vite et Tailwind CSS. Il ne nécessite aucune base de données - tout le contenu est stocké dans des fichiers `.md` simples.

### Fonctionnalités principales

- **📁 Contenu basé sur fichiers** - Pas de base de données, édition avec n'importe quel éditeur de texte
- **🔗 Liens wiki style Obsidian** - Syntaxe `[[Article]]` pour les liens internes
- **📖 Navigation automatique** - La structure des dossiers génère le menu latéral
- **🔍 Recherche instantanée** - Recherche côté client dans tous les articles
- **🌙 Mode sombre/clair** - Thème adaptatif intégré
- **📊 Infobox** - Panneaux d'information style Wikipedia
- **⏱️ Temps de lecture** - Estimation automatique pour chaque article
- **🔙 Backlinks** - Affichage des articles qui référencent la page courante
- **✨ Animations** - Effets de scroll reveal et transitions fluides
- **📱 Responsive** - Optimisé pour mobile et desktop

---

## 🚀 Démarrage rapide

### Installation

```bash
# Cloner le projet
git clone 
cd 

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Structure du projet

```
├── content/                    # 📄 Votre contenu wiki (fichiers Markdown)
│   ├── characters/            # Catégorie "Characters"
│   │   └── aurora-lightbringer.md
│   ├── locations/             # Catégorie "Locations"
│   │   ├── citadel-of-dawn.md
│   │   └── silverdale.md
│   ├── lore/                  # Catégorie "Lore"
│   │   ├── dawn-crystal.md
│   │   ├── order-of-light.md
│   │   └── shadow-war.md
│   ├── getting-started.md     # Article à la racine
│   └── index.md               # Page d'accueil
├── src/
│   ├── components/wiki/       # Composants du wiki
│   ├── lib/content-loader.ts  # Chargeur de contenu
│   ├── pages/                 # Pages de l'application
│   └── types/wiki.ts          # Types TypeScript
└── ...
```

---

## 📝 Créer du contenu

### Structure d'un article

Chaque article est un fichier `.md` avec un **frontmatter YAML** en en-tête :

```markdown
---
title: Titre de l'article
description: Description courte pour la recherche et les aperçus
category: NomCategorie
tags:
  - tag1
  - tag2
  - tag3
featured: true
created: 2024-01-15
updated: 2024-03-20
infobox:
  title: Titre de l'infobox
  image: https://example.com/image.jpg
  data:
    - label: Propriété 1
      value: Valeur 1
    - label: Propriété 2
      value: Valeur 2
---

# Contenu de l'article

Votre contenu Markdown ici...
```

### Propriétés du frontmatter

| Propriété | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `title` | string | ✅ | Titre affiché de l'article |
| `description` | string | ❌ | Description pour les aperçus et la recherche |
| `category` | string | ❌ | Catégorie d'affichage |
| `tags` | array | ❌ | Liste de tags pour la recherche |
| `featured` | boolean | ❌ | Article mis en avant sur la page d'accueil |
| `created` | string | ❌ | Date de création (YYYY-MM-DD) |
| `updated` | string | ❌ | Date de dernière mise à jour |
| `infobox` | object | ❌ | Panneau d'information latéral |

### Infobox (panneau d'information)

L'infobox crée un panneau style Wikipedia sur le côté :

```yaml
infobox:
  title: Aurora Lightbringer
  image: https://exemple.com/avatar.jpg
  data:
    - label: Titre
      value: Gardienne de l'Aube
    - label: Espèce
      value: Humain
    - label: Statut
      value: Actif
```

---

## 🔗 Liens wiki

### Syntaxe des liens internes

Utilisez la syntaxe double crochets style Obsidian :

```markdown
# Lien simple (utilise le nom du fichier comme texte)
[[aurora-lightbringer]]

# Lien avec texte personnalisé
[[characters/aurora-lightbringer|Aurora, la héroïne]]

# Lien vers une catégorie
[[locations/silverdale|Le village de Silverdale]]
```

### Comment ça fonctionne

- `[[nom-article]]` → Lien vers `/wiki/article/nom-article`
- `[[dossier/article|Texte affiché]]` → Lien avec texte personnalisé

---

## 📁 Organisation des catégories

### Créer une catégorie

Créez simplement un **dossier** dans `/content/` :

```
/content
  /ma-nouvelle-categorie/     ← Nouvelle catégorie !
    article-1.md
    article-2.md
```

La catégorie apparaîtra automatiquement dans la navigation latérale.

### Nommage des fichiers

- Utilisez des **kebab-case** pour les noms de fichiers : `mon-article.md`
- Le slug devient automatiquement : `mon-article`
- L'URL sera : `/wiki/ma-categorie/mon-article`

---

## 🎨 Personnalisation

### Thème et couleurs

Modifiez les couleurs dans `src/index.css` :

```css
:root {
  --primary: 45 100% 51%;           /* Couleur principale */
  --secondary: 220 14% 96%;
  --accent: 45 100% 51%;
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  /* ... */
}

.dark {
  --background: 222 47% 5%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Vitesse de lecture

Par défaut, le temps de lecture est calculé sur **200 mots/minute**. Modifiez dans `src/lib/content-loader.ts` :

```typescript
export function calculateReadingTime(content: string): number {
  // ...
  const wordsPerMinute = 200; // ← Ajustez cette valeur
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
```

### Animations

Les animations sont définies dans `src/index.css` et `tailwind.config.ts`. Désactivez-les pour les utilisateurs qui préfèrent les mouvements réduits :

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔍 Recherche

La recherche fonctionne côté client et indexe :

1. **Titres** (score: 10 points)
2. **Descriptions** (score: 5 points)
3. **Tags** (score: 4 points)
4. **Contenu** (score: 3 points)

Les résultats sont triés par pertinence.

---

## 🛠️ Adaptation pour votre projet

### 1. Supprimer le contenu de démo

```bash
# Supprimer les articles d'exemple
rm -rf content/characters content/locations content/lore
rm content/getting-started.md

# Garder uniquement index.md et le modifier
```

### 2. Créer vos propres catégories

```bash
mkdir content/guides
mkdir content/reference
mkdir content/tutorials
```

### 3. Personnaliser la page d'accueil

Éditez `content/index.md` :

```markdown
---
title: Mon Wiki
description: Documentation de mon projet
featured: true
---

# Bienvenue sur Mon Wiki

Description de votre projet...
```

### 4. Modifier le header

Éditez `src/components/wiki/WikiHeader.tsx` pour changer le logo et le titre.

### 5. Ajouter de nouvelles fonctionnalités

Le code est modulaire et facile à étendre :

- `src/lib/content-loader.ts` - Logique de chargement du contenu
- `src/components/wiki/` - Composants réutilisables
- `src/pages/` - Pages principales

---

## 📚 Exemples de cas d'usage

### Wiki de jeu / Univers fictif
```
/content
  /characters
  /locations  
  /items
  /quests
  /lore
```

### Documentation technique
```
/content
  /getting-started
  /api-reference
  /tutorials
  /guides
  /changelog
```

### Base de connaissances d'entreprise
```
/content
  /onboarding
  /processes
  /tools
  /policies
  /faq
```

---

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers sont générés dans `/dist`.

### Hébergement

Compatible avec :
- **Netlify** - Déployez depuis Git
- **Vercel** - Import automatique
- **GitHub Pages** - Via GitHub Actions
- **Cloudflare Pages** - Build automatique
- **Lovable** - Cliquez sur "Publish"

---

## 📋 Aide-mémoire

### Créer un article rapidement

```markdown
---
title: Mon Nouvel Article
description: Description courte
tags:
  - tag1
---

# Mon Nouvel Article

Contenu ici...

## Voir aussi

- [[autre-article|Lien vers un autre article]]
```

### Syntaxe Markdown supportée

- **Gras** : `**texte**`
- *Italique* : `*texte*`
- `Code inline` : `` `code` ``
- Blocs de code : ` ```language ... ``` `
- Listes : `- item` ou `1. item`
- Tableaux : `| Col1 | Col2 |`
- Images : `![alt](url)`
- Liens : `[texte](url)` ou `[[wiki-link]]`

---

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

---

## 📄 Licence

MIT - Utilisez ce template librement pour vos projets !