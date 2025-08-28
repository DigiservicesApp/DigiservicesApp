import { useState, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { Button } from '@/components/ui/Button';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted =
      typeof window !== 'undefined' && localStorage.getItem('cookieConsent');
    if (!hasAccepted) setIsVisible(true);
  }, []);

  function acceptCookies(mode: 'all' | 'necessary' = 'all') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', mode);
    }
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[color:var(--md-sys-color-surface)] shadow-lg border-t border-[color:var(--md-sys-color-outline)] p-4">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking
            &quot;Accept&quot;, you consent to our use of cookies. Read our{' '}
            <a
              href="/privacy-policy"
              className="text-[color:var(--md-sys-color-primary)] hover:opacity-90 underline"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="/terms"
              className="text-[color:var(--md-sys-color-primary)] hover:opacity-90 underline"
            >
              Terms of Service
            </a>{' '}
            to learn more.
          </p>
        </div>

        <div className="flex items-center gap-4 ">
          <Button
            variant="filled"
            onClick={() => acceptCookies('all')}
            className="px-3.5 py-2 text-sm font-semibold"
          >
            Accept All Cookies
          </Button>

          <Button
            variant="outlined"
            onClick={() => acceptCookies('necessary')}
            className="px-3.5 py-2 text-sm font-semibold"
          >
            Accept Necessary Only
          </Button>

          <Button
            variant="text"
            onClick={() => setIsVisible(false)}
            className="rounded-full p-1"
            aria-label="Close cookie consent"
            size="sm"
          >
            <RiCloseLine className="h-5 w-5 text-[color:var(--md-sys-color-on-surface-variant)]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
