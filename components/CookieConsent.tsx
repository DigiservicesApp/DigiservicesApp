import { useState, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 p-4">
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking "Accept",
            you consent to our use of cookies. Read our{' '}
            <a
              href="/privacy-policy"
              className="text-primary hover:text-primary-dark underline"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="/terms"
              className="text-primary hover:text-primary-dark underline"
            >
              Terms of Service
            </a>{' '}
            to learn more.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={acceptCookies}
            className="rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
          >
            Accept All Cookies
          </button>
          <button
            onClick={acceptCookies}
            className="rounded-md border border-gray-300 px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Accept Necessary Only
          </button>
          <button
            onClick={acceptCookies}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close cookie consent"
          >
            <RiCloseLine className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
