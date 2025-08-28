'use client';

import React from 'react';

type Project = {
  id: string;
  name: string;
  progress: number; // 0-100
  members?: number;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
        Projects
      </h3>
      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className="rounded-lg border border-[color:var(--md-sys-color-outline)] p-3 bg-[color:var(--md-sys-color-surface)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                  {p.name}
                </p>
                <p className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
                  {p.members ?? 0} members
                </p>
              </div>
              <div className="text-sm font-semibold text-[color:var(--md-sys-color-on-surface)]">
                {p.progress}%
              </div>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-[color:var(--md-sys-color-surface-variant)] overflow-hidden">
              <div
                style={{ width: `${p.progress}%` }}
                className="h-full bg-[color:var(--md-sys-color-primary)] transition-all duration-300"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
