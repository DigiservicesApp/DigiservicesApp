import { Metadata } from 'next';
import {
  RiTaskLine,
  RiTeamLine,
  RiTimeLine,
  RiPieChartLine,
} from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Dashboard - DigiServicesApp',
  description: 'View and manage your projects, tasks, and team members.',
};

const stats = [
  {
    name: 'Active Tasks',
    value: '12',
    icon: RiTaskLine,
    change: '+2',
    changeType: 'increase',
  },
  {
    name: 'Team Members',
    value: '4',
    icon: RiTeamLine,
    change: '0',
    changeType: 'neutral',
  },
  {
    name: 'Hours Tracked',
    value: '164',
    icon: RiTimeLine,
    change: '+23',
    changeType: 'increase',
  },
  {
    name: 'Project Progress',
    value: '78%',
    icon: RiPieChartLine,
    change: '+5%',
    changeType: 'increase',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
          Welcome back! Here is an overview of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-[color:var(--md-sys-color-surface)] px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="shrink-0">
                <stat.icon
                  className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-[color:var(--md-sys-color-on-surface-variant)]">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
                        {stat.value}
                      </p>
                      <p
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase'
                            ? 'text-green-600'
                            : stat.changeType === 'decrease'
                            ? 'text-red-600'
                            : 'text-[color:var(--md-sys-color-on-surface-variant)]'
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Placeholder for charts and widgets */}
        <div className="min-h-[400px] rounded-lg bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Recent Activity
          </h2>
          <p className="mt-4 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Activity chart will be displayed here
          </p>
        </div>
        <div className="min-h-[400px] rounded-lg bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Task Distribution
          </h2>
          <p className="mt-4 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Task distribution chart will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
