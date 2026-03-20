import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const topicKeywords: Record<string, string[]> = {
  shabbat: ['шабб', 'шабат', 'shabb', 'שבת'],
  holidays: ['праздни', 'пурим', 'песах', 'ханук', 'суккот', 'purim', 'pesach', 'chanuk', 'sukkot', 'holiday'],
  chassidut: ['хасид', 'chassid', 'חסיד', 'тания', 'tanya', 'תניא', 'маамар'],
  rebbe: ['ребе', 'rebbe', 'רבי', 'любавич', 'lubavitch', 'хабад', 'chabad'],
  moshiach: ['мошиах', 'mashiach', 'moshiach', 'משיח', 'геула', 'geula', 'גאולה'],
  halacha: ['галах', 'halacha', 'הלכ', 'шулхан', 'shulchan'],
  family: ['воспитан', 'family', 'children', 'chinuch', 'חינוך', 'שלום בית', 'шалом байт'],
  stories: ['истори', 'рассказ', 'story', 'stories', 'סיפור'],
  emunah: ['emunah', 'אמונ', 'битахон', 'bitachon', 'ביטחון'],
  prayer: ['молитв', 'prayer', 'תפיל', 'теилим', 'tehillim', 'תהילים'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const page = parseInt(searchParams.get('page') || '0');
  const pageSize = parseInt(searchParams.get('pageSize') || '50');
  const sort = searchParams.get('sort') || 'newest';
  const lang = searchParams.get('lang');

  if (!topic || !topicKeywords[topic]) {
    return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
  }

  const keywords = topicKeywords[topic];
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // Build OR condition for ilike on ai_summary
  const orConditions = keywords.map(kw => `ai_summary.ilike.%${kw}%`).join(',');

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
