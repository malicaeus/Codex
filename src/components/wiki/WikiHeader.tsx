import { Link } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, Book } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { WikiSearch } from './WikiSearch';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WikiHeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function WikiHeader({ onMenuToggle, isMobileMenuOpen }: WikiHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass-strong border-b border-border h-16">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-all duration-200 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/30">
                <Book className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg hidden sm:block">Codex</span>
            </Link>
          </div>

          {/* Center section - Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <WikiSearch />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-all duration-200 hover:scale-105"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 transition-all duration-200 hover:scale-105"
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

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 glass-strong md:hidden animate-fade-in">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-secondary rounded-md transition-all duration-200 hover:scale-105"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="font-medium">Search</span>
            </div>
            <WikiSearch onResultClick={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
