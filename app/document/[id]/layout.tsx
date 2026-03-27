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
    .select('title, description, thumbnail_url, publication_id')
    .eq('id', id)
    .single();

  const title = doc?.title || 'Документ';
  const description = doc?.description || `Читать и скачать ${title} на ShabbatHub`;

  return {
    title,
    description,
    alternates: { canonical: `/document/${id}` },
    openGraph: {
      title: `${title} | ShabbatHub`,
      description,
      url: `/document/${id}`,
      images: doc?.thumbnail_url ? [{ url: doc.thumbnail_url }] : undefined,
    },
  };
}

export default function DocumentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
