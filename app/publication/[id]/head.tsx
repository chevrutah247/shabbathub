interface HeadProps {
  params: { id: string };
}

const siteUrl = 'https://www.shabbathub.com';

function truncate(text: string, max = 160) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

export default async function Head({ params }: HeadProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const publicationUrl = `${siteUrl}/publication/${params.id}`;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <>
        <title>Публикация | ShabbatHub</title>
        <meta name="description" content="Серии и выпуски материалов к Шаббату на ShabbatHub." />
        <link rel="canonical" href={publicationUrl} />
      </>
    );
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/publications?id=eq.${params.id}&select=id,title_ru,title_en,title_he,description_ru,cover_image_url,total_issues`,
      {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: 'no-store',
      }
    );
    const data = await res.json();
    const publication = Array.isArray(data) ? data[0] : null;
    const rawTitle = publication?.title_ru || publication?.title_en || publication?.title_he || 'Публикация';
    const title = `${rawTitle} | ShabbatHub`;
    const description = truncate(
      publication?.description_ru || `Архив выпусков «${rawTitle}» в ShabbatHub.`
    );
    const image = publication?.cover_image_url || `${siteUrl}/og-image.png`;

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={publicationUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={publicationUrl} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </>
    );
  } catch {
    return (
      <>
        <title>Публикация | ShabbatHub</title>
        <meta name="description" content="Серии и выпуски материалов к Шаббату на ShabbatHub." />
        <link rel="canonical" href={publicationUrl} />
      </>
    );
  }
}

