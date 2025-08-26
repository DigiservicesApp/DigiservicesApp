'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-[color:var(--md-sys-color-surface-container-highest)]',
  {
    variants: {
      variant: {
        default: '',
        card: 'p-4',
        avatar: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function Skeleton({
  className,
  variant,
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    />
  );
}

export interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
  lastLineWidth?: number | string;
}

export function SkeletonText({
  className,
  lines = 3,
  lastLineWidth = '67%',
  height = '1em',
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full"
          height={height}
          style={{
            width: i === lines - 1 ? lastLineWidth : '100%',
          }}
          {...props}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      <Skeleton variant="avatar" width={40} height={40} />
      <SkeletonText lines={2} />
      <Skeleton height={200} />
    </div>
  );
}

// Usage example:
/*
import { Skeleton, SkeletonText, SkeletonCard } from './Skeleton.new';

function Example() {
  return (
    <div className="flex flex-col gap-8">
      {/* Simple skeleton
      <Skeleton width={200} height={20} />

      {/* Text skeleton
      <SkeletonText
        lines={3}
        lastLineWidth="67%"
        height="1em"
      />

      {/* Card skeleton 
      <SkeletonCard className="w-full max-w-md" />

      {/* Custom skeleton layouts
      <div className="flex gap-4">
        <Skeleton
          variant="avatar"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <SkeletonText
            lines={2}
            lastLineWidth="40%"
          />
        </div>
      </div>
    </div>
  );
}

// Different variants
<Skeleton variant="default" />
<Skeleton variant="card" />
<Skeleton variant="avatar" />

// Custom dimensions
<Skeleton width={200} height={100} />
<Skeleton width="100%" height="200px" />

// Text skeleton options
<SkeletonText lines={5} />
<SkeletonText lastLineWidth="40%" />
<SkeletonText height="1.5em" />

// Card with custom class
<SkeletonCard className="max-w-sm rounded-xl p-6" />
*/
