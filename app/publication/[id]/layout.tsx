import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: pub } = await supabase
    .from('publications')
    .select('title_ru, title_en, description_ru, cover_image_url')
    .eq('id', id)
    .single();

  const title = pub?.title_ru || pub?.title_en || 'Издание';
  const description = pub?.description_ru || `Все выпуски издания ${title} на ShabbatHub`;

  return {
    title,
    description,
    alternates: { canonical: `/publication/${id}` },
    openGraph: {
      title: `${title} | ShabbatHub`,
      description,
      url: `/publication/${id}`,
      images: pub?.cover_image_url ? [{ url: pub.cover_image_url }] : undefined,
    },
  };
}

export default function PublicationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
