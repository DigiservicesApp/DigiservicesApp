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
      } flex flex-col fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300`}
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
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 flex-shrink-0 border-t border-gray-200 px-2 pt-4 space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-6 w-6`}
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
        className="flex items-center justify-center h-12 w-full border-t border-gray-200 hover:bg-gray-50"
      >
        {isCollapsed ? (
          <RiMenuUnfoldLine className="h-6 w-6 text-gray-400" />
        ) : (
          <RiMenuFoldLine className="h-6 w-6 text-gray-400" />
        )}
      </button>
    </div>
  );
}
