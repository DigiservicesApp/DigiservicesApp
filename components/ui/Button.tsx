import { ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps
  extends Omit<
    HTMLMotionProps<'button'>,
    keyof ButtonHTMLAttributes<HTMLButtonElement>
  > {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={clsx(
        // Base styles
        'rounded-lg font-medium transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Size variations
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },

        // Variant styles
        {
          // Primary
          'bg-electric-blue text-white hover:bg-electric-blue-hover':
            variant === 'primary',

          // Secondary
          'border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/5':
            variant === 'secondary',

          // Ghost
          'text-dark-slate hover:bg-dark-slate/5': variant === 'ghost',
        },

        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
