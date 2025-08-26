'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarGroupVariants = cva('flex items-center', {
  variants: {
    spacing: {
      tight: '-space-x-2',
      normal: '-space-x-3',
      loose: '-space-x-4',
    },
    size: {
      xs: '[&>*]:h-6 [&>*]:w-6 text-xs',
      sm: '[&>*]:h-8 [&>*]:w-8 text-sm',
      md: '[&>*]:h-10 [&>*]:w-10 text-base',
      lg: '[&>*]:h-12 [&>*]:w-12 text-lg',
      xl: '[&>*]:h-16 [&>*]:w-16 text-xl',
    },
  },
  defaultVariants: {
    spacing: 'normal',
    size: 'md',
  },
});

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  max?: number;
  total?: number;
  className?: string;
  renderOverflow?: (overflowCount: number) => React.ReactNode;
}

export function AvatarGroup({
  children,
  className,
  spacing,
  size,
  max,
  total,
  renderOverflow,
  ...props
}: AvatarGroupProps) {
  const avatars = React.Children.toArray(children);
  const displayAvatars = max ? avatars.slice(0, max) : avatars;
  const remainingCount = total ?? (max ? Math.max(avatars.length - max, 0) : 0);

  const defaultRenderOverflow = (count: number) => (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-[color:var(--md-sys-color-surface-container-highest)] text-[color:var(--md-sys-color-on-surface)]',
        'ring-2 ring-[color:var(--md-sys-color-background)]'
      )}
    >
      +{count}
    </div>
  );

  return (
    <div
      className={cn(avatarGroupVariants({ spacing, size }), className)}
      role="group"
      {...props}
    >
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            'ring-2 ring-[color:var(--md-sys-color-background)]',
            'hover:z-20',
            index === 0 && 'hover:z-30',
            index === displayAvatars.length - 1 &&
              remainingCount === 0 &&
              'hover:z-10'
          )}
          style={{ zIndex: displayAvatars.length - index }}
        >
          {avatar}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="relative hover:z-20" style={{ zIndex: 0 }}>
          {renderOverflow?.(remainingCount) ??
            defaultRenderOverflow(remainingCount)}
        </div>
      )}
    </div>
  );
}

// Usage example:
/*
import { Avatar } from './Avatar.new';
import { AvatarGroup } from './AvatarGroup.new';

function Example() {
  return (
    <AvatarGroup
      spacing="normal"
      size="md"
      max={3}
      total={5}
    >
      <Avatar
        src="/avatar1.jpg"
        alt="User 1"
      />
      <Avatar
        src="/avatar2.jpg"
        alt="User 2"
      />
      <Avatar
        src="/avatar3.jpg"
        alt="User 3"
      />
      <Avatar
        src="/avatar4.jpg"
        alt="User 4"
      />
      <Avatar
        src="/avatar5.jpg"
        alt="User 5"
      />
    </AvatarGroup>
  );
}

// Different spacing
<AvatarGroup spacing="tight">...</AvatarGroup>
<AvatarGroup spacing="normal">...</AvatarGroup>
<AvatarGroup spacing="loose">...</AvatarGroup>

// Different sizes
<AvatarGroup size="xs">...</AvatarGroup>
<AvatarGroup size="sm">...</AvatarGroup>
<AvatarGroup size="md">...</AvatarGroup>
<AvatarGroup size="lg">...</AvatarGroup>
<AvatarGroup size="xl">...</AvatarGroup>

// With max display limit
<AvatarGroup max={3}>...</AvatarGroup>

// With total count
<AvatarGroup max={3} total={10}>...</AvatarGroup>

// Custom overflow render
<AvatarGroup
  max={3}
  total={10}
  renderOverflow={(count) => (
    <div className="custom-overflow">
      {count} more
    </div>
  )}
>
  ...
</AvatarGroup>
*/
