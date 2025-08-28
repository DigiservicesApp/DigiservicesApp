'use client';

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: number[];
  height?: number;
};

export default function ActivityChart({ data, height = 120 }: Props) {
  const labels = useMemo(() => data.map((_, i) => `${i + 1}`), [data]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Activity',
          data,
          fill: true,
          backgroundColor: 'rgba(59,130,246,0.08)',
          borderColor: 'rgba(59,130,246,1)',
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    }),
    [labels, data]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index' as const, intersect: false },
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: { x: { display: false }, y: { display: true } },
      animations: {
        tension: { duration: 500, easing: 'easeOutQuart' as const },
        y: { duration: 500, easing: 'easeOutQuart' as const },
      },
    }),
    []
  );

  return (
    <motion.div layout>
      <div style={{ height }}>
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
}
