import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const directionClasses: Record<RevealDirection, { initial: string; visible: string }> = {
  up: {
    initial: 'translate-y-8 opacity-0',
    visible: 'translate-y-0 opacity-100',
  },
  down: {
    initial: '-translate-y-8 opacity-0',
    visible: 'translate-y-0 opacity-100',
  },
  left: {
    initial: 'translate-x-8 opacity-0',
    visible: 'translate-x-0 opacity-100',
  },
  right: {
    initial: '-translate-x-8 opacity-0',
    visible: 'translate-x-0 opacity-100',
  },
  scale: {
    initial: 'scale-95 opacity-0',
    visible: 'scale-100 opacity-100',
  },
  fade: {
    initial: 'opacity-0',
    visible: 'opacity-100',
  },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 500,
  className,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  const { initial, visible } = directionClasses[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-transform',
        isVisible ? visible : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  );
}

interface ScrollRevealGroupProps {
  children: ReactNode[];
  direction?: RevealDirection;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  itemClassName?: string;
}

export function ScrollRevealGroup({
  children,
  direction = 'up',
  staggerDelay = 100,
  duration = 500,
  className,
  itemClassName,
}: ScrollRevealGroupProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
          duration={duration}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
