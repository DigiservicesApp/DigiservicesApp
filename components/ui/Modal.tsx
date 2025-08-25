'use client';
import { HTMLAttributes } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import Card from './Card';

interface ModalProps
  extends Omit<HTMLMotionProps<'div'>, keyof HTMLAttributes<HTMLDivElement>> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: ModalProps) {
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-slate/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className={clsx(
              'relative w-full max-w-lg max-h-[90vh] overflow-auto',
              'focus:outline-none',
              className
            )}
            {...props}
          >
            <Card className="relative shadow-xl">
              {/* Optional close button */}
              <button
                onClick={onClose}
                className={clsx(
                  'absolute right-4 top-4 p-1 rounded-full',
                  'text-gray-500 hover:text-dark-slate',
                  'transition-colors duration-200'
                )}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {children}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
