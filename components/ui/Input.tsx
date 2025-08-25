'use client';
import { InputHTMLAttributes, forwardRef } from 'react';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  icon?: IconType;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className, ...props }, ref) => {
    const inputId = props.id || props.name;
    const isActive = props.value !== '' || props.placeholder;

    return (
      <div className={clsx('relative w-full', className)}>
        {/* Label */}
        <motion.label
          htmlFor={inputId}
          initial={false}
          animate={{
            y: isActive ? -20 : 0,
            scale: isActive ? 0.85 : 1,
            color: error
              ? 'rgb(229, 62, 62)'
              : props.disabled
              ? 'rgb(156, 163, 175)'
              : 'inherit',
          }}
          className={clsx(
            'absolute left-3 cursor-text origin-[0%_50%]',
            'pointer-events-none text-gray-500 transition-colors duration-200'
          )}
        >
          {label}
        </motion.label>

        {/* Input Container */}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Icon size={18} />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            {...props}
            className={clsx(
              // Base styles
              'w-full rounded-lg border bg-white px-3 py-2 outline-none',
              'transition-all duration-200 placeholder:text-transparent',

              // Icon padding
              Icon && 'pl-10',

              // States
              'focus:border-electric-blue focus:ring-1 focus:ring-electric-blue',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',

              // Error state
              error ? 'border-error' : 'border-border-color'
            )}
          />
        </div>

        {/* Error Message */}
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
