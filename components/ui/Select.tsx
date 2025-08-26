'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const selectWrapperVariants = cva('relative inline-flex w-full group', {
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

const selectVariants = cva(
  'w-full appearance-none bg-transparent text-[color:var(--md-sys-color-on-surface)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
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
    },
    defaultVariants: {
      variant: 'outlined',
    },
  }
);

const labelVariants = cva(
  'absolute left-4 text-[color:var(--md-sys-color-on-surface-variant)] pointer-events-none transition-all duration-200 peer-focus:text-[color:var(--md-sys-color-primary)]',
  {
    variants: {
      variant: {
        filled:
          'top-2 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
        outlined:
          '-top-3 text-sm bg-[color:var(--md-sys-color-background)] px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:bg-[color:var(--md-sys-color-background)]',
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label: string;
  options: SelectOption[];
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      label,
      options,
      error,
      errorMessage,
      helperText,
      leadingIcon,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        <div className={cn(selectWrapperVariants({ variant }))}>
          {leadingIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--md-sys-color-on-surface-variant)]">
              {leadingIcon}
            </div>
          )}

          <select
            ref={ref}
            disabled={disabled}
            required={required}
            className={cn(
              selectVariants({
                variant,
                error,
                withLeadingIcon: !!leadingIcon,
                className,
              })
            )}
            {...props}
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <label
            className={cn(
              labelVariants({
                variant,
                error,
              })
            )}
          >
            {label}
            {required && (
              <span className="text-[color:var(--md-sys-color-error)]">*</span>
            )}
          </label>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[color:var(--md-sys-color-on-surface-variant)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 4 4 4-4" />
            </svg>
          </div>
        </div>

        {(error && errorMessage) || helperText ? (
          <p
            className={cn(
              'text-sm',
              error
                ? 'text-[color:var(--md-sys-color-error)]'
                : 'text-[color:var(--md-sys-color-on-surface-variant)]'
            )}
          >
            {error ? errorMessage : helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };

// Usage example:
/*
import { Select } from './Select.new';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

// Basic select
<Select
  label="Choose an option"
  options={options}
/>

// Outlined variant (default)
<Select
  variant="outlined"
  label="Choose an option"
  options={options}
/>

// Filled variant
<Select
  variant="filled"
  label="Choose an option"
  options={options}
/>

// With helper text
<Select
  label="Choose an option"
  options={options}
  helperText="Select the best option for you"
/>

// With error
<Select
  label="Choose an option"
  options={options}
  error
  errorMessage="Please select an option"
/>

// Required
<Select
  label="Choose an option"
  options={options}
  required
/>

// With leading icon
<Select
  label="Choose an option"
  options={options}
  leadingIcon={<IconComponent />}
/>

// Disabled
<Select
  label="Choose an option"
  options={options}
  disabled
/>

// Controlled
const [value, setValue] = useState('');
<Select
  value={value}
  onChange={(e) => setValue(e.target.value)}
  label="Choose an option"
  options={options}
/>
*/
