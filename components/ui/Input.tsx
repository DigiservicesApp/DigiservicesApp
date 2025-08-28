'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputWrapperVariants = cva('relative inline-flex w-full group', {
  variants: {
    variant: {
      filled:
        'rounded-t-lg bg-[color:var(--md-sys-color-surface-container-highest)]',
      outlined: 'rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
});

const inputVariants = cva(
  'w-full bg-transparent text-[color:var(--md-sys-color-on-surface)] transition-all duration-200 placeholder:text-transparent peer disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        filled: [
          'px-4 pt-8 pb-2',
          'border-b-2 border-[color:var(--md-sys-color-outline)]',
          'focus:border-[color:var(--md-sys-color-primary)]',
          'hover:border-[color:var(--md-sys-color-on-surface)]',
          'hover:focus:border-[color:var(--md-sys-color-primary)]',
        ],
        outlined: [
          'px-4 py-4',
          'border-2 border-[color:var(--md-sys-color-outline)] rounded-lg',
          'focus:border-[color:var(--md-sys-color-primary)] focus:ring-1 focus:ring-[color:var(--md-sys-color-primary)]',
          'hover:border-[color:var(--md-sys-color-on-surface)]',
          'hover:focus:border-[color:var(--md-sys-color-primary)]',
        ],
      },
      error: {
        true: 'border-[color:var(--md-sys-color-error)] focus:border-[color:var(--md-sys-color-error)] focus:ring-[color:var(--md-sys-color-error)]',
      },
      withLeadingIcon: {
        true: 'pl-12',
      },
      withTrailingIcon: {
        true: 'pr-12',
      },
    },
    defaultVariants: {
      variant: 'outlined',
    },
  }
);

const labelVariants = cva(
  'absolute left-4 text-[color:var(--md-sys-color-on-surface-variant)] pointer-events-none transition-all duration-200 peer-placeholder-shown:text-[color:var(--md-sys-color-on-surface-variant)] peer-focus:text-[color:var(--md-sys-color-primary)]',
  {
    variants: {
      variant: {
        filled:
          'top-2 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
        outlined:
          '-top-3 text-sm bg-[color:var(--md-sys-color-background)] px-1 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:bg-[color:var(--md-sys-color-background)]',
      },
      error: {
        true: 'text-[color:var(--md-sys-color-error)] peer-focus:text-[color:var(--md-sys-color-error)]',
      },
    },
    defaultVariants: {
      variant: 'outlined',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      label,
      error,
      errorMessage,
      leadingIcon,
      trailingIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        <div className={cn(inputWrapperVariants({ variant }))}>
          {leadingIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--md-sys-color-on-surface-variant)]">
              {leadingIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({
                variant,
                error,
                withLeadingIcon: !!leadingIcon,
                withTrailingIcon: !!trailingIcon,
                className,
              })
            )}
            placeholder=" "
            ref={ref}
            {...props}
          />

          <label
            className={cn(
              labelVariants({
                variant,
                error,
              })
            )}
          >
            {label}
          </label>

          {trailingIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--md-sys-color-on-surface-variant)]">
              {trailingIcon}
            </div>
          )}
        </div>

        {error && errorMessage && (
          <p className="text-sm text-[color:var(--md-sys-color-error)]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };

// Usage example:
/*
import { Input } from './Input.new';

// Outlined input (default)
<Input label="Email" />

// Filled input
<Input variant="filled" label="Email" />

// With placeholder
<Input label="Email" placeholder="Enter your email" />

// With error
<Input label="Email" error errorMessage="Please enter a valid email" />

// With leading icon
<Input
  label="Search"
  leadingIcon={<SearchIcon className="w-5 h-5" />}
/>

// With trailing icon
<Input
  label="Password"
  type="password"
  trailingIcon={<EyeIcon className="w-5 h-5" />}
/>

// Disabled
<Input label="Username" disabled />
*/
