import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscribe — ShabbatHub',
  description: 'Subscribe to ShabbatHub weekly digest and receive the latest Shabbat materials directly to your email.',
  alternates: { canonical: 'https://www.shabbathub.com/subscribe' },
  openGraph: {
    title: 'Subscribe — ShabbatHub',
    description: 'Get weekly Shabbat materials delivered to your inbox.',
    url: 'https://www.shabbathub.com/subscribe',
  },
};

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
