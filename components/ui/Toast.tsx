'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Types
type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  variant?: ToastVariant;
  title?: string;
  duration?: number;
  onClose?: () => void;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

// Context
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Styles
const toastVariants = cva(
  'relative rounded-lg shadow-lg transition-all duration-200 animate-slide-in',
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
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const duration = toast.duration || 5000;

    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      removeToast(id);
      toast.onClose?.();
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  const { toasts, removeToast } = context;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-0 right-0 z-50 flex w-full flex-col items-end gap-2 p-4 sm:max-w-sm"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            toastVariants({ variant: toast.variant }),
            'w-full p-4 shadow-lg'
          )}
          role="alert"
        >
          <div className="flex w-full items-start gap-3 pr-8">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            <p className="text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className={cn(
                'absolute right-2 top-2 p-1 rounded-full',
                'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
                'focus:outline-none focus:ring-2',
                'focus:ring-[color:var(--md-sys-color-primary)]'
              )}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-4 w-4"
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
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

// Usage example:
/*
// First, wrap your app with ToastProvider
import { ToastProvider } from './Toast.new';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

// Then use the useToast hook in your components
import { useToast } from './Toast.new';

function YourComponent() {
  const { addToast } = useToast();

  // Show a simple toast
  addToast({
    message: 'This is a simple toast message',
  });

  // Show a success toast with title
  addToast({
    variant: 'success',
    title: 'Success!',
    message: 'Your changes have been saved.',
  });

  // Show an error toast with custom duration
  addToast({
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong.',
    duration: 10000, // 10 seconds
  });

  // Toast with callback
  addToast({
    variant: 'info',
    message: 'Processing...',
    onClose: () => {
      console.log('Toast closed');
    },
  });
}
*/

// Presentational single-toast component (default export) used by ToastContext
export default function Toast({
  message,
  title,
  variant = 'info',
  onClose,
}: {
  message: string;
  title?: string;
  variant?: ToastVariant;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(toastVariants({ variant }), 'w-full p-4 shadow-lg')}
      role="alert"
    >
      <div className="flex w-full items-start gap-3 pr-8">
        {title && <div className="font-semibold">{title}</div>}
        <p className="text-sm">{message}</p>
        <button
          onClick={onClose}
          className={cn(
            'absolute right-2 top-2 p-1 rounded-full',
            'hover:bg-[color:var(--md-sys-color-surface-container-highest)]',
            'focus:outline-none focus:ring-2',
            'focus:ring-[color:var(--md-sys-color-primary)]'
          )}
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-4 w-4"
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
      </div>
    </div>
  );
}
