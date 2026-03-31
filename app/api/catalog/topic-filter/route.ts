import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Map UI topic IDs to database topic_keys
const topicToKeys: Record<string, string[]> = {
  shabbat: ['shabbat_laws'],
  holidays: ['holidays'],
  chassidut: ['chassidus_hashkafa', 'chassidut'],
  rebbe: ['rebbe_teachings', 'rebbe'],
  moshiach: ['moshiach_geula', 'moshiach'],
  halacha: ['halacha', 'kashrut'],
  family: ['family_education', 'relationships_shalom_bayit'],
  stories: ['stories_history', 'stories'],
  emunah: ['emunah_bitachon', 'emunah'],
  prayer: ['prayer_tefilah'],
  mussar: ['mussar_middot', 'mussar'],
  kabbalah: ['kabbalah'],
  modesty: ['women_modesty'],
  community: ['community'],
  health: ['health_mind'],
  torah_study: ['torah_study'],
  israel: ['eretz_yisrael'],
  parsha: ['parsha_commentary', 'parsha'],
  kids: ['kids'],
  youth: ['youth'],
  other: ['other'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const page = parseInt(searchParams.get('page') || '0');
  const pageSize = parseInt(searchParams.get('pageSize') || '50');
  const sort = searchParams.get('sort') || 'newest';
  const lang = searchParams.get('lang');

  if (!topic || !topicToKeys[topic]) {
    return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
  }

  const keys = topicToKeys[topic];
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // Use topic_keys array contains filter — fast GIN index lookup
  const orConditions = keys.map(k => `topic_keys.cs.{${k}}`).join(',');

  let query = supabase
    .from('issues')
    .select('id,title,pdf_url,gregorian_date,publication_id,thumbnail_url,parsha_id,event_id,issue_number,ai_summary', { count: 'exact' })
    .eq('is_active', true)
    .or(orConditions)
    .range(from, to);

  if (sort === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  if (lang) {
    query = query.in('language', lang.split(','));
  }

  const { data, count, error } = await query;

  if (error) {
    console.error('Topic filter error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ results: data || [], total: count || 0 });
}
