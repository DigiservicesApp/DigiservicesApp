'use client';
import React from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  variant?: 'basic' | 'ordered' | 'unordered' | 'description' | 'action';
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  divided?: boolean;
  animated?: boolean;
  className?: string;
  emptyState?: React.ReactNode;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const spacingClasses = {
  none: 'space-y-0',
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-4',
};

export default function List<T>({
  items,
  renderItem,
  variant = 'basic',
  size = 'md',
  spacing = 'md',
  divided = false,
  animated = false,
  className,
  emptyState,
}: ListProps<T>) {
  if (items.length === 0 && emptyState) {
    return (
      <div
        className={clsx(
          'text-center py-8 text-slate-500 dark:text-slate-400',
          sizeClasses[size]
        )}
      >
        {emptyState}
      </div>
    );
  }

  const ListComponent = variant === 'ordered' ? 'ol' : 'ul';
  const listStyles = clsx(
    sizeClasses[size],
    spacingClasses[spacing],
    divided && 'divide-y divide-slate-200 dark:divide-slate-700',
    {
      'list-none': variant === 'basic' || variant === 'action',
      'list-decimal pl-4': variant === 'ordered',
      'list-disc pl-4': variant === 'unordered',
    },
    className
  );

  const itemStyles = clsx(
    divided && 'py-2',
    variant === 'action' && [
      'px-4 py-2 rounded-lg transition-colors duration-200',
      'hover:bg-slate-50 dark:hover:bg-slate-800',
      'cursor-pointer',
    ]
  );

  const renderAnimatedItem = (item: T, index: number) => (
    <motion.li
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={itemStyles}
    >
      {renderItem(item, index)}
    </motion.li>
  );

  const renderStaticItem = (item: T, index: number) => (
    <li key={index} className={itemStyles}>
      {renderItem(item, index)}
    </li>
  );

  return (
    <ListComponent className={listStyles}>
      {animated ? (
        <AnimatePresence>
          {items.map((item, index) => renderAnimatedItem(item, index))}
        </AnimatePresence>
      ) : (
        items.map((item, index) => renderStaticItem(item, index))
      )}
    </ListComponent>
  );
}

// Description List Component
interface DescriptionListProps {
  items: Array<{
    term: React.ReactNode;
    description: React.ReactNode;
  }>;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export function DescriptionList({
  items,
  size = 'md',
  layout = 'vertical',
  className,
}: DescriptionListProps) {
  return (
    <dl
      className={clsx(
        'space-y-4',
        layout === 'horizontal' &&
          'divide-y divide-slate-200 dark:divide-slate-700',
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={clsx(
            layout === 'horizontal' && 'grid grid-cols-3 gap-4 py-4',
            layout === 'vertical' && 'space-y-1'
          )}
        >
          <dt
            className={clsx('font-medium text-dark-slate', sizeClasses[size])}
          >
            {item.term}
          </dt>
          <dd
            className={clsx(
              'text-slate-600 dark:text-slate-300',
              sizeClasses[size],
              layout === 'horizontal' && 'col-span-2'
            )}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
