'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const switchVariants = cva(
  'peer relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-[3.25rem]',
      },
      variant: {
        default: [
          'bg-[color:var(--md-sys-color-surface-container-highest)]',
          'border-2',
          'border-[color:var(--md-sys-color-outline)]',
          'hover:border-[color:var(--md-sys-color-on-surface)]',
          'peer-checked:bg-[color:var(--md-sys-color-primary)]',
          'peer-checked:border-[color:var(--md-sys-color-primary)]',
          'focus-visible:ring-[color:var(--md-sys-color-primary)]',
        ],
        error: [
          'bg-[color:var(--md-sys-color-error-container)]',
          'border-[color:var(--md-sys-color-error)]',
          'peer-checked:bg-[color:var(--md-sys-color-error)]',
          'peer-checked:border-[color:var(--md-sys-color-error)]',
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

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-[color:var(--md-sys-color-outline)] shadow-lg ring-0 transition-transform duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
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

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
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
    const thumbPositions = {
      sm: 'translate-x-4',
      md: 'translate-x-5',
      lg: 'translate-x-6',
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="checkbox"
              id={id}
              ref={ref}
              disabled={disabled}
              className="sr-only"
              {...props}
            />
            <div
              className={cn(
                switchVariants({
                  size,
                  variant: error ? 'error' : variant,
                  className,
                })
              )}
            >
              <div
                className={cn(
                  thumbVariants({ size }),
                  'translate-x-0.5',
                  'peer-checked:bg-[color:var(--md-sys-color-on-primary)]',
                  'peer-checked:' + thumbPositions[size || 'md']
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
              'text-sm transition-colors pl-[3.25rem]',
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

Switch.displayName = 'Switch';

export { Switch };

// Usage example:
/*
import { Switch } from './Switch.new';

// Basic switch
<Switch label="Enable notifications" />

// Different sizes
<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />

// With helper text
<Switch
  label="Dark mode"
  helperText="Enable dark mode for better visibility at night"
/>

// Error state
<Switch
  label="Required setting"
  error
  errorText="This setting must be enabled"
/>

// Disabled state
<Switch label="Maintenance mode" disabled />

// Controlled
const [enabled, setEnabled] = useState(false);
<Switch
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  label="Controlled switch"
/>
*/
