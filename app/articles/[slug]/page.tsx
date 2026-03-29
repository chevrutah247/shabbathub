import type { Metadata } from 'next';
import { getArticleBySlug, getAllSlugs } from '@/data/articles';
import ArticleContent from './ArticleContent';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const title = `${article.title.ru} | ShabbatHub`;
  const description = article.subtitle.ru;
  const url = `https://www.shabbathub.com/articles/${params.slug}`;
  const image = article.image || '/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title: article.title.ru,
      description,
      url,
      siteName: 'ShabbatHub',
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: article.title.ru }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title.ru,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ArticlePage() {
  return <ArticleContent />;
}
