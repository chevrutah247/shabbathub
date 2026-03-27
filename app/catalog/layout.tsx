import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog — ShabbatHub',
  description: 'Browse thousands of free Shabbat materials: weekly parsha sheets, holiday guides, newspapers, and educational resources.',
  alternates: { canonical: 'https://www.shabbathub.com/catalog' },
  openGraph: {
    title: 'Catalog — ShabbatHub',
    description: 'Browse thousands of free Shabbat materials and weekly parsha sheets.',
    url: 'https://www.shabbathub.com/catalog',
  },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
