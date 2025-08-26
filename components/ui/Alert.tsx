'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative rounded-lg p-4 transition-all duration-200',
  {
    variants: {
      variant: {
        info: [
          'bg-[color:var(--md-sys-color-secondary-container)]',
          'text-[color:var(--md-sys-color-on-secondary-container)]',
          'border border-[color:var(--md-sys-color-secondary)]',
        ],
        success: [
          'bg-[color:var(--md-sys-color-tertiary-container)]',
          'text-[color:var(--md-sys-color-on-tertiary-container)]',
          'border border-[color:var(--md-sys-color-tertiary)]',
        ],
        warning: [
          'bg-[color:var(--md-sys-color-error-container)]',
          'text-[color:var(--md-sys-color-on-error-container)]',
          'border border-[color:var(--md-sys-color-error)]',
        ],
        error: [
          'bg-[color:var(--md-sys-color-error-container)]',
          'text-[color:var(--md-sys-color-on-error-container)]',
          'border border-[color:var(--md-sys-color-error)]',
        ],
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  }
);

const iconWrapperVariants = cva('absolute left-4 top-4 flex-shrink-0', {
  variants: {
    size: {
      sm: 'h-5 w-5',
      md: 'h-6 w-6',
      lg: 'h-7 w-7',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant, size, title, children, icon, onClose, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size, className }))}
        {...props}
      >
        <div className={cn('flex w-full', { 'pl-12': icon })}>
          {icon && <div className={iconWrapperVariants({ size })}>{icon}</div>}

          <div className="w-full pr-8">
            {title && <div className="font-semibold mb-1">{title}</div>}
            <div className="text-current">{children}</div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'absolute right-4 top-4 p-1 rounded-full',
                'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'focus:ring-[color:var(--md-sys-color-primary)]'
              )}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 6l8 8m0-8l-8 8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };

// Usage example:
/*
import { Alert } from './Alert.new';

// Basic alert
<Alert>This is a simple alert</Alert>

// With title
<Alert title="Information">
  Here's some important information.
</Alert>

// Different variants
<Alert variant="info">Info alert</Alert>
<Alert variant="success">Success alert</Alert>
<Alert variant="warning">Warning alert</Alert>
<Alert variant="error">Error alert</Alert>

// Different sizes
<Alert size="sm">Small alert</Alert>
<Alert size="md">Medium alert</Alert>
<Alert size="lg">Large alert</Alert>

// With icon
<Alert
  icon={<InfoIcon className="h-full w-full" />}
  title="Note"
>
  This alert has an icon
</Alert>

// Dismissible
<Alert
  onClose={() => console.log('Alert closed')}
>
  Click the X to dismiss this alert
</Alert>

// Full example
<Alert
  variant="success"
  size="md"
  title="Success!"
  icon={<CheckCircleIcon className="h-full w-full" />}
  onClose={() => console.log('Alert closed')}
>
  Your changes have been saved successfully.
</Alert>
*/
