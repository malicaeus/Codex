import { Link } from 'react-router-dom';
import { Book, Search, ArrowRight, Sparkles, FileText, FolderTree, Moon, Sun } from 'lucide-react';
import { getFeaturedArticles, getRecentArticles, getAllCategories } from '@/lib/wiki-content';
import { WikiSearch } from '@/components/wiki/WikiSearch';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(4);
  const categories = getAllCategories();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Helmet>
        <title>Codex - A Modern File-Based Wiki</title>
        <meta name="description" content="A modern, file-based wiki template. Write in Markdown, organize with folders, and let the structure build itself." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border h-16">
          <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4 md:px-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <Book className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Codex</span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/wiki/article/getting-started"
                className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-col items-center text-center animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <Book className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-sans">
                Codex
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
                A modern, file-based wiki template. Write in Markdown, organize with folders, 
                and let the structure build itself.
              </p>
              
              {/* Search */}
              <div className="w-full max-w-xl mb-8">
                <WikiSearch />
              </div>
              
              {/* Quick actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/wiki/article/getting-started"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:opacity-90 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/wiki/category/guides"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium transition-colors hover:bg-secondary/80"
                >
                  Browse Guides
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-b border-border">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: 'Markdown-First',
                  description: 'Write content in Markdown files. No database or CMS required.',
                },
                {
                  icon: FolderTree,
                  title: 'Folder Structure',
                  description: 'Organize articles in folders. Navigation is generated automatically.',
                },
                {
                  icon: Sparkles,
                  title: 'Wiki Links',
                  description: 'Use [[Obsidian-style]] links to connect your articles together.',
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-card border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 border-b border-border">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Featured Articles
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {featuredArticles.map((article, index) => (
                  <div key={article.slug} style={{ animationDelay: `${index * 100}ms` }}>
                    <WikiArticleCard article={article} featured />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent & Categories */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Articles */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-foreground mb-4">Recent Updates</h2>
                <div className="space-y-3">
                  {recentArticles.map((article, index) => (
                    <div key={article.slug} style={{ animationDelay: `${index * 50}ms` }}>
                      <WikiArticleCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      key={category.slug}
                      to={`/wiki/category/${category.slug}`}
                      className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <FolderTree className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {category.articles.length} articles
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>Built with Codex • A modern, file-based wiki system</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
