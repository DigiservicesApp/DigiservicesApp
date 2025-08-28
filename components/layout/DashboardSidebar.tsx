'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@/components/ui/Tooltip';
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

export default function DashboardSidebar({
  isCollapsed: isCollapsedProp,
  onToggle,
  isMobileOpen,
  onMobileToggle,
}: {
  isCollapsed?: boolean;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isControlled = typeof isCollapsedProp === 'boolean';
  const isCollapsed = isControlled
    ? Boolean(isCollapsedProp)
    : internalCollapsed;
  const setIsCollapsed = (next: boolean) => {
    if (!isControlled) setInternalCollapsed(next);
    if (onToggle) onToggle(next);
  };
  const pathname = usePathname();

  const panelTransform = isMobileOpen
    ? 'translate-x-0'
    : '-translate-x-full md:translate-x-0';
  const widthClass = isCollapsed ? 'w-16' : 'w-64';

  const asideClasses = [
    panelTransform,
    widthClass,
    'fixed',
    'top-16',
    'left-0',
    'bottom-0',
    'z-50',
    'bg-[color:var(--md-sys-color-surface)]',
    'border-r',
    'border-[color:var(--md-sys-color-outline)]',
    'transform-gpu',
    'transition-transform',
    'duration-300',
    'ease-in-out',
  ].join(' ');

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/40"
          onClick={() => onMobileToggle && onMobileToggle()}
        />
      )}

      <aside className={asideClasses}>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const itemClass = isActive
                ? [
                    'group',
                    'flex',
                    'items-center',
                    'px-2',
                    'py-2',
                    'text-sm',
                    'font-medium',
                    'rounded-md',
                    'focus:outline-none',
                    'focus:ring-2',
                    'text-[color:var(--md-sys-color-on-primary)]',
                    'bg-gradient-to-r',
                    'from-[color:var(--md-sys-color-primary-container)]/20',
                    'to-[color:var(--md-sys-color-primary)]/6',
                    'shadow-md',
                  ].join(' ')
                : [
                    'group',
                    'flex',
                    'items-center',
                    'px-2',
                    'py-2',
                    'text-sm',
                    'font-medium',
                    'rounded-md',
                    'focus:outline-none',
                    'focus:ring-2',
                    'text-[color:var(--md-sys-color-on-surface-variant)]',
                    'hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)92%,var(--md-sys-color-on-surface)8%)]',
                    'hover:text-[color:var(--md-sys-color-on-surface)]',
                  ].join(' ');

              const iconClass = isActive
                ? 'mr-3 shrink-0 h-6 w-6 text-[color:var(--md-sys-color-on-primary)]'
                : 'mr-3 shrink-0 h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)] group-hover:text-[color:var(--md-sys-color-on-surface)]';

              return (
                <Link key={item.name} href={item.href} className={itemClass}>
                  <Tooltip
                    content={item.name}
                    placement="right"
                    delayShow={120}
                  >
                    <div className="flex items-center">
                      <item.icon className={iconClass} aria-hidden="true" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                  </Tooltip>
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 shrink-0 border-t border-[color:var(--md-sys-color-outline)] px-2 pt-4 space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              const itemClass = isActive
                ? [
                    'group',
                    'flex',
                    'items-center',
                    'px-2',
                    'py-2',
                    'text-sm',
                    'font-medium',
                    'rounded-md',
                    'focus:outline-none',
                    'focus:ring-2',
                    'text-[color:var(--md-sys-color-on-primary)]',
                    'bg-gradient-to-r',
                    'from-[color:var(--md-sys-color-primary-container)]/20',
                    'to-[color:var(--md-sys-color-primary)]/6',
                    'shadow-md',
                  ].join(' ')
                : [
                    'group',
                    'flex',
                    'items-center',
                    'px-2',
                    'py-2',
                    'text-sm',
                    'font-medium',
                    'rounded-md',
                    'focus:outline-none',
                    'focus:ring-2',
                    'text-[color:var(--md-sys-color-on-surface-variant)]',
                    'hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)92%,var(--md-sys-color-on-surface)8%)]',
                    'hover:text-[color:var(--md-sys-color-on-surface)]',
                  ].join(' ');

              const iconClass = isActive
                ? 'mr-3 shrink-0 h-6 w-6 text-[color:var(--md-sys-color-on-primary)]'
                : 'mr-3 shrink-0 h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)] group-hover:text-[color:var(--md-sys-color-on-surface)]';

              return (
                <Link key={item.name} href={item.href} className={itemClass}>
                  <Tooltip
                    content={item.name}
                    placement="right"
                    delayShow={120}
                  >
                    <div className="flex items-center">
                      <item.icon className={iconClass} aria-hidden="true" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                  </Tooltip>
                </Link>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center h-12 w-full border-t border-[color:var(--md-sys-color-outline)] hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <RiMenuUnfoldLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
          ) : (
            <RiMenuFoldLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
          )}
        </button>
      </aside>
    </>
  );
}
