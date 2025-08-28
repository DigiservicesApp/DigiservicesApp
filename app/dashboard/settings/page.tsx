'use client';

import { useState } from 'react';
import { RiSaveLine } from 'react-icons/ri';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSave(e?: React.FormEvent) {
    e?.preventDefault();
    setSaving(true);
    setMessage(null);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setMessage('Settings saved (demo)');
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
          Manage your account and workspace preferences.
        </p>
      </div>

      <form onSubmit={onSave} className="mt-6 space-y-6">
        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Appearance
          </h2>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="theme"
                checked={theme === 'system'}
                onChange={() => setTheme('system')}
              />
              <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                System
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="theme"
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
              />
              <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Light
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="theme"
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
              />
              <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Dark
              </span>
            </label>
          </div>
        </div>

        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Notifications
          </h2>
          <div className="mt-3 space-y-3 text-sm">
            <label className="flex items-center justify-between">
              <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Email notifications
              </span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications((s) => ({ ...s, email: !s.email }))
                }
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                SMS notifications
              </span>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications((s) => ({ ...s, sms: !s.sms }))
                }
              />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white"
          >
            <RiSaveLine /> {saving ? 'Saving…' : 'Save changes'}
          </button>
          {message && (
            <div className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
