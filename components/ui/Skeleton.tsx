'use client';
import { HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface SkeletonProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode;
  variant?: 'text' | 'rectangular' | 'circular' | 'avatar';
  width?: string | number;
  height?: string | number;
  size?: 'sm' | 'md' | 'lg';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

const sizeMap = {
  text: {
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-6',
  },
  rectangular: {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
  },
  circular: {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  },
  avatar: {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  },
};

export default function Skeleton({
  variant = 'text',
  width,
  height,
  size = 'md',
  animation = 'pulse',
  className,
  ...props
}: SkeletonProps) {
  const baseStyles = clsx(
    'bg-slate-200 dark:bg-slate-700',
    {
      rounded: variant === 'text',
      'rounded-md': variant === 'rectangular',
      'rounded-full': variant === 'circular' || variant === 'avatar',
      [sizeMap[variant][size]]: !height,
    },
    className
  );

  type AnimationConfig = {
    animate: {
      opacity?: number[];
      backgroundPosition?: string[];
    };
    transition: {
      duration: number;
      repeat: number;
      ease: [number, number, number, number];
    };
  };

  const animations: Record<
    Exclude<typeof animation, 'none'>,
    AnimationConfig
  > = {
    pulse: {
      animate: {
        opacity: [0.5, 0.8, 0.5],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1],
      },
    },
    wave: {
      animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0, 0, 1, 1],
      },
    },
  };

  const animationStyles =
    animation === 'wave'
      ? {
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
        }
      : {};

  const style = {
    width: width,
    height: height,
    ...animationStyles,
  };

  return (
    <motion.div
      className={baseStyles}
      style={style}
      animate={animation === 'none' ? undefined : animations[animation].animate}
      transition={
        animation === 'none' ? undefined : animations[animation].transition
      }
      {...props}
    >
      {props.children}
    </motion.div>
  );
}

// Convenience components for common use cases
export function SkeletonText({
  lines = 1,
  lastLineWidth = '100%',
  gap = 'gap-2',
  ...props
}: {
  lines?: number;
  lastLineWidth?: string | number;
  gap?: string;
} & Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={clsx('flex flex-col', gap)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 && lines > 1 ? lastLineWidth : '100%'}
          {...props}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  header = true,
  lines = 3,
  className,
  ...props
}: {
  header?: boolean;
  lines?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant'>) {
  return (
    <div
      className={clsx(
        'space-y-4 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm',
        className
      )}
    >
      {header && (
        <div className="flex items-center gap-3">
          <Skeleton variant="avatar" size="sm" />
          <div className="flex-1">
            <Skeleton variant="text" width="40%" className="mb-2" />
            <Skeleton variant="text" width="20%" size="sm" />
          </div>
        </div>
      )}
      <Skeleton variant="rectangular" height={200} />
      <SkeletonText lines={lines} lastLineWidth="60%" />
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
  ...props
}: {
  rows?: number;
  columns?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={clsx('space-y-4', className)}>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            width="100%"
            size="md"
            className="h-8"
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" width="100%" />
          ))}
        </div>
      ))}
    </div>
  );
}
