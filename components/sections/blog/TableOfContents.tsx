import { TOCItem } from '@/lib/utils/blog';

export function TableOfContents({ items }: { items: TOCItem[] }) {
  return (
    <nav className="hidden lg:block sticky top-8 w-64 ml-8 space-y-2">
      <h2 className="font-semibold text-gray-900 mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
