'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner({
  className = '',
  size = 40,
  color = 'primary',
}: {
  className?: string;
  size?: number;
  color?: 'primary' | 'white';
}) {
  const colors = {
    primary: 'var(--md-sys-color-primary)',
    white: 'var(--md-sys-color-on-surface)',
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-t-transparent"
        style={{
          borderColor: `${colors[color]}33`,
          borderTopColor: 'transparent',
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-t-transparent"
        style={{ borderColor: colors[color], borderTopColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[color:var(--md-sys-color-surface)]">
      <div className="text-center">
        <LoadingSpinner size={48} />
        <p className="mt-4 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
          Loading...
        </p>
      </div>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--md-sys-color-surface)]/80 backdrop-blur-sm">
      <LoadingSpinner size={40} />
    </div>
  );
}
