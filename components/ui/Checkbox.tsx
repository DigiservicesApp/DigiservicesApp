import { InputHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, error, indeterminate = false, className, disabled, ...props },
    ref
  ) => {
    // Checkbox mark animation variants
    const pathVariants = {
      checked: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.2 },
      },
      unchecked: {
        pathLength: 0,
        opacity: 0,
        transition: { duration: 0.2 },
      },
    };

    // Indeterminate mark animation variants
    const indeterminateVariants = {
      checked: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.2 },
      },
      unchecked: {
        scaleX: 0,
        opacity: 0,
        transition: { duration: 0.2 },
      },
    };

    return (
      <div className={clsx('relative flex items-start', className)}>
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              type="checkbox"
              ref={ref}
              disabled={disabled}
              className="sr-only" // Hidden native input
              {...props}
            />
            <motion.div
              className={clsx(
                'w-5 h-5 rounded border-2 transition-colors duration-200',
                'flex items-center justify-center',
                {
                  'border-electric-blue bg-electric-blue':
                    props.checked || indeterminate,
                  'border-border-color bg-white':
                    !props.checked && !indeterminate,
                  'cursor-pointer hover:border-electric-blue': !disabled,
                  'opacity-50 cursor-not-allowed': disabled,
                  'border-error': error,
                }
              )}
              initial={false}
              animate={props.checked || indeterminate ? 'checked' : 'unchecked'}
            >
              {!indeterminate && (
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  initial={false}
                >
                  <motion.path
                    d="M2.5 6L5 8.5L9.5 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                  />
                </motion.svg>
              )}

              {indeterminate && (
                <motion.div
                  className="w-2.5 h-0.5 bg-white rounded-full"
                  variants={indeterminateVariants}
                />
              )}
            </motion.div>
          </div>
        </div>

        {label && (
          <div className="ml-3 text-sm">
            <label
              htmlFor={props.id}
              className={clsx('font-medium select-none', {
                'text-dark-slate': !disabled,
                'text-gray-400': disabled,
                'cursor-pointer': !disabled,
                'cursor-not-allowed': disabled,
              })}
            >
              {label}
            </label>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-error absolute -bottom-5 left-0">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
