import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { KEYBOARD_SHORTCUTS } from '@/hooks/use-keyboard-shortcuts';
import { Keyboard, Navigation, Search, Monitor, Settings } from 'lucide-react';

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons = {
  navigation: Navigation,
  search: Search,
  display: Monitor,
  general: Settings,
};

const categoryLabels = {
  navigation: 'Navigation',
  search: 'Recherche',
  display: 'Affichage',
  general: 'Général',
};

function ShortcutKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-medium bg-muted border border-border rounded shadow-sm">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsHelp({ open, onOpenChange }: KeyboardShortcutsHelpProps) {
  const categories = ['navigation', 'search', 'display', 'general'] as const;
  
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Raccourcis clavier
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {categories.map((category) => {
            const shortcuts = KEYBOARD_SHORTCUTS.filter((s) => s.category === category);
            if (shortcuts.length === 0) return null;
            
            const Icon = categoryIcons[category];
            
            return (
              <div key={category}>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                  <Icon className="h-4 w-4" />
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-2">
                  {shortcuts.map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between py-1.5"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.ctrlOrCmd && (
                          <>
                            <ShortcutKey>{modKey}</ShortcutKey>
                            <span className="text-muted-foreground text-xs">+</span>
                          </>
                        )}
                        {shortcut.shift && (
                          <>
                            <ShortcutKey>Shift</ShortcutKey>
                            <span className="text-muted-foreground text-xs">+</span>
                          </>
                        )}
                        {shortcut.alt && (
                          <>
                            <ShortcutKey>Alt</ShortcutKey>
                            <span className="text-muted-foreground text-xs">+</span>
                          </>
                        )}
                        <ShortcutKey>{shortcut.key}</ShortcutKey>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Appuyez sur <ShortcutKey>Esc</ShortcutKey> pour fermer
        </div>
      </DialogContent>
    </Dialog>
  );
}
