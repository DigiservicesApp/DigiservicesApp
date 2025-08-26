import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiHomeLine,
  RiTaskLine,
  RiCalendarLine,
  RiTeamLine,
  RiFileListLine,
  RiSettings4Line,
  RiCustomerService2Line,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: RiHomeLine },
  { name: 'Tasks', href: '/dashboard/tasks', icon: RiTaskLine },
  { name: 'Calendar', href: '/dashboard/calendar', icon: RiCalendarLine },
  { name: 'Team', href: '/dashboard/team', icon: RiTeamLine },
  { name: 'Projects', href: '/dashboard/projects', icon: RiFileListLine },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: RiSettings4Line },
  { name: 'Support', href: '/dashboard/support', icon: RiCustomerService2Line },
];

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col fixed left-0 top-16 bottom-0 bg-[color:var(--md-sys-color-surface)] border-r border-[color:var(--md-sys-color-outline)] transition-all duration-300`}
    >
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-[color:color-mix(in srgb,var(--md-sys-color-primary)10%,var(--md-sys-color-surface))] text-[color:var(--md-sys-color-on-surface)]'
                    : 'text-[color:var(--md-sys-color-on-surface-variant)] hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] hover:text-[color:var(--md-sys-color-on-surface)]'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? 'text-[color:var(--md-sys-color-on-surface-variant)]'
                      : 'text-[color:var(--md-sys-color-on-surface-variant)] group-hover:text-[color:var(--md-sys-color-on-surface)]'
                  } mr-3 shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 shrink-0 border-t border-[color:var(--md-sys-color-outline)] px-2 pt-4 space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-[color:color-mix(in srgb,var(--md-sys-color-primary)10%,var(--md-sys-color-surface))] text-[color:var(--md-sys-color-on-surface)]'
                    : 'text-[color:var(--md-sys-color-on-surface-variant)] hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] hover:text-[color:var(--md-sys-color-on-surface)]'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? 'text-[color:var(--md-sys-color-on-surface-variant)]'
                      : 'text-[color:var(--md-sys-color-on-surface-variant)] group-hover:text-[color:var(--md-sys-color-on-surface)]'
                  } mr-3 shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center h-12 w-full border-t border-[color:var(--md-sys-color-outline)] hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]"
      >
        {isCollapsed ? (
          <RiMenuUnfoldLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
        ) : (
          <RiMenuFoldLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
        )}
      </button>
    </div>
  );
}
