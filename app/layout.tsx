import type { Metadata } from 'next';
import { Rubik, Playfair_Display, Frank_Ruhl_Libre } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rubik',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-frank-ruhl',
});
import { Providers } from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReferralTracker from '@/components/ReferralTracker';
import SubscribePopup from '@/components/SubscribePopup';
import FloatingContactSticker from '@/components/FloatingContactSticker';
import Analytics from '@/components/Analytics';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: {
    default: 'ShabbatHub — Крупнейший архив материалов к Шаббату',
    template: '%s | ShabbatHub',
  },
  description: 'Бесплатный доступ к тысячам материалов о Шаббате: газеты, статьи, учебные материалы на русском, иврите и английском языках.',
  keywords: ['шаббат', 'шабос', 'тора', 'иудаизм', 'еврейство', 'chevrutah', 'шомрей шабос', 'parsha', 'weekly portion', 'jewish newspaper'],
  authors: [{ name: 'ShabbatHub' }],
  metadataBase: new URL('https://www.shabbathub.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ru': 'https://www.shabbathub.com',
      'en': 'https://www.shabbathub.com',
      'he': 'https://www.shabbathub.com',
      'uk': 'https://www.shabbathub.com',
      'x-default': 'https://www.shabbathub.com',
    },
  },
  openGraph: {
    title: 'ShabbatHub — Архив материалов к Шаббату',
    description: 'Бесплатный доступ к тысячам материалов о Шаббате',
    url: 'https://www.shabbathub.com',
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
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" dir="ltr" className={`${rubik.variable} ${playfair.variable} ${frankRuhl.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S566WZ19WJ" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S566WZ19WJ');` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://yvgcxmqgvxlvbxsszqcc.supabase.co" />
        <link rel="dns-prefetch" href="https://www.hebcal.com" />
        <link rel="preconnect" href="https://www.hebcal.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ShabbatHub',
              url: 'https://www.shabbathub.com',
              logo: 'https://www.shabbathub.com/icon-192.png',
              description: 'The largest free digital archive of Shabbat materials: newspapers, articles, and educational resources.',
              contactPoint: {
                '@type': 'ContactPoint',
                url: 'https://www.shabbathub.com/contact',
                contactType: 'customer service',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ShabbatHub',
              url: 'https://www.shabbathub.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.shabbathub.com/catalog?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is ShabbatHub?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ShabbatHub is an online library with over 34,000 Torah publications — parsha sheets, dvar Torah materials, and Jewish educational resources in multiple languages.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is ShabbatHub free?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, all materials on ShabbatHub are completely free to read and download.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What languages are available on ShabbatHub?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Materials are available in Russian, English, Hebrew, and Ukrainian.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I upload my own publications to ShabbatHub?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, registered users can upload Torah publications to share with the community.',
                  },
                },
              ],
            }),
          }}
        />
        <BreadcrumbJsonLd />
        <Analytics />
        <Providers>
          <Header />
          <Suspense fallback={null}>
            <ReferralTracker />
          </Suspense>
          <SubscribePopup />
          <FloatingContactSticker />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
