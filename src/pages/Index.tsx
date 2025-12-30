import { Link } from 'react-router-dom';
import { Book, Search, ArrowRight, Sparkles, FileText, FolderTree, Moon, Sun } from 'lucide-react';
import { getFeaturedArticles, getRecentArticles, getAllCategories } from '@/lib/content-loader';
import { WikiSearch } from '@/components/wiki/WikiSearch';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

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
        <header className="sticky top-0 z-50 glass-strong border-b border-border h-16">
          <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4 md:px-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/30">
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
                className="h-9 w-9 hover-scale"
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
          {/* Animated gradient background */}
          <div className="absolute inset-0 gradient-animated" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
            <div className="flex flex-col items-center text-center">
              {/* Floating logo with glow */}
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30 float glow-primary animate-fade-in">
                <Book className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-sans animate-fade-in stagger-1">
                Codex
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in stagger-2">
                A modern, file-based wiki template. Write in Markdown, organize with folders, 
                and let the structure build itself.
              </p>
              
              {/* Search */}
              <div className="w-full max-w-xl mb-8 animate-fade-in stagger-3">
                <WikiSearch />
              </div>
              
              {/* Quick actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in stagger-4">
                <Link
                  to="/wiki/article/getting-started"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/wiki/category/guides"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-secondary/80 hover:scale-105"
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
                <ScrollReveal key={feature.title} direction="up" delay={index * 100}>
                  <div className="p-6 rounded-xl bg-card border border-border hover-glow group cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-12 border-b border-border">
            <div className="max-w-5xl mx-auto px-6">
              <ScrollReveal direction="up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Featured Articles
                  </h2>
                </div>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 gap-4">
                {featuredArticles.map((article, index) => (
                  <ScrollReveal key={article.slug} direction="up" delay={index * 100}>
                    <WikiArticleCard article={article} featured />
                  </ScrollReveal>
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
                <ScrollReveal direction="up">
                  <h2 className="text-xl font-bold text-foreground mb-4">Recent Updates</h2>
                </ScrollReveal>
                <div className="space-y-3">
                  {recentArticles.map((article, index) => (
                    <ScrollReveal key={article.slug} direction="left" delay={index * 80}>
                      <WikiArticleCard article={article} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <ScrollReveal direction="up">
                  <h2 className="text-xl font-bold text-foreground mb-4">Categories</h2>
                </ScrollReveal>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <ScrollReveal key={category.slug} direction="right" delay={index * 80}>
                      <Link
                        to={`/wiki/category/${category.slug}`}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover-glow transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <FolderTree className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {category.articles.length} articles
                        </span>
                      </Link>
                    </ScrollReveal>
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
