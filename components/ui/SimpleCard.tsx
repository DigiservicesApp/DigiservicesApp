'use client';

import React from 'react';

export default function SimpleCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg bg-[color:var(--md-sys-color-surface)] p-4 shadow-sm transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
