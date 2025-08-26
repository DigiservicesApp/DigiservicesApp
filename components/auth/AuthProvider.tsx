'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = { id: string; name: string } | null;

const AuthContext = createContext<{
  user: User;
  signIn: (name: string) => void;
  signOut: () => void;
}>({ user: null, signIn: () => {}, signOut: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem('ds_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('ds_user', JSON.stringify(user));
      else localStorage.removeItem('ds_user');
    } catch {
      // ignore
    }
  }, [user]);

  const signIn = (name: string) => setUser({ id: String(Date.now()), name });
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
