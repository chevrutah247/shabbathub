import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navigator — ShabbatHub',
  description: 'Navigate through ShabbatHub archive by publication, date, and topic. Find exactly what you need for Shabbat preparation.',
  alternates: { canonical: 'https://www.shabbathub.com/navigator' },
  openGraph: {
    title: 'Navigator — ShabbatHub',
    description: 'Navigate the ShabbatHub archive by publication, date, and topic.',
    url: 'https://www.shabbathub.com/navigator',
  },
};

export default function NavigatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
