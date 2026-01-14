import { useReadingProgress } from '@/hooks/use-reading-progress';
import { cn } from '@/lib/utils';

interface ReadingProgressBarProps {
  className?: string;
}

export function ReadingProgressBar({ className }: ReadingProgressBarProps) {
  const progress = useReadingProgress();

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none",
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-100 ease-out shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect at the end */}
      {progress > 0 && (
        <div 
          className="absolute top-0 h-full w-4 bg-gradient-to-r from-primary/50 to-transparent blur-sm transition-all duration-100"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      )}
    </div>
  );
}
