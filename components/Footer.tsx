'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Mail, Github } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/shabbathub-logo.png" alt="ShabbatHub" width={180} height={40} className="h-9 w-auto" />
            </Link>
            <p className="text-blue-200 mb-4 max-w-md">
              {t('footer.desc', lang)}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:contact@shabbathub.com"
                className="text-blue-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-400">{t('footer.navigation', lang)}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.catalog', lang)}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.latestIssues', lang)}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.searchLabel', lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-400">{t('footer.info', lang)}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.aboutProject', lang)}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.contactUs', lang)}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-blue-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.support', lang)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Org Info */}
        <div className="pt-6 border-t border-blue-800 mb-4">
          <p className="text-blue-300 text-sm text-center">
            A project of <strong className="text-blue-200">Education On The Go Corp</strong> &middot; 501(c)(3) Nonprofit &middot; EIN: 92-1172505
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              &copy; {currentYear} {t('footer.copyright', lang)}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy-policy" className="text-blue-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="text-blue-300 hover:text-white transition-colors">{t('footer.contactUs', lang)}</Link>
              <Link href="/about" className="text-blue-300 hover:text-white transition-colors">{t('footer.aboutProject', lang)}</Link>
            </div>
            <p className="text-blue-300 text-sm flex items-center gap-1">
              {t('footer.madeWith', lang)} <Heart size={14} className="text-red-400" /> {t('footer.forCommunity', lang)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
