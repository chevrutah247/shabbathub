'use client';

import Link from 'next/link';
import { Heart, Mail, Github } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold">
                <span className="text-white">Shabbat</span>
                <span className="text-gold-400">Hub</span>
              </span>
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
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.support', lang)}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  {t('footer.contactUs', lang)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              © {currentYear} {t('footer.copyright', lang)}
            </p>
            <p className="text-blue-300 text-sm flex items-center gap-1">
              {t('footer.madeWith', lang)} <Heart size={14} className="text-red-400" /> {t('footer.forCommunity', lang)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
