import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: doc } = await supabase
    .from('issues')
    .select('title, description, ai_summary, thumbnail_url, publication_id, topic_keys')
    .eq('id', id)
    .single();

  if (!doc) {
    return { title: 'Документ — ShabbatHub' };
  }

  // Get publication name for unique title
  let pubName = '';
  if (doc.publication_id) {
    const { data: pub } = await supabase
      .from('publications')
      .select('title_ru, title_en')
      .eq('id', doc.publication_id)
      .single();
    pubName = pub?.title_ru || pub?.title_en || '';
  }

  const title = doc.title || 'Документ';
  // Unique description: prefer ai_summary, then description, then generated
  const description = doc.ai_summary
    || doc.description
    || (pubName ? `${title} — выпуск ${pubName}. Читать и скачать бесплатно на ShabbatHub.` : `${title} — читать и скачать бесплатно на ShabbatHub.`);
  // Unique page title with publication name
  const pageTitle = pubName ? `${title} — ${pubName} | ShabbatHub` : `${title} | ShabbatHub`;

  return {
    title: pageTitle,
    description: description.slice(0, 320),
    alternates: { canonical: `/document/${id}` },
    keywords: doc.topic_keys?.length ? doc.topic_keys.join(', ') : undefined,
    openGraph: {
      title: pageTitle,
      description: description.slice(0, 200),
      url: `/document/${id}`,
      type: 'article',
      images: doc.thumbnail_url ? [{ url: doc.thumbnail_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description.slice(0, 200),
    },
  };
}

export default function DocumentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
