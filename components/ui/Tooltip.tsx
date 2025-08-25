'use client';
import { HTMLAttributes, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 0.2,
  className,
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Position variants for the tooltip
  const positionStyles = {
    top: '-10px translate-y-[-100%]',
    bottom: '10px translate-y-[100%]',
    left: '-10px -translate-x-[100%] translate-y-[-50%]',
    right: '10px translate-x-[100%] translate-y-[-50%]',
  };

  const positionClasses = {
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2',
    right: 'right-0 top-1/2',
  };

  // Animation variants
  const tooltipVariants = {
    initial: {
      opacity: 0,
      y: position === 'bottom' ? -5 : position === 'top' ? 5 : 0,
      x: position === 'left' ? 5 : position === 'right' ? -5 : 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: position === 'bottom' ? -5 : position === 'top' ? 5 : 0,
      x: position === 'left' ? 5 : position === 'right' ? -5 : 0,
      scale: 0.95,
    },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={clsx(
              'absolute z-50 px-2 py-1 text-sm whitespace-nowrap',
              'rounded-lg bg-dark-slate/90 text-white',
              'pointer-events-none backdrop-blur-sm',
              positionClasses[position],
              className
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tooltipVariants}
            transition={{
              duration: 0.15,
              delay: isVisible ? delay : 0,
            }}
          >
            {content}

            {/* Tooltip arrow */}
            <div
              className={clsx('absolute w-2 h-2 bg-dark-slate/90 rotate-45', {
                'top-[100%] left-1/2 -translate-x-1/2 -mt-1':
                  position === 'top',
                'bottom-[100%] left-1/2 -translate-x-1/2 -mb-1':
                  position === 'bottom',
                'left-[100%] top-1/2 -translate-y-1/2 -ml-1':
                  position === 'left',
                'right-[100%] top-1/2 -translate-y-1/2 -mr-1':
                  position === 'right',
              })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
