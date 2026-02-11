import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) return new Redis({ url, token });
  return null;
}

async function checkLink(url: string): Promise<boolean> {
  try {
    const cleanUrl = url.replace(/[^\x20-\x7E]/g, '').trim();
    const response = await fetch(cleanUrl, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await response.text();
    
    if (cleanUrl.includes('chat.whatsapp.com')) {
      const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/);
      if (ogTitle && ogTitle[1] === '') return false;
      if (html.includes('invite link is invalid') || html.includes('has been revoked')) return false;
    }
    
    if (cleanUrl.includes('t.me/')) {
      if (html.includes("doesn't exist") || html.includes('not exist')) return false;
    }
    
    if (response.url === 'https://www.whatsapp.com/' || response.url.includes('/404')) return false;
    return response.status === 200;
  } catch {
    return true;
  }
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'No Redis' }, { status: 500 });

    const results = { checked: 0, broken: 0, brokenList: [] as any[] };
    const stored = await redis.get('torah_groups');
    let groups = Array.isArray(stored) ? stored : JSON.parse(stored as string || '[]');
    
    for (const group of groups.filter((g: any) => g.status !== 'broken')) {
      if (!group.link) continue;
      results.checked++;
      
      if (!(await checkLink(group.link))) {
        const idx = groups.findIndex((g: any) => g.id === group.id);
        if (idx !== -1) {
          groups[idx].status = 'broken';
          groups[idx].brokenAt = new Date().toISOString();
          results.brokenList.push({ name: group.name, link: group.link });
          results.broken++;
        }
      }
      await new Promise(r => setTimeout(r, 500));
    }

    if (results.broken > 0) await redis.set('torah_groups', JSON.stringify(groups));

    return NextResponse.json({ timestamp: new Date().toISOString(), ...results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
