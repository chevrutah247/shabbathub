import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ShabbatHub Official Site',
  description:
    'ShabbatHub is the official digital library for Shabbat materials: weekly parsha sheets, newspapers, and study content in Russian, Hebrew, English, and Ukrainian.',
  alternates: {
    canonical: 'https://www.shabbathub.com/shabbathub',
  },
  openGraph: {
    title: 'ShabbatHub Official Site',
    description:
      'Official ShabbatHub page with direct access to catalog, weekly materials, and publication archives.',
    url: 'https://www.shabbathub.com/shabbathub',
    siteName: 'ShabbatHub',
    type: 'website',
  },
};

export default function ShabbatHubBrandPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">ShabbatHub</h1>
        <p className="text-lg text-gray-700 mb-4">
          ShabbatHub is the official digital archive of Shabbat resources for communities, families,
          and learners around the world. The platform focuses on practical weekly usage: parsha sheets,
          Jewish newspapers, holiday guides, and downloadable materials for study and preparation.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          The project is actively updated and includes materials in Russian, Hebrew, English, and
          Ukrainian. You can browse new issues, search by publication, and open document pages with
          direct access to source files.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          If you searched for <strong>shabbathub</strong>, this is the official project page.
          Use the links below to open the main sections.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="rounded-xl border border-primary-200 bg-white p-4 hover:border-primary-400 hover:bg-primary-50 transition"
          >
            <p className="font-semibold text-primary-900">Main Page</p>
            <p className="text-sm text-gray-600">Overview of ShabbatHub and latest highlights.</p>
          </Link>
          <Link
            href="/catalog"
            className="rounded-xl border border-primary-200 bg-white p-4 hover:border-primary-400 hover:bg-primary-50 transition"
          >
            <p className="font-semibold text-primary-900">Catalog</p>
            <p className="text-sm text-gray-600">Browse all available publications and documents.</p>
          </Link>
          <Link
            href="/subscribe"
            className="rounded-xl border border-primary-200 bg-white p-4 hover:border-primary-400 hover:bg-primary-50 transition"
          >
            <p className="font-semibold text-primary-900">Subscribe</p>
            <p className="text-sm text-gray-600">Get updates when new Shabbat materials are published.</p>
          </Link>
          <Link
            href="/about"
            className="rounded-xl border border-primary-200 bg-white p-4 hover:border-primary-400 hover:bg-primary-50 transition"
          >
            <p className="font-semibold text-primary-900">About</p>
            <p className="text-sm text-gray-600">Learn about the mission, language coverage, and team.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
