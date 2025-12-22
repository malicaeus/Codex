import { TOCItem } from '@/types/wiki';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface WikiTOCProps {
  items: TOCItem[];
  activeId?: string;
}

export function WikiTOC({ items, activeId }: WikiTOCProps) {
  if (items.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="wiki-toc animate-fade-in">
      <div className="wiki-toc-title flex items-center gap-2">
        <List className="h-4 w-4 text-primary" />
        <span>Table of Contents</span>
      </div>
      <nav className="wiki-toc-list">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              'wiki-toc-item block w-full text-left',
              item.level === 2 && 'wiki-toc-item-h2',
              item.level === 3 && 'wiki-toc-item-h3',
              item.level === 4 && 'wiki-toc-item-h4',
              activeId === item.id && 'text-primary font-medium'
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}

// Sticky sidebar version for article pages
export function WikiTOCSidebar({ items, activeId }: WikiTOCProps) {
  if (items.length === 0) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 animate-slide-in">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <List className="h-3.5 w-3.5" />
          On This Page
        </div>
        <nav className="space-y-1 border-l border-border pl-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                'block w-full text-left text-sm transition-colors py-1',
                item.level === 2 && 'pl-0',
                item.level === 3 && 'pl-3',
                item.level === 4 && 'pl-6',
                activeId === item.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
