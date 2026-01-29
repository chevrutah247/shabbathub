import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'ShabbatHub — Крупнейший архив материалов к Шаббату',
    template: '%s | ShabbatHub',
  },
  description: 'Бесплатный доступ к тысячам материалов о Шаббате: газеты, статьи, учебные материалы на русском, иврите и английском языках.',
  keywords: ['шаббат', 'шабос', 'тора', 'иудаизм', 'еврейство', 'chevrutah', 'шомрей шабос', 'parsha', 'weekly portion', 'jewish newspaper'],
  authors: [{ name: 'ShabbatHub' }],
  metadataBase: new URL('https://shabbathub.com'),
  alternates: {
    languages: {
      'ru': '/ru',
      'en': '/en',
      'he': '/he',
    },
  },
  openGraph: {
    title: 'ShabbatHub — Архив материалов к Шаббату',
    description: 'Бесплатный доступ к тысячам материалов о Шаббате',
    url: 'https://shabbathub.com',
    siteName: 'ShabbatHub',
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'he_IL'],
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShabbatHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShabbatHub — Архив материалов к Шаббату',
    description: 'Бесплатный доступ к тысячам материалов о Шаббате',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
