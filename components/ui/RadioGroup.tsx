'use client';
import { createContext, useContext, ReactNode } from 'react';
import { clsx } from 'clsx';

interface RadioGroupContextType {
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined
);

interface RadioGroupProps extends RadioGroupContextType {
  children: ReactNode;
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  error?: string;
}

export function RadioGroup({
  children,
  name,
  value,
  onChange,
  disabled,
  label,
  orientation = 'vertical',
  error,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
      <div
        role="radiogroup"
        aria-label={label}
        className={clsx('flex flex-col gap-1', className)}
      >
        {label && (
          <label className="block mb-2 text-sm font-medium text-dark-slate">
            {label}
          </label>
        )}

        <div
          className={clsx(
            'flex gap-4',
            orientation === 'vertical' ? 'flex-col' : 'flex-row items-center'
          )}
        >
          {children}
        </div>

        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    </RadioGroupContext.Provider>
  );
}

// Hook for Radio components to access the RadioGroup context
export function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio component must be used within a RadioGroup');
  }
  return context;
}
