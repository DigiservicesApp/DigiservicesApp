import { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy - DigiServicesApp',
  description:
    'Our privacy policy explains how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="prose prose-lg max-w-none">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: August 25, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            DigiServicesApp (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            respects your privacy and is committed to protecting your personal
            data. This privacy policy explains how we collect, use, and
            safeguard your information when you use our website and services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Usage data and preferences</li>
            <li>Communication history</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>
            We automatically collect certain information when you visit our
            website, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage patterns and preferences</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>Providing and improving our services</li>
            <li>Processing payments and transactions</li>
            <li>Communicating with you about our services</li>
            <li>Personalizing your experience</li>
            <li>Analyzing usage patterns and trends</li>
            <li>Ensuring security and preventing fraud</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information. However, no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to improve your
            browsing experience and analyze website traffic. You can control
            cookie preferences through your browser settings.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            We may use third-party services for analytics, payment processing,
            and other functions. These services have their own privacy policies
            and may collect information as governed by their respective
            policies.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &quot;Last updated&quot; date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at:
          </p>
          <p>
            Email: privacy@digiservicesapp.com
            <br />
            Address: 123 Tech Street, Digital City, DC 12345
          </p>
        </div>
      </Container>
    </div>
  );
}
