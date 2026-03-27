import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ensureLoginAllowed, recordLoginFailure, clearLoginFailures, loginPolicy } from '@/lib/auth-throttle';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const INVALID_CREDENTIALS = 'Неверный email или пароль';
const TEMP_BLOCKED = 'Вход временно недоступен. Попробуйте позже.';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');

    if (!email || !password) {
      return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 400 });
    }

    // Rate limiting — fail-open: if Redis is down, allow login anyway
    try {
      const guard = await ensureLoginAllowed(email, request);
      if (!guard.allowed) {
        return NextResponse.json(
          { error: TEMP_BLOCKED, code: 'TEMP_BLOCKED', retryAfterSec: guard.retryAfterSec || loginPolicy().blockSeconds },
          { status: 429 }
        );
      }
    } catch (e) {
      console.error('[sign-in] rate limit check failed, allowing login:', e);
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) {
      try {
        const failure = await recordLoginFailure(email, request);
        if (failure.blocked) {
          return NextResponse.json(
            { error: TEMP_BLOCKED, code: 'TEMP_BLOCKED', retryAfterSec: failure.retryAfterSec || loginPolicy().blockSeconds },
            { status: 429 }
          );
        }
      } catch (e) {
        console.error('[sign-in] rate limit record failed:', e);
      }
      return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
    }

    try { await clearLoginFailures(email, request); } catch { /* noop */ }

    return NextResponse.json({
      ok: true,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
