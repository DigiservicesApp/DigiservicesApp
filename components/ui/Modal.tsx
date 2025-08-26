'use client';

import React, { useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const modalOverlayVariants = cva(
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

const modalContainerVariants = cva(
  'fixed left-[50%] top-[50%] z-50 flex w-full translate-x-[-50%] translate-y-[-50%] flex-col transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-[calc(100%-2rem)]',
      },
      open: {
        true: 'scale-100 opacity-100',
        false: 'scale-95 opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
      open: false,
    },
  }
);

const modalContentVariants = cva(
  'relative rounded-xl bg-[color:var(--md-sys-color-surface)] text-[color:var(--md-sys-color-on-surface)] shadow-xl outline-none',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-2 border-[color:var(--md-sys-color-error)]',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalContentVariants> {
  open: boolean;
  onClose: () => void;
  size?: VariantProps<typeof modalContainerVariants>['size'];
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Modal({
  open,
  onClose,
  size,
  variant,
  padding,
  children,
  className,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) {
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
        className={modalOverlayVariants({ open })}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={modalContainerVariants({ size, open })}
      >
        <div
          className={cn(modalContentVariants({ variant, padding }), className)}
          onClick={(e) => e.stopPropagation()}
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
              aria-label="Close modal"
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
          {children}
        </div>
      </div>
    </>
  );
}

export function ModalHeader({
  className,
  children,
  ...props
}: ModalHeaderProps) {
  return (
    <div className={cn('mb-6 pr-8', className)} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({
  className,
  children,
  ...props
}: ModalFooterProps) {
  return (
    <div
      className={cn(
        'mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Usage example:
/*
import { Modal, ModalHeader, ModalFooter } from './Modal.new';
import { Button } from './Button.new';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
      >
        <ModalHeader>
          <h2 className="text-2xl font-semibold">
            Modal Title
          </h2>
        </ModalHeader>

        <p>Modal content goes here...</p>

        <ModalFooter>
          <Button
            variant="text"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

// Different sizes
<Modal size="sm">...</Modal>
<Modal size="md">...</Modal>
<Modal size="lg">...</Modal>
<Modal size="xl">...</Modal>
<Modal size="2xl">...</Modal>
<Modal size="full">...</Modal>

// Different variants
<Modal variant="default">...</Modal>
<Modal variant="destructive">...</Modal>

// Different padding
<Modal padding="none">...</Modal>
<Modal padding="sm">...</Modal>
<Modal padding="md">...</Modal>
<Modal padding="lg">...</Modal>

// Without close button
<Modal showCloseButton={false}>...</Modal>

// Disable overlay click
<Modal closeOnOverlayClick={false}>...</Modal>

// Disable ESC key
<Modal closeOnEsc={false}>...</Modal>
*/
