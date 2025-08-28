'use client';

import React, { useMemo } from 'react';

export default function RandomSparkline({
  points,
  width = 100,
  height = 32,
}: {
  points?: number[];
  width?: number;
  height?: number;
}) {
  const generated = useMemo(() => {
    if (points && points.length) return points;
    const len = 8 + Math.floor(Math.random() * 8);
    return Array.from({ length: len }).map(() =>
      Math.floor(Math.random() * 100)
    );
  }, [points]);

  const path = useMemo(() => {
    if (!generated.length) return '';
    const max = Math.max(...generated);
    const min = Math.min(...generated);
    const range = max - min || 1;
    const step = 100 / (generated.length - 1 || 1);
    return generated
      .map(
        (p, i) =>
          `${i === 0 ? 'M' : 'L'} ${i * step} ${
            100 - ((p - min) / range) * 100
          }`
      )
      .join(' ');
  }, [generated]);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke="var(--md-sys-color-primary)"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
