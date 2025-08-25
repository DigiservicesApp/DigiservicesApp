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
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <Container>
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              DigiServicesApp
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <RiBellLine className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <RiUserLine className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  John Doe
                </span>
              </button>

              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Sign out"
              >
                <RiLogoutBoxRLine className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
