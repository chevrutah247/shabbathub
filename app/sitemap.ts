import { createClient } from '@supabase/supabase-js';
import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.shabbathub.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/shabbathub`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/catalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/subscribe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/leaders`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/torah-groups`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.55 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/suggest-group`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/navigator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: publications } = await supabase
      .from('publications')
      .select('id, updated_at')
      .eq('is_active', true);

    const pubPages: MetadataRoute.Sitemap = (publications || []).map((pub) => ({
      url: `${baseUrl}/publication/${pub.id}`,
      lastModified: pub.updated_at ? new Date(pub.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));

    // Fetch ALL documents in batches (Supabase default limit is 1000)
    let allDocs: { id: string; created_at: string }[] = [];
    let from = 0;
    const batchSize = 1000;
    while (true) {
      const { data: batch } = await supabase
        .from('issues')
        .select('id, created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(from, from + batchSize - 1);
      if (!batch || batch.length === 0) break;
      allDocs = allDocs.concat(batch);
      if (batch.length < batchSize) break;
      from += batchSize;
    }

    const docPages: MetadataRoute.Sitemap = allDocs.map((doc) => ({
      url: `${baseUrl}/document/${doc.id}`,
      lastModified: doc.created_at ? new Date(doc.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    }));

    // Uploader pages (top uploaders)
    const { data: uploaders } = await supabase
      .from('profiles')
      .select('id')
      .gt('upload_count', 0)
      .order('upload_count', { ascending: false })
      .limit(50);

    const uploaderPages: MetadataRoute.Sitemap = (uploaders || []).map((u) => ({
      url: `${baseUrl}/uploader/${u.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.55,
    }));

    return [...staticPages, ...articlePages, ...pubPages, ...docPages, ...uploaderPages];
  } catch {
    return [...staticPages, ...articlePages];
  }
}
