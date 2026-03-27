import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Contributors — ShabbatHub',
  description: 'Meet the top contributors and uploaders on ShabbatHub who share valuable Shabbat materials with the community.',
  alternates: { canonical: 'https://www.shabbathub.com/leaders' },
  openGraph: {
    title: 'Top Contributors — ShabbatHub',
    description: 'Meet ShabbatHub top contributors sharing Shabbat materials.',
    url: 'https://www.shabbathub.com/leaders',
  },
};

export default function LeadersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
