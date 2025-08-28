'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex cursor-pointer items-center justify-center rounded-full transition-all duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:transform active:scale-95 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        filled:
          'bg-[color:var(--md-sys-color-primary)] text-[color:var(--md-sys-color-on-primary)] hover:shadow-md',
        outlined:
          'border-2 border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-primary)] hover:bg-[color:var(--md-sys-color-primary-container)] hover:text-[color:var(--md-sys-color-on-primary-container)] hover:border-transparent',
        text: 'text-[color:var(--md-sys-color-primary)] hover:bg-[color:var(--md-sys-color-primary-container)] hover:text-[color:var(--md-sys-color-on-primary-container)]',
        tonal:
          'bg-[color:var(--md-sys-color-secondary-container)] text-[color:var(--md-sys-color-on-secondary-container)] hover:shadow-md',
        elevated:
          'bg-[color:var(--md-sys-color-surface-container-low)] text-[color:var(--md-sys-color-primary)] shadow-sm hover:shadow-md',
      },
      size: {
        sm: 'text-sm px-4 py-2 gap-1.5',
        md: 'text-base px-6 py-2.5 gap-2',
        lg: 'text-lg px-8 py-3 gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
      withIcon: {
        true: 'inline-flex items-center',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      fullWidth: false,
      withIcon: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      children,
      disabled,
      loading,
      leadingIcon,
      trailingIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            withIcon: !!(leadingIcon || trailingIcon),
            className,
          })
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-current rounded-full animate-spin border-t-transparent" />
        ) : (
          <>
            {leadingIcon && <span className="inline-flex">{leadingIcon}</span>}
            {children}
            {trailingIcon && (
              <span className="inline-flex">{trailingIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

// Usage example:
/*
import { Button } from './Button.new';

// Filled button (default)
<Button>Click me</Button>

// Outlined button
<Button variant="outlined">Click me</Button>

// Text button
<Button variant="text">Click me</Button>

// Tonal button
<Button variant="tonal">Click me</Button>

// Elevated button
<Button variant="elevated">Click me</Button>

// With leading icon
<Button leadingIcon={<IconComponent />}>Click me</Button>

// With trailing icon
<Button trailingIcon={<IconComponent />}>Click me</Button>

// Loading state
<Button loading>Click me</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Full width
<Button fullWidth>Full Width</Button>
*/
