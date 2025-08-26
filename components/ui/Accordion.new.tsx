'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'divide-y divide-[color:var(--md-sys-color-outline-variant)]',
      bordered:
        'rounded-xl border border-[color:var(--md-sys-color-outline-variant)]',
      separated: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between py-4 text-left text-[color:var(--md-sys-color-on-surface)] transition-colors',
  {
    variants: {
      variant: {
        default: 'px-0 hover:text-[color:var(--md-sys-color-primary)]',
        bordered:
          'px-4 hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
        separated:
          'rounded-lg bg-[color:var(--md-sys-color-surface-container)] px-4 hover:bg-[color:var(--md-sys-color-surface-container-high)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const accordionContentVariants = cva(
  'overflow-hidden text-[color:var(--md-sys-color-on-surface-variant)]',
  {
    variants: {
      variant: {
        default: 'px-0',
        bordered: 'px-4',
        separated: 'px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  items: AccordionItemProps[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

export function Accordion({
  className,
  variant,
  items,
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  collapsible = true,
  ...props
}: AccordionProps) {
  const [value, setValue] = React.useState<string | string[]>(
    controlledValue ?? defaultValue ?? (type === 'multiple' ? [] : '')
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const isExpanded = React.useCallback(
    (itemValue: string) => {
      if (Array.isArray(value)) {
        return value.includes(itemValue);
      }
      return value === itemValue;
    },
    [value]
  );

  const handleItemClick = React.useCallback(
    (itemValue: string) => {
      if (type === 'multiple') {
        const newValue = Array.isArray(value)
          ? value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue]
          : [itemValue];
        setValue(newValue);
        onValueChange?.(newValue);
      } else {
        const newValue = value === itemValue && collapsible ? '' : itemValue;
        setValue(newValue);
        onValueChange?.(newValue);
      }
    },
    [type, value, collapsible, onValueChange]
  );

  return (
    <div className={cn(accordionVariants({ variant }), className)} {...props}>
      {items.map((item) => (
        <div
          key={item.value}
          className={cn(
            variant === 'bordered' && 'first:rounded-t-xl last:rounded-b-xl',
            variant === 'default' && 'first:border-t-0',
            variant === 'separated' &&
              'rounded-xl border border-[color:var(--md-sys-color-outline-variant)]'
          )}
        >
          <button
            type="button"
            onClick={() => !item.disabled && handleItemClick(item.value)}
            className={cn(
              accordionTriggerVariants({ variant }),
              item.disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={item.disabled}
            aria-expanded={isExpanded(item.value)}
            aria-controls={`accordion-content-${item.value}`}
          >
            {item.trigger}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                isExpanded(item.value) ? 'rotate-180' : 'rotate-0'
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            id={`accordion-content-${item.value}`}
            role="region"
            aria-labelledby={`accordion-trigger-${item.value}`}
            className={cn(
              accordionContentVariants({ variant }),
              'grid transition-all duration-200',
              isExpanded(item.value)
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <div className="pb-4 pt-0">{item.children}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Usage example:
/*
import { Accordion } from './Accordion.new';

function Example() {
  const items = [
    {
      value: 'item-1',
      trigger: 'Is it accessible?',
      children: (
        <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
      ),
    },
    {
      value: 'item-2',
      trigger: 'Is it styled?',
      children: (
        <p>Yes. It comes with Material Design styling.</p>
      ),
    },
    {
      value: 'item-3',
      trigger: 'Is it animated?',
      children: (
        <p>Yes. It's animated by default, but you can disable it.</p>
      ),
      disabled: true,
    },
  ];

  return (
    <Accordion
      items={items}
      type="single"
      defaultValue="item-1"
      collapsible
      variant="bordered"
    />
  );
}

// Different variants
<Accordion variant="default" items={items} />
<Accordion variant="bordered" items={items} />
<Accordion variant="separated" items={items} />

// Multiple selection
<Accordion type="multiple" items={items} />

// Controlled component
const [value, setValue] = useState('item-1');
<Accordion
  value={value}
  onValueChange={setValue}
  items={items}
/>

// Non-collapsible (always one open)
<Accordion collapsible={false} items={items} />
*/
