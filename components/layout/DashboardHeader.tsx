'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  RiBellLine,
  RiSearchLine,
  RiUserLine,
  RiMenuLine,
  RiSunLine,
  RiMoonLine,
  RiSettings4Line,
} from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import Logo from './Logo';
import Container from '@/components/ui/Container';

export default function DashboardHeader({
  onMobileMenuToggle,
}: {
  onMobileMenuToggle?: () => void;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light')
        return saved as 'light' | 'dark';
    } catch (e) {
      /* ignore */
    }
    return 'light';
  });

  // sample notifications
  const [notifications, setNotifications] = useState(
    () =>
      [
        {
          id: 1,
          title: 'New comment on task',
          time: new Date(Date.now() - 1000 * 60 * 8),
          unread: true,
        },
        {
          id: 2,
          title: 'Project “Apollo” updated',
          time: new Date(Date.now() - 1000 * 60 * 60 * 6),
          unread: true,
        },
        {
          id: 3,
          title: 'New teammate joined',
          time: new Date(Date.now() - 1000 * 60 * 60 * 24),
          unread: false,
        },
      ] as { id: number; title: string; time: Date; unread: boolean }[]
  );

  useEffect(() => {
    // apply theme to document
    try {
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* ignore */
    }
  }, [theme]);

  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    router.push('/');
  };

  const formatTimeAgo = (d: Date) => {
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
  };

  const markAllRead = () => {
    setNotifications((s) => s.map((n) => ({ ...n, unread: false })));
  };

  const dismiss = (id: number) => {
    setNotifications((s) => s.filter((n) => n.id !== id));
  };

  return (
    <header className="h-16 bg-[color:var(--md-sys-color-surface)] border-b border-[color:var(--md-sys-color-outline)] fixed top-0 left-0 right-0 z-30 transition-colors duration-300">
      <Container size="full">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile menu toggle: visible on small screens */}
            <button
              onClick={() => onMobileMenuToggle && onMobileMenuToggle()}
              className="p-2 mr-2 md:hidden rounded-lg hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]"
              aria-label="Toggle menu"
            >
              <RiMenuLine className="w-6 h-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
            </button>

            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[color:var(--md-sys-color-on-surface-variant)]" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-[color:var(--md-sys-color-outline)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--md-sys-color-primary)] focus:border-transparent bg-[color:var(--md-sys-color-surface)] text-[color:var(--md-sys-color-on-surface)] transition-colors duration-300"
              />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((s) => !s)}
                className="p-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] rounded-lg relative"
                aria-expanded={notifOpen}
                aria-haspopup="true"
                aria-label="Notifications"
              >
                <RiBellLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[color:var(--md-sys-color-surface)] border border-[color:var(--md-sys-color-outline)] rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[color:var(--md-sys-color-outline)]">
                    <strong className="text-sm">Notifications</strong>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]"
                        onClick={markAllRead}
                      >
                        Mark all
                      </button>
                      <button
                        className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]"
                        onClick={() => setNotifOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <ul className="max-h-64 overflow-auto">
                    {notifications.length === 0 && (
                      <li className="p-3 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                        No notifications
                      </li>
                    )}
                    {notifications.map((n) => (
                      <li
                        key={n.id}
                        className={`px-3 py-2 flex items-start justify-between ${
                          n.unread
                            ? 'bg-[color:color-mix(in srgb,var(--md-sys-color-primary)8%,var(--md-sys-color-surface))]'
                            : ''
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium">{n.title}</div>
                          <div className="text-xs text-[color:var(--md-sys-color-on-surface-variant)] mt-1">
                            {formatTimeAgo(n.time)} ago
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            className="text-xs text-[color:var(--md-sys-color-primary)]"
                            onClick={() =>
                              setNotifications((s) =>
                                s.map((x) =>
                                  x.id === n.id ? { ...x, unread: false } : x
                                )
                              )
                            }
                          >
                            Mark
                          </button>
                          <button
                            className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]"
                            onClick={() => dismiss(n.id)}
                          >
                            Dismiss
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              title="Toggle theme"
              className="p-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] rounded-lg"
            >
              {theme === 'dark' ? (
                <RiSunLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
              ) : (
                <RiMoonLine className="h-6 w-6 text-[color:var(--md-sys-color-on-surface-variant)]" />
              )}
            </button>

            {/* Profile + menu */}
            <div
              className="flex items-center gap-2 pl-4 border-l border-[color:var(--md-sys-color-outline)]"
              ref={profileRef}
            >
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 p-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)] rounded-lg"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] flex items-center justify-center">
                    <RiUserLine className="h-5 w-5 text-[color:var(--md-sys-color-on-surface-variant)]" />
                  </div>
                )}
                <span className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                  {user?.email || 'Guest'}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-4 top-16 mt-2 w-48 bg-[color:var(--md-sys-color-surface)] border border-[color:var(--md-sys-color-outline)] rounded-lg shadow-lg z-50 overflow-hidden">
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]"
                    onClick={() => {
                      setProfileOpen(false);
                      router.push('/dashboard/settings');
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <RiSettings4Line className="h-4 w-4" />
                      <span className="text-sm">Settings</span>
                    </div>
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]"
                    onClick={() => {
                      setProfileOpen(false);
                      router.push('/dashboard');
                    }}
                  >
                    Profile
                  </button>
                  <div className="border-t border-[color:var(--md-sys-color-outline)]" />
                  <button
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]"
                    onClick={() => {
                      setProfileOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
