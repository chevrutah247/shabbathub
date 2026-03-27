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
  const docUrl = `${siteUrl}/document/${params.id}`;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <>
        <title>Документ | ShabbatHub</title>
        <meta name="description" content="Материалы к Шаббату в архиве ShabbatHub." />
        <link rel="canonical" href={docUrl} />
      </>
    );
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/issues?id=eq.${params.id}&select=id,title,description,thumbnail_url,gregorian_date`,
      {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: 'no-store',
      }
    );
    const data = await res.json();
    const issue = Array.isArray(data) ? data[0] : null;
    const title = issue?.title ? `${issue.title} | ShabbatHub` : 'Документ | ShabbatHub';
    const description = truncate(
      issue?.description || `Смотреть и скачать материалы к Шаббату в ShabbatHub.`
    );
    const image = issue?.thumbnail_url || `${siteUrl}/og-image.png`;

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={docUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={docUrl} />
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
        <title>Документ | ShabbatHub</title>
        <meta name="description" content="Материалы к Шаббату в архиве ShabbatHub." />
        <link rel="canonical" href={docUrl} />
      </>
    );
  }
}

