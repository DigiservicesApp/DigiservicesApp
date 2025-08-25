'use client';
import React from 'react';
import { clsx } from 'clsx';
import { RiArrowRightSLine, RiHome3Line } from 'react-icons/ri';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeLink?: string;
  separator?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  maxItems?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

export default function Breadcrumb({
  items,
  homeLink = '/',
  separator = <RiArrowRightSLine />,
  size = 'md',
  maxItems = 0,
  className,
}: BreadcrumbProps) {
  const renderItems = maxItems > 0 ? truncateItems(items, maxItems) : items;
  const iconSize = iconSizes[size];

  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex items-center', className)}
    >
      <ol
        className={clsx('flex items-center flex-wrap gap-1', sizeClasses[size])}
      >
        {/* Home item */}
        <li>
          <Link
            href={homeLink}
            className={clsx(
              'flex items-center text-slate-600 hover:text-electric-blue',
              'transition-colors duration-200'
            )}
          >
            <RiHome3Line size={iconSize} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Separator after home */}
        {renderItems.length > 0 && (
          <li className="flex items-center text-slate-400" aria-hidden="true">
            {separator}
          </li>
        )}

        {/* Breadcrumb items */}
        {renderItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <li>
              {index === renderItems.length - 1 ? (
                // Current page (last item)
                <span
                  className="flex items-center gap-1.5 font-medium text-dark-slate"
                  aria-current="page"
                >
                  {item.icon && (
                    <span className="text-slate-400">{item.icon}</span>
                  )}
                  {item.label}
                </span>
              ) : (
                // Navigate links
                <Link
                  href={item.href || '#'}
                  className={clsx(
                    'flex items-center gap-1.5',
                    'text-slate-600 hover:text-electric-blue',
                    'transition-colors duration-200'
                  )}
                >
                  {item.icon && (
                    <span className="text-slate-400">{item.icon}</span>
                  )}
                  {item.label}
                </Link>
              )}
            </li>

            {/* Separator between items */}
            {index < renderItems.length - 1 && (
              <li
                className="flex items-center text-slate-400"
                aria-hidden="true"
              >
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to truncate items with ellipsis
function truncateItems(
  items: BreadcrumbItem[],
  maxItems: number
): BreadcrumbItem[] {
  if (items.length <= maxItems) return items;

  const firstItem = items[0];
  const lastItems = items.slice(-Math.floor(maxItems / 2));
  const ellipsisItem: BreadcrumbItem = {
    label: '...',
    href: undefined,
  };

  return [firstItem, ellipsisItem, ...lastItems];
}

// Compound component for individual breadcrumb items
interface BreadcrumbItemProps extends BreadcrumbItem {
  current?: boolean;
  className?: string;
}

export function BreadcrumbItem({
  label,
  href,
  icon,
  current = false,
  className,
}: BreadcrumbItemProps) {
  const content = (
    <>
      {icon && <span className="text-slate-400">{icon}</span>}
      {label}
    </>
  );

  if (current) {
    return (
      <span
        className={clsx(
          'flex items-center gap-1.5 font-medium text-dark-slate',
          className
        )}
        aria-current="page"
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href || '#'}
      className={clsx(
        'flex items-center gap-1.5',
        'text-slate-600 hover:text-electric-blue',
        'transition-colors duration-200',
        className
      )}
    >
      {content}
    </Link>
  );
}

// Attach Item component to Breadcrumb
Breadcrumb.Item = BreadcrumbItem;
