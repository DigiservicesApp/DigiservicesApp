'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  // Base styles
  'rounded-xl transition-all duration-200 bg-[color:var(--md-sys-color-surface)]',
  {
    variants: {
      variant: {
        elevated:
          'shadow-sm hover:shadow-md bg-[color:var(--md-sys-color-surface-container-low)]',
        filled: 'bg-[color:var(--md-sys-color-surface-container)]',
        outlined: 'border border-[color:var(--md-sys-color-outline)]',
      },
      clickable: {
        true: 'cursor-pointer active:scale-[0.98] hover:shadow-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
      clickable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, clickable, as: Component = 'div', ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            padding,
            clickable,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card.Header component
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'Card.Header';

// Card.Title component
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight text-[color:var(--md-sys-color-on-surface)]',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'Card.Title';

// Card.Description component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-[color:var(--md-sys-color-on-surface-variant)]',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'Card.Description';

// Card.Content component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'Card.Content';

// Card.Footer component
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'Card.Footer';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

// Usage example:
/*
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card.new';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    Footer content goes here
  </CardFooter>
</Card>

// Elevated card (default)
<Card variant="elevated">Content</Card>

// Filled card
<Card variant="filled">Content</Card>

// Outlined card
<Card variant="outlined">Content</Card>

// Clickable card
<Card clickable onClick={() => console.log('clicked')}>
  Clickable content
</Card>

// Different padding sizes
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>
<Card padding="none">No padding</Card>

// As a button or link
<Card as="button" clickable>Button card</Card>
<Card as="a" href="#" clickable>Link card</Card>
*/
