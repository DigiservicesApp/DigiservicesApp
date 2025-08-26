'use client';

import React, { useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const drawerOverlayVariants = cva(
  'fixed inset-0 z-50 bg-[color:var(--md-sys-color-scrim)] backdrop-blur-sm transition-opacity',
  {
    variants: {
      open: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

const drawerContainerVariants = cva(
  'fixed z-50 flex flex-col bg-[color:var(--md-sys-color-surface)] transition-transform duration-300 ease-in-out',
  {
    variants: {
      position: {
        left: 'left-0 top-0 h-full',
        right: 'right-0 top-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
      },
      size: {
        sm: 'w-64 max-w-[80vw]',
        md: 'w-80 max-w-[80vw]',
        lg: 'w-96 max-w-[80vw]',
        xl: 'w-[32rem] max-w-[80vw]',
        full: 'w-screen',
      },
      open: {
        true: '[transform:translate3d(0,0,0)]',
        false: '',
      },
    },
    compoundVariants: [
      {
        position: 'left',
        open: false,
        className: '[transform:translate3d(-100%,0,0)]',
      },
      {
        position: 'right',
        open: false,
        className: '[transform:translate3d(100%,0,0)]',
      },
      {
        position: 'top',
        open: false,
        className: '[transform:translate3d(0,-100%,0)]',
      },
      {
        position: 'bottom',
        open: false,
        className: '[transform:translate3d(0,100%,0)]',
      },
      {
        position: ['top', 'bottom'],
        size: ['sm', 'md', 'lg', 'xl'],
        className: 'w-full h-[380px]',
      },
    ],
    defaultVariants: {
      position: 'right',
      size: 'md',
      open: false,
    },
  }
);

export interface DrawerProps
  extends VariantProps<typeof drawerContainerVariants> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Drawer({
  open,
  onClose,
  position,
  size,
  children,
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose, closeOnEsc]);

  return (
    <>
      <div
        className={drawerOverlayVariants({ open })}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          drawerContainerVariants({ position, size, open }),
          'shadow-xl',
          className
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            className={cn(
              'absolute right-4 top-4 rounded-full p-2',
              'text-[color:var(--md-sys-color-on-surface-variant)]',
              'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
              'focus:outline-none focus:ring-2',
              'focus:ring-[color:var(--md-sys-color-primary)]'
            )}
            onClick={onClose}
            aria-label="Close drawer"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
}

export function DrawerHeader({
  className,
  children,
  ...props
}: DrawerHeaderProps) {
  return (
    <div className={cn('mb-6 pr-8', className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerFooter({
  className,
  children,
  ...props
}: DrawerFooterProps) {
  return (
    <div
      className={cn('mt-6 flex flex-col-reverse gap-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}
