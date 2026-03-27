import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — ShabbatHub',
  description: 'ShabbatHub is the largest free archive of Shabbat materials: newspapers, articles, and educational resources in Russian, Hebrew, English, and Ukrainian.',
  alternates: { canonical: 'https://www.shabbathub.com/about' },
  openGraph: {
    title: 'About — ShabbatHub',
    description: 'Learn about ShabbatHub — the largest free Shabbat materials archive.',
    url: 'https://www.shabbathub.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
