'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

type Props = {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // prefix param with underscore to silence unused-var lint
  onAdjust?: (delta: number) => void;
};

export default function TaskDonut({
  completed,
  total,
  size = 120,
  strokeWidth = 12,
  loading = false,
  onAdjust,
}: Props) {
  const [showPercent, setShowPercent] = React.useState(true);
  const handleToggle = () => setShowPercent((s) => !s);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? Math.min(1, completed / total) : 0;

  const progress = useMotionValue(pct);
  React.useEffect(() => {
    const controls = animate(progress, pct, { duration: 0.6 });
    return () => controls.stop();
  }, [pct]);

  const dash = useTransform(progress, (v) => v * circumference);

  if (loading) {
    return (
      <div className="h-20 w-20 rounded bg-[color:var(--md-sys-color-surface-variant)]" />
    );
  }

  return (
    <div
      className="inline-flex flex-col items-center"
      role="group"
      tabIndex={0}
      onKeyDown={(e) => {
        if (!onAdjust) return;
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') onAdjust(1);
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') onAdjust(-1);
        if (e.key === 'Enter') handleToggle();
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        onClick={handleToggle}
      >
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle
            r={radius}
            fill="none"
            stroke="var(--md-sys-color-surface-variant)"
            strokeWidth={strokeWidth}
          />

          <motion.circle
            r={radius}
            fill="none"
            stroke="var(--md-sys-color-primary)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform="rotate(-90)"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset: useTransform(
                dash,
                (d) => `${circumference - d}`
              ),
            }}
          />

          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-sm font-semibold text-[color:var(--md-sys-color-on-surface)]"
          >
            {showPercent
              ? `${Math.round(pct * 100)}%`
              : `${completed}/${total}`}
          </text>
        </g>
      </svg>

      {onAdjust && (
        <div className="mt-3 flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAdjust(-1)}
            aria-label="decrease completed"
            className="rounded border px-2 py-1 text-sm"
          >
            -
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAdjust(1)}
            aria-label="increase completed"
            className="rounded bg-[color:var(--md-sys-color-primary)] px-3 py-1 text-sm text-white"
          >
            +
          </motion.button>
        </div>
      )}
    </div>
  );
}
