'use client';
import { HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
  FiX,
} from 'react-icons/fi';

interface ToastProps
  extends Omit<HTMLMotionProps<'div'>, keyof HTMLAttributes<HTMLDivElement>> {
  message: string;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

const variants = {
  info: {
    bg: 'bg-electric-blue/10',
    border: 'border-electric-blue/20',
    text: 'text-electric-blue',
    icon: FiInfo,
  },
  success: {
    bg: 'bg-success/10',
    border: 'border-success/20',
    text: 'text-success',
    icon: FiCheckCircle,
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-700',
    icon: FiAlertCircle,
  },
  error: {
    bg: 'bg-error/10',
    border: 'border-error/20',
    text: 'text-error',
    icon: FiXCircle,
  },
};

export default function Toast({
  message,
  title,
  variant = 'info',
  onClose,
  ...props
}: ToastProps) {
  const variantStyles = variants[variant];
  const Icon = variantStyles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={clsx(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border',
        'shadow-lg backdrop-blur-sm',
        variantStyles.bg,
        variantStyles.border
      )}
      {...props}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={clsx('shrink-0', variantStyles.text)}>
            <Icon className="h-5 w-5" />
          </div>

          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className={clsx('text-sm font-medium', variantStyles.text)}>
                {title}
              </p>
            )}
            <p
              className={clsx(
                'mt-1 text-sm',
                title ? 'text-gray-600' : variantStyles.text
              )}
            >
              {message}
            </p>
          </div>

          {onClose && (
            <div className="ml-4 flex shrink-0">
              <button
                onClick={onClose}
                className={clsx(
                  'inline-flex rounded-md p-1',
                  'hover:bg-gray-900/5 focus:outline-none',
                  'transition-colors duration-200',
                  variantStyles.text
                )}
              >
                <span className="sr-only">Close</span>
                <FiX className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
