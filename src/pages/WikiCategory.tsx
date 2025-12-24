import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug } from '@/lib/content-loader';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import { WikiBreadcrumbs } from '@/components/wiki/WikiBreadcrumbs';
import { FolderOpen, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function WikiCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          <AlertCircle className="h-5 w-5" />
          <div>
            <p className="font-medium">Category not found</p>
            <p className="text-sm opacity-80">The category "{slug}" doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: category.name, path: category.path },
  ];

  return (
    <>
      <Helmet>
        <title>{category.name} | Codex</title>
        <meta name="description" content={`Browse articles in the ${category.name} category`} />
      </Helmet>

      <div className="p-6 md:p-8 max-w-4xl">
        <WikiBreadcrumbs items={breadcrumbs} />

        {/* Category header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground font-sans">
                {category.name}
              </h1>
              <p className="text-muted-foreground">
                {category.articles.length} article{category.articles.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </header>

        {/* Articles list */}
        <div className="space-y-3">
          {category.articles.map((article, index) => (
            <div key={article.slug} style={{ animationDelay: `${index * 50}ms` }}>
              <WikiArticleCard article={article} />
            </div>
          ))}
        </div>

        {category.articles.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No articles in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
