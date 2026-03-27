import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { escapeLikePattern } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function splitCsv(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map((x) => x.trim()).filter(Boolean);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get('q')?.trim() || '';
    const country = searchParams.get('country')?.trim() || '';
    const city = searchParams.get('city')?.trim() || '';
    const district = searchParams.get('district')?.trim() || '';
    const dishes = splitCsv(searchParams.get('dishes'));
    const products = splitCsv(searchParams.get('products'));
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') || '24')));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('market_listings')
      .select('id,title,description,price,currency,country,city,district,dishes,products,photos,status,is_active,created_at,seller_name', { count: 'exact' })
      .eq('is_active', true)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (country) query = query.ilike('country', `%${escapeLikePattern(country)}%`);
    if (city) query = query.ilike('city', `%${escapeLikePattern(city)}%`);
    if (district) query = query.ilike('district', `%${escapeLikePattern(district)}%`);
    if (dishes.length > 0) query = query.overlaps('dishes', dishes);
    if (products.length > 0) query = query.overlaps('products', products);
    if (q) {
      // Use individual .ilike() calls instead of .or() string interpolation
      // to prevent PostgREST filter injection
      const escaped = escapeLikePattern(q);
      query = query.or(
        `title.ilike.%${escaped}%,description.ilike.%${escaped}%,country.ilike.%${escaped}%,city.ilike.%${escaped}%,district.ilike.%${escaped}%`
      );
    }

    const { data, count, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      items: Array.isArray(data) ? data : [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
