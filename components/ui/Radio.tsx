'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioVariants = cva(
  'peer relative shrink-0 appearance-none rounded-full border-2 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed',
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
          'checked:border-[color:var(--md-sys-color-primary)]',
          'hover:border-[color:var(--md-sys-color-on-surface)]',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[color:var(--md-sys-color-primary)]',
          'focus-visible:ring-offset-2',
          'disabled:opacity-50',
          'disabled:checked:border-[color:var(--md-sys-color-on-surface-variant)]',
        ],
        error: [
          'border-[color:var(--md-sys-color-error)]',
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

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
          <div className="relative">
            <input
              type="radio"
              id={id}
              ref={ref}
              disabled={disabled}
              className={cn(
                radioVariants({
                  size,
                  variant: error ? 'error' : variant,
                  className,
                })
              )}
              {...props}
            />
            <div
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
                'opacity-0 peer-checked:opacity-100 transition-opacity',
                {
                  'w-2 h-2': size === 'sm',
                  'w-2.5 h-2.5': size === 'md',
                  'w-3 h-3': size === 'lg',
                }
              )}
            >
              <span
                className={cn(
                  'block w-full h-full rounded-full',
                  error
                    ? 'bg-[color:var(--md-sys-color-error)]'
                    : disabled
                    ? 'bg-[color:var(--md-sys-color-on-surface-variant)]'
                    : 'bg-[color:var(--md-sys-color-primary)]'
                )}
              />
            </div>
          </div>
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
              'text-sm transition-colors pl-7',
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

Radio.displayName = 'Radio';

export { Radio };

// Usage example:
/*
import { Radio } from './Radio.new';

// Basic radio
<Radio name="option" value="1" label="Option 1" />
<Radio name="option" value="2" label="Option 2" />

// Different sizes
<Radio size="sm" label="Small" name="size" value="sm" />
<Radio size="md" label="Medium" name="size" value="md" />
<Radio size="lg" label="Large" name="size" value="lg" />

// With helper text
<Radio
  label="Premium plan"
  helperText="Access to all features"
  name="plan"
  value="premium"
/>

// Error state
<Radio
  label="Required option"
  error
  errorText="This field is required"
  name="required"
  value="required"
/>

// Disabled state
<Radio label="Unavailable option" disabled name="disabled" value="disabled" />

// Controlled
const [selected, setSelected] = useState('');
<Radio
  checked={selected === 'option1'}
  onChange={(e) => setSelected(e.target.value)}
  label="Controlled radio"
  name="controlled"
  value="option1"
/>
*/
