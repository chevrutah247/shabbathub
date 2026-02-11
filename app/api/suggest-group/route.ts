import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) return new Redis({ url, token });
  return null;
}

export async function POST(request: Request) {
  try {
    const { name, platform, link, description, language, submitterEmail, adminContact, adminContactType } = await request.json();
    
    if (!name || !platform || !link) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 });
    }

    try { new URL(link); } catch {
      return NextResponse.json({ error: 'Неверный формат ссылки' }, { status: 400 });
    }

    const redis = getRedis();
    if (redis) {
      const stored = await redis.get('torah_groups');
      if (stored) {
        const groups = typeof stored === 'string' ? JSON.parse(stored) : stored;
        if (Array.isArray(groups)) {
          const cleanLink = link.replace(/[?#].*$/, '').toLowerCase();
          const duplicate = groups.find((g: any) => 
            g.link && g.link.replace(/[?#].*$/, '').toLowerCase() === cleanLink
          );
          if (duplicate) {
            return NextResponse.json({ error: `Группа "${duplicate.name}" уже существует` }, { status: 400 });
          }
        }
      }
    }

    const { error } = await supabase.from('torah_group_suggestions').insert({
      name, platform, link, 
      description: description || null, 
      language: language || 'russian',
      submitted_by: submitterEmail || null, 
      admin_contact: adminContact || null,
      admin_contact_type: adminContactType || null,
      status: 'pending', 
      created_at: new Date().toISOString()
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('torah_group_suggestions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function PUT(request: Request) {
  try {
    const { id, action } = await request.json();
    
    if (action === 'approve') {
      const { data: suggestion } = await supabase
        .from('torah_group_suggestions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!suggestion) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      
      const redis = getRedis();
      if (redis) {
        let groups: any[] = [];
        const stored = await redis.get('torah_groups');
        if (stored) {
          groups = typeof stored === 'string' ? JSON.parse(stored) : stored;
          if (!Array.isArray(groups)) groups = [];
        }
        
        groups.push({
          id: String(Date.now()),
          name: suggestion.name,
          platform: suggestion.platform,
          link: suggestion.link,
          description: suggestion.description || '',
          language: suggestion.language || 'russian',
          adminContact: suggestion.admin_contact,
          adminContactType: suggestion.admin_contact_type,
          status: 'approved',
          createdAt: new Date().toISOString()
        });
        await redis.set('torah_groups', JSON.stringify(groups));
      }
      
      await supabase.from('torah_group_suggestions').delete().eq('id', id);
      return NextResponse.json({ success: true });
    }
    
    if (action === 'reject') {
      await supabase.from('torah_group_suggestions').delete().eq('id', id);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
