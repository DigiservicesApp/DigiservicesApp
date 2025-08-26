'use client';
import { TOCItem } from '@/lib/utils/blog';

export function TableOfContents({ items }: { items: TOCItem[] }) {
  return (
    <nav className="hidden lg:block sticky top-8 w-64 ml-8 space-y-2">
      <h2 className="font-semibold text-[color:var(--md-sys-color-on-surface)] mb-4">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)]"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
