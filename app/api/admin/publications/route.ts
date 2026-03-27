import { NextResponse } from 'next/server';
import { requireAdmin, supabaseAdmin } from '@/lib/api-auth';

type PublicationPayload = {
  id?: string;
  title_ru?: string | null;
  title_en?: string | null;
  title_he?: string | null;
  description_ru?: string;
  description_en?: string;
  description_he?: string;
  frequency?: string | null;
  primary_language?: string;
  whatsapp_link?: string;
  telegram_link?: string;
  website_url?: string;
  email?: string;
  cover_image_url?: string;
  is_active?: boolean;
};

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as PublicationPayload;

    const payload = {
      title_ru: body.title_ru || null,
      title_en: body.title_en || null,
      title_he: body.title_he || null,
      description_ru: body.description_ru || '',
      description_en: body.description_en || '',
      description_he: body.description_he || '',
      frequency: body.frequency || null,
      primary_language: body.primary_language || 'ru',
      whatsapp_link: body.whatsapp_link || '',
      telegram_link: body.telegram_link || '',
      website_url: body.website_url || '',
      email: body.email || '',
      cover_image_url: body.cover_image_url || '',
      is_active: body.is_active ?? true,
    };

    if (body.id) {
      const { error } = await supabaseAdmin
        .from('publications')
        .update(payload)
        .eq('id', body.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ ok: true });
    }

    const { error } = await supabaseAdmin
      .from('publications')
      .insert(payload);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
