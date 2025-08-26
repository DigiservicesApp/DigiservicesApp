'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--md-sys-color-outline)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-[color:var(--md-sys-color-secondary-container)] text-[color:var(--md-sys-color-on-secondary-container)]',
        primary:
          'bg-[color:var(--md-sys-color-primary-container)] text-[color:var(--md-sys-color-on-primary-container)]',
        error:
          'bg-[color:var(--md-sys-color-error-container)] text-[color:var(--md-sys-color-on-error-container)]',
        outline:
          'border border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)]',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
      clickable: {
        true: 'cursor-pointer hover:opacity-80',
        false: '',
      },
      removable: {
        true: '[&>button]:hover:bg-[color:var(--md-sys-color-surface-container-highest)] [&>button]:focus:ring-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      clickable: false,
      removable: false,
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  className?: string;
  onRemove?: () => void;
  icon?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      clickable,
      removable,
      icon,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ variant, size, clickable, removable }),
          className
        )}
        {...props}
      >
        {icon && <span className="mr-1 -ml-1">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            className="ml-1 -mr-1 rounded-full p-0.5 focus:outline-none"
            onClick={handleRemove}
            aria-label="Remove tag"
          >
            <svg
              className="h-3 w-3"
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
      </div>
    );
  }
);
Tag.displayName = 'Tag';

// Usage example:
/*
import { Tag } from './Tag.new';

function Example() {
  return (
    <div className="flex gap-2">
      {/* Basic tag
      <Tag>New</Tag>

      {/* With icon
      <Tag
        icon={
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        }
        variant="primary"
      >
        Completed
      </Tag>

      {/* Removable tag 
      <Tag
        removable
        onRemove={() => console.log('Tag removed')}
        variant="error"
      >
        Remove me
      </Tag>

      {/* Clickable tag
      <Tag
        clickable
        onClick={() => console.log('Tag clicked')}
        variant="outline"
      >
        Click me
      </Tag>
    </div>
  );
}

// Different variants
<Tag variant="default">Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="outline">Outline</Tag>

// Different sizes
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>

// Interactive tags
<Tag clickable onClick={() => {}}>Clickable</Tag>
<Tag removable onRemove={() => {}}>Removable</Tag>

// With icon
<Tag icon={<Icon />}>With Icon</Tag>

// Combining features
<Tag
  variant="primary"
  size="lg"
  clickable
  removable
  icon={<Icon />}
  onClick={() => {}}
  onRemove={() => {}}
>
  Interactive Tag
</Tag>
*/
