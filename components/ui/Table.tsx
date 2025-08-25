'use client';
import React from 'react';
import { clsx } from 'clsx';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface Column<T> {
  key: string;
  title: React.ReactNode;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSort?: (sortConfig: SortConfig) => void;
  sortConfig?: SortConfig;
  loading?: boolean;
  emptyState?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  striped?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string | number;
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const cellPaddingClasses = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  onSort,
  sortConfig,
  loading = false,
  emptyState,
  size = 'md',
  hover = true,
  striped = false,
  bordered = false,
  rounded = true,
  stickyHeader = false,
  maxHeight,
  className,
  rowClassName,
}: TableProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return;

    const direction =
      sortConfig?.key === column.key && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc';

    onSort({ key: column.key, direction });
  };

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isActive = sortConfig?.key === column.key;
    const direction = sortConfig?.direction;

    return (
      <span
        className={clsx(
          'inline-flex ml-2',
          isActive ? 'text-electric-blue' : 'text-slate-400'
        )}
      >
        {direction === 'asc' && isActive ? (
          <RiArrowUpSLine className="w-5 h-5" />
        ) : (
          <RiArrowDownSLine className="w-5 h-5" />
        )}
      </span>
    );
  };

  const tableContent = (
    <>
      <thead
        className={clsx(
          stickyHeader && 'sticky top-0 z-10 bg-white dark:bg-slate-800'
        )}
      >
        <tr
          className={clsx(
            'border-b border-slate-200 dark:border-slate-700',
            sizeClasses[size]
          )}
        >
          {columns.map((column) => (
            <th
              key={column.key}
              className={clsx(
                cellPaddingClasses[size],
                'font-semibold text-dark-slate whitespace-nowrap',
                column.sortable &&
                  'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700',
                {
                  'text-left': column.align === 'left' || !column.align,
                  'text-center': column.align === 'center',
                  'text-right': column.align === 'right',
                }
              )}
              style={{ width: column.width }}
              onClick={() => handleSort(column)}
            >
              <div className="flex items-center justify-between">
                <span>{column.title}</span>
                {renderSortIcon(column)}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody
        className={clsx(
          'divide-y divide-slate-200 dark:divide-slate-700',
          sizeClasses[size]
        )}
      >
        {data.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className={clsx(
              hover && 'hover:bg-slate-50 dark:hover:bg-slate-700',
              striped &&
                rowIndex % 2 === 1 &&
                'bg-slate-50 dark:bg-slate-800/50',
              typeof rowClassName === 'function'
                ? rowClassName(item, rowIndex)
                : rowClassName
            )}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={clsx(cellPaddingClasses[size], {
                  'text-left': column.align === 'left' || !column.align,
                  'text-center': column.align === 'center',
                  'text-right': column.align === 'right',
                })}
              >
                {column.render ? column.render(item) : item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );

  if (loading) {
    return (
      <div
        className={clsx(
          'w-full animate-pulse',
          'bg-slate-100 dark:bg-slate-800',
          rounded && 'rounded-lg',
          className
        )}
      >
        <div className="h-64" />
      </div>
    );
  }

  if (!data.length && emptyState) {
    return (
      <div
        className={clsx(
          'w-full p-8 text-center',
          'bg-white dark:bg-slate-800',
          bordered && 'border border-slate-200 dark:border-slate-700',
          rounded && 'rounded-lg',
          className
        )}
      >
        {emptyState}
      </div>
    );
  }

  const table = (
    <table className="w-full border-collapse">{tableContent}</table>
  );

  if (maxHeight) {
    return (
      <div
        className={clsx(
          'w-full overflow-auto',
          'bg-white dark:bg-slate-800',
          bordered && 'border border-slate-200 dark:border-slate-700',
          rounded && 'rounded-lg',
          className
        )}
        style={{ maxHeight }}
      >
        {table}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'w-full overflow-auto',
        'bg-white dark:bg-slate-800',
        bordered && 'border border-slate-200 dark:border-slate-700',
        rounded && 'rounded-lg',
        className
      )}
    >
      {table}
    </div>
  );
}
