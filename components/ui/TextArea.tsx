import { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      showCount,
      className,
      maxLength,
      value = '',
      onChange,
      onInput,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = (node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Auto-resize functionality
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set the height to scrollHeight to fit the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // Adjust height on mount and when content changes
    useEffect(() => {
      adjustHeight();
    }, [value]);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      onInput?.(e);
    };

    const currentLength = value?.toString().length || 0;
    const isActive = value !== '' || props.placeholder;

    return (
      <div className={clsx('relative w-full', className)}>
        {/* Label */}
        {label && (
          <motion.label
            htmlFor={props.id}
            initial={false}
            animate={{
              y: isActive ? -20 : 0,
              scale: isActive ? 0.85 : 1,
              color: error
                ? 'rgb(229, 62, 62)'
                : disabled
                ? 'rgb(156, 163, 175)'
                : 'inherit',
            }}
            className={clsx(
              'absolute left-3 cursor-text',
              'pointer-events-none origin-[0%_50%]',
              'text-gray-500 transition-colors duration-200'
            )}
          >
            {label}
          </motion.label>
        )}

        {/* Textarea */}
        <textarea
          ref={combinedRef}
          value={value}
          onChange={onChange}
          onInput={handleInput}
          disabled={disabled}
          maxLength={maxLength}
          className={clsx(
            // Base styles
            'w-full min-h-[100px] rounded-lg px-3 py-2',
            'border bg-white transition-colors duration-200',
            'resize-none overflow-hidden',
            'placeholder:text-transparent focus:placeholder:text-gray-400',

            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-electric-blue',

            // States
            {
              'border-error': error,
              'border-border-color': !error,
              'opacity-50 cursor-not-allowed bg-gray-50': disabled,
            },

            // Label padding
            label ? 'pt-6' : 'pt-2'
          )}
          {...props}
        />

        {/* Character count and error display */}
        <div className="mt-1 flex justify-between text-sm">
          {error && <p className="text-error">{error}</p>}

          {showCount && maxLength && (
            <p
              className={clsx(
                'ml-auto text-gray-500',
                currentLength >= maxLength && 'text-error'
              )}
            >
              {currentLength} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
