'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center transition-colors duration-200 font-medium',
  {
    variants: {
      variant: {
        default: [
          'bg-[color:var(--md-sys-color-secondary-container)]',
          'text-[color:var(--md-sys-color-on-secondary-container)]',
        ],
        primary: [
          'bg-[color:var(--md-sys-color-primary-container)]',
          'text-[color:var(--md-sys-color-on-primary-container)]',
        ],
        secondary: [
          'bg-[color:var(--md-sys-color-secondary-container)]',
          'text-[color:var(--md-sys-color-on-secondary-container)]',
        ],
        success: [
          'bg-[color:var(--md-sys-color-tertiary-container)]',
          'text-[color:var(--md-sys-color-on-tertiary-container)]',
        ],
        error: [
          'bg-[color:var(--md-sys-color-error-container)]',
          'text-[color:var(--md-sys-color-on-error-container)]',
        ],
        outline: [
          'border-2',
          'border-[color:var(--md-sys-color-outline)]',
          'text-[color:var(--md-sys-color-on-surface)]',
        ],
      },
      size: {
        sm: 'h-5 text-xs px-2 rounded-full',
        md: 'h-6 text-sm px-2.5 rounded-full',
        lg: 'h-7 text-base px-3 rounded-full',
      },
      withDot: {
        true: 'pl-1.5',
      },
      withIcon: {
        start: 'pl-1.5',
        end: 'pr-1.5',
        both: 'px-1.5',
      },
      removable: {
        true: 'pr-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const dotVariants = cva('rounded-full inline-block mr-1', {
  variants: {
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      dot,
      dotColor,
      icon,
      iconPosition = 'start',
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const withIcon = icon
      ? iconPosition === 'start'
        ? 'start'
        : 'end'
      : undefined;

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size,
            withDot: dot,
            withIcon,
            removable: !!onRemove,
            className,
          })
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(dotVariants({ size }), 'bg-current')}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
          />
        )}
        {icon && iconPosition === 'start' && (
          <span className={cn('mr-1 -ml-0.5')}>{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'end' && (
          <span className={cn('ml-1 -mr-0.5')}>{icon}</span>
        )}
        {onRemove && (
          <button
            type="button"
            className={cn(
              'ml-1 rounded-full p-0.5',
              'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
              'focus:outline-none focus:ring-2',
              'focus:ring-[color:var(--md-sys-color-primary)]'
            )}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <span className="sr-only">Remove</span>
            <svg
              className={cn({
                'h-3 w-3': size === 'sm',
                'h-3.5 w-3.5': size === 'md',
                'h-4 w-4': size === 'lg',
              })}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };

// Usage example:
/*
import { Badge } from './Badge.new';

// Basic badge
<Badge>Default</Badge>

// Different variants
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="outline">Outline</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With dot
<Badge dot>With dot</Badge>
<Badge dot dotColor="#ff0000">Custom dot color</Badge>

// With icon
<Badge icon={<IconComponent />}>With icon</Badge>
<Badge icon={<IconComponent />} iconPosition="end">
  Icon at end
</Badge>

// Removable
<Badge onRemove={() => console.log('removed')}>
  Removable badge
</Badge>

// Combined features
<Badge
  variant="primary"
  size="lg"
  dot
  icon={<IconComponent />}
  onRemove={() => console.log('removed')}
>
  Complete example
</Badge>
*/
