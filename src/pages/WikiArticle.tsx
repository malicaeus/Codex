import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleBySlug, extractTOC, getBreadcrumbs, getBacklinks, calculateReadingTime } from '@/lib/content-loader';
import { WikiArticle as WikiArticleType, TOCItem } from '@/types/wiki';
import { WikiBreadcrumbs } from '@/components/wiki/WikiBreadcrumbs';
import { WikiContent } from '@/components/wiki/WikiContent';
import { WikiInfobox } from '@/components/wiki/WikiInfobox';
import { WikiTOCSidebar } from '@/components/wiki/WikiTOC';
import { WikiBacklinks } from '@/components/wiki/WikiBacklinks';
import { Calendar, Tag, AlertCircle, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function WikiArticlePage() {
  const { "*": slug } = useParams();
  const [article, setArticle] = useState<WikiArticleType | null>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [backlinks, setBacklinks] = useState<WikiArticleType[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    if (slug) {
      const foundArticle = getArticleBySlug(slug);
      setArticle(foundArticle || null);
      if (foundArticle) {
        setToc(extractTOC(foundArticle.content));
        setBacklinks(getBacklinks(slug));
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
      <div className="p-8 max-w-3xl mx-auto animate-fade-in">
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
          <div className="animate-slide-in">
            <WikiBreadcrumbs items={breadcrumbs} />
          </div>

          {/* Article header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-sans mb-4 animate-fade-in">
              {article.title}
            </h1>

            {article.frontmatter.description && (
              <p className="text-lg text-muted-foreground mb-4 font-serif animate-fade-in stagger-1">
                {article.frontmatter.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-fade-in stagger-2">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {calculateReadingTime(article.content)} min read
              </span>
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
                        className="px-2 py-0.5 bg-secondary rounded text-xs transition-colors hover:bg-primary/20"
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
            <ScrollReveal direction="right" delay={200}>
              <WikiInfobox data={article.frontmatter.infobox} />
            </ScrollReveal>
          )}

          {/* Article content */}
          <ScrollReveal direction="up" delay={100}>
            <WikiContent content={article.content} />
          </ScrollReveal>

          {/* Backlinks */}
          <ScrollReveal direction="up" delay={200}>
            <WikiBacklinks backlinks={backlinks} />
          </ScrollReveal>

          {/* Clear float */}
          <div className="clear-both" />
        </article>

        {/* Table of contents sidebar */}
        <WikiTOCSidebar items={toc} activeId={activeHeading} />
      </div>
    </>
  );
}
