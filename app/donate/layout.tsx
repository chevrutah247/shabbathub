import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Us — ShabbatHub',
  description: 'Support ShabbatHub to keep the largest free Shabbat materials archive accessible to everyone.',
  alternates: { canonical: 'https://www.shabbathub.com/donate' },
  openGraph: {
    title: 'Support Us — ShabbatHub',
    description: 'Help keep ShabbatHub free and accessible to the Jewish community.',
    url: 'https://www.shabbathub.com/donate',
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
