'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tableVariants = cva('w-full border-collapse text-left', {
  variants: {
    variant: {
      default: '',
      striped:
        '[&_tr:nth-child(odd)]:bg-[color:var(--md-sys-color-surface-container)]',
      bordered: 'border border-[color:var(--md-sys-color-outline-variant)]',
      hoverable:
        '[&_tr:hover]:bg-[color:var(--md-sys-color-surface-container-highest)]',
    },
    density: {
      comfortable: '[&_td]:py-4 [&_th]:py-3',
      compact: '[&_td]:py-2 [&_th]:py-2',
      condensed: '[&_td]:py-1 [&_th]:py-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    density: 'comfortable',
  },
});

const tableCellVariants = cva(
  'px-4 align-middle [&:first-child]:pl-6 [&:last-child]:pr-6',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  className?: string;
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
}

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableCellVariants> {
  className?: string;
}

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    VariantProps<typeof tableCellVariants> {
  className?: string;
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  className?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, density, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant, density }),
          'text-[color:var(--md-sys-color-on-surface)]',
          className
        )}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        'border-b border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface-container-low)]',
        className
      )}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        'divide-y divide-[color:var(--md-sys-color-outline-variant)]',
        className
      )}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface-container-low)] font-medium',
        className
      )}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors',
        '[&_td]:border-b [&_td]:border-[color:var(--md-sys-color-outline-variant)]',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        tableCellVariants({ align }),
        'font-medium text-[color:var(--md-sys-color-on-surface-variant)]',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ align }), className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      'mt-4 text-sm text-[color:var(--md-sys-color-on-surface-variant)]',
      className
    )}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
