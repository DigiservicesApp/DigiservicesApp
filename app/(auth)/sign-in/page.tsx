'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/layout/Logo';
import { companyInfo } from '@/lib/data/site-config';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Divider from '@/components/ui/Divider';
import { RiGoogleLine } from 'react-icons/ri';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in.');
      console.error('Error signing in:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setError(null);
    try {
      await supabase.auth.signInWithOAuth({ provider: provider as any });
      // OAuth will redirect the user — no further handling here.
    } catch (err: any) {
      setError(err?.message || 'Social sign-in failed.');
      console.error('OAuth error:', err);
    }
  };

  return (
    <Container className="flex-1 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <Logo />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:flex flex-col justify-center p-6 rounded-xl bg-[color:var(--md-sys-color-surface-variant)]">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
              Sign in to continue — secure access to your projects, teams, and
              analytics.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-sm bg-[color:var(--md-sys-color-surface)]">
            <h1 className="text-2xl font-extrabold mb-4">
              Sign in to your account
            </h1>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outlined"
                onClick={() => handleOAuthSignIn('google')}
                className="flex-1"
              >
                <RiGoogleLine className="mr-2 h-5 w-5" /> Sign in with Google
              </Button>
            </div>

            <div className="my-4">
              <Divider label="Or continue with" />
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              {error && <div className="text-sm text-red-600">{error}</div>}

              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between">
                {/* <Link
                  href="/forgot-password"
                  className="text-sm hover:underline"
                >
                  Forgot password?
                </Link>
                <Link href="/sign-up" className="text-sm hover:underline">
                  Don&apos;t have an account?
                </Link> */}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 mx-auto mt-8">
        <div className="max-w-2xl mx-auto text-center text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
          <p className="mt-2">
            &copy; {new Date().getFullYear()} {companyInfo.name}
          </p>
        </div>
      </footer>
    </Container>
  );
}
