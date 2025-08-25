'use client';
import { createContext, useContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

interface ToastContextType {
  show: (props: ToastOptions) => void;
}

interface ToastOptions {
  message: string;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  position?:
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
}

interface Toast extends ToastOptions {
  id: string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const positions = {
  top: 'top-0 left-1/2 -translate-x-1/2',
  bottom: 'bottom-0 left-1/2 -translate-x-1/2',
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback(
    ({
      message,
      title,
      variant = 'info',
      duration = 5000,
      position = 'bottom-right',
    }: ToastOptions) => {
      const id = Math.random().toString(36).slice(2);
      const toast = { id, message, title, variant, duration, position };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  // Group toasts by position
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || 'bottom-right';
    if (!acc[position]) acc[position] = [];
    acc[position].push(toast);
    return acc;
  }, {} as Record<string, Toast[]>);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          Object.entries(groupedToasts).map(([position, positionToasts]) => (
            <div
              key={position}
              className={`fixed z-50 m-4 flex flex-col gap-2 ${
                positions[position as keyof typeof positions]
              }`}
            >
              <AnimatePresence mode="sync">
                {positionToasts.map((toast) => (
                  <Toast
                    key={toast.id}
                    message={toast.message}
                    title={toast.title}
                    variant={toast.variant}
                    onClose={() =>
                      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                    }
                  />
                ))}
              </AnimatePresence>
            </div>
          )),
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
