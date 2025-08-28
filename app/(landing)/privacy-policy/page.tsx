import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { companyInfo } from '@/lib/data/site-config';

export const metadata: Metadata = {
  title: `Privacy Policy - ${companyInfo.name}`,
  description:
    'Our privacy policy explains how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="prose prose-lg max-w-none">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: August 28, 2025</p>

          <h2>1. Introduction and Your Rights at a Glance</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="font-semibold mb-4">Key Points:</p>
            <ul className="space-y-2">
              <li>
                We collect only data that&apos;s necessary for service delivery
              </li>
              <li>Your data is never sold to third parties</li>
              <li>You can request deletion of your data at any time</li>
              <li>We use industry-standard security measures</li>
              <li>
                You control your privacy settings and marketing preferences
              </li>
            </ul>
          </div>

          <p>
            DigiServicesApp (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            is committed to protecting your privacy and ensuring you have a
            positive experience on our website and in using our services. This
            policy outlines our data collection and use practices.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information You Provide</h3>
          <div className="ml-6">
            <h4>Account Information:</h4>
            <ul>
              <li>Full name and email address</li>
              <li>Username and password</li>
              <li>Profile picture (optional)</li>
              <li>Company name and job title (optional)</li>
            </ul>

            <h4>Payment Information:</h4>
            <ul>
              <li>
                Credit card or payment method details (processed securely
                through our payment processors)
              </li>
              <li>Billing address</li>
              <li>Transaction history</li>
            </ul>

            <h4>Communication Data:</h4>
            <ul>
              <li>Support tickets and correspondence</li>
              <li>Survey responses</li>
              <li>Product feedback</li>
            </ul>
          </div>

          <h3>2.2 Information Automatically Collected</h3>
          <div className="ml-6">
            <h4>Device and Usage Data:</h4>
            <ul>
              <li>IP address and location data</li>
              <li>Device identifiers and hardware information</li>
              <li>Browser type and settings</li>
              <li>Operating system information</li>
              <li>Log data and crash analytics</li>
            </ul>

            <h4>Usage Analytics:</h4>
            <ul>
              <li>Pages visited and features used</li>
              <li>Time spent on pages</li>
              <li>Click patterns and interaction data</li>
              <li>Performance metrics</li>
            </ul>
          </div>

          <h2>3. How We Use Your Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3>3.1 Core Service Delivery</h3>
            <ul>
              <li>Creating and maintaining your account</li>
              <li>Processing and fulfilling orders</li>
              <li>Providing customer support</li>
              <li>Sending service notifications</li>
            </ul>

            <h3>3.2 Service Improvement</h3>
            <ul>
              <li>Analyzing usage patterns</li>
              <li>Debugging and fixing issues</li>
              <li>Developing new features</li>
              <li>Conducting research and analytics</li>
            </ul>

            <h3>3.3 Security and Legal Compliance</h3>
            <ul>
              <li>Preventing fraud and abuse</li>
              <li>Verifying identity</li>
              <li>Complying with legal obligations</li>
              <li>Enforcing our terms of service</li>
            </ul>
          </div>

          <h2>4. Legal Basis for Processing (GDPR)</h2>
          <p>We process your personal data under the following legal bases:</p>
          <div className="ml-6">
            <h3>4.1 Contractual Necessity</h3>
            <p>
              Processing necessary to provide our services and fulfill our
              contract with you.
            </p>

            <h3>4.2 Legitimate Interests</h3>
            <p>
              Processing that serves our legitimate business interests while
              respecting your rights.
            </p>

            <h3>4.3 Legal Obligation</h3>
            <p>
              Processing required to comply with applicable laws and
              regulations.
            </p>

            <h3>4.4 Consent</h3>
            <p>
              Processing based on your specific consent (e.g., marketing
              communications).
            </p>
          </div>

          <h2>5. Data Retention and Deletion</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3>5.1 Retention Periods</h3>
            <ul>
              <li>Account data: Retained while your account is active</li>
              <li>
                Transaction data: Retained for 7 years (legal requirement)
              </li>
              <li>Usage logs: Retained for 90 days</li>
              <li>Marketing data: Retained until consent withdrawal</li>
            </ul>

            <h3>5.2 Data Deletion</h3>
            <p>You can request deletion of your personal data by:</p>
            <ul>
              <li>Using the account deletion option in settings</li>
              <li>Contacting privacy@digiservicesapp.com</li>
              <li>Submitting a request through our support portal</li>
            </ul>
          </div>

          <h2>6. Your Privacy Rights</h2>
          <div className="ml-6">
            <h3>6.1 GDPR Rights (EU/UK Users)</h3>
            <ul>
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to restrict processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h3>6.2 CCPA Rights (California Residents)</h3>
            <ul>
              <li>Right to know what personal information is collected</li>
              <li>
                Right to know if personal information is sold or disclosed
              </li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access personal information</li>
              <li>Right to equal service and price</li>
            </ul>

            <h3>6.3 Exercise Your Rights</h3>
            <p>To exercise your privacy rights:</p>
            <ul>
              <li>Email: privacy@digiservicesapp.com</li>
              <li>Form: Visit our Privacy Rights Portal</li>
              <li>Mail: 123 Tech Street, Digital City, DC 12345</li>
            </ul>
          </div>

          <h2>7. Data Security</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3>7.1 Security Measures</h3>
            <ul>
              <li>Encryption in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Monitoring and logging</li>
              <li>Employee training and policies</li>
            </ul>

            <h3>7.2 Data Breach Procedures</h3>
            <p>In the event of a data breach, we will:</p>
            <ul>
              <li>Notify affected users within 72 hours</li>
              <li>Provide details about the breach and data affected</li>
              <li>Take immediate steps to secure systems</li>
              <li>Work with authorities as required</li>
            </ul>
          </div>

          <h2>8. International Data Transfers</h2>
          <p>
            We may transfer your data to servers and service providers located
            outside your country. We ensure appropriate safeguards through:
          </p>
          <ul>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Privacy Shield certification (where applicable)</li>
            <li>Data Processing Agreements</li>
            <li>Adequacy decisions by relevant authorities</li>
          </ul>

          <h2>9. Children&apos;s Privacy</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p>
              Our services are not directed to children under 13 (16 in the EU).
              We do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </div>

          <h2>10. Third-Party Services and Links</h2>
          <p>Our service integrates with third-party services including:</p>
          <ul>
            <li>Payment processors (Stripe)</li>
            <li>Analytics providers (Google Analytics)</li>
            <li>Cloud service providers (AWS, Azure)</li>
            <li>Authentication services</li>
          </ul>
          <p>
            Each third-party service has its own privacy policy and data
            handling practices. We recommend reviewing their privacy policies.
          </p>

          <h2>11. Changes to This Policy</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p>
              We may update this policy to reflect changes in our practices or
              legal requirements. We will notify you of material changes
              through:
            </p>
            <ul>
              <li>Email notification (for registered users)</li>
              <li>Website notice</li>
              <li>Application notification</li>
            </ul>
            <p>
              Continued use of our services after changes constitutes acceptance
              of the updated policy.
            </p>
          </div>

          <h2>12. Contact Information</h2>
          <div className="contact-info">
            <p>For privacy-related inquiries:</p>
            <div className="space-y-6">
              <div>
                <p>
                  <strong>Data Protection Officer</strong>
                  <br />
                  {companyInfo.name}
                  <br />
                  {companyInfo.address.street}
                  <br />
                  {companyInfo.address.city}, {companyInfo.address.state}{' '}
                  {companyInfo.address.zip}
                  <br />
                  {companyInfo.address.country}
                  <br />
                  Email: {companyInfo.contact.support}
                  <br />
                  Phone: {companyInfo.contact.phone}
                </p>
              </div>

              <p>
                <strong>EU Representative (Article 27 GDPR):</strong>
                <br />
                DigiServices EU Ltd.
                <br />
                1 Digital Square
                <br />
                Dublin, Ireland
                <br />
                Email: eu-privacy@digiservicesapp.com
              </p>

              <p>
                <strong>UK Representative:</strong>
                <br />
                DigiServices UK Ltd.
                <br />
                100 Tech Lane
                <br />
                London, UK
                <br />
                Email: uk-privacy@digiservicesapp.com
              </p>
            </div>

            <div className="mt-8 p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                This privacy policy was last updated on August 28, 2025.
                Previous versions can be obtained by contacting us.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
