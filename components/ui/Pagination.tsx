'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const paginationVariants = cva('flex items-center gap-1', {
  variants: {
    variant: {
      default: '',
      filled: 'p-1 rounded-lg bg-[color:var(--md-sys-color-surface-container)]',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const pageButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--md-sys-color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'text-[color:var(--md-sys-color-on-surface-variant)]',
          'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
          'hover:text-[color:var(--md-sys-color-on-surface)]',
          'data-[current=true]:bg-[color:var(--md-sys-color-primary)]',
          'data-[current=true]:text-[color:var(--md-sys-color-on-primary)]',
        ],
        filled: [
          'text-[color:var(--md-sys-color-on-surface-variant)]',
          'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
          'hover:text-[color:var(--md-sys-color-on-surface)]',
          'data-[current=true]:bg-[color:var(--md-sys-color-primary)]',
          'data-[current=true]:text-[color:var(--md-sys-color-on-primary)]',
        ],
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
}) {
  const pages = React.useMemo(() => {
    const createRange = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = createRange(1, 3 + 2 * siblingCount);
      return [...leftRange, 'dots', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = createRange(
        totalPages - (3 + 2 * siblingCount) + 1,
        totalPages
      );
      return [1, 'dots', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }

    return createRange(1, totalPages);
  }, [currentPage, totalPages, siblingCount]);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  variant,
  size,
  className,
  ...props
}: PaginationProps) {
  const pages = usePagination({ currentPage, totalPages, siblingCount });

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn(paginationVariants({ variant, size }), className)}
      {...props}
    >
      {showFirstLast && (
        <button
          type="button"
          className={cn(pageButtonVariants({ variant, size }))}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          ««
        </button>
      )}

      <button
        type="button"
        className={cn(pageButtonVariants({ variant, size }))}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        «
      </button>

      {pages.map((page, i) => {
        if (page === 'dots') {
          return (
            <span
              key={`dots-${i}`}
              className="w-10 text-center text-[color:var(--md-sys-color-on-surface-variant)]"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            type="button"
            className={cn(pageButtonVariants({ variant, size }))}
            data-current={currentPage === page}
            onClick={() => onPageChange(page as number)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={cn(pageButtonVariants({ variant, size }))}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        »
      </button>

      {showFirstLast && (
        <button
          type="button"
          className={cn(pageButtonVariants({ variant, size }))}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          »»
        </button>
      )}
    </nav>
  );
}

// Usage example:
/*
import { Pagination } from './Pagination.new';

// Basic usage
const [currentPage, setCurrentPage] = useState(1);
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>

// Different variants
<Pagination variant="default" ... />
<Pagination variant="filled" ... />

// Different sizes
<Pagination size="sm" ... />
<Pagination size="md" ... />
<Pagination size="lg" ... />

// Custom sibling count
<Pagination siblingCount={2} ... />

// Without first/last buttons
<Pagination showFirstLast={false} ... />

// With custom styling
<Pagination
  className="justify-center"
  ...
/>

// Complete example
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  siblingCount={1}
  showFirstLast={true}
  variant="filled"
  size="md"
  className="justify-center mt-4"
/>
*/
