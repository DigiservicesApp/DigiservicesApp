'use client';

import React from 'react';

type Activity = {
  id: string;
  title: string;
  desc?: string;
  time: string;
};

export default function RecentActivity({ items }: { items: Activity[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
        Recent Activity
      </h3>
      <ul className="divide-y divide-[color:var(--md-sys-color-outline)]">
        {items.map((it) => (
          <li key={it.id} className="flex items-start gap-3 py-3">
            <div className="h-8 w-8 rounded-full bg-[color:var(--md-sys-color-primary)] flex items-center justify-center text-white text-sm">
              {it.title.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                  {it.title}
                </p>
                <p className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
                  {it.time}
                </p>
              </div>
              {it.desc && (
                <p className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  {it.desc}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
