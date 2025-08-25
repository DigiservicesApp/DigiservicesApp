import { ClerkProvider } from '@clerk/nextjs';
import { env } from '@/env';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
}
