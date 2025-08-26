'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer shrink-0 appearance-none rounded-[0.2rem] border-2 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        default: [
          'border-[color:var(--md-sys-color-outline)]',
          'checked:bg-[color:var(--md-sys-color-primary)]',
          'checked:border-[color:var(--md-sys-color-primary)]',
          'hover:border-[color:var(--md-sys-color-on-surface)]',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[color:var(--md-sys-color-primary)]',
          'focus-visible:ring-offset-2',
          'disabled:opacity-50',
          'disabled:checked:bg-[color:var(--md-sys-color-on-surface-variant)]',
          'disabled:checked:border-[color:var(--md-sys-color-on-surface-variant)]',
        ],
        error: [
          'border-[color:var(--md-sys-color-error)]',
          'checked:bg-[color:var(--md-sys-color-error)]',
          'checked:border-[color:var(--md-sys-color-error)]',
          'focus-visible:ring-[color:var(--md-sys-color-error)]',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const labelVariants = cva(
  'text-[color:var(--md-sys-color-on-surface)] select-none transition-colors',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      variant,
      label,
      helperText,
      error,
      errorText,
      disabled,
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            disabled={disabled}
            className={cn(
              checkboxVariants({
                size,
                variant: error ? 'error' : variant,
                className,
              }),
              'checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMC42NjY3IDAuNUw0LjI1IDYuOTE2NjdMMS4zMzMzMyA0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K")]',
              'checked:bg-no-repeat checked:bg-center'
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={id}
              className={cn(
                labelVariants({
                  size,
                  disabled,
                })
              )}
            >
              {label}
            </label>
          )}
        </div>
        {(helperText || (error && errorText)) && (
          <p
            className={cn(
              'text-sm transition-colors',
              error
                ? 'text-[color:var(--md-sys-color-error)]'
                : 'text-[color:var(--md-sys-color-on-surface-variant)]'
            )}
          >
            {error ? errorText : helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };

// Usage example:
/*
import { Checkbox } from './Checkbox.new';

// Basic checkbox
<Checkbox label="Remember me" />

// Different sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// With helper text
<Checkbox
  label="Subscribe to newsletter"
  helperText="We'll send you weekly updates"
/>

// Error state
<Checkbox
  label="Accept terms"
  error
  errorText="You must accept the terms"
/>

// Disabled state
<Checkbox label="Disabled option" disabled />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Controlled checkbox"
/>
*/
