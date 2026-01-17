import { useEffect, useCallback } from 'react';
import { useTheme } from './use-theme';

export interface KeyboardShortcut {
  key: string;
  ctrlOrCmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  category: 'navigation' | 'search' | 'display' | 'general';
  action: () => void;
}

interface UseKeyboardShortcutsOptions {
  onOpenSearch?: () => void;
  onOpenHelp?: () => void;
  headings?: string[];
  activeHeading?: string;
  onNavigateHeading?: (headingId: string) => void;
}

export const KEYBOARD_SHORTCUTS: Omit<KeyboardShortcut, 'action'>[] = [
  { key: 'K', ctrlOrCmd: true, description: 'Ouvrir la recherche', category: 'search' },
  { key: '/', ctrlOrCmd: true, description: 'Afficher les raccourcis', category: 'general' },
  { key: 'D', ctrlOrCmd: true, description: 'Basculer le thème', category: 'display' },
  { key: 'T', description: 'Aller en haut de page', category: 'navigation' },
  { key: 'B', description: 'Aller en bas de page', category: 'navigation' },
  { key: '←', description: 'Section précédente (articles)', category: 'navigation' },
  { key: '→', description: 'Section suivante (articles)', category: 'navigation' },
  { key: 'Escape', description: 'Fermer', category: 'general' },
];

export function useKeyboardShortcuts({
  onOpenSearch,
  onOpenHelp,
  headings = [],
  activeHeading,
  onNavigateHeading,
}: UseKeyboardShortcutsOptions = {}) {
  const { toggleTheme } = useTheme();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const target = event.target as HTMLElement;
      const isInputFocused = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable;

      // Ctrl/Cmd + K: Open search
      if (isCtrlOrCmd && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenSearch?.();
        return;
      }

      // Ctrl/Cmd + /: Open help
      if (isCtrlOrCmd && event.key === '/') {
        event.preventDefault();
        onOpenHelp?.();
        return;
      }

      // Ctrl/Cmd + D: Toggle theme
      if (isCtrlOrCmd && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        toggleTheme();
        return;
      }

      // Skip navigation shortcuts if input is focused
      if (isInputFocused) return;

      // T: Scroll to top (more accessible than Home key)
      if (event.key.toLowerCase() === 't' && !isCtrlOrCmd) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // B: Scroll to bottom (more accessible than End key)
      if (event.key.toLowerCase() === 'b' && !isCtrlOrCmd) {
        event.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return;
      }

      // Arrow navigation for headings
      if (headings.length > 0 && onNavigateHeading) {
        const currentIndex = activeHeading ? headings.indexOf(activeHeading) : -1;

        if (event.key === 'ArrowLeft' && currentIndex > 0) {
          event.preventDefault();
          const prevHeading = headings[currentIndex - 1];
          onNavigateHeading(prevHeading);
          const element = document.getElementById(prevHeading);
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        if (event.key === 'ArrowRight' && currentIndex < headings.length - 1) {
          event.preventDefault();
          const nextHeading = headings[currentIndex + 1];
          onNavigateHeading(nextHeading);
          const element = document.getElementById(nextHeading);
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
    },
    [onOpenSearch, onOpenHelp, toggleTheme, headings, activeHeading, onNavigateHeading]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
