'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import Container from '@/components/ui/Container';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.replace('/sign-in');
  }, [user, router]);

  if (!user) return null;

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
