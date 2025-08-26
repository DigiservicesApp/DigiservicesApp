'use client';
import React from 'react';
import { clsx } from 'clsx';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padded?: boolean;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-3xl', // 768px
  md: 'max-w-5xl', // 1024px
  lg: 'max-w-7xl', // 1280px
  xl: 'max-w-[1440px]',
  full: 'max-w-full',
};

export default function Container({
  size = 'lg',
  padded = true,
  centered = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        sizeClasses[size],
        padded && 'px-4 sm:px-6 lg:px-8',
        centered && 'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Layout system components

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

const spacingClasses = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export function Stack({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={clsx(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        spacingClasses[spacing],
        wrap && 'flex-wrap',
        {
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
          'items-stretch': align === 'stretch',
          'justify-start': justify === 'start',
          'justify-center': justify === 'center',
          'justify-end': justify === 'end',
          'justify-between': justify === 'between',
          'justify-around': justify === 'around',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

export function Grid({
  columns = 1,
  spacing = 'md',
  className,
  children,
  ...props
}: GridProps) {
  const getGridCols = () => {
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }

    return Object.entries(columns)
      .map(([breakpoint, cols]) => `${breakpoint}:grid-cols-${cols}`)
      .join(' ');
  };

  return (
    <div
      className={clsx(
        'grid',
        getGridCols(),
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Compound components for common layouts
interface MainLayoutProps {
  sidebar?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function MainLayout({
  sidebar,
  sidebarPosition = 'left',
  header,
  footer,
  children,
}: MainLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--md-sys-color-background)' }}
    >
      {header && (
        <header
          className="sticky top-0 z-30"
          style={{
            background:
              'color-mix(in srgb,var(--md-sys-color-surface) 80%, transparent)',
            borderBottom: '1px solid var(--md-sys-color-outline)',
          }}
        >
          {header}
        </header>
      )}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {sidebarPosition === 'left' && sidebar}

        <main className="flex-1 p-6">{children}</main>

        {sidebarPosition === 'right' && sidebar}
      </div>

      {footer && (
        <footer
          style={{
            background: 'var(--md-sys-color-surface)',
            borderTop: '1px solid var(--md-sys-color-outline)',
          }}
        >
          {footer}
        </footer>
      )}
    </div>
  );
}
