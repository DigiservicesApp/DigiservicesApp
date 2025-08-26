'use client';

import Link from 'next/link';
import { useClerk, useUser } from '@clerk/clerk-react';
import {
  RiBellLine,
  RiSearchLine,
  RiUserLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import Container from '@/components/ui/Container';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  //
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="h-16 bg-[color:var(--md-sys-color-surface)] border-b border-[color:var(--md-sys-color-outline)] fixed top-0 left-0 right-0 z-30">
      <Container>
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-xl font-bold text-[color:var(--md-sys-color-on-surface)]"
            >
              DigiServicesApp
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--md-sys-color-on-surface-variant)]" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-[color:var(--md-sys-color-outline)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--md-sys-color-primary)] focus:border-transparent bg-[color:var(--md-sys-color-surface)] text-[color:var(--md-sys-color-on-surface)]"
              />
            </div>
            <button className="p-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] rounded-lg relative">
              <RiBellLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-[color:var(--md-sys-color-outline)]">
              <button className="flex items-center gap-2 p-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] rounded-lg">
                <div className="h-8 w-8 rounded-full bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] flex items-center justify-center">
                  <RiUserLine className="h-5 w-5 text-[color:var(--md-sys-color-on-surface-variant)]" />
                </div>
                <span className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                  John Doe
                </span>
              </button>

              <button
                className="p-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] rounded-lg"
                title="Sign out"
              >
                <RiLogoutBoxRLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
