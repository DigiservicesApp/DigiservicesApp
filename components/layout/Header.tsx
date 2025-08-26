'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RiMenuLine } from 'react-icons/ri';
import { useState } from 'react';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="site-header fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-[color:var(--md-sys-color-outline)] bg-[color:var(--md-sys-color-surface)]"
      aria-label="Main header"
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-[color:var(--md-sys-color-primary)]"
          >
            DigiServicesApp
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Primary navigation"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-4 py-2 text-sm rounded-lg transition-colors ${
                  pathname === item.href ? 'nav-active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outlined">Sign In</Button>
            <Button variant="filled">Start Free</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-lg hover:bg-[color:color-mix(in srgb,var(--md-sys-color-on-surface) 6%, transparent)]"
          >
            <RiMenuLine className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[color:var(--md-sys-color-outline)]">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === item.href ? 'nav-active' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 mt-4 px-4">
              <Button variant="outlined" className="w-full">
                Sign In
              </Button>
              <Button variant="filled" className="w-full">
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
