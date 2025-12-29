import { Link } from 'react-router-dom';
import { WikiArticle } from '@/types/wiki';
import { ArrowLeft } from 'lucide-react';

interface WikiBacklinksProps {
  backlinks: WikiArticle[];
}

export function WikiBacklinks({ backlinks }: WikiBacklinksProps) {
  if (backlinks.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Pages qui mentionnent cet article
      </h2>
      <div className="flex flex-wrap gap-2">
        {backlinks.map((article) => (
          <Link
            key={article.slug}
            to={`/wiki/article/${article.slug}`}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors"
          >
            {article.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
