import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — ShabbatHub',
  description: 'Privacy Policy for ShabbatHub, a project of Education On The Go Corp.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft size={20} /> Home
        </Link>

        <h1 className="text-4xl font-bold text-primary-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="prose prose-lg text-gray-600 space-y-8">
          {/* 1. About */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">1. About</h2>
            <p>
              ShabbatHub (<a href="https://www.shabbathub.com" className="text-primary-600 hover:underline">www.shabbathub.com</a>) is
              a free digital library operated by <strong>Education On The Go Corp</strong>, a 501(c)(3) nonprofit organization
              (EIN: 92-1172505) based in Brooklyn, New York, USA. This Privacy Policy explains how we collect, use, and protect
              your personal information when you use our website.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc space-y-2" style={{ paddingInlineStart: '1.5rem' }}>
              <li><strong>Account Information:</strong> When you register, we collect your name, email address, and preferred language.</li>
              <li><strong>Usage Data:</strong> We automatically collect information about how you interact with ShabbatHub, including pages visited, time spent, and referring URLs.</li>
              <li><strong>Contact Information:</strong> When you use our contact form, we collect your name, email address, and message content.</li>
              <li><strong>Device Information:</strong> We may collect browser type, operating system, and device identifiers for analytics purposes.</li>
              <li><strong>Uploaded Content:</strong> If you upload publications or materials, we store the files and associated metadata.</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-2" style={{ paddingInlineStart: '1.5rem' }}>
              <li>Provide and maintain the ShabbatHub platform</li>
              <li>Send you notifications about new publications and updates (if subscribed)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Improve our website and user experience</li>
              <li>Analyze usage trends and site performance</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          {/* 4. Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
            <p>
              ShabbatHub uses cookies and similar technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc space-y-2" style={{ paddingInlineStart: '1.5rem' }}>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., authentication, language preferences).</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site so we can improve it.</li>
            </ul>
            <p>You can control cookie settings through your browser preferences.</p>
          </section>

          {/* 5. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">5. Third-Party Services</h2>
            <p>We may use third-party services that collect information on our behalf, including:</p>
            <ul className="list-disc space-y-2" style={{ paddingInlineStart: '1.5rem' }}>
              <li><strong>Hosting and Infrastructure:</strong> Vercel, Supabase</li>
              <li><strong>Analytics:</strong> Google Analytics or similar services</li>
              <li><strong>Payment Processing:</strong> For donations, processed through secure third-party payment providers</li>
            </ul>
            <p>
              These services have their own privacy policies, and we encourage you to review them. We do not sell your personal
              information to third parties.
            </p>
          </section>

          {/* 6. Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc space-y-2" style={{ paddingInlineStart: '1.5rem' }}>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:contact@edonthego.org" className="text-primary-600 hover:underline">contact@edonthego.org</a>.
            </p>
          </section>

          {/* 8. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">8. Children&apos;s Privacy</h2>
            <p>
              ShabbatHub is intended for general audiences. We do not knowingly collect personal information from children
              under the age of 13. If we become aware that we have collected personal information from a child under 13,
              we will take steps to delete that information promptly. If you believe a child has provided us with personal
              information, please contact us at{' '}
              <a href="mailto:contact@edonthego.org" className="text-primary-600 hover:underline">contact@edonthego.org</a>.
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make changes, we will update the &quot;Last updated&quot;
              date at the top of this page. We encourage you to review this policy periodically. Continued use of ShabbatHub
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
            <ul className="list-none space-y-2" style={{ paddingInlineStart: '0' }}>
              <li><strong>Organization:</strong> Education On The Go Corp</li>
              <li><strong>Status:</strong> 501(c)(3) Nonprofit &middot; EIN: 92-1172505</li>
              <li><strong>Email:</strong>{' '}
                <a href="mailto:contact@edonthego.org" className="text-primary-600 hover:underline">contact@edonthego.org</a>
              </li>
              <li><strong>Address:</strong> Brooklyn, New York, USA</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
