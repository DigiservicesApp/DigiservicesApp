'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-[color:var(--md-sys-color-surface-container-highest)]',
  {
    variants: {
      variant: {
        default: '',
        success: '',
        error: '',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const progressBarVariants = cva('h-full w-full flex-1 transition-all', {
  variants: {
    variant: {
      default: 'bg-[color:var(--md-sys-color-primary)]',
      success: 'bg-[color:var(--md-sys-color-tertiary)]',
      error: 'bg-[color:var(--md-sys-color-error)]',
    },
    animated: {
      true: 'transition-transform duration-[2s] ease-in-out-sine',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    animated: true,
  },
});

const progressIndeterminateVariants = cva('absolute inset-0 flex w-full', {
  variants: {
    variant: {
      default: '[&>div]:bg-[color:var(--md-sys-color-primary)]',
      success: '[&>div]:bg-[color:var(--md-sys-color-tertiary)]',
      error: '[&>div]:bg-[color:var(--md-sys-color-error)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  animated?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant,
      size,
      animated = true,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage =
      value != null ? Math.min(Math.max((value / max) * 100, 0), 100) : null;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={percentage !== null ? Math.round(percentage) : undefined}
        className={cn(progressVariants({ variant, size }), className)}
        {...props}
      >
        {indeterminate ? (
          <div className={progressIndeterminateVariants({ variant })}>
            <div className="h-full w-[60%] animate-[progress-linear-indeterminate1_2.1s_cubic-bezier(0.65,0.815,0.735,0.395)_infinite]" />
            <div className="h-full w-[60%] animate-[progress-linear-indeterminate2_2.1s_cubic-bezier(0.165,0.84,0.44,1.0)_infinite]" />
          </div>
        ) : (
          <div
            className={progressBarVariants({ variant, animated })}
            style={{
              transform: `translateX(-${100 - (percentage ?? 0)}%)`,
            }}
          />
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

// Usage example:
/*
import { Progress } from './Progress.new';

function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Determinate progress 
      <Progress value={75} max={100} variant="default" size="md" />

      {/* Indeterminate progress *
      <Progress indeterminate variant="default" size="md" />

      {/* Success variant 
      <Progress value={100} variant="success" size="md" />

      {/* Error variant 
      <Progress value={25} variant="error" size="md" />
    </div>
  );
}

// Different variants
<Progress variant="default" value={75} />
<Progress variant="success" value={75} />
<Progress variant="error" value={75} />

// Different sizes
<Progress size="sm" value={75} />
<Progress size="md" value={75} />
<Progress size="lg" value={75} />

// Disable animation
<Progress animated={false} value={75} />

// Indeterminate state
<Progress indeterminate />
*/
