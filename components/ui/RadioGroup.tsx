'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const radioGroupVariants = cva('flex gap-2', {
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap',
      vertical: 'flex-col',
    },
    size: {
      sm: '[&_label]:text-sm',
      md: '[&_label]:text-base',
      lg: '[&_label]:text-lg',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
  },
});

const radioVariants = cva(
  'peer relative h-4 w-4 shrink-0 rounded-full border-2 border-[color:var(--md-sys-color-outline)] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--md-sys-color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-[color:var(--md-sys-color-on-primary)]',
        error:
          'border-[color:var(--md-sys-color-error)] text-[color:var(--md-sys-color-on-error)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    Omit<VariantProps<typeof radioGroupVariants>, 'size'>,
    Omit<VariantProps<typeof radioVariants>, 'size'> {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: VariantProps<typeof radioGroupVariants>['size'];
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  orientation,
  size,
  variant,
  required,
  className,
  ...props
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    controlledValue ?? defaultValue
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      role="radiogroup"
      className={cn(radioGroupVariants({ orientation, size }), className)}
      {...props}
    >
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        const checked = selectedValue === option.value;

        return (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={checked}
              disabled={option.disabled}
              required={required}
              onChange={handleChange}
              className={cn(
                radioVariants({ variant }),
                checked &&
                  variant !== 'error' &&
                  'border-[color:var(--md-sys-color-primary)] bg-[color:var(--md-sys-color-primary)]',
                checked &&
                  variant === 'error' &&
                  'border-[color:var(--md-sys-color-error)] bg-[color:var(--md-sys-color-error)]'
              )}
            />
            <label
              htmlFor={id}
              className={cn(
                'text-[color:var(--md-sys-color-on-surface)]',
                'cursor-pointer',
                option.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

// Usage example:
/*
import { RadioGroup } from './RadioGroup.new';

function Example() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true },
  ];

  const [value, setValue] = React.useState('1');

  return (
    <RadioGroup
      name="example"
      options={options}
      value={value}
      onChange={setValue}
      orientation="vertical"
      size="md"
      variant="default"
      required
    />
  );
}

// Different orientations
<RadioGroup orientation="horizontal" options={options} />
<RadioGroup orientation="vertical" options={options} />

// Different sizes
<RadioGroup size="sm" options={options} />
<RadioGroup size="md" options={options} />
<RadioGroup size="lg" options={options} />

// Error variant
<RadioGroup variant="error" options={options} />

// Required field
<RadioGroup required options={options} />

// With rich content in labels
const richOptions = [
  {
    label: (
      <div>
        <strong>Option 1</strong>
        <p>Description for option 1</p>
      </div>
    ),
    value: '1',
  },
  // ...more options
];
<RadioGroup options={richOptions} />
*/
