import React from 'react';
import { clsx } from 'clsx';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMoreLine,
} from 'react-icons/ri';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showFirstLast?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

const buttonBaseClasses =
  'flex items-center justify-center rounded-lg transition-colors duration-200';
const activeClasses = 'bg-electric-blue text-white hover:bg-electric-blue/90';
const inactiveClasses =
  'text-slate-600 hover:bg-slate-100 hover:text-electric-blue dark:text-slate-400 dark:hover:bg-slate-800';
const disabledClasses = 'text-slate-300 cursor-not-allowed dark:text-slate-600';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  showFirstLast = true,
  className,
}: PaginationProps) {
  const range = getPageRange(currentPage, totalPages, siblingCount);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const renderPageButton = (pageNumber: number | string, isActive = false) => (
    <button
      key={pageNumber}
      onClick={() =>
        typeof pageNumber === 'number' && handlePageChange(pageNumber)
      }
      disabled={typeof pageNumber !== 'number'}
      className={clsx(
        buttonBaseClasses,
        sizeClasses[size],
        typeof pageNumber === 'number'
          ? isActive
            ? activeClasses
            : inactiveClasses
          : disabledClasses
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {pageNumber}
    </button>
  );

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={clsx('flex items-center gap-2', className)}
    >
      {/* First page button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={clsx(
            buttonBaseClasses,
            sizeClasses[size],
            currentPage === 1 ? disabledClasses : inactiveClasses
          )}
          aria-label="First page"
        >
          <RiArrowLeftSLine className="w-5 h-5" />
          <RiArrowLeftSLine className="-ml-4 w-5 h-5" />
        </button>
      )}

      {/* Previous page button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          buttonBaseClasses,
          sizeClasses[size],
          currentPage === 1 ? disabledClasses : inactiveClasses
        )}
        aria-label="Previous page"
      >
        <RiArrowLeftSLine className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      {range.map((pageNumber, i) =>
        renderPageButton(pageNumber, pageNumber === currentPage)
      )}

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          buttonBaseClasses,
          sizeClasses[size],
          currentPage === totalPages ? disabledClasses : inactiveClasses
        )}
        aria-label="Next page"
      >
        <RiArrowRightSLine className="w-5 h-5" />
      </button>

      {/* Last page button */}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={clsx(
            buttonBaseClasses,
            sizeClasses[size],
            currentPage === totalPages ? disabledClasses : inactiveClasses
          )}
          aria-label="Last page"
        >
          <RiArrowRightSLine className="w-5 h-5" />
          <RiArrowRightSLine className="-ml-4 w-5 h-5" />
        </button>
      )}
    </nav>
  );
}

// Helper function to generate page range
function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | string)[] {
  const range: (number | string)[] = [];
  const dots = '...';

  // Calculate range bounds
  const leftBound = Math.max(1, currentPage - siblingCount);
  const rightBound = Math.min(totalPages, currentPage + siblingCount);
  const showLeftDots = leftBound > 2;
  const showRightDots = rightBound < totalPages - 1;

  // Generate range array
  if (showLeftDots && showRightDots) {
    return [1, dots, ...makeRange(leftBound, rightBound), dots, totalPages];
  } else if (showLeftDots) {
    return [1, dots, ...makeRange(leftBound, totalPages)];
  } else if (showRightDots) {
    return [...makeRange(1, rightBound), dots, totalPages];
  } else {
    return makeRange(1, totalPages);
  }
}

// Helper function to generate a range of numbers
function makeRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
