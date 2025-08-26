'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(name || 'New User');
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--md-sys-color-surface)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <form
          onSubmit={submit}
          className="space-y-6 bg-[color:var(--md-sys-color-surface)] p-6 rounded shadow"
        >
          <h2 className="text-lg font-medium">Sign up</h2>
          <div>
            <label className="block text-sm">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <button className="w-full rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
