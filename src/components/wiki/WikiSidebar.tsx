import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, FolderOpen } from 'lucide-react';
import { getNavigation } from '@/lib/content-loader';
import { WikiNavItem } from '@/types/wiki';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  item: WikiNavItem;
  level?: number;
  index?: number;
}

function SidebarNavItem({ item, level = 0, index = 0 }: SidebarNavItemProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = location.pathname === item.path || 
    location.pathname === `/wiki/article/${item.slug}`;

  if (item.type === 'category') {
    return (
      <div 
        className="animate-slide-in" 
        style={{ animationDelay: `${(level * 50) + (index * 30)}ms` }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 text-left rounded-md transition-all duration-200',
            'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            'font-medium text-sm group'
          )}
        >
          <FolderOpen className="h-4 w-4 text-primary shrink-0 transition-transform duration-200 group-hover:scale-110" />
          <span className="flex-1">{item.title}</span>
          {hasChildren && (
            <span className="text-muted-foreground transition-transform duration-200">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
        </button>
        {hasChildren && isOpen && (
          <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-2">
            {item.children!.map((child, childIndex) => (
              <SidebarNavItem key={child.slug} item={child} level={level + 1} index={childIndex} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={`/wiki/article/${item.slug}`}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm',
        isActive
          ? 'bg-primary/10 text-primary font-medium glow-primary'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1'
      )}
      style={{ animationDelay: `${(level * 50) + (index * 30)}ms` }}
    >
      <FileText className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{item.title}</span>
    </Link>
  );
}

export function WikiSidebar() {
  const navigation = getNavigation();

  return (
    <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-2">
        <div className="mb-4 animate-fade-in">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </h3>
        </div>
        {navigation.map((item, index) => (
          <SidebarNavItem key={item.slug} item={item} index={index} />
        ))}
      </nav>
    </aside>
  );
}
