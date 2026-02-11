import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) return new Redis({ url, token });
  return null;
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json([]);
    
    const stored = await redis.get('torah_groups');
    if (stored) {
      const data = typeof stored === 'string' ? JSON.parse(stored) : stored;
      if (Array.isArray(data)) {
        return NextResponse.json(data.filter((g: any) => g.status !== 'broken'));
      }
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error('GET groups error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    
    const newGroup = await request.json();
    
    let groups: any[] = [];
    const stored = await redis.get('torah_groups');
    if (stored) {
      groups = typeof stored === 'string' ? JSON.parse(stored) : stored;
      if (!Array.isArray(groups)) groups = [];
    }
    
    // Check for duplicate name
    const duplicateName = groups.find(g => 
      g.name?.toLowerCase().trim() === newGroup.name?.toLowerCase().trim()
    );
    if (duplicateName) {
      return NextResponse.json({ 
        error: 'Группа с таким названием уже существует', 
        duplicate: true,
        existingGroup: duplicateName.name
      }, { status: 400 });
    }
    
    // Check for duplicate link
    if (newGroup.link) {
      const cleanLink = newGroup.link.replace(/[?#].*$/, '').toLowerCase();
      const duplicateLink = groups.find(g => 
        g.link && g.link.replace(/[?#].*$/, '').toLowerCase() === cleanLink
      );
      if (duplicateLink) {
        return NextResponse.json({ 
          error: 'Группа с такой ссылкой уже существует', 
          duplicate: true,
          existingGroup: duplicateLink.name
        }, { status: 400 });
      }
    }
    
    const group = {
      id: String(Date.now()),
      ...newGroup,
      createdAt: new Date().toISOString(),
      status: 'approved',
    };
    
    groups.push(group);
    await redis.set('torah_groups', JSON.stringify(groups));
    
    return NextResponse.json(group);
  } catch (error) {
    console.error('POST groups error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    
    const updated = await request.json();
    
    let groups: any[] = [];
    const stored = await redis.get('torah_groups');
    if (stored) {
      groups = typeof stored === 'string' ? JSON.parse(stored) : stored;
      if (!Array.isArray(groups)) groups = [];
    }
    
    const index = groups.findIndex((g: any) => g.id === updated.id);
    if (index === -1) return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    
    groups[index] = { ...groups[index], ...updated };
    await redis.set('torah_groups', JSON.stringify(groups));
    
    return NextResponse.json(groups[index]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    
    const { id } = await request.json();
    
    let groups: any[] = [];
    const stored = await redis.get('torah_groups');
    if (stored) {
      groups = typeof stored === 'string' ? JSON.parse(stored) : stored;
      if (!Array.isArray(groups)) groups = [];
    }
    
    groups = groups.filter((g: any) => g.id !== id);
    await redis.set('torah_groups', JSON.stringify(groups));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
