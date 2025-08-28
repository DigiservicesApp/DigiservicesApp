import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TawkChat from '@/components/ui/TawkChat';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">{children}</main>
      <TawkChat />
      <Footer />
    </>
  );
}
