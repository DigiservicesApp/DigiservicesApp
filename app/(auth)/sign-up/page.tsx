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

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Error signing up');
      console.error('Error signing up:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: string) => {
    setError(null);
    try {
      await supabase.auth.signInWithOAuth({ provider: provider as any });
    } catch (err: any) {
      setError(err?.message || 'Social sign-up failed.');
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
          <div className="p-6 rounded-xl bg-[color:var(--md-sys-color-surface-variant)]">
            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
            <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
              Start your free trial and unlock team collaboration features.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-sm bg-[color:var(--md-sys-color-surface)]">
            <h1 className="text-2xl font-extrabold mb-4">Sign up</h1>

            <div className="flex gap-3 mb-4">
              <Button
                variant="outlined"
                onClick={() => handleOAuthSignUp('google')}
                className="flex-1"
              >
                <RiGoogleLine className="mr-2 h-5 w-5" /> Continue with Google
              </Button>
            </div>

            <div className="my-4">
              <Divider label="Or sign up with email" />
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
              </Button>

              <div className="text-sm text-center">
                Already have an account?{' '}
                <Link href="/sign-in" className="font-medium hover:underline">
                  Sign in
                </Link>
              </div>
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
