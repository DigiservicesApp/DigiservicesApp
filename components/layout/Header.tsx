'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { RiMenuLine } from 'react-icons/ri';
import { useState } from 'react';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-700">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary">
            DigiServicesApp
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="secondary">Sign In</Button>
            <Button variant="primary">Start Free</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RiMenuLine className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 mt-4 px-4">
              <Button variant="secondary" className="w-full">
                Sign In
              </Button>
              <Button variant="primary" className="w-full">
                Start Free
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
