import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, first_name, last_name')
    .eq('id', id)
    .single();

  const name = profile?.display_name || [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || 'Загрузчик';

  return {
    title: name,
    description: `Материалы загруженные пользователем ${name} на ShabbatHub`,
    alternates: { canonical: `/uploader/${id}` },
    openGraph: {
      title: `${name} | ShabbatHub`,
      description: `Материалы загруженные пользователем ${name}`,
      url: `/uploader/${id}`,
    },
  };
}

export default function UploaderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
