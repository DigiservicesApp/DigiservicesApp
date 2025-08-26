'use client';

import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const breadcrumbVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: '',
      filled: 'p-2 rounded-lg bg-[color:var(--md-sys-color-surface-container)]',
    },
    size: {
      sm: 'text-sm gap-1',
      md: 'text-base gap-2',
      lg: 'text-lg gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const itemVariants = cva(
  'inline-flex items-center transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--md-sys-color-primary)] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: [
          'text-[color:var(--md-sys-color-on-surface-variant)]',
          'hover:text-[color:var(--md-sys-color-on-surface)]',
        ],
        filled: [
          'px-2 py-1',
          'text-[color:var(--md-sys-color-on-surface-variant)]',
          'hover:text-[color:var(--md-sys-color-on-surface)]',
          'hover:bg-[color:var(--md-sys-color-surface-container-high)]',
        ],
      },
      size: {
        sm: 'text-sm gap-1',
        md: 'text-base gap-1.5',
        lg: 'text-lg gap-2',
      },
      current: {
        true: 'font-medium text-[color:var(--md-sys-color-on-surface)] cursor-default pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      current: false,
    },
  }
);

const separatorVariants = cva(
  'text-[color:var(--md-sys-color-on-surface-variant)]',
  {
    variants: {
      size: {
        sm: 'mx-1',
        md: 'mx-2',
        lg: 'mx-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
  variant?: VariantProps<typeof itemVariants>['variant'];
  size?: VariantProps<typeof itemVariants>['size'];
}

export function Breadcrumb({
  children,
  className,
  separator = '/',
  variant,
  size,
  ...props
}: BreadcrumbProps) {
  const validChildren = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );

  return (
    <nav aria-label="Breadcrumb" {...props}>
      <ol className={cn(breadcrumbVariants({ variant, size }), className)}>
        {validChildren.map((child, index) => {
          if (!React.isValidElement(child)) return null;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span
                  className={cn(separatorVariants({ size }), 'select-none')}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
              {React.cloneElement(
                child as React.ReactElement<any>,
                {
                  variant,
                  size,
                } as BreadcrumbItemProps
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.displayName = 'Breadcrumb';

function BreadcrumbItem({
  children,
  className,
  href,
  icon,
  current,
  variant,
  size,
  ...props
}: BreadcrumbItemProps) {
  const itemClassName = cn(itemVariants({ variant, size, current }), className);
  const commonProps = {
    className: itemClassName,
    'aria-current': current ? ('page' as const) : undefined,
    ...props,
  };

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {icon && <span className="opacity-70">{icon}</span>}
        {children}
      </Link>
    );
  }

  if ('onClick' in props) {
    return (
      <button type="button" {...commonProps}>
        {icon && <span className="opacity-70">{icon}</span>}
        {children}
      </button>
    );
  }

  return (
    <span {...commonProps}>
      {icon && <span className="opacity-70">{icon}</span>}
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(itemVariants({ variant, size, current }), className)}
        {...props}
      >
        {icon && <span className="opacity-70">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(itemVariants({ variant, size, current }), className)}
      {...props}
    >
      {icon && <span className="opacity-70">{icon}</span>}
      {children}
    </button>
  );
}

// Usage example:
/*
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb.new';

// Basic usage
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem current>Categories</BreadcrumbItem>
</Breadcrumb>

// Different variants
<Breadcrumb variant="default">...</Breadcrumb>
<Breadcrumb variant="filled">...</Breadcrumb>

// Different sizes
<Breadcrumb size="sm">...</Breadcrumb>
<Breadcrumb size="md">...</Breadcrumb>
<Breadcrumb size="lg">...</Breadcrumb>

// Custom separator
<Breadcrumb separator=">">...</Breadcrumb>

// With icons
<Breadcrumb>
  <BreadcrumbItem href="/" icon={<HomeIcon />}>
    Home
  </BreadcrumbItem>
  <BreadcrumbItem
    href="/products"
    icon={<ShoppingCartIcon />}
  >
    Products
  </BreadcrumbItem>
</Breadcrumb>

// Dynamic breadcrumbs
const paths = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/products/categories', label: 'Categories' },
];

<Breadcrumb>
  {paths.map((path, i) => (
    <BreadcrumbItem
      key={path.href}
      href={path.href}
      current={i === paths.length - 1}
    >
      {path.label}
    </BreadcrumbItem>
  ))}
</Breadcrumb>
*/
