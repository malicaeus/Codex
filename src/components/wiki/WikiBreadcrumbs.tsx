import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface WikiBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function WikiBreadcrumbs({ items }: WikiBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 animate-fade-in">
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-wiki-link transition-colors flex items-center gap-1"
            >
              {index === 0 && <Home className="h-3.5 w-3.5" />}
              <span>{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
