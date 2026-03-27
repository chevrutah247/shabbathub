import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — ShabbatHub',
  description: 'Get in touch with the ShabbatHub team. We welcome feedback, partnership inquiries, and content submissions.',
  alternates: { canonical: 'https://www.shabbathub.com/contact' },
  openGraph: {
    title: 'Contact — ShabbatHub',
    description: 'Contact the ShabbatHub team for feedback or partnership inquiries.',
    url: 'https://www.shabbathub.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
