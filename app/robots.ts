import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/profile', '/reset-password'],
      },
    ],
    sitemap: 'https://shabbathub.com/sitemap.xml',
  };
}
