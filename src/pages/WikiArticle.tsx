import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleBySlug, extractTOC, getBreadcrumbs } from '@/lib/content-loader';
import { WikiArticle as WikiArticleType, TOCItem } from '@/types/wiki';
import { WikiBreadcrumbs } from '@/components/wiki/WikiBreadcrumbs';
import { WikiContent } from '@/components/wiki/WikiContent';
import { WikiInfobox } from '@/components/wiki/WikiInfobox';
import { WikiTOCSidebar } from '@/components/wiki/WikiTOC';
import { Calendar, Tag, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function WikiArticlePage() {
  const { "*": slug } = useParams();
  const [article, setArticle] = useState<WikiArticleType | null>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    if (slug) {
      const foundArticle = getArticleBySlug(slug);
      setArticle(foundArticle || null);
      if (foundArticle) {
        setToc(extractTOC(foundArticle.content));
      }
    }
  }, [slug]);

  // Track active heading
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!article) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          <AlertCircle className="h-5 w-5" />
          <div>
            <p className="font-medium">Article not found</p>
            <p className="text-sm opacity-80">The article "{slug}" doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbs(article);

  return (
    <>
      <Helmet>
        <title>{article.title} | Codex</title>
        <meta name="description" content={article.frontmatter.description || article.title} />
      </Helmet>

      <div className="flex gap-8 p-6 md:p-8">
        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-4xl">
          <WikiBreadcrumbs items={breadcrumbs} />

          {/* Article header */}
          <header className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-sans mb-4">
              {article.title}
            </h1>

            {article.frontmatter.description && (
              <p className="text-lg text-muted-foreground mb-4 font-serif">
                {article.frontmatter.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {article.frontmatter.updated && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Updated {new Date(article.frontmatter.updated).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              )}
              {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-1.5">
                    {article.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Infobox (floats right on larger screens) */}
          {article.frontmatter.infobox && (
            <WikiInfobox data={article.frontmatter.infobox} />
          )}

          {/* Article content */}
          <WikiContent content={article.content} />

          {/* Clear float */}
          <div className="clear-both" />
        </article>

        {/* Table of contents sidebar */}
        <WikiTOCSidebar items={toc} activeId={activeHeading} />
      </div>
    </>
  );
}
