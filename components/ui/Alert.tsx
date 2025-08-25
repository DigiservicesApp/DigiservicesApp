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

interface AlertProps
  extends Omit<HTMLMotionProps<'div'>, keyof HTMLAttributes<HTMLDivElement>> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
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

export default function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  ...props
}: AlertProps) {
  const variantStyles = variants[variant];
  const Icon = variantStyles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={clsx(
        // Base styles
        'relative rounded-lg border p-4',
        'backdrop-blur-sm shadow-sm',

        // Variant styles
        variantStyles.bg,
        variantStyles.border,

        // Custom classes
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={clsx('flex-shrink-0', variantStyles.text)}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h3 className={clsx('mb-1 font-medium', variantStyles.text)}>
              {title}
            </h3>
          )}
          <div
            className={clsx(
              'text-sm',
              title ? 'text-gray-600' : variantStyles.text
            )}
          >
            {children}
          </div>
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className={clsx(
              'flex-shrink-0 rounded-full p-1',
              'hover:bg-gray-900/5 transition-colors duration-200',
              variantStyles.text
            )}
          >
            <FiX className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
