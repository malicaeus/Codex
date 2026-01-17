import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Tag } from 'lucide-react';
import { searchArticles } from '@/lib/content-loader';
import { SearchResult } from '@/types/wiki';
import { cn } from '@/lib/utils';

interface WikiSearchProps {
  onResultClick?: () => void;
}

export function WikiSearch({ onResultClick }: WikiSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchArticles(query);
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    navigate(`/wiki/article/${result.article.slug}`);
    setQuery('');
    setIsOpen(false);
    onResultClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect(results[selectedIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          data-search-input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search articles..."
          className={cn(
            'w-full h-10 pl-10 pr-4 rounded-lg',
            'bg-secondary text-foreground placeholder:text-muted-foreground',
            'border border-transparent focus:border-primary focus:ring-1 focus:ring-primary',
            'transition-all duration-200 outline-none'
          )}
        />
        <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 h-5 px-1.5 items-center gap-0.5 rounded border border-border bg-muted text-xs text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-scale-in">
          <div className="max-h-80 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={result.article.slug}
                onClick={() => handleSelect(result)}
                className={cn(
                  'w-full px-4 py-3 text-left transition-colors',
                  index === selectedIndex
                    ? 'bg-primary/10 text-foreground'
                    : 'hover:bg-secondary/50'
                )}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{result.article.title}</div>
                    {result.article.frontmatter.description && (
                      <div className="text-xs text-muted-foreground mt-0.5 truncate">
                        {result.article.frontmatter.description}
                      </div>
                    )}
                    {result.article.frontmatter.tags && result.article.frontmatter.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        <div className="flex gap-1">
                          {result.article.frontmatter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-secondary px-1.5 py-0.5 rounded text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg p-4 text-center text-muted-foreground text-sm z-50">
          No articles found for "{query}"
        </div>
      )}
    </div>
  );
}
