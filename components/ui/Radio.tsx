import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useRadioGroup } from './RadioGroup';

interface RadioProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'card';
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      description,
      className,
      disabled: localDisabled,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const {
      name,
      value: groupValue,
      onChange,
      disabled: groupDisabled,
    } = useRadioGroup();
    const isDisabled = localDisabled || groupDisabled;
    const isSelected = groupValue === value;

    const handleChange = () => {
      if (!isDisabled) {
        onChange(value);
      }
    };

    return (
      <div
        className={clsx(
          'relative',
          variant === 'card' && [
            'rounded-lg border-2 p-4 transition-colors duration-200',
            isSelected
              ? 'border-electric-blue bg-electric-blue/5'
              : 'border-border-color',
            !isDisabled && 'cursor-pointer hover:border-electric-blue/50',
            isDisabled && 'opacity-50 cursor-not-allowed',
          ],
          className
        )}
        onClick={handleChange}
      >
        <div
          className={clsx(
            'flex',
            variant === 'default' ? 'items-center' : 'items-start'
          )}
        >
          <div className="relative flex items-center h-5">
            <input
              type="radio"
              ref={ref}
              name={name}
              value={value}
              checked={isSelected}
              disabled={isDisabled}
              onChange={handleChange}
              className="sr-only"
              {...props}
            />

            {/* Custom radio button */}
            <div
              className={clsx(
                'relative w-5 h-5 rounded-full border-2 transition-colors duration-200',
                'flex items-center justify-center',
                {
                  'border-electric-blue': isSelected && !isDisabled,
                  'border-border-color': !isSelected && !isDisabled,
                  'border-gray-300 opacity-50': isDisabled,
                }
              )}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isSelected ? 1 : 0,
                  opacity: isSelected ? 1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
                className="w-2.5 h-2.5 rounded-full bg-electric-blue"
              />
            </div>
          </div>

          <div className={clsx('ml-3 select-none', isDisabled && 'opacity-50')}>
            <label
              className={clsx(
                'text-sm font-medium text-dark-slate',
                !isDisabled && 'cursor-pointer'
              )}
            >
              {label}
            </label>

            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
