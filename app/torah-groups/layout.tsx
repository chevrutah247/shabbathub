import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Torah Study Groups — ShabbatHub',
  description: 'Find Torah study groups and classes in your area. Connect with local communities for weekly Shabbat learning.',
  alternates: { canonical: 'https://www.shabbathub.com/torah-groups' },
  openGraph: {
    title: 'Torah Study Groups — ShabbatHub',
    description: 'Find Torah study groups and Shabbat learning communities near you.',
    url: 'https://www.shabbathub.com/torah-groups',
  },
};

export default function TorahGroupsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
