'use client';

import Link from 'next/link';
import { ChevronLeft, Calendar, Tag, Share2, Check } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { articles, getArticleBySlug } from '@/data/articles';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

const pageText = {
  backToArticles: { ru: 'Все статьи', en: 'All articles', he: 'כל המאמרים', uk: 'Всі статті' },
  share: { ru: 'Поделиться', en: 'Share', he: 'שתף', uk: 'Поділитися' },
  copied: { ru: 'Скопировано!', en: 'Copied!', he: '!הועתק', uk: 'Скопійовано!' },
  relatedArticles: {
    ru: 'Другие статьи',
    en: 'More articles',
    he: 'מאמרים נוספים',
    uk: 'Інші статті',
  },
  readMore: { ru: 'Читать далее', en: 'Read more', he: 'קרא עוד', uk: 'Читати далі' },
};

const tagColors: Record<string, string> = {
  'Шаббат': 'bg-blue-100 text-blue-800',
  'Shabbat': 'bg-blue-100 text-blue-800',
  'שבת': 'bg-blue-100 text-blue-800',
  'Галаха': 'bg-emerald-100 text-emerald-800',
  'Halacha': 'bg-emerald-100 text-emerald-800',
  'הלכה': 'bg-emerald-100 text-emerald-800',
  'Хасидус': 'bg-purple-100 text-purple-800',
  'Chassidus': 'bg-purple-100 text-purple-800',
  'חסידות': 'bg-purple-100 text-purple-800',
  'Семья': 'bg-rose-100 text-rose-800',
  'Family': 'bg-rose-100 text-rose-800',
  'משפחה': 'bg-rose-100 text-rose-800',
  "Сім'я": 'bg-rose-100 text-rose-800',
  'Праздники': 'bg-amber-100 text-amber-800',
  'Holidays': 'bg-amber-100 text-amber-800',
  'חגים': 'bg-amber-100 text-amber-800',
  'Свята': 'bg-amber-100 text-amber-800',
};

function formatDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = { ru: 'ru-RU', en: 'en-US', he: 'he-IL', uk: 'uk-UA' };
  return date.toLocaleDateString(localeMap[lang] || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const [copied, setCopied] = useState(false);

  const article = getArticleBySlug(slug);

  // JSON-LD structured data
  useEffect(() => {
    if (!article) return;
    const contentLang = (lang === 'ru' || lang === 'en') ? lang : 'en';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title[lang],
      description: article.subtitle[lang],
      datePublished: article.createdAt,
      author: {
        '@type': 'Organization',
        name: 'ShabbatHub',
        url: 'https://www.shabbathub.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Education On The Go Corp',
        url: 'https://www.shabbathub.com',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.shabbathub.com/articles/${slug}`,
      },
      articleBody: article.content[contentLang].replace(/<[^>]*>/g, ''),
      inLanguage: lang,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    script.id = 'article-jsonld';
    const existing = document.getElementById('article-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);

    // Update page title and meta
    document.title = `${article.title[lang]} | ShabbatHub`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.subtitle[lang]);
    }

    return () => {
      const el = document.getElementById('article-jsonld');
      if (el) el.remove();
    };
  }, [article, lang, slug]);

  if (!article) {
    return notFound();
  }

  const contentLang = (lang === 'ru' || lang === 'en') ? lang : 'en';
  const t = (key: keyof typeof pageText) => pageText[key][lang];

  const handleShare = async () => {
    const url = `https://www.shabbathub.com/articles/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title[lang], url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related articles: same tag, different article
  const related = articles
    .filter((a) => a.tag.en === article.tag.en && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream py-8 px-4" dir={dir}>
      <article className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-700 transition-colors"
          >
            <ChevronLeft size={18} />
            <span>{t('backToArticles')}</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-700 transition-colors text-sm"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? t('copied') : t('share')}</span>
          </button>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                tagColors[article.tag[lang]] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {article.tag[lang]}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar size={14} />
              {formatDate(article.createdAt, lang)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 font-display leading-tight">
            {article.title[lang]}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">{article.subtitle[lang]}</p>
        </header>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
          <span className="text-gold-500 text-lg">&#10038;</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        </div>

        {/* Article content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            prose-p:mb-5 prose-p:text-[1.05rem]
            prose-headings:text-primary-900 prose-headings:font-bold
            prose-a:text-primary-600 prose-a:hover:text-primary-800
            prose-strong:text-primary-900"
          dangerouslySetInnerHTML={{ __html: article.content[contentLang] }}
        />

        {/* Bottom divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
          <span className="text-gold-500 text-lg">&#10038;</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        </div>

        {/* Share section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center mb-10">
          <p className="text-gray-600 mb-3">
            {lang === 'ru' && 'Понравилась статья? Поделитесь с друзьями!'}
            {lang === 'en' && 'Enjoyed this article? Share it with friends!'}
            {lang === 'he' && '?אהבת את המאמר? שתף עם חברים'}
            {lang === 'uk' && 'Сподобалася стаття? Поділіться з друзями!'}
          </p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            {copied ? t('copied') : t('share')}
          </button>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-primary-900 mb-6">{t('relatedArticles')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="group block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-primary-200 transition-all"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                      tagColors[rel.tag[lang]] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {rel.tag[lang]}
                  </span>
                  <h3 className="text-sm font-bold text-primary-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {rel.title[lang]}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
