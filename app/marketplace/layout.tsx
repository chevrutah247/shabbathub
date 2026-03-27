import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace — ShabbatHub',
  description: 'Browse and shop Shabbat-related products: books, Judaica items, and educational materials from trusted sellers.',
  alternates: { canonical: 'https://www.shabbathub.com/marketplace' },
  openGraph: {
    title: 'Marketplace — ShabbatHub',
    description: 'Shop Shabbat books, Judaica, and educational materials.',
    url: 'https://www.shabbathub.com/marketplace',
  },
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
