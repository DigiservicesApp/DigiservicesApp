'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import Container from '@/components/ui/Container';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[color:var(--md-sys-color-surface)]">
        <DashboardHeader
          onMobileMenuToggle={() => setIsMobileOpen((v) => !v)}
        />

        {/* Sidebar controls are lifted here so main can animate */}
        <DashboardSidebar
          isCollapsed={isCollapsed}
          onToggle={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          onMobileToggle={() => setIsMobileOpen(false)}
        />

        {/* Main content: offset for fixed header (h-16) and sidebar width. Use transition for smooth animation. */}
        <main
          className={`flex-1 pt-20 transition-[margin-left] duration-300 ease-in-out bg-[color:var(--md-sys-color-surface)]`}
          // left margin depends on sidebar state: collapsed = 4rem (16), expanded = 16rem (64)
          style={{ marginLeft: isCollapsed ? 64 : 256 }}
        >
          <Container size="full">{children}</Container>
        </main>
      </div>
    </ProtectedRoute>
  );
}
