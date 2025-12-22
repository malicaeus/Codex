import { Link } from 'react-router-dom';
import { WikiArticle } from '@/types/wiki';
import { FileText, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WikiArticleCardProps {
  article: WikiArticle;
  featured?: boolean;
}

export function WikiArticleCard({ article, featured = false }: WikiArticleCardProps) {
  return (
    <Link
      to={`/wiki/article/${article.slug}`}
      className={cn(
        'block bg-card border border-border rounded-lg p-5 transition-all duration-200',
        'hover:border-primary/30 hover:shadow-md hover:shadow-primary/5',
        'group animate-fade-in'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors',
          featured ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground group-hover:text-primary'
        )}>
          <FileText className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {article.title}
          </h3>
          
          {article.frontmatter.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {article.frontmatter.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            {article.frontmatter.updated && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.frontmatter.updated).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
            
            {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {article.frontmatter.tags.slice(0, 2).join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
