import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { companyInfo } from '@/lib/data/site-config';

export const metadata: Metadata = {
  title: `Terms of Service - ${companyInfo.name}`,
  description:
    'Our terms of service outline the rules and guidelines for using DigiServicesApp.',
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="prose prose-lg max-w-none">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: August 28, 2025</p>

          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <p className="font-semibold text-yellow-800">IMPORTANT NOTICE:</p>
            <p className="text-yellow-800">
              By using DigiServicesApp, you agree to these terms. They contain
              important information about your legal rights, remedies, and
              obligations. Please read them carefully.
            </p>
          </div>

          <h2>1. Agreement to Terms</h2>
          <div className="ml-6">
            <h3>1.1 Binding Agreement</h3>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally
              binding agreement between you and DigiServicesApp
              (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;) governing your access to and use of our
              software-as-a-service platform, including any associated
              applications, APIs, and services (collectively, the
              &quot;Service&quot;).
            </p>

            <h3>1.2 Eligibility</h3>
            <p>By using the Service, you represent and warrant that:</p>
            <ul>
              <li>You are at least 18 years old</li>
              <li>
                You have the legal capacity to enter into binding contracts
              </li>
              <li>
                You are not barred from using our services under applicable law
              </li>
              <li>
                You will comply with these Terms and all applicable laws and
                regulations
              </li>
            </ul>
          </div>

          <h2>2. Service Description and License</h2>
          <div className="ml-6">
            <h3>2.1 Service Overview</h3>
            <p>
              DigiServicesApp provides an AI-powered project management and
              workflow optimization platform. Our Service includes:
            </p>
            <ul>
              <li>Project management tools and workflows</li>
              <li>AI-assisted task automation</li>
              <li>Team collaboration features</li>
              <li>Analytics and reporting tools</li>
              <li>API access (on eligible plans)</li>
            </ul>

            <h3>2.2 License Grant</h3>
            <p>
              Subject to these Terms and your compliance with them, we grant you
              a limited, non-exclusive, non-transferable, non-sublicensable
              license to access and use the Service for your internal business
              purposes.
            </p>
          </div>

          <h2>3. Account Terms</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3>3.1 Account Creation and Security</h3>
            <p>You must:</p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your information</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h3>3.2 Account Responsibilities</h3>
            <p>You are responsible for:</p>
            <ul>
              <li>All activities that occur under your account</li>
              <li>Maintaining appropriate security measures</li>
              <li>Ensuring authorized users comply with these Terms</li>
              <li>Any losses resulting from unauthorized use</li>
            </ul>
          </div>

          <h2>4. Subscription and Payment Terms</h2>
          <div className="ml-6">
            <h3>4.1 Subscription Plans</h3>
            <ul>
              <li>Plans and pricing are as published on our website</li>
              <li>
                We reserve the right to modify pricing with 30 days notice
              </li>
              <li>Changes will not affect pre-paid subscription periods</li>
              <li>Enterprise customers are subject to separate agreements</li>
            </ul>

            <h3>4.2 Payment Terms</h3>
            <ul>
              <li>All fees are payable in advance</li>
              <li>Subscription fees are non-refundable</li>
              <li>Late payments may result in service suspension</li>
              <li>You are responsible for applicable taxes</li>
            </ul>

            <h3>4.3 Free Trials</h3>
            <p>
              Free trials are subject to these Terms and may be revoked at our
              discretion. At the end of the trial period, your account will
              automatically convert to a paid subscription unless cancelled.
            </p>
          </div>

          <h2>5. User Content and Conduct</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3>5.1 User Content</h3>
            <p>
              You retain ownership of content you upload to the Service. You
              grant us a worldwide, non-exclusive, royalty-free license to use,
              store, and process your content to provide and improve the
              Service.
            </p>

            <h3>5.2 Prohibited Content and Conduct</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Upload illegal or harmful content</li>
              <li>Violate intellectual property rights</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Interfere with the Service&apos;s operation</li>
              <li>Use the Service for malicious purposes</li>
              <li>Engage in automated or bulk access</li>
            </ul>
          </div>

          <h2>6. Data Protection and Privacy</h2>
          <div className="ml-6">
            <p>
              Our collection and use of personal information is governed by our
              Privacy Policy, which is incorporated into these Terms by
              reference.
            </p>

            <h3>6.1 Data Processing Terms</h3>
            <p>
              If you are subject to GDPR or similar regulations, our Data
              Processing Addendum applies and is incorporated into these Terms.
            </p>

            <h3>6.2 Security Measures</h3>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data. You are responsible for maintaining the
              security of your account credentials.
            </p>
          </div>

          <h2>7. Intellectual Property Rights</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3>7.1 Our IP Rights</h3>
            <p>
              The Service, including its original content, features, and
              functionality, is owned by DigiServicesApp and is protected by
              international copyright, trademark, and other intellectual
              property laws.
            </p>

            <h3>7.2 Feedback and Suggestions</h3>
            <p>
              If you provide feedback or suggestions about our Service, we may
              use them without restriction or compensation to you.
            </p>
          </div>

          <h2>8. Warranty Disclaimers</h2>
          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <p className="font-semibold">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted,
              error-free, or free from harmful components. You use the Service
              at your own risk.
            </p>
          </div>

          <h2>9. Limitation of Liability</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
            <ul>
              <li>
                We shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages
              </li>
              <li>
                Our total liability shall not exceed the amounts paid by you for
                the Service in the 12 months preceding the claim
              </li>
            </ul>
          </div>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless DigiServicesApp and its
            officers, directors, employees, and agents from any claims, damages,
            losses, liabilities, costs, and expenses (including reasonable
            attorneys&apos; fees) arising from:
          </p>
          <ul>
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Your user content</li>
          </ul>

          <h2>11. Term and Termination</h2>
          <div className="ml-6">
            <h3>11.1 Term</h3>
            <p>
              These Terms remain in effect until terminated by either party.
            </p>

            <h3>11.2 Termination</h3>
            <p>We may terminate or suspend your access to the Service:</p>
            <ul>
              <li>For breach of these Terms</li>
              <li>For fraudulent or illegal activity</li>
              <li>If required by law</li>
              <li>For non-payment of fees</li>
            </ul>

            <h3>11.3 Effect of Termination</h3>
            <ul>
              <li>Access to the Service will cease</li>
              <li>You remain liable for amounts due</li>
              <li>Sections 7-10 survive termination</li>
            </ul>
          </div>

          <h2>12. Miscellaneous</h2>
          <div className="ml-6">
            <h3>12.1 Governing Law</h3>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of Delaware, without regard to its conflict of law
              provisions.
            </p>

            <h3>12.2 Dispute Resolution</h3>
            <p>
              Any disputes shall be resolved through binding arbitration in
              Delaware, except for claims eligible for small claims court or
              intellectual property enforcement.
            </p>

            <h3>12.3 Severability</h3>
            <p>
              If any provision of these Terms is found to be unenforceable, the
              remaining provisions will remain in effect.
            </p>

            <h3>12.4 Entire Agreement</h3>
            <p>
              These Terms constitute the entire agreement between you and
              DigiServicesApp regarding the Service.
            </p>
          </div>

          <h2>13. Changes to Terms</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p>
              We may modify these Terms at any time. We will notify you of
              material changes by:
            </p>
            <ul>
              <li>Posting a notice on our website</li>
              <li>Sending an email to registered users</li>
              <li>Displaying a notice in the Service</li>
            </ul>
            <p>
              Your continued use of the Service after changes become effective
              constitutes acceptance of the modified Terms.
            </p>
          </div>

          <h2>14. Contact Information</h2>
          <div className="contact-info mb-8">
            <p>For questions about these Terms:</p>
            <div className="space-y-4">
              <p>
                <strong>Legal Department</strong>
                <br />
                {companyInfo.name}
                <br />
                {companyInfo.address.street}
                <br />
                {companyInfo.address.city}, {companyInfo.address.state}{' '}
                {companyInfo.address.zip}
                <br />
                {companyInfo.address.country}
              </p>
              <p>
                General Inquiries: {companyInfo.contact.email}
                <br />
                Support: {companyInfo.contact.support}
                <br />
                Phone: {companyInfo.contact.phone}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Effective Date: August 28, 2025. Previous versions can be obtained
              by contacting us.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
