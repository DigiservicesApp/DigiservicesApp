'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
      },
      variant: {
        default: 'bg-[color:var(--md-sys-color-surface-container-highest)]',
        primary: 'bg-[color:var(--md-sys-color-primary-container)]',
        secondary: 'bg-[color:var(--md-sys-color-secondary-container)]',
        error: 'bg-[color:var(--md-sys-color-error-container)]',
      },
      border: {
        none: '',
        thin: 'ring-1 ring-[color:var(--md-sys-color-outline)]',
        medium: 'ring-2 ring-[color:var(--md-sys-color-outline)]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      border: 'none',
    },
  }
);

const avatarGroupVariants = cva('flex items-center', {
  variants: {
    spacing: {
      tight: '-space-x-2',
      normal: '-space-x-3',
      loose: '-space-x-4',
    },
  },
  defaultVariants: {
    spacing: 'normal',
  },
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
  showFallback?: boolean;
  className?: string;
}

export interface AvatarImageProps
  extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  max?: number;
  total?: number;
  className?: string;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = '',
      fallback,
      showFallback = false,
      size,
      variant,
      border,
      ...props
    },
    ref
  ) => {
    const [isImageError, setIsImageError] = React.useState(false);

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size, variant, border }), className)}
        {...props}
      >
        {src && !showFallback && !isImageError ? (
          <Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            width={64}
            height={64}
            onError={() => setIsImageError(true)}
          />
        ) : (
          <span
            className={cn(
              'flex h-full w-full items-center justify-center font-medium',
              variant === 'default' &&
                'text-[color:var(--md-sys-color-on-surface)]',
              variant === 'primary' &&
                'text-[color:var(--md-sys-color-on-primary-container)]',
              variant === 'secondary' &&
                'text-[color:var(--md-sys-color-on-secondary-container)]',
              variant === 'error' &&
                'text-[color:var(--md-sys-color-on-error-container)]'
            )}
          >
            {fallback || alt.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
    );
  }
);
Avatar.displayName = 'Avatar';

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, spacing, max, total, ...props }, ref) => {
    const avatars = React.Children.toArray(children);
    const displayAvatars = max ? avatars.slice(0, max) : avatars;
    const remainingCount = total ?? (max ? avatars.length - max : 0);

    return (
      <div
        ref={ref}
        className={cn(avatarGroupVariants({ spacing }), className)}
        {...props}
      >
        {displayAvatars}
        {remainingCount > 0 && (
          <Avatar
            className="!relative !inline-flex"
            variant="secondary"
            fallback={`+${remainingCount}`}
            showFallback
          />
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

// Usage example:
/*
import { Avatar, AvatarGroup } from './Avatar.new';

function Example() {
  return (
    <div className="flex flex-col gap-4">
      {/* Single Avatar 
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="John Doe"
        size="md"
        variant="primary"
        border="thin"
      />

      {/* Avatar with fallback 
      <Avatar
        alt="Jane Smith"
        variant="secondary"
        size="lg"
      />

      {/* Avatar Group 
      <AvatarGroup spacing="normal" max={3} total={5}>
        <Avatar
          src="https://example.com/avatar1.jpg"
          alt="User 1"
          size="md"
        />
        <Avatar
          src="https://example.com/avatar2.jpg"
          alt="User 2"
          size="md"
        />
        <Avatar
          src="https://example.com/avatar3.jpg"
          alt="User 3"
          size="md"
        />
        <Avatar
          src="https://example.com/avatar4.jpg"
          alt="User 4"
          size="md"
        />
        <Avatar
          src="https://example.com/avatar5.jpg"
          alt="User 5"
          size="md"
        />
      </AvatarGroup>
    </div>
  );
}

// Sizes
<Avatar size="xs">...</Avatar>
<Avatar size="sm">...</Avatar>
<Avatar size="md">...</Avatar>
<Avatar size="lg">...</Avatar>
<Avatar size="xl">...</Avatar>

// Variants
<Avatar variant="default">...</Avatar>
<Avatar variant="primary">...</Avatar>
<Avatar variant="secondary">...</Avatar>
<Avatar variant="error">...</Avatar>

// Borders
<Avatar border="none">...</Avatar>
<Avatar border="thin">...</Avatar>
<Avatar border="medium">...</Avatar>

// Group spacing
<AvatarGroup spacing="tight">...</AvatarGroup>
<AvatarGroup spacing="normal">...</AvatarGroup>
<AvatarGroup spacing="loose">...</AvatarGroup>

// With max and total
<AvatarGroup max={3} total={10}>...</AvatarGroup>
*/
