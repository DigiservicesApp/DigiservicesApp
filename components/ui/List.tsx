'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const listVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      card: 'rounded-xl bg-[color:var(--md-sys-color-surface-container)] shadow-sm',
      bordered:
        'divide-y divide-[color:var(--md-sys-color-outline-variant)] rounded-xl border border-[color:var(--md-sys-color-outline-variant)]',
    },
    size: {
      sm: '[&_li]:p-2',
      md: '[&_li]:p-3',
      lg: '[&_li]:p-4',
    },
    hover: {
      true: '[&_li:hover]:bg-[color:var(--md-sys-color-surface-container-highest)]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    hover: true,
  },
});

const listItemVariants = cva('flex items-center gap-4 transition-colors', {
  variants: {
    active: {
      true: 'bg-[color:var(--md-sys-color-secondary-container)] text-[color:var(--md-sys-color-on-secondary-container)]',
      false: '',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  className?: string;
}

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  className?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, size, hover, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(listVariants({ variant, size, hover }), className)}
      {...props}
    />
  )
);
List.displayName = 'List';

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      active,
      disabled,
      startContent,
      endContent,
      children,
      ...props
    },
    ref
  ) => (
    <li
      ref={ref}
      className={cn(listItemVariants({ active, disabled }), className)}
      {...props}
    >
      {startContent && (
        <span className="flex shrink-0 items-center">{startContent}</span>
      )}
      <span className="flex-1 min-w-0">{children}</span>
      {endContent && (
        <span className="flex shrink-0 items-center">{endContent}</span>
      )}
    </li>
  )
);
ListItem.displayName = 'ListItem';

// Usage example:
/*
import { List, ListItem } from './List.new';

function Example() {
  return (
    <List variant="card" size="md">
      <ListItem
        startContent={<UserIcon className="h-5 w-5" />}
        endContent={<ChevronRightIcon className="h-5 w-5" />}
      >
        Profile Settings
      </ListItem>
      <ListItem
        startContent={<SettingsIcon className="h-5 w-5" />}
        endContent={<ChevronRightIcon className="h-5 w-5" />}
        active
      >
        Account Settings
      </ListItem>
      <ListItem
        startContent={<LogOutIcon className="h-5 w-5" />}
        endContent={<ChevronRightIcon className="h-5 w-5" />}
        disabled
      >
        Log Out
      </ListItem>
    </List>
  );
}

// Variants
<List variant="default">...</List>
<List variant="card">...</List>
<List variant="bordered">...</List>

// Sizes
<List size="sm">...</List>
<List size="md">...</List>
<List size="lg">...</List>

// Disable hover effect
<List hover={false}>...</List>

// Active and disabled states
<ListItem active>...</ListItem>
<ListItem disabled>...</ListItem>

// With start/end content
<ListItem
  startContent={<Icon />}
  endContent={<Badge>New</Badge>}
>
  Content
</ListItem>
*/
