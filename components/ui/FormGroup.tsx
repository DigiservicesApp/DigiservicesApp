import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  layout?: 'vertical' | 'horizontal';
  labelWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const labelWidthClasses = {
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-40',
  xl: 'w-48',
};

export default function FormGroup({
  children,
  label,
  helpText,
  error,
  required,
  optional,
  layout = 'vertical',
  labelWidth = 'md',
  className,
  ...props
}: FormGroupProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={clsx(
        'group relative space-y-1.5',
        isHorizontal && 'sm:space-y-0',
        className
      )}
      {...props}
    >
      {/* Label container */}
      {label && (
        <div
          className={clsx(
            'flex items-start gap-2',
            isHorizontal &&
              `sm:flex-row sm:items-center sm:${labelWidthClasses[labelWidth]}`
          )}
        >
          <label
            className={clsx(
              'block text-sm font-medium text-dark-slate',
              error && 'text-error'
            )}
          >
            {label}
            {required && <span className="ml-1 text-error">*</span>}
            {optional && (
              <span className="ml-1 text-sm font-normal text-gray-500">
                (Optional)
              </span>
            )}
          </label>
        </div>
      )}

      {/* Content container */}
      <div className={clsx('relative', isHorizontal && 'sm:flex-1 sm:pl-4')}>
        {/* Form control */}
        {children}

        {/* Help text or error message */}
        <div className="mt-1.5">
          {error ? (
            <div className="flex items-center gap-1.5 text-error">
              <FiAlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          ) : helpText ? (
            <p className="text-sm text-gray-500">{helpText}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
