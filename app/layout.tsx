import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ui/ToastContext';
import ClientCookieConsent from '@/components/ClientCookieConsent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'DigiServicesApp - AI-Powered Freelance Project Management',
  description:
    'Streamline your freelance workflow with AI-powered project management, task prioritization, and client communication tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ToastProvider>
          {children}
          <ClientCookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
