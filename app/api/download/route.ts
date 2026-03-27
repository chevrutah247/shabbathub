import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit } from '@/lib/rate-limit';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ANON_KEY;

const supabaseAuth = createClient(SUPABASE_URL, ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY);

const BOT_UA_PATTERNS = [
  'bot',
  'crawler',
  'spider',
  'wget',
  'curl',
  'python-requests',
  'scrapy',
  'headless',
  'playwright',
  'puppeteer',
  'selenium',
];

function getIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for') || '';
  const real = request.headers.get('x-real-ip') || '';
  const first = xff.split(',').map((x) => x.trim()).find(Boolean);
  return first || real || 'unknown';
}

function isBotLikeUa(ua: string): boolean {
  const low = (ua || '').toLowerCase();
  if (!low) return true;
  return BOT_UA_PATTERNS.some((p) => low.includes(p));
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^A-Za-z0-9А-Яа-яЁё\u0590-\u05FF\s._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'document';
}

async function isBlocked(ip: string, userId: string): Promise<boolean> {
  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabaseAdmin
      .from('blocked_download_clients')
      .select('id')
      .or(`ip.eq.${ip},user_id.eq.${userId}`)
      .gt('blocked_until', nowIso)
      .limit(1);
    if (error) return false;
    return Array.isArray(data) && data.length > 0;
  } catch {
    return false;
  }
}

async function logDownloadEvent(payload: {
  issueId: string;
  userId: string;
  ip: string;
  userAgent: string;
  status: 'ok' | 'blocked' | 'rate_limited' | 'denied' | 'error';
  reason?: string;
}) {
  try {
    await supabaseAdmin.from('download_events').insert({
      issue_id: payload.issueId,
      user_id: payload.userId,
      ip: payload.ip,
      user_agent: payload.userAgent,
      status: payload.status,
      reason: payload.reason || null,
    });
  } catch {
    // ignore logging failures
  }
}

export async function POST(request: Request) {
  try {
    const ip = getIp(request);
    const userAgent = request.headers.get('user-agent') || '';
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

    if (!token) {
      return NextResponse.json({ error: 'Требуется авторизация', code: 'AUTH_REQUIRED' }, { status: 401 });
    }

    const { data: authData, error: authError } = await supabaseAuth.auth.getUser(token);
    const user = authData?.user;
    if (authError || !user) {
      return NextResponse.json({ error: 'Сессия недействительна', code: 'AUTH_INVALID' }, { status: 401 });
    }

    if (await isBlocked(ip, user.id)) {
      await logDownloadEvent({ issueId: 'unknown', userId: user.id, ip, userAgent, status: 'blocked', reason: 'manual_block' });
      return NextResponse.json({ error: 'Доступ к скачиванию временно заблокирован', code: 'BLOCKED' }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const issueId = String(body?.issueId || '').trim();
    if (!issueId) {
      return NextResponse.json({ error: 'Не указан документ', code: 'BAD_REQUEST' }, { status: 400 });
    }

    if (isBotLikeUa(userAgent)) {
      await logDownloadEvent({ issueId, userId: user.id, ip, userAgent, status: 'denied', reason: 'bot_user_agent' });
      return NextResponse.json({ error: 'Подозрительный клиент. Скачивание отклонено.', code: 'BOT_DETECTED' }, { status: 403 });
    }

    const [ipMinute, userMinute, userDay] = await Promise.all([
      rateLimit(`download:ip:${ip}`, 20, 60),
      rateLimit(`download:user:${user.id}:min`, 12, 60),
      rateLimit(`download:user:${user.id}:day`, 220, 86400),
    ]);

    if (!ipMinute.success || !userMinute.success || !userDay.success) {
      await logDownloadEvent({ issueId, userId: user.id, ip, userAgent, status: 'rate_limited', reason: 'rate_limit' });
      return NextResponse.json({ error: 'Слишком много скачиваний. Попробуйте позже.', code: 'RATE_LIMITED', retryAfterSec: 60 }, { status: 429 });
    }

    const { data: issue, error: issueError } = await supabaseAdmin
      .from('issues')
      .select('id,title,pdf_url,download_count,is_active')
      .eq('id', issueId)
      .eq('is_active', true)
      .single();

    if (issueError || !issue?.pdf_url) {
      await logDownloadEvent({ issueId, userId: user.id, ip, userAgent, status: 'error', reason: 'issue_not_found' });
      return NextResponse.json({ error: 'Документ не найден', code: 'NOT_FOUND' }, { status: 404 });
    }

    const fileRes = await fetch(issue.pdf_url, {
      headers: { 'User-Agent': 'ShabbatHubDownload/1.0' },
    });

    if (!fileRes.ok) {
      await logDownloadEvent({ issueId, userId: user.id, ip, userAgent, status: 'error', reason: 'source_fetch_failed' });
      return NextResponse.json({ error: 'Ошибка доступа к файлу', code: 'SOURCE_UNAVAILABLE' }, { status: 502 });
    }

    const buffer = Buffer.from(await fileRes.arrayBuffer());

    // fire-and-forget atomic stats increment + log
    void supabaseAdmin
      .rpc('increment_download_count', { issue_id: issueId });

    void logDownloadEvent({ issueId, userId: user.id, ip, userAgent, status: 'ok' });

    const filename = sanitizeFilename(issue.title || 'document') + '.pdf';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Внутренняя ошибка', code: 'SERVER_ERROR' }, { status: 500 });
  }
}
