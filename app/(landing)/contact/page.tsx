'use client';

import PageLayout from '@/components/layout/PageLayout';
import Container from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { companyInfo } from '@/lib/data/site-config';
import { RiMailLine, RiPhoneLine, RiMapPin2Line } from 'react-icons/ri';
import { useToast } from '@/components/ui/ToastContext';
import { useState, useEffect, useRef, useCallback } from 'react';

function TurnstileWidget({
  sitekey,
  onVerify,
  onError,
  onExpire,
}: {
  sitekey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const configRef = useRef({
    sitekey,
    callback: onVerify,
    'error-callback': onError,
    'expired-callback': onExpire,
  });

  // Update config ref when props change
  useEffect(() => {
    configRef.current = {
      sitekey,
      callback: onVerify,
      'error-callback': onError,
      'expired-callback': onExpire,
    };
  }, [sitekey, onVerify, onError, onExpire]);

  useEffect(() => {
    const renderTurnstile = () => {
      if (!window.turnstile || !ref.current) return;

      // Remove existing widget if it exists
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = window.turnstile.render(
        ref.current,
        configRef.current
      );
    };

    // If turnstile is already loaded
    if (window.turnstile) {
      renderTurnstile();
    } else if (!scriptLoadedRef.current) {
      // Only load the script once
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  return <div ref={ref} />;
}

export default function ContactPage() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    toast.show({
      message: 'Verification failed, please try again',
      variant: 'error',
    });
  }, [toast]);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
    toast.show({
      message: 'Verification expired, please try again',
      variant: 'warning',
    });
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (!turnstileToken) {
      toast.show({
        message: 'Please complete the CAPTCHA verification',
        variant: 'error',
      });
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
      };

      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(
        companyInfo.contact.email
      )}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || 'Failed to send message');
      }

      toast.show({
        message: 'Message sent — we will reply soon.',
        variant: 'success',
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    } catch (err) {
      toast.show({
        message: (err as Error).message || 'Failed to send message',
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout breadcrumb={[{ label: 'Contact Us', href: '/contact' }]}>
      <main className="flex flex-col min-h-screen py-16">
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--md-sys-color-on-surface)] mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-[color:var(--md-sys-color-on-surface-variant)] max-w-2xl mx-auto">
              Have questions about our services? Looking to collaborate? We are
              here to help you succeed.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6">
              <RiMailLine className="w-8 h-8 text-[color:var(--md-sys-color-primary)] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)] mb-4">
                Get in touch via email for any inquiries
              </p>
              <a
                href={`mailto:${companyInfo.contact.email}`}
                className="text-[color:var(--md-sys-color-primary)] hover:underline"
              >
                {companyInfo.contact.email}
              </a>
            </Card>

            <Card className="p-6">
              <RiPhoneLine className="w-8 h-8 text-[color:var(--md-sys-color-primary)] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)] mb-4">
                Speak directly with our team
              </p>
              <p className="text-[color:var(--md-sys-color-primary)]">
                {companyInfo.contact.phone}
              </p>
            </Card>

            <Card className="p-6">
              <RiMapPin2Line className="w-8 h-8 text-[color:var(--md-sys-color-primary)] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)] mb-4">
                Our office location
              </p>
              <address className="text-[color:var(--md-sys-color-on-surface)] not-italic">
                {companyInfo.address.street}
                <br />
                {companyInfo.address.city}, {companyInfo.address.state}{' '}
                {companyInfo.address.zip}
                <br />
                {companyInfo.address.country}
              </address>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <TextArea
                  label="Message"
                  name="message"
                  required
                  placeholder="Tell us how we can help you"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                />

                <div className="mb-4">
                  <TurnstileWidget
                    sitekey={
                      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                      '1x00000000000000000000AA'
                    } // Replace this with your actual site key
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                  />
                </div>

                <Button
                  type="submit"
                  variant="filled"
                  className="w-full md:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div className="bg-[color:var(--md-sys-color-surface-container)] rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">
                    What are your business hours?
                  </h3>
                  <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                    We are available Monday through Friday, 9:00 AM to 6:00 PM
                    EST.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    How quickly can I expect a response?
                  </h3>
                  <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                    We aim to respond to all inquiries within 24 business hours.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Do you offer emergency support?
                  </h3>
                  <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                    Yes, premium support plans include 24/7 emergency
                    assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
