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

import DashboardOverview from '@/components/dashboard/DashboardOverview';

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

      <DashboardOverview />
    </div>
  );
}
