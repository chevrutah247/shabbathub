import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'shabbathub-admin-2026';

// GET — fetch all overrides from DB
export async function GET() {
  const { data, error } = await supabase
    .from('hayom_yom')
    .select('hebrew_month, hebrew_day, main_text, header')
    .order('hebrew_month')
    .order('hebrew_day');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

// POST — save/update an entry
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { key, text, secret } = body;

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!key || !text) {
    return NextResponse.json({ error: 'key and text required' }, { status: 400 });
  }

  const [month, dayStr] = key.split('-');
  const day = parseInt(dayStr);

  const { error } = await supabase
    .from('hayom_yom')
    .upsert({
      hebrew_month: month,
      hebrew_day: day,
      header: body.header || `${day} ${month}`,
      main_text: text,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'hebrew_month,hebrew_day',
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
