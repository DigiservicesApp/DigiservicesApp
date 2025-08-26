'use client';

import Container from '@/components/ui/Container';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { withAuth } from '@/lib/auth';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--md-sys-color-surface)]">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 py-8">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
